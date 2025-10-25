var socket;
var msg = "";
nMoteurs = 10;
let sliders = [nMoteurs]
let on = true;
let pos = []
let vit = [];
let canvas2;
let barre;
let auto = 0;
let manuel = 0;
let neutre = 0;
let sinus1 = 0;
let sinus2 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvas2 = createGraphics(765, windowHeight, WEBGL);
  socket = new WebSocket('ws://127.0.0.1:8484/mobile');
  barre = new Barre(10,170, 0, 0, 0, 0, 0);
  socket.onmessage = readMessage;

  bModeOn = createButton('ON/OFF');
  bModeOn.position(70, 330);
  bModeOn.mousePressed(function(){
	  console.log(on);
	  if(on){
		sendOn("on");
		on = false;
	  }
	  else{
		  sendOn("off");
      sendOn("raz");
		  on = true;
	  };
    raz()});
  bModeRaz = createButton('RAZ');
  bModeRaz.position(19, 330);

  bModeManuel = createButton('mode manuel');
  bModeManuel.position(19, 270);

  bModeAuto = createButton('mode auto ....');
  bModeAuto.position(19, 300);

  bMotifNeutre = createButton('motif neutre');
  bMotifNeutre.position(159, 270);

  bMotifSinus1 = createButton('motif sinus1');
  bMotifSinus1.position(159, 300);

  bMotifSinus2 = createButton('motif sinus2');
  bMotifSinus2.position(159, 330);

     for (let i = 0;i<nMoteurs;i++){
     bMotifNeutre.mousePressed(function(){
       if(auto == 0){
         Neutre();
         sendMessage("motif= neutre");}
     });
     bMotifSinus1.mousePressed(function(){
       if(auto == 0){
         Sinus1();
         sendMessage("motif= sinus1");}
       });
     bMotifSinus2.mousePressed(function(){
       if(auto == 0){
       Sinus2();
       sendMessage("motif= sinus2");}
     });

     bModeRaz.mousePressed(function(){sendMessage("raz");raz()});
     bModeManuel.mousePressed(function(){sendMessage("mode= manuel");
     auto = 0;
     if (manuel == 0) {
       sendMessage("raz");
       manuel = 1;
       raz();
        }
     });
     bModeAuto.mousePressed(function(){sendMessage("mode= auto"); sendMessage("raz");
     manuel = 0;
     auto = 1;
     for (let i = 0;i<nMoteurs;i++){
       sliders[i].value(0);
        barre.reset();
      }
     });
   }
  for (let i = 0;i<nMoteurs;i++){
	  sliders[i] = createSlider(-127,127,0,1);
	  sliders[i].position(375 + 200*(i%2), 140 + 30*int(i/2));
    sliders[i].style('width', '180px');
    sliders[i].mouseReleased(function(){sendMessage("vmot"+nf(i,3,0)+"="+sliders[i].value());
    if(on == false){
      barre.SlidersBarre()}
    });
  }
}

function draw() {
  background(0);
  canvas2.background(125);
  text("on = " + !on, 73,365);
  for (let i = 0;i<nMoteurs;i++){
	text("vitesse mot " + i + " : "+ sliders[i].value(),460+ 200*(i%2),140+ 30*int(i/2));
  }
  fill(255);
  text(msg, 20, 20);
  tab = msg.split(',');
  if (tab[0] == "POS" && tab[nMoteurs+1] == "FIN") {
    for (let i = 0; i < nMoteurs; i++) {
	  oldPos = pos[i];
    pos[i] = tab[i + 1];
	  vit[i] = pos[i]-oldPos;
    }
  }
  if(tab[0] == 'INIT'){
	  for (let i = 0; i < nMoteurs; i++) {
    pos[i] = 0;
	  vit[i] = 0;
    }
  }
  for (let i = 0; i < nMoteurs; i++) {
    text(i + " : p=" + pos[i] + " , v=" + vit[i], 20 + 170 * (i % 2), 170 + 20 * int(i / 2));
  }

  push();
  textSize(20);
  textStyle(BOLD);
  text("Interface de Commande du mobile", windowWidth/8, 40,);
  text("Choix vitesse des Moteurs", 470, 110);
  text("Vitesse et Position des moteurs", 15, 125);
  pop();
 barre.canvas();
 barre.loop();
}

function readMessage(event) {
  msg = event.data;
}
function sendMessage(msgWs) {
  if(on === false){
  socket.send(msgWs);
  console.log("msg envoy� = " + msgWs);
 }
}

function sendOn(msgWs){
  socket.send(msgWs);
  console.log("msg envoy� = " + msgWs);
}
function raz(){
	for (let i = 0;i<nMoteurs;i++){
		sliders[i].value(0);
    barre.reset();
    neutre = 0;
    sinus1 = 0;
    sinus2 = 0;
    auto = 0;
    manuel = 0;
  }
}
function Neutre(){
  if(on === false){
barre.Neutre();
barre.BarreSlider();
neutre = 1;
sinus1 = 2;
sinus2 = 2;
 }
}

function Sinus1(){
  if(on === false){
  barre.Sinus1();
  barre.BarreSlider();
  neutre = 2;
  sinus1 = 1;
  sinus2 = 2;
 }
}
function Sinus2(){
  if(on === false){
  barre.Sinus2();
  barre.BarreSlider();
  neutre = 2;
  sinus1 = 2;
  sinus2 = 1;
 }
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
