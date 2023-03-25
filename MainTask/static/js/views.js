class BaseView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.innerContainer = "";
    BaseView.validate(this);
  }
  static validate(view) {
    if (typeof view.container !== "object")
      throw new Error(constantsModule.ERRORS_DICT.VALIDATION_ERROR);
  }
  display() {
    this.container.append(this.innerContainer);
  }
}

class HeaderView extends BaseView {
  constructor(containerId) {
    super(containerId);
    this.innerContainer = document.createElement("header");
  }

  display() {
    this.innerContainer.classList.add("header");

    const logoContainer = document.createElement("div");
    logoContainer.classList.add("logo__container");
    logoContainer.innerHTML = `
        <img src="./static/img/Logo.svg" alt="logo" class="logo" />
        <div class="app__name">Task Manager</div>
    `;
    this.innerContainer.append(logoContainer);

    const userContainer = document.createElement("div");
    userContainer.classList.add("user__container");
    userContainer.innerHTML = enviroment.currentUser
      ? `
        <div class="username">
            <a href="./user_page.html" class="link">${enviroment.currentUser.name} </a
            ><i
              class="fa-solid fa-right-from-bracket clickable__element dangerous__icon"
            ></i>
        </div>
        <a href="./user_page.html" class="link">
            <img
              src="${enviroment.currentUser.image}"
              alt="user__avatar"
              class="user__avatar clickable__element"
            />
        </a>
    `
      : `
        <a href="#" class="link">
            <button class="standart__button invert__button">
              SING IN <i class="fa fa-sign-in" aria-hidden="true"></i>
            </button>
        </a>
        <a href="#" class="link">
            <button class="standart__button invert__button">
              SING UP <i class="fa fa-sign-in" aria-hidden="true"></i>
            </button>
        </a>
    `;
    this.innerContainer.append(userContainer);
    super.display();
  }
}

class MainView extends BaseView {
  constructor(containerId) {
    super(containerId);
    this.innerContainer = document.createElement("main");
  }

  createUserSelectOptions() {
     
  }

  addFilters() {
    const filters = document.createElement("section");
    filters.classList.add("filters");

    filters.innerHTML = `
        <div class="filters__part">
        <div class="input__block" id="executor_filter">
          <h3 class="input__block__name">Executor</h3>
          <select
            type=""
            name="executor"
            class="input__block__select input__block__input"
          >
            <option name="username" value="All" class="input__block__option">
              All
            </option>
          </select>
        </div>
        <div class="input__block" id="data_filter">
          <h3 class="input__block__name">Date</h3>
          <div class="input__block__body">
            <input
              type="date"
              name="date_from"
              class="input__block__input"
            />-<input type="date" name="date_to" class="input__block__input" />
          </div>
        </div>
        <div class="input__block" id="inner_text_filter">
          <h3 class="input__block__name">Inner Text</h3>
          <div class="input__block__body">
            <textarea
              name="inner_text"
              class="input__block__input input__block__textarea"
            ></textarea>
            <div class="help__message">max - 180</div>
          </div>
        </div>
      </div>
      <div class="filters__part">
        <div class="input__block" id="priority_filter">
          <h3 class="input__block__name">Priority</h3>
          <div class="input__block__body">
            <label class="input__block__checkbox"
              ><input
                type="checkbox"
                name="priority"
                value="low"
                class="input__block__input"
              />Low</label
            >
            <label class="input__block__checkbox"
              ><input
                type="checkbox"
                name="priority"
                value="medium"
                class="input__block__input"
              />Medium</label
            >
            <label class="input__block__checkbox"
              ><input
                type="checkbox"
                name="priority"
                value="high"
                class="input__block__input"
              />High</label
            >
          </div>
        </div>
        <div class="input__block" id="privacy_filter">
          <h3 class="input__block__name">Privacy</h3>
          <div class="input__block__body">
            <label class="input__block__checkbox"
              ><input
                type="checkbox"
                name="privacy"
                value="private"
                class="input__block__input"
              />Private</label
            >
            <label class="input__block__checkbox"
              ><input
                type="checkbox"
                name="privacy"
                value="public"
                class="input__block__input"
              />Public</label
            >
          </div>
        </div>
        <div class="input__block" id="type_of_page_filter">
          <label class="input__block__radio active__input"
            ><input
              type="radio"
              name="type_of_page"
              value="table"
              checked
              class="input__block__input"
            />Table</label
          >
          <label class="input__block__radio"
            ><input
              type="radio"
              name="type_of_page"
              value="list"
              class="input__block__input"
            />List</label
          >
        </div>
      </div>
        `;
        this.innerContainer.append(filters)
  }
  addAppTable() {
    const appTable = document.createElement("section");
    appTable.classList.add("app__table");
    const mainWindow = document.createElement("div");
    mainWindow.classList.add("main__window");
    mainWindow.innerHTML = `
        <article class="main__window__section" id="section_todo">
            <div class="section__header">To Do</div>
            <div class="tasks__container scrollable__element">
              <button class="disabled__element standart__button neutral__button">
                LOAD MORE <i class="fa-solid fa-angles-down"></i>
              </button>
            </div>
          </article>
          <article class="main__window__section" id="section_in_progress">
            <div class="section__header">In Progress</div>
            <div class="tasks__container scrollable__element">
              <button class="disabled__element standart__button neutral__button">
                LOAD MORE <i class="fa-solid fa-angles-down"></i>
              </button>
            </div>
          </article>
          <article class="main__window__section" id="section_completed">
            <div class="section__header">Completed</div>
            <div class="tasks__container scrollable__element">
              <button class="disabled__element standart__button neutral__button">
                LOAD MORE <i class="fa-solid fa-angles-down"></i>
              </button>
            </div>
          </article>
        `;
    appTable.append(mainWindow);

    const addNewTask = document.createElement("aside");
    addNewTask.classList.add("add__new__task");
    addNewTask.innerHTML = `
        <div class="section__header">Add New Task</div>
        <form action="#" class="task__form">
          <div class="task__form__part">
            <div class="input__block">
              <h3 class="input__block__name">Task Name*</h3>
              <div class="input__block__body">
                <input
                  type="text"
                  name="task_name"
                  class="input__block__input"
                />
              </div>
              <span class="help__message">max - 100</span>
            </div>

            <div class="input__block">
              <h3 class="input__block__name">Executor</h3>
              <select
                type=""
                name="task_executor"
                class="input__block__select input__block__input"
              >
                <option
                  name="username"
                  value="User_01"
                  class="input__block__option"
                >
                  User_01
                </option>
                <option
                  name="username"
                  value="User_02"
                  class="input__block__option"
                >
                  User_02
                </option>
                <option
                  name="username"
                  value="User_03"
                  class="input__block__option"
                >
                  User_03
                </option>
              </select>
            </div>

            <div class="input__block">
              <h3 class="input__block__name">Description*</h3>
              <div class="input__block__body">
                <textarea
                  name="task_decription"
                  class="input__block__input input__block__textarea"
                ></textarea>
              </div>
              <div class="help__message">max - 180</div>
            </div>
          </div>

          <div class="task__form__part">
            <div class="input__block">
              <h3 class="input__block__name">Status</h3>
              <div class="input__block__body">
                <label class="input__block__radio"
                  ><input
                    type="radio"
                    name="task_status"
                    value="in_progress"
                    class="input__block__input"
                  />In Progress</label
                >
                <label class="input__block__radio"
                  ><input
                    type="radio"
                    name="in_progress"
                    value="completed"
                    class="input__block__input"
                  />Completed</label
                >
                <label class="active__input input__block__radio"
                  ><input
                    type="radio"
                    name="in_progress"
                    value="to_do"
                    class="input__block__input"
                  />To Do</label
                >
              </div>
            </div>

            <div class="input__block">
              <h3 class="input__block__name">Priority*</h3>
              <div class="input__block__body">
                <label class="input__block__radio"
                  ><input
                    type="radio"
                    name="task_priority"
                    value="low"
                    class="input__block__input"
                  />Low</label
                >
                <label class="input__block__radio"
                  ><input
                    type="radio"
                    name="task_priority"
                    value="medium"
                    class="input__block__input"
                  />Medium</label
                >
                <label class="input__block__radio"
                  ><input
                    type="radio"
                    name="task_priority"
                    value="high"
                    class="input__block__input"
                  />High</label
                >
              </div>
            </div>

            <div class="input__block">
              <h3 class="input__block__name">Privacy</h3>
              <div class="input__block__body">
                <label class="input__block__radio"
                  ><input
                    type="radio"
                    name="task_privacy"
                    value="private"
                    class="input__block__input"
                  />Private</label
                >
                <label class="active__input input__block__radio"
                  ><input
                    type="radio"
                    name="task_privacy"
                    value="public"
                    class="input__block__input"
                  />Public</label
                >
              </div>
            </div>
          </div>

          <hr class="line" />
          <div class="form__buttons">
            <button type="reset" class="standart__button delete__button">
              CLEAR <i class="fa fa-undo" aria-hidden="true"></i>
            </button>
            <button type="submit" class="standart__button add__button">
              ADD <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </form>
        `;
    appTable.append(addNewTask);

    this.innerContainer.append(appTable);
  }
  display() {
    this.innerContainer.classList.add("main");
    this.addFilters();
    this.addAppTable();

    super.display();
  }
}
