let canvas = document.querySelector('canvas');
//Pour prendre toute la page
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//Variable c --> tjr pour le contexte
let c = canvas.getContext('2d');

var maxRadius = 40;
var minRadius = 5;
var bgColor = ["#E6F2EF" , "#16262C" , "#4D6266" , "#BEDADC" , "#8B1616"];
var mouse = {
	x: undefined,
	y: undefined
};

//EVENT
window.addEventListener('mousemove', 
	function (event) {
		mouse.x = event.x;
		mouse.y = event.y;
		//--> on récupère les donnée de l'event.
});

window.addEventListener('resize',function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//A chaque refresh, on reprend toute la fenêtre + on envoit la fonction init qui crée les cercles
	init();
});
//********************************************************


//GENERATION

//On va générer plusieurs cercles --> on crée objet
function Circle(x,y,dx,dy,radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius; //pour ne pas revenir à Minradius du dessus après le hover
	this.color = bgColor[Math.floor(Math.random()*bgColor.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0, Math.PI*2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {
		//pour boncer sur les murs
		if (this.x + this.radius > innerWidth || this.x-this.radius < 0) {
		this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y-this.radius < 0) {
		this.dy = -this.dy;
		}
		this.x+=this.dx;
		this.y+=this.dy;

		//interactivité avec la souris
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius < maxRadius ) {
			this.radius += 1;
		} else if (this.radius > this.minRadius) { //2px = taille minimum
			this.radius -= 1 ;
		};

		this.draw(); // --> Pour ajouter les conditions de bounce aux cercles générés.
	}
}

//On vient de dire comment générer les cercles et ce qu'ils vont faire, mtnt on doit les placer
//dans un tableau pour les contrôler.
var circleArray = [ ];
//Array dans fonction init comme ça quand on resize, on réoccupe tout l'espace dispo au moment du refresh.
function init() {
	circleArray = [];
	//sinon ça lague à mort
	for(i=0; i<1000; i++) {
		//move one circle
		let radius = Math.random()*4 + 1;
		let x= Math.random()* (innerWidth - radius*2) + radius;
		let y =Math.random()* (innerHeight - radius*2) + radius; // + radius pour ne pas être généré à moins de la valeur du rayon
		//--> Les radius sont utilisés pour ne pas générer les cercles en dehors des limites du canvas.
		let dx=(Math.random() - 0.5); //velocity
		let dy=(Math.random() - 0.5);
		//rajouter chaque cercle dans l'array
		circleArray.push(new Circle(x,y,dx,dy,radius));
	}
}
//********************************************************


//ANIMATION
function animate() {
	requestAnimationFrame(animate);
//request crée une loop pour nous
//qui fait appel à la fonction "animate" à chaque itération.
	c.clearRect(0,0,innerWidth,innerHeight);
//efface ce qu'il y a dans le canvas à chaque nouvel appel de fonction

//animer tous les cercles
for (i=0; i<circleArray.length ; i++) {
	circleArray[i].update();
}
}
//********************************************************

//Appel des fonctions.
init();
animate();



