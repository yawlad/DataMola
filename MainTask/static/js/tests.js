console.log("Get tasks: ", taskModule.getTasks());
console.log("Get tasks: ", taskModule.getTasks(5));
console.log("Get tasks: ", taskModule.getTasks(0, 5));
console.log("Get tasks: ", taskModule.getTasks(0, 15));
console.log("Get tasks: ", taskModule.getTasks(10, 10));
console.log(
  "Get tasks: ",
  taskModule.getTasks(0, 30, { assignee: constantsModule.USER_NAMES_LIST[0] })
);
console.log(
  "Get tasks: ",
  taskModule.getTasks(0, 30, {
    dateFrom: new Date("06.01.2022"),
    dateTo: new Date("08.30.2022"),
  })
);

console.log("Change user: ", taskModule.changeUser("Vlad"));
for (let i = 0; i < 3; i++) {
  console.log(
    "Added task: ",
    taskModule.addTask(
      utilsModule.getRandomArrayElement(Object.values(constantsModule.TASK_NAMES_LIST)),
      `Test Description ${i}`,
      undefined,
      undefined,
      utilsModule.getRandomArrayElement(Object.values(constantsModule.PRIORITIES_DICT)),
      undefined
    )
  );
}

console.log("Change user: ", taskModule.changeUser("AnotherVlad"));

for (let i = 0; i < 3; i++) {
  console.log(
    "Added task: ",
    taskModule.addTask(
      utilsModule.getRandomArrayElement(Object.values(constantsModule.TASK_NAMES_LIST)),
      `Test Description ${i}`,
      undefined,
      undefined,
      utilsModule.getRandomArrayElement(Object.values(constantsModule.PRIORITIES_DICT)),
      undefined
    )
  );
}

console.log("Get tasks: ", taskModule.getTasks(30, 10));

console.log(
  "Edited task: ",
  taskModule.editTask("35", "EDITED NAME", "EDITED DESCRIPTION")
);

console.log(
  "Removed task: ",
  taskModule.removeTask("33", "EDITED NAME", "EDITED DESCRIPTION")
);

console.log("Get tasks: ", taskModule.getTasks(30, 10));

console.log(
  "Bad added task: ",
  taskModule.addTask("NAME", "DESCRIPTION")
);
console.log(
  "Bad edited task: ",
  taskModule.editTask("1", "EDITED NAME", "EDITED DESCRIPTION")
);
console.log(
  "Bad remove task: ",
  taskModule.editTask("1")
);

console.log(
  "Add comment: ",
  taskModule.addComment("0", "TEXT")
);
console.log(
  "Bad add comment: ",
  taskModule.addComment("101", "TEXT")
);
console.log("Get task: ", taskModule.getTask("0"));

