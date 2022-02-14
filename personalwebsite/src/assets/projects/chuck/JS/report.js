function loadQuote() {
	const divQuote = document.getElementById("quote");
	for(let i=0; i<localStorage.length; i++){
		const joke = JSON.parse(localStorage.getItem('joke'));
		divQuote.innerHTML += `<q> ${joke} <q>`
	}
}

function goBack() {
	localStorage.clear();
	location.assign("./chuck.html");
}
