var button = document.getElementById('js-btn'),
    timer = document.getElementById('js-timer'),
    reset = document.getElementById('js-reset');


button.addEventListener('click', doSubmit);
reset.addEventListener('click', resetButton);


function doSubmit() {
  
  if (button.classList.contains('do-submit')) { return; }

  // do clicked animation
  button.classList.add('do-submit');
  
  // TODO handle submit, should return amountLoaded
  
  // manually feed amountLoaded as if receiving 0-100% values
  setTimeout(function() {
    doTimer(0);
  }, 1200);
  
  setTimeout(function() {
    doTimer(15);
  }, 1200);

  setTimeout(function() {
    doTimer(75); 
  }, 2000);

  setTimeout(function() {
    doTimer(100);
  }, 2800);
}


function doTimer(amountLoaded) { 
  
  timer.style.strokeDashoffset = 3.83 * (100 - amountLoaded) + 'px';

  if (amountLoaded === 100) {
    setTimeout(function() {
      button.classList.add('success');
    }, 500);
  }
}


function resetButton() {
  // reset button classes
  button.classList.add('reset');
  setTimeout(function() {
    button.classList.remove('success');
    button.classList.remove('do-submit');
    button.classList.remove('reset');
  }, 500);
  // reset timer animation
  timer.style.strokeDashoffset = '383px';
  // reset timer counter
  time = 110;
}









/*{<script src="./buttonScript.js" type="text/javascript" />
    <button id="js-btn" class="btn btn-green btn-lg">
  <span class="text">Submit</span>
  <div class="timer">
    <svg id="js-timer" viewBox="0 0 120 120" xmlns='http://www.w3.org/2000/svg'><circle cx="60" cy="60" r="55"/></svg>
  </div>
  <div class="icon-success"><svg viewBox="0 0 50 45" xmlns='http://www.w3.org/2000/svg'><path d="M20,42 L3, 25"/><path d="M20,42 L47,3"/></svg></div>
</button>}*/