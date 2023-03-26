class DBManager {
  static db = simpleDataBaseModule.db;
  static havePermissions = true;
  static tableName;
  static model;
  
  static checkPermissions() {
    if (!this.havePermissions) {
      throw new Error(constantsModule.ERRORS_DICT.PERMISSION_ERROR);
    }
  }

  static create(record) {
    try {
      this.checkPermissions();
      if (!this.db[this.tableName]) {
        this.db[this.tableName] = [];
      }
      Object.assign(record, { _id: String(this._getLastRecordId() + 1) });
      if (!this.model.validate(record)) {
        throw new Error(constantsModule.ERRORS_DICT.VALIDATION_ERROR);
      }
      this.db[this.tableName].push(record);
      return record;
    } catch (error) {
      console.error(error);
      this.havePermissions = true;
      return false;
    }
  }

  static getAll() {
    try {
      this.checkPermissions();
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

  static get(id) {
    try {
      this.checkPermissions();
      if (!this.db[this.tableName]) {
        throw new Error(constantsModule.ERRORS_DICT.NO_TABLE_FOUND);
      }
      const record = this.db[this.tableName].find((record) => record.id === id);
      if (!record) {
        throw new Error(constantsModule.ERRORS_DICT.NO_ITEM_FOUND);
      }
      return record;
    } catch (error) {
      console.error(error);
      this.havePermissions = true;
      return false;
    }
  }

  static update(id, updateData) {
    try {
      this.checkPermissions();
      if (!this.db[this.tableName]) {
        return false;
      }
      const record = this.get(id);
      if (!record) {
        return false;
      }
      const recordCopy = Object.assign(record.clone(), updateData);
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

  static delete(id) {
    try {
      this.checkPermissions();
      if (!this.db[this.tableName]) {
        throw new Error(constantsModule.ERRORS_DICT.NO_TABLE_FOUND);
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

  static _getLastRecordId() {
    const records = this.getAll();
    return records.reduce(
      (maxId, record) => Math.max(maxId, Number(record.id)),
      0
    );
  }
}

class UserDBManager extends DBManager {
  static tableName = 'users';
  static model = User;

  static create(name, img) {
    const user = new User(name, img);
    return super.create(user);
  }
}
class CommentDBManager extends DBManager {
  static tableName = 'comments';
  static model = Comment;

  static create(text) {
    const comment = new Comment(text);
    return super.create(comment);
  }

  static getByTaskId(taskIdToFind) {
    return this.getAll().filter(({taskId}) => taskId === taskIdToFind);
  }
}

class TaskDBManager extends DBManager {
  static tableName = 'tasks';
  static model = Task;

  // Strange method, but it was in hometask requirements
  static addAll(array) {
    const bad_tasks = [];
    for (const task of array) {
      if (!super.create(task)) {
        bad_tasks.push(task);
      }
    }
    return bad_tasks;
  }

  static clear() {
    const tasks = this.getAll();
    const i = 0;
    let { length } = tasks;
    while (length > 0) {
      const task = tasks[0];
      enviroment.currentUserId = task.author;
      this.delete(task.id);
      length--;
    }
    return true;
  }

  static create(name, description, priority, assignee, status, isPrivate) {
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

  static addComment(id, text) {
    enviroment.currentTaskId = this.get(id).id;
    return CommentDBManager.create(text);
  }

  static get(id) {
    const task = super.get(id);
    const comments = CommentDBManager.getByTaskId(task.id);
    Object.assign(task, { comments });
    return task;
  }

  static getAll() {
    const tasks = super.getAll();
    tasks.forEach((task) => {
      const comments = CommentDBManager.getByTaskId(task.id);
      Object.assign(task, { comments });
    });
    return tasks;
  }

  static update(id, updateData) {
    const updated = this.get(id);
    if (enviroment.currentUser.id !== updated.author) {
      this.havePermissions = false;
    }
    return super.update(id, updateData);
  }

  static delete(id) {
    const deleted = this.get(id);
    if (enviroment.currentUser.id !== deleted.author)
      this.havePermissions = false;
    deleted.comments.forEach((comment) => CommentDBManager.delete(comment.id));
    return super.delete(id);
  }

  static getPage(skip = 0, top = 10, filterConfig = {}) {
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
