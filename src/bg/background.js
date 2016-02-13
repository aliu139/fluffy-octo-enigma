var lastTime;
var lastPage = "not";
var totalTime = 0;

var stillOnFb = false;

var maxTime = 4000;

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
		var temp = new Date();
		var temp_s = temp.getTime();

		if(isFB(currentUrl) && !isFB(lastPage)){
			lastTime = temp_s;
			lastPage = currentUrl;

			if (totalTime > maxTime){
				alert('Stop looking at FB');
			}
		}
		else if (!isFB(currentUrl) && isFB(lastPage)){
			var diff = temp_s - lastTime;
			lastTime = temp_s;
			
			console.log(diff);
			totalTime = totalTime + diff;
			console.log("Total time: " + totalTime);
			chrome.storage.sync.set({'time': totalTime}, function() {
          		// Notify that we saved.
          		// message('Settings saved');
          		console.log("time set as " + totalTime);
        	});
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
			}
			stillOnFb = false;
		})
	});
};