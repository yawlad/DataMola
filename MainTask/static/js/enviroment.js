const enviroment = (() => {
  currentUser = new User("Vlad", "#");
  currentTask = '1';

  return {
    currentUser,
    currentTask,
  };
})();
