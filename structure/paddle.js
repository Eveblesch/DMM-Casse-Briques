var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function Paddle(x, y, long, larg,arme,couleurPaddle,aimant)
{
    this.x=x;
    this.y=y;
    this.long=long;
    this.larg=larg;
    this.arme=arme;
    this.couleurPaddle=couleurPaddle;
    this.aimant=aimant;
    this.afficher=function()
    {
        //Dans le cas où on a le bonus missile, modificaton du paddle en rajoutant des canons
        if(p.arme==true)
        {

            if(p.long==80)
            {
                ctx.beginPath();
                ctx.fillStyle =this.couleurPaddle;
                ctx.fillRect(this.x, this.y, this.long, this.larg);
                ctx.fillRect(this.x+64, this.y-10, 10, 10);
                ctx.fillRect(this.x+6, this.y-10, 10, 10);
                ctx.fill();
                ctx.closePath();
            }
            //Si on a en même temps le bonus d'agrandissement, on décale les petits canons
            else
            {
               ctx.beginPath();
                ctx.fillStyle =this.couleurPaddle;
                ctx.fillRect(this.x, this.y, this.long, this.larg);
                ctx.fillRect(this.x+114, this.y-10, 10, 10);
                ctx.fillRect(this.x+6, this.y-10, 10, 10);
                ctx.fill();
                ctx.closePath();
            }

        }
        else
        {
            ctx.beginPath();
            ctx.fillStyle =this.couleurPaddle;
            ctx.fillRect(this.x, this.y, this.long, this.larg);
            ctx.fill();
            ctx.closePath();
        }

    }

    this.deplacer=function(arg)
    {
        switch(arg)
        {
            case "gauche":
                if(this.x>0)
                {
                   ctx.clearRect(this.x,this.y,this.long,this.larg);
                   this.x-=30;
                   if(v.time==2)
                   {
                        v.x-=30;
                   }
                   ctx.fillStyle =this.couleurPaddle;
                   ctx.fillRect(this.x, this.y, this.long, this.larg);

              }
              break;

            case "droite":
                if(this.x<720)
                {
                    ctx.clearRect(this.x,this.y,this.long,this.larg);
                    this.x+=30;
                    if(v.time==2)
                    {
                        v.x+=30;
                    }
                    ctx.fillStyle =this.couleurPaddle;
                    ctx.fillRect(this.x, this.y, this.long, this.larg);
                }
                break;

            default :
                break;

        }
    }

    //Preparation des bonus qui affectent le paddle
    this.aggrandissement=function()
    {
        this.long+=50;
    }

    this.reinitialisation=function()
    {
        this.long-=50;
    }

    this.armer=function()
    {
        this.arme=true;
    }

    this.unarmer=function()
    {
        this.arme=false;
    }
    this.setcouleur=function(newCouleur)
    {
        this.couleurPaddle=newCouleur;
    }
}

function afficher_paddle()
{
    p.afficher();
}

function estdans_paddle(a,b)
{
    if(b==p.y && (a>p.x && a<(p.x+p.long+10)))
    {
        return true;
    }
    else
    {
        return false;
    }
}

/*
  Fonction qui gère les touches liées à des événements
*/
document.onkeydown=function(evt)
{
    switch(evt.keyCode)
    {
        //Deplacement du paddle
        case 37:
        p.deplacer("gauche");
        break;

        case 39:
        p.deplacer("droite");
        break;

        //MISSILE
        case 77:
            if(p.arme==true)
            {
                var couleur="";
                var multi_color=Math.floor(Math.random()*Math.floor(7));
                switch(multi_color){
                    case 1:
                        couleur="blue";
                        break;
                    case 2:
                        couleur="pink";
                        break;
                    case 3:
                        couleur="green";
                        break;
                    case 4:
                        couleur="purple";
                        break;
                    case 5:
                        couleur="cyan";
                        break;
                    case 6:
                        couleur="red";
                        break;
                    default:
                        couleur="orange";
                        break;
                }

                var missileNew;
                var missileNew2;

                //On gère le point de depart des missiles en fonction de la taille du paddle
                if(p.long==130)
                {
                    missileNew = new Missile(p.x+80+(p.long/2)-30,p.y-30-10,couleur);
                    missileNew2 = new Missile(p.x-30+(p.long/2)-30,p.y-30-10,couleur);
                }
                else
                {
                    missileNew = new Missile(p.x+30+(p.long/2)-5,p.y-30-10,couleur);
                    missileNew2 = new Missile(p.x-30+(p.long/2)-5,p.y-30-10,couleur);
                }

                tableau_missile[numeroMissile]=missileNew;
                numeroMissile++;

                tableau_missile[numeroMissile]=missileNew2;
                numeroMissile++;

            }
            break;

        //TOUCHE ESPACE POUR RENVOYER LA BALLE
        case 32:
          if(p.aimant==true)
          {
            v.aimant=false;
            v.time=1;
            v.dy = -8;
            v.dx = -4 
            p.aimant=false;
          }
          break;

        //TOUCHE V POUR LE VOLUME
        case 86:
            muet++;
            if(muet%2==0)
            {
                muet=0;
            }
            break;

        default :
            break;
    }
}
