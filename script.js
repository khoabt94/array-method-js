///////////////////////////////////////////////////////////
// SELECTORS
const main = document.getElementById("main");
const personContainer = document.getElementById("person-container");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const showAllBtn = document.getElementById("show-all");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

///////////////////////////////////////////////////////////
// HELPER FUNCTION
let data = [];

// Fetch random user and add money
const getRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api");
  const dataRes = await res.json();
  const [user] = await dataRes.results;

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

const addData = (obj) => {
  data.push(obj);

  updateDOM();
};

// Update DOM
const updateDOM = (providedData = data) => {
  personContainer.textContent = "";
  const markup = providedData
    .map((item) => {
      return `<div class="person"><strong>${
        item.name
      }</strong> $ ${item.money.toLocaleString()}</div>`;
    })
    .join("");
  personContainer.insertAdjacentHTML("afterbegin", markup);
};

const doubleMoney = () => {
  data = data.map((el) => {
    return { ...el, money: el.money * 2 };
  });

  updateDOM();
};

const sortRichest = () => {
  const dataSort = [...data].sort((a, b) => b.money - a.money);
  updateDOM(dataSort);
};

const showMillionaires = () => {
  dataFilter = data.filter((el) => el.money > 1000000);
  updateDOM(dataFilter);
};

const showAll = () => {
  updateDOM(data);
};

const calculateWealth = () => {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = `<h3>Total Wealth: <strong>$ ${wealth.toLocaleString()}</strong></h3>`;

  main.insertAdjacentHTML("beforeend", wealthEl);
};

///////////////////////////////////////////////////////////
// EVENT LISTENERS
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
showAllBtn.addEventListener("click", showAll);
calculateWealthBtn.addEventListener("click", calculateWealth);
