const enviroment = (function () {
  function save() {
    if (!this.currentUser) {
      localStorage.removeItem("currentUser");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
  }
  let currentUser;
  let currentTask;
  const currentUserRaw = JSON.parse(localStorage.getItem("currentUser"));
  currentUser = currentUserRaw
    ? Object.assign(new User("Temp", "Temp", "Temp", "Temp"), currentUserRaw)
    : undefined;

  return {
    currentUser,
    currentTask,
    save,
  };
})();
