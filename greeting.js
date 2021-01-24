const greetingForm = document.querySelector(".js-form"),
    greetingInput = greetingForm.querySelector("input"),
    greeting = document.querySelector(".js-greeting");


const USER_LS = "currentuser";
const SHOWING = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = greetingInput.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    greetingForm.classList.remove("invisible");
    greetingForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    greetingForm.classList.add("invisible");
    greeting.classList.remove("invisible");
    greeting.innerText = `안녕하세요 ${text},님`;
}


function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null){
        askForName();
    } else {
       paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}
init();