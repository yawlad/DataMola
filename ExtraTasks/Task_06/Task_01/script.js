const DAYS_OF_WEEK = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6,
};

const JS_DAYS_OF_WEEK = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 0,
};

function createCalendar(elem, year, month) {
  // Validation

  if (
    typeof elem !== "object" ||
    year < 1900 ||
    year > 2100 ||
    month > 12 ||
    month < 1
  )
    throw new Error("Bad input");

  // Table head
  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const table = document.createElement("table");
  const tHead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  weekdays.forEach((weekday) => {
    const th = document.createElement("th");
    th.textContent = weekday;
    headerRow.append(th);
  });

  tHead.append(headerRow);
  table.append(tHead);

  // Table body
  const tBody = document.createElement("tbody");
  const date = new Date(year, month - 1, 1);
  let dayCounter = 1;
  let currentRow = document.createElement("tr");

  // First line
  const firstDayOfWeek =
    date.getDay() === JS_DAYS_OF_WEEK.SUNDAY
      ? DAYS_OF_WEEK.SUNDAY
      : date.getDay() - 1;

  for (let i = 0; i < firstDayOfWeek; i++) {
    const td = document.createElement("td");
    currentRow.append(td);
  }

  for (let i = firstDayOfWeek; i < Object.values(DAYS_OF_WEEK).length; i++) {
    const td = document.createElement("td");
    td.textContent = dayCounter;
    currentRow.append(td);
    dayCounter++;
  }

  tBody.append(currentRow);

  // Other lines
  const daysInMonth = new Date(year, month, 0).getDate();

  while (dayCounter <= daysInMonth) {
    currentRow = document.createElement("tr");

    for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
      const td = document.createElement("td");
      td.textContent = dayCounter;
      currentRow.append(td);
      dayCounter++;
    }

    tBody.append(currentRow);
  }

  table.append(tBody);
  elem.prepend(table);
}

createCalendar(document.body, 2012, 9);
