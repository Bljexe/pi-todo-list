var Title = document.getElementById("Title");
var Description = document.getElementById("Description");
var Date = document.getElementById("Date");
var save_btn = document.getElementById("save_btn");
var actions = document.getElementById("actions");
var table = document.getElementById("table");
var todos;

save_btn.addEventListener("click", saveToDoList);

function saveToDoList(e) {
  if (Title.value && Description.value && Date.value) {
    var row = table.insertRow(1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = Title.value;
    cell2.innerHTML = Description.value;
    cell3.innerHTML = Date.value;
    cell4.innerHTML = `<button id="danger_btn" class="btn btn-danger btn-sm">X</button>`;

    var danger_btn = document.getElementById("danger_btn");
    danger_btn.addEventListener("click", (e) => {
      handletodo(e);

      UI.deletetodo(
        e.target.parentElement.previousSibling.textContent,
        e.target.parentElement.previousSibling.previousSibling.textContent,
        e.target.parentElement.previousSibling.previousSibling.previousSibling
          .textContent
      );
    });

    actions.innerHTML = `<span class="alert alert-success col-12">added to to-do list</span>`;
    actions.style.display = "flex";
    setTimeout(() => {
      actions.style.display = "none";
    }, 2000);

    var title1 = Title.value;
    var Description1 = Description.value;
    var Date1 = Date.value;

    var book = new todolist(title1, Description1, Date1);

    UI.storebook(book);
  } else {
    actions.innerHTML = `<span class="alert alert-danger col-12">please enter all feilds</span>`;
    actions.style.display = "flex";
    setTimeout(() => {
      actions.style.display = "none";
    }, 2000);
  }

  removedata();
}

function removedata() {
  document.getElementById("Title").value = "";
  document.getElementById("Description").value = "";
  document.getElementById("Date").value = "";
}

function handletodo(e) {
  e.target.parentElement.parentElement.remove();
  actions.innerHTML = `<span class="alert alert-warning col-12">successfully deleted.</span>`;
  actions.style.display = "flex";
  setTimeout(() => {
    actions.style.display = "none";
  }, 2000);
}

class todolist {
  constructor(title, Description, Date) {
    this.title = title;
    this.Description = Description;
    this.Date = Date;
  }
}

class UI {
  static getbook() {
    let todo;
    if (localStorage.getItem("todo")) {
      todo = JSON.parse(localStorage.getItem("todo"));
    } else {
      todo = [];
    }

    return todo;
  }

  static storebook(book) {
    var todo = UI.getbook();
    todo.push(book);
    localStorage.setItem("todo", JSON.stringify(todo));
  }

  static deletetodo(Date, Description, title) {
    var todo = UI.getbook();
    todo.forEach((book, index) => {
      if (
        book.Date == Date &&
        book.Description == Description &&
        book.title == title
      ) {
        todo.splice(index, 1);
      }
    });

    localStorage.setItem("todo", JSON.stringify(todo));
  }
}

window.addEventListener("DOMContentLoaded", () => {
  var table = document.getElementById("table");
  var todos = UI.getbook();

  todos.forEach(function display(todo) {
    var row = table.insertRow(1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = todo.title;
    cell2.innerHTML = todo.Description;
    cell3.innerHTML = todo.Date;
    cell4.innerHTML = `<button id="danger_btn" class="btn btn-danger btn-sm">X</button>`;

    var danger_btn = document.getElementById("danger_btn");
    danger_btn.addEventListener("click", (e) => {
      handletodo(e);

      UI.deletetodo(
        e.target.parentElement.previousSibling.textContent,
        e.target.parentElement.previousSibling.previousSibling.textContent,
        e.target.parentElement.previousSibling.previousSibling.previousSibling
          .textContent
      );
    });
  });
});
