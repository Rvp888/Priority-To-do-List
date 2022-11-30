
/*============================== Element-Selection =========================================================================================*/

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoSelect = document.getElementById("todo-select");
const submitBtn = document.getElementById("submit-btn");
const filterSelect = document.getElementById("filter-select");
const todoList = document.getElementById("todo-List");
const messageEnter = document.getElementById("enter-message");
let targetTodo;
let todoArray = [];

todoArray = JSON.parse(localStorage.getItem("todoItem"));

renderTodos(todoArray);



/*============================== To-do Functions =================================================================================================*/


/*--------------------------- Function To Add new item in the list(Array) or to Save edited item -------------------------------------------*/


function addTodo(e) {
    e.preventDefault();
    if (todoInput.value === "") {
        messageEnter.innerText = "Please Enter the To-do";
        setTimeout(()=>{
            messageEnter.innerText = "";
        },2000);
        return;
    }

    else if (e.target.innerText == "Save") {
        saveTodo(e,todoInput.value,todoSelect.value);
        messageEnter.innerText = "Item Edited Successfully";
        setTimeout(()=>{
            messageEnter.innerText = "";
        },2000);
    }
    else {
        const title = todoInput.value;
        const priority = todoSelect.value;

        todoArray.push({
            title,
            priority,
            checked: false,
            id: Date.now()
        });
    }
    localStorage.setItem("todoItem",JSON.stringify(todoArray));
    renderTodos(todoArray);
    todoInput.value = "";
}



/*--------------------------- Function to Display To-do List ----------------------------------------------------------------------------------------------*/


function renderTodos(todos){
    todoList.innerHTML = "";

    todos.map((todo) => {
        todoList.innerHTML += `<div id="${todo.id}" class="todo  ${todo.priority}"> 
        <span id="span" class="${todo.checked ? "checked" : ""}">${todo.title}</span> 
        <button id="edit">Edit</button> <button id="delete">Remove</button> </div>`;
    })
}



/*---------------------------------- Function Delete To-do ----------------------------------------------------------------------------*/


    function deleteTodo(e) {
        let item = e.target.parentElement;
        todoArray.forEach((todo,index) => {
            if (todo.id === Number(item.id)){
                todoArray.splice(index, 1);
            }
        })
        renderTodos(todoArray);
        localStorage.setItem("todoItem",JSON.stringify(todoArray));
    }


/*---------------------------------- Function Filter To-do List ----------------------------------------------------------------------------------*/



function filterTodo() {
    let option = filterSelect.value;
    let todos = todoArray;
    if (option === "High"){
        todos = todos.filter((todo) => todo.priority === "High");
    }
    else if (option === "Medium"){
        todos = todos.filter((todo) => todo.priority === "Medium");
    }
    else if (option === "Low"){
        todos = todos.filter((todo) => todo.priority === "Low");
    }
    else if (option === "Completed"){
        todos = todos.filter((todo) => todo.checked === true);
    }

    renderTodos(todos);
}



/*---------------------------------- Function Edit-To-do ----------------------------------------------------------------------------------*/


function editTodo(e) {
    targetTodo = e.path[1].firstElementChild; //span element
    todoInput.value = targetTodo.textContent;
    submitBtn.innerText = "Save";
}


/*---------------------------------- Function Save-To-do ----------------------------------------------------------------------------------*/


function saveTodo(e,title,priority) {
    let todoItem = targetTodo.parentElement;
    todoArray.forEach((todo) => {
        if (todo.id == todoItem.id){
            todo.title = title;
            todo.priority = priority;
        }
    })
    
    submitBtn.innerText = "Add";  
}



/*===================================== Event-Listeners ====================================================================================*/


// To Add new To-do //

submitBtn.addEventListener("click", addTodo);


// To Filter To-dos //

filterSelect.addEventListener("change",filterTodo);


// To Edit and Delete a To-do //

todoList.addEventListener("click", (event) => {

    if (event.target.id === "delete"){
        deleteTodo(event);
        messageEnter.innerText = "Item Deleted Successfully";
        setTimeout(()=>{
            messageEnter.innerText = "";
        },2000);
    }

    else if (event.target.id === "edit"){
        editTodo(event);
    }

} )


// To check and uncheck the completed To-do //

todoList.addEventListener("dblclick", (event) => {

    if (event.target.id === "span"){
        const todoItem = event.target.parentElement;
        todoArray.map((todo) => {
            if (todo.id === Number(todoItem.id)){
                todo.checked = !todo.checked;
            }
        });
        renderTodos(todoArray);
        localStorage.setItem("todoItem",JSON.stringify(todoArray));
    }
})

