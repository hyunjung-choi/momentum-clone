const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
let idNumbers = 1;

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;

    toDoList.removeChild(li);

    // filter 함수: array 안에 있는 모든 toDos를 통한다.
    // 그리고 true인 아이템들만 가지고 새로운 array를 만든다.
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); // string -> int
    });
    
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    // JSON.stringify = 자바스크립트의 object를 string으로 바꿔서
    // localStorage에 저장할 수 있게 해준다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    // const newID = toDos.length + 1;
    const newID = idNumbers;
    idNumbers += 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);

    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newID;

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newID
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null){
        // parse = String값을 JS의 object값으로 변경
        const parsedToDos = JSON.parse(loadedToDos);

        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();