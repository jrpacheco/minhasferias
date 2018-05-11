(function ($) {
	"use strict";

	/* Preloader */
	$(window).on('load', function () {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function () {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});	

	/* Morphtext For Rotating Text In Header */
	$("#js-rotating").Morphext({
		// The [in] animation type. Refer to Animate.css for a list of available animations.
		animation: "pulse",
		// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
		separator: ",",
		// The delay between the changing of each phrase in milliseconds.
		speed: 4000,
		complete: function () {
			// Called after the entrance animation is executed.
		}
	});

})(jQuery);

function calcularFerias() {
	
	var dataFerias = $("#dataFerias").val();
	var strTimeZone = $("#timezone option:selected").text();
	var dataInformada = moment.tz(dataFerias, strTimeZone);

	$('#clock').countdown(dataInformada.toDate())
		.on('update.countdown', function (event) {
			var formatMonth = '<span class="counter-number">%-m mes %-n dia%!n<br><br></span>';
			var formatWeek = '<span class="counter-number">%-w semana%!w %-d dia%!d<br><br></span>';
			var formatCountDown = '<span class="counter-number">%-n<br><br><span class="timer-text">Dias</span></span>' +
				'<span class="counter-number">%-H<br><br><span class="timer-text">Horas</span></span>' +
				'<span class="counter-number">%-M<br><br><span class="timer-text">Minutos</span></span>' +
				'<span class="counter-number">%-S<br><br><span class="timer-text">Segundos</span></span>';
			$(this).html(event.strftime(formatMonth + "</br>" + formatWeek + "</br>" + formatCountDown));
		})
		.on('finish.countdown', function (event) {
			$(this).html('Suas férias chegaram!')
				.parent().addClass('disabled');
		});
}

$(document).ready(function () {
	$("#timezone").select2({ theme: "classic" });

	$("#btnCalcular").click(function () {
		calcularFerias();
	});
});