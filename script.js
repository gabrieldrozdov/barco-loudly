const artwork = document.querySelector('.artwork');
const title = document.querySelector('.title');
let movement = {};
let temp = '';
let index = 0;

// Generate letter spans
for (let letter of title.innerText) {
	temp += `<span id="letter${index}" onmouseenter="nudgeLetter(this)">${letter}</span>`;

	movement["letter"+index] = {
		'directionX': Math.round(Math.random()),
		'directionY': Math.round(Math.random()),
		'posX': 0,
		'posY': 0,
		'speed': Math.random()*3+1,
		'directionRot': Math.round(Math.random()),
		'rot': 0,
	};

	index++;
}
title.innerHTML = temp;

// Move letters
const titleLetters = document.querySelectorAll('.title span');
function titleAnimation() {
	for (let letter of titleLetters) {
		if (letter.innerText == "" || letter.innerText == " ") {
			continue
		}

		const key = letter.id;
		const directionX = movement[key]['directionX'];
		const directionY = movement[key]['directionY'];
		const directionRot = movement[key]['directionRot'];
		const speed = movement[key]['speed'];

		if (directionX == 0) { // left
			movement[key]['posX'] -= speed;
		} else if (directionX == 1) { // right
			movement[key]['posX'] += speed;
		}
		
		if (directionY == 0) { // up
			movement[key]['posY'] -= speed;
		} else if (directionY == 1) { // down
			movement[key]['posY'] += speed;
		}

		// Rotation
		if (directionRot == 0) { // up
			movement[key]['rot'] -= speed;
		} else if (directionRot == 1) { // down
			movement[key]['rot'] += speed;
		}

		// Apply settings
		letter.style.transform = `translate(${movement[key]['posX']}px, ${movement[key]['posY']}px) rotate(${movement[key]['rot']}deg)`;

		// Detect direction change
		const artworkRect = artwork.getBoundingClientRect();
		const letterRect = letter.getBoundingClientRect();

		if (letterRect.left < artworkRect.left-10) {
			movement[key]['directionX'] = 1;
		} else if (letterRect.right > artworkRect.right+10) {
			movement[key]['directionX'] = 0;
		}

		if (letterRect.top < artworkRect.top-10) {
			movement[key]['directionY'] = 1;
		} else if (letterRect.bottom > artworkRect.bottom+10) {
			movement[key]['directionY'] = 0;
		}
	}

	requestAnimationFrame(titleAnimation);
}
setTimeout(titleAnimation, 1850);

// Hover effects for moving letters
function nudgeLetter(letter) {
	const key = letter.id;
	const directionX = movement[key]['directionX'];
	const directionY = movement[key]['directionY'];
	const directionRot = movement[key]['directionRot'];

	if (directionX == 0) {
		movement[key]['directionX'] = 1;
	} else {
		movement[key]['directionX'] = 0;
	}

	if (directionY == 0) {
		movement[key]['directionY'] = 1;
	} else {
		movement[key]['directionY'] = 0;
	}

	if (directionRot == 0) {
		movement[key]['directionRot'] = 1;
	} else {
		movement[key]['directionRot'] = 0;
	}

	movement[key]['speed'] = Math.random()*3+1;
}

const root = document.querySelector('html');
function changeColors() {
	let hue = Math.random()*360;
	root.style.setProperty('--hue1', `hsl(${hue}deg, 100%, 50%)`);
	root.style.setProperty('--hue2', `hsl(${hue+180}deg, 100%, 50%)`);
}
changeColors();