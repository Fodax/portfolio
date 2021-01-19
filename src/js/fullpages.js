// const nav = document.querySelector('.nav');

// let positionTo = pageYOffset,
// 	sectionIndex = 0;

// function clamp(val) {
//     return Math.min(Math.max(0, +val), document.documentElement.scrollHeight - document.documentElement.clientHeight);
// }

// function updateNav() {
// 	navItems = document.querySelectorAll('.nav__item');

// 	for (let i = 0; i < navItems.length; i++)
// 		if (navItems[i].classList.contains('nav__item_active')) {
// 			navItems[i].classList.remove('nav__item_active');
// 			break;
// 		}

// 	navItems[Math.round(pageYOffset / document.documentElement.clientHeight)].classList.add('nav__item_active');
// }

// document.addEventListener('DOMContentLoaded', () => {
	// count = document.documentElement.scrollHeight / document.documentElement.clientHeight;

	// for (let i = 0; i < count; i++) {
	// 	elem = document.createElement('li');
	// 	elem.classList.add('nav__item');

	// 	if (i == pageYOffset / document.documentElement.clientHeight)
	// 		elem.classList.add('nav__item_active');

	// 	elem.addEventListener('click', (e) => {
	// 		navItems = document.querySelectorAll('.nav__item');
	// 		index = 0;

	// 		if (positionTo == pageYOffset) {
	// 			for (let i = 0; i < navItems.length; i++)
	// 				if (navItems[i] !== e.currentTarget) 
	// 					navItems[i].classList.remove('nav__item_active');
	// 				else
	// 					index = i;

	// 			positionTo = index * document.documentElement.clientHeight;

	// 			window.scrollTo({
	// 				top: positionTo,
	// 				behavior: "smooth"
	// 			});

	// 			e.currentTarget.classList.add('nav__item_active');
	// 		}
	// 	});

	// 	nav.firstElementChild.append(elem);
	// }
// });

// window.addEventListener('keydown', (e) => {
	// if (positionTo == pageYOffset) {
	// 	if (e.key == 'ArrowUp') {
	// 		e.preventDefault();
	// 		e.stopImmediatePropagation();

	// 		documentHeight = document.documentElement.scrollHeight;
	// 		height = document.documentElement.clientHeight;
	
	// 		positionTo = clamp((Math.floor(pageYOffset / height) - 1) * height);
	
	// 		window.scrollTo({
	// 			top: positionTo,
	// 			behavior: "smooth"
	// 		});
	// 	}
	// 	else if (e.key == 'ArrowDown')
	// 	{
	// 		e.preventDefault();
	// 		e.stopImmediatePropagation();

	// 		documentHeight = document.documentElement.scrollHeight;
	// 		height = document.documentElement.clientHeight;
	
	// 		positionTo = clamp((Math.ceil(pageYOffset / height) + 1) * height);
	
	// 		window.scrollTo({
	// 			top: positionTo,
	// 			behavior: "smooth"
	// 		});
	// 	}
	// }
// });

// window.addEventListener('scroll', (e) => {
	// updateNav();
// });

// window.addEventListener('wheel', (e) => {
// 	delta = e.deltaY;
// 	e.preventDefault();
// 	e.stopImmediatePropagation();

// 	if (positionTo == pageYOffset) {

// 		documentHeight = document.documentElement.scrollHeight;
// 		height = document.documentElement.clientHeight;

// 		if (delta >= 0) {
// 			positionTo = clamp((Math.ceil(pageYOffset / height) + 1) * height);
// 		} else {
// 			positionTo = clamp((Math.floor(pageYOffset / height) - 1) * height);
// 		}

// 		window.scrollTo({
// 			top: positionTo,
// 			behavior: "smooth"
// 		});
// 	}
// }, { passive: false });