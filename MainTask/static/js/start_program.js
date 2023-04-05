function _debugSetDB() {
  for (let i = 0; i < 10; i++) {
    UserDBManager.create(`User_${i}`, `User_${i}`, `${i}`);
  }
  enviroment.currentUser = UserDBManager.get("1");
  for (let i = 0; i < 5; i++) {
    TaskDBManager.create(
      `Task ${i}`,
      `This is task number ${i}`,
      "Low",
      "User_1",
      "To Do"
    );
  }
  for (let i = 5; i < 15; i++) {
    TaskDBManager.create(
      `Task ${i}`,
      `This is task number ${i}`,
      "Medium",
      "User_2",
      "In progress"
    );
  }
  for (let i = 15; i < 30; i++) {
    TaskDBManager.create(
      `Task ${i}`,
      `This is task number ${i}`,
      "High",
      "User_3",
      "Completed"
    );
  }
}

const HEAD = new HeaderView("wrapper");
const MAIN = new MainView("wrapper");
const FOOT = new FooterView("wrapper");
const TASK_PAGE = new TaskView("wrapper");
const TASK_PAGE_UPDATE = new UpdateTaskView("wrapper");
const USER = new UserView("wrapper");
const USER_UPDATE = new UpdateUserView("wrapper");
const SIGN_IN = new SignInView("wrapper");
const SIGN_UP = new SignUpView("wrapper");

HEAD.display();
MAIN.display();
