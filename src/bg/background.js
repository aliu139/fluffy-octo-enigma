var lastTime;
var lastPage = "not";
var totalTime = 0;

var stillOnFb = false;

var maxTime = 30;

var getUrl = function (callback) {chrome.tabs.query({"active": true}, function(tabs){
	var currentUrl =  tabs[0].url;
	callback(currentUrl);
})};

var isWebsite = function(web, input) {
	if((input.indexOf(web) != -1)){
		return true;
	}
	return false;
};

var isFB = function(input) {
	return isWebsite("www.facebook.com/", input);
};

chrome.tabs.onActivated.addListener(function(tabs){
	var url = getUrl(function(currentUrl){
		if(isFB(currentUrl) && !isFB(lastPage)){
			lastPage = currentUrl;
		}
		else if (!isFB(currentUrl) && isFB(lastPage)){
			lastPage = currentUrl;
		}

	});
});

//for second timing
var myVar = setInterval(myTimer, 1000);

function myTimer() {
	chrome.tabs.getCurrent(function(tab){
		var url = getUrl(function(currentUrl){
			if (isFB(currentUrl) && isFB(lastPage)){
				stillOnFb = true;
				console.log("still true");
				totalTime+=1;

				if (totalTime > maxTime){
					alert('Stop looking at FB');
				}
			}
			stillOnFb = false;
		})
	});
};