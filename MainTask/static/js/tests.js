// enviroment.currentTaskId = '1';

// // CurrentTaskId is using to add/remove comments to current task

// enviroment.currentUserId = '1';

// const um = UserDBManager;
// const tm = TaskDBManager;
// const cm = CommentDBManager;

// // Valid tests

// for (let i = 1; i < 30; i++) {
//   console.log(tm.create(`Name_${i}`, `Description_${i}`, 'Medium'));
// }
// for (const task of tm.getAll()) {
//   for (let i = 0; i < Math.random() * 5; i++) {
//     console.log(
//       tm.addComment(task.id, `Comment ${i} for task with id ${task.id}`),
//     );
//   }
// }

// for (let i = 1; i < 6; i++) {
//   console.log(tm.update(`${i}`, { name: 'UPDATED' }));
// }

// console.log(cm.getAll());
// console.log(tm.getAll());

// console.log(tm.delete('1'));
// console.log(tm.delete('2'));
// console.log(tm.delete('3'));
// console.log(tm.delete('4'));
// console.log(tm.delete('5'));

// console.log(cm.getAll().length);
// console.log(tm.getAll().length);

// console.log(tm.getPage(0, 5));
// console.log(tm.getPage(0, 5, { description: '3' }));

// // Invalid data tests

// console.log(tm.create(132213, 'Test', 'Medium'));
// console.log(tm.create('132213', 123, 'Medium'));
// console.log(tm.create('132213', '123', 'TEST'));
// console.log(tm.update('10', { prioritie: 'Medium' }));

// // Invalid user tests

// enviroment.currentUserId = '2';
// console.log(tm.delete('7'));
// console.log(tm.update('7', { name: 'UPDATED' }));
// console.log(tm.getPage(0, 1));

// console.log(tm.clear());

// console.log(
//   tm.addAll([
//     new Task('Name', 'Desct', 'High'),
//     new Task('123123', 13, 'High'),
//     new Task('Name', 'Desct', 'High2'),
//     new Task('Name'),
//   ]),
// );

// Task_06 tests

enviroment.currentUser = UserDBManager.create("Vlad", "./static/img/Avata.png");
enviroment.currentTask = TaskDBManager.create("Task1", "Descr1", "High");

for (let i = 1; i < 7; i++) {
  TaskDBManager.create(`Name_${i}`, `Description_${i}`, "Medium");
}
for (const task of TaskDBManager.getAll()) {
  for (let i = 0; i < Number(task.id) * 5 - 2; i++) {
    TaskDBManager.addComment(
      task.id,
      `Comment ${i} for task with id ${task.id}`
    );
  }
}

for (let i = 1; i < 23; i++) {
  TaskDBManager.create(`Name_${i}`, `Description_${i}`, "Low", undefined, "In progress");
}

const HEAD = new HeaderView("wrapper");
const MAIN = new MainView("wrapper");
const TASK_PAGE = new TaskView("wrapper");

HEAD.display();
MAIN.display();
TASK_PAGE.display();

//

MAIN.display();

setCurrentUser(UserDBManager.create("Oleg", "./static/img/Avata.png"));
setCurrentUser(UserDBManager.get("1"));
addTask("CreatedTask", "Description", "High", "Vlad", "Completed");
editTask("8", {name: "UPDATED NAME"});
removeTask("9");
getFeed(0, 5, {name: "Name"});


//


showTask("8");