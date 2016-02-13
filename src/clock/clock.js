var clock = $('.your-clock').FlipClock({
// ... your options here
});

//for second timing
var myVar = setInterval(sync, 1000);

function sync(){
	chrome.storage.local.get("totalTime", function(data){
		console.log(data);
		clock.setTime(data.totalTime);
	});
};
