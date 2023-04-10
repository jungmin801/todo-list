//할 일 추가
//유저가 할 일을 입력
//+버튼을 누르면 all 안에 할일이 표시된다
//할 일을 추가하면 이전 할 일 아래에 새로 생긴다

let userInput = document.getElementById("user-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList =[];

addButton.addEventListener("click", addTask);

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}

function addTask(){
    let task = {
        taskContent: userInput.value,
        isComplete: false,
        id: generateRandomID()
    }
    taskList.push(task)
    render();
}


function render(){
    let list = [];
    if(mode == "all"){
        list = taskList
    } else if(mode == "inprogress" || mode == "done"){
        list = filterList
    } 


    let resultHTML = '';
    for(let i=0;i<list.length;i++){

        if(list[i].isComplete == true){
            resultHTML += 
            `<div class="task task-done">
                <span>${list[i].taskContent}</span>
                <div class="task-button-box">
                    <button onclick="toggleComplete('${list[i].id}')">
                        <i class="fa-solid fa-rotate-left rotate-icon" aria-hidden="true"></i>
                    </button>
                    <button onclick="deleteTask('${list[i].id}')">
                        <i class="fa-solid fa-trash-can trash-icon" aria-hidden="true"></i>
                    </button>
                </div>
            </div>`
    } else{  
        resultHTML += 
            `<div class="task">
                <span>${list[i].taskContent}</span>
                <div class="task-button-box">
                    <button onclick="toggleComplete('${list[i].id}')">
                        <i class="fa-solid fa-check check-icon" aria-hidden="true"></i>
                    </button>
                    <button onclick="deleteTask('${list[i].id}')">
                        <i class="fa-solid fa-trash-can trash-icon" aria-hidden="true"></i>
                    </button>
                </div>
            </div>`
    }    
    }
    document.getElementById("task-board").innerHTML = resultHTML;

}

// check버튼을 누르면
// 할일이 끝났는지 안끝났는지 정보가 필요함
// 할일에 취소선이 생기고 바탕은 회색처리
// check버튼이 되돌리기 버튼으로 바뀐다
// In Progress에 있던 할일이 사라지고, Done에 생긴다


function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function generateRandomID(){
    return Math.random().toString(36).substr(2, 16);
}


// 할일 삭제하기

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
        }
    }
    render();
    
}

// 아이템 필터링
// 탭별로 아이디를 부여여
// in progress를 눌렀을때 isComplete이 false인 아이템이 필터되어 보이도록
// done를 눌렀을때 isComplete이 true인 아이템이 필터되어 보이도록


function filter(event){
    mode = event.target.id;

    if(mode == "inprogress") {
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
    } else if(mode == "done"){
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        
    }
    render();
    console.log(filterList)
}

