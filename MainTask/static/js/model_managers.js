class DBManager {
  static a = 10;
  constructor(tableName, model) {
    this.tableName = tableName;
    this.db = simpleDataBaseModule.db;
    this.model = model;
    this.havePermissions = true;
  }

  create(record) {
    try {
      if (!this.havePermissions) {
        throw new Error(constantsModule.ERRORS_DICT.PERMISSION_ERROR);
      }
      if (!this.db[this.tableName]) {
        this.db[this.tableName] = [];
      }
      Object.assign(record, { _id: String(this._getLastRecordId() + 1) });
      if (!this.model.validate(record)) {
        throw new Error(constantsModule.ERRORS_DICT.VALIDATION_ERROR);
      }
      this.db[this.tableName].push(record);
      return true;
    } catch (error) {
      console.error(error);
      this.havePermissions = true;
      return false;
    }
  }

  getAll() {
    try {
      if (!this.havePermissions) {
        throw new Error(constantsModule.ERRORS_DICT.PERMISSION_ERROR);
      }
      if (!this.db[this.tableName]) {
        return [];
      }
      return this.db[this.tableName];
    } catch (error) {
      console.error(error);
      this.havePermissions = true;
      return false;
    }
  }

  get(id) {
    try {
      if (!this.havePermissions) {
        throw new Error(constantsModule.ERRORS_DICT.PERMISSION_ERROR);
      }
      if (!this.db[this.tableName]) {
        console.error(constantsModule.ERRORS_DICT.NO_TABLE_FOUND);
        return false;
      }
      return this.db[this.tableName].find((record) => record.id === id);
    } catch (error) {
      console.error(error);
      this.havePermissions = true;
      return false;
    }
  }

  update(id, updateData) {
    try {
      if (!this.havePermissions) {
        throw new Error(constantsModule.ERRORS_DICT.PERMISSION_ERROR);
      }
      if (!this.db[this.tableName]) {
        return false;
      }
      let record = this.get(id);
      if (!record) {
        return false;
      }
      let recordCopy = Object.assign(record.clone(), updateData);
      if (!this.model.validate(recordCopy, record)) {
        throw new Error(constantsModule.ERRORS_DICT.VALIDATION_ERROR);
      }
      Object.assign(record, updateData);
      return true;
    } catch (error) {
      console.error(error);
      this.havePermissions = true;
      return false;
    }
  }

  delete(id) {
    try {
      if (!this.havePermissions) {
        throw new Error(constantsModule.ERRORS_DICT.PERMISSION_ERROR);
      }
      if (!this.db[this.tableName]) {
        console.error(constantsModule.ERRORS_DICT.NO_TABLE_FOUND);
        return false;
      }
      const recordIndex = this.db[this.tableName].findIndex(
        (record) => record.id === id
      );
      if (recordIndex === -1) {
        console.error(constantsModule.ERRORS_DICT.NO_ITEM_FOUND);
        return false;
      }
      this.db[this.tableName].splice(recordIndex, 1);
      return true;
    } catch (error) {
      console.error(error);
      this.havePermissions = true;
      return false;
    }
  }

  _getLastRecordId() {
    const records = this.getAll();
    return records.reduce((maxId, record) => {
      return Math.max(maxId, Number(record.id));
    }, 0);
  }
}

class UserDBManager extends DBManager {
  constructor() {
    super("users", User);
  }
  create(name) {
    const user = new User(name);
    super.create(user);
  }
}
class CommentDBManager extends DBManager {
  constructor() {
    super("comments", Comment);
  }
  create(text) {
    const comment = new Comment(text);
    return super.create(comment);
  }

  getByTaskId(taskId) {
    let taskComments = this.getAll();
    taskComments = taskComments.filter((comment) => comment.taskId === taskId);
    return taskComments;
  }
}

class TaskDBManager extends DBManager {
  constructor() {
    super("tasks", Task);
    this.commentManager = new CommentDBManager();
  }

  // Strange method, but it was in hometask requirements
  addAll(array) {
    const bad_tasks = [];
    for (let task of array) {
      if (!super.create(task)) {
        bad_tasks.push(task);
      }
    }
    return bad_tasks;
  }

  clear() {
    const tasks = this.getAll();
    let i = 0;
    let length = tasks.length
    while(length > 0){
      const task = tasks[0];
      enviroment.currentUserId = task.author;
      this.delete(task.id);
      length--;
    }
    return true;
  }

  create(name, description, priority, assignee, status, isPrivate) {
    const task = new Task(
      name,
      description,
      priority,
      assignee,
      status,
      isPrivate
    );
    return super.create(task);
  }

  addComment(id, text) {
    enviroment.currentTaskId = this.get(id).id;
    return this.commentManager.create(text);
  }

  get(id) {
    const task = super.get(id);
    const comments = this.commentManager.getByTaskId(task.id);
    Object.assign(task, { comments: comments });
    return task;
  }

  getAll() {
    const tasks = super.getAll();
    tasks.forEach((task) => {
      const comments = this.commentManager.getByTaskId(task.id);
      Object.assign(task, { comments: comments });
    });
    return tasks;
  }

  update(id, updateData) {
    const updated = this.get(id);
    if (enviroment.currentUserId !== updated.author) {
      this.havePermissions = false;
    }
    return super.update(id, updateData);
  }

  delete(id) {
    const deleted = this.get(id);
    if (enviroment.currentUserId !== deleted.author)
      this.havePermissions = false;
    const cm = new CommentDBManager();
    deleted.comments.forEach((comment) => cm.delete(comment.id));
    return super.delete(id);
  }

  getPage(skip = 0, top = 10, filterConfig = {}) {
    let filteredTasks = this.getAll();
    if (filterConfig.name) {
      filteredTasks = filteredTasks.filter((task) =>
        task.name.includes(filterConfig.name)
      );
    }
    if (filterConfig.assignee) {
      filteredTasks = filteredTasks.filter((task) =>
        task.assignee.includes(filterConfig.assignee)
      );
    }
    if (filterConfig.dateFrom) {
      filteredTasks = filteredTasks.filter(
        (task) => task.createdAt >= filterConfig.dateFrom
      );
    }
    if (filterConfig.dateTo) {
      filteredTasks = filteredTasks.filter(
        (task) => task.createdAt <= filterConfig.dateTo
      );
    }
    if (filterConfig.status) {
      filteredTasks = filteredTasks.filter((task) =>
        task.status.includes(filterConfig.status)
      );
    }
    if (filterConfig.priority) {
      filteredTasks = filteredTasks.filter((task) =>
        task.priority.includes(filterConfig.priority)
      );
    }
    if (filterConfig.isPrivate !== undefined) {
      filteredTasks = filteredTasks.filter(
        (task) => task.isPrivate === filterConfig.isPrivate
      );
    }
    if (filterConfig.description) {
      filteredTasks = filteredTasks.filter((task) =>
        task.description.includes(filterConfig.description)
      );
    }
    filteredTasks = filteredTasks.slice(skip, skip + top);
    return filteredTasks;
  }
}
