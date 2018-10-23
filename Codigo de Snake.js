function disableScroll(){  
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function(){ window.scrollTo(x, y) };
}

function enableScroll(){  
    window.onscroll = null;
}

//
var velocidad = 80;
var tamano = 10;
var puntos = 0;
var puntosA = 0;
var puntosAD = 0;
var puntosADM = 0
var puntosAC = 0;

ju1 = prompt("Escriba el nombre del jugador");

function punto() {
	alert(puntosA);
	alert(puntosAD);
	alert(puntosADM);
}

function Pausa() {
	alert("Pausa");
}

class objeto {
	constructor() {
		this.tamano = tamano;
	}
	choque(obj) {
		var difx = Math.abs(this.x - obj.x);
		var dify = Math.abs(this.y - obj.y);

		if(difx >= 0 && difx < tamano && dify >= 0 && dify < tamano) {
			return true;
		} else {
			return false;
		}
	}
}

class Cola extends objeto {
	constructor(x, y) {
		super();
		this.x = x;
		this.y = y;
		this.siguiente = null;
	}
	dibujar(ctx) {
		if (this.siguiente != null) {
			this.siguiente.dibujar(ctx);
		}
		ctx.fillStyle = '#0000FF';
		ctx.fillRect(this.x ,this.y ,this.tamano, this.tamano,);
	}
	setxy(x, y) {
		if (this.siguiente != null) {
			this.siguiente.setxy(this.x, this.y);
		}
		this.x = x;
		this.y = y;
	}
	meter() {
		if (this.siguiente == null) {
			this.siguiente = new Cola(this.x, this.y);
		} else {
			this.siguiente.meter();
		}
	}
	verS() {
		return this.siguiente;
	}
}

class Comida extends objeto {
	constructor() {
		super();
		this.x = this.generar();
		this.y = this.generar();
	}
	generar() {
		var num = (Math.floor(Math.random() * 30))*10;
		return num;
	}
	colocar() {
		this.x = this.generar();
		this.y = this.generar();
	}
	dibujar(ctx) {
		ctx.fillStyle = '#FF0000';
		ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
	}
}

class Info extends objeto {
	constructor() {
		super();
	}
	dibujar(ctx) {
		ctx.fillStyle = 'black';
		ctx.font = "15px Arial";
		ctx.fillText("Tu puntaje: " +puntos, 190, 15);
	}
}

class InfoA extends objeto {
	constructor() {
		super();
	}
	dibujar(ctx) {
		ctx.fillStyle = 'black';
		ctx.font = "15px Arial";
		ctx.fillText("El puntaje mas alto: " +puntosA, 300, 15);
	}
}

class jugador extends objeto {
	constructor() {
		super();
	}
	dibujar(ctx) {
		ctx.fillStyle = 'black';
		ctx.font = "15px Arial";
		ctx.fillText("El jugador es: " +ju1, 10, 15);
	}
}
//Objetos del juego
var cabeza = new Cola(20,20);
var comida = new Comida();
var info = new Info();
var infoa = new InfoA();
var ju = new jugador();
var ejex = true;
var ejey = true;
var dirx = 0;
var diry = 0;
function movimiento() {
 	var nx = cabeza.x+dirx;
	var ny = cabeza.y+diry;
	cabeza.setxy(nx, ny);
}
function control(event) {
	var code = event.keyCode;
	if (ejex) {
		if (code == 38) {
			disableScroll();
			diry = -tamano;
			dirx = 0;
			ejey = true;
			ejex = false;
		}
		if (code == 40) {
			disableScroll();
			diry = tamano;
			dirx = 0;
			ejey = true;
			ejex = false;
		}
	}
	if (ejey) {
		if (code == 37) {
			dirx = -tamano;
			diry = 0;
			ejex = true;
			ejey = false;
		}
		if (code == 39) {
			dirx = tamano;
			diry = 0;
			ejex = true;
			ejey = false;
		}
	}
	}
		
		

function FIN() {
	enableScroll();
	dirx = 0;
	diry = 0;
	ejey = true;
	ejex = true;
	cabeza = new Cola(20,20);
	comida = new Comida();
	alert("Perdiste");
	alert("Esta es tu puntuacion "+puntos);
	if (puntos > puntosA) {
		puntosADM = puntosAD;
		puntosAD = puntosA;
		puntosA = puntos;
	}
	if (puntos > 0) {
		puntos = 0;
	}
}

function chocaP() {
	if (cabeza.x < 0 || cabeza.x > 490 || cabeza.y < 0 || cabeza.y > 290) {
		FIN();
	}
}

function chocaC() {
	var temp = null;
	try {
		temp = cabeza.verS().verS();
	} catch (err) {
		temp = null;
	}
	while (temp != null) {
		if (cabeza.choque(temp)) {
			FIN();
		} else {
			temp = temp.verS();
		}
	}
}

function dibujar() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//se
	cabeza.dibujar(ctx);
	comida.dibujar(ctx);
	info.dibujar(ctx);
	infoa.dibujar(ctx);
	ju.dibujar(ctx);
}

function main() {
	chocaC();
	chocaP();
	dibujar();
	movimiento();
	if (cabeza.choque(comida)) {
		comida.colocar();
		cabeza.meter();
		puntos =  puntos + 5;
		puntosAC =  puntosAC + 5;
	}
}
setInterval("main()", velocidad);