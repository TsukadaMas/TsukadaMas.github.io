// localStorage.js
var typeOfJoke = [
	{"joke_type" : "nerdy", "url" : "http://api.icndb.com/jokes/random?limitTo=[nerdy]"},
	{"joke_type" : "explicit", "url" : "http://api.icndb.com/jokes/random?limitTo=[explicit]"}
	//{"joke_type" : "random", "url" : "http://api.icndb.com/jokes/random"}
];




function createList() {
	// build <option>s in select / create a label first option
	document.getElementById("selectBox").innerHTML = "<option value='random'>Select an Option</option>";

	
	for (let joke_type of typeOfJoke) {
		// Create in drop-down list
		document.getElementById("selectBox").innerHTML += `<option>${joke_type.joke_type}</option>`;

	}
}

function saveDataToLS(joke) {

	localStorage.setItem("joke", joke);
}

function CallApi(index) {
try {

    $.ajax({
        url: typeOfJoke[index].url,
        data : { format : 'json'},
        success: function(data) {
			let joke  = data.value.joke			   	
			saveDataToLS(JSON.stringify(joke));
        },
        error: function() {
            $('#info').html('<p> An error occured while processing your json request.');
        },
        dataType: 'jsonp',
        type :'GET'
    });

}
catch(err) {
	console.log(err.name + " " + err.message);
}
}

function RandomJoke() {
	
	
	try {
	
		$.ajax({
			url: "http://api.icndb.com/jokes/random",
			data : { format : 'json'},
			success: function(data) {
				  let joke  = data.value.joke			   	
				saveDataToLS(JSON.stringify(joke));
	
			},
			error: function() {
				$('#info').html('<p> An error occured while processing your json request.');
			},
			dataType: 'jsonp',
			type :'GET'
		});
	
	}
	catch(err) {
		console.log(err.name + " " + err.message);
	}
	
	}

function display() {

	 let index = document.getElementById("selectBox").selectedIndex;
	 if(index == 0){
	RandomJoke();
	 }else{
	CallApi(index-1);
	 }
	

	setTimeout(function(){ location.assign('./quote.html'); }, 3000); //3 millisecs wait..
	

}



