const taskForm = document.querySelector(".js-TaskForm"),
    taskInput = taskForm.querySelector("input"),
    pendingList = document.querySelector(".js-pendingList"),
    finishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "currentPendings";
const FINISHED_LS = "currentFinished";

let pendings = [];
let finished = [];

function deletePendings(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const cleanPending = pendings.filter(function(pending){
        return pending.id !== parseInt(li.id);
    });
    pendings = cleanPending;
    savePending();
}

function deleteFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanFinished = finished.filter(function(finished){
        return finished.id !== parseInt(li.id);
    });
    finished = cleanFinished;
    saveFinished();
}


function moveToPendings(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const getPenObj = finished.filter(function(finished){
        return finished.id === parseInt(li.id);
    });
    printPendings(getPenObj[0].text);
    deleteFinished(event);
}

function moveToFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const getFinObj = pendings.filter(function(pending){
        return pending.id === parseInt(li.id);
    });
    printFinished(getFinObj[0].text);
    deletePendings(event);
}

function savePending() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
}

function saveFinished() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}
    
function printPendings(text, id = null) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const span = document.createElement("span");
    let newId = Date.now();
    if (id !== null) {
        newId = id;
    }
    finBtn.innerText = "✔️";
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deletePendings);
    finBtn.addEventListener("click", moveToFinished);
    span.innerText = text;
    pendingList.appendChild(li);
    li.appendChild(finBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    const pendingsObj = {
       text : text,
        id : newId
    };
    pendings.push(pendingsObj);
    savePending();
}

function printFinished(text, id = null) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const penBtn = document.createElement("button");
    const span = document.createElement("span");
    let newId = Date.now();
    if (id !== null) {
        newId = id;
    }
    penBtn.innerText = "⏪";
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteFinished);
    penBtn.addEventListener("click", moveToPendings);
    span.innerText = text;
    finishedList.appendChild(li);
    li.appendChild(penBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    const finishedObj = {
       text : text,
        id : newId
    };
    finished.push(finishedObj);
    saveFinished();
}

function handleSubmit(event) {
    event.preventDefault();
    if (taskInput.value) {
        const currentValue = taskInput.value;
        printPendings(currentValue);
        taskInput.value = "";
    }
}

function loadPending() {
    const loadedPending = localStorage.getItem(PENDING_LS);
    if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function(pending) {
        printPendings(pending.text, pending.id)
    });
    }
}

function loadFinished() {
    const loadedFinished = localStorage.getItem(FINISHED_LS);
    if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function(finished) {
        printFinished(finished.text, finished.id)
    });
    }
}

function init () {
    loadPending();
    loadFinished();
    taskForm.addEventListener("submit", handleSubmit);
}

init();