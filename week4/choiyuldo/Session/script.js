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
    
    let filtered = todos.filter((todo) => {
        if (mode === "all") return true;
        else if (mode === "done") return todo.done;
        else if (mode === "notDone") return !todo.done;
    });

    const filterButtons = document.querySelectorAll(".filter button");
    
    filtered.forEach((todo, index) => { // index 매개변수를 추가하여 배열 위치 파악
        const li = document.createElement("li");

        const TextSpan = document.createElement("span");
        TextSpan.textContent = todo.text; 

        if (todo.done) {
            TextSpan.classList.add("done");
        }

        // 할 일 완료 토글 이벤트
        TextSpan.addEventListener("click", () => {
            todo.done = !todo.done;
            render();
        });

        // 1. "삭제" 버튼 추가 (반드시 <button> 태그 사용)
        const delBtn = document.createElement("button"); // 3. 변수 이름 delBtn 사용
        delBtn.textContent = "삭제";

        // 4. 삭제 버튼 클릭 시 처리
        delBtn.addEventListener("click", (event) => {
            // 6. li 클릭 이벤트(완료 토글)가 같이 실행되지 않도록 처리
            event.stopPropagation(); 

            // todos 배열에서 해당 할 일 삭제 (index를 활용하거나 filter 사용)
            // 여기서는 filtered의 인덱스가 아닌 원본 todos에서의 위치를 찾아 삭제합니다.
            const targetIndex = todos.indexOf(todo);
            if (targetIndex > -1) {
                todos.splice(targetIndex, 1);
            }

            // 5. 삭제 후 render() 함수 다시 호출
            render();
        });

        li.appendChild(TextSpan);
        li.appendChild(delBtn); // 리스트 아이템에 삭제 버튼 붙이기
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


