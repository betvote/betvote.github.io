function ToggleCategoriaBarra(barra){
	var barra = $(barra);
	ToggleCategoria(barra.find('.arrowButton')[0]);

}

function ToggleCategoria(boton)
{
	var contenedorPropuestas = $(boton).parents('.tipo').children('.contPropuestas');
	if(contenedorPropuestas.css('display') == 'none')
		$(boton).removeClass('down').addClass('up');
	else
		$(boton).removeClass('up').addClass('down');
	contenedorPropuestas.slideToggle('fast');
}

function MostrarCandidato(modo, cand)
{
	switch(modo)
	{
		case 0:
		{
			var container = document.createElement('div');
			$(container).attr('id', cand.nombre);
			$(container).addClass('candidatoContainer');
			$(container).click(function(){
				MostrarCandidato(1, cand)
			});
			$('.candidatosContainer').append(container);

			var reemplazo = cand.nombre.replace(/ /g,'');
			$("."+reemplazo).click(function(){
				MostrarCandidato(1, cand)
			});			

			var imagen = document.createElement('div');
			$(imagen).addClass('imagenCandidato');
			$(imagen).css('background-image', 'url(' + cand.imagen + ')');
			$(container).append(imagen);

			var cont = document.createElement('div');
			$(cont).css('display', 'inline-block');
			$(cont).css('vertical-align', 'top');
			$(cont).css('margin', '6px 0');
			$(cont).css('max-width', '215px');
			
			var nombre = document.createElement('div');
			$(nombre).addClass('nombreCandidato');
			$(nombre).html(cand.nombre);
			$(cont).append(nombre);

			var part = partidos.filter(function(e){return e.codigo == cand.partido;})[0];
			var color = document.createElement('div');
			$(color).addClass('colorCandidato');
			$(color).css('background-color', part.color);
			$(color).html(part.nombre+" | <b>"+cand.lista)+"</b>";
			$(cont).append(color);

			var address = document.createElement('div');
			$(address).addClass('addressCandidato bet_temp');
			$(address).attr( "data-xbt-address", ""+cand.address+"" );
			$(address).css('color', cand.color);			
			$(address).html(cand.address+'<img class="qr_cand" src="img/qr/' + cand.address + '.png">');
			$(cont).append(address);

			var bet = document.createElement('div');
			$(bet).addClass("bet"+cand.address+" bet_temp");
			$(address).append(bet);
			$(cont).append(bet);

			/*
			var bet_now_container = document.createElement('div');
			$(bet_now_container).addClass('bet-now');
			$(bet_now_container).html("<a href='#bet'>¡APOSTAR!</a>");	
			$(bet_now_container).css('background-color', part.color);
			$(cont).append(bet_now_container);	
			*/
			
			$(cont).append('<img class="partie_logo_temp" src="' + part.imagen + '">');

			/*
			$("#"+cand.nombre).append('<img src="' + part.imagen + '">');
			*/
			$(container).append(cont);
			CargarBets();
		}break;
		case 1:
		{
			var cont = $('.contentContainer');
			cont.stop(true, true).fadeOut('300ms', function() {
				$('.contentContainer').html('');
				
				cont.append(MostrarVolver(0, partidos.filter(function(e){ return e.codigo == cand.partido; })[0]));
				cont.append(HeaderCandidato(cand));
				
				cont.append(MostrarContenedor(contenedores.PROPUESTAS));
				
				propuestas.filter(function(a){return a.candidato == cand.codigo && a.partido == cand.partido}).forEach(function(prop)
				{
					MostrarPropuesta(0, prop);
				});

            }).fadeIn('300ms').animate({marginTop:'0px'},'300ms');
			$('html, body').animate({
		        scrollTop: cont.offset().top
		    }, 500);
			CambiarURL(1, cand);
		}break;

		case 2:
		{
			var container = document.createElement('div');
			$(container).attr('id', cand.nombre);
			$(container).addClass('candidatoContainer');
			$(container).css('position', 'absolute').css('top', '0').css('right', '0').css('width','auto').css('border','1px solid #999');
			$(container).click(function(){
				MostrarCandidato(1, cand)
			});

			var color = document.createElement('div');
			$(color).addClass('colorCandidato_mini');
			$(color).css('background-color', partidos.filter(function(e){return e.codigo == cand.partido;})[0].color);
			$(container).append(color);

			var reemplazo = cand.nombre.replace(/ /g,'');
			$("#"+reemplazo).click(function(){
				MostrarCandidato(1, cand)
			});		

			var imagen = document.createElement('div');
			$(imagen).addClass('imagenCandidato_mini');
			$(imagen).css('background-image', 'url(' + cand.imagen + ')');
			$(container).append(imagen);

			var address = document.createElement('div');
			$(address).addClass('addressCandidato');
			$(address).attr( "data-xbt-address", ""+cand.address+"" );
			$(address).css('color', cand.color);			
			$(address).html(cand.address);
			$(cont).append(address);
			$(container).append(address);

			var bet = document.createElement('div');
			$(bet).attr('class', 'bet'+cand.address+'');
			$(address).append(bet);					
			$(cont).append(bet);
			$(container).append(bet);										

			var nombre = document.createElement('div');
			$(nombre).addClass('nombreCandidato_mini');
			$(nombre).html(cand.nombre);
			$(cont).append(nombre);
			$(container).append(nombre);
			
						CargarBets();

			return container;
		}break;
	}
}

function MostrarPartido(modo, part)
{
	switch(modo)
	{
		case 0:
		{
			var container = document.createElement('div');
			$(container).attr('id', part.nombre);
			$(container).addClass('partidoContainer');
			$(container).click(function(){
				MostrarPartido(1, part)
			});

			var imagen = document.createElement('div');
			$(imagen).addClass('imagenPartido');
			$(imagen).css('background-image', 'url(' + part.imagen + ')');
			$(container).append(imagen);
			
			var nombre = document.createElement('div');
			$(nombre).addClass('item').addClass('nombre');
			$(nombre).css('color', part.color);
			$(nombre).html(part.nombre);
			$(container).append(nombre);

			var address = document.createElement('div');
			$(address).addClass('item').addClass('address');
			$(address).attr( "data-xbt-address", ""+part.address+"" );
			$(address).css('color', part.color);
			//$(address).html('<img class="qr_part" src="img/qr/' + part.address + '.png"><br>'+ part.address+'<br>');
			var bet = document.createElement('div');
			$(bet).attr('class', 'bet'+part.address+'');
			$(bet).html(part.bet);
			$(address).append(bet);
			$(container).append(address);

			var candidatosDIV = document.createElement('div');
			$(candidatosDIV).addClass('item').addClass('candidatos');
			$(candidatosDIV).html(candidatos.filter(function(a){return a.partido == part.codigo}).length);
			$(container).append(candidatosDIV);

			$('.partidosContainer').append(container);
		}break;
		case 1:
		{
			var cont = $('.contentContainer');
			cont.stop(true, true).fadeOut('300ms', function() {
				$('.contentContainer').html('');
				
				cont.append(MostrarVolver(0, null));
				cont.append(HeaderPartido(part));
				
				cont.append(MostrarContenedor(contenedores.CANDIDATOS));
				cont.append(MostrarContenedor(contenedores.PROPUESTAS));
				
				candidatos.filter(function(a){return a.partido == part.codigo}).forEach(function(cand) {MostrarCandidato(0, cand);});
				propuestas.filter(function(a){return a.partido == part.codigo}).forEach(function(prop) {MostrarPropuesta(0, prop);});				
            }).fadeIn('300ms').animate({marginTop:'0px'},'300ms');
			$('html, body').animate({
		        scrollTop: cont.offset().top
		    }, 500);
			CambiarURL(0, part);
		}break;
	}
}

function MostrarPropuesta(modo, prop)
{
	if(prop.partido != undefined)
	{
		var candidato = candidatos.filter(function(e){return e.codigo == prop.candidato && e.partido == prop.partido;})[0];
		var id = propuestas.indexOf(prop);
		switch(modo)
		{
			case 0:
			{
				var container = document.createElement('div');
				$(container).attr('id', 'p'+id);
				$(container).css('position', 'relative');
				$(container).addClass('propuestaContainer');
				$(container).click(function(){
					MostrarPropuesta(1, prop);
				});
				var colorValue = null;
				switch(prop.tema)
				{
					case temas.SALUD:
					{
						$('#salud').append(container);
					}break;
					case temas.ECONOMIA:
					{
						$('#economia').append(container);
					}break;
					case temas.SOCIEDAD:
					{
						$('#sociedad').append(container);
					}break;
					case temas.SEGURIDAD:
					{
						$('#seguridad').append(container);
					}break;
					case temas.EDUCACION:
					{
						$('#educacion').append(container);
					}break;
					case temas.DERECHOS_HUMANOS:
					{
						$('#derechosHumanos').append(container);
					}break;
					case temas.PLANEAMIENTO_URBANO:
					{
						$('#planeamientoUrbano').append(container);
					}break;
					case temas.INSTITUCIONAL:
					{
						$('#institucional').append(container);
					}break;
					case temas.TRANSPORTE:
					{
						$('#transporte').append(container);
					}break;
					case temas.INTERNACIONAL:
					{
						$('#internacional').append(container);
					}break;
					case temas.MEDIO_AMBIENTE:
					{
						$('#medioAmbiente').append(container);
					}break;
					case temas.VIVIENDA:
					{
						$('#vivienda').append(container);
					}break;
				}
	
				var color = document.createElement('div');
				$(color).addClass('colorPropuesta');
				$(color).css('background-color', prop.tema.color);
				$(container).append(color);
	
				var cont = document.createElement('div');
				$(cont).css('display', 'inline-block');
				$(cont).css('vertical-align', 'top');
				$(cont).css('margin', '0 10px');
				
				var titulo = document.createElement('div');
				$(titulo).addClass('tituloPropuesta');
				$(titulo).html(prop.titulo);
				$(cont).append(titulo);
	
				var texto = document.createElement('div');
				$(texto).addClass('textoPropuesta');
				$(texto).html(prop.texto);
				$(cont).append(texto);

				$(container).append(cont);
	
				var tweet = document.createElement('a');
				$(tweet).addClass('twitterButton');
				$(tweet).attr('target', 'popup');
				$(tweet).html('Hablá con '+candidato.nombre+' sobre esto');
				
				$(tweet).click(function(e) {
					//makeShort(container, window.location.origin + window.location.pathname + '#candidato/'+candidato.nombre.split(' ').join('-')+'/propuesta/'+'p'+id, function(){
					window.open('https://twitter.com/share?'+
					'url=http%3A%2F%2Fqueproponen.com.ar%2F'+'%23candidato%2F'+candidato.nombre.split(' ').join('-')+'%2Fpropuesta%2F'+id+'&'+
					'related=PartidodelaRed&'+
					'hashtags=yvosquepropones&'+
					'text='+ 'Hola ' + candidato.twitter + " esta propuesta me parece", 'tweet', 'width=900,height=300,menubar=no,status=no,titlebar=no,top=200,left='+(screen.width-900)/2);
					//});
				});
				$(container).append(tweet);
				
				$(container).append(MostrarCandidato(2, candidato));
				
			}break;
			case 1:
			{
				
			}break;
		}
	}
}

function CambiarURL(tipo, cosa)
{
	var title = '';
	var url= '';
	switch(tipo)
	{
		case 0:
		{
			title = '¡Apostá por ' +cosa.nombre + ' y ganá! - betvote.net - Apuestas electorales';
			url = window.location.origin + window.location.pathname + '#partido/'+(cosa.nombre.split(' ').join('-'));
		}break;
		case 1:
		{
			title = '¡Apostá por ' +cosa.nombre + ' y ganá! - betvote.net - Apuestas electorales';
			url = window.location.origin + window.location.pathname + '#candidato/'+(cosa.nombre.split(' ').join('-'));
		}break;
		case 3:
		{
			title = 'Apuestas electorales - betvote.net';
			url = window.location.origin + window.location.pathname;
		}break;
	}
	ChangeUrl(title, url);
}

function ChangeUrl(title, url) 
{
    if (typeof (history.pushState) != "undefined") 
	{
		document.title = title;
        var obj = { Title: title, Url: url };
        history.pushState(obj, obj.Title, obj.Url);
    }
}

function CargaInicial()
{
	cont = $('.contentContainer');
	cont.stop(true, true).fadeOut('300ms', function() {
		cont.html('');
		cont.append(MostrarContenedor(contenedores.CANDIDATOS));
		cont.append(MostrarContenedor(contenedores.PARTIDOS));		
		cont.append(MostrarContenedor(contenedores.PROPUESTAS));
		
		partidos.forEach(function(part) {MostrarPartido(0, part);});
		candidatos.forEach(function(cand) {MostrarCandidato(0, cand);});
		propuestas.forEach(function(prop) {MostrarPropuesta(0, prop);});
    }).fadeIn('300ms').animate({marginTop:'0px'},'300ms').animate({scrollTop:200}, '300');
	$('html, body').animate({
		scrollTop: 0
	}, 500);
	CambiarURL(3, null);
}

function CargarSeccion()
{
	if(window.location.hash.split('/')[1] != undefined)
	{
		secciones = unescape(window.location.hash).split('/');
		var nombre = secciones[1].split('-').join(' ');
		if(window.location.hash.indexOf('partido') != -1)
		{
			var lista = partidos.filter(function(e){ return e.nombre == nombre; });
			if(lista.length > 0)
			{
				MostrarPartido(1, lista[0]);
				return true;
			}
		}
		else if(window.location.hash.indexOf('candidato') != -1)
		{
			var lista = candidatos.filter(function(e){ return e.nombre == nombre; });
			if(lista.length > 0)
			{
				MostrarCandidato(1, lista[0]);
				if(secciones.indexOf('propuesta') != -1)
				{
					var nombrePropuesta = secciones[3];
					setTimeout(function(){hacerScrollID('p'+nombrePropuesta)}, 1000);
				}
				else if(secciones.indexOf('#propuesta') != -1)
				{
					var nombrePropuesta = secciones[3];
					setTimeout(function(){hacerScrollID(nombrePropuesta)}, 1000);
				}
				return true;
			}
		}
	}
	CargaInicial();
}
function hacerScrollID(elemento)
{
	$('html, body').animate({ scrollTop: ($('#'+elemento).offset().top - 200) }, 1000);
	$('#'+elemento).effect("highlight", {},5000);
}
/*
function fbShare(url, title, descr, image, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}


function twShare(url, title, descr, image, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('https://twitter.com/intent/tweet?text=' + title + '&url=' + url + "&hashtags=" + descr + "&via=" + image, 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}
*/