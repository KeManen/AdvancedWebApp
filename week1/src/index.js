if(document.readyState !== "loading") init()
else document.addEventListener("DOMContentLoaded", init)


function init (){
	fetch("https://dog.ceo/api/breeds/list")
		.then((res) => res.json())
		.then(async (data)=>{
			let dogs = data.message.splice(0,5)
			for (let breed of dogs) {
				let image = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`).then((res)=>res.json());
				let wikiJson = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`).then((res)=> res.json());
				createWikiElement(breed, wikiJson['extract'], image.message);
			}
		}).catch(err => console.log(err));
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
	
	header.innerHTML = headerText;
	text.innerHTML = wikiText;
	img.src = imageSrc;

	item.appendChild(header);
	item.appendChild(content);
	content.appendChild(text);
	content.appendChild(imgcontainer);
	imgcontainer.appendChild(img);

	document.getElementById("app").appendChild(item);
}
