let level = "easy";
let transferAmount = 50;
let minA = 15;
let maxA = 85;
let gameOver = 0;
let isSLABreaching = 0;
let totalSLABreached = 0;
let lost = 0;
let totalDays = 1;
let daysLeft = 1;
let stepSize = 5;
let maxSLA = 5;
let DBChange = 0;
let MaxDBChange = 5;
let transferCount = 0;
let showTransfer = 1;

// grph vars start
let showGraph = 1;
const W = 600, H = 600; // dimensions of graph
let data = []; // to store binance liquidity
let pos, fy, c, Cliq, colors, l, f;
// graph vars end

// binance vars start
let Bliq = 50;
// binance vars end

// ledger vars start
let Lliq = 500;
// ledger vars end
var posX = 0;
// Algo for volatility




function Inc100(val) {
  return val + 1;
}

function Dec100(val) {
  return val - 1;
}

function rand5(val) {
  let extra =int(random(-5, 5));
  //console.log("rand5", extra);
  return val + extra;
}

function rand7(val) {
  let extra = int(random(-7, 7));
  //console.log("rand7", extra);
  return val + extra;
}

function buyExtra(val) {
  let extra = int(random(-8, 12));
  //console.log("buyExtra", extra);
  return val + extra;
}

function buyExtra1(val) {
  let extra = int(random(-4, 16));
  //console.log("buyExtra1", extra);
  return val + extra;
}

function sellExtra(val) {
   extra = int(random(-12, 8))
   //console.log("sellExtra", extra);
   return val + extra;
}

function wtfShib(val) {
  extra = int(random(-12, 12));
  //console.log("wtfShib", extra);
  return val + extra;
}

function randGaus(val) {
  c = sin(f*0.008);
  let extra = int(map(noise(f*0.09), 0, 1, -8, 8));
  //console.log("randGaus", extra);
  return val + extra;
}

function harmonic(val) {
  let extra = int(42 * cos(TWO_PI * noise(frameCount*0.02) *frameCount / 17)/2.7);
  //console.log("harmonic", extra);
  return val + extra;
}

function algoChooser(val) {
  let algoArr = [Inc100, Dec100, rand5, rand7, buyExtra, sellExtra, wtfShib, randGaus, harmonic, buyExtra1];
  let newAlgoArr = shuffle(algoArr);
  return newAlgoArr[0](val);
}

var news = [
  "Elon musk buys DOGE", 
  "Binance maintenance scheduled", 
  "Ledger maintenance scheduled", 
  "Engineers deploy broken code(unscheduled maintenance)",
  "Eth merge will market super volatile"
];

var newsIndex = 0;
var newsX = 0;
var showNews = 0;

function toggleNews() {
  showNews = !showNews;
}

function toggleTransfers() {
  showTransfer = !showTransfer;
  if (showTransfer) {
    B2L.removeAttribute('disabled');
    L2B.removeAttribute('disabled');
  } else {
    B2L.attribute('disabled', '');
    L2B.attribute('disabled', '');
  }
}

function changeNews(val) {
  newsIndex = val;
  if (newsIndex==0) {
    algo = buyExtra;
  } else if (newsIndex==1 || newsIndex==2 || newsIndex==3) {
    algo = sellExtra;
  } else {
    algo = wtfShib;
  }
  
}

let algo = randGaus;

function keyPressed() {
  if (keyCode === UP_ARROW) {
    transferAmount = transferAmount+1;
  } else if (keyCode === DOWN_ARROW) {
    transferAmount = transferAmount-1;
  } else if (keyCode === 13) {
    DBChange = DBChange+1;
  } else if (keyCode === LEFT_ARROW) {
    algo = wtfShib;
  }
  else if (keyCode === 49) {
    algo = Inc100;
  }
  else if (keyCode === 50) {
    algo = Dec100;
  }
  else if (keyCode === 51) {
    algo = rand5;
  }
  else if (keyCode === 52) {
    algo = rand7;
  }
  else if (keyCode === 53) {
    algo = randGaus;
  }
  else if (keyCode === 54) {
    algo = harmonic;
  }
  else if (keyCode === 90) {
    changeNews(0);
  }
  else if (keyCode === 88) {
    changeNews(1);
  }
  else if (keyCode === 67) {
    changeNews(2);
  }
  else if (keyCode === 86) {
    changeNews(3);
  }
  else if (keyCode === 66) {
    changeNews(4);
  }
  else if (keyCode === 78) {
    toggleNews();
  }
  else if (keyCode === 77) {
    toggleTransfers();
  }
  
  console.log(algo);
}

// algos end


function preload() {
  bg = loadImage(
    "https://i.ibb.co/QCQ9TF0/Screenshot-2022-08-23-at-5-10-08-PM.png"
  );
  sadSaunhita = loadImage(
    "https://i.ibb.co/Nyz96Kj/sad-saunhita-removebg-preview-1.png"
  );
  happySaunhita = loadImage(
    "https://i.ibb.co/Kr4Z05y/Screenshot-2022-08-23-at-2-43-48-PM-removebg-preview.png"
  );
}

function setup() {
  createCanvas(1500, 950);
  

  if (level == "easy") {
    daysLeft = 15;
    stepSize = 12;
  } else if (level == "medium") {
    daysLeft = 17;
    stepSize = 15;
    minA = 10;
    maxA = 60;
  } else {
    daysLeft = 20;
    stepSize = 20;
    minA = 5;
    maxA = 50;
  }
  totalDays = daysLeft;
  transferAmount = int(random(minA, maxA));
  
  
  if (showGraph == 1) {
    
    const time = daysLeft * stepSize; // number of x tick values
    const step = W/time; // time step
    // array containing the x positions of the line graph, scaled to fit the canvas
    posx = Float32Array.from({ length: time }, (_, i) => map(i, 0, time, 50, W+50));
  
    // function to map the number of infected people to a specific height (here the height of the canvas)
    fy = _ => map(_, 0, 130, H-50, (H/2) );
    Cliq = Bliq;

  }
  
  
}

function changeL2B() {
  let amount = transferAmount;
  Lliq = Lliq - amount;
  Cliq = Cliq + amount;
  transferCount = transferCount + 1;
}

function changeB2L() {
  let amount = transferAmount;
  Cliq = Cliq - amount;
  Lliq = Lliq + amount;
  transferCount = transferCount + 1;
}

function draw() {
  background(bg);
  textAlign(LEFT, CENTER);
  textSize(30);
  fill( 'white' );

  if (frameCount % 300 == 0 && daysLeft > 0 && gameOver!=1 ) {
    // 5 seconds is 1 day
    daysLeft--;
    if (daysLeft == 0) {
      gameOver = 1;
    }
    
    if (isSLABreaching == 1) {
      totalSLABreached = totalSLABreached + 1;
    }
    
    if (totalSLABreached >= maxSLA) {
      gameOver = 1;
      lost = 1;
    }
  }
  
  if (showGraph == 1) {

    f = frameCount;

    // X-axis
    if (f % (300/stepSize) == 0 && gameOver != 1) {
      data.push(Cliq);
      Cliq = algo(Cliq);
      if (Cliq <= 0) {
        gameOver = 1;
        lost = 1;
      }
      isSLABreaching = 0;
      if (Cliq < minA || Cliq > maxA) {
        isSLABreaching = 1;
      }
    }
  
    // max iteration
    l = data.length -1;
    
    // Rebuild curve at each frame
    for (let i = 0; i < l; i++) {
    
      y1 = fy(data[i]);
      y2 = fy(data[i+1]);
      x1 = posx[i];
      x2 = posx[i+1];

      // vertical lines (x-values)
      strokeWeight(1);

      if (data[i+1] > minA && data[i+1] < maxA) {
          stroke('green');
      } else {
        stroke('red' );
      }

      line(x1, H, x1, y1 + 2);
      
      // polyline
      strokeWeight(2);
      line(x1, y1, x2, y2);
      strokeWeight(1);

    }
    
    if (daysLeft > 1 && l>0) {
      ellipse(posx[l], fy(data[l]), 4, 4);
    }
    
  }

  if (daysLeft >= 0) {
    textSize(20);
    text("Mode: " + level, width / 15, height * 0.7/ 10);
    text("Days left: " + daysLeft, width / 15, height / 10);
    text("Score: " + (totalDays - totalSLABreached), width / 15, height*1.3 / 10);
    if (isSLABreaching == 1) {
        fill( 'red' );
    }
    text("Binance:" + Cliq, width * 3/ 15, height / 10);
    fill('white');
    text("Ledger:" + Lliq, width * 3/ 15, height *1.3/ 10);
    text("Min: "+minA+", Max: " + maxA, width * 5/ 15, height * 0.7/ 10);
    text("Days with SLA breach: "+totalSLABreached +"/" + maxSLA, width * 5/ 15, height * 1 / 10);
    text("DB change request: "+DBChange +"/" + MaxDBChange, width * 5/ 15, height * 1.3 / 10);
    text("Transfer count: "+transferCount, width * 5/ 15, height * 1.6 / 10);
  
    B2L = createButton('Transfer out');
    B2L.position(width / 15, height*2 / 10);
    B2L.mousePressed(changeB2L);
    B2L.addClass('btn btn-danger');
    
    text("Transfer amount: "+transferAmount, width * 2.6/ 15, height *2.2/ 10);


    L2B = createButton('Transfer in');
    L2B.position(width * 5/15, height*2 / 10);
    L2B.mousePressed(changeL2B);
    L2B.addClass('btn btn-success');
    
    if (newsX > width*0.4) {
      newsX = 0;
    }
    if (showNews) {
      text("TOP NEWS: \n" + news[newsIndex], newsX++, 650);
    }


  }

  if (gameOver == 1) {
    textFont("Comic Sans MS");
    text("GAME OVER", width * 0.47, height * 0.4);
    if (lost == 1) {
      image(sadSaunhita, width * 0.45, height * 0.45);
    } else {
      image(happySaunhita, width * 0.45, height * 0.45);
    }
    // noLoop();
  }
}
