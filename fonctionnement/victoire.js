var c = document.getElementById("canvas");
var ctx = c.getContext("2d");


function defaite()
{
    supprimerCadre();
 	  var gameOver = document.createElement("img");
    gameOver.src = "images/game_over.png";
    ctx.drawImage(gameOver, 230, 100);
    if(muet==1)
    {
        son('images/death.wav');
    }

    ctx.fillStyle = "red";
    ctx.font = "40px Georgia";
    ctx.fillText("Score : " + score, 290, 350);


}

function victoire()
{
	supprimerCadre()
 	var vic = document.createElement("img");
  vic.src = "images/gagner.png";
  ctx.drawImage(vic, 180, 40);

  ctx.font = "40px Georgia";
  ctx.fillStyle = "green";
  ctx.fillText("Score : " + score, 290, 350);

  if(muet==1)
  {
      son('images/win.wav');
  }
}
