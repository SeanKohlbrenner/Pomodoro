// Clock Settings in seconds
let shortBreakTime = 300;
let longBreakTime = 1500;
let focusTime = 1500;

// How long the current block will last
let currentTimeAmount = 1500;
let currentRoundTimeDefault = 1500;

/* Round:
 * 0 - focus
 * 1 - short
 * 2 - focus
 * 3 - short
 * 4 - focus
 * 5 - short
 * 6 - focus
 * 7 - long
 */
let round = 0;
let sets = 0;


// Global ID for timer
var intervalID = undefined;

function timeUp(blockName) {
  display = document.querySelector('#timer');
  timeSetting = document.querySelector('#' + blockName);

  switch (blockName) {
    
    case 'focus-time':
      focusTime += 60;
      timeSetting.textContent = focusTime / 60;
      currentRoundTimeDefault = focusTime;

      if(round % 2 == 0 && !intervalID) {
        display.textContent = focusTime / 60 + ':00';
        currentTimeAmount = focusTime;
      }

      break;
    
    case 'short-break-time':
      shortBreakTime += 60;
      timeSetting.textContent = shortBreakTime / 60;
      currentRoundTimeDefault = shortBreakTime;

      if(round % 2 != 0 && round != 7 && !intervalID) {
        display.textContent = shortBreakTime / 60 + ':00';
        currentTimeAmount = shortBreakTime;
      }

      break;
    
    case 'long-break-time':
      longBreakTime += 60;
      timeSetting.textContent = longBreakTime / 60;
      currentRoundTimeDefault = longBreakTime;

      if(round == 7 && !intervalID) {
        display.textContent = longBreakTime / 60 + ':00';
        currentTimeAmount = longBreakTime;
      }

      break;
  }
}

function timeDown(blockName) {
  display = document.querySelector('#timer');
  timeSetting = document.querySelector('#' + blockName);

  switch (blockName) {
    case 'focus-time':
      focusTime -= 60;
      timeSetting.textContent = focusTime / 60;
      currentRoundTimeDefault = focusTime;

      if(round % 2 == 0 && !intervalID) {
        display.textContent = focusTime / 60 + ':00';
        currentTimeAmount = focusTime;
      }

      break;
    
    case 'short-break-time':
      shortBreakTime -= 60;
      timeSetting.textContent = shortBreakTime / 60;
      currentRoundTimeDefault = shortBreakTime;

      if(round % 2 != 0 && round != 7 && !intervalID) {
      display.textContent = shortBreakTime / 60 + ':00';
      currentTimeAmount = shortBreakTime;
      }

      break;
    
    case 'long-break-time':
      longBreakTime -= 60;
      timeSetting.textContent = longBreakTime / 60;
      currentRoundTimeDefault = longBreakTime;

      if(round == 7 && !intervalID) {
        display.textContent = longBreakTime / 60 + ':00';
        currentTimeAmount = longBreakTime;
      }
      
      break;
  }
}

function clockController(operation) {
  display = document.querySelector('#timer');
  switch (operation) {
    case 'play':
      setTimer('play', currentTimeAmount, display);
      document.getElementById('play').style.display = 'none'
      document.getElementById('pause').style.display = 'block'
      break;
      
    case 'pause':
      setTimer('pause', currentTimeAmount, display);
      document.getElementById('play').style.display = 'block'
      document.getElementById('pause').style.display = 'none'
      break;
    
    case 'stop':
      setTimer('pause', currentTimeAmount, display);
      display.textContent = focusTime / 60 + ':00';
      currentTimeAmount = focusTime;
      currentRoundTimeDefault = focusTime;
      document.getElementById('play').style.display = 'block'
      document.getElementById('pause').style.display = 'none'
      document.querySelector('#mode').textContent = 'Focus';
      round = 0;
      break;

    case 'restart':
      setTimer('pause', currentTimeAmount, display);
      display.textContent = currentRoundTimeDefault / 60 + ':00';
      currentTimeAmount = currentRoundTimeDefault;
      document.getElementById('play').style.display = 'block'
      document.getElementById('pause').style.display = 'none'
      break;
    
    case 'next':
    clearInterval(intervalID);
      nextRound();
      break;
  }
}

function setTimer(operation, duration, display) {
  switch(operation) {
    case 'play':
      var timer = duration, minutes, seconds;
      intervalID = setInterval(function () {
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);
    
          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;
    
          display.textContent = minutes + ':' + seconds;
    
          currentTimeAmount = (minutes * 60) + seconds;
    
          if (--timer < 0) {
            clearInterval(intervalID);
            nextRound();
          }

      }, 1000);
      break;

    case 'pause':
      clearInterval(intervalID);
      break;
  }
}

function nextRound() {
  display = document.querySelector('#timer');
  mode = document.querySelector('#mode');
  round += 1;

  if(round == 8) {
    round = 0;
    sets += 1;
  }

  if (round == '0' || round == '2' || round == '4' || round == '6') {
    currentTimeAmount = focusTime;
    currentRoundTimeDefault = focusTime;
    mode.textContent = 'Focus';
    setTimer('play', currentTimeAmount, display);
  }

  else if (round == '1' || round == '3' || round == '5') {
    currentTimeAmount = shortBreakTime;
    currentRoundTimeDefault = shortBreakTime;
    mode.textContent = 'Short Break';
    setTimer('play', currentTimeAmount, display);
  }

  else {
    currentTimeAmount = longBreakTime;
    currentRoundTimeDefault = longBreakTime;
    mode.textContent = 'Long Break';
    setTimer('play', currentTimeAmount, display);
  }
}