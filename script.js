
const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [

    
    
    {
        album: "LUNACYCL",
        emblem:"ITS WHATEVER",
        "bg-color": ["#0396ff", "#0d1827" ],
        url: ("./Assets/LunaCycl.png"),
        spotify: "https://open.spotify.com/embed/track/0f20GiYBaneT3eCmrsd4Qf?utm_source=generator"

    },

    {
        album: "Let U Go",
        emblem:"You said you'd never leave",
        "bg-color": ["#0396ff", "#0d1827" ],
        url: ("./Assets/LucidBeatz.png"),
        spotify:"https://open.spotify.com/embed/track/40TZnaw4eDPChJNHw2Swf3?utm_source=generator" 
    },

    {
        album: "SO INNOCENT",
        emblem:"ANGEL FACE",
        "bg-color": ["#0396ff", "#0d1827" ],
        url: ("./Assets/Shiloh.png"),
        spotify: "https://open.spotify.com/embed/track/39a71gpKs8VUTIfsS52tJO?utm_source=generator"  
    },

    {
        album: "ONE DANCE",
        emblem:"YOU KNOW THAT I DONT PLAY",
        "bg-color": ["#0396ff", "#0d1827" ],
        url: ("./Assets/Slime.png"),
        spotify: "https://open.spotify.com/embed/track/3oMiOuEGrVGjkQ3JDjcUFI?utm_source=generator"  
    },

    {
        album: "ON & ON",
        emblem:"MY LIFE IT KEEPS MOVING LIKE A ROLLING STONE",
        "bg-color": ["#0396ff", "#0d1827" ],
        url: ("./Assets/Badu1.png"),
        spotify:  "https://open.spotify.com/embed/track/0tNuJpBgtE65diL6Q8Q7fI?utm_source=generator"  
    },

    {
        album: "DIDNT CHA KNOW",
        emblem:"LIFE IS LIKE THAT SOMETIMES",
        "bg-color": ["#0396ff", "#0d1827" ],
        url: ("./Assets/Badu2.png"),
        spotify: "https://open.spotify.com/embed/track/7pv80uUHfocFqfTytu1MVi?utm_source=generator" 
    },

    {
        album: "FROM MY HEART AND MY SOUL",
        emblem:"VIBE OUT",
        "bg-color": ["#0396ff", "#0d1827" ],
        url: ("./Assets/Terrace.png"),
        spotify: "https://open.spotify.com/embed/track/1G3T5V2s3fKF0jhSjr2ZjQ?utm_source=generator"
    },

    {
        album: "FLIGHT OF THE NAVIGATOR",
        emblem:"A TRIP TO STARS",
        "bg-color": ["#0396ff", "#0d1827" ],
        url: ("./Assets/Childish.png"),
        spotify: "https://open.spotify.com/embed/track/5k8eNtmqlKe21qjIFIp1Du?utm_source=generator" 
    },

    {
        album: "DROP TOP",
        emblem:"HUNNNHHHHH",
        "bg-color": ["#0396ff", "#0d1827" ],
        url: ("./Assets/Anycia.png"),
        spotify:"https://open.spotify.com/embed/track/5LF0f602GWSAxZfmwRvUUI?utm_source=generator"   

    },

    {
        album: "RUNNING LATE",
        emblem:"CONCRETE",
        "bg-color": ["#0396ff", "#0d1827" ],
        url: ("./Assets/Karah.png"),
        spotify: "https://open.spotify.com/embed/track/1CwnEKPRLebumbHmZ3yZly?utm_source=generator" 
    }
]

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
	heroDiv.classList.remove("album-transition");
	document.addEventListener("keydown", handleKeyScroll);
	scrollLeft.disabled = false;
	scrollRight.disabled = false;
	scrollLeft.classList.remove("key-press-hover-left");
	scrollRight.classList.remove("key-press-hover-right");

	for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
	if (index + val >= 0 && index + val < albums.length) {
		updateDisplay((index += val));
	}
};

const handleKeyScroll = (e) => {
	if (e.key == "ArrowLeft") {
		scrollLeft.classList.add("key-press-hover-left");
		handleClickScroll(-1);
	}
	if (e.key == "ArrowRight") {
		scrollRight.classList.add("key-press-hover-right");
		handleClickScroll(1);
	}
};
let index = 0; 



const updateDisplay = (index) => {
	let DELIMITER = "";

	const album = albums[index];

	for (const text of texts) text.classList.remove("show-texts");
	emblemDiv.innerHTML = "";
	scrollLeft.disabled = true;
	scrollRight.disabled = true;
	document.removeEventListener("keydown", handleKeyScroll);

	sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
	bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
	heroDiv.style.backgroundImage = `url(${album.url})`;
	albumTitleSpan.textContent = album.album;
	spotifyWidget.src = album.spotify;

	const number = index + 1;
	albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
	albumNum.style.color = album["accent-color"];

	if (index === 9) scrollRight.classList.add("hide-arrow");
	else scrollRight.classList.remove("hide-arrow");

	createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
		emblemDiv.append(node)
	);

	heroDiv.classList.add("album-transition");
};


const createEmblem = (string, delimiter = "•") => {
	const spans = [];

	string = string.trim().replaceAll(" ", delimiter) + delimiter;
	const numChars = string.length;
	const degVal = 90 / (numChars / 4);

	string.split("").forEach((char, idx) => {
		const span = document.createElement("span");
		span.innerText = char;
		span.style.transform = `rotate(${180 - degVal * idx}deg)`;
		if (char === delimiter) span.style.color = albums[index]["accent-color"];
		spans.push(span);
	});

	return spans;
};

updateDisplay(index);