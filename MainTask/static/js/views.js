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
    if (!enviroment.currentUser) this.container.classList.add("unauthorized");
    else this.container.classList.remove("unauthorized");
    const docContainer = this.container.querySelector(
      `${this.innerContainer.id}`
    );
    if (docContainer) docContainer.remove();

    this.container.append(this.innerContainer);
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
  _addHandlers() {
    const userContainer = this.innerContainer.querySelector("#user_container");
    userContainer.addEventListener("click", (event) => {
      const exit = event.target.closest(".dangerous__icon");
      if (exit) {
        confirmStep("Are you sure want to exit?", () => {
          enviroment.currentUser = undefined;
          this.updateUserContainer();
          enviroment.save();
          MAIN.display();
        });
      }
      const name = event.target.closest("span");
      const image = event.target.closest("img");
      if (name || image) USER.display();
      const button = event.target.closest("button");
      if (button) {
        switch (button.id) {
          case "sign_in":
            SIGN_IN.display();
            break;
          case "sign_up":
            SIGN_UP.display();
            break;
        }
      }
    });
  }
  display() {
    this.innerContainer.classList = ["header"];
    this.innerContainer.innerHTML = "";
    super.display();

    this._addLogoContainer();
    this._addUserContainer();
    this.updateUserContainer();
    this._addHandlers();
  }
}

class FooterView extends BaseView {
  constructor(containerId) {
    const header = document.createElement("footer");
    header.setAttribute("id", "footer");
    super(containerId, header);
  }

  _addFooterContent() {
    this.innerContainer.innerHTML = htmlBlocksModule.createFooterInnerHTML();
  }

  display() {
    this.innerContainer.classList = ["footer"];
    this.innerContainer.innerHTML = "";
    super.display();

    this._addFooterContent();
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

  updateMainWindow(skip = 0, top = 10, filterConfig = {}) {
    const toDoContainer = this.innerContainer.querySelector(
      "#section_todo .tasks__container"
    );
    const inProgressContainer = this.innerContainer.querySelector(
      "#section_in_progress .tasks__container"
    );
    const completedContainer = this.innerContainer.querySelector(
      "#section_completed .tasks__container"
    );

    toDoContainer.innerHTML = "";
    inProgressContainer.innerHTML = "";
    completedContainer.innerHTML = "";

    for (const statusVal of Object.values(constantsModule.STATUSES_DICT)) {
      const querry = TaskDBManager.getPage(
        skip,
        top,
        Object.assign(filterConfig, {
          status: statusVal,
        })
      );
      const maxItems = TaskDBManager.getPage(
        0,
        -1,
        Object.assign(filterConfig, {
          status: statusVal,
        })
      ).length;
      for (const task of querry) {
        const taskHTML = htmlBlocksModule.createTableTaskHTML(task);
        const tempElement = document.createElement("div");
        tempElement.innerHTML = taskHTML;
        const taskElement = tempElement.firstElementChild;
        switch (task.status) {
          case constantsModule.STATUSES_DICT.TO_DO:
            toDoContainer.append(taskElement);
            break;
          case constantsModule.STATUSES_DICT.IN_PROGRESS:
            inProgressContainer.append(taskElement);
            break;
          case constantsModule.STATUSES_DICT.COMPLETED:
            completedContainer.append(taskElement);
            break;
        }
      }
      switch (statusVal) {
        case constantsModule.STATUSES_DICT.TO_DO:
          toDoContainer.innerHTML +=
            querry.length < maxItems
              ? htmlBlocksModule.createLoadMoreButtonHTML()
              : "";
          this._addLoadMoreButtonsHandler(
            toDoContainer,
            constantsModule.STATUSES_DICT.TO_DO
          );
          break;
        case constantsModule.STATUSES_DICT.IN_PROGRESS:
          inProgressContainer.innerHTML +=
            querry.length < maxItems
              ? htmlBlocksModule.createLoadMoreButtonHTML()
              : "";
          this._addLoadMoreButtonsHandler(
            inProgressContainer,
            constantsModule.STATUSES_DICT.IN_PROGRESS
          );
          break;
        case constantsModule.STATUSES_DICT.COMPLETED:
          completedContainer.innerHTML +=
            querry.length < maxItems
              ? htmlBlocksModule.createLoadMoreButtonHTML()
              : "";
          this._addLoadMoreButtonsHandler(
            completedContainer,
            constantsModule.STATUSES_DICT.COMPLETED
          );
          break;
      }
    }
  }

  _addLoadMoreButtonsHandler(container, status) {
    const button = container.querySelector(".load__more__button");
    if (!button) return;
    button.addEventListener("click", (event) => {
      this.updateMainWindow(
        0,
        container.children.length + 10,
        Object.assign(this.currentFilters, {
          status: status,
        })
      );
    });
  }

  _activateFilter(filter) {
    filter.classList.add("active__filter");
  }
  _deactivateFilter(filter) {
    filter.classList.remove("active__filter");
  }
  _addFilters() {
    this.currentFilters = {};
    const filters = document.createElement("section");
    filters.classList.add("filters");

    filters.innerHTML = htmlBlocksModule.createFiltersInnerHTML();
    this.innerContainer.append(filters);
    this._addFiltertsHandlers(filters);
  }
  _addFiltertsHandlers() {
    const filters = this.innerContainer.querySelector(".filters");
    filters.addEventListener("click", (event) => {
      event.preventDefault();
      const inputBlock = event.target.closest(".input__block");
      if (!inputBlock) return;
      const label = event.target.closest("label");
      if (!label) return;
      switch (inputBlock.id) {
        case "type_of_page_filter":
          this._typeOfPageFilterHandler(
            inputBlock,
            label.querySelector("input")
          );
          break;
        case "privacy_filter":
          this._privacyFilterHandler(label.querySelector("input"));
          break;
        case "priority_filter":
          this._priorityFilterHandler(label.querySelector("input"));
          break;
      }
      this.updateMainWindow(undefined, undefined, this.currentFilters);
    });
    filters.addEventListener("input", (event) => {
      event.preventDefault();
      const inputBlock = event.target.closest(".input__block");
      if (!inputBlock) return;
      switch (inputBlock.id) {
        case "inner_text_filter":
          this._descriptionFilterHandler(event.target);
          break;
        case "data_filter":
          this._dateFilterHandler(event.target);
          break;
        case "executor_filter":
          this._executorFilterHandle(event.target);
          break;
      }

      this.updateMainWindow(undefined, undefined, this.currentFilters);
    });
  }
  _typeOfPageFilterHandler(inputBlock, targetInput) {
    const inputs = inputBlock.querySelectorAll("input");
    const tableInput = inputs[0];
    const listInput = inputs[1];
    if (targetInput.value === tableInput.value) {
      this._activateFilter(tableInput.parentElement);
      this._deactivateFilter(listInput.parentElement);
      this.innerContainer
        .querySelector(".main__window")
        .classList.remove("main__window__list");
    }
    if (targetInput.value === listInput.value) {
      this._activateFilter(listInput.parentElement);
      this._deactivateFilter(tableInput.parentElement);
      this.innerContainer
        .querySelector(".main__window")
        .classList.add("main__window__list");
    }
  }
  _privacyFilterHandler(targetInput) {
    const input = Boolean(targetInput.value);
    if (targetInput.parentElement.classList.contains("active__filter")) {
      this.currentFilters.isPrivate.splice(
        this.currentFilters.isPrivate.indexOf(input),
        1
      );
      this._deactivateFilter(targetInput.parentElement);
    } else {
      if (!this.currentFilters.isPrivate) this.currentFilters.isPrivate = [];
      this.currentFilters.isPrivate.push(input);
      this._activateFilter(targetInput.parentElement);
    }
  }
  _priorityFilterHandler(targetInput) {
    const input = targetInput.value;
    if (targetInput.parentElement.classList.contains("active__filter")) {
      this.currentFilters.priority.splice(
        this.currentFilters.priority.indexOf(input),
        1
      );
      this._deactivateFilter(targetInput.parentElement);
    } else {
      if (!this.currentFilters.priority) this.currentFilters.priority = [];
      this.currentFilters.priority.push(input);
      this._activateFilter(targetInput.parentElement);
    }
  }
  _descriptionFilterHandler(targetInput) {
    const input = targetInput.value;
    this.currentFilters.description = input;
  }
  _dateFilterHandler(targetInput) {
    const input = targetInput.value;
    if (targetInput.name === "date_from")
      this.currentFilters.dateFrom = new Date(input);
    if (targetInput.name === "date_to")
      this.currentFilters.dateTo = new Date(input);
  }
  _executorFilterHandle(targetInput) {
    const input = targetInput.value;
    if (input === "All") delete this.currentFilters.assignee;
    else this.currentFilters.assignee = input;
  }

  _addListHandlers() {
    const listView = this.innerContainer.querySelector(".main__window");
    if (!listView) return;
    listView.addEventListener("click", (event) => {
      const header = event.target.closest(".section__header");
      if (!header) return;
      header.classList.toggle("section__header__active");
    });
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

  _taskHandlers() {
    const mainWindow = this.innerContainer.querySelector(".main__window");
    if (!mainWindow) return;
    mainWindow.addEventListener("click", (event) => {
      const mainTask = event.target.closest(".task__main");
      const editButton = event.target.closest(".edit__button");
      const deleteButton = event.target.closest(".delete__button");
      const task = TaskDBManager.get(
        event.target.closest(".task").id.replace("task-", "")
      );
      if (mainTask) {
        enviroment.currentTask = task;
        TASK_PAGE.display();
        return;
      }
      if (editButton) {
        if (enviroment.currentUser.id !== task.author) {
          message("You are not the author of this task");
          return;
        }
        enviroment.currentTask = TaskDBManager.get(
          editButton.parentElement.parentElement.id.replace("task-", "")
        );
        TASK_PAGE_UPDATE.display();
        enviroment.currentTask = TaskDBManager.get(
          editButton.parentElement.parentElement.id.replace("task-", "")
        );
        TASK_PAGE_UPDATE.display();
        return;
      }
      if (deleteButton) {
        if (enviroment.currentUser.id !== task.author) {
          message("You are not the author of this task");
          return;
        }
        confirmStep(`Are you sure to delete task ${task.name}`, () => {
          TaskDBManager.delete(task.id);
          MAIN.display();
        });
        return;
      }
    });
  }

  _addTaskHandlers() {
    const bottomPart =
      this.innerContainer.querySelectorAll(".task__form__part")[1];
    bottomPart.addEventListener("click", (event) => {
      event.preventDefault();
      const label = event.target.closest("label");
      if (!label) return;
      const inputBlock = event.target.closest(".input__block");
      for (let item of inputBlock.querySelectorAll(
        ".input__block__radio input"
      )) {
        item.removeAttribute("checked");
        item.parentElement.classList.remove("active__filter");
      }
      label.querySelector("input").setAttribute("checked", true);
      label.classList.add("active__filter");
    });
    const taskForm = this.innerContainer.querySelector(".task__form");
    const clearButton = taskForm.querySelector('.delete__button[type="reset"]');
    clearButton.addEventListener("click", (event) => {
      for (const label of bottomPart.querySelectorAll("label")) {
        label.classList.remove("active__filter");
      }
    });

    if (taskForm)
      taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = {
          priority: event.target.task_priority.value,
          name: event.target.task_name.value,
          assignee: event.target.task_executor.value,
          isPrivate: Boolean(event.target.task_privacy.value),
          status: event.target.task_status.value,
          description: event.target.task_decription.value,
        };
        const validationResult = Task.validate(
          new Task(
            data.name,
            data.description,
            data.priority,
            data.assignee,
            data.status,
            data.isPrivate
          )
        );
        if (typeof validationResult === "string") {
          let message;
          switch (validationResult) {
            case constantsModule.ERRORS_DICT.INVALID_TASK_NAME:
              message =
                event.target.task_name.parentElement.parentElement.querySelector(
                  ".help__message"
                );
              break;
            case constantsModule.ERRORS_DICT.INVALID_TASK_DESCRIPTION:
              message =
                event.target.task_decription.parentElement.parentElement.querySelector(
                  ".help__message"
                );
              break;
          }
          message.classList.add("high__prioprity");
          return;
        }

        TaskDBManager.create(
          data.name,
          data.description,
          data.priority,
          data.assignee,
          data.status,
          data.isPrivate
        );

        MAIN.display();
      });
  }

  display() {
    this.innerContainer.classList = "main";
    this.innerContainer.innerHTML = "";
    super.display();

    this._addFilters();
    this._addAppTable();
    this.updateUserSelectOptions();
    this.updateMainWindow();
    this._addListHandlers();
    this._taskHandlers();
    this._addTaskHandlers();
    FOOT.display();
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
    for (const comment of TaskDBManager.get(enviroment.currentTask.id)
      .comments) {
      commentsList.innerHTML += htmlBlocksModule.createCommentHTML(comment);
    }
  }

  _addButtonsHandlers() {
    const editButton = this.innerContainer.querySelector(".edit__button");
    const mainButton = this.innerContainer.querySelector(".main__page__button");
    const deleteButton = this.innerContainer.querySelector(".delete__button");
    !editButton
      ? 0
      : editButton.addEventListener("click", (event) => {
          if (enviroment.currentUser.id !== enviroment.currentTask.author) {
            message("You are not the author of this task");
            return;
          }
          TASK_PAGE_UPDATE.display();
        });
    !mainButton
      ? 0
      : mainButton.addEventListener("click", (event) => {
          MAIN.display();
        });
    !deleteButton
      ? 0
      : deleteButton.addEventListener("click", (event) => {
          if (enviroment.currentUser.id !== enviroment.currentTask.author) {
            message("You are not the author of this task");
            return;
          }
          confirmStep(
            `Are you sure to delete task ${enviroment.currentTask.name}`,
            () => {
              TaskDBManager.delete(enviroment.currentTask.id);
              MAIN.display();
            }
          );
        });
    const commentForm = this.innerContainer.querySelector(".add__comment");
    !commentForm
      ? 0
      : commentForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const data = {
            text: event.target.inner_text.value,
          };
          const validationResult = Comment.validate(new Comment(data.text));
          if (typeof validationResult === "string") {
            let message;
            switch (validationResult) {
              case constantsModule.ERRORS_DICT.INVALID_COMMENT_TEXT:
                message =
                  event.target.inner_text.parentElement.parentElement.querySelector(
                    ".help__message"
                  );
                break;
            }
            message.classList.add("high__prioprity");
            return;
          }
          CommentDBManager.create(event.target.inner_text.value);
          TASK_PAGE.display();
        });
  }

  display() {
    this.innerContainer.classList = ["main"];
    this.innerContainer.classList.add("main__task__page");
    this.innerContainer.innerHTML = "";

    this._addDetailedTask();
    this._addComments();
    this.updateComments();
    super.display();
    this._addButtonsHandlers();
    FOOT.display();
  }
}

class UpdateTaskView extends TaskView {
  constructor(id) {
    super(id);
  }

  _addDetailedTask() {
    const updateTaskForm = htmlBlocksModule.createUpdateTaskHTML(
      TaskDBManager.get(enviroment.currentTask.id)
    );
    this.innerContainer.insertAdjacentHTML("afterbegin", updateTaskForm);

    const userChoice = this.innerContainer.querySelector(
      'select[name="task_executor"]'
    );
    for (const user of UserDBManager.getAll()) {
      const innerHTML = htmlBlocksModule.createUserSelectOptionHTML(user);
      userChoice.innerHTML += innerHTML;
    }
  }
  _addButtonsHandlers() {
    super._addButtonsHandlers();
    const backButton = this.innerContainer.querySelector(".back__button");
    const addForm = this.innerContainer.querySelector(".detailed__task__form");
    !backButton
      ? 0
      : backButton.addEventListener("click", (event) => {
          TASK_PAGE.display();
        });
    !addForm
      ? 0
      : addForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const data = {
            priority: event.target.task_priority.value,
            name: event.target.task_name.value,
            assignee: event.target.task_executor.value,
            isPrivate: Boolean(event.target.task_privacy.value),
            status: event.target.task_status.value,
            description: event.target.task_description.value,
          };
          const validationResult = Task.validate(
            new Task(
              data.name,
              data.description,
              data.priority,
              data.assignee,
              data.status,
              data.isPrivate
            )
          );
          if (typeof validationResult === "string") {
            let message;
            switch (validationResult) {
              case constantsModule.ERRORS_DICT.INVALID_TASK_NAME:
                message =
                  event.target.task_name.parentElement.parentElement.querySelector(
                    ".help__message"
                  );
                break;
              case constantsModule.ERRORS_DICT.INVALID_TASK_DESCRIPTION:
                message =
                  event.target.task_description.parentElement.parentElement.querySelector(
                    ".help__message"
                  );
                break;
            }
            message.classList.add("high__prioprity");
            return;
          }

          TaskDBManager.update(enviroment.currentTask.id, data);
          TASK_PAGE.display();
        });
  }

  display() {
    super.display();
    FOOT.display();
  }
}

class UserView extends BaseView {
  constructor(containerId) {
    const main = document.createElement("main");
    main.setAttribute("id", "main");
    super(containerId, main);
  }
  _addDetailedUser() {
    const detailedUser = document.createElement("section");
    detailedUser.classList.add("detailed__user");
    detailedUser.innerHTML = htmlBlocksModule.createUserDetailedHTML(
      UserDBManager.get(enviroment.currentUser.id)
    );
    this.innerContainer.append(detailedUser);
  }

  _addButtonsHandlers() {
    const editButton = this.innerContainer.querySelector(".edit__button");
    const mainButton = this.innerContainer.querySelector(".main__page__button");
    const signOutButton = this.innerContainer.querySelector(".delete__button");
    const showPasswordButton =
      this.innerContainer.querySelector(".show__password");
    !editButton
      ? 0
      : editButton.addEventListener("click", (event) => {
          USER_UPDATE.display();
        });
    !mainButton
      ? 0
      : mainButton.addEventListener("click", (event) => {
          MAIN.display();
        });
    !signOutButton
      ? 0
      : signOutButton.addEventListener("click", (event) => {
          confirmStep("Are you sure want to exit?", () => {
            enviroment.currentUser = undefined;
            HEAD.updateUserContainer();
            enviroment.save();
            MAIN.display();
          });
        });
    !showPasswordButton
      ? 0
      : showPasswordButton.addEventListener("click", (event) => {
          event.preventDefault();
          const password = this.innerContainer.querySelector("#password");
          if (password) {
            if (password.innerText.includes("*")) {
              password.innerText = password.dataset.originalText;
            } else {
              password.dataset.originalText = password.innerText;
              password.innerText = "*".repeat(password.innerText.length);
            }
          }
          const passwords = this.innerContainer.querySelectorAll(
            'input[type="password"]'
          );
          if (passwords.length !== 0) {
            for (const item of passwords) item.type = "text";
          } else {
            const texts =
              this.innerContainer.querySelectorAll('input[type="text"]');
            for (const item of [texts[1], texts[2]]) item.type = "password";
          }
        });
  }

  display() {
    this.innerContainer.classList = ["main"];
    this.innerContainer.classList.add("main__user__page");
    this.innerContainer.innerHTML = "";

    this._addDetailedUser();
    super.display();
    this._addButtonsHandlers();

    FOOT.display();
  }
}

class UpdateUserView extends UserView {
  constructor(id) {
    super(id);
  }

  _addDetailedUser() {
    const detailedUserUpdate = document.createElement("section");
    detailedUserUpdate.classList.add("detailed__user");
    detailedUserUpdate.innerHTML =
      htmlBlocksModule.createUpdateUserDetailedHTML(enviroment.currentUser);
    this.innerContainer.append(detailedUserUpdate);
  }
  _addButtonsHandlers() {
    super._addButtonsHandlers();
    const backButton = this.innerContainer.querySelector(".back__button");
    const addForm = this.innerContainer.querySelector(".user__form");
    !backButton
      ? 0
      : backButton.addEventListener("click", (event) => {
          USER.display();
        });
    !addForm
      ? 0
      : addForm.addEventListener("submit", (event) => {
          event.preventDefault();
          if (
            event.target.password.value !== event.target.password_repeat.value
          ) {
            const message =
              event.target.password_repeat.parentElement.querySelector(
                ".help__message"
              );
            message.textContent = "NOT SIMILAR";
            message.classList.add("high__prioprity");
            return;
          }
          for (let user of UserDBManager.getAll()) {
            if (
              event.target.username.value === user.name &&
              enviroment.currentUser.name !== event.target.username.value
            ) {
              const message =
                event.target.username.parentElement.querySelector(
                  ".help__message"
                );
              message.textContent = "USERNAME EXISTS";
              message.classList.add("high__prioprity");
              return;
            }
          }

          const data = {
            image: event.target.user_avatar.value,
            password: event.target.password.value,
            name: event.target.username.value,
          };

          UserDBManager.update(enviroment.currentUser.id, data);
          HEAD.updateUserContainer();
          USER.display();
        });
  }

  display() {
    super.display();
    FOOT.display();
  }
}

class SignInView extends BaseView {
  constructor(containerId) {
    const main = document.createElement("main");
    main.setAttribute("id", "main");
    super(containerId, main);
  }

  _addForm() {
    const form = htmlBlocksModule.createSignInFormHTML();
    this.innerContainer.insertAdjacentHTML("afterbegin", form);
  }

  _addButtonHandlers() {
    const mainPageButton = this.innerContainer.querySelector(
      ".main__page__button"
    );
    const signUpButton = this.innerContainer.querySelector(".sign__up__button");
    !mainPageButton
      ? 0
      : mainPageButton.addEventListener("click", (event) => {
          MAIN.display();
        });
    !signUpButton
      ? 0
      : signUpButton.addEventListener("click", (event) => {
          SIGN_UP.display();
        });
    const form = this.innerContainer.querySelector(".sign__form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const users = UserDBManager.getAll();
      let targetUser;
      for (const user of users) {
        if (user.login === event.target.login.value) {
          targetUser = user;
          break;
        }
      }
      const helpMessages = this.innerContainer.querySelectorAll(
        ".input__block .help__message"
      );
      if (!targetUser) {
        helpMessages[0].textContent = "Invalid login";
        helpMessages[0].classList.add("high__prioprity");
        return;
      }
      if (targetUser.password !== event.target.password.value) {
        helpMessages[1].textContent = "Invalid password";
        helpMessages[1].classList.add("high__prioprity");
        return;
      }
      enviroment.currentUser = targetUser;
      enviroment.save();
      HEAD.updateUserContainer();
      MAIN.display();
    });
  }

  display() {
    this.innerContainer.classList = ["main"];
    this.innerContainer.classList.add("sign__in__up");
    this.innerContainer.innerHTML = "";

    this._addForm();
    super.display();
    this._addButtonHandlers();
    FOOT.display();
  }
}

class SignUpView extends BaseView {
  constructor(containerId) {
    const main = document.createElement("main");
    main.setAttribute("id", "main");
    super(containerId, main);
  }

  _addForm() {
    const form = htmlBlocksModule.createSignUpFormHTML();
    this.innerContainer.insertAdjacentHTML("afterbegin", form);
  }

  _addButtonHandlers() {
    const mainPageButton = this.innerContainer.querySelector(
      ".main__page__button"
    );
    const signInButton = this.innerContainer.querySelector(".sign__in__button");

    !mainPageButton
      ? 0
      : mainPageButton.addEventListener("click", (event) => {
          MAIN.display();
        });
    !signInButton
      ? 0
      : signInButton.addEventListener("click", (event) => {
          SIGN_IN.display();
        });

    const form = this.innerContainer.querySelector(".sign__form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const users = UserDBManager.getAll();
      const helpMessages = this.innerContainer.querySelectorAll(
        ".input__block .help__message"
      );
      for (const user of users) {
        if (user.login === event.target.login.value) {
          helpMessages[0].textContent = "Login Exists";
          helpMessages[0].classList.add("high__prioprity");
          return;
        }
      }
      if (event.target.password.value !== event.target.password_repeat.value) {
        helpMessages[2].textContent = "Incorrect repeat";
        helpMessages[2].classList.add("high__prioprity");
        return;
      }

      UserDBManager.create(
        event.target.login.value,
        event.target.login.value,
        event.target.password.value
      );

      SIGN_IN.display();
    });
  }

  display() {
    this.innerContainer.classList = ["main"];
    this.innerContainer.classList.add("sign__in__up");
    this.innerContainer.innerHTML = "";

    this._addForm();
    super.display();
    this._addButtonHandlers();
    FOOT.display();
  }
}

function confirmStep(message, func) {
  const modal = document.createElement("div");
  const header = document.createElement("h3");
  const buttons = document.createElement("div");
  const cancelButton = document.createElement("button");
  const confirmButton = document.createElement("button");

  modal.classList.add("modal");
  header.classList.add("modal__header");
  buttons.classList.add("modal__buttons");
  cancelButton.classList.add("standart__button", "invert__button");
  confirmButton.classList.add("standart__button", "invert__button");

  header.textContent = message;
  cancelButton.textContent = "Cancel";
  confirmButton.textContent = "Confirm";

  buttons.append(cancelButton);
  buttons.append(confirmButton);
  modal.append(header);
  modal.append(buttons);

  document.body.insertAdjacentElement("afterend", modal);
  document.body.style.filter = "blur(1rem)";

  cancelButton.addEventListener("click", (event) => {
    modal.remove();
    document.body.style.filter = "";
  });
  confirmButton.addEventListener("click", (event) => {
    modal.remove();
    func();
    document.body.style.filter = "";
  });
}

function message(message) {
  const modal = document.createElement("div");
  const header = document.createElement("h3");
  const buttons = document.createElement("div");
  const confirmButton = document.createElement("button");

  modal.classList.add("modal");
  header.classList.add("modal__header");
  buttons.classList.add("modal__buttons");
  confirmButton.classList.add("standart__button", "invert__button");

  header.textContent = message;
  confirmButton.textContent = "Confirm";

  buttons.append(confirmButton);
  modal.append(header);
  modal.append(buttons);

  document.body.insertAdjacentElement("afterend", modal);
  document.body.style.filter = "blur(1rem)";

  confirmButton.addEventListener("click", (event) => {
    modal.remove();
    document.body.style.filter = "";
  });
}
