class TaskFeedApiService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.token = localStorage.getItem("token");
  }

  async _fetch(url, options) {
    const response = await fetch(url, options);
    console.log(response);
    if (!response.ok) {
      const error = {
        status: response.status,
        statusText: response.statusText,
        message: response.message,
      };
      MainErrorView.display("wrapper", error);
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  }

  async register(data) {
    const url = `${this.apiUrl}user/register/`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return this._fetch(url, options);
  }

  async login(data) {
    const url = `${this.apiUrl}auth/login/`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return this._fetch(url, options);
  }

  async getMyProfile() {
    const url = `${this.apiUrl}user/myProfile/`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return this._fetch(url, options);
  }

  async getComments(taskId) {
    const url = `${this.apiUrl}tasks/${taskId}/comments`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return this._fetch(url, options);
  }

  async postComment(taskId, data) {
    const url = `${this.apiUrl}tasks/${taskId}/comments`;
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return this._fetch(url, options);
  }

  async getUsers() {
    const url = `${this.apiUrl}user/allUsers/`;
    const options = {
      method: "GET",
    };
    return this._fetch(url, options);
  }

  async getTasks(skip, top, status) {
    const url = new URL(`${this.apiUrl}tasks/`);
    url.search = new URLSearchParams({ skip, top, status }).toString();
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return this._fetch(url, options);
  }

  async postTask(data) {
    const url = `${this.apiUrl}tasks/`;
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return this._fetch(url, options);
  }

  async patchTask(taskId, data) {
    const url = `${this.apiUrl}tasks/${taskId}/`;
    const options = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return this._fetch(url, options);
  }

  async deleteTask(taskId) {
    const url = `${this.apiUrl}tasks/${taskId}/`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return this._fetch(url, options);
  }

  async patchUser(data) {
    const url = `${this.apiUrl}user/${
      JSON.parse(localStorage.getItem("user")).id
    }/`;
    console.log(data);
    const options = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return this._fetch(url, options);
  }

  async getTask(id) {
    const url = `${this.apiUrl}tasks/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return this._fetch(url, options);
  }
}

class BaseView {
  static root = document.createElement("div");
  static dynamicElements = {};

  static _makeStaticContent() {}
  static _collectDynamic() {}

  static display(containerId, detailed) {
    this._makeStaticContent(detailed);
    this.outer_container = document.getElementById(containerId);
    const documentContainer = document.getElementById(this.root.id);
    if (documentContainer) {
      documentContainer.replaceWith(this.root);
    } else {
      this.outer_container.append(this.root);
    }
    this._collectDynamic();
  }
}

class HeaderView extends BaseView {
  static _makeStaticContent() {
    this.root = htmlBlocksModule.createHeaderStatic();
  }

  static _collectDynamic() {
    this.dynamicElements.userContainer =
      this.root.querySelector("#user_container");
    this.dynamicElements.logoContainer =
      this.root.querySelector(".logo__container");
  }

  static _updateUserContainer() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.dynamicElements.userContainer.replaceChildren(
        ...htmlBlocksModule.createUserContainerAuthorized(user).children
      );
      this.outer_container.classList.remove("unauthorized");
    } else {
      this.dynamicElements.userContainer.replaceChildren(
        ...htmlBlocksModule.createUserContainerUnauthorized().children
      );
      this.outer_container.classList.add("unauthorized");
    }
  }

  static _addHandlers() {
    this.dynamicElements.userContainer.addEventListener("click", (event) => {
      const signInButton = event.target.closest("#sign_in");
      const signUpButton = event.target.closest("#sign_up");

      const userLinkImg = event.target.closest("img");
      const userLinkSpan = event.target.closest(".link");

      const logutButton = event.target.closest("i");

      const logoContainer = event.target.closest(".logo__container");

      if (signInButton) MainSignInView.display();
      if (signUpButton) MainSignUpView.display();
      if (userLinkImg || userLinkSpan) {
        MainUserDetailedView.display("wrapper");
      }
      if (logutButton) {
        localStorage.clear();
        MainAppView.display("wrapper");
        HeaderView.display("wrapper");
      }
    });
    this.dynamicElements.logoContainer.addEventListener("click", (event) => {
      MainAppView.display("wrapper");
    });
  }

  static display(containerId) {
    super.display(containerId);
    this._updateUserContainer();
    this._addHandlers();
  }
}

class MainAppView extends BaseView {
  static _makeStaticContent() {
    this.root = htmlBlocksModule.createMainAppStatic();
  }

  static _collectDynamic() {
    this.dynamicElements.executorFilter =
      this.root.querySelector("#executor_filter");

    this.dynamicElements.executorAddTaskSelect = this.root.querySelector(
      '.task__form select[name="task_executor"]'
    );
    this.dynamicElements.sectionToDo = this.root.querySelector("#section_todo");
    this.dynamicElements.sectionInProgress = this.root.querySelector(
      "#section_in_progress"
    );
    this.dynamicElements.sectionCompleted =
      this.root.querySelector("#section_completed");
    this.dynamicElements.addTaskForm = this.root.querySelector(".task__form");
    this.dynamicElements.filters = this.root.querySelector(".filters");
  }

  static _addHandlers() {
    this.dynamicElements.addTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let inputs = {
        taskName: event.target.task_name,
        taskExecutor: event.target.task_executor,
        taskDescription: event.target.task_decription,
        taskStatus: event.target.task_status,
        taskPriority: event.target.task_priority,
        taskPrivacy: event.target.task_privacy,
      };

      for (const input of [inputs.taskName, inputs.taskDescription]) {
        const message =
          input.parentElement.parentElement.querySelector(".help__message");
        message.textContent = "";
      }

      if (
        [inputs.taskName, inputs.taskDescription].some((input) => !input.value)
      ) {
        for (const input of [inputs.taskName, inputs.taskDescription]) {
          const message =
            input.parentElement.parentElement.querySelector(".help__message");
          message.textContent = "";
          if (!input.value) {
            message.textContent = "Required Field";
            message.classList.add("high__prioprity");
          }
          return;
        }
      }

      if (inputs.taskName.value.length > 100) {
        const message =
          inputs.taskName.parentElement.parentElement.querySelector(
            ".help__message"
          );
        message.textContent = "Max length - 100";
        message.classList.add("high__prioprity");
        return;
      }

      if (inputs.taskDescription.value.length > 180) {
        const message =
          inputs.taskDescription.parentElement.parentElement.querySelector(
            ".help__message"
          );
        message.textContent = "Max length - 180";
        message.classList.add("high__prioprity");
        return;
      }
      const data = {
        name: inputs.taskName.value,
        description: inputs.taskDescription.value,
        assignee:
          inputs.taskExecutor.value !== "---"
            ? inputs.taskExecutor.value
            : JSON.parse(localStorage.getItem("user")).id,
        status: inputs.taskStatus.value,
        priority: inputs.taskPriority.value,
        isPrivate: inputs.taskPrivacy.value ? true : false,
      };

      API.postTask(data)
        .then((res) => {
          MainAppView.display("wrapper");
        })
        .catch((res) => {});
    });

    this.dynamicElements.addTaskForm.addEventListener("click", (event) => {
      const button = event.target.closest(".input__block__radio");
      if (!button) return;
      const inputBlockBody = event.target.closest(".input__block__body");
      for (const item of inputBlockBody.children)
        item.classList.remove("active__filter");
      button.classList.add("active__filter");
    });

    this.dynamicElements.addTaskForm.addEventListener("reset", (event) => {
      const buttons = event.target.querySelectorAll(".input__block__radio");
      for (const button of buttons) {
        button.classList.remove("active__filter");
        const input = button.querySelector("input");
        if (
          input.value === constantsModule.STATUSES_DICT.TO_DO ||
          input.value == "" ||
          input.value === constantsModule.PRIORITIES_DICT.LOW
        ) {
          button.classList.add("active__filter");
        }
      }
    });
  }

  static updateExecutorFilter() {
    const select = this.dynamicElements.executorFilter.querySelector("select");
    API.getUsers().then((users) => {
      select.innerHTML = "";
      select.append(htmlBlocksModule.createExecutorSelectorOptionALL());
      for (const user of users) {
        select.append(htmlBlocksModule.createExecutorSelectorOption(user));
      }
    });
  }

  static updateExecutorAddTaskSelect() {
    const select = this.dynamicElements.executorAddTaskSelect;
    API.getUsers().then((users) => {
      select.innerHTML = "";
      select.append(htmlBlocksModule.createExecutorSelectorOptionALL());
      for (const user of users) {
        select.append(htmlBlocksModule.createExecutorSelectorOption(user));
      }
    });
  }

  static filterTasks() {
    const filters = this.dynamicElements.filters;
    const executorFilterSelect = filters.querySelector(
      "#executor_filter select"
    );
    const executorFilterValue =
      executorFilterSelect.options[executorFilterSelect.selectedIndex].text;
    const dateFromFilterValueArr = filters
      .querySelector(`#data_filter input[name="date_from"]`)
      .value.split("-");
    dateFromFilterValueArr[1]--;
    const dateFrom = new Date(...dateFromFilterValueArr);

    const dateToFilterValueArr = filters
      .querySelector(`#data_filter input[name="date_to"]`)
      .value.split("-");
    dateToFilterValueArr[1]--;
    const dateTo = new Date(...dateFromFilterValueArr);

    const taskNameFilterValue = filters.querySelector(
      "#task_name_filter input"
    ).value;
    const priorityFilters = Array.from(
      filters.querySelectorAll("#priority_filter input:checked")
    ).map((input) => input.value);
    const PrivacyFilters = Array.from(
      filters.querySelectorAll("#privacy_filter input:checked")
    ).map((input) => (input.value ? "Private" : "Public"));

    for (const section of [
      this.dynamicElements.sectionToDo,
      this.dynamicElements.sectionInProgress,
      this.dynamicElements.sectionCompleted,
    ]) {
      for (const task of section.querySelectorAll(".task")) {
        const executor = task.querySelector("#task__executor").textContent;
        const dateArr = task
          .querySelector(".task__date")
          .textContent.split(" ")[0]
          .split(".")
          .reverse();
        dateArr[1]--;
        const date = new Date(...dateArr);

        const taskName = task.querySelector("#task__name").textContent;
        const priority = task.querySelector(".task__priority").textContent;
        const isPrivate = task.querySelector(".task__privacy").textContent;
        task.style.display =
          (executorFilterValue === "---" || executor === executorFilterValue) &&
          (!dateFrom.toJSON() || date >= dateFrom) &&
          (!dateTo.toJSON() || date <= dateTo) &&
          (!taskNameFilterValue || taskName.includes(taskNameFilterValue)) &&
          (priorityFilters.length === 0 ||
            priorityFilters.includes(priority)) &&
          (PrivacyFilters.length === 0 || PrivacyFilters.includes(isPrivate))
            ? "block"
            : "none";
      }
    }
  }

  static _addFilterTasksHandler() {
    const filters = this.dynamicElements.filters;
    filters.addEventListener("change", (event) => {
      this.filterTasks();
    });
    filters.addEventListener("click", (event) => {
      const checkBox = event.target.closest(`input[type="checkbox"]`);
      if (!checkBox) return;
      checkBox.parentElement.classList.toggle("active__filter");
    });

    const typeOfPageBlock = filters.querySelector("#type_of_page_filter");
    typeOfPageBlock.addEventListener("click", (event) => {
      event.preventDefault();
      const inputs = typeOfPageBlock.querySelectorAll("input");
      const button = event.target.closest("label");
      if (!button) return;
      for (const input of inputs)
        input.parentElement.classList.toggle("active__filter");
      this.root
        .querySelector(".main__window")
        .classList.toggle("main__window__list");
    });
    const listView = this.root.querySelector(".main__window");
    if (!listView) return;
    listView.addEventListener("click", (event) => {
      const header = event.target.closest(".section__header");
      if (!header) return;
      header.classList.toggle("section__header__active");
    });
  }

  static updateTaskSection(section, status) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) user = { id: "-1" };
    const container = section.querySelector(".tasks__container");
    const taskSizePool = container.children.length + 9;

    API.getTasks(0, taskSizePool, 0).then((tasks) => {
      tasks = tasks
        .filter(
          (task) =>
            task.status === status &&
            !(task.isPrivate == true && task.assignee.id !== user.id)
        )
        .splice(0, taskSizePool + 1);
      container.innerHTML = "";
      let buttonFlag = false;
      if (tasks.length > taskSizePool) {
        buttonFlag = true;
      }
      for (const task of tasks) {
        const taskDiv = htmlBlocksModule.createTask(task);
        taskDiv
          .querySelector(".task__main")
          .addEventListener("click", () =>
            MainTaskDetailedView.display("wrapper", task)
          );
        taskDiv
          .querySelector(".edit__button")
          .addEventListener("click", (event) => {
            if (
              task.creator.id !== JSON.parse(localStorage.getItem("user")).id
            ) {
              message("You are not the creator of this task");
              return;
            }
            MainTaskDetailedUpdateView.display("wrapper", task);
          });
        taskDiv
          .querySelector(".delete__button")
          .addEventListener("click", () => {
            if (
              task.creator.id !== JSON.parse(localStorage.getItem("user")).id
            ) {
              message("You are not the creator of this task");
              return;
            }
            confirmStep("Are you sure to delete this task?", () => {
              API.deleteTask(task.id).then((res) => MainAppView.display());
            });
          });
        container.append(taskDiv);
      }
      const loadMoreButton = htmlBlocksModule.createLoadMoreButton();
      loadMoreButton.addEventListener("click", () =>
        this.updateTaskSection(section, status)
      );
      if (buttonFlag) container.append(loadMoreButton);
      this.filterTasks();
    });
  }

  static updateToDoSection() {
    this.updateTaskSection(
      this.dynamicElements.sectionToDo,
      constantsModule.STATUSES_DICT.TO_DO
    );
  }

  static updateInProgressSection() {
    this.updateTaskSection(
      this.dynamicElements.sectionInProgress,
      constantsModule.STATUSES_DICT.IN_PROGRESS
    );
  }

  static updateCompletedSection() {
    this.updateTaskSection(
      this.dynamicElements.sectionCompleted,
      constantsModule.STATUSES_DICT.COMPLETED
    );
  }

  static display(containerId) {
    super.display(containerId);
    this.updateExecutorFilter();
    this.updateExecutorAddTaskSelect();
    this.updateToDoSection();
    this.updateInProgressSection();
    this.updateCompletedSection();
    this._addHandlers();
    this._addFilterTasksHandler();
  }
}

class FooterView extends BaseView {
  static _makeStaticContent() {
    this.root = htmlBlocksModule.createFooterStatic();
  }
}

class MainTaskDetailedView extends BaseView {
  static _makeStaticContent(task) {
    this.root = htmlBlocksModule.createTaskDetailed(task);
  }
  static _collectDynamic() {
    this.dynamicElements.commentsList =
      this.root.querySelector(".comments__list");
    this.dynamicElements.task = this.root.querySelector(".task");
    this.dynamicElements.commentForm = this.root.querySelector(".add__comment");
  }

  static _addHandlers(task) {
    this.dynamicElements.task.addEventListener("click", (event) => {
      const button = event.target.closest(".standart__button");
      if (button) {
        event.preventDefault();
        if (button.classList.contains("main__page__button"))
          MainAppView.display("wrapper");
        if (button.classList.contains("delete__button")) {
          if (task.creator.id !== JSON.parse(localStorage.getItem("user")).id) {
            message("You are not the creator of this task");
            return;
          }
          confirmStep("Are you sure to delete this task?", (res) =>
            API.deleteTask(task.id).then(MainAppView.display("wrapper"))
          );
        }
        if (button.classList.contains("edit__button")) {
          if (task.creator.id !== JSON.parse(localStorage.getItem("user")).id) {
            message("You are not the creator of this task");
            return;
          }
          MainTaskDetailedUpdateView.display("wrapper", task);
        }
      }
    });

    this.dynamicElements.commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (event.target.inner_text.value.length > 280) {
        const message =
          event.target.inner_text.parentElement.parentElement.querySelector(
            ".help__message"
          );
        message.textContent = "Max length - 280";
        message.classList.add("high__priority");
        return;
      }
      const data = {
        text: event.target.inner_text.value,
      };

      API.postComment(task.id, data).then(
        MainTaskDetailedView.display("wrapper", task)
      );
    });
  }

  static _updateCommentsList(task) {
    API.getComments(task.id).then((comments) => {
      for (const comment of comments) {
        this.dynamicElements.commentsList.append(
          htmlBlocksModule.createComment(comment)
        );
      }
    });
  }

  static display(containerId, task) {
    super.display(containerId, task);
    this._updateCommentsList(task);
    this._addHandlers(task);
  }
}

class MainTaskDetailedUpdateView extends BaseView {
  static _makeStaticContent(task) {
    this.root = htmlBlocksModule.createTaskDetailedUpdate(task);
  }
  static _collectDynamic() {
    this.dynamicElements.commentsList =
      this.root.querySelector(".comments__list");
    this.dynamicElements.executorSelect = this.root.querySelector(
      `select[name="task_executor"]`
    );
    this.dynamicElements.taskForm = this.root.querySelector(
      ".detailed__task__form"
    );
    this.dynamicElements.commentForm = this.root.querySelector(".add__comment");
  }

  static updateCommentsList(task) {
    API.getComments(task.id).then((comments) => {
      for (const comment of comments) {
        this.dynamicElements.commentsList.append(
          htmlBlocksModule.createComment(comment)
        );
      }
    });
  }

  static _addHandlers(task) {
    this.dynamicElements.taskForm.addEventListener("click", (event) => {
      const button = event.target.closest(".standart__button");
      if (button && !button.classList.contains("add__button")) {
        if (button.classList.contains("back__button"))
          MainTaskDetailedView.display("wrapper", task);
      }
    });

    this.dynamicElements.taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let inputs = {
        taskName: event.target.task_name,
        taskExecutor: event.target.task_executor,
        taskDescription: event.target.task_description,
        taskStatus: event.target.task_status,
        taskPriority: event.target.task_priority,
        taskPrivacy: event.target.task_privacy,
      };

      for (const input of [inputs.taskName, inputs.taskDescription]) {
        const message =
          input.parentElement.parentElement.querySelector(".help__message");
        message.textContent = "";
      }

      if (
        [inputs.taskName, inputs.taskDescription].some((input) => !input.value)
      ) {
        for (const input of [inputs.taskName, inputs.taskDescription]) {
          const message =
            input.parentElement.parentElement.querySelector(".help__message");
          message.textContent = "";
          if (!input.value) {
            console.log(input.value);
            message.textContent = "Required Field";
            message.classList.add("high__prioprity");
          }
          return;
        }
      }

      if (inputs.taskName.value.length > 100) {
        const message =
          inputs.taskName.parentElement.parentElement.querySelector(
            ".help__message"
          );
        message.textContent = "Max length - 100";
        message.classList.add("high__prioprity");
        return;
      }
      if (inputs.taskDescription.value.length > 180) {
        const message =
          inputs.taskDescription.parentElement.parentElement.querySelector(
            ".help__message"
          );
        message.textContent = "Max length - 180";
        message.classList.add("high__prioprity");
        return;
      }
      const data = {
        name: inputs.taskName.value,
        assignee: inputs.taskExecutor.value,
        description: inputs.taskDescription.value,
        status: inputs.taskStatus.value,
        priority: inputs.taskPriority.value,
        isPrivate: inputs.taskPrivacy.value ? true : false,
      };
      API.patchTask(task.id, data)
        .then((res) => {
          console.log(res);
          API.getTask(task.id).then((task_) => {
            MainTaskDetailedView.display("wrapper", task_);
          });
        })
        .catch((res) => {});
    });

    this.dynamicElements.commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (event.target.inner_text.value.length > 280) {
        const message =
          event.target.inner_text.parentElement.parentElement.querySelector(
            ".help__message"
          );
        message.textContent = "Max length - 280";
        message.classList.add("high__priority");
        return;
      }
      const data = {
        text: event.target.inner_text.value,
      };

      API.postComment(task.id, data).then(
        MainTaskDetailedUpdateView.display("wrapper", task)
      );
    });
  }

  static updateExecutorSelect(task) {
    const select = this.dynamicElements.executorSelect;
    API.getUsers().then((users) => {
      select.innerHTML = "";
      select.append(
        htmlBlocksModule.createExecutorSelectorOption(task.assignee)
      );
      for (const user of users) {
        if (user.id === task.assignee.id) continue;
        select.append(htmlBlocksModule.createExecutorSelectorOption(user));
      }
    });
  }

  static display(containerId, task) {
    super.display(containerId, task);
    this.updateCommentsList(task);
    this.updateExecutorSelect(task);
    this._addHandlers(task);
  }
}

class MainSignUpView extends BaseView {
  static _makeStaticContent() {
    this.root = htmlBlocksModule.createSignUp();
  }

  static _collectDynamic() {
    this.dynamicElements.form = this.root.querySelector(".sign__form");
  }

  static _addHandlers() {
    this.dynamicElements.form.addEventListener("click", (event) => {
      const button = event.target.closest(".standart__button");
      if (
        button &&
        !button.classList.contains("confirm__button") &&
        !button.classList.contains("file__input")
      ) {
        event.preventDefault();
        if (button.classList.contains("sign__in__button"))
          MainSignInView.display("wrapper");
        if (button.classList.contains("main__page__button"))
          MainAppView.display("wrapper");
      }
    });

    this.dynamicElements.form.addEventListener("change", (event) => {
      event.preventDefault();
      const fileInput = event.target.closest(`input[type="file"]`);
      if (!fileInput) return;
      fileInput.parentElement.style.backgroundColor = "var(--primary-color)";
      fileInput.parentElement.style.opacity = "0.3";
      if (!fileInput) return;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileInput.files[0]);
      fileReader.onload = () => {
        fileInput.parentElement.parentElement.querySelector("img").src =
          fileReader.result;
        fileInput.photo = fileReader.result.replace(
          /^data:image\/(png|jpeg|jpg);base64,/,
          ""
        );
      };
    });

    this.dynamicElements.form.addEventListener("submit", (event) => {
      event.preventDefault();

      let inputs = {
        username: event.target.username,
        login: event.target.login,
        password: event.target.password,
        password_repeat: event.target.password_repeat,
      };

      for (const input of Object.values(inputs)) {
        const message =
          input.parentElement.parentElement.querySelector(".help__message");
        message.textContent = "";
      }
      if (Object.values(inputs).some((input) => !input.value)) {
        for (const input of Object.values(inputs)) {
          const message =
            input.parentElement.parentElement.querySelector(".help__message");
          message.textContent = "";
          if (!input.value) {
            message.textContent = "Required Field";
            message.classList.add("high__prioprity");
          }
        }
        return;
      }
      if (inputs.password.value !== inputs.password_repeat.value) {
        const message =
          inputs.password_rep.parentElement.parentElement.querySelector(
            ".help__message"
          );
        message.textContent = "Passwords are not same";
        message.classList.add("high__prioprity");
        return;
      }

      if (inputs.username.value.length > 100) {
        const message =
          inputs.username.parentElement.parentElement.querySelector(
            ".help__message"
          );
        message.textContent = "Max length - 100";
        message.classList.add("high__prioprity");
        return;
      }

      if (inputs.login.value.includes(" ")) {
        const message =
          inputs.login.parentElement.parentElement.querySelector(
            ".help__message"
          );
        message.textContent = "Can't include ' '";
        message.classList.add("high__prioprity");
        return;
      }
      console.log(event.target.user_avatar.photo);
      if (!event.target.user_avatar.photo) {
        event.target.user_avatar.parentElement.style.backgroundColor = "red";
        event.target.user_avatar.parentElement.style.opacity = "0.8";
        return;
      }
      const data = {
        login: inputs.login.value,
        userName: inputs.username.value,
        password: inputs.password.value,
        retypedPassword: inputs.password_repeat.value,
        photo: event.target.user_avatar.photo,
      };
      API.getUsers().then((users) => {
        for (const user of users) {
          if (user.userName === data.userName) {
            const message =
              inputs.username.parentElement.parentElement.querySelector(
                ".help__message"
              );
            message.textContent = "This username is already taken";
            message.classList.add("high__prioprity");
            return;
          }
          if (user.login === data.login) {
            const message =
              inputs.login.parentElement.parentElement.querySelector(
                ".help__message"
              );
            message.textContent = "This login is already taken";
            message.classList.add("high__prioprity");
            return;
          }
        }
        API.register(data).then((res) => MainSignInView.display());
      });
    });
  }

  static display(containerId) {
    super.display(containerId);
    this._addHandlers();
  }
}

class MainSignInView extends BaseView {
  static _makeStaticContent() {
    this.root = htmlBlocksModule.createSignIn();
  }

  static _collectDynamic() {
    this.dynamicElements.form = this.root.querySelector(".sign__form");
  }

  static _addHandlers() {
    this.dynamicElements.form.addEventListener("click", (event) => {
      const button = event.target.closest(".standart__button");
      if (button && !button.classList.contains("confirm__button")) {
        event.preventDefault();
        if (button.classList.contains("sign__up__button"))
          MainSignUpView.display("wrapper");
        if (button.classList.contains("main__page__button"))
          MainAppView.display("wrapper");
      }
    });

    this.dynamicElements.form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!event.target.login.value || !event.target.password.value) {
        let inputs = [event.target.login, event.target.password];
        for (const input of inputs) {
          const message =
            input.parentElement.parentElement.querySelector(".help__message");
          message.textContent = "";
          if (!input.value) {
            message.textContent = "Required Field";
            message.classList.add("high__prioprity");
          }
        }
        return;
      }

      const data = {
        login: event.target.login.value,
        password: event.target.password.value,
      };

      API.login(data).then((res) => {
        localStorage.setItem("token", res.token);
        API.getMyProfile().then((res) => {
          res.password = data.password;
          localStorage.setItem("user", JSON.stringify(res));
          MainAppView.display("wrapper");
          HeaderView.display("wrapper");
        });
      });
    });
  }

  static display(containerId) {
    super.display(containerId);
    this._addHandlers();
  }
}

class MainUserDetailedView extends BaseView {
  static _makeStaticContent() {
    this.root = htmlBlocksModule.createUserDetialedView(
      JSON.parse(localStorage.getItem("user"))
    );
  }

  static _collectDynamic() {
    this.dynamicElements.userContainer = this.root.querySelector(".user");
  }

  static _addHandlers() {
    this.dynamicElements.userContainer.addEventListener("click", (event) => {
      event.preventDefault();
      const button = event.target.closest("button");
      if (button) {
        if (button.classList.contains("main__page__button"))
          MainAppView.display("wrapper");
        if (button.classList.contains("delete__button")) {
          localStorage.clear();
          MainAppView.display("wrapper");
          HeaderView.display("wrapper");
        }

        if (button.classList.contains("edit__button"))
          MainUserUdateView.display("wrapper");

        if (button.classList.contains("show__password")) {
          const password =
            this.dynamicElements.userContainer.querySelector("#password");
          if (password.innerText.includes("*")) {
            password.innerText = JSON.parse(
              localStorage.getItem("user")
            ).password;
          } else {
            password.innerText = "*".repeat(password.innerText.length);
          }
        }
      }
    });
  }

  static display(containerId) {
    super.display(containerId);
    this._addHandlers();
  }
}

class MainUserUdateView extends BaseView {
  static _makeStaticContent() {
    this.root = htmlBlocksModule.createUserDetialedUpdateView(
      JSON.parse(localStorage.getItem("user"))
    );
  }

  static _collectDynamic() {
    this.dynamicElements.userContainer = this.root.querySelector(".user");
    this.dynamicElements.userForm = this.root.querySelector(".user__form");
  }

  static _addHandlers() {
    this.dynamicElements.userContainer.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (button && !button.classList.contains("add__button")&& !button.classList.contains("delete__button")) {
        event.preventDefault();
        if (button.classList.contains("back__button"))
          MainUserDetailedView.display("wrapper");

        if (button.classList.contains("show__password")) {
          const passwords = this.dynamicElements.userContainer.querySelectorAll(
            'input[type="password"]'
          );
          if (passwords.length !== 0) {
            for (const item of passwords) item.type = "text";
          } else {
            const texts =
              this.dynamicElements.userContainer.querySelectorAll(
                'input[type="text"]'
              );
            for (const item of [texts[1], texts[2]]) item.type = "password";
          }
        }
      }
    });

    this.dynamicElements.userForm.addEventListener("change", (event) => {
      event.preventDefault();
      const fileInput = event.target.closest(`input[type="file"]`);
      if (!fileInput) return;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileInput.files[0]);
      fileReader.onload = () => {
        fileInput.parentElement.parentElement.querySelector("img").src =
          fileReader.result;
        fileInput.setAttribute(
          "photo",
          fileReader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
        );
      };
    });

    this.dynamicElements.userForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let inputs = {
        username: event.target.username,
        password: event.target.password,
        password_rep: event.target.password_repeat,
      };

      for (const input of Object.values(inputs)) {
        const message =
          input.parentElement.parentElement.querySelector(".help__message");
        message.textContent = "";
      }

      if (Object.values(inputs).some((input) => !input.value)) {
        for (const input of Object.values(inputs)) {
          const message =
            input.parentElement.parentElement.querySelector(".help__message");
          message.textContent = "";
          if (!input.value) {
            message.textContent = "Required Field";
            message.classList.add("high__prioprity");
          }
          return;
        }
      }

      if (inputs.password.value !== inputs.password_rep.value) {
        const message =
          inputs.password_rep.parentElement.parentElement.querySelector(
            ".help__message"
          );
        message.textContent = "Passwords are not same";
        message.classList.add("high__prioprity");
        return;
      }

      if (inputs.username.value.length > 100) {
        const message =
          inputs.username.parentElement.parentElement.querySelector(
            ".help__message"
          );
        message.textContent = "Max length - 100";
        message.classList.add("high__prioprity");
        return;
      }

      API.getUsers().then((users) => {
        if (users.some((user) => user.userName === inputs.username.value)) {
          const message =
            inputs.username.parentElement.parentElement.querySelector(
              ".help__message"
            );
          message.textContent = "This username is already taken";
          message.classList.add("high__prioprity");
          return;
        }
        const data = {
          userName: event.target.username.value,
          password: event.target.password.value,
          retypedPassword: event.target.password_repeat.value,
          photo: event.target.user_avatar.getAttribute("photo"),
        };
        API.patchUser(data).then((res) => {
          const newUser = JSON.parse(localStorage.getItem("user"));
          newUser.userName = data.userName;
          newUser.password = data.password;
          newUser.photo = data.photo;
          localStorage.setItem("user", JSON.stringify(newUser));
          MainUserDetailedView.display("wrapper");
          HeaderView.display("wrapper");
        });
      });
    });
  }

  static display(containerId) {
    super.display(containerId);
    this._addHandlers();
  }
}

class MainErrorView extends BaseView {
  static _makeStaticContent(error) {
    this.root = htmlBlocksModule.createErrorPage(error);
  }

  static display(containerId, error) {
    super.display(containerId, error);
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
  document.body.style.pointerEvents = "none";

  cancelButton.addEventListener("click", (event) => {
    modal.remove();
    document.body.style.filter = "";
    document.body.style.pointerEvents = "auto";
  });
  confirmButton.addEventListener("click", (event) => {
    modal.remove();
    func();
    document.body.style.filter = "";
    document.body.style.pointerEvents = "auto";
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
