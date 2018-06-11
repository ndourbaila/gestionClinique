function namosw_init_clock()
{

  var type, i, top, obj, clocks, strobj, tempvar;
  clocks = new Array();
  //Permet de r�cup�rer les n argument d�finits dans les param�tres de la fonction namosw_init_clock() lors du chargement de la page
  for (i = 0, top = 0; i < namosw_init_clock.arguments.length; i += 2)//ici on extrait chaque param�tre d�finit dans la fonction namosw_init_clock() lors du chargement de la page et on les places dans un tableau objet
  	{
  	//namosw_init_clock.arguments[i]  : param�tre i d�finit dans les arguments de la fonction namosw_init_clock(argument1, argument2,...)
    strobj = eval('document.getElementById("' + namosw_init_clock.arguments[i] + '")');//Permet de d�finir l'objet dans lequel sera afficher l'horloge sur la page html � partir des param�tres paires d�finit dans la fonction lors du chargement de la page
    type = namosw_init_clock.arguments[i+1];
    if (type < 1 && 7 < type) continue;
    clocks[top++] = strobj;
    clocks[top++] = type;
  	}
  //*****************definition des tableau contenant les noms des mois et des jours****************
  clocks.months = new Array('Janvier', 'F�vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
                            'Ao�t', 'Septembre', 'Octobre', 'Novembre', 'D�cembre');
  clocks.days   = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi',
                            'Jeudi', 'Vendredi', 'Samedi');
  //************************************************************************************************
  if (top > 0)
  	{
    document.namosw_clocks = clocks;
    namosw_clock();
  	}
}

function namosw_clock()
{
//fonction permettant l'affichage des diff�rentes horloges suivant les diff�rents formats ainsi que les diff�rents endroits
//(au niveau des balises span) ainsi que le lancement de l'execution toutes les secondes
  var i, type, clocks, next_call, str, hour, ampm, now, year2, year4;
  clocks = document.namosw_clocks;
  if (clocks == null) return;
  next_call = false;
  //affichage de toutes les horloges en fonction du type et de l'id de la balise span dans laquelle l'horloge sera affich�
    for (i = 0; i < clocks.length; i += 2) {
    obj   = clocks[i];//objet dans lequel sera affich� la n i�me horloge
    type  = clocks[i+1];//type d'affichage de la n i�me horloge
    now   = new Date();
    year2 = now.getYear();
    year4 = year2;
    if (year2 < 1000) year4 = 1900 + year2;
    if (year2 >= 100) year2 = year4;
	//d�finition des formats en fonction du type 1,2,3,4...
	//remarque : document.getElementById("type1").innerHTML permet d'afficher la date ou l'heure au niveau de la balise span ayant comme id type1
    if (type == 1 )
    	{
      	obj.innerHTML = now.getDate() + ' ' + clocks.months[now.getMonth()] + ' ' + year4;

    	}
 
  
    
    if ( type == 7)
    	{
      	hour = now.getHours();
      	ampm = 0;
      	//Dans cette ligne on teste aussi si les minutes et(ou) les secondes sont <10 si c'est le cas on concat�ne un 0 devant 
      	//l'heure et(ou) les secondes (on pourrait faire la m�me chose avec les heures 
      	str = hour +':'+ ((now.getMinutes() < 10) ? '0'+now.getMinutes():now.getMinutes()) +':'+ ((now.getSeconds() < 10) ? '0'+now.getSeconds():now.getSeconds());
      	if (type == 7) 
      		{
      		obj.innerHTML  = str;
      		}
      	else
      		{
      		obj.innerHTML += ' ' + str;
      		}
    	}
    //si on utilise l'affichage de l'heure on met la variable next_call a true afin d'executer (settimeout) la fonction namosw_clock()
    //toutes les secondes (1000 millisecondes) pour obtenir l'affichage des secondes en temps r�el
    if ( type == 7)
    	next_call = true;
  }//fin for
  if (next_call)
    window.setTimeout("namosw_clock();", 1000);
}