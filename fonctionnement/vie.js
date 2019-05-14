

function vie(x, y, r)
{
	this.x=x;
 	this.y=y;
	this.r=r;

	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
}

var tab_vie=[];

function afficher_vies(x, y, r, nbre)
{
		var X=x;
		var Y=y;
		var R=r;
	if(nbre==0)
	{
		//defaite();
	}
	for(var i=0;i<nbre;i++)
	{
		tab_vie[i]=new vie(X,Y,R);
		X+=20;
	}
}

function perdre_vie(n)
{
	afficher_vies(20,430, 5, n-1);
}
