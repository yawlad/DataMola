const htmlBlocksModule = (() => {
  function getPriorityClass(priority) {
    switch (priority) {
      case constantsModule.PRIORITIES_DICT.LOW:
        return "low__prioprity";
      case constantsModule.PRIORITIES_DICT.MEDIUM:
        return "medium__prioprity";
      case constantsModule.PRIORITIES_DICT.HIGH:
        return "high__prioprity";
    }
  }

  function getFormatedDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  function getPrivacy(privacy) {
    return privacy ? "Private" : "Public";
  }

  function createLogoContainerInnerHTML() {
    return `
    <img src="./static/img/Logo.svg" alt="logo" class="logo" />
    <div class="app__name">Task Manager</div>
    `;
  }

  function createHeaderLoggedInnerHTML() {
    return `
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
    `;
  }

  function createHeaderNonLoggedInnerHTML() {
    return `
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
  }

  function createFiltersInnerHTML() {
    return `
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
        /><input type="date" name="date_to" class="input__block__input" />
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
  }

  function createMainWindowInnerHTML() {
    return `
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
  }

  function createAddTaskInnerHTML() {
    return `
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
  }

  function createFilterUserSelectInnerHTML() {
    return `
    <option
        name="username"
        value="All"
        class="input__block__option"
    >All</option>
    `;
  }

  function createUserSelectOptionHTML(user) {
    return `
    <option
        name="username"
        value="${user.id}"
        class="input__block__option"
    >${user.name}</option>`;
  }

  function createTableTaskHTML(task) {
    return `
    <div class="task" id="task-${task.id}">
    <div class="task__additional__info">
      <div class="task__priority ${getPriorityClass(task.priority)}">
        ${task.priority}
      </div>
      <div class="task__date">${getFormatedDate(task.createdAt)}</div>
    </div>
    <a class="task__main" href="./task_page.html">
      <div class="task__main__content__item">
        Task Name: <span id="task__name">${task.name}</span>
      </div>
      <div class="task__main__content__item">
        Executor: <span id="task__executor">${task.assignee}</span>
      </div>
      <div class="task__main__content__item">
        Status: <span id="task__status">${task.status}</span>
      </div>
      <div class="task__main__content__item">
        Description:
        <span id="task__description"
          >${task.description}</span
        >
      </div>
    </a>
    <div class="task__additional__info">
      <div class="task__privacy">${getPrivacy(task.privacy)}</div>
      <div class="task__comments">
      ${task.comments.length} <i class="fa fa-comment" aria-hidden="true"></i>
      </div>
    </div>
    <hr class="line" />
    <div class="task__bottom">
      <a href="./task_page_update.html" class="link">
        <button class="standart__button edit__button">
          EDIT <i class="fa-solid fa-pen"></i>
        </button>
      </a>
      <button class="standart__button delete__button">
        DELETE <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
  </div>`;
  }

  function createLoadMoreButtonHTML() {
    return `
    <button class="disabled__element standart__button neutral__button">
        LOAD MORE <i class="fa-solid fa-angles-down"></i>
    </button>
    `;
  }

  function createTaskDetailedHTML(task) {
    return `
    <h2 class="section__header">${task.name}</h2>
    <div class="task">
      <div class="task__main__content__item">
        Priority:
        <span id="task__priority" class="${getPriorityClass(task.priority)}"
          >Low priority</span
        >
      </div>
      <div class="task__main__content__item">
        Task Name: <span id="task__name">${task.name}</span>
      </div>
      <div class="task__main__content__item">
        Executor: <span id="task__executor">${task.assignee}</span>
      </div>
      <div class="task__main__content__item">
        Privacy: <span id="task__privacy">${getPrivacy(task.isPrivate)}</span>
      </div>

      <div class="task__main__content__item">
        Status: <span id="task__status">${task.status}</span>
      </div>
      <div class="task__main__content__item">
        Description:
        <span id="task__description"
          >${task.description}</span
        >
      </div>
      <div class="task__additional__info">
        <div class="task__date" id="task__date">${getFormatedDate(task.createdAt)}</div>

        <div class="task__comments" id="task__comments">
        ${task.comments.length} <i class="fa fa-comment" aria-hidden="true"></i>
        </div>
      </div>

      <hr class="line" />
      <div class="task__bottom">
        <a
          href="./task_page_update.html"
          class="standart__button edit__button"
        >
          EDIT <i class="fa-solid fa-pen"></i>
        </a>
        <a
          href="./main_table.html"
          class="standart__button invert__button"
        >
          MAIN PAGE <i class="fa-solid fa-house"></i>
        </a>
        <button class="standart__button delete__button">
          DELETE <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    `;
  }
  function createCommentsInnerHTML(){
    return `
    <h2 class="section__header">Comments</h2>
    <div class="comments__body">
      <div class="comments__list scrollable__element">
      </div>  
      <hr class="line" />
      <form action="#" class="add__comment">
        <div class="input__block">
          <h3 class="input__block__name">Comment</h3>
          <div class="input__block__body">
            <textarea
              name="inner_text"
              class="input__block__input input__block__textarea"
            ></textarea>
          </div>
          <div class="help__message">max - 280</div>
        </div>
        <div class="form__buttons">
          <button type="submit" class="standart__button neutral__button">
            COMMENT <i class="fa-solid fa-comment"></i>
          </button>
        </div>
      </form>
    </div>
    `
  }

  function createCommentHTML(comment) {
    return `
    <div class="comment" id="comment-${comment.id}">
      <span class="commentator">${comment.author}</span>
      <div class="comment__text">
        ${comment.text}
      </div>
      <span class="comment__date">${getFormatedDate(comment.createdAt)}</span>
    </div>        
    `;
  }

  return {
    createLogoContainerInnerHTML,
    createHeaderLoggedInnerHTML,
    createHeaderNonLoggedInnerHTML,
    createFiltersInnerHTML,
    createMainWindowInnerHTML,
    createAddTaskInnerHTML,
    createFilterUserSelectInnerHTML,
    createUserSelectOptionHTML,
    createTableTaskHTML,
    createLoadMoreButtonHTML,
    createTaskDetailedHTML,
    createCommentsInnerHTML,
    createCommentHTML,
  };
})();
