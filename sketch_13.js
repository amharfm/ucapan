
let style;
let isThis = 3;
  //0 & 1 are for squared frame
  //2 is for screensaver
  //3 is for mobile

let reddish = 0;
let fR = 30;
let num = 150;
let colors = [];
  let w = 70;
  let xspacing = 1;
  let maxwaves;
  let dx = new Array(maxwaves);
  let amplitude = new Array(maxwaves);
  let yvalues = [];
    let land_arr = [];
    let star_arr = [];
    let land_done = 0;
let count_stars = 0;
  let y_ = 250;
  let x_ = 0;
  let z = 0;
    let count = 0;
    let theta = 0;
    let limit = [];
    let limit2 = [];
let pads = 0;
let siapa;
let tamuAda = 0;
let daftarTamu;

function setup() {
  style = isThis;
  if (style<2){    
    createCanvas(400,400);
    pads = 70;
    count_stars = 69;
  } else if (style==2){
    createCanvas(1366,768);
    pads = 432;
    count_stars = 100;
  } else if (style==3){
    frameRate(10);
    createCanvas(window.displayWidth,window.displayHeight);
    count_stars = 50;
  }
  
  firsthingtodo();
  
  bg();
  
  secondLayer();
}

function draw(){
  if (style==1){
    aurora1();
    drawStars();
    padding();
  } else if (style==0){  
    if (frameCount<num){ 
      aurora0();
      padding();
      z = frameCount;
    } else if (frameCount<num+z-50){
      star();
      grass();
      padding();
    }
  } else if (style==2){
    aurora1(style);
    drawStars();
    padding();
  } else if (style==3){
    aurora1(style);
    drawStars();    
  
    var xmlhttp = new XMLHttpRequest();
    var url = "daftartamu.json";  
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            daftarTamu = JSON.parse(this.responseText);
            siapa = window.location.hash.split("#")[1];
            if (daftarTamu.tamu[siapa]){
              siapa = daftarTamu.tamu[siapa];
            } else siapa = "you";
            
            
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  
    noStroke();
    fill("white");
    textSize(16);
    textAlign(CENTER);
    //text('to: '+ siapa , width/2, height*0.85);
    text('to: '+ siapa , width/2, height*0.25);
  }
}

function secondLayer(){
  if (style==1){
    //static stars that blink
    for (let i=0; i<count_stars; i++){
      star_arr[i] = {
        "x":random(80,width-77),
        "y":random(0,height-100)
      }
    }
  } else if (style==0 || style==2){
    //static stars that blink
    for (let i=0; i<count_stars; i++){
      star_arr[i] = {
        "x":random(pads,width-pads),
        "y":random(0,height-100)
      }
    }
  } else {
    for (let i=0; i<count_stars; i++){
      star_arr[i] = {
        "x":random(0,width),
        "y":random(0,height)
      }
    }
  }
}

function firsthingtodo(){
  frameRate(fR);
  
  colors = [
    color('rgba('+92+','+230+','+133+','+0.1+')'),
    color('rgba('+135+','+46+','+67+','+0.3+')'),
    color('rgba('+0+','+225+','+65+','+0.12+')'),
    color('rgba('+70+','+125+','+90+','+0.03+')'),    //r
    color('rgba('+55+','+88+','+67+','+0.02+')'),    //r    
    color('rgba('+9+','+40+','+52+','+0.15+')'),
    color('rgba('+255+','+255+','+255+','+0.15+')'),
    color('rgba('+0+','+225+','+65+','+0.09+')'),    //r
    color('rgba('+9+','+40+','+52+','+0.45+')'),
    color('rgba('+197+','+41+','+174+','+0.13+')'),
    color('rgba('+0+','+225+','+65+','+0.1+')'),
    "#222F35",
    color('rgba('+87+','+98+','+110+','+0.1+')')
  ];
  
  if (style==1){
    maxwaves = 4;
    for (let i = 0; i < maxwaves; i++) {
      amplitude[i] = random(2, 4);
      let period = random(100, 300); // Num pixels before wave repeats
      dx[i] = (TWO_PI / period) * xspacing;
    }
    yvalues = new Array(200);
        
    land_arr[0] = random(0,20);
    land_arr[1] = random(-10,30);
    land_arr[2] = random(2,10);
  } else if (style==2){
    maxwaves = 4;
    for (let i = 0; i < maxwaves; i++) {
      amplitude[i] = random(2, 4);
      let period = random(100, 300); // Num pixels before wave repeats
      dx[i] = (TWO_PI / period) * xspacing;
    }
    yvalues = new Array(200);
        
    land_arr[0] = random(0,20);
    land_arr[1] = random(-10,30);
    land_arr[2] = random(2,10);
  } else if (style==3){
    maxwaves = 4;
    for (let i = 0; i < maxwaves; i++) {
      amplitude[i] = random(2, 4);
      let period = random(100, 200); // Num pixels before wave repeats
      dx[i] = (TWO_PI / period) * xspacing;
    }
    yvalues = new Array(floor(width/1.2));
        
    land_arr[0] = random(0,20);
    land_arr[1] = random(-10,30);
    land_arr[2] = random(2,10);
  }

}

function drawStars(){
  let big;
  if (style<2){
    big = 3;
  } else big = 4;
  for (let i=0; i<star_arr.length; i++){
    fill(color('rgba(255,255,255,0.4)'))
    //fill("red");
    ellipse(star_arr[i].x ,star_arr[i].y, random(0,big), random(0,big));
  }
}

function mousePressed(){
  document.body.requestFullscreen();
  reset();
}

function bg(){
  for (let i=0; i<=height-77-0; i++){
    stroke(reddish, 40, 52);
    if (style==2){
      reddish = (reddish+0.22)%width;
    } else reddish = (reddish+0.3)%width;
    line(0,i,width,i);
  }
  for (let j=height-77; j<=height; j++){
    stroke(reddish, 40, 52);
    reddish = (reddish-0.2)%width;
    line(0,j,width,j);
    stroke(colors[8]);
    line(0,j,width,j);
  }
}

function star(blinks){
  var galaxy = { 
    locationX : random(pads,width-pads),
    locationY : random(height) - 100 - 20,
    size : random(1,2)
  };
  if (blinks){
    fill("white");
    galaxy.size = random(3,4);
  } else {
    fill("gray");
  }
  if (style==2){
    galaxy.size = random(4,5);
  }
  noStroke();
  ellipse(galaxy.locationX ,galaxy.locationY, galaxy.size, galaxy.size);
  fill(colors[6]);
  ellipse(galaxy.locationX ,galaxy.locationY+444, galaxy.size, galaxy.size);
}

function lake(y){
  noStroke();
  fill(colors[12]); //or 4
  rect(0,height-y, width,height);
}

function padding(){
  noStroke();
  fill("white");
  rect(0,0, pads,height);
  rect(width-pads,0, width,height);
}

function grass(){
  fill(random([random(5,30),"#251912"]));
  push();
    translate(random(-width/2+77,width-20-77), 100);
    bezier(width/2+random(-10,10),height-100-random(0,50),width/2-random(-20,20),height-100-random(0,50),   width/2-15,height-20, width/2-10, height);
    bezier(width/2+random(-10,10),height-100-random(0,50),width/2-random(-20,20),height-100-random(0,50),   width/2-15,height-20, width/2-10, height);
  pop();
}

function land(blinks){
  if (!blinks){
    if (land_done<1){
      land_done++;
      fill(colors[11]);
      beginShape();  
        vertex(0+60, height-77);
        vertex(0+70+15+random(0,20), height-77-10);
        vertex(width-70-15-random(-10,30), height-77-18+random(2,10));
        vertex(width-50, height-77);
      endShape();
    }
  } else {
      noStroke();
      fill(colors[11]);
      beginShape();  
        vertex(pads+40, height-77);
        vertex(pads+70+15+land_arr[0], height-77-10);
        vertex(width-pads-70-15-land_arr[1], height-77-18+land_arr[2]);
        vertex(width-pads-50, height-77);
      endShape();    
  }
}

function aurora0() {
  push();
    translate(width/2,0-height/2);    
    strokeWeight(4);
    stroke(colors[0]);
    line(x_, y_, x_+70, 0);
      strokeWeight(5);
      stroke(colors[2]);
      line(x_+random(-3,3), y_-10-random(-10,10), x_-7, y_+20);
        //strokeWeight(4);
        //stroke(random([colors[1], colors[10]]));
        //line(x_, y_, x_+70, 0);
          strokeWeight(4);
          stroke(colors[5]);
          line(x_+2, y_-70+random(-30,20), x_+70+2, 0);
    
    //reflection
    strokeWeight(8);
    stroke(colors[4]);
    line(x_-50, y_+400 -(y_*0.5), x_+50, y_+400-(y_*0.5));
      //stroke(random([colors[9], colors[10]]));
      //line(x_-5, y_+400 -(y_*0.5), x_+5, y_+400-(y_*0.5));
        stroke(colors[3]);
        line(x_-20, y_+400 -(y_*0.5), x_+20, y_+400-(y_*0.5));
          //stroke(colors[7]);
          //line(x_-1, y_+400 -(y_*0.5), x_+1, y_+400-(y_*0.5));
    
    x_ = x_ - random(-7, 7);
    //y_ = y_ - random(-3,3);
    y_++;
  pop();
  
  if (frameCount%3==0){
    star();
    land();
  } else if (frameCount%49==0){  
    lake(77);
  }
}

function aurora1(input){
  if (!input){
    //https://p5js.org/examples/math-additive-wave.html
    theta += 0.02;
    
    for (let i=0; i<yvalues.length; i++){
      yvalues[i] = 0;
    }
    
    for (let j=0; j<maxwaves; j++){
      let x = theta;
      for (let i=0; i<yvalues.length; i++){
        if (j%2==0) yvalues[i] += sin(x) * amplitude[j];
        else yvalues[i] += cos(x*2) * amplitude[j];
        x += dx[j];
      }
    }
    
    reddish=0;
    bg();
    lake(77);
    for (let x=0; x<yvalues.length; x++){
      limit.push(random([random(0,10),random(10,25),random(25,50)]));
      limit2.push(random([random(0,25),random(25,60)]));
      noFill();
      strokeWeight(8);
      stroke(colors[0]);
      line(100+x*xspacing, 100+yvalues[x]+x/5, 100+x*xspacing, 0);
        strokeWeight(8);
        stroke(colors[8]);
        line(100+x*xspacing, 0, 100+x*xspacing, 100+yvalues[x]+x/5-limit2[x]-50);
          //strokeWeight(6);
          //stroke(colors[1]);
          //line(100+x*xspacing, 25+yvalues[x]+x/5+limit[x], 100+x*xspacing, yvalues[x]+x/5-limit2[x]+25);
            strokeWeight(10);
            stroke(colors[2]);
            line(100+x*xspacing, 100+yvalues[x]+x/5, 100+x*xspacing, 100+yvalues[x]+x/5-limit[x]);
            
      //reflection
        strokeWeight(3);
        stroke(colors[4]);
        line(80+x*xspacing+random(-3,3), 343+yvalues[x]+x/5-x*0.00231, 230+x*xspacing+random(-3,3), 343+yvalues[x]+x/5-x*0.00231);
      strokeWeight(8);
      stroke(colors[4]);
      line(80+x*xspacing+random(-3,3), 333+yvalues[x]+x/5-x*0.00131, 130+x*xspacing+random(-3,3), 333+yvalues[x]+x/5-x*0.00131);
        
    }
    if (frameCount%13==0){
      star("blink");
    }
    land("blink");
  } else if (input==2){
    theta += 0.02;
    
    for (let i=0; i<yvalues.length; i++){
      yvalues[i] = 0;
    }
    
    for (let j=0; j<maxwaves; j++){
      let x = theta;
      for (let i=0; i<yvalues.length; i++){
        if (j%2==0) yvalues[i] += sin(x) * amplitude[j];
        else yvalues[i] += cos(x*2) * amplitude[j];
        x += dx[j];
      }
    }
    
    reddish=0;
    bg();
    lake(77);
    let p_ = 80; 
    
    push();
    scale(2.08);
    translate(130,0);
    for (let x=0; x<yvalues.length; x++){
      limit.push(random([random(0,10),random(10,25),random(25,50)]));
      limit2.push(random([random(0,25),random(25,60)]));
      noFill();
      strokeWeight(8);
      stroke(colors[0]);
      line(100+x*xspacing, 100+yvalues[x]+x/5, 100+x*xspacing, 0);
        strokeWeight(8);
        stroke(colors[8]);
        line(100+x*xspacing, 0, 100+x*xspacing, 100+yvalues[x]+x/5-limit2[x]-50);
     /**/ //strokeWeight(6);
          //stroke(colors[1]);
          //line(100+x*xspacing, 25+yvalues[x]+x/5+limit[x], 100+x*xspacing, yvalues[x]+x/5-limit2[x]+25);
            strokeWeight(10);
            stroke(colors[2]);
            line(100+x*xspacing, 100+yvalues[x]+x/5, 100+x*xspacing, 100+yvalues[x]+x/5-limit[x]);
            
      //reflection
      p_ = 13;
        strokeWeight(3);
        stroke(colors[4]);
        line(80+x*xspacing+random(-3,3), p_+343+yvalues[x]+x/5-x*0.00231, 230+x*xspacing+random(-3,3), p_+343+yvalues[x]+x/5-x*0.00231);
      strokeWeight(8);
      stroke(colors[4]);
      line(80+x*xspacing+random(-3,3), p_*1.5+333+yvalues[x]+x/5-x*0.00131, 130+x*xspacing+random(-3,3), p_*1.5+333+yvalues[x]+x/5-x*0.00131);
    }
    pop();
    if (frameCount%13==0){
      star("blink");
    }
    land("blink");
  } else if (input==3){
    theta += 0.02;
    
    for (let i=0; i<yvalues.length; i++){
      yvalues[i] = 0;
    }
    
    for (let j=0; j<maxwaves; j++){
      let x = theta;
      for (let i=0; i<yvalues.length; i++){
        if (j%2==0) yvalues[i] += sin(x) * amplitude[j];
        else yvalues[i] += cos(x*2) * amplitude[j];
        x += dx[j];
      }
    }
    reddish=0;
    bg();
    lake(77);
    let p_ = 80; 
    
    push();
    //scale(1.8);
    translate(-60,0);
    for (let x=0; x<yvalues.length; x++){
      limit.push(random([random(0,10),random(10,25),random(25,50)]));
      limit2.push(random([random(0,25),random(25,60)]));
      noFill();
      strokeWeight(8);
      stroke(colors[0]);
      line(100+x*xspacing, 250+yvalues[x]+x/5, 100+x*xspacing, 0);
        strokeWeight(8);
        stroke(colors[8]);
        line(100+x*xspacing, 0, 100+x*xspacing, 100+yvalues[x]+x/5-limit2[x]+20);
     /**/ strokeWeight(6);
          stroke(colors[1]);
          line(100+x*xspacing, 170+yvalues[x]+x/5+limit[x], 100+x*xspacing, yvalues[x]+x/5-limit2[x]+20);
            strokeWeight(10);
            stroke(colors[2]);
            line(100+x*xspacing, 250+yvalues[x]+x/5, 100+x*xspacing, 100+yvalues[x]+x/5-limit[x]+50);
            
      //reflection
      p_ = 313;
        strokeWeight(3);
        stroke(colors[4]);
        line(80+x*xspacing+random(-3,3), p_+343+yvalues[x]+x/5-x*0.00231, 230+x*xspacing+random(-3,3), p_+343+yvalues[x]+x/5-x*0.00231);
      strokeWeight(8);
      stroke(colors[4]);
      line(80+x*xspacing+random(-3,3), p_*1.5+333+yvalues[x]+x/5-x*0.00131, 130+x*xspacing+random(-3,3), p_*1.5+333+yvalues[x]+x/5-x*0.00131);
    }
    pop();
    
    if (frameCount%13==0){
      star("blink");
    }
    land("blink");
  }
}

function reset(){
  clear();
  reddish=0;
  bg();
  land_done = 0;
  x_ = 0;
  y_ = 250;
  frameCount=0;
  padding();
}
