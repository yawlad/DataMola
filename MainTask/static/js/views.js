class BaseView {
  constructor(containerId, innerContainer) {
    this.container = document.getElementById(containerId);
    this.innerContainer = innerContainer;
    BaseView.validate(this);
  }
  static validate(view) {
    if (typeof view.container !== "object")
      throw new Error(constantsModule.ERRORS_DICT.VALIDATION_ERROR);
  }
  display() {
    let docInnerContainer = document.getElementById(
      this.innerContainer.getAttribute("id")
    );
    if (docInnerContainer) {
      docInnerContainer.innerHTML = this.innerContainer.innerHTML;
      this.innerContainer.classList.forEach(cls => {
        docInnerContainer.classList.add(cls)
      });
    } else {
      this.container.append(this.innerContainer);
    }
  }
}

class HeaderView extends BaseView {
  constructor(containerId) {
    const header = document.createElement("header");
    header.setAttribute("id", "header");
    super(containerId, header);
  }
  _addLogoContainer() {
    const logoContainer = document.createElement("div");
    logoContainer.classList.add("logo__container");
    logoContainer.innerHTML = htmlBlocksModule.createLogoContainerInnerHTML();
    this.innerContainer.append(logoContainer);
  }
  _addUserContainer() {
    const userContainer = document.createElement("div");
    userContainer.classList.add("user__container");
    userContainer.setAttribute("id", "user_container");
    this.innerContainer.append(userContainer);
  }
  updateUserContainer() {
    const userContainer = this.innerContainer.querySelector("#user_container");
    userContainer.innerHTML = enviroment.currentUser
      ? htmlBlocksModule.createHeaderLoggedInnerHTML()
      : htmlBlocksModule.createHeaderNonLoggedInnerHTML();
  }
  display() {
    this.innerContainer.classList = ["header"];
    this.innerContainer.innerHTML = "";

    this._addLogoContainer();
    this._addUserContainer();
    this.updateUserContainer();

    super.display();
  }
}

class MainView extends BaseView {
  constructor(containerId) {
    const main = document.createElement("main");
    main.setAttribute("id", "main");
    super(containerId, main);
  }

  updateUserSelectOptions() {
    const filterSelect = this.innerContainer.querySelector(
      ".filters .input__block__select"
    );
    const addNewTaskSelect = this.innerContainer.querySelector(
      ".add__new__task .input__block__select"
    );
    filterSelect.innerHTML = htmlBlocksModule.createFilterUserSelectInnerHTML();
    addNewTaskSelect.innerHTML = "";
    for (const user of UserDBManager.getAll()) {
      const innerHTML = htmlBlocksModule.createUserSelectOptionHTML(user);
      addNewTaskSelect.innerHTML += innerHTML;
      filterSelect.innerHTML += innerHTML;
    }
  }

  updateMainWindow(skip=0, top=10, filterConfig={}) {
    const toDoContainer = this.innerContainer.querySelector(
      "#section_todo .tasks__container"
    );
    const inProgressContainer = this.innerContainer.querySelector(
      "#section_in_progress .tasks__container"
    );
    const completedContainer = this.innerContainer.querySelector(
      "#section_completed .tasks__container"
    );
    toDoContainer.innerHTML = htmlBlocksModule.createLoadMoreButtonHTML();
    inProgressContainer.innerHTML = htmlBlocksModule.createLoadMoreButtonHTML();
    completedContainer.innerHTML = htmlBlocksModule.createLoadMoreButtonHTML();
    for (const statusVal of Object.values(constantsModule.STATUSES_DICT)) {
      for (const task of TaskDBManager.getPage(
        skip,
        top,
        Object.assign(filterConfig, {
          status: statusVal,
        })
      )) {
        const taskHTML = htmlBlocksModule.createTableTaskHTML(task);
        switch (task.status) {
          case constantsModule.STATUSES_DICT.TO_DO:
            toDoContainer.innerHTML += taskHTML;
            break;
          case constantsModule.STATUSES_DICT.IN_PROGRESS:
            inProgressContainer.innerHTML += taskHTML;
            break;
          case constantsModule.STATUSES_DICT.COMPLETED:
            completedContainer.innerHTML += taskHTML;
            break;
        }
      }
    }
  }

  _addFilters() {
    const filters = document.createElement("section");
    filters.classList.add("filters");

    filters.innerHTML = htmlBlocksModule.createFiltersInnerHTML();
    this.innerContainer.append(filters);
  }
  _addAppTable() {
    const appTable = document.createElement("section");
    appTable.classList.add("app__table");
    const mainWindow = document.createElement("div");
    mainWindow.classList.add("main__window");
    mainWindow.innerHTML = htmlBlocksModule.createMainWindowInnerHTML();
    appTable.append(mainWindow);

    const addNewTask = document.createElement("aside");
    addNewTask.classList.add("add__new__task");
    addNewTask.innerHTML = htmlBlocksModule.createAddTaskInnerHTML();
    appTable.append(addNewTask);

    this.innerContainer.append(appTable);
  }
  display() {
    this.innerContainer.classList = "main";
    this.innerContainer.innerHTML = "";

    this._addFilters();
    this._addAppTable();
    this.updateUserSelectOptions();
    this.updateMainWindow();

    super.display();
  }
}

class TaskView extends BaseView {
  constructor(containerId) {
    const main = document.createElement("main");
    main.setAttribute("id", "main");
    super(containerId, main);
  }
  _addDetailedTask() {
    const detailedTask = document.createElement("section");
    detailedTask.classList.add("detailed__task");
    detailedTask.innerHTML = htmlBlocksModule.createTaskDetailedHTML(
      TaskDBManager.get(enviroment.currentTask.id)
    );
    this.innerContainer.append(detailedTask);
  }

  _addComments() {
    const comments = document.createElement("section");
    comments.classList.add("comments");
    comments.innerHTML = htmlBlocksModule.createCommentsInnerHTML();
    this.innerContainer.append(comments);
  }

  updateComments() {
    const commentsList = this.innerContainer.querySelector(".comments__list");
    commentsList.innerHTML = "";
    for (const comment of TaskDBManager.get("1").comments) {
      commentsList.innerHTML += htmlBlocksModule.createCommentHTML(comment);
    }
  }

  display() {
    this.innerContainer.classList = "main";
    this.innerContainer.classList.add("main__task__page");
    this.innerContainer.innerHTML = "";

    this._addDetailedTask();
    this._addComments();
    this.updateComments();

    super.display();
  }
}
