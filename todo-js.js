let toDoListArray = loadTodoList(); // Load todo list data from localStorage

giveTodoList(); // Display the todo list on the screen

function giveTodoList() {
  let toHTML = "";

  for (let i = 0; i < toDoListArray.length; i++) {
    const { name, dueDate } = toDoListArray[i];
    const printing = `
  
    <div class="names">${name}</div> 
      <div class="dueDates">${dueDate}</div>
      <button  class="delete-Btn">Delete</button>
    `; //Generating HTML
    toHTML += printing;
  }
  //The Above can also be done using foreach() below
  /* toDoListArray.forEach((item, i) => {
    const { name, dueDate } = item;
    const printing = `
    <div class="names">${name}</div>
    <div class="dueDates">${dueDate}</div>
    <button onclick="deleteItem(${i})" class="delete-Btn">Delete</button>
  `; //Generating HTML
    toHTML += printing;
  });*/

  document.querySelector(".toDisplay").innerHTML = toHTML; // This is displaying the butttons to the page
  //
  //
  // Adding functionality to the delete buttons
  document.querySelectorAll(".delete-Btn").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      deleteItem(index);
    });
  });
}
// Adding functionality to the add-btn
document.querySelector(".add-btn").addEventListener("click", () => {
  btnFun();
});
//

function btnFun() {
  const extract = document.querySelector(".alone-inputs");
  const name = extract.value;
  const dateInputElement = document.querySelector(".dueDateInput");
  const dueDate = dateInputElement.value;
  toDoListArray.push({
    name: name,
    dueDate: dueDate,
  }); // Add new todo item to the array
  extract.value = "";
  giveTodoList(); // Update the displayed todo list
  saveTodoList(); // Save todo list to localStorage
}

function deleteItem(index) {
  toDoListArray.splice(index, 1); // Remove item from the array
  giveTodoList(); // Update the displayed todo list
  saveTodoList(); // Save todo list to localStorage
}

function saveTodoList() {
  localStorage.setItem("todoListData", JSON.stringify(toDoListArray)); // Save todo list data to localStorage
}

function loadTodoList() {
  const data = localStorage.getItem("todoListData");
  return data ? JSON.parse(data) : []; // Retrieve and parse todo list data from localStorage
}

// Event listener for Enter key press
document
  .querySelector(".alone-inputs")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or page reload
      btnFun(); // Call btnFun when Enter key is pressed
    }
  });
