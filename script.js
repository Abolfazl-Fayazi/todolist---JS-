//------------- Variables & Constants ---------------------------------------------

const plus = document.querySelector(".plus");

const body = document.querySelector("body");

const list = document.querySelector(".list");

let inputValue = document.querySelector(".input");

let emptyArray = [];

let tasks;

let tasks0;

let deleteButton = document.getElementsByClassName("delete");

let deleteArray;

//these true/false variables used to control the eventListeners not to work more than once.
let deleteButtonLooped = false;

let tasksLoaded = false;

let doneButton = document.getElementsByClassName("done");

let doneArray;

////////////////////////////////////////////////////////////////////////////////////////////////////////////

//------------- Functions --------------------------------------------------------------

//this function gets an argument named to 'value'; . . .
//the 'value' will be used for a piece of HTML code which inserts in the div 'list', as you see . . .
//in fact  this piece of HTML code is to show a new task has been added.
const newTaskGenerator = function (value) {
  for (i = 0; i < tasks.length; i++) {
    list.insertAdjacentHTML(
      "beforeend",
      `<div class="item">
    <p>${i + 1}. ${tasks[i]}</p>
    <button class="doneB">
      <svg
        class="done"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </button>
    <button class="deleteB">
      <svg 
        class="delete"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </button>
    </div>
    <hr />`
    );
  }
};

//..................................................................

//this function is to loading tasks info, when the app is loaded or user has made something happen(delete item or add item) to the list:
//1. it looks to localStorage to see if there is any thing with the key-name 'tasks'(needless to say, the thing has been saved in localStorage by the key-name 'tasks', is an array);
//2. it brings the array by the key name 'tasks' from localStorage, and save it in variable 'tasks', to use it after;
//3. it looks to localStorage to see if there is NOT any thing with the key-name 'tasks'(needless to say, the thing has been saved in localStorage by the key-name 'tasks', is an array);
//4. it wil save the variable 'emptyArray' in localStorage which is an empty array! so now an array has been defined in localStorage with no cells;
//5. now it brings the array by the key name 'tasks' from localStorage, and save it in variable 'tasks', to use it after;
//6. it will run the 'newTaskGenerator' function;
//7. it will change the value of variable 'tasksLoaded' into 'true'.
function loadTasks() {
  // Get the tasks from localStorage and convert it to an array
  if (localStorage.key(tasks)) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  } else {
    localStorage.setItem("tasks", JSON.stringify(emptyArray));
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  newTaskGenerator();
  tasksLoaded = true;
}

//..................................................................

//this function is to remove an item. it goes to the variable 'list', and considers its children, and starts to delete them from the first one.
const itemRemover = function (a) {
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
};

//..................................................................

//this function is to add an item to the list, by clicking on 'plus' button:
//1. it changes value of the variable 'tasks0' into an empty array;
//2. it puts the cells of 'tasks' array into the empty array 'tasks0';
//3. it it pushes anything written in input box as an new cell to 'tasks0' array;
//4.it saves the array 'tasks0' into the array 'tasks' which has been defined in localStorage;
//5. it calls the function 'itemRemover';
//6. it will change the value of variable 'tasksLoaded' into 'false';
//7. if the variable 'tasksLoaded' is 'false' . . .
//8. it will run the function 'loadTasks';
//9. it will change value of the input box into "";
//10. it will make the input box focused(clicked), to be prepared to type in, immediately, after pressing 'plus';
//11. it will change value of the variable 'deleteButtonLooped' into 'false'.
const plusFunction = function () {
  tasks0 = [];
  tasks0 = Array.from(tasks);
  tasks0.push(inputValue.value);
  //console.log(tasks0);
  localStorage.setItem("tasks", JSON.stringify(tasks0));
  itemRemover();
  tasksLoaded = false;
  if (!tasksLoaded) {
    loadTasks();
  }
  inputValue.value = "";
  inputValue.focus();
  deleteButtonLooped = false;
};

//..................................................................

//this function loops all the delete buttons which exist in each item. then it makes an array of them named to 'deleteArray'.
function deleteButtonsLooper() {
  for (i = 0; i < deleteButton.length; i++) {
    deleteArray = Array.from(deleteButton);
  }
}

//..................................................................

//this function is run when the app is reloaded or loads something new:
//1. if the variable 'tasksLoaded' is 'false' . . .
//2. it will run the function 'loadTasks';
//3. then it runs the function 'deleteButtonsLooper';
//4. it returns 'deleteArray'.
const loadANDreload = function () {
  if (!tasksLoaded) {
    loadTasks();
  }
  deleteButtonsLooper();
  return deleteArray;
};

//..................................................................

//this function is defined to help us, to define the array 'deleteArray' in outer scopes than the original scope which it has been defined first.
//it changes value of the variable 'deleteButtonLooped' into 'true'.
const deleteArrayDefiner = function () {
  deleteArray = loadANDreload();
  deleteButtonLooped = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------- Calling functions --------------------------------------------------------------

//when the app is loaded, this line wil be run, and it runs the 'loadTasks' function.
window.onload = loadTasks;

//every where in the whole body tag, when the mouse moves:
//1. if the variable 'deleteButtonLooped' is 'false' . . .
//2. the function 'deleteArrayDefiner' will be run; to define the 'deleteArray' here in this scope to use;
//3. it loops the 'deleteArray' using 'map' method, when each of 'deleteArray' cells is clicked:
//4. the 'tasks' value will be put on 'tasks0';
//5. the variable 'tasksLoaded' value will change into 'false';
//6. a variable will be defined, named to 'deletedItemIndex', and its value is the delete button index according to 'deleteArray'(in fact this index is same as index of the item we wand to be deleted);
//7. the item to delete(that has found by the index which explained in the above line) will be remove from the array 'tasks0' using 'splice' method;
//8. the new 'tasks0'(with delete item) will be saved in 'tasks' key-name, in localStorage;
//9. the function 'itemRemover' will be run;
//10. the value of 'deleteButtonLooped' will change into 'false';
//11. the function 'loadTasks' will be run.
body.onmousemove = function () {
  //console.log(deleteButtonLooped);
  if (deleteButtonLooped == false) {
    deleteArrayDefiner();
    //console.log(deleteArray);
    deleteArray.map((n) =>
      n.addEventListener("click", function (e) {
        tasks0 = Array.from(tasks);
        tasksLoaded = false;
        let deletedItemIndex = deleteArray.indexOf(e.target);
        tasks0.splice(deletedItemIndex, 1);
        //console.log(tasks0);
        localStorage.setItem("tasks", JSON.stringify(tasks0));
        itemRemover();
        deleteButtonLooped = false;
        loadTasks();
      })
    );
  }
  //console.log(deleteArray);
};
//also we should make a shape of code for the green buttons(done button) as same as what we made for delete buttons.
//with the difference which each of the green buttons makes its items text faded(dark or dark-grey) . . .
// for sometimes the user has done the task, and wants to check it, but doesn't want to delete the task from the list completely.

//..................................................................

//when the 'plus'button is clicked on, the 'plusFunction' will be run.
plus.addEventListener("click", function () {
  plusFunction();
});
