document.getElementById("botaoComecarPercurso").addEventListener("click", botaoPercurso);
document.getElementById("fecharResultados").addEventListener("click", fecharResultado);

function fecharResultado(){
    document.getElementById('percursoCompleto').style.display = 'none';
	document.getElementById('tempo').innerHTML = '';
	document.getElementById('distancia').innerHTML = '';
	document.getElementById('velocidade').innerHTML = '';

}

var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;

var contadorClickBotao = 0;

function botaoPercurso(){
    if(contadorClickBotao == 0){
        inicio();
        contadorClickBotao++;
    }else{
        parar();
    }
}
function inicio () {
    control = setInterval(cronometro,10);
    document.getElementById('percursoCompleto').style.display = 'none';
    document.getElementById('tempo').innerHTML = '';
}

function parar () {
    document.getElementById('tempo').innerHTML = Horas.innerHTML + ":" + Minutos.innerHTML + ":" + Segundos.innerHTML + ":" + Centesimas.innerHTML;
    clearInterval(control);
    Horas.innerHTML = "00";
    Minutos.innerHTML = "00";
    Segundos.innerHTML = "00";
    Centesimas.innerHTML = "00";
    contadorClickBotao--;
    centesimas = segundos = minutos =  horas = 0;
    document.getElementById('percursoCompleto').style.display = 'block';
}

function cronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
		Centesimas.innerHTML = centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos++;
		if (segundos < 10) { segundos = "0"+segundos }
		Segundos.innerHTML = segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		Minutos.innerHTML = minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }
		Horas.innerHTML = horas;
	}
}