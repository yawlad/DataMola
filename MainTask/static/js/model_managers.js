class DBManager {
  constructor(tableName, model) {
    this.tableName = tableName;
    this.db = simpleDataBaseModule.db;
    this.model = model;
  }

  create(record) {
    if (!this.db[this.tableName]) {
      this.db[this.tableName] = [];
    }
    Object.assign(record, {"_id" : String(this._getLastRecordId() + 1)})
    if(!this.model.validate(record)){
      throw new Error(constantsModule.ERRORS_DICT.VALIDATION_ERROR)
    }
    this.db[this.tableName].push(record);
  }

  getAll() {
    if (!this.db[this.tableName]) {
      return [];
    }
    return this.db[this.tableName];
  }

  get(id) {
    if (!this.db[this.tableName]) {
      console.error(constantsModule.ERRORS_DICT.NO_TABLE_FOUND);
      return false;
    }
    return this.db[this.tableName].find((record) => record.id === id);
  }

  update(id, updateData) {
    if (!this.db[this.tableName]) {
      return false;
    }
    let record = this.get(id);
    if (!record) {
      return false;
    }
    let recordCopy = Object.assign(record.clone(), updateData);
    if(!this.model.validate(recordCopy)){
      throw new Error(constantsModule.ERRORS_DICT.VALIDATION_ERROR)
    }
    Object.assign(record, updateData);
    return true;
  }

  delete(id) {
    if (!this.db[this.tableName]) {
      console.error(constantsModule.ERRORS_DICT.NO_TABLE_FOUND);
      return false;
    }
    const recordIndex = this.db[this.tableName].findIndex((record) => record.id === id);
    if (recordIndex === -1) {
      console.error(constantsModule.ERRORS_DICT.NO_ITEM_FOUND);
      return false;
    }
    this.db[this.tableName].splice(recordIndex, 1);
    return true;
  }

  _getLastRecordId() {
    const records = this.getAll()
    return records.reduce((maxId, record) => {
      return Math.max(maxId, Number(record.id))
    }, 0)
  }
}

class CommentDBManager extends DBManager {
  constructor() {
    super("comments", Comment);
  }
  create(text) {
    const comment = new Comment(text);
    super.create(comment);
  }

  getByTaskId(taskId) {
    let taskComments = this.getAll();
    taskComments = taskComments.filter((comment) => comment.taskId === taskId);
    return taskComments
  }
}

class TaskDBManager extends DBManager {
  constructor() {
    super("tasks", Task);
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
    super.create(task);
  }

  getAll() {
    const tasks = super.getAll();
    const commManager = new CommentDBManager();
    tasks.forEach(task => {
      const comments = commManager.getByTaskId(task.id);
      Object.assign(task, {"comments": comments})
    });
    return tasks
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