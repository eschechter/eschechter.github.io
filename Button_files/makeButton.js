var para = $("#button");
	para.click(updateName)
	function updateName(){
		var text = prompt('Enter some text, dingus.');
		para.text(text)
	}