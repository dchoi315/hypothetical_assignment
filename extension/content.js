function getCategories(assignments){
	allCategories = new Set();

	console.log(assignments)
	assignments.forEach(tr => {
		categoryName = tr.cells[1].textContent.trim();
		allCategories.add(categoryName);

	});
	return allCategories;
}

function calculatePoints(assignments, desiredGrade, denominatorGrade){
	topSum = 0;
	bottomSum = 0;

	assignments.forEach(tr => {
		fraction = tr.cells[10].textContent.trim().split("/");
		if (fraction[0] !== "--") {
			topSum += parseFloat(fraction[0]);
			bottomSum += parseFloat(fraction[1]);
		}
	});
	answer = ((bottomSum + denominatorGrade)*(desiredGrade/100)) - topSum; 
	return answer
}

function calculatePercent(assignments, percentage){

	finalGrade = 0;
	assignments.forEach(tr => {
		category = tr.cells[1].textContent.trim();
		score = tr.cells[11].textContent.trim();

		finalGrade += score * (percentage[category]/100);
	});


	return finalGrade;
}





const ob = new MutationObserver(records => {
	const table = document.getElementById("scoreTable");
	if (table){
		ob.disconnect();

		assignments = Array.from(table.childNodes[6].getElementsByTagName("tr"));
		assignments.pop();


		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

			if(request.gradeType == 'percent'){
				
				answer = calculatePercent(assignments, request.percentage);
				sendResponse({grade : answer});
			} else{
				answer = calculatePoints(assignments, request.desiredGrade, request.denominator);
				sendResponse({grade : answer});
			}
		});

		
	}
});


ob.observe(
	document.querySelectorAll('div.xteContentWrapper')[0],
	{
		childList:true,
		subtree: true,
	}
);



