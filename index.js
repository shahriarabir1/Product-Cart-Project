let list = document.querySelector(".products");
let items = document.querySelector(".final");
let tbody = document.querySelector(".tbd");
let prd = document.querySelector(".product-container");
let container = document.querySelector(".container");

list.addEventListener("click", addItems);
document.addEventListener("DOMContentLoaded", display);
tbody.addEventListener("click", Delete);

class UI {
  static alertNow(message, className) {
    let div = document.createElement("div");
    div.className = className;
    div.innerHTML = message;
    div.id = "temp";

    container.insertBefore(div, prd);
    setTimeout(() => {
      container.removeChild(div);
    }, 500);
  }
}

class List {
  constructor(items, price) {
    this.items = items;
    this.price = price;
  }
}

function addItems(e) {
  if (e.target.hasAttribute("href")) {
    let tr = document.createElement("tr");
    let items =
      e.target.parentElement.previousElementSibling.previousElementSibling;
    let price = e.target.parentElement.previousElementSibling;
    tr.innerHTML = `<th>${items.textContent}</th><th>${parseInt(
      price.textContent
    )}</th><th><a href='#'>x</a></th>`;
    tbody.append(tr);
    let list = new List(items.textContent.trim(), price.textContent.trim());
    SaveLocal(list);
    UI.alertNow("Added Successfully", "success");
   
  }
}

function display() {
  let task;
  if (localStorage.getItem("task") === null) {
    task = [];
  } else {
    task = JSON.parse(localStorage.getItem("task"));
  }
  task.forEach((e) => {
    let tr = document.createElement("tr");

    tr.innerHTML = `<th>${e.items}</th><th>${parseInt(
      e.price
    )}</th><th><a href='#'>x</a></th>`;
    tbody.append(tr);
  });
}

function SaveLocal(e) {
  let task;
  if (localStorage.getItem("task") === null) {
    task = [];
  } else {
    task = JSON.parse(localStorage.getItem("task"));
  }
  task.push(e);

  localStorage.setItem("task", JSON.stringify(task));
}
function Delete(e) {
  if (e.target.hasAttribute("href")) {
    let par = e.target.parentElement.parentElement;
    par.remove();
    Localremove(e);
    UI.alertNow("Removed", "error");
  }
}
function Localremove(e) {
  let task;
  if (localStorage.getItem("task") === null) {
    task = [];
  } else {
    task = JSON.parse(localStorage.getItem("task"));
  }
  task.forEach((tasks, index) => {
    let va =
      e.target.parentElement.previousElementSibling.previousElementSibling.textContent.trim();
    if (tasks.items === va) {
      task.splice(index, 1);
    }
  });

  localStorage.setItem("task", JSON.stringify(task));
}
