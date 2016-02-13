var lastTime;

var getUrl = function () {chrome.tabs.query({"active": true}, function(tabs){
	var currentUrl =  tabs[0].url;
	console.log(currentUrl);
	return currentUrl;
})};

chrome.tabs.onActivated.addListener(function(tabs){
	var currentUrl = getUrl();
	if(lastTime){
		var temp = new Date();
		var temp_s = temp.getTime();
		var diff = temp_s - lastTime;

		lastTime = temp_s;
		
		console.log(diff);
	}
	else{
		var temp = new Date();
		var temp_s = temp.getTime();
		lastTime = temp_s;
		// console.log("starting timer: " + temp_s);
	}
});