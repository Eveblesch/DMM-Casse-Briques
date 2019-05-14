function Missile(x, y,couleur) 
{
	this.x=x;
	this.y=y;
	this.long=10;
	this.larg=30;
	this.couleur=couleur;

	this.afficher_missile=function()
	{
		ctx.beginPath();
		ctx.fillStyle = couleur;
		ctx.fillRect(this.x, this.y, this.long, this.larg);
		ctx.fill();
		ctx.closePath();
	}

	this.monter=function()
	{
       this.y-=6;
       ctx.fillStyle =couleur;
       ctx.fillRect(this.x, this.y, this.long,this.larg);
	}

	this.etat=function()
	{
		return this.type;
	}
	this.coordX=function()
	{
		return this.x;
	}
	this.coordY=function()
	{
		return this.y;
	}
	this.setCoordY=function(newY)
	{
		this.y=newY
	}

}


var tableau_missile=[];
function supprimer_missile(test)
{
	for(i=1;i<tableau_missile.length;i++)
    {
        if(i===test)
        {
        	tableau_missile.splice(test,1);
        }
    }
}


function deplacer_missile()
{
	for(i=1;i<tableau_missile.length;i++)
    {	
    	if(numeroMissile!=2)
    	{
	    	var missile=tableau_missile[i];
	    	var coordY=tableau_missile[i].coordY();
	    	var coordX=tableau_missile[i].coordX();

	    	for(j=1;j<tableau.length;j++)
	    		{
	    			if(coordY<tableau[j].y+30 && (tableau[j].x<coordX && coordX<tableau[j].x+80))
			  		{
			  			supprimer_missile(i);
			  			numeroMissile--;
			            tableau[j].couler(); 
			            enlever_brique(j);
			        }

				}
	    	missile.monter();
	    	missile.afficher_missile();

   		 }
    }
}