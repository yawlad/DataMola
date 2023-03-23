function createList(title, list) {
  function validate(title, list) {
    if (typeof title !== "string" || typeof list !== "object")
      throw new Error("Bad input");
  }
  function createInnerList(innerList) {
    const ul = document.createElement("ul");
    ul.style.fontSize = "90%";
    innerList.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.value;
      if (item.children) {
        const childUl = createInnerList(item.children);
        li.appendChild(childUl);
      }
      ul.appendChild(li);
    });
    return ul;
  }

  validate(title, list);
  const heading = document.createElement("h2");
  heading.textContent = title;
  document.body.appendChild(heading);
  document.body.appendChild(createInnerList(list));
}

const list = [
  {
    value: "Пункт 1.",
    children: null,
  },

  {
    value: "Пункт 2.",
    children: [
      {
        value: "Подпункт 2.1.",
        children: null,
      },

      {
        value: "Подпункт 2.2.",
        children: [
          {
            value: "Подпункт 2.2.1.",
            children: null,
          },

          {
            value: "Подпункт 2.2.2.",
            children: null,
          },
        ],
      },

      {
        value: "Подпункт 2.3.",
        children: null,
      },
    ],
  },

  {
    value: "Пункт 3.",
    children: null,
  },
];

createList("My List", list);
