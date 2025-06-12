let dino;

let gravidade = 1;

let forcaDoPulo = 15;

let chao = 300;

let obstaculos = [];

let nuvens = [];

let pontos = 0;

let gameOver = false;

function setup() {
  createCanvas(800, 400);

  dino = new Dino();

  obstaculos.push(new Obstaculo());

  textSize(24);
}

function draw() {
  // Céu azul

  background("#87CEEB");

  // Desenha as nuvens

  for (let nuvem of nuvens) {
    nuvem.update();

    nuvem.mostrar();
  }

  // Grama

  fill("#4CAF50");

  noStroke();

  rect(0, chao, width, height - chao);

  // Linha do chão

  stroke(0);

  line(0, chao, width, chao);

  if (!gameOver) {
    dino.update();

    dino.mostrar();

    for (let i = obstaculos.length - 1; i >= 0; i--) {
      obstaculos[i].update();

      obstaculos[i].mostrar();

      if (dino.bateu(obstaculos[i])) {
        gameOver = true;
      }

      if (obstaculos[i].saiuDaTela()) {
        obstaculos.splice(i, 1);

        pontos++;
      }
    }

    if (frameCount % 90 === 0) {
      obstaculos.push(new Obstaculo());
    }

    fill(0);

    text("Pontos: " + pontos, 10, 30);
  } else {
    fill("red");

    textAlign(CENTER);

    text("FIM DE JOGO", width / 2, height / 2);

    text("Aperte R para recomeçar", width / 2, height / 2 + 40);
  }
}

function keyPressed() {
  if (key === " " && dino.y === chao) {
    dino.pular();
  }

  if (key === "r" || key === "R") {
    dino = new Dino();

    obstaculos = [];

    pontos = 0;

    gameOver = false;
  }
}

class Dino {
  constructor() {
    this.x = 50;

    this.y = chao;

    this.vy = 0;
  }

  pular() {
    this.vy = -forcaDoPulo;
  }

  update() {
    this.y += this.vy;

    this.vy += gravidade;

    if (this.y > chao) {
      this.y = chao;

      this.vy = 0;
    }
  }

  mostrar() {
    textSize(32);

    text("🌱", this.x, this.y - 20); // Árvore
  }

  bateu(obs) {
    return (
      this.x + 30 > obs.x &&
      this.x < obs.x + obs.largura &&
      this.y > chao - obs.altura
    );
  }
}

class Obstaculo {
  constructor() {
    this.x = width;

    this.largura = random(20, 30);

    this.altura = random(40, 60);

    this.vel = 6;
  }

  update() {
    this.x -= this.vel;
  }

  mostrar() {
    fill("#FF5722"); // Cor de fogo

    rect(this.x, chao - this.altura, this.largura, this.altura);
  }

  saiuDaTela() {
    return this.x + this.largura < 0;
  }
}

class Nuvem {
  constructor(x, y) {
    this.x = x;

    this.y = y;

    this.vel = 1; // velocidade lenta para nuvem
  }

  update() {
    this.x -= this.vel;

    if (this.x < -100) {
      this.x = width + random(50, 200);

      this.y = random(50, 150);
    }
  }

  mostrar() {
    noStroke();

    fill(255, 255, 255, 200);

    ellipse(this.x, this.y, 60, 40);

    ellipse(this.x + 20, this.y - 10, 50, 30);

    ellipse(this.x + 40, this.y, 60, 40);
  }
}
