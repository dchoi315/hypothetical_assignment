function getCategories(assignments){
	allCategories = new Set();

	console.log(assignments)
	assignments.forEach(tr => {
		categoryName = tr.cells[1].textContent.trim();
		allCategories.add(categoryName);

	});

	categoryobj = {}
	allCategories.forEach(item =>{
		categoryobj[item] = [0,0];
	});
	return categoryobj;
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

function calculatePercent(assignments, desiredGrade, task_category, percentage_info){
	finalGrade = 0;
	averages = getCategories(assignments);
	assignments.forEach(tr => {
		category = tr.cells[1].textContent.trim();
		score = parseFloat(tr.cells[11].textContent.trim());
		averages[category][0] += score;
		averages[category][1] += 1;

	});
 	var averages_array = Object.entries(averages);
 	console.log(averages_array);

 	answer = desiredGrade;
 	for (const [category, stats] of averages_array){
 		
 		if (category != task_category){

 			answer-=(stats[0]/stats[1]) * (percentage_info[category]/100);
 		} else {
 			stats[1]+=1
 		}
	}
	console.log(answer);
	for (const [category, stats] of averages_array){
 		if (category==task_category){
 			answer*= stats[1];
 			answer/= (percentage_info[category]/100);
 			answer-= stats[0];
 		}
	}
	return answer;
}


const ob = new MutationObserver(records => {
	const table = document.getElementById("scoreTable");
	if (table){
		ob.disconnect();

		assignments = Array.from(table.childNodes[6].getElementsByTagName("tr"));
		assignments.pop();


		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

			if(request.gradeType == 'percent'){
				
				answer = Math.round(calculatePercent(assignments, request.desiredGrade, request.info, request.percentage)*100)/100 + "%";
				sendResponse({grade : answer});
			} else{
				answer = Math.round(calculatePoints(assignments, request.desiredGrade, request.info)*100)/100 + "/" + request.info;
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



