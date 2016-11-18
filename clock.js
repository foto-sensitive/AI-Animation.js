
var h1 = document.getElementsByTagName('h1')[0];
    h1.className  = "time";
  var seconds = 0, minutes = 0, hours = 13,
    t, timeString = "13:00:00";
    var prevSeconds = 0;

function add() {

    if(seconds >= prevSeconds+5 || seconds <= prevSeconds-5){
      prevSeconds = seconds;
      GoToNext();
    }

    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }


    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();


}

function timer() {
    t = setTimeout(add, 1000);
}

timer();
