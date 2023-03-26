class Model {
  constructor() {
    this._id = '';
  }

  static validate(obj, validTemplate) {
    const objKeys = Object.keys(obj);
    let propsKeys;
    propsKeys = Object.keys(validTemplate || new this());

    function checkSameLists(target, source) {
      for (let i = 0; i < target.length; i++) {
        const key = target[i];
        if (!source.includes(key)) {
          throw new Error(
            `${constantsModule.ERRORS_DICT.OBJECT_FIELDS_ERROR}: ${key}`
          );
        }
      }
    }
    checkSameLists(objKeys, propsKeys);
    checkSameLists(propsKeys, objKeys);
    return true;
  }

  clone() {
    const clone = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    return clone;
  }
}

class Comment extends Model {
  constructor(text) {
    super();
    this._createdAt = new Date();
    this._author = enviroment.currentUser.id;
    this.text = text;
    this._taskId = enviroment.currentTaskId;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get author() {
    return this._author;
  }

  get taskId() {
    return this._taskId;
  }

  static validate(comment, templateObj) {
    try {
      super.validate(comment, templateObj);
      if (typeof comment._id !== 'string') {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_COMMENT_ID);
      }

      if (!(comment._createdAt instanceof Date)) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_COMMENT_DATE);
      }

      if (typeof comment._author !== 'string') {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_COMMENT_AUTHOR);
      }

      if (typeof comment._taskId !== 'string') {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_COMMENT_AUTHOR);
      }

      if (typeof comment.text !== 'string' || comment.text.length > 280) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_COMMENT_TEXT);
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
}

class Task extends Model {
  constructor(name, description, priority, assignee, status, isPrivate) {
    super();
    this._createdAt = new Date();
    this._author = enviroment.currentUser.id;
    this.name = name || this.name;
    this.description = description || this.description;
    this.priority = priority || this.priority;

    this.assignee = assignee || enviroment.currentUser.name;
    this.status = status || constantsModule.STATUSES_DICT.TO_DO;
    this.isPrivate = isPrivate === undefined ? false : isPrivate;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get author() {
    return this._author;
  }

  static validate(task, templateObj) {
    try {
      super.validate(task, templateObj);
      if (typeof task._id !== 'string') {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_ID);
      }

      if (typeof task._author !== 'string') {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_AUTHOR);
      }

      if (typeof task.name !== 'string' || task.name.length > 100) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_NAME);
      }

      if (
        typeof task.description !== 'string' ||
        task.description.length > 280
      ) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_DESCRIPTION);
      }

      if (!(task._createdAt instanceof Date)) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_DATE);
      }

      if (typeof task.assignee !== 'string') {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_ASSIGNEE);
      }

      if (
        typeof task.status !== 'string' ||
        !Object.values(constantsModule.STATUSES_DICT).includes(task.status)
      ) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_STATUS);
      }

      if (
        typeof task.priority !== 'string' ||
        !Object.values(constantsModule.PRIORITIES_DICT).includes(task.priority)
      ) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_PRIORITY);
      }

      if (typeof task.isPrivate !== 'boolean') {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_PRIVACY);
      }
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }
}

class User extends Model {
  constructor(name, image) {
    super();
    this.name = name;
    this.image = image;
  }

  get id() {
    return this._id;
  }

  static validate(user) {
    try {
      super.validate(user);
      if (typeof user.id !== 'string') {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_USER_ID);
      }
      if (typeof user.name !== 'string' || user.name.length > 40) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_USER_NAME);
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
}
