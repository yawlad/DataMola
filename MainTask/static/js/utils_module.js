const utilsModule = (function () {
  let tasks_next_id = 0;
  let comments_next_id = 0;

  function getRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getRandomNumberInRange(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
  }

  function getRandomDateInRange(startDate, endDate = new Date()) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const timestamp = getRandomNumberInRange(startTimestamp, endTimestamp);
    return new Date(timestamp);
  }

  function createCommentsList(number_of_comments, start_date) {
    const comments = [];
    for (let i = 1; i <= number_of_comments; i++) {
      const id = String(comments_next_id);
      const text = `This is a comment with id ${id}`;
      const createdAt = getRandomDateInRange(start_date);
      const author = getRandomArrayElement(constantsModule.USER_NAMES_LIST);

      comments.push({
        id,
        text,
        createdAt,
        author,
      });

      comments_next_id++;
    }
    return comments;
  }

  function createTasksList(number_of_tasks, number_of_comments) {
    const tasks = [];
    for (let i = 1; i <= number_of_tasks; i++) {
      const id = String(tasks_next_id);
      const name = getRandomArrayElement(constantsModule.TASK_NAMES_LIST);
      const description = `This is a description for task ${id}`;
      const createdAt = getRandomDateInRange(new Date("01.01.2022"));
      const assignee = getRandomArrayElement(constantsModule.USER_NAMES_LIST);
      const status = getRandomArrayElement(Object.values(constantsModule.STATUSES_DICT));
      const priority = getRandomArrayElement(Object.values(constantsModule.PRIORITIES_DICT));
      const isPrivate = Math.random() < 0.5;
      const comments = createCommentsList(
        getRandomNumberInRange(0, number_of_comments),
        createdAt
      ).sort((a, b) => a.createdAt - b.createdAt);

      tasks.push({
        id,
        name,
        description,
        createdAt,
        assignee,
        status,
        priority,
        isPrivate,
        comments,
      });

      tasks_next_id++;
    }

    return tasks.sort((a, b) => a.createdAt - b.createdAt);
  }

  return {
    getRandomArrayElement,
    getRandomNumberInRange,
    getRandomDateInRange,
    createTasksList,
  };
})();
