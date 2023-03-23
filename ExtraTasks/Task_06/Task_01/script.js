function createCalendar(elem, year, month) {
  // Validation

  function validate(elem, year, month) {
    if (typeof elem !== "object" || year < 0 || month > 12 || month < 1)
      throw new Error("Bad input");
  }
  validate(elem, year, month);

  // Table head
  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const table = document.createElement("table");
  const tHead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  weekdays.forEach((weekday) => {
    const th = document.createElement("th");
    th.textContent = weekday;
    headerRow.appendChild(th);
  });

  tHead.appendChild(headerRow);
  table.appendChild(tHead);

  // Table body
  const tBody = document.createElement("tbody");
  const date = new Date(year, month - 1, 1);
  let dayCounter = 1;
  let currentRow = document.createElement("tr");
  // First line

  const firstDayOfWeek = date.getDay() === 0 ? 6 : date.getDay() - 1;

  for (let i = 0; i < firstDayOfWeek; i++) {
    const td = document.createElement("td");
    currentRow.appendChild(td);
  }

  for (let i = firstDayOfWeek; i < 7; i++) {
    const td = document.createElement("td");
    td.textContent = dayCounter;
    currentRow.appendChild(td);
    dayCounter++;
  }

  tBody.appendChild(currentRow);

  // Other lines
  const daysInMonth = new Date(year, month, 0).getDate();

  while (dayCounter <= daysInMonth) {
    currentRow = document.createElement("tr");

    for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
      const td = document.createElement("td");
      td.textContent = dayCounter;
      currentRow.appendChild(td);
      dayCounter++;
    }

    tBody.appendChild(currentRow);
  }

  table.appendChild(tBody);
  elem.appendChild(table);
}

createCalendar(document.body, 2012, 9);
