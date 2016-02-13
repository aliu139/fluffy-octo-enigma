var lastTime;
var lastPage = "not";
var totalTime = 0;

var getUrl = function (callback) {chrome.tabs.query({"active": true}, function(tabs){
	var currentUrl =  tabs[0].url;
	callback(currentUrl);
})};

var isFB = function(input) {
	if((input.indexOf("www.facebook.com/") != -1)){
		return true;
	}
	return false;
}

chrome.tabs.onActivated.addListener(function(tabs){
	var url = getUrl(function(currentUrl){
		var temp = new Date();
		var temp_s = temp.getTime();

		if(isFB(currentUrl) && !isFB(lastPage)){
			lastTime = temp_s;
			lastPage = currentUrl;
		}
		else if (!isFB(currentUrl) && isFB(lastPage)){
			var diff = temp_s - lastTime;
			lastTime = temp_s;
			
			console.log(diff);
			totalTime = totalTime + diff;
			console.log("Total time: " + totalTime);
			lastPage = currentUrl;
		}
	});
});