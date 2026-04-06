// mouse
let container = document.querySelector('.info');
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