function solution(num1, num2) {
    var answer = -1;
    answer = num1 + num2;
    return answer;
}


const members =[];
const addBtn = document.getElementById('addBtn');
const nameInput = document.getElementById('nameInput');
const ageInput = document.getElementById('ageInput');
const listEl = document.getElementById('list');



addBtn.addEventListener('click',() => {
    const name = nameInput.value;
    const age = ageInput.value;
   
    if(name === '' || age === '') return;
    members.push({
        
        name:name,
        age:age
        

    });
    render();
})


function render(){
    listEl.innerHTML = '';
    members.forEach(member => {
    const li = document.createElement('li');
    li.textContent =
    `이름: ${member.name}, 나이: ${member.age}`;
    listEl.appendChild(li);
});
}