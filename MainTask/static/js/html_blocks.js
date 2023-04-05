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
    date = new Date(date);
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
        <span class="link">${enviroment.currentUser.name} </span
        ><i
          class="fa-solid fa-right-from-bracket clickable__element dangerous__icon"
        ></i>
    </div>
    <span class="link">
        <img
          src="${enviroment.currentUser.image}"
          alt="user__avatar"
          class="user__avatar clickable__element"
        />
    </span>
    `;
  }

  function createHeaderNonLoggedInnerHTML() {
    return `
    
        <button class="standart__button invert__button" id="sign_in">
          SING IN <i class="fa fa-sign-in" aria-hidden="true"></i>
        </button>
    
    
        <button class="standart__button invert__button" id="sign_up">
          SING UP <i class="fa fa-sign-in" aria-hidden="true"></i>
        </button>
    
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
        <div class="help__message"></div>
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
            value="Low"
            class="input__block__input"
          />Low</label
        >
        <label class="input__block__checkbox"
          ><input
            type="checkbox"
            name="priority"
            value="Medium"
            class="input__block__input"
          />Medium</label
        >
        <label class="input__block__checkbox"
          ><input
            type="checkbox"
            name="priority"
            value="High"
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
            name="isPrivate"
            value="1"
            class="input__block__input"
          />Private</label
        >
        <label class="input__block__checkbox"
          ><input
            type="checkbox"
            name="isPrivate"
            value=""
            class="input__block__input"
          />Public</label
        >
      </div>
    </div>
    <div class="input__block" id="type_of_page_filter">
      <label class="input__block__radio active__filter"
        ><input
          type="radio"
          name="type_of_page"
          value="table"
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
    <div class="add__new__task__unauthorised__window">
      AUTHORIZE TO USE TASK MANAGER
    </div>
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
                value="${constantsModule.STATUSES_DICT.IN_PROGRESS}"
                class="input__block__input"
              />${constantsModule.STATUSES_DICT.IN_PROGRESS}</label
            >
            <label class="input__block__radio"
              ><input
                type="radio"
                name="task_status"
                value="${constantsModule.STATUSES_DICT.COMPLETED}"
                class="input__block__input"
              />${constantsModule.STATUSES_DICT.COMPLETED}</label
            >
            <label class="active__input input__block__radio"
              ><input
                type="radio"
                name="task_status"
                value="${constantsModule.STATUSES_DICT.TO_DO}"
                class="input__block__input"
              />${constantsModule.STATUSES_DICT.TO_DO}</label
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
                value="${constantsModule.PRIORITIES_DICT.LOW}"
                class="input__block__input"
              />${constantsModule.PRIORITIES_DICT.LOW}</label
            >
            <label class="input__block__radio"
              ><input
                type="radio"
                name="task_priority"
                value="${constantsModule.PRIORITIES_DICT.MEDIUM}"
                class="input__block__input"
              />${constantsModule.PRIORITIES_DICT.MEDIUM}</label
            >
            <label class="input__block__radio"
              ><input
                type="radio"
                name="task_priority"
                value="${constantsModule.PRIORITIES_DICT.HIGH}"
                class="input__block__input"
              />${constantsModule.PRIORITIES_DICT.HIGH}</label
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
                value="1"
                class="input__block__input"
              />Private</label
            >
            <label class="active__input input__block__radio"
              ><input
                type="radio"
                name="task_privacy"
                value=""
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
        value="${user.name}"
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
    <div class="task__main">
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
    </div>
    <div class="task__additional__info">
      <div class="task__privacy">${getPrivacy(task.isPrivate)}</div>
      <div class="task__comments">
      ${task.comments.length} <i class="fa fa-comment" aria-hidden="true"></i>
      </div>
    </div>
    <hr class="line" />
    <div class="task__bottom">
        <button class="standart__button edit__button">
          EDIT <i class="fa-solid fa-pen"></i>
        </button>
      <button class="standart__button delete__button">
        DELETE <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
  </div>`;
  }

  function createLoadMoreButtonHTML() {
    return `
    <button class="standart__button neutral__button load__more__button">
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
          >${task.priority} priority</span
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
        <div class="task__date" id="task__date">${getFormatedDate(
          task.createdAt
        )}</div>

        <div class="task__comments" id="task__comments">
        ${task.comments.length} <i class="fa fa-comment" aria-hidden="true"></i>
        </div>
      </div>

      <hr class="line" />
      <div class="task__bottom">
        <button
          class="standart__button edit__button"
        >
          EDIT <i class="fa-solid fa-pen"></i>
        </button>
        <button
          class="standart__button invert__button main__page__button"
        >
          MAIN PAGE <i class="fa-solid fa-house"></i>
        </button>
        <button class="standart__button delete__button">
          DELETE <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    `;
  }
  function createCommentsInnerHTML() {
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
    `;
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

  function createFooterInnerHTML() {
    return `
    <div class="contact__email">y.yawlad@gmail.com</div>
          <div class="footer__info">Task Manager v 1.0.0 © y.yawlad</div>
          `;
  }

  function createUpdateTaskHTML(task) {
    return `
    <form class="detailed__task__form detailed__task">
          <h2 class="section__header">${task.name}</h2>
          <div class="task">
            <div class="input__block">
              <h3 class="input__block__name">Priority:</h3>
              <select
                type=""
                name="task_priority"
                class="input__block__select input__block__input"
              >
                <option
                  name="task_priority"
                  value="${constantsModule.PRIORITIES_DICT.LOW}"
                  class="input__block__option low__prioprity"
                  ${
                    task.priority === constantsModule.PRIORITIES_DICT.LOW
                      ? "selected"
                      : ""
                  }
                >
                ${constantsModule.PRIORITIES_DICT.LOW}
                </option>
                <option
                  name="task_priority"
                  value="${constantsModule.PRIORITIES_DICT.MEDIUM}"
                  class="input__block__option medium__prioprity"
                  ${
                    task.priority === constantsModule.PRIORITIES_DICT.MEDIUM
                      ? "selected"
                      : ""
                  }
                >
                ${constantsModule.PRIORITIES_DICT.MEDIUM}
                </option>
                <option
                  name="task_priority"
                  value="${constantsModule.PRIORITIES_DICT.HIGH}"
                  class="input__block__option high__prioprity"
                  ${
                    task.priority === constantsModule.PRIORITIES_DICT.HIGH
                      ? "selected"
                      : ""
                  }
                >
                ${constantsModule.PRIORITIES_DICT.HIGH}
                </option>
              </select>
            </div>
            <div class="input__block">
              <h3 class="input__block__name">Task Name:</h3>
              <div class="input__block__body">
                <input type="text" name="task_name" class="input__block__input" value="${
                  task.name
                }"/>
                <span class="help__message">max - 100</span>
              </div>
            </div>
            <div class="input__block">
              <h3 class="input__block__name">Executor:</h3>
              <select
                type=""
                name="task_executor"
                class="input__block__select input__block__input"
              >
              </select>
            </div>
            <div class="input__block">
              <h3 class="input__block__name">Privacy:</h3>
              <select
                type=""
                name="task_privacy"
                class="input__block__select input__block__input"
              >
                <option
                  name="task_privacy"
                  value=""
                  class="input__block__option"
                  ${task.isPrivate == false ? "selected" : ""}
                >
                  Public
                </option>
                <option
                  name="task_privacy"
                  value="1"
                  class="input__block__option"
                  ${task.isPrivate == true ? "selected" : ""}
                >
                  Private
                </option>
              </select>
            </div>

            <div class="input__block">
              <h3 class="input__block__name">Status:</h3>
              <select
                type=""
                name="task_status"
                class="input__block__select input__block__input"
              >
                <option
                  name="task_status"
                  value="${constantsModule.STATUSES_DICT.TO_DO}"
                  class="input__block__option"
                  ${
                    task.status === constantsModule.STATUSES_DICT.TO_DO
                      ? "selected"
                      : ""
                  }
                >
                ${constantsModule.STATUSES_DICT.TO_DO}
                </option>
                <option
                  name="task_status"
                  value="${constantsModule.STATUSES_DICT.IN_PROGRESS}"
                  class="input__block__option"
                  ${
                    task.status === constantsModule.STATUSES_DICT.IN_PROGRESS
                      ? "selected"
                      : ""
                  }
                >
                ${constantsModule.STATUSES_DICT.IN_PROGRESS}
                </option>
                <option
                  name="task_status"
                  value="${constantsModule.STATUSES_DICT.COMPLETED}"
                  class="input__block__option"
                  ${
                    task.status === constantsModule.STATUSES_DICT.COMPLETED
                      ? "selected"
                      : ""
                  }
                >
                ${constantsModule.STATUSES_DICT.COMPLETED}
                </option>
              </select>
            </div>
            <div class="input__block">
              <h3 class="input__block__name">Description:</h3>
              <div class="input__block__body">
                <textarea
                  name="task_description"
                  class="input__block__input input__block__textarea"
                >${task.description}</textarea
                ><span class="help__message">max - 180</span>
              </div>
            </div>
            <div class="task__additional__info">
              <div class="task__date">${getFormatedDate(task.createdAt)}</div>

              <div class="task__comments">
              ${
                task.comments.length
              } <i class="fa fa-comment" aria-hidden="true"></i>
              </div>
            </div>

            <hr class="line" />
            <div class="task__bottom">
              <button class="standart__button back__button">
                BACK <i class="fa fa-backward" aria-hidden="true"></i
              ></button>

              <button type="reset" class="standart__button delete__button">
                UNDO CHANGES <i class="fa fa-undo" aria-hidden="true"></i>
              </button>
              <button type="submit" class="standart__button add__button">
                CONFIRM <i class="fa-solid fa-check-double"></i>
              </button>
            </div>
          </div>
        </form>`;
  }

  function createUserDetailedHTML(user) {
    return `
    <h2 class="section__header">ACCOUNT SETTINGS</h2>
          <div class="user__image__container">
            <div class="user__main__content__item">
              <img src="${
                user.image
              }" alt="" class="main__user__page__avatar" />
            </div>
            <div class="user">
              <div class="user__main__content__item">
                USERNAME:
                <span id="username">${user.name}</span>
              </div>
              <div class="user__main__content__item">
                LOGIN: <span id="login">${user.login}</span>
              </div>
              <div class="user__main__content__item">
                PASSWORD: <span id="password" data-original-text="${
                  user.password
                }">${"*".repeat(user.password.length)}</span>
              </div>
              <button class="standart__button neutral__button show__password">
                SHOW PASSWORD <i class="fa fa-eye" aria-hidden="true"></i>
              </button>
              <hr class="line" />
              <div class="user__bottom">
                <button class="standart__button edit__button">
                    EDIT <i class="fa-solid fa-pen"></i></button
                >
                <button class="standart__button invert__button main__page__button">
                    Main Page <i class="fa-solid fa-house"></i></button
                >
                <button
                  class="standart__button delete__button"
                  control-id="ControlID-15"
                >
                  SIGN OUT <i class="fa fa-sign-out" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
    `;
  }

  function createUpdateUserDetailedHTML(user) {
    return `
    <h2 class="section__header">ACCOUNT SETTINGS</h2>
          <form action="#" class="user__form">
            <div class="user__main__content__item">
              <img src="${user.image}" alt="" class="main__user__page__avatar" />
              <label
                class="file__input input__block standart__button neutral__button"
              >
                <input
                  type="file"
                  name="user_avatar"
                  class="input__block__input"
                  value="${user.image}"
                />
                IMAGE <i class="fa fa-image" aria-hidden="true"></i>
              </label>
            </div>
            <div class="user">
              <div class="input__block">
                <h3 class="input__block__name">USERNAME:</h3>
                <div class="input__block__body">
                  <input
                    type="text"
                    name="username"
                    value="${user.name}"
                    class="input__block__input"
                  />
                  <span class="help__message">max - 100</span>
                </div>
              </div>
              <div class="input__block">
                <h3 class="input__block__name">PASSWORD:</h3>
                <div class="input__block__body">
                  <input
                    type="password"
                    name="password"
                    value="${user.password}"
                    class="input__block__input"
                  />
                  <span class="help__message"></span>
                </div>
              </div>
              <div class="input__block">
                <h3 class="input__block__name">PASSWORD REPEAT:</h3>
                <div class="input__block__body">
                  <input
                    type="password"
                    name="password_repeat"
                    value="${user.password}"
                    class="input__block__input"
                  />
                  <span class="help__message"></span>
                </div>
              </div>
              <button class="standart__button neutral__button show__password">
                SHOW PASSWORD <i class="fa fa-eye" aria-hidden="true"></i>
              </button>
              <hr class="line" />
              <div class="user__bottom">

                <button 
                  class="standart__button back__button"
                >
                  BACK
                  <i class="fa fa-backward" aria-hidden="true"></i
                ></button>

                <button type="reset" class="standart__button delete__button">
                  UNDO CHANGES <i class="fa fa-undo" aria-hidden="true"></i>
                </button>
                <button type="submit" class="standart__button add__button">
                  CONFIRM <i class="fa-solid fa-check-double"></i>
                </button>
              </div>
            </div>
          </form>`;
  }

  function createSignInFormHTML() {
    return `
    <form action="#" class="sign__form">
    <h2 class="sign__form__header">SIGN IN</h2>
    <div class="input__block">
        <h3 class="input__block__name">Login</h3>
        <div class="input__block__body">
          <input type="text" class="input__block__input" name="login"/>
        </div>
        <span class="help__message"></span>
    </div>
    <div class="input__block">
        <h3 class="input__block__name">Passwod</h3>
        <div class="input__block__body">
          <input type="password" class="input__block__input" name="password"/>
        </div>
        <span class="help__message"></span>
    </div>
    <div class="form__buttons">
        <button class="standart__button neutral__button sign__up__button">SIGN UP <i class="fa fa-sign-in" aria-hidden="true"></i></button>
        <button type="submit" class="standart__button neutral__button confirm__button">LOG IN <i class="fa fa-sign-in" aria-hidden="true"></i></button>
        <button class="standart__button neutral__button main__page__button" >MAIN PAGE <i class="fa-solid fa-house"></i></button>
    </div>
</form>`;
  }

  function createSignUpFormHTML() {
    return `
    <form action="#" class="sign__form">
                    <h2 class="sign__form__header">SIGN UP</h2>
                    <div class="input__block">
                        <h3 class="input__block__name">Login</h3>
                        <div class="input__block__body">
                          <input type="text" class="input__block__input" name="login">
                        </div>
                        <span class="help__message"></span>
                    </div>
                    <div class="input__block">
                        <h3 class="input__block__name">Password</h3>
                        <div class="input__block__body">
                          <input type="password" class="input__block__input" name="password">
                        </div>
                        <span class="help__message"></span>
                    </div>
                    <div class="input__block">
                        <h3 class="input__block__name">Password repeat</h3>
                        <div class="input__block__body">
                          <input type="password" class="input__block__input" name="password_repeat">
                        </div>
                        <span class="help__message"></span>
                    </div>
                    <div class="form__buttons">
                        <button class="standart__button neutral__button sign__in__button" control-id="ControlID-4">SIGN IN <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        <button type="submit" class="standart__button neutral__button confirm__button" control-id="ControlID-5">CONFIRM <i class="fa-solid fa-check-double"></i></button>
                        <button class="standart__button neutral__button main__page__button">MAIN PAGE <i class="fa-solid fa-house"></i></button>
                    </div>
                </form>`;
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
    createFooterInnerHTML,
    createUpdateTaskHTML,
    createUserDetailedHTML,
    createUpdateUserDetailedHTML,
    createSignInFormHTML,
    createSignUpFormHTML,
  };
})();
