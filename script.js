// init numbers
function initNumbers() {
	let projects = document.querySelectorAll('.project');
	let i = 0;
	for (let project of projects) {
		let code = project.querySelector('.project-title-code');
		let number = Math.round(projects.length-i);
		if (number < 10) {
			code.innerHTML = "00"+number;
		} else if (number < 100) {
			code.innerHTML = "0"+number;
		} else {
			code.innerHTML = number;
		}
		i++;
	}
}
initNumbers();

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

// init sidebars
function initSidebars() {
	let projects = document.querySelectorAll('.project');
	let sidebarLeft = document.querySelector('.sidebar-left');
	let sidebarLeftTemp = "";
	let sidebarRight = document.querySelector('.sidebar-right');
	let sidebarRightTemp = "";
	let i=0;
	for (let project of projects) {
		let icon = project.querySelector('.project-icon');
		if (i < projects.length/2) {
			sidebarLeftTemp += `<div class="sidebar-icon"><img src="${icon.src}"></div>`;
		} else {
			sidebarRightTemp += `<div class="sidebar-icon"><img src="${icon.src}"></div>`;
		}
		i++;
	}
	sidebarLeft.innerHTML = sidebarLeftTemp;
	sidebarRight.innerHTML = sidebarRightTemp;
}
initSidebars();

// lazy load videos
const callback = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		let video = entry.target.querySelector('video');
		let videoSource = entry.target.querySelector('source');
		if (entry.isIntersecting) {
			videoSource.src = videoSource.dataset.src;
			video.pause();
			video.load();
		} else {
			if (videoSource != undefined) {
				videoSource.removeAttribute('src');
				video.pause();
				video.load();
			}
		}
	});
}, {
	root: null,
	rootMargin: '0px 0px 500px 0px', 
	threshold: 0.01
});
function lazyLoadVideos() {
	let projects = document.querySelectorAll('.project');
	for (let project of projects) {
		callback.observe(project);
	}
}
lazyLoadVideos();