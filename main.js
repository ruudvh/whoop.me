function randomWhoop (){
	// Giphy API defaults
	const giphy = {
		baseURL: "https://api.giphy.com/v1/gifs/",
		apiKey: "84VkoWRKJvbY7GVDrh1cImrQFAaCRSA9",
		tag: "zoidberg", // funny, fail, etc
		type: "random", //random, trending -> doens't work with trending yet, returns array instead of single gif
		rating: "pg-13",
		limit: 1
	};

	// Giphy API URL
	let giphyURL = encodeURI(
		giphy.baseURL +
		giphy.type +
		"?api_key=" +
		giphy.apiKey +
		"&tag=" +
		giphy.tag +
		"&rating=" +
		giphy.rating +
		"&limit=" +
		giphy.limit
	);

	// Call Giphy API and render data
	let newGif = () => fetch(giphyURL)
		.then(response  => response.json())
		.then(data => renderGif(data.data))
		.catch((error) => {
		  console.error('Error:', error);
		});

	// Display Gif in gif wrap container
	const gif_wrap = document.getElementById("gifbg");
	let renderGif = _giphy => {
		// Static transition
		renderStatic();
		
		// Gif from Giphy
		gif_wrap.style.backgroundImage ='url("' + _giphy.images.original.url + '")';

		// Auto load new gif
		refreshGif();
	};

	// Static gif + sound
	const static_audio = new Audio('static/tv_audio.wav');
	static_audio.volume = 0.5;
	let renderStatic = () => {
		static_audio.play();
		gif_wrap.style.backgroundImage = 'url("./static/tv_static.gif")';
	};

	// Auto load new gif
	let refresh;
	const duration = 1000 * 10;
	let refreshGif = () => {
		clearInterval(refresh);
		refresh = setInterval(function () {
			newGif();
		}, duration);
	};

	newGif();
}

function textWobble() {
	// Text wobble effect
	// https://codepen.io/mallendeo/pen/zxRwWx
	const wobble_sentence = document.querySelector('.wobble-text');
	const h1 = wobble_sentence.querySelector('h1');
	const h2 = wobble_sentence.querySelector('h2');

	let wordsToArray = str => str.split('').map(e => e === ' ' ? '&nbsp;' : e);

	function insertSpan(elem, letters, startTime) {
	  elem.textContent = '';
	  let curr = 0;
	  let delay = 20;
	  for (let letter of letters) {
		let span = document.createElement('span');
		span.innerHTML = letter;
		span.style.animationDelay = ++curr / delay + (startTime || 0) + 's';
		elem.appendChild(span);
	  }
	}

	insertSpan(h1, wordsToArray(h1.textContent));
	insertSpan(h2, wordsToArray(h2.textContent), .5);
}

function playWhoop() {
	const wobble_text = document.getElementsByClassName("wobble-text");
	wobble_text[0].style.opacity = 1;
	
	const zoidberg_audio = new Audio('./static/zoidberg_whoop_whoop_whoop.mp3');
	zoidberg_audio.play();
	
	const gif_wrap = document.getElementById("gifbg");
	gif_wrap.style.backgroundImage = 'url("./static/zoidberg.gif")';
	
	const duration = 1000 * 5;
	setTimeout(function() {
	  wobble_text[0].style.opacity = 0;
	  zoidberg_audio.pause();
	}, duration);
}

window.onload = function mainFunction() {
	randomWhoop();
	textWobble();
}
