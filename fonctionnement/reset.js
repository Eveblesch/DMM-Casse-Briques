
function supprimerCadre()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var muet=0;
var niveau=localStorage.getItem("niveau");
var level=parseInt(niveau);
var depX=10,depY=30,longueur=88,largeur=30, nbre=32;

//Mise en place des niveaux en fonction de la valeur récupérée
if(level==1)
{
	creation_murNiveau1(depX,depY,longueur,largeur,nbre);
}
if(level==2)
{
	creation_murNiveau2(depX,depY,longueur,largeur,nbre);
}
if(level==3)
{
	creation_murNiveau3(depX,depY,longueur,largeur,nbre);
}
 
var v = new Balle(50,300,10,false,1,"pink",8,5);
var p = new Paddle(300,600,80,10,false,"cyan",false);
var vies=3;
afficher_vies(20,430,5,vies);

//TEST BONUS AIMANT
var agrandisssssssement=false;
var bonusAgrandissement = new Bonus(tableau[10].x+35,tableau[10].y+35,"agrandir","green");

//TEST BONUS AIMANT
var aimanteeeer=false;
var bonusAimant = new Bonus(tableau[6].x+35,tableau[6].y+35,"aimant","purple");

//TEST BONUS MISSILE
var missssssile=false;
var bonusMissile = new Bonus(tableau[30].x+35,tableau[30].y+35,"missile","red");

//TEST BONUS MULTIBALL
var multi=false;
var muuulti=false;
var bonusMulti = new Bonus(tableau[1].x+35,tableau[1].y+35,"multi_balle","blue");
var balle1 = new Balle(250,400,10,false,1,"orange",3,3);
var balle2 = new Balle(125,200,10,false,1,"red",4,4);

var affichage_multiple=false;

var score = 0;
var test;
var numeroMissile=1;


/*
	FONCTIONNEMENT DU JEU
	Fonction appelée toutes les 20 ms
	s'occupe de l'affichage de tous les éléments
	s'occupe de l'appel des fonctions pour le fonctionnement

*/

if(vies==3)
{
	v.aimant=true;
	p.aimant=true;
    v.y = 600-p.larg;
    v.dx=0;
    v.dy=0;
    v.x=p.x+40;
}
	
function test()
{
	
	if (vies==0)
	{
		defaite();
		setTimeout(function(){ changerLS(score); window.location.href="ecran_accueil.html"; },2000);
	}

	else
	{
		supprimerCadre();

		//Affichage des éléments 
		if(v.time==2)
		{
			v.y=p.y-v.r;
			p.afficher();
			v.afficher_balle();
			afficher_brique();
			afficher_score(score);
			afficher_vies(20,630,5,vies);
			if(p.arme==true)
			{
				deplacer_missile();
			}

		}
		else
		{
			v.afficher_balle();
			deplacement_balle(v);
			afficher_brique();
			afficher_score(score);

			//Appel des fonctions bonus
			if(aimanteeeer==true)
			{
				deplacement_bonus(bonusAimant);
			}
			if(agrandisssssssement==true)
			{
				deplacement_bonus(bonusAgrandissement);
			}
			if(missssssile==true)
			{
				deplacement_bonus(bonusMissile);
			}
			if(muuulti==true)
			{
				deplacement_bonus(bonusMulti);
				multi==true;
			}
			
			p.afficher();
			afficher_vies(20,630,5,vies);
			test=briques_restantes();

			if(p.arme==true)
			{
				deplacer_missile();
			}

			if(multi==true )
			{
				affichage_multiple=true;
			}
			if(affichage_multiple==true)
			{
				balle1.afficher_balle(balle1);
				balle2.afficher_balle(balle2);
				deplacement_balle2(balle1);
				deplacement_balle3(balle2);
			}

			if(test===0)
			{
				victoire();
				setTimeout(function(){ changerLS(score); window.location.href="ecran_accueil.html"; },2000);
			}
		}
	}
}

function init()
{
 	setInterval(test,20);
}
