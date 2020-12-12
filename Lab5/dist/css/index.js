let step = 1;
let increment = 1;
let i = 0;
document.addEventListener('DOMContentLoaded', () => {
  let animType = 0;
  document.getElementById("play1").addEventListener("click", () => {
    openWork();
    document.getElementById("anim2").style.display = "none";
    document.getElementById("anim1").style.display = "block";
    animType = 1;
  });
  let width_c, height_c, square_c;
  document.getElementById("play2").addEventListener("click", () => {
    openWork();
    document.getElementById("anim1").style.display = "none";
    document.getElementById("anim2").style.display = "block";
    animType = 2;
    width_c = $canvas.width = document.getElementById('anim2').offsetWidth;
    height_c = $canvas.height = document.getElementById('anim2').offsetHeight;
    square_c = new Square(10, 900, 80, width_c, height_c, ctx);
    square_c.draw()
  });
  document.getElementById("closeWork").addEventListener("click", () => {
    closeWork();
    let logs = JSON.parse(localStorage.getItem('messageLog'));
    const $logEl = document.getElementById('block6');
    $logEl.innerHTML = '';
    logs.map((log) => {
      $logEl.insertAdjacentHTML('beforeend', `
        <li>${log.timeStamp.split('(')[0]} -- ${log.message}</li>
      `)
    })
  })

  const $canvas = document.getElementById("anim2");
  const ctx = $canvas.getContext('2d');
  const texture = new Image();
  texture.src = "./img/texture.png";


  let $square = {
    elem: document.getElementById('square'),
    x: 900,
    y: 80,
    velX: random(-1, 3), 
    velY: random(-1, 3) 
  };
  let controlState = 0; // 0 - stoped, 1 - playing, 2 - ready for reload
  let squareInt;

  document.getElementById('mainControl').addEventListener("click", (event) => {
    if(controlState === 0){
      controlState = 1;
      event.target.innerHTML = "&#x25A0;";
      if(animType === 1) playJsAnim();
      else if(animType === 2) playCanvasAnim(square_c, width_c, height_c);
    } else if(controlState === 1) {
      controlState = 0;
      event.target.innerHTML = "&#9658;";
      if(animType === 1) stopJsAnim();
      else if(animType === 2) stopCanvasAnim();
    } else if(controlState === 2) {
      controlState = 0;
      event.target.innerHTML = "&#9658;";
      if(animType === 1) reloadJsAnim();
      else if(animType === 2) reloadCanvasAnim(square_c, width_c, height_c);
    }
  })

  // functions for element based animation
  const playJsAnim = () => {
    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Launched animation'}}))
    const width = document.getElementById('anim1').offsetWidth;
    const height = document.getElementById('anim1').offsetHeight;
    squareInt = setInterval(() => {
      moveSquare($square);
    }, )
  }

  const stopJsAnim = () => {
    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Stopped animation'}}))
    clearInterval(squareInt);
  }

  const reloadJsAnim = () => {
    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Reloaded animation'}}))
    $square = {...$square, x: 900, y: 80, velX: random(-1,2), velY: random(-1,2)};
    $square.elem.style.top = '100px';
    $square.elem.style.left = '900px';
  }

  // functions for canvas animation
  let frame;
  const playCanvasAnim = (square, width, height) => {
    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Launched animation'}}))
    const pattern = ctx.createPattern(texture, 'repeat');
    frame = () => {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
      square.draw();
      square.updatePosition();
      requestAnimationFrame(frame);
    }
    frame();
  }

  const stopCanvasAnim = () => {
    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Stopped animation'}}))
    frame = _=>{};
  }

  const reloadCanvasAnim = (square, width, height) => {
    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Reloaded animation'}}))
    square_c = new Square(10, 900, 80, width_c, height_c, ctx);
    square_c.draw() 
  }

  document.addEventListener('leftArea', () => {
    clearInterval(squareInt);
    frame = _=>{};
    controlState = 2;
    document.getElementById('mainControl').innerHTML = "&#8634;";
  })

  localStorage.setItem('messageLog', JSON.stringify(new Array()));
  document.addEventListener("animMessage", (event) => {
    document.getElementById("messages").innerHTML = event.detail.message;
    let messages = JSON.parse(localStorage.getItem('messageLog'));
    console.log(messages);
    messages.push({timeStamp: (new Date()).toString(), message: event.detail.message});
    localStorage.setItem('messageLog', JSON.stringify(messages));
  })
})

const openWork = () => {
  document.getElementById('work').style.display = "flex";
  document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Opened animation'}}))
}

const closeWork = () => {
  document.getElementById('work').style.display = "none";
  document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Closed animation'}}))
}

const random = (min, max) => {
  let num = Math.floor(Math.random()*(max-min+1))+min;
  return num === 0 ? 0.5 : num
}

let leftArea = new Event('leftArea');

const moveSquare = (square) => {
  ++i;
  if(increment%4 == 1){
            square.x += -step;
            square.elem.style.left = `${square.x}px`;
  } 
  else if(increment%4 == 2){
            square.y += -step;
            square.elem.style.top = `${square.y}px`;
  }
  else if(increment%4 == 3){
            square.x += step;
            square.elem.style.left = `${square.x}px`;
  }
  else if(increment%4 == 0){
            square.y += step;
            square.elem.style.top = `${square.y}px`;
  }
  if(i == increment){
  i = 0;
  increment++;
  }
  if ( increment == 121)
  {
  document.dispatchEvent(leftArea);
  document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Left the area'}}))
  }
}

class Square {
  constructor(size, x, y, canvasWidth, canvasHeight, ctx){
    this.size = size;
    this.x = x;
    this.y = y;
    this.velX = random(-1, 3);
    this.velY = random(-1, 3);
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.ctx = ctx;
  }

  updatePosition () {
  ++i;
  if(increment%4 == 1){
    this.x += -step;
  } 
  else if(increment%4 == 2){
    this.y += -step;
  }
  else if(increment%4 == 3){
    this.x += step;
  }
  else if(increment%4 == 0){
    this.y += step;
  }
  if(i == increment){
    i = 0;
    increment++;
  }
  if ( increment == 141)
  {
    document.dispatchEvent(leftArea);
    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Left the area'}}))
  }
  }

  draw () {
    this.ctx.fillStyle = "rgba(30,144,255,1)";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}