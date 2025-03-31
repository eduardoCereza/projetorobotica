let container = document.querySelector(".container");
let container2 = document.querySelector(".container2");
let btn = document.getElementById("spin");
let btn2 = document.getElementById("spin1");
let number = Math.ceil(Math.random() * 1000);

btn.onclick = function () {
	container.style.transform = "rotate(" + number + "deg)";
	number += Math.ceil(Math.random() * 1000);
}

btn2.onclick = function () {
	container2.style.transform = "rotate(" - number + "deg)";
	number += Math.ceil(Math.random() * 1000);
}