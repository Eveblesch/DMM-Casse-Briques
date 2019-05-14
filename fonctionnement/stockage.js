/*Fonction qui permet d'ajouter dans le localstorage
le pseudo du joueur qui joue actuellement*/
function loadPseudo()
{
	var pseudo_actuel = document.getElementById("champ_pseudo").value;
	var joueur = { pseudo : pseudo_actuel, score : 0 };
	localStorage.setItem('joueur_actuel', JSON.stringify(joueur));
}
/*Recupérer les divers utilisateurs/scores du localStorage
pour pouvoir faire un tableau de score*/
function printScore()
{
	var longueur = localStorage.length-2;
	var texte= "";
	if(longueur>5)
	{
		longueur=5;
	}
	for(var i=1;i<=longueur;i++)
	{
    	var pseudo = localStorage.getItem("top"+i);
		var objJson = JSON.parse(pseudo);
		texte ="Top "+i+ ": "+objJson.pseudo+ " avec " + objJson.score + " points";
		var nouveau_li= document.createElement('li');
		nouveau_li.innerHTML=texte;

		document.getElementById("score").appendChild(nouveau_li);
	}
}
/* A la fin d'une partie, il faut modifier le tableau des scores
afin de placer l'utilisateur qui vient de jouer dans le tableau de score
selon le score obtenu*/
function changerLS(score2)
{
	var pasDansScore=0;
	var joueur_ingame=localStorage.getItem("joueur_actuel");
	var objJson2 = JSON.parse(joueur_ingame);
	var longueur = localStorage.length-2;

	if(longueur==0)
	{
		var joueur2 = { pseudo : objJson2.pseudo, score : score2 };
		localStorage.setItem("top1",  JSON.stringify(joueur2));
		pasDansScore=1;
	}

	var i=1;
	while(i<=longueur)
	{
		var pseudo2 = localStorage.getItem("top"+i);
		var objJson3 = JSON.parse(pseudo2);

		if(objJson3.score<score2)
		{
			var compt=i+1;
			var a = localStorage.getItem("top"+i);
			var aOBJ = JSON.parse(a);
			var joueurA = { pseudo : aOBJ.pseudo, score : aOBJ.score};
			localStorage.setItem("top"+compt,  JSON.stringify(joueurA));

			var compt2=i+2;

			var joueurACTUEL = { pseudo : objJson2.pseudo, score : score2 };
			localStorage.setItem("top"+i,  JSON.stringify(joueurACTUEL));
			pasDansScore=1;
			longueur=1;
			break;
		}
		i++;
	}
	if(pasDansScore==0)
	{
		var user = { pseudo : objJson2.pseudo, score : score2 };
		localStorage.setItem("top"+i,  JSON.stringify(user));
	}
}

