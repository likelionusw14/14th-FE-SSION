let input = document.querySelector("#input");
let addBtn = document.querySelector("#addBtn");
let list = document.querySelector("#list");

let allBtn = document.querySelector("#all");
let doneBtn = document.querySelector("#done");
let notDoneBtn = document.querySelector("#notDone");

let countText = document.querySelector("#count b");
let completeAllBtn = document.querySelector("#completeAll");

let todos = [];
let mode = "all";

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo();
});

allBtn.addEventListener("click", () => { mode = "all"; render(); });
doneBtn.addEventListener("click", () => { mode = "done"; render(); });
notDoneBtn.addEventListener("click", () => { mode = "notDone"; render(); });

completeAllBtn.addEventListener("click", () => {
    todos.forEach(t => t.done = true);
    render();
});

function addTodo() {
    let text = input.value.trim();
    if (text === "") return;

    todos.push({
        text: text,
        done: false
    });

    mode = "all";
    input.value = "";
    input.focus();
    render();
}

function render() {
    list.innerHTML = "";

    let filtered = todos;
    let remaining = todos.filter(t => !t.done).length;
    countText.textContent = remaining;

    if (mode === "done") filtered = todos.filter(t => t.done);
    else if (mode === "notDone") filtered = todos.filter(t => !t.done);

    filtered.forEach(todo => {
        let li = document.createElement("li");

        let check = document.createElement("div");
        check.className = `check ${todo.done ? "checked" : ""}`;

        check.addEventListener("click", () => {
            todo.done = !todo.done;
            render();
        });

        let span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.done) li.classList.add("done");

        li.append(check, span);
        list.appendChild(li);
    });
}
