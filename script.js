const btnAddGoalBox = document.querySelector(".add-goal-box");
const btnCloseGoal = document.querySelector(".close-goal");
const btnCloseBox = document.querySelector(".close");
const btnSubmitBox = document.querySelector(".add-box");

const nav = document.querySelector(".nav__tabs");
const tabs = document.querySelectorAll(".nav__tab");

const sections = document.querySelectorAll(".section");

let activeSection = document.querySelector(`#section--1`);
let curGoalContainer;
const id = Date.now();
let newGoal;

let goalsBox = [];

const Goal = function (subtitle, date, id) {
    this.subtitle = subtitle;
    this.date = date;
    this.id = id;
    this.goal = [];
};

function toggleClassOnElement(el, className, type) {
    el.classList[type](`${className}`);
}

function changeSections(e) {
    const tab = e.target;
    activeSection = document.querySelector(`#section--${tab.dataset.tab}`);
    if (!tab.classList.contains("nav__tab")) return;
    tabs.forEach((tab) => tab.classList.remove("tab-active"));
    sections.forEach((c) => c.classList.remove("content-active"));

    toggleClassOnElement(
        document.querySelector(`.${tab.classList[1]}`),
        "tab-active",
        "add"
    );

    toggleClassOnElement(activeSection, "content-active", "add");
}

function addGoalBox() {
    toggleClassOnElement(
        document.querySelector(".add-box-goal"),
        "content-active",
        "remove"
    );
    toggleClassOnElement(
        document.querySelector(".add-box-goal-parent"),
        "content-active",
        "add"
    );
}

function addGoal(e) {
    toggleClassOnElement(
        document.querySelector(".add-box-goal-parent"),
        "content-active",
        "remove"
    );
    toggleClassOnElement(
        document.querySelector(".add-box-goal"),
        "content-active",
        "add"
    );

    curGoalContainer = e.target.closest(".goals").querySelector(".goals__list");
}

function renderGoal(obj) {
    const inputGoal = document.querySelector(".input-goal");
    const goalItem = `
    <li class="goal" data-id="">
        <input type="checkbox" /> ${inputGoal.value}
    </li>`;

    curGoalContainer.insertAdjacentHTML("afterbegin", goalItem);
    obj.goal.push(inputGoal.value);
    inputGoal.value = ""; // Clear input field after adding goal
}

function renderGoalContainer(obj) {
    const inputSubtitle = document.querySelector(".input-subtitle");
    const inputDate = document.querySelector(".input-date");
    obj = new Goal(inputSubtitle.value, inputDate.value, id);
    newGoal = obj;

    const html = `
    <div class="goals-box" data-id="${obj.date}">
        <div class="date-box">
            <h2 class="date">${obj.date}</h2>
        </div>
        <div class="goals">
            <h4 class="subtitle margin-bottom-sm">${obj.subtitle}</h4>
            <ul class="goals__list margin-bottom-sm"></ul>
            <button class="btn add-goal margin-top-sm">&plus;</button>
        </div>
    </div>`;

    activeSection.insertAdjacentHTML("afterbegin", html);
    toggleClassOnElement(
        document.querySelector(".add-box-goal-parent"),
        "content-active",
        "remove"
    );

    const btnAddGoalBox = document.querySelector(".add-goal");
    btnAddGoalBox.addEventListener("click", addGoal);
    goalsBox.push(obj);

    setLocalStorage();
}

function closeGoal() {
    toggleClassOnElement(
        document.querySelector(".add-box-goal"),
        "content-active",
        "remove"
    );
}

function closeGoalParent() {
    toggleClassOnElement(
        document.querySelector(".add-box-goal-parent"),
        "content-active",
        "remove"
    );
}

nav.addEventListener("click", changeSections);
btnAddGoalBox.addEventListener("click", addGoalBox);
btnSubmitBox.addEventListener("click", () => {
    renderGoalContainer(newGoal);
});
btnCloseGoal.addEventListener("click", closeGoal);
btnCloseBox.addEventListener("click", closeGoalParent);

// Event delegation for adding goals
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-gaol")) addGoal(e);
    if (e.target.classList.contains("add")) renderGoal(newGoal);
    // newGoal.goal.push(inputGoal.value);
    console.log(goalsBox);
});

function setLocalStorage() {
    localStorage.setItem("goals", JSON.stringify(goalsBox));
}

function getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("goals"));
    console.log(data);
    if (!data) return;
    goalsBox = data;
    goalsBox.forEach((goal) => {
        renderGoalContainer(goal);
    });
}

setLocalStorage();
getLocalStorage();
