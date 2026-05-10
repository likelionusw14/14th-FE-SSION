let input = document.querySelector("#input");
let addBtn = document.querySelector("#addBtn");
let list = document.querySelector("#list");

let countText = document.querySelector("#count");

let allBtn = document.querySelector("#all");
let doneBtn = document.querySelector("#done");
let notDoneBtn = document.querySelector("#notDone");

let delBtn = document.querySelector("#delBtn");
let completeAllBtn = document.querySelector("#completeAll");

let todos = [];
let mode = "all";

completeAllBtn.addEventListener("click", () => {
    todos.forEach(t => t.done = true);
    render();
});

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo();
});

allBtn.addEventListener("click", () => {
    mode = "all";
    updateButtonStatus(allBtn);
    render();
});

doneBtn.addEventListener("click", () => {
    mode = "done";
    updateButtonStatus(doneBtn);
    render();
});

notDoneBtn.addEventListener("click", () => {
    mode = "notDone";
    updateButtonStatus(notDoneBtn);
    render();
});


function addTodo() {

    let text = input.value.trim();  //입력값 공백 제거 후 저장, 중복되는 띄어쓰기는 trim아니더라도 자동으로 제거되는 듯
    if (text === "") return;  //text 입력값이 공백 시 반환

    todos.push({
        text : text,
        done : false
    });

    mode ="all";
    updateButtonStatus(allBtn);
    input.value = ""; //입력창 초기화
    input.focus();
    render(); //화면 렌더링
}

function render() {
    list.innerHTML = "";  //리스트 초기화 .. why? -> 렌더링할 때마다 리스트를 초기화하여 중복된 항목이 생기는 것을 방지하기 위해서입니다. 만약 초기화하지 않으면, 새로운 항목이 추가될 때마다 기존 항목들이 계속해서 중복되어 나타날 수 있습니다.

    let filtered = todos.filter((todo) =>{
        if (mode === "all"){
            return true;
        }else if (mode === "done") {
            return todo.done;
        }else if (mode === "notDone") {
            return !todo.done;
    }});

    filtered.forEach(todo => {  //foreach : 배열 값이 각각 무언가를 하겠다
        const Textspan = document.createElement("span")

        //체크 버튼
        let check = document.createElement("div");
        check.className = `check ${todo.done ? "checked" : ""}`;

        check.addEventListener("click", () => {
            todo.done = !todo.done;
            render();
        });
        
        Textspan.addEventListener("click",() =>{
            todo.done = !todo.done;
            render();
        });

        let li = document.createElement("li");  // todo => { ... }는 function(todo) { ... }와 같은 의미입니다. =>를 사용함으로써 function() 생략
        Textspan.textContent = todo.text;

        if (todo.done){
            Textspan.classList.add("done");
        } //html의 속성을 변경
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";

        // 삭제 버튼 클릭 이벤트 추가
        deleteBtn.addEventListener("click", (e) => {  //e는 event객체, 클릭된 위치, 클릭된 요소 등 클릭 사건에 대한 모든 정보가 담겨 있는 '사건 보고서'
        e.stopPropagation();    //이건 같이 클릭되는 거 방지, 눌렀을때 완료 처리되는 거 방지하고, 삭제 버튼만 눌리도록
        todos = todos.filter(t => t !== todo);      //클릭한 것만 배열에서 제외하고 아닌 것들만 새 배열에 남기고 새로운 배열 생성
        render(); // 배열이 바뀌었으니 다시 그리기
        });

        li.append(check, Textspan, deleteBtn);
        list.appendChild(li); 
    });

    let remaining = todos.filter(t => !t.done).length;
    if (countText) {
        countText.innerHTML = `남은 할 일: <b>${remaining}</b>`;}
}

// 버튼 3개를 배열로 묶어줍니다.
const filterBtns = [allBtn, doneBtn, notDoneBtn];

function updateButtonStatus(clickedBtn) {
    filterBtns.forEach(btn => {
        if (btn === clickedBtn) {
            // 클릭된 버튼: active 켜고, unactive 끄기
            btn.classList.add("active");
            btn.classList.remove("unactive");
        } else {
            // 나머지 버튼: unactive 켜고, active 끄기
            btn.classList.add("unactive");
            btn.classList.remove("active");
        }
    });
}
