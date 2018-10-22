var para = $("#button");
	para.click(updateName)
	function updateName(){
		var text = prompt("Change the button's text.");
		para.text(text)
	}