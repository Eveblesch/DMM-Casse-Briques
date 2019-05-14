function Bonus(x, y,type,couleur) 
{
	this.x=x;
	this.y=y;
	this.long=35;
	this.larg=35;
	this.type=type;
	this.couleur=couleur;

	this.afficher_bonus=function()
	{
		ctx.beginPath();
		ctx.fillStyle =this.couleur;
		ctx.fillRect(this.x, this.y, this.long, this.larg);
		ctx.fill();
		ctx.closePath();
	}

	this.tomber=function()
	{
       this.y+=3;
       ctx.fillStyle =this.couleur;
       ctx.fillRect(this.x, this.y, this.long,this.larg);
	}

	this.etat=function()
	{
		return this.type;
	}

}

function deplacement_bonus(bonus)
{

	if(estdans_paddle(bonus.x+15,bonus.y+25)==true)
	{
		if(bonus.etat()=="agrandir")
		{
			p.aggrandissement();
			setTimeout(function(){ p.reinitialisation(); }, 13000);
			ctx.clearRect(bonus.x,bonus.y,bonus.long,bonus.larg);
			bonus.x=1000;
			bonus.y=1000;
			if(muet==1)
			{
				son("images/power_up.wav");
			}
		}

		if(bonus.etat()==="aimant")
		{
			v.aimanter();
			ctx.clearRect(bonus.x,bonus.y,bonus.long,bonus.larg);
			bonus.x=1000;
			bonus.y=1000;
			if(muet==1)
			{
				son("images/power_up.wav");
			}
		}

		if(bonus.etat()==="missile")
		{
			console.log(bonus.etat());
			p.armer();
			p.setcouleur("red");
			setTimeout(function(){ p.unarmer();p.setcouleur("cyan"); }, 10000);
			ctx.clearRect(bonus.x,bonus.y,bonus.long,bonus.larg);
			bonus.x=1000;
			bonus.y=1000;
			if(muet==1)
			{
				son("images/power_up.wav");
			}
		}

		if(bonus.etat()==="multi_balle")
		{
			multi=true;
			ctx.clearRect(bonus.x,bonus.y,bonus.long,bonus.larg);
			bonus.x=1000;
			bonus.y=1000;
		}
	}
	else if(bonus.y+bonus.long>650)
	{
		ctx.clearRect(bonus.x,bonus.y,bonus.long,bonus.larg);
	}
	else
	{
		bonus.tomber();
	}
}
