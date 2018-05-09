(function($) {
    "use strict"; 
	
	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});


	$('#clock').countdown('2018/12/27 08:50:56')
	.on('update.countdown', function(event) {
		var format = '<span class="counter-number">%D<br><br><span class="timer-text">Dias</span></span><span class="counter-number">%H<br><br><span class="timer-text">Hours</span></span><span class="counter-number">%M<br><br><span class="timer-text">Minutes</span></span><span class="counter-number">%S<br><br><span class="timer-text">Seconds</span></span>';
		$(this).html(event.strftime(format));
	})
	.on('finish.countdown', function(event) {
	$(this).html('This offer has expired!')
		.parent().addClass('disabled');
	});

	/* Morphtext For Rotating Text In Header */
	$("#js-rotating").Morphext({
		// The [in] animation type. Refer to Animate.css for a list of available animations.
		animation: "fadeIn",
		// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
		separator: ",",
		// The delay between the changing of each phrase in milliseconds.
		speed: 5000,
		complete: function () {
			// Called after the entrance animation is executed.
		}
	});
	
})(jQuery);