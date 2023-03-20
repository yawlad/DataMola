enviroment.currentTaskId = "1";

// CurrentTaskId is using to add/remove comments to current task

enviroment.currentUserId = "1";

const um = new UserDBManager();
const tm = new TaskDBManager();
const cm = new CommentDBManager();

// Valid tests

for (let i = 1; i < 30; i++) {
  console.log(tm.create(`Name_${i}`, `Description_${i}`, "Medium"));
}
for (let task of tm.getAll()) {
  for (let i = 0; i < Math.random() * 5; i++) {
    console.log(
      tm.addComment(task.id, `Comment ${i} for task with id ${task.id}`)
    );
  }
}

for (let i = 1; i < 6; i++) {
  console.log(tm.update(`${i}`, { name: "UPDATED" }));
}

console.log(cm.getAll());
console.log(tm.getAll());

console.log(tm.delete("1"));
console.log(tm.delete("2"));
console.log(tm.delete("3"));
console.log(tm.delete("4"));
console.log(tm.delete("5"));

console.log(cm.getAll().length);
console.log(tm.getAll().length);

console.log(tm.getPage(0, 5));
console.log(tm.getPage(0, 5, { description: "3" }));

// Invalid data tests

console.log(tm.create(132213, "Test", "Medium"));
console.log(tm.create("132213", 123, "Medium"));
console.log(tm.create("132213", "123", "TEST"));
console.log(tm.update("10", { prioritie: "Medium" }));

// Invalid user tests

enviroment.currentUserId = "2";
console.log(tm.delete("7"));
console.log(tm.update("7", { name: "UPDATED" }));
console.log(tm.getPage(0, 1));

console.log(tm.clear());

console.log(
  tm.addAll([
    new Task("Name", "Desct", "High"),
    new Task("123123", 13, "High"),
    new Task("Name", "Desct", "High2"),
    new Task("Name"),
  ])
);
