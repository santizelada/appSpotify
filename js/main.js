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
        album: "The Fame Monster",
        emblem: "You and me could write a Bad Romance",
        "bg-color": ["#0396FF", "#0D1827"],
		"accent-color": "#0396FF",
        url: "https://images.squarespace-cdn.com/content/v1/5a0dd6831f318dcf5130a0d5/1546411876363-NCRFFAUYD2BCF901AF8Y/lady+gaga+bad+romance+black",
        spotify: "https://open.spotify.com/embed/track/0SiywuOBRcynK0uKGWdCnn?utm_source=generator"

    },

	{
		album: "A star is born",
		emblem: "Don't call my name, Ale-Alejandro",
		"bg-color": ["#727272", "#0D1827"],
		"accent-color": "#727272",
		url: "https://variety.com/wp-content/uploads/2018/11/lady-gaga-1-16x9.jpg",
		spotify:
			"https://open.spotify.com/embed/track/2VxeLyX666F8uXCJ0dZF8B?utm_source=generator"
	},
	{
		album: "SVZ",
		emblem: "Life is better with music",
		"bg-color": ["#f687ff", "#0D1827"],
		"accent-color": "#f687ff",
		url:
			"https://assets.change.org/photos/7/lx/kt/URLXKtgdEfMwntg-1600x900-noPad.jpg?1630125996",
		spotify:
            "https://open.spotify.com/embed/track/41A89rj3GoMG6ktN37L7PG?utm_source=generator"

	},
];

scrollLeft.addEventListener("click", () => handleClickScroll (-1));
scrollRight.addEventListener("click", () => handleClickScroll (1));

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
    if(index + val >= 0 && index + val < albums.length){
        updateDisplay((index += val));
    }
};

const handleKeyScroll = (e) => {
        if(e.key == "ArrowLeft") {
                scrollLeft.classList.add("key-press-hover-left");
                handleClickScroll (-1);
        }
        if(e.key == "ArrowRight") {
            scrollLeft.classList.add("key-press-hover-right");
            handleClickScroll (1);
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
        bodyContainer.style.background = `linear-gradient(180deg, ${album ["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
        heroDiv.style.backgroundImage = `url(${album.url})`;
        albumTitleSpan.textContent = album.album;
        spotifyWidget.src = album.spotify;
        
        const number = index + 1;
        albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
        albumNum.style.color = album["accent-color"];

        if(index === 3) scrollRight.classList.add("hide-arrow");
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













