const taskModule = (function () {
  let user = "John";

  const tasks = utilsModule.createTasksList(30, 10);

  function getTasks(skip = 0, top = 10, filterConfig = {}) {
    let filteredTasks = tasks.slice();

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
    filteredTasks = filteredTasks
      .sort((a, b) => b.date - a.date)
      .slice(skip, skip + top);
    return filteredTasks;
  }

  function getTask(id) {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      console.log(constantsModule.ERRORS_DICT.TASK_NOT_FOUND);
    }
    return task
  }

  function validateTask(task) {
    try {
      if (!constantsModule.REQUIRED_FIELDS_TASK.every((field) => task.hasOwnProperty(field))) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_OBJECT);
      }

      if (typeof task.id !== "string") {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_ID);
      }

      if (typeof task.name !== "string" || task.name.length > 100) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_NAME);
      }

      if (
        typeof task.description !== "string" ||
        task.description.length > 280
      ) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_DESCRIPTION);
      }

      if (!(task.createdAt instanceof Date)) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_DATE);
      }

      if (typeof task.assignee !== "string" || constantsModule.USER_NAMES_LIST.includes(task.assignee)) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_ASSIGNEE);
      }

      if (
        typeof task.status !== "string" ||
        !Object.values(constantsModule.STATUSES_DICT).includes(task.status)
      ) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_STATUS);
      }

      if (
        typeof task.priority !== "string" ||
        !Object.values(constantsModule.PRIORITIES_DICT).includes(task.priority)
      ) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_PRIORITY);
      }

      if (typeof task.isPrivate !== "boolean") {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_PRIVACY);
      }

      if (!Array.isArray(task.comments)) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_TASK_COMMENTS_LIST);
      }

      for (const comment of task.comments) {
        if (!validateComment(comment)) {
          return false;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  function addTask(
    name,
    description,
    priority,
    assignee = user,
    status = constantsModule.STATUSES_DICT.TO_DO,
    isPrivate = false
  ) {
    const getLastTaskId = function () {
      return tasks.reduce(
        (last_id, task) => Math.max(last_id, Number(task.id)),
        0
      );
    };

    const id = (getLastTaskId() + 1).toString();
    const createdAt = new Date();
    const comments = [];
    const task = {
      id,
      name,
      description,
      createdAt,
      assignee,
      comments,
      status,
      priority,
      isPrivate,
    };

    if (!validateTask(task)) {
      return false;
    }

    tasks.push(task);
    return true;
  }

  function editTask(
    id,
    name,
    description,
    assignee,
    status,
    priority,
    isPrivate = false
  ) {
    const task = getTask(id);

    if (!task) {
      return false;
    }

    if (task.assignee !== user) {
      console.log(constantsModule.ERRORS_DICT.NOT_ASSIGNEE)
      return false;
    }

    const editedTask = {}
    Object.assign(editedTask, task);
    
    editedTask.name = name || editedTask.name;
    editedTask.description = description || editedTask.description;
    editedTask.assignee = assignee || editedTask.assignee;
    editedTask.status = status || editedTask.status;
    editedTask.priority = priority || editedTask.priority;
    editedTask.isPrivate = isPrivate;

    if (!validateTask(editedTask)) {
      return false;
    }

    Object.assign(task, editedTask);
    return true;
  }

  function removeTask(id) {
    const task = getTask(id);
    const taskIndex = tasks.indexOf(task);
    if (!task) {
      return false;
    }

    if (task.assignee !== user) {
      console.log(constantsModule.ERRORS_DICT.NOT_ASSIGNEE)
      return false;
    }

    tasks.splice(taskIndex, 1);
    return true;
  }

  function validateComment(comment) {
    try {
      if (!constantsModule.REQUIRED_FIELDS_COMMENT.every((field) => comment.hasOwnProperty(field))) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_COMMENT_OBJECT);
      }
      if (typeof comment.id !== "string") {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_COMMENT_ID);
      }

      if (typeof comment.text !== "string" || comment.text.length > 280) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_COMMENT_TEXT);
      }

      if (!(comment.createdAt instanceof Date)) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_COMMENT_DATE);
      }

      if (typeof comment.author !== "string" || !constantsModule.USER_NAMES_LIST.includes(comment.author) ) {
        throw new Error(constantsModule.ERRORS_DICT.INVALID_COMMENT_AUTHOR);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  function addComment(id, text) {
    const getLastCommentId = function () {
      return tasks.reduce((last_id, task) => {
        taskMaxCommentId = task.comments.reduce((maxCommetId, comment) => {
          return Math.max(maxCommetId, Number(comment.id));
        }, 0);
        return Math.max(last_id);
      }, 0);
    };

    const task = getTask(id);
    if (!task) {
      return false;
    }

    const date = new Date();

    const comment = {
      id: (getLastCommentId() + 1).toString(),
      text,
      createdAt: date,
      author: user,
    };

    if (!validateComment(comment)) {
      return false;
    }

    task.comments.push(comment);
    return true;
  }

  function changeUser(usr) {
    user = usr;
  }

  return {
    getTasks,
    getTask,
    validateTask,
    addTask,
    editTask,
    removeTask,
    validateComment,
    addComment,
    changeUser,
  };
})();
