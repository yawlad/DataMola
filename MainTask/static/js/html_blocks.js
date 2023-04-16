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

  function createHeaderStatic() {
    const header = document.createElement("header");
    header.id = "header";
    header.classList.add("header");

    const logoContainer = document.createElement("div");
    logoContainer.classList.add("logo__container");

    const logoImg = document.createElement("img");
    logoImg.src = "./static/img/Logo.svg";
    logoImg.alt = "logo";
    logoImg.classList.add("logo");

    const appName = document.createElement("div");
    appName.classList.add("app__name");
    appName.textContent = "Task Manager";

    logoContainer.append(logoImg);
    logoContainer.append(appName);

    const userContainer = document.createElement("div");
    userContainer.classList.add("user__container");
    userContainer.id = "user_container";

    header.append(logoContainer);
    header.append(userContainer);

    return header;
  }

  function createUserContainerAuthorized(user) {
    const userContainer = document.createElement("div");
    userContainer.classList.add("user__container");
    userContainer.id = "user_container";

    const usernameDiv = document.createElement("div");
    usernameDiv.classList.add("username");

    const usernameLink = document.createElement("span");
    usernameLink.classList.add("link");
    usernameLink.textContent = user.userName;

    const usernameIcon = document.createElement("i");
    usernameIcon.classList.add(
      "fa-solid",
      "fa-right-from-bracket",
      "clickable__element",
      "dangerous__icon"
    );

    usernameDiv.append(usernameLink);
    usernameDiv.append(usernameIcon);

    const userAvatarLink = document.createElement("span");
    userAvatarLink.classList.add("link");

    const userAvatarImg = document.createElement("img");
    userAvatarImg.src = `data:img/png;base64,${user.photo}`;
    userAvatarImg.alt = "user__avatar";
    userAvatarImg.classList.add("user__avatar", "clickable__element");

    userAvatarLink.append(userAvatarImg);

    userContainer.append(usernameDiv);
    userContainer.append(userAvatarLink);

    return userContainer;
  }

  function createUserContainerUnauthorized() {
    const userContainer = document.createElement("div");
    userContainer.classList.add("user__container");
    userContainer.id = "user_container";

    const signInButton = document.createElement("button");
    signInButton.classList.add("standart__button", "invert__button");
    signInButton.id = "sign_in";
    signInButton.setAttribute("control-id", "ControlID-7");
    signInButton.textContent = "SING IN ";

    const signInIcon = document.createElement("i");
    signInIcon.classList.add("fa", "fa-sign-in");
    signInIcon.setAttribute("aria-hidden", "true");
    signInButton.append(signInIcon);

    const signUpButton = document.createElement("button");
    signUpButton.classList.add("standart__button", "invert__button");
    signUpButton.id = "sign_up";
    signUpButton.setAttribute("control-id", "ControlID-8");
    signUpButton.textContent = "SING UP ";

    const signUpIcon = document.createElement("i");
    signUpIcon.classList.add("fa", "fa-sign-in");
    signUpIcon.setAttribute("aria-hidden", "true");
    signUpButton.append(signUpIcon);

    userContainer.append(signInButton);
    userContainer.append(signUpButton);

    return userContainer;
  }

  function createMainAppStatic() {
    const main = document.createElement("main");
    main.classList.add("main");
    main.id = "main";
    main.innerHTML = `<section class="filters">
    <div class="filters__part">
    <div class="input__block" id="executor_filter">
      <h3 class="input__block__name">Executor</h3>
      <select type="" name="executor" class="input__block__select input__block__input" >
    </select>
    </div>
    <div class="input__block" id="data_filter">
      <h3 class="input__block__name">Date</h3>
      <div class="input__block__body">
        <input type="date" name="date_from" class="input__block__input" ><input type="date" name="date_to" class="input__block__input">
      </div>
    </div>
    <div class="input__block" id="task_name_filter">
      <h3 class="input__block__name">Task Name</h3>
      <div class="input__block__body">
        <input type="text" name="task_name" class="input__block__input" >
        <div class="help__message"></div>
      </div>
    </div>
  </div>
  <div class="filters__part">
    <div class="input__block" id="priority_filter">
      <h3 class="input__block__name">Priority</h3>
      <div class="input__block__body">
        <label class="input__block__checkbox"><input type="checkbox" name="priority" value="Low" class="input__block__input">Low</label>
        <label class="input__block__checkbox"><input type="checkbox" name="priority" value="Medium" class="input__block__input">Medium</label>
        <label class="input__block__checkbox"><input type="checkbox" name="priority" value="High" class="input__block__input">High</label>
      </div>
    </div>
    <div class="input__block" id="privacy_filter">
      <h3 class="input__block__name">Privacy</h3>
      <div class="input__block__body">
        <label class="input__block__checkbox"><input type="checkbox" name="isPrivate" value="1" class="input__block__input">Private</label>
        <label class="input__block__checkbox"><input type="checkbox" name="isPrivate" value="" class="input__block__input">Public</label>
      </div>
    </div>
    <div class="input__block" id="type_of_page_filter">
      <label class="input__block__radio active__filter"><input type="radio" name="type_of_page" value="table" class="input__block__input">Table</label>
      <label class="input__block__radio"><input type="radio" name="type_of_page" value="list" class="input__block__input">List</label>
    </div>
  </div>
    </section><section class="app__table"><div class="main__window">
    <article class="main__window__section" id="section_todo">
        <div class="section__header">To Do</div>
        <div class="tasks__container scrollable__element"></div>
      </article>
      <article class="main__window__section" id="section_in_progress">
        <div class="section__header">In Progress</div>
        <div class="tasks__container scrollable__element"></div>
      </article>
      <article class="main__window__section" id="section_completed">
        <div class="section__header">Completed</div>
        <div class="tasks__container scrollable__element"></div>
      </article>
    </div><aside class="add__new__task">
    <div class="add__new__task__unauthorised__window">
      AUTHORIZE TO USE TASK MANAGER
    </div>
    <div class="section__header">Add New Task</div>
    <form action="#" class="task__form">
      <div class="task__form__part">
        <div class="input__block">
          <h3 class="input__block__name">Task Name*</h3>
          <div class="input__block__body">
            <input type="text" name="task_name" class="input__block__input">
          </div>
          <span class="help__message">max - 100</span>
        </div>

        <div class="input__block">
          <h3 class="input__block__name">Executor</h3>
          <select type="" name="task_executor" class="input__block__select input__block__input"></select>
        </div>

        <div class="input__block">
          <h3 class="input__block__name">Description*</h3>
          <div class="input__block__body">
            <textarea name="task_decription" class="input__block__input input__block__textarea" ></textarea>
          </div>
          <div class="help__message">max - 180</div>
        </div>
      </div>

      <div class="task__form__part">
        <div class="input__block">
          <h3 class="input__block__name">Status</h3>
          <div class="input__block__body">
            <label class="input__block__radio"><input type="radio" name="task_status" value="In progress" class="input__block__input">In progress</label>
            <label class="input__block__radio"><input type="radio" name="task_status" value="Completed" class="input__block__input">Completed</label>
            <label class="active__filter input__block__radio"><input type="radio" name="task_status" value="To Do" class="input__block__input" checked>To Do</label>
          </div>
        </div>

        <div class="input__block">
          <h3 class="input__block__name">Priority*</h3>
          <div class="input__block__body">
            <label class="active__filter input__block__radio"><input type="radio" name="task_priority" value="Low" class="input__block__input" checked>Low</label>
            <label class="input__block__radio"><input type="radio" name="task_priority" value="Medium" class="input__block__input">Medium</label>
            <label class="input__block__radio"><input type="radio" name="task_priority" value="High" class="input__block__input">High</label>
          </div>
          <div class="help__message"></div>
        </div>

        <div class="input__block">
          <h3 class="input__block__name">Privacy</h3>
          <div class="input__block__body">
            <label class="input__block__radio"><input type="radio" name="task_privacy" value="1" class="input__block__input">Private</label>
            <label class="active__filter input__block__radio"><input type="radio" name="task_privacy" value="" class="input__block__input" checked>Public</label>
          </div>
        </div>
      </div>

      <hr class="line">
      <div class="form__buttons">
        <button type="reset" class="standart__button delete__button">
          CLEAR <i class="fa fa-undo" aria-hidden="true"></i>
        </button>
        <button type="submit" class="standart__button add__button">
          ADD <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </form>
    </aside></section>`;

    return main;
  }

  function createFooterStatic() {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    footer.id = "footer";

    footer.innerHTML = `
    <div class="contact__email">y.yawlad@gmail.com</div>
    <div class="footer__info">Task Manager v 1.0.0 © y.yawlad</div>`;
    return footer;
  }

  function createExecutorSelectorOptionALL() {
    const option = document.createElement("option");
    option.name = "username";
    option.classList.add("input__block__option");
    option.innerText = "---";
    return option;
  }

  function createExecutorSelectorOption(user) {
    const option = document.createElement("option");
    option.name = "task_executor";
    option.value = user.id;
    option.classList.add("input__block__option");
    option.innerText = user.userName;
    return option;
  }

  function createTask(task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.id = `task-${task.id}`;
    taskDiv.innerHTML = `
    <div class="task__additional__info">
      <div class="task__priority ${getPriorityClass(task.priority)}">${
      task.priority
    }</div>
      <div class="task__date">${getFormatedDate(task.createdAt)}</div>
    </div>
    <div class="task__main">
      <div class="task__main__content__item">
        Task Name: <span id="task__name">${task.name}</span>
      </div>
      <div class="task__main__content__item">
        Executor: <span id="task__executor">${task.assignee.userName}</span>
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
    `;
    return taskDiv;
  }

  function createLoadMoreButton() {
    const loadMoreButton = document.createElement("button");
    loadMoreButton.classList.add(
      "standart__button",
      "neutral__button",
      "load__more__button"
    );
    loadMoreButton.textContent = "LOAD MORE ";
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-angles-down";
    loadMoreButton.append(icon);
    return loadMoreButton;
  }

  function createTaskDetailed(task) {
    const main = document.createElement("main");
    main.classList.add("main", "main__task__page");
    main.id = "main";
    main.innerHTML = `
    <section class="detailed__task">
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
        Executor: <span id="task__executor">${task.assignee.userName}</span>
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
    </section>
    <section class="comments">
    <h2 class="section__header">Comments</h2>
    <div class="comments__body">
      <div class="comments__list scrollable__element"></div>  
      <hr class="line">
      <form action="#" class="add__comment">
        <div class="input__block">
          <h3 class="input__block__name">Comment</h3>
          <div class="input__block__body">
            <textarea name="inner_text" class="input__block__input input__block__textarea"></textarea>
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
    </section>
    `;
    return main;
  }

  function createTaskDetailedUpdate(task) {
    const main = document.createElement("main");
    main.classList.add("main", "main__task__page");
    main.id = "main";
    main.innerHTML = `
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
        ${task.comments.length} <i class="fa fa-comment" aria-hidden="true"></i>
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
  </form>
    <section class="comments">
    <h2 class="section__header">Comments</h2>
    <div class="comments__body">
      <div class="comments__list scrollable__element"></div>  
      <hr class="line">
      <form action="#" class="add__comment">
        <div class="input__block">
          <h3 class="input__block__name">Comment</h3>
          <div class="input__block__body">
            <textarea name="inner_text" class="input__block__input input__block__textarea"></textarea>
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
    </section>
    `;
    return main;
  }

  function createComment(comment) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.id = `comment-${comment.id}`;
    commentDiv.innerHTML = `
    <span class="commentator">${comment.creator.userName}</span>
    <div class="comment__text">
      ${comment.text}
    </div>
    <span class="comment__date">${getFormatedDate(comment.createdAt)}</span>
    `;
    return commentDiv;
  }

  function createSignUp() {
    const main = document.createElement("main");
    main.classList.add("main", "sign__in__up");
    main.id = "main";
    main.innerHTML = `        <form action="" class="sign__form">
    <h2 class="sign__form__header">SIGN UP</h2>
    <div class="input__block">
      <h3 class="input__block__name">Username</h3>
      <div class="input__block__body">
        <input type="text" class="input__block__input" name="username" />
      </div>
      <span class="help__message"></span>
    </div>
    <div class="input__block">
    <div class="input__block__body">
      <img class="photo">
      <label
        class="file__input input__block standart__button neutral__button"
      >
        <input
          type="file"
          name="user_avatar"
          accept="image/jpeg, image/png"
          class="input__block__input"
        />
        IMAGE 3:4<i class="fa fa-image" aria-hidden="true"></i>
      </label>
    </div>
    </div>
    <div class="input__block">
      <h3 class="input__block__name">Login</h3>
      <div class="input__block__body">
        <input type="text" class="input__block__input" name="login" />
      </div>
      <span class="help__message"></span>
    </div>
    <div class="input__block">
      <h3 class="input__block__name">Password</h3>
      <div class="input__block__body">
        <input
          type="password"
          class="input__block__input"
          name="password"
        />
      </div>
      <span class="help__message"></span>
    </div>
    <div class="input__block">
      <h3 class="input__block__name">Password repeat</h3>
      <div class="input__block__body">
        <input
          type="password"
          class="input__block__input"
          name="password_repeat"
        />
      </div>
      <span class="help__message"></span>
    </div>

    <div class="form__buttons">
      <div class="standart__button neutral__button sign__in__button">
        SIGN IN <i class="fa fa-sign-in" aria-hidden="true"></i>
      </div>
      <button
        type="submit"
        class="standart__button neutral__button confirm__button"
      >
        CONFIRM <i class="fa-solid fa-check-double"></i>
      </button>
      <button class="standart__button neutral__button main__page__button">
        MAIN PAGE <i class="fa-solid fa-house"></i>
      </button>
    </div>
  </form>
    `;
    return main;
  }

  function createSignIn() {
    const main = document.createElement("main");
    main.classList.add("main", "sign__in__up");
    main.id = "main";
    main.innerHTML = `
    <form action="" class="sign__form">
    <h2 class="sign__form__header">SIGN IN</h2>
    <div class="input__block">
        <h3 class="input__block__name">Login</h3>
        <div class="input__block__body">
          <input type="text" class="input__block__input" name="login"/>
        </div>
        <span class="help__message"></span>
    </div>
    <div class="input__block">
        <h3 class="input__block__name">Password</h3>
        <div class="input__block__body">
          <input type="password" class="input__block__input" name="password"/>
        </div>
        <span class="help__message"></span>
    </div>
    <div class="form__buttons">
        <div class="standart__button neutral__button sign__up__button">SIGN UP <i class="fa fa-sign-in" aria-hidden="true"></i></div>
        <button type="submit" class="standart__button neutral__button confirm__button">LOG IN <i class="fa fa-sign-in" aria-hidden="true"></i></button>
        <button class="standart__button neutral__button main__page__button" >MAIN PAGE <i class="fa-solid fa-house"></i></button>
    </div>
</form>
    `;
    return main;
  }

  function createUserDetialedView(user) {
    const main = document.createElement("main");
    main.classList.add("main", "main__user__page");
    main.id = "main";
    main.innerHTML = `
    <section class="detailed__user">
    <h2 class="section__header">ACCOUNT SETTINGS</h2>
    <div class="user__image__container">
      <div class="user__main__content__item">
        <img src="data:image/png;base64,${
          user.photo
        }" alt="" class="main__user__page__avatar" />
      </div>
      <div class="user">
        <div class="user__main__content__item">
          USERNAME:
          <span id="username">${user.userName}</span>
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
          >
            SIGN OUT <i class="fa fa-sign-out" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    </section>
    `;
    return main;
  }

  function createUserDetialedUpdateView(user) {
    const main = document.createElement("main");
    main.classList.add("main", "main__user__page");
    main.id = "main";

    main.innerHTML = `
    <section class="detailed__user">
    
    <h2 class="section__header">ACCOUNT SETTINGS</h2>
          <form action="#" class="user__form">
            <div class="user__main__content__item">
              <img src="data:image/png;base64,${user.photo}" alt="" class="main__user__page__avatar" />
              <label
                class="file__input input__block standart__button neutral__button"
              >
                <input
                  type="file"
                  name="user_avatar"
                  class="input__block__input"
                  photo="${user.photo}"
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
                    value="${user.userName}"
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
          </form>
    </section>
    `;
    return main;
  }

  function createErrorPage(error) {
    const main = document.createElement("main");
    main.classList.add("main", "main__error");
    main.id = "main";

    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error__container");

    const header = document.createElement("h1");
    header.classList.add("error__header");
    header.textContent = `Error ${error.status} ${error.statusText}`;
    errorContainer.append(header);

    const line = document.createElement("hr");
    line.classList.add("line");
    errorContainer.append(line);

    const text = document.createElement("p");
    text.classList.add("error__text");
    text.textContent = error.message;

    errorContainer.append(text);

    main.append(errorContainer);

    return main;
  }

  return {
    createHeaderStatic,
    createMainAppStatic,
    createFooterStatic,

    createUserContainerAuthorized,
    createUserContainerUnauthorized,

    createExecutorSelectorOptionALL,
    createExecutorSelectorOption,

    createTask,
    createLoadMoreButton,

    createTaskDetailed,
    createTaskDetailedUpdate,
    createComment,

    createSignUp,
    createSignIn,

    createUserDetialedView,
    createUserDetialedUpdateView,

    createErrorPage,
  };
})();
