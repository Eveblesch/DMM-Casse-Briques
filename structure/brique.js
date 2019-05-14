function Brique(x, y, long, larg,couleur,touche,porteurBonus,nomBonus,vie,incassable)
{
    this.x=x;
    this.y=y;
    this.long=long;
    this.larg=larg;
    this.couleur=couleur;
    this.touche=touche;
    this.porteurBonus=porteurBonus;
    this.nomBonus=nomBonus;
    this.vie=vie;
    this.incassable=incassable;

	//affichage en fonction de la nature de la brique (incassable ou pas)
  	this.affiche=function()
    {
        if(this.incassable==false)
        {
        	ctx.beginPath();
        	ctx.strokeStyle=this.couleur;
        	ctx.lineWidth="3";
        	ctx.rect(this.x,this.y,this.long,this.larg);
        	ctx.stroke();
        }
        else
        {
            ctx.beginPath();
            ctx.fillStyle=this.couleur;
            ctx.fillRect(this.x,this.y,this.long,this.larg);
            ctx.fill();
            ctx.beginPath();
        }
    }

    this.couler=function()
    {
        this.touche=true;
    }

    this.status=function()
    {
        return this.touche;
    }
}

var tableau=[];

//NIVEAU 1 (briques toutes cassables en une fois)
function creation_murNiveau1(depX,depY,longueur,largeur,nbre)
{

	var X=depX;
	var Y=depY;
	var J=depX;
	var couleur=0;

	//Affichage des briques
    for(var i=1;i<=nbre;i++)
    {
    	if(couleur%2==0)
    	{
        	tableau[i]=new Brique(X,Y,longueur,largeur,"red",false,false,"rien",1,false);
		    	X+=longueur+10;
		    	if((i%8)==0)
	    		{
	    			Y+=depY+largeur/2;
	    			X=10;
	    		}
    			couleur++;
    	}
    	else
    	{
	    		tableau[i]=new Brique(X,Y,longueur,largeur,"blue",false,false,"rien",1,false);
		    	X+=longueur+10;
		    	if((i%8)==0)
	    		{
	    			Y+=depY+largeur/2;
	    			X=10;
	    		}
	    		couleur++;
    	}
    }

	//On associe les bonus à des briques spécifiques
    tableau[6].porteurBonus=true;
    tableau[6].nomBonus="bonusAimant";

    tableau[10].porteurBonus=true;
    tableau[10].nomBonus="bonusAgrandissement";

    tableau[30].porteurBonus=true;
    tableau[30].nomBonus="bonusMissile";

	tableau[1].porteurBonus=true;
    tableau[1].nomBonus="multi_balle";
}

//NIVEAU 2 (briques cassables en plusieurs fois)
function creation_murNiveau2(depX,depY,longueur,largeur,nbre)
{
    var X=depX;
    var Y=depY;
    var J=depX;
    var couleur=0;

    for(var i=1;i<=nbre;i++)
    {
        if(couleur%2==0)
        {
            tableau[i]=new Brique(X,Y,longueur,largeur,"yellow",false,false,"rien",3,false);
            X+=longueur+10;
            if((i%8)==0)
            {
                Y+=depY+largeur/2;
                X=10;
            }
            couleur++;
        }
        else
        {
            tableau[i]=new Brique(X,Y,longueur,largeur,"yellow",false,false,"rien",3,false);
            X+=longueur+10;
            if((i%8)==0)
            {
                Y+=depY+largeur/2;
                X=10;
            }
            couleur++;
        }
    }
    tableau[6].porteurBonus=true;
    tableau[6].nomBonus="bonusAimant";

    tableau[10].porteurBonus=true;
    tableau[10].nomBonus="bonusAgrandissement";

    tableau[26].porteurBonus=true;
    tableau[26].nomBonus="bonusMissile";

    tableau[1].porteurBonus=true;
    tableau[1].nomBonus="multi_balle";
}

//NIVEAU 3 (Certaines briques sont incassables)
function creation_murNiveau3(depX,depY,longueur,largeur,nbre)
{

    var X=depX;
    var Y=depY;
    var J=depX;
    var couleur=0;

    for(var i=1;i<=nbre;i++)
    {
        if(couleur%2==0)
        {
            tableau[i]=new Brique(X,Y,longueur,largeur,"brown",false,false,"rien",3,true);
            X+=longueur+10;
            if((i%8)==0)
            {
                Y+=depY+largeur/2;
                X=10;
            }
            couleur++;
        }
        else
        {
            tableau[i]=new Brique(X,Y,longueur,largeur,"yellow",false,false,"rien",3,false);
            X+=longueur+10;
            if((i%8)==0)
            {
                Y+=depY+largeur/2;
                X=10;
            }
            couleur++;
        }
    }
    tableau[6].porteurBonus=true;
    tableau[6].nomBonus="bonusAimant";

    tableau[10].porteurBonus=true;
    tableau[10].nomBonus="bonusAgrandissement";

    tableau[30].porteurBonus=true;
    tableau[30].nomBonus="bonusMissile";

    tableau[1].porteurBonus=true;
    tableau[1].nomBonus="multi_balle";
}


function afficher_brique()
{
    for(i=1;i<tableau.length;i++)
    {
       if(tableau[i].status()===false)
        {
           tableau[i].affiche();
        }
    }
}

/*
Fonction qui enlève les briques après collision, active les bonus, et gère
les scores en fonction du nombre de vies restantes
*/
function enlever_brique(test)
{
    for(i=1;i<tableau.length;i++)
    {
				//On gère la brique qui contient le bonus aimant que l'on active
        if(i===test && tableau[i].porteurBonus==true && tableau[i].nomBonus=="bonusAimant")
        {
            aimanteeeer=true;
           tableau.splice(test,1);
            if(vies==3)
                score+=100;
            if(vies==2)
                score+=70;
            if(vies==1)
                score+=25;
        }

				//On gère la brique qui contient le bonus d'agrandissement du paddle que l'on active
        else if(i===test && tableau[i].porteurBonus==true && tableau[i].nomBonus=="bonusAgrandissement")
        {
            agrandisssssssement=true;
           	tableau.splice(test,1);
            if(vies==3)
                score+=100;
            if(vies==2)
                score+=70;
            if(vies==1)
                score+=25;
        }

				//On gère la brique qui contient le bonus des missiles que l'on active
        else if(i===test && tableau[i].porteurBonus==true && tableau[i].nomBonus=="bonusMissile")
        {
            missssssile=true;
           tableau.splice(test,1);
            if(vies==3)
                score+=100;
            if(vies==2)
                score+=70;
            if(vies==1)
                score+=25;
        }

				//On gère la brique qui contient le bonus des balles multiples que l'on active
		else if(i===test && tableau[i].porteurBonus==true && tableau[i].nomBonus=="multi_balle")
        {
            muuulti=true;
           tableau.splice(test,1);
            if(vies==3)
                score+=100;
            if(vies==2)
                score+=70;
            if(vies==1)
                score+=25;
        }
				//Si pas de bonus, simple suppression et incrémentation du score
        else if(i===test)
        {
           tableau.splice(test,1);
            if(vies==3)
                score+=100;
            if(vies==2)
                score+=70;
            if(vies==1)
                score+=25;
        }
    }
}


/*
	Fonction qui permet de compter le nombre de briques restantes.
	Elle est utilisée pour annoncer la fin du jeu quand il reste 0 brique.
*/
function briques_restantes()
{
    var compt=0;
    for(i=1;i<tableau.length;i++)
    {
        if(tableau[i].incassable==false)
        {
            compt++;
        }
    }
    return compt;
}
