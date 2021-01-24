const clockContainer = document.querySelector(".clockContainer"),
    clock = clockContainer.querySelector("h3");
const daysContainer = document.querySelector(".daysContainer"),
    today = daysContainer.querySelector("h4"),
    week = daysContainer.querySelector("span");

const days = ["일", "월", "화", "수", "목", "금", "토"];

function handleClock(){
    const nDate = new Date();
    const hours = nDate.getHours();
    const miutes = nDate.getMinutes();
    const second = nDate.getSeconds();
    const month = nDate.getMonth() + 1;
    const year = nDate.getFullYear();
    const date = nDate.getDate();
    const getdays = nDate.getDay();
    const day = days[`${getdays}`];
    clock.innerText = `${hours < 10 ? `0${hours}`:`${hours}`
        }:${miutes < 10 ? `0${miutes}`:`${miutes}`
        }:${second < 10 ? `0${second}`:`${second}`
        }`;
    today.innerText = `${year}년${month}월${date}일`;
    week.innerText = `${day}요일`;
}


function init(){
    handleClock();
    setInterval(handleClock, 1000);
}

init();