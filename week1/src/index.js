import "./styles.css";

if (document.readyState !== "loading") {
	initializeCode();
} else {
	document.addEventListener("DOMContentLoaded", function () {
		initializeCode();
	});
}

async function initializeCode() {
	let dogs = ["affenpinscher", "african", "airedale", "akita", "appenzeller"];
	for (let breed of dogs) {
		let image = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
			.then((res) => res.json())
			.catch((err) => console.log(err));
		let wikiJson = await fetch(
			`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`
		)
			.then((res) => res.json())
			.catch((err) => console.log(err));
		createWikiElement(breed, wikiJson["extract"], image.message);
	}
}

function createWikiElement(headerText, wikiText, imageSrc) {
	let item = document.createElement("div");
	let header = document.createElement("h1");
	let content = document.createElement("div");
	let text = document.createElement("p");
	let imgcontainer = document.createElement("div");
	let img = document.createElement("img");

	item.className = "wiki-item";
	header.className = "wiki-header";
	content.className = "wiki-content";
	text.className = "wiki-text";
	imgcontainer.className = "img-container";
	img.className = "wiki-img";

	header.innerText = headerText;
	text.innerText = wikiText;
	img.src = imageSrc;

	item.appendChild(header);
	item.appendChild(content);
	content.appendChild(text);
	content.appendChild(imgcontainer);
	imgcontainer.appendChild(img);

	document.getElementById("app").appendChild(item);
}
