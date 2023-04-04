function createList(title, list) {
  function validate(title, list) {
    if (typeof title !== 'string' || typeof list !== 'object')
      throw new Error('Bad input');
  }
  function createInnerList(innerList) {
    const ul = document.createElement('ul');
    ul.style.fontSize = '0.9em';
    innerList.forEach((item) => {
      const li = document.createElement('li');
      const liHeader = document.createElement('span');
      liHeader.textContent = item.value;
      li.append(liHeader);
      if (item.children) {
        const childUl = createInnerList(item.children);
        li.appendChild(childUl);
      }
      ul.appendChild(li);
    });
    return ul;
  }

  validate(title, list);
  const heading = document.createElement('h2');
  heading.textContent = title;
  document.body.appendChild(heading);
  document.body.appendChild(createInnerList(list));
}

const list = [
  {
    value: 'Пункт 1.',
    children: null,
  },

  {
    value: 'Пункт 2.',
    children: [
      {
        value: 'Подпункт 2.1.',
        children: null,
      },

      {
        value: 'Подпункт 2.2.',
        children: [
          {
            value: 'Подпункт 2.2.1.',
            children: null,
          },

          {
            value: 'Подпункт 2.2.2.',
            children: null,
          },
        ],
      },

      {
        value: 'Подпункт 2.3.',
        children: null,
      },
    ],
  },

  {
    value: 'Пункт 3.',
    children: null,
  },
];

document.addEventListener("click", (event)=>{
  const li = event.target.closest("span").parentElement;
  if(!li) return
  if(!li.querySelector("ul")) return
  li.classList.toggle("unactive")

})

createList('My List', list);
