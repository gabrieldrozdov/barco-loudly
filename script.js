const artwork = document.querySelector('.artwork');
const title = document.querySelector('.title');
let movement = {};
let temp = '';
let index = 0;
let colors = ['#70b4f8', '#f5c3cb', '#ff9e2e', '#f61d5d', '#70f892', '#cfcfcf'];

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
		'color': colors[Math.floor(Math.random()*colors.length)],
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
			if (movement[key]['directionX'] == 0) {
				movement[key]['color'] = colors[Math.floor(Math.random()*colors.length)];
			}
			movement[key]['directionX'] = 1;
		} else if (letterRect.right > artworkRect.right+10) {
			if (movement[key]['directionX'] == 1) {
				movement[key]['color'] = colors[Math.floor(Math.random()*colors.length)];
			}
			movement[key]['directionX'] = 0;
		}

		if (letterRect.top < artworkRect.top-10) {
			if (movement[key]['directionY'] == 0) {
				movement[key]['color'] = colors[Math.floor(Math.random()*colors.length)];
			}
			movement[key]['directionY'] = 1;
		} else if (letterRect.bottom > artworkRect.bottom+10) {
			if (movement[key]['directionY'] == 1) {
				movement[key]['color'] = colors[Math.floor(Math.random()*colors.length)];
			}
			movement[key]['directionY'] = 0;
		}

		letter.style.color = movement[key]['color'];
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

	movement[key]['speed'] = Math.random()*3+1,
	movement[key]['color'] = colors[Math.floor(Math.random()*colors.length)];
}

// Voice sampler ("Animalese")
const voiceSamplerLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];
const notes = ['C3', 'E3', 'G3'];
let voiceSamplers = {}
for (let letter of voiceSamplerLetters) {
	voiceSamplers[letter] = new Tone.Sampler({
		urls: {
			C2: `voice-${letter}.mp3`
		},
		baseUrl: "assets/voice/",
		volume: -5,
	}).toDestination();
}
function playVoice(letter) {
	letter = letter.toLowerCase();
	if (letter != " " && voiceSamplerLetters.includes(letter)) {
		voiceSamplers[letter].triggerAttackRelease(notes[Math.floor(Math.random()*notes.length)], 1);
	}
}

// Add hover effects for audio
document.addEventListener('click', addSoundEffects);
function addSoundEffects() {
	document.removeEventListener('click', addSoundEffects);
	for (let letter of titleLetters) {
		letter.addEventListener('mouseenter', () => {playVoice(letter.innerText)});
	}
}