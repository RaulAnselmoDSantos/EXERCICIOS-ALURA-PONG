//Especificações da Bolinha
let xBolinha = 200; 
let yBolinha = 250; 
let diametro = 17; 
let raio = diametro/2; 

//Atributos da Bolinha
let velocidadexBolinha = 1;
let velocidadeyBolinha = 1; 

//Atributos das Raquetes "R1 e R2"
//R1
let XR1cordenada = 10; 
let YR1cordenada = 230; 

//R2
let XR2cordenada = 480; 
let YR2cordenada = 160;
let VelocidadeYdoOponente; 


//Shape Raquetes
let comprimento = 10; 
let altura = 70; 

//colisão
let colidiu = false; 

//Placar De Pontos
let meusPontos = 0;
let pontoOponente = 0;

//Efeitos Sonoros
let ponto; 
let raquetada; 
let trilha;

//PreLoad
function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//Fundo
function setup() {
  createCanvas(500, 500);
  trilha.loop();
}

//Rodando
function draw() {
  background(0);

  mostrarBolinha(); 
  velocidadeBolinha();
  verifColisao();
  
  //movimentoDaRaquete(); //ativa movimentação das raquetes 
  movimentoDaRaquete(10); 
  //movimentoAutomaticoYR2();
  //movimentoAutomaticoYR1();
  raquetes(XR1cordenada, YR1cordenada);
  raquetes(XR2cordenada, YR2cordenada)
  colisaoRaquete(XR1cordenada,YR1cordenada);
  colisaoRaquete(XR2cordenada,YR2cordenada);
  incluiPlacar();
}

//Bolinha
function mostrarBolinha(){
  circle (xBolinha, yBolinha, diametro);
}

//Raquetes
function raquetes(x, y){
  rect (x, y, comprimento, altura);
}

//Movimento das Raquetes (BOTÂO)
function movimentoDaRaquete(x){
  //**********R1
  if (keyIsDown(87)) {
   YR1cordenada -= x;
  }  
  if (keyIsDown(83)) {
   YR1cordenada += x;
  } 
  //**********R2 PLAYER 2
 if (keyIsDown(UP_ARROW)) {
    YR2cordenada -= x;
  }  
  if (keyIsDown(DOWN_ARROW)) {
    YR2cordenada += x;
  }
}

//Movimento Autormatico da Raquete 2
function movimentoAutomaticoYR2(){
  VelocidadeYdoOponente = yBolinha - YR2cordenada - comprimento /2 -30;
  YR2cordenada += VelocidadeYdoOponente;
}
function movimentoAutomaticoYR1(){
  VelocidadeYdoOponente = yBolinha - YR1cordenada - comprimento /2 -30;
  YR1cordenada += VelocidadeYdoOponente;
}

//Velocidade Bolinha
function velocidadeBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha; 
}

//Colisão Paredes
function verifColisao(){
  if (xBolinha + raio > width || xBolinha - raio < 1){
    velocidadexBolinha *= -1; 
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 1){
    velocidadeyBolinha *= -1; 
  }
}

//Colisão Raquetes
function colisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, comprimento, altura, xBolinha, yBolinha, diametro);
    if (colidiu){
       velocidadexBolinha *= -1;
      raquetada.play();
    }
  } 

//placar e contador do placar
function incluiPlacar(){
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect (206, 10, 88, 20);
  fill(255);
  text(meusPontos, 225, 26);
  fill(255);
  text(pontoOponente, 275, 26);
  fill(255);
  text("-", 250, 26);
  if(xBolinha > XR2cordenada){
    meusPontos += 1; 
    ponto.play();
    xBolinha= 250;
    yBolinha = 250;
  }
   if(xBolinha < XR1cordenada){
    pontoOponente += 1;
    ponto.play();
    xBolinha= 250;
    yBolinha = 250;
  }
  if (meusPontos == 6){
    meusPontos = 0;
    pontoOponente = 0;
  }
  if (pontoOponente == 6){
    pontoOponente = 0;
    meusPontos = 0;
  }
}