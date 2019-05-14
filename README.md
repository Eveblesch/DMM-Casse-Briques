# PROJET DE DEVELOPPEMENT MULTIMEDIA			UNIVERSITE DE STRASBOURG - L2 CMI
**BLESCH Eve & CERDAN Baptiste-Mai 2019**  

- *Remarque 1* : Utiliser de préférence **Firefox** comme moteur de recherche.  
- *Remarque 2* : Mettre le jeu en **plein écran.**

## FONCTIONNEMENT DU CASSE-BRIQUES

### Pour démarrer :
1. Lancer le fichier "ecran_accueil.html".
	Rentrer son pseudo.
	C'est sur cette page que sont affichés les scores.
2. Choisir le niveau de difficulté
3. Jouer !

### Instructions:

Des icônes permettent d'enclencher certaines fonctionnalités mais des touches clavier aussi.

- <-	  : déplacer le paddle vers la gauche
-	->	  : déplacer le paddle vers la droite
-	ECHAP : mettre le jeu en pause
-	R     : actualiser la page
-	V	  : activer/desactiver le son
-	M 	  : tirer des missiles (quand on possède le bonus)
-	ESPACE: renvoyer la balle lorsqu'elle est émantée ou pour la relancer

**4 bonus** sont implémentés et sont représentés par des cubes qui tombent de certaines briques.
Chaque bonus a une couleur différente:
- <span style="color:green"> VERT </span>   : augmentation de la taille du paddle
-	<span style="color:purple"> VIOLET </span> : balle aimantée
-	<span style="color:red"> RED </span> : missiles
-	<span style="color:blue"> BLEU </span> : multi-balles


### Comment ça marche ?

Le joueur a 3 vies. Il en perd une a chaque fois que la balle dépasse la partie basse du jeu.
Quand la balle est perdue, elle revient directement sur le paddle et il faut appuyer sur espace
pour la renvoyer. Des bonus sont cachés dans des briques. Lorsque celles-ci sont touchées, ils
descendent et il faut alors les récupérer avec le paddle. Ils ont une durée limitée, il faut donc
les utiliser rapidement.

Pour le niveau intermédiaire, chaque brique possède 3 vies. Il faut donc les toucher 3 fois avant
qu'elles soient détruites. A chaque collision, la brique passe de jaune puis orange puis rouge.

Pour le niveau difficile, une colonne sur deux n'est pas cassable. Elles sont représentées par des
briques pleines.

Pour le bonus multi-balles il n'y a pas de pénalité si les deux nouvelles balles sortent du jeu. Par
contre, la balle de départ reste la balle principale et donc c'est elle qui influence les vies dans
le cas où elle sort du jeu.


### Implémentation :
Nous avons utilisé du Javascript Vanilla parce que c'est le langage que nous maitrisons le mieux et nous ne nous étions pas encore intéréssés à l'ES6, qui aurait pu être intéressant à utiliser.

### Limites du jeu :
Il y a un petit problème au niveau des boutons cliquables pour les différentes fonctionnalités sous le jeu. Nous ne savons pas pourquoi, mais ils fonctionnent aléatoirement.
