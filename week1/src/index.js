import "./styles.css";

window.onload = () => {	
	fetch("https://dog.ceo/api/breeds/list").then((res) => res.json()).then((data)=>console.log(data));
	
	/*
	dogs.forEach((breed) => {
		let image = fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
		let wikitext = fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`).then((res=> res.json)).extract;


	}
	);
	*/
	
	
}

function createWikiElement(headerText, wikiText, imageSrc){
	let item = document.createElement("div");
	let header = document.createElement("h1");
	let content = document.createElement("div");
	let text = document.createElement("p");
	let imgcontainer = document.createElement("div");
	let img = document.createElement("img");
	
	item.className = "wiki-item";
	header.className="wiki-header";
	content.className="wiki-content";
	text.className="wiki-text";
	imgcontainer.className="img-container";
	img.className="wiki-img";
	
	header.innerHtml = headerText;
	text.innerHtml = wikiText;
	img.src = imageSrc;

	item.appendChild(header);
	item.appendChild(content);
	content.appendChild(text);
	content.appendChild(imgcontainer);
	container.appendChild(img);

	document.getElementById("app").appendChild(item);
}
