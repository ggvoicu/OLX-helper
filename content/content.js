function autoCompleteTextArea(){
	browser.storage.local.get("default").then( function(response){
		document.getElementById("ask-text").textContent = response.default;
	})
}

autoCompleteTextArea();

function urlCreator(response){
		var nrTab = response.get;
		var urls = [];
		try{
			for (i=0;i<nrTab;i++){
				urls[i] = document.getElementsByClassName("thumb detailsLink")[i].href;
			}
			browser.runtime.sendMessage({'urls': urls});
		}
		catch(err){
			console.log(err.message);
			browser.runtime.sendMessage({'error': 'Not on a category page!'});
		}
};

browser.runtime.onMessage.addListener(urlCreator)