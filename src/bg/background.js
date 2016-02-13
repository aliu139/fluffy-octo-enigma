var getUrl = function () {chrome.tabs.query({"active": true}, function(tabs){
	var currentUrl =  tabs[0].url;
	console.log(currentUrl);
	return currentUrl;
})};

chrome.tabs.onActivated.addListener(function(tabs){
	var currentUrl = getUrl();
});