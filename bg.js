const body = document.querySelector("body");

const IMGNUMBER = 5;


function paintImage(imgNumber){
    const image = new Image();
    image.src = `image/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRanbom(){
    const number = Math.floor(Math.random() * IMGNUMBER);
    return number;
}

function init(){
    const randomNumber = genRanbom()
    paintImage(randomNumber);
}
init();