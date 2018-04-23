var tempoFim = "0";
var timeDateInformada = "0";

function Inicializa() {
    document.querySelector('.meses').innerHTML;
    document.querySelector('.semanas').innerHTML;
    document.querySelector('.dias').innerHTML;
    document.querySelector('.horas').innerHTML;
    document.querySelector('.minutos').innerHTML;
    document.querySelector('.segundos').innerHTML;
}

function ValidarDataInformada(element) {
    
    try {
        var dataInformada = Date.parse(element.value);
        if (isNaN(dataInformada)) {
            alert('Data/Hora inválida. Informe a data/hora corretamente.');
            return 0;
        } else if (dataInformada <= new Date()) {
            alert('Data/Hora informada é menor que a data/hora atual.');
            return 0;
        }
    } catch (error) {
        alert(error);
    }

    return 1;
}

function CalculaFerias() {

    var elem = document.getElementById("IdDataInformada");

    //if (!ValidarDataInformada(elem)) return;
    
    var dataFim = new Date(Date.parse(elem.value));

    var dias = getDaysBetweenDates(new Date(), dataFim);

    var dia_em_milissegundos = 24 * 60 * 60 * 1000;

    tempoFim = new Date(Date.parse(new Date()) + dias * dia_em_milissegundos);//new Date(year, month, date, hours, minutes, seconds, ms)

    timeDateInformada = dataFim.getTime();

    InicializaRelogio("divRelogio");
}

function InicializaRelogio(id) {

    var relogio = document.getElementById(id);    

    var mesesSpan = relogio.querySelector('.meses');
    var semanaSpan = relogio.querySelector('.semanas');
    var diasSpan = relogio.querySelector('.dias');
    var horasSpan = relogio.querySelector('.horas');
    var minutosSpan = relogio.querySelector('.minutos');
    var segundosSpan = relogio.querySelector('.segundos');    

    function AtualizaRelogio() {        

        tempoFim.setTime(timeDateInformada);

        var t = pegaTempoRestante(tempoFim);

        mesesSpan.innerHTML = ('0' + t.meses).slice(-2);
        semanaSpan.innerHTML = ('0' + t.semanas).slice(-2);
        diasSpan.innerHTML = ('0' + t.dias).slice(-2);
        horasSpan.innerHTML = ('0' + t.horas).slice(-2);
        minutosSpan.innerHTML = ('0' + t.minutos).slice(-2);
        segundosSpan.innerHTML = ('0' + t.segundos).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }    
    var timeinterval = setInterval(AtualizaRelogio, 1000);
}

function pegaTempoRestante(tempoFim) {
    var t = Date.parse(tempoFim) - Date.parse(new Date());
    var segundos = Math.floor((t / 1000) % 60);
    var minutos = Math.floor((t / 1000 / 60) % 60);
    var horas = Math.floor((t / (1000 * 60 * 60)) % 24);
    var dias = Math.floor(t / (1000 * 60 * 60 * 24));
    var semanas = Math.floor((t / (1000 * 60 * 60 * 24 * 7)));
    var meses = Math.floor(t / 2.628e+9) % 12;

    return {
        'total': t,
        'meses': meses,
        'semanas': semanas,
        'dias': dias,
        'horas': horas,
        'minutos': minutos,
        'segundos': segundos
    };
}

function getDaysBetweenDates(d0, d1) {

    var msPerDay = 8.64e7;

    // Copy dates so don't mess them up
    var x0 = new Date(d0);
    var x1 = new Date(d1);

    // Set to noon - avoid DST errors
    x0.setHours(12, 0, 0);
    x1.setHours(12, 0, 0);

    // Round to remove daylight saving errors
    return Math.round((x1 - x0) / msPerDay);
}