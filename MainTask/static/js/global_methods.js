function setCurrentUser(user) {
    enviroment.currentUser = user;
    HEAD.updateUserContainer();
}

function addTask(name, description, priority, assignee, status, isPrivate) {
    TaskDBManager.create(name, description, priority, assignee, status, isPrivate);
    MAIN.updateMainWindow();
}

function editTask(id, updatedFields) {
    TaskDBManager.update(id, updatedFields);
    MAIN.updateMainWindow();
}

function removeTask(id) {
    TaskDBManager.delete(id);
    MAIN.updateMainWindow();
}

function getFeed(skip=0, top=10, filterConfig={}) {
    MAIN.updateMainWindow(skip, top, filterConfig);
}

function showTask(id) {
    enviroment.currentTask = TaskDBManager.get(id);
    TASK_PAGE.display();
}