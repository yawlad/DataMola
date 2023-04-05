const simpleDataBaseModule = (function () {
  function save() {
    localStorage.setItem("db", JSON.stringify(db));
  }

  function load() {
    const dbRaw = JSON.parse(localStorage.getItem("db"));
    if (!dbRaw) return;
    for (table of Object.keys(dbRaw)) {
      db[table] = [];
      for (item of dbRaw[table]) {
        switch (table) {
          case "users":
            db[table].push(
              Object.assign(new User("Temp", "Temp", "Temp", "Temp"), item)
            );
            break;
          case "tasks":
            db[table].push(
              Object.assign(new Task("Temp", "Temp", "Temp"), item)
            );
            break;
          case "comments":
            db[table].push(Object.assign(new Comment("Temp"), item));
            break;
        }
      }
    }
  }

  const db = {};
  const tempUser = enviroment.currentUser;

  enviroment.currentUser = new User("Temp", "Temp", "Temp", "Temp");
  enviroment.currentTask = new Task("Temp", "Temp", "Temp");
  load();
  enviroment.currentUser = tempUser;

  return {
    db,
    save,
  };
})();
