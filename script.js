// handwritten text
function initCaffeine() {
	let caffeine = document.querySelectorAll('.caffeine');
	for (let elmnt of caffeine) {
		let elmntText = elmnt.innerHTML;
		let words = elmntText.split(' ');
		let temp = '';
		let wordIndex = 0;
		for (let word of words) {
			let letterTemp = '';
			for (let letter of word) {
				letterTemp += `<span class="letter" style="font-variation-settings: 'SCRI' ${Math.random()*100}, 'SCRA' ${Math.random()*100}">${letter}</span>`;
			}
			if (wordIndex < words.length-1) {
				temp += `<span class="word">${letterTemp}</span> `;
			} else {
				temp += `<span class="word">${letterTemp}</span>`;
			}
			wordIndex++;
		}
		elmnt.innerHTML = temp;
	}
	animateLetters();
}
function animateLetters() {
	let animated = document.querySelectorAll('.animated');
	for (let elmnt of animated) {
		for (let letter of elmnt.querySelectorAll('.letter')) {
			letter.style.fontVariationSettings = `"SCRI" ${Math.random()*100}, "SCRA" ${Math.random()*100}`;
		}
	}
	setTimeout(animateLetters, 200);
}
initCaffeine();

// mouse
let container = document.querySelector('.container');
container.addEventListener('mousemove', (e) => {
	let mouse = document.querySelector('.mouse');
	mouse.style.left = e.clientX + "px";
	mouse.style.top = e.clientY + "px";
})
container.addEventListener('mousemove', () => {
	let mouse = document.querySelector('.mouse');
	mouse.style.display = "block";
})
container.addEventListener('mouseleave', () => {
	let mouse = document.querySelector('.mouse');
	mouse.style.display = "none";
})

// go rando
function goRando() {
	let links = document.querySelectorAll('.project');
	let randomLink = links[Math.floor(Math.random()*links.length)];
	window.open(randomLink.href, '_blank');
}