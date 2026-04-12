let input = document.querySelector("#input");
let addBtn = document.querySelector("#addBtn");
let list = document.querySelector("#list");
let countText = document.querySelector("#remaining-count"); // HTML에 id="remaining-count"가 있어야 함
let completeAllBtn = document.querySelector("#completeAll");

let allBtn = document.querySelector("#all");
let doneBtn = document.querySelector("#done");
let notDoneBtn = document.querySelector("#notDone");

let todos = [];
let mode = "all";

// [기능] 할 일 추가
function addTodo() {
    let text = input.value.trim();
    if (text === "") return;

    todos.push({
        text: text,
        done: false
    });

    input.value = "";
    input.focus(); // 입력 후 포커스 유지
    render();
}

// [이벤트] 추가 버튼 & 엔터키
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo();
});

// [이벤트] 전체 완료 버튼
completeAllBtn.addEventListener("click", () => {
    todos.forEach(t => t.done = true);
    render();
});

// [이벤트] 필터 버튼들
allBtn.addEventListener("click", () => { mode = "all"; render(); });
doneBtn.addEventListener("click", () => { mode = "done"; render(); });
notDoneBtn.addEventListener("click", () => { mode = "notDone"; render(); });

// [핵심] 화면 그리기 함수
function render() {
    list.innerHTML = "";

    // 1. 남은 할 일 개수 업데이트
    let remaining = todos.filter(t => !t.done).length;
    if (countText) countText.textContent = remaining;

    // 2. 모드에 따른 필터링
    let filteredList = todos;
    if (mode === "done") {
        filteredList = todos.filter(t => t.done);
    } else if (mode === "notDone") {
        filteredList = todos.filter(t => !t.done);
    }

    // 3. 리스트 생성
    filteredList.forEach((todo) => {
        let li = document.createElement("li");
        
        // 체크박스 생성
        let check = document.createElement("div");
        check.className = `check ${todo.done ? "checked" : ""}`;
        check.addEventListener("click", (e) => {
            e.stopPropagation(); // 클릭 이벤트가 li로 퍼지는 것 방지
            todo.done = !todo.done;
            render();
        });

        let span = document.createElement("span");
        span.textContent = todo.text;

        // 삭제 버튼 생성 (과제 요구사항: delBtn)
        let delBtn = document.createElement("button");
        delBtn.textContent = "삭제";
        delBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // 삭제 버튼 클릭 시 완료 토글 방지 (중요!)
            todos = todos.filter(t => t !== todo);
            render();
        });

        // 완료 상태일 때 클래스 추가
        if (todo.done) li.classList.add("done");

        // li에 조립
        li.appendChild(check);
        li.appendChild(span);
        li.appendChild(delBtn);
        
        // 전체 리스트에 추가
        list.appendChild(li);
    });
}