const balanceLeft = document.querySelector(".balance-left");
const incomeMade = document.querySelector(".income");
const expenses = document.querySelector(".expenses");
const list = document.querySelector(".list");
const form = document.querySelector(".form");
const text = document.getElementById("transaction-txt");
const numberEntered = document.getElementById("number");
const checkValue = document.querySelector(".checkValue");
const checkValueOne = document.querySelector(".checkValueOne");

const localStorageElements = JSON.parse(
  localStorage.getItem("insertedElements")
);

let insertedElements =
  localStorage.getItem("insertedElements") !== null ? localStorageElements : [];

//add new element

function addNewEl(e) {
  e.preventDefault();

  if (text.value.trim() === "" || numberEntered.value.trim() === "") {
    checkValue.innerText = `Please fill in the required field!`;
    checkValueOne.innerText = `Please fill in the required field!`;
    checkValue.style.color = "rgba(250, 8, 8, 0.8)";
    checkValueOne.style.color = "rgba(250, 8, 8, 0.8)";
    text.style.borderColor = "rgba(250, 8, 8, 0.8)";
    numberEntered.style.borderColor = "rgba(250, 8, 8, 0.8)";
  } else {
    const insertedEl = {
      id: generateID(),
      text: text.value,
      amount: +numberEntered.value,
    };

    insertedElements.push(insertedEl);
    insertInDom(insertedEl);
    displayValues();
    updateLocalStorage();
    text.value = "";
    numberEntered.value = "";
  }
}

//generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

//add transactions to the DOM

function insertInDom(insertedEl) {
  const sign = insertedEl.amount < 0 ? "-" : "+";
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");

  listItem.innerHTML = `

${insertedEl.text}<span>${sign}${Math.abs(
    insertedEl.amount
  )}</span><button class="delete-btn" onClick="removeInsertedEl(${
    insertedEl.id
  })"><i class="fas fa-times"></i></button>
`;
  list.appendChild(listItem);
}

//siplay the balance, income and expense

function displayValues() {
  const insertedAmount = insertedElements.map(
    (insertedEl) => insertedEl.amount
  );

  const total = insertedAmount
    .reduce((acc, amount) => (acc += amount), 0)
    .toFixed(2);

  const income = insertedAmount
    .filter((amount) => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0)
    .toFixed(2);

  const expense = (
    insertedAmount
      .filter((amount) => amount < 0)
      .reduce((acc, amount) => (acc += amount), 0) * -1
  ).toFixed(2);

  balanceLeft.innerText = `${total}`;

  incomeMade.innerText = `${income}`;
  expense.innerText = `${expense}`;
}

//remove inserted el

function removeInsertedEl(id) {
  insertedElements = insertedElements.filter(
    (insertedEl) => insertedEl.id !== id
  );
  updateLocalStorage();

  initializeApp();
}
//initialize app

//update local storage

function updateLocalStorage() {
  localStorage.setItem("insertedElements", JSON.stringify(insertedElements));
}

function initializeApp() {
  list.innerHTML = "";
  insertedElements.forEach(insertInDom);
  displayValues();
}

initializeApp();

//add event listener to form

form.addEventListener("submit", addNewEl);
