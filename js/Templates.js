function MostrarContenedor(tipo)
{
	var template = null;
	switch(tipo)
	{
		case contenedores.CANDIDATOS:
			template = "<div class='candidatosContainer'>"+
            	"<div class='title'><b>Candidatos a Presidentes de la Nación</b><br><span class='cluf'><b>APUESTA #BV-AR-001:</b> ¿Quién será el presidente de la República Argentina el 1 de enero de 2016?</span></div>"+
				"</div> ";
			break;
		/*	
		case contenedores.PARTIDOS:
			template = "<div class='partidosContainer'><div class='title'><b>APUESTA #2: </b><br><span class='cluf'>[¿De qué partido será el candidato a presidente de la República Argentina ganador al 11 de diciembre de 2015?]</span><br>Partidos Políticos y Frentes Electorales</div></div> ";
			break;
		*/			
	};
	return template;
}

function HeaderCandidato(cand)
{
	var container = document.createElement('div');
	$(container).attr('id', cand.nombre);
	$(container).addClass('candidatoContainer_Header');
	
	var imagen = document.createElement('div');
	$(imagen).addClass('imagenCandidato');
	$(imagen).css('background-image', 'url(' + cand.imagen2 + ')');
	// $(imagen).append('<div class="share-icons"><a href="javascript:twShare(&#39;'+window.location+'&#39;, &#39;¡Apostá por '+cand.nombre+' '+cand.twitter+'!&#39;, &#39;elecciones&#39;, &#39;'+cand.imagen2+'#39;, 520, 350)"><img src="img/share/tw.png"></a><a href="javascript:fbShare(&#39;'+window.location+'&#39;, &#39;¡Apostá por '+cand.nombre+' '+cand.twitter+'!&#39;, &#39;&#39;, &#39;'+cand.imagen2+'&#39;, 520, 350)"><img src="img/share/fb.png"></a></div>');
	$(container).append(imagen);	 

	var cont = document.createElement('div');
	$(cont).css('display', 'inline-block');
	$(cont).css('vertical-align', 'top');
	$(cont).css('margin', '6px 0');
	
	var nombre = document.createElement('div');
	$(nombre).addClass('nombreCandidato');
	$(nombre).html(cand.nombre);
	$(cont).append(nombre);
	
	var part = partidos.filter(function(e){return e.codigo == cand.partido;})[0];
	var color = document.createElement('div');
	$(color).addClass('colorCandidato2');
	$(color).css('background-color', part.color);
	$(color).html(part.nombre+" | <b>"+cand.lista)+"</b>";
	$(cont).append(color);

	var address = document.createElement('div');
	$(address).addClass('addressCandidato');
	$(address).html('<a href="btc:'+cand.address+'">'+cand.address+'</a>'+'<br>'+'<a href="btc:'+cand.address+'">'+'<img class="qr_cand" src="img/qr/' + cand.address + '.png">'+'</a>');
	$(cont).append(address);

	var bet = document.createElement('div');
	$(bet).attr('class', 'bet'+cand.address+'');
	$(address).append(bet);
	// $(cont).append('<div class="getsocial gs-inline-group"></div>');
	$(container).append(cont);

	var youtube = document.createElement('div');
	$(container).append('<iframe width="100%" height="315" src="https://www.youtube.com/embed/'+cand.youtube+'?autoplay=1&controls=0" frameborder="0" allowfullscreen></iframe>');
	$(bet).append(youtube);

	return container;
}

function HeaderPartido(part)
{
	var container = document.createElement('div');
	$(container).attr('id', part.nombre);
	$(container).addClass('partidoContainer');
	$(container).css('display', 'block').css('width', '100%');
	
	var imagen = document.createElement('div');
	$(imagen).addClass('imagenPartido_Header');
	$(imagen).css('background-image', 'url(' + part.imagen + ')');
	$(imagen).html('<img class="qr_part" src="img/qr/' + part.address + '.png">');	
	var bet = document.createElement('div');
	$(bet).attr('class', 'bet'+part.address+'');	
	$(bet).css('color', part.color).css('background-color', '#fff');
	$(imagen).append(bet);
	$(container).append(imagen);
	
	var nombre = document.createElement('div');
	$(nombre).addClass('item').addClass('nombre_Header');
	$(nombre).css('color', part.color).css('background-color', '#fff');
	$(nombre).html(part.nombre+"<br>"+part.address);
	$(container).append(nombre);

	var candidatosDIV = document.createElement('div');
	$(candidatosDIV).addClass('item').addClass('candidatos_Header');
	$(candidatosDIV).html(candidatos.filter(function(a){return a.partido == part.codigo}).length);
	$(container).append(candidatosDIV);
	
	return container;
}

function MostrarVolver(tipo, cosa)
{
	var cont = document.createElement('div');
	$(cont).addClass('atrasContainer');
	$(cont).append(flecha);
	
	var flecha = document.createElement('div');
	$(flecha).addClass('flechaAtras');
	$(cont).append(flecha);
	
	var texto = document.createElement('div');
	$(texto).addClass('textoAtras');
	if(cosa == null)
		$(texto).html('Volver al inicio ');
	else
		$(texto).html('Volver al inicio ');
		
	$(cont).click(function(e) {
		if(cosa == null)
			CargaInicial();
		else if(cosa.propuestas == undefined)
			CargaInicial();
		else
			MostrarCandidato(1, cosa);
    });	
		
	$(cont).append(texto);
	
	return cont;
}