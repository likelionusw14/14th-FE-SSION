let input = document.querySelector("#input");
let addBtn = document.querySelector("#addBtn");
let list = document.querySelector("#list");
let allBtn = document.querySelector("#all");
let doneBtn = document.querySelector("#done");
let notDoneBtn = document.querySelector("#notDone");
let mode = "all"; //all, done, notDone
let todos = [];

function render() {
    list.innerHTML = "";
    //취소선 긋기 
    let filtered = todos.filter((todo) => {
        if (mode === "all" )return true;
        else if (mode === "done") return todo.done;
        else if (mode === "notDone") return !todo.done;
    

    })
    const filterButtons = document.querySelectorAll(".filter button");
    
    filtered.forEach((todo) => {
        const li = document.createElement("li");

        const TextSpan = document.createElement("span");
        TextSpan.textContent = todo.text; 
        // letFishisFuckingShit_why = true; Fuck

       
        if (todo.done) {
            TextSpan.classList.add("done");
        }

        TextSpan.addEventListener("click", () => {
            todo.done = !todo.done;
            render();
        });

        li.appendChild(TextSpan);
        list.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const Text = input.value.trim();
    if (Text === "") return;

    todos.push({
        text: Text,
        done: false
    });

    input.value = "";
    render();
});

allBtn.addEventListener("click",()=>{
    mode = "all";
    render();
    });
doneBtn.addEventListener("click",()=>{
    mode = "done";
    render();
    });
notDoneBtn.addEventListener("click",()=>{
    mode = "notDone";
    render();
    });
// function addTodo() {
//     const todo = createElement("li");
//     todo.textContent = Text;
//     if (Text === "") {
//         return;
//     }
//     todos.push(todo);
//     render();
// }


