function saveText(){
	var customText = document.getElementById("customText").value;
	browser.storage.local.set({"default": customText});
}

function getPlaceholderText(){
	browser.storage.local.get("default")
	.then(function(storedValue) {
		if(Object.keys(storedValue).length === 0){
			document.getElementById("customText").value = "Please select default text.";
		} else {
			document.getElementById("customText").value = storedValue.default;
		}
	});
}

function changeText(){
	var selection = document.getElementById("messageSelection").value;
	browser.storage.local.get(selection).then( (storedValue) => {
		console.log(selection, storedValue);
		var textArea = document.getElementById("customText")
		if (Object.keys(storedValue).length === 0){
			textArea.value = "Please add text.";
		} else {
			textArea.value = storedValue[selection];
		}
	})
}

function getMessageText(){
	console.log("getText():")
	browser.storage.local.get("text")
	.then(function(storedValue) {
		var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
		console.log(storedValue.text);
		gettingActiveTab.then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {'text' : storedValue.text});
		});
	});
}

function deschideAnunturi(){
	var nrTab = document.getElementById("nrTab").value;
	console.log(nrTab);
	if(nrTab !== ""){
		var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
		gettingActiveTab.then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {'get' : nrTab});
		});
	} else {
		document.getElementById("error").textContent = "Please enter the number of tabs!";
	}
}

function onGet(response){
	try{ 
		if(response.urls !== "undefined"){
			console.log("try");
			for(var i=0; i < response.urls.length; i++){
				browser.tabs.create({
					url: response.urls[i]
				}).then(function(){console.log("created new tabs: ", i)});
			}
		}
	}
	catch(err){
		console.log("catch1");
		if(response.error !== "undefined") {
			console.log("catch2");
			document.getElementById("error").textContent = "Please enter a category page!";
		}
	}
}

getPlaceholderText();

document.getElementById("textButton").addEventListener("click", saveText);

document.getElementById("open").addEventListener("click", deschideAnunturi);

document.getElementById("messageSelection").addEventListener("change", changeText);

browser.runtime.onMessage.addListener(onGet);


