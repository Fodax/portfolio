window.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('section'),
	hamburger = document.querySelector('.hamburger'),
	menu = document.querySelector('.menu'),
	menuOverlay = document.querySelector('.menu__overlay'),
	closeElem = document.querySelector('.menu__close');
	carousel = document.querySelector('.skills__carousel'),
	links = document.querySelectorAll('a[href^="#"][data-smooth-scroll]'),
	carouselPrevBtn = document.querySelector('.skills__carousel-prev'),
	carouselNextBtn = document.querySelector('.skills__carousel-next'),
	competencies = document.querySelector('.skills__competencies'),
	competenciesItems = document.querySelectorAll('.skills__competencies-item'),
	slider = tns({
		container: '.skills__carousel-inner',
		speed: 600,
		loop: false,
		controls: false,
		nav: false,
		disable: true,
		touch: false,
		mouseDrag: false,
		navPosition: 'bottom',
		responsive: {
			1344: {
				disable: false
			}
		}
	});

	function getCoords(elem) {
		let box = elem.getBoundingClientRect();
	
		return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
		};
	}

	function goToSection(index) {
		positionTo = getCoords(sections[index]).top;
		sections[index].scrollIntoView({
			behavior: 'smooth'
		});
	}

	if (pageYOffset > document.documentElement.clientHeight)
		document.querySelector('.promo').style.visibility = 'hidden';

	function animate({duration, draw, timing, elem}) {
		let start = performance.now();
		
		requestAnimationFrame(function animate(time) {
			let timeFraction = (time - start) / duration;
			if (timeFraction > 1) timeFraction = 1;
		
			let progress = timing(timeFraction)
		
			draw(progress, elem);
		
			if (timeFraction < 1) {
				requestAnimationFrame(animate);
			}
		});
	}

	for (let i = 0; i < links.length; i++) {
		links[i].addEventListener('click', (e) => {
			e.preventDefault();
			menu.classList.remove('menu_active');
			href = e.currentTarget.href;
			goToSection(parseInt(href.slice(href.indexOf('#') + 1)));
		});
	}

	function animateCompetencies() {
		for (let i = 0; i < competenciesItems.length; i++) {
			setTimeout(function () { animate({
					duration: 480,
					draw: (progress, elem) => {
						percent = elem.querySelector('.skills__competencies-percent');
						inner = elem.querySelector('.skills__competencies-progress-inner');
						value = progress * percent.getAttribute('data-percent');

						inner.style.width = value + '%';
						percent.textContent = Math.round(value) + '%';
					},
					timing: (timeFraction) => {
						return 1 - Math.pow((1 - timeFraction), 2);
					},
					elem: competenciesItems[i]
				}) 
			}, 300);
		}
	}

	function resetCompetencies() {
		for (let i = 0; i < competenciesItems.length; i++) {
			setTimeout(function () { 
				percent = competenciesItems[i].querySelector('.skills__competencies-percent');
				inner = competenciesItems[i].querySelector('.skills__competencies-progress-inner');

				inner.style.width = '0%';
				percent.textContent = '0%';
			}, 600);
		}
	}

	carouselPrevBtn.addEventListener('click', function(e) {
		slider.goTo('prev');
		info = slider.getInfo();
		indexPrev = info.indexCached,
		index = info.index;

		if (indexPrev == index)
			return;
		
		info.slideItems[indexPrev].style.transitionDuration = '.3s';
		info.slideItems[indexPrev].style.opacity = 0;
		info.slideItems[index].style.transitionDuration = '.6s';
		info.slideItems[index].style.opacity = 1;

		if (index == 0) {
			e.currentTarget.style.visibility = 'hidden';
			e.currentTarget.style.opacity = 0;
		}

		if (index == info.items - 1) {
			carouselNextBtn.style.visibility = 'visible';
			carouselNextBtn.style.opacity = 1;

			resetCompetencies();
		}
	});

	carouselNextBtn.addEventListener('click', function(e) {
		slider.goTo('next');
		info = slider.getInfo();
		indexPrev = info.indexCached,
		index = info.index;

		if (indexPrev == index)
			return;
		
		info.slideItems[indexPrev].style.opacity = 0;
		info.slideItems[index].style.opacity = 1;

		if (info.index == 1) {
			carouselPrevBtn.style.visibility = 'visible';
			carouselPrevBtn.style.opacity = 1;
		}

		if (info.index == info.items) {
			e.currentTarget.style.visibility = 'hidden';
			e.currentTarget.style.opacity = 0;

			animateCompetencies();
		}
	});

	hamburger.addEventListener('click', () => {
		menu.classList.add('menu_active');
	});

	closeElem.addEventListener('click', () => {
		menu.classList.remove('menu_active');
	});

	menuOverlay.addEventListener('click', () => {
		menu.classList.remove('menu_active');
	});

	let animated = false;

	window.addEventListener('scroll', (e) => {
		if (pageYOffset <= document.documentElement.clientHeight){
			document.querySelector('.promo').style.opacity = 1 - pageYOffset / document.documentElement.clientHeight;
				document.querySelector('.promo').style.visibility = 'visible';
		} else {
			document.querySelector('.promo').style.visibility = 'hidden';
		}

		competenciesCoords = getCoords(competencies);

		if (document.documentElement.clientWidth < 1329) {
			if (competenciesCoords.top >= pageYOffset && (competenciesCoords.top + competencies.clientHeight) <= (pageYOffset + document.documentElement.clientHeight) ||
			competenciesCoords.top <= (pageYOffset + document.documentElement.clientHeight) && competenciesCoords.top >= pageYOffset ||
			(competenciesCoords.top + competencies.clientHeight) >= pageYOffset && (competenciesCoords.top + competencies.clientHeight) <= (pageYOffset + document.documentElement.clientHeight) ||
			competenciesCoords.top <= pageYOffset && (competenciesCoords.top + competencies.clientHeight) >= (pageYOffset + document.documentElement.clientHeight)) {
				if (!animated) {
					animated = true;
					animateCompetencies();
				}
			}
			else if (animated)
			{
				animated = false;
				resetCompetencies();
			}
		} 
		else if (animated == true)
		{
			animated = false;
			resetCompetencies();
		}
	});

	window.addEventListener('keydown', (e) => {
		if (document.documentElement.clientWidth >= 1329)
			if (e.key == 'ArrowRight') {
				elemTop = getCoords(carousel).top;
				elemBottom = elemTop + carousel.clientHeight;
				clientBottom = pageYOffset + document.documentElement.clientHeight;

				if (pageYOffset <= elemTop && clientBottom >= elemBottom || 
				pageYOffset >= elemTop && pageYOffset <= elemBottom || clientBottom >= elemTop && clientBottom <= elemBottom)
					carouselNextBtn.click();
			}
			else if (e.key == 'ArrowLeft') {
				elemTop = getCoords(carousel).top;
				elemBottom = elemTop + carousel.clientHeight;

				if (pageYOffset <= elemTop && clientBottom >= elemBottom || 
				pageYOffset >= elemTop && pageYOffset <= elemBottom || clientBottom >= elemTop && clientBottom <= elemBottom)
					carouselPrevBtn.click();
			}
	});

	//forms

	document.querySelector('.contacts__form').addEventListener('submit', e => {
		e.preventDefault();

		const formData = new FormData(e.target);

		fetch('../mailer/smart.php', {
			method: 'POST',
			body: formData
		}).finally(() => {
			e.target.reset();
		});
	});
});