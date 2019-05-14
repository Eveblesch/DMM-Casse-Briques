function pause() 
{
	var val = confirm("Voulez-vous quitter la partie?");
	if(val == true) 
	{
	  document.location.href="ecran_accueil.html";
	  return true;
	} 
}

function son()
{

	muet++;
    if(muet%2==0)
    {
        muet=0;
    }
}


function refresh()
{
	location.reload();
}

function evenements() 
{
	window.onkeydown=function(evt)
	    {
	    	switch(evt.keyCode)
		    {
		        case 27: //ECHAP
			       	pause();
			        break;

		        case 82: //R                  
		        	refresh();
		     		break;
				//37 barre espace
		        
		    }	    	
	    }
}

evenements();

function son(src){
    var audio = new Audio(src);
    audio.load();
	audio.play()
}