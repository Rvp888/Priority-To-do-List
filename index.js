
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoSelect = document.getElementById("todo-select");
const submitBtn = document.getElementById("submit-btn");
const filterSelect = document.getElementById("filter-select");
const todoList = document.getElementById("todo-List");

let todoArray = [];
todoArray = JSON.parse(localStorage.getItem("todoItem"));
if (!todoArray) todoArray = []; 
renderTodos(todoArray);

submitBtn.addEventListener("click", () => {
    if (todoInput.value === "") return;
    const title = todoInput.value;
    const priority = todoSelect.value;

    todoArray.push({
        title,
        priority,
        checked: false,
        id: Date.now()
    });

    localStorage.setItem("todoItem",JSON.stringify(todoArray));
    renderTodos(todoArray);

})


function renderTodos(todos){
    todoList.innerHTML = "";
    if (!todos) return;

    todos.map((todo) => {
        todoList.innerHTML += `<div id="${todo.id}" class="todo ${todo.checked ? "checked" : ""} ${todo.priority}"> ${todo.title} <button id="delete">Remove</button></div>`
    })
}


todoList.addEventListener("click", (event) => {
    const todoItem = event.target;
    todoItem.classList.toggle("checked");

    todoArray.map((todo) => {
        if (todo.id === Number(todoItem.id)){
            todo.checked = !todo.checked;
        }
    });

    if (event.target.id === "delete"){
        let item = event.target.parentElement;
        todoArray.forEach((todo) => {
            if (todo.id === Number(item.id)){
                let index = todoArray.indexOf(todo);
                todoArray.splice(index, 1);
            }
        })
    }
    renderTodos(todoArray);
    localStorage.setItem("todoItem",JSON.stringify(todoArray));
} )



filterSelect.addEventListener("change",() => {
    let option = filterSelect.value;
    console.log(option);
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

    renderTodos(todos);
})