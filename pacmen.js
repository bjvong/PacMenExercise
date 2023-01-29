var counter = 0;
const pacArray = [
    ['./images/PacMan1.png', './images/PacMan2.png'],
    ['./images/PacMan3.png', './images/PacMan4.png']
];
var direction = 0;
const pacMen = [];
var chomp = 0;
var game = document.getElementById('game');

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

function makePac() {
    let velocity = setToRandom(10);
    let position = setToRandom(200);
    let newimg = document.createElement('img');
    newimg.src = pacArray[direction][chomp];
    newimg.style.position = 'absolute';
    newimg.width = 100;
    newimg.style.left = position.x;
    newimg.style.top = position.y;
    newimg.direction = direction;
    newimg.velocity = velocity;
    newimg.position = position;
    newimg.chomp = chomp;
    newimg.id = counter;
    game.appendChild(newimg);
    pacMen.push(newimg);
    counter++;

    setTimeout(makePac, 4000);
}

function update() {
    pacMen.forEach((item) => {
      item.chomp = (item.chomp + 1) % 2;
      checkPageBounds(item);
      item.src = pacArray[item.direction][item.chomp];
      var updatePac = document.getElementById(item.id);
      item.position.x += item.velocity.x;
      updatePac.style.left = item.position.x + 'px';
      item.position.y += item.velocity.y;
      updatePac.style.top = item.position.y + 'px';
    });
    setTimeout(update, 200);  
  }


function checkPageBounds(item) {
    if (
        item.position.x + item.velocity.x + item.width > window.innerWidth ||
        item.position.x + item.velocity.x < 0
      ){
        item.velocity.x = -item.velocity.x;
        item.direction = (item.direction + 1) % 2;
      }
      if (
        item.position.y + item.velocity.y + item.height > window.innerHeight ||
        item.position.y + item.velocity.y < 0
      )
        {item.velocity.y = -item.velocity.y;}
}


makePac();
update();
