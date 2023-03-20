const constantsModule = (function () {
  const TASK_NAMES_LIST = [
    "Create a landing page",
    "Fix bugs in the shopping cart",
    "Implement new feature",
    "Write user manual",
    "Optimize database queries",
    "Test new release",
    "Refactor codebase",
    "Design new logo",
    "Create marketing campaign",
    "Translate website into Spanish",
    "Add support for mobile devices",
    "Improve search functionality",
    "Add social media integration",
    "Create video tutorial",
    "Write blog post",
    "Develop API documentation",
    "Build chatbot",
    "Create email newsletter",
    "Add multi-language support",
    "Implement user authentication",
  ];

  const USER_NAMES_LIST = [
    "John",
    "Jane",
    "Bob",
    "Alice",
    "Charlie",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Henry",
  ];

  const STATUSES_DICT = {
    TO_DO: "To Do",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
  };

  const PRIORITIES_DICT = {
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
  };


  const ERRORS_DICT = {
    INVALID_TASK_OBJECT: "Invalid task object",
    TASK_NOT_FOUND: "Task not found",
    INVALID_TASK_ID: "Invalid task id",
    INVALID_TASK_AUTHOR: "Invalid task author",
    INVALID_TASK_NAME: "Invalid task name",
    INVALID_TASK_DESCRIPTION: "Invalid task description",
    INVALID_TASK_DATE: "Invalid task date",
    INVALID_TASK_ASSIGNEE: "Invalid task assignee",
    INVALID_TASK_STATUS: "Invalid task assignee",
    INVALID_TASK_PRIORITY: "Invalid task priority",
    INVALID_TASK_PRIVACY: "Invalid task privacy",
    INVALID_TASK_COMMENTS_LIST: "Invalid task comments list",

    INVALID_COMMENT_OBJECT: "Invalid comment object",
    INVALID_COMMENT_ID: "Invalid comment id",
    INVALID_COMMENT_TEXT: "Invalid comment text",
    INVALID_COMMENT_DATE: "Invalid comment date",
    INVALID_COMMENT_AUTHOR: "Invalid comment author",

    INVALID_USER_OBJECT: "Invalid user object",
    INVALID_USER_ID: "Invalid user id",
    INVALID_USER_NAME: "Invalid user name",

    VALIDATION_ERROR: "Validation error",

    PERMISSION_ERROR: "Current user doesn't have necessary permissions",

    OBJECT_FIELDS_ERROR: "Object fileds error",

    NO_TABLE_FOUND: "No table found",
    NO_ITEM_FOUND: "No item found",
  };

  return {
    TASK_NAMES_LIST,
    USER_NAMES_LIST,
    STATUSES_DICT,
    PRIORITIES_DICT,
    ERRORS_DICT,
  };
})();
