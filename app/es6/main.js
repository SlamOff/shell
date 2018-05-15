$(document).ready(function() {

	new WOW().init();

	$('.play_btn').click(function(){
		$('.main__video').addClass('shown');
		$('.main__video video').get(0).play();
	});
	$('.main__video video').click(function(){
		this.pause();
		$(this).parent().removeClass('shown');
	});
		
	

	// scroll to
	$('.scroll').click( function(e){
		e.preventDefault();
		var scrollEl = $(this).attr('href');
		$('.scroll').find('li').removeClass('active');
		$(this).find('li').addClass('active');
		if ($(scrollEl).length != 0) {
			$('html, body').animate({ scrollTop: $(scrollEl).offset().top}, 500);
		}
		return false;
	});
	
	// menu button
	$('.main__menu_btn').click(function(){
		$('.sandwich').toggleClass('active');
		$('.nav_rolled').toggleClass('rolled');
		$('.main__search').toggleClass('translated');
	});

	// remove scroll
	function offScroll(){
		var winScrollTop = $(window).scrollTop();
			$(window).bind('scroll',function () {
			$(window).scrollTop(winScrollTop);
		});
	}
	function scrollTo(y){
		let h = window.innerHeight * y;
		window.scrollBy({
			'behavior': 'smooth',
			left: 0,
			top: h
		});
	}

	var intervalMs = 700,
		last = 0;
	if ('onwheel' in document) {
		document.onwheel = function(e){
			var now = new Date().getTime();
			e.preventDefault();
			if (last + intervalMs < now) {
				last = now;
				var k;
				if(e.deltaY > 0){
					k = 1;
				}
				else {
					k = -1;
				}
				scrollTo(k, document.body, 2, 500);
				return false;
			}
			
		}
	}
	if ('onmousewheel' in document) {
		document.onmousewheel = function(e){
			var now = new Date().getTime();
			e.preventDefault();
			if (last + intervalMs < now) {
				last = now;
				var k;
				if(e.deltaY > 0){
					k = 1;
				}
				else {
					k = -1;
				}
				scrollTo(k, document.body, 2, 500);
				return false;
			}
		}
	}
	Math.easeInOutQuad = function (t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};

	var touchstartY = 0;
	var touchendY = 0;

	document.addEventListener('touchstart', function(event) {
		touchstartY = event.touches[0].clientY;
	}, false);

	document.addEventListener('touchend', function(event) {
		touchendY = event.changedTouches[0].clientY;
		handleSwipe();
	}, false);

	function handleSwipe(){
		var k;
		if(touchendY > (touchstartY + 100)){
			k = -1;
		}
		else if (touchstartY > (touchendY + 100)) {
			k = 1;
		}
		scrollTo(k);
	}
});