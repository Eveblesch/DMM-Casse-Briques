var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function Balle(x, y, r,aimant,time,couleur,dx,dy)
{
	this.x=x;
  	this.y=y;
	this.r=r;
	this.aimant=aimant;
	this.time=1;
	this.couleur=couleur;
	this.dx=dx;
	this.dy=dy;

	this.afficher_balle=function()
	{
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.fillStyle = this.couleur;
		ctx.fill();
		ctx.closePath();
	}

	//Permet à la balle de rebondir sur les bords du jeu
	this.casse_limite=function(long, larg)
	{
		if((this.x - (this.r / 2) <= 0) || (this.x + (this.r / 2) >= long))
		{
			this.balle.dx= - this.dx;
		}
		if(this.y - (this.r / 2) <= 0)
		{
			this.balle.dy= - this.dy;
		}
	}

	this.aimanter=function()
	{
		this.aimant=true;
	}

	this.enlever_aimant=function()
	{
		this.aimant=false;
	}
}

//valeurs pour l'angle de rebond
//var dx=5;
//var dy=5;

function deplacement_balle(balle)
{
	if(balle.aimant==false || (estdans_paddle(balle.x+balle.r,balle.y+balle.r)==false && balle.aimant==true))
	{
	  balle.x+=balle.dx;
	  balle.y+=balle.dy;
	}
	//On gère le rebond sur les bords GAUCHE et DROIT
	if(balle.x + balle.dx> canvas.width-balle.r || balle.x + balle.dx< balle.r)
  	  balle.dx= -balle.dx;


/*On gère le bord en BAS :
	Si la balle depasse ce bord, la balle est ré-envoyé dans le cadre du jeu et on perd une vie
*/
	if(balle.y + balle.dy> canvas.height-balle.r)
	{	
		balle.aimant=true;
		p.aimant=true;
	    balle.y = 600-p.larg;
	    balle.dx=0;
	    balle.dy=0;
	    balle.x=p.x+40;
	    vies=vies-1;
	    if(muet==1)
    	{
	    	son('images/relance.wav');
		}
	}

	//On gère le bord du HAUT
	if(balle.y + balle.dy< balle.r)
	    balle.dy= -balle.dy;
/*
	COLLISIONZ AVEC LE PADDLE
	Si la balle touche le paddle est qu'on a le bonus aimant (balle.aimant===true)
	alors on fige la balle pendant 3 secondes
	Aussi non on la renvoie avec l'angle donné
*/
	if(estdans_paddle(balle.x+balle.r,balle.y+balle.r)==true)
	{
		console.log("dx : "+balle.dx+" dy : "+balle.dy);
		var intervalle=balle.x-p.x;
		console.log(intervalle);

		if((intervalle>0 && intervalle<=20) && (balle.dx<0))
		{
			balle.dx=-10;
			balle.dy=2;
			balle.dy=-balle.dy;
		}
		if((intervalle>20 && intervalle<=40) && (balle.dx<0))
		{
			balle.dx=-8;
			balle.dy=4;
			balle.dy=-balle.dy;
		}
		if((intervalle>40 && intervalle<=60) && (balle.dx<0))
		{
			balle.dx=-6;
			balle.dy=6;
			balle.dy=-balle.dy;
		}
		if((intervalle>60 && intervalle<=80) && (balle.dx<0))
		{
			balle.dx=-4;
			balle.dy=8;
			balle.dy=-balle.dy;
		}

		if((intervalle>0 && intervalle<=20) && (balle.dx>0))
		{
			balle.dx=4;
			balle.dy=8;
			balle.dy=-balle.dy;
		}
		if((intervalle>20 && intervalle<=40) && (balle.dx>0))
		{
			balle.dx=6;
			balle.dy=6;
			balle.dy=-balle.dy;
		}
		if((intervalle>40 && intervalle<=60) && (balle.dx>0))
		{
			balle.dx=8;
			balle.dy=4;
			balle.dy=-balle.dy;
		}
		if((intervalle>60 && intervalle<=80) && (balle.dx>0))
		{
			balle.dx=10;
			balle.dy=2;
			balle.dy=-balle.dy;
		}


		if(balle.aimant===true)
		{
			p.aimant=true;
			balle.time=2;
			if(p.aimant!=true)
			{
				setTimeout(function(){
					balle.aimant=false;
					balle.time=1;
					balle.dy= -balle.dy;
					
				}, 3000);
			}

		}
		else
		{
			if(muet==1)
			{
				son('images/touche_paddle.wav');
			}
		}
	}

	//COLLISIONS AVEC LES BRIQUES
	for(i=1;i<tableau.length;i++)
    {
        if((balle.x>tableau[i].x) && (balle.x<(tableau[i].x+tableau[i].long)) && (balle.y>tableau[i].y-10) && (balle.y<(tableau[i].y+tableau[i].larg+10)))
	  		{
	  			if(muet==1)
	  			{
	  				son('images/touche.wav');
	  			}

						/*On gère les briques cassables, chaque brique a un nombre de vies, c'est-à-dire le nombre de coups
							qu'il faut pour la détruire. Quand une brique est touchée on lui enlève une vie.
							Si elle n'a plus de vie, alors on la supprime.
						*/
	  		   if(tableau[i].incassable==false)
	  		   {
		  		   tableau[i].vie-=1;
		  		   if(tableau[i].vie==2)
		           {
		           		tableau[i].couleur="orange";
		           }
		  		   if(tableau[i].vie==1)
		           {
		           		tableau[i].couleur="red";
		           }
		           balle.dy= -balle.dy;
		           if(tableau[i].vie==0)
		           {
		           	enlever_brique(i);
		           }
	         }
           else
           {
           		balle.dy= -balle.dy;
           }
	      }
    }
}
var dx2=5;
var dy2=-5;

function deplacement_balle2(balle2)
{
	if(balle2.aimant==false || (estdans_paddle(balle2.x+balle2.r,balle2.y+balle2.r)==false && balle2.aimant==true))
	{
	  balle2.x+=dx2;
	  balle2.y+=dy2;
	}
	//On gère le rebond sur les bords GAUCHE et DROIT
	if(balle2.x + dx2 > canvas.width-balle2.r || balle2.x + dx2 < balle2.r)
  	  dx2 = -dx2;


/*
  On gère le bord en BAS :
  Si la balle depasse ce bord, la balle est ré-envoyé dans le cadre du jeu et on perd une vie
*/
	if(balle2.y + dy2 > canvas.height-balle2.r)
	{
	 	
	    if(muet==1)
    	{
	    	son('images/relance.wav');
			}
	}

	//On gère le bord du HAUT
	if(balle2.y + dy2 < balle2.r)
	    dy2 = -dy2;
/*
COLLISION AVEC LE PADDLE
	Si la balle touche le paddle est qu'on a le bonus aimant (balle.aimant===true)
	alors on fige la balle pendant 3 secondes
	Aussi non on la renvoie avec l'angle donné
*/
	if(estdans_paddle(balle2.x+balle2.r,balle2.y+balle2.r)==true)
	{
		dy2 = -dy2;
		if(muet==1)
		{
			son('images/touche_paddle.wav');
		}
	}

	//COLLISIONS AVEC LES BRIQUES
	for(i=1;i<tableau.length;i++)
    {
       //if((y+10)==tableau[i].y && (x>tableau[i].x && x<(tableau[i].x+tableau[i].long+10)))
        if((balle2.x>tableau[i].x) && (balle2.x<(tableau[i].x+tableau[i].long)) && (balle2.y>tableau[i].y-10) && (balle2.y<(tableau[i].y+tableau[i].larg+10)))
  		{
  			if(muet==1)
  			{
  				son('images/touche.wav');
  			}

  		   if(tableau[i].incassable==false)
  		   {
	  		   tableau[i].vie-=1;
	  		   if(tableau[i].vie==2)
	           {
	           		tableau[i].couleur="orange";
	           }
	  		   if(tableau[i].vie==1)
	           {
	           		tableau[i].couleur="red";
	           }
	           //tableau[i].couler();
	           dy2 = -dy2;
	           if(tableau[i].vie==0)
	           {
	           	enlever_brique(i);
	           }
           }
           else
           {
           		dy2 = -dy2;
           }
        }
    }
}

var dx3=5;
var dy3=-5;
function deplacement_balle3(balle3)
{
	if(balle3.aimant==false || (estdans_paddle(balle3.x+balle3.r,balle3.y+balle3.r)==false && balle3.aimant==true))
	{
	  balle3.x+=dx3;
	  balle3.y+=dy3;
	}
	//On gère le rebond sur les bords GAUCHE et DROIT
	if(balle3.x + dx3 > canvas.width-balle3.r || balle3.x + dx3 < balle3.r)
  	  dx3 = -dx3;


/*On gère le bord en BAS :
	Si la balle depasse ce bord, la balle est ré-envoyé dans le cadre du jeu et on perd une vie
*/
	if(balle3.y + dy3 > canvas.height-balle3.r)
	{
	    if(muet==1)
    	{
	    	son('images/relance.wav');
		}
	}

	//On gère le bord du HAUT
	if(balle3.y + dy3 < balle3.r)
	    dy3 = -dy3;
/*
COLLISION AVEC
	Si la balle touche le paddle est qu'on a le bonus aimant (balle.aimant===true)
	alors on fige la balle pendant 3 secondes
	Aussi non on la renvoie avec l'angle donné
*/
	if(estdans_paddle(balle3.x+balle3.r,balle3.y+balle3.r)==true)
	{
		dy3 = -dy3;
		if(muet==1)
		{
			son('images/touche_paddle.wav');
		}
	}

	//COLLISIONS AVEC LES BRIQUES
	for(i=1;i<tableau.length;i++)
    {
       //if((y+10)==tableau[i].y && (x>tableau[i].x && x<(tableau[i].x+tableau[i].long+10)))
        if((balle3.x>tableau[i].x) && (balle3.x<(tableau[i].x+tableau[i].long)) && (balle3.y>tableau[i].y-10) && (balle3.y<(tableau[i].y+tableau[i].larg+10)))
  		{
  			if(muet==1)
  			{
  				son('images/touche.wav');
  			}

  		   if(tableau[i].incassable==false)
  		   {
	  		   tableau[i].vie-=1;
	  		   if(tableau[i].vie==2)
	           {
	           		tableau[i].couleur="orange";
	           }
	  		   if(tableau[i].vie==1)
	           {
	           		tableau[i].couleur="red";
	           }
	           //tableau[i].couler();
	           dy3 = -dy3;
	           if(tableau[i].vie==0)
	           {
	           	enlever_brique(i);
	           }
           }
           else
           {
           		dy3 = -dy3;
           }
        }
    }
}


function afficher_score(score)
{
	ctx.font = "20px Georgia";
  	ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 680, 640);

}
