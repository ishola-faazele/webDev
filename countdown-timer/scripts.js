const minInput = document.getElementById("min-input");
const secInput = document.getElementById("sec-input");
const minUp = document.querySelector(".min.up");
const minDown = document.querySelector(".min.down");
const secUp = document.querySelector(".sec.up");
const secDown = document.querySelector('.sec.down');
const startBtn = document.querySelector('.start');


let seconds = parseInt(secInput.value, 10);
let minutes = parseInt(minInput.value, 10);



minUp.onclick = () => {
    minutes = parseInt(minInput.value, 10);
    minutes++;
    displayTime();
}
minDown.onclick = () => {
    minutes = parseInt(minInput.value, 10);
    minutes--;
    displayTime();
}
secUp.onclick = () => {
    seconds = parseInt(secInput.value, 10);
    seconds++;
    displayTime();
}
secDown.onclick = () => {
    seconds = parseInt(secInput.value, 10);
    seconds--;
    displayTime();
}


function displayTime() {
    minInput.value = minutes > 9 ? minutes: `0${minutes}`;
    secInput.value = seconds > 9 ? seconds : `0${seconds}`;
}

function changeTime() {

    seconds = parseInt(secInput.value, 10);
    minutes = parseInt(minInput.value, 10);

    let setTime = setInterval(()=> {
        
        if(minutes <= 0 && seconds<=0) {
            clearInterval(setTime);
            minutes = 0;
            seconds = 0;
            playSound();
            displayTime();
            return 1;
       }

        if(seconds<=0) {
            seconds = 60;
            minutes--;
        }
        seconds--;      
        displayTime();
    }, 1000);

}

startBtn.onclick = () => {
    changeTime()
}

function playSound() {
    const audio = new Audio("alarm.mp3");
    audio.play();
}