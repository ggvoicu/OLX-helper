function changeText(){
	var selection = document.getElementById("messageSelection").value;
	browser.storage.local.get(selection).then( (storedValue) => {
		console.log(selection, storedValue);
		var textArea = document.getElementById("textAreaSelection")
		if (Object.keys(storedValue).length === 0){
			textArea.value = "Please add text.";
		} else {
			textArea.value = storedValue[selection];
		}
	})
}

function saveText(){
	var selection = document.getElementById("messageSelection").value;
	var textArea = document.getElementById("textAreaSelection").value;
	console.log(selection , textArea);
	browser.storage.local.set({ [selection] : textArea});
}

function saveDefault(){
	var textArea = document.getElementById("textAreaSelection").value;
	browser.storage.local.set({"default": textArea})
}

document.getElementById("messageSelection").addEventListener("change", changeText);
document.getElementById("saveText").addEventListener("click", saveText);
document.getElementById("makeDefault").addEventListener("click", saveDefault);
window.addEventListener("load", changeText);