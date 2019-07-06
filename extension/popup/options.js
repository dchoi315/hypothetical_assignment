

var addCategoryBtn = document.getElementById('add');
var removeCategoryBtn = document.getElementById('remove');
var pointBtn = document.getElementById('point');
var percentBtn = document.getElementById('percent');
var calcBtn = document.getElementById('calc');

addCategoryBtn.addEventListener('click', function(){
	var category_table = document.getElementById('category_table');
	var rows = document.getElementById("category_table").getElementsByTagName("tr").length
	if (rows <=10){
		let new_row = category_table.insertRow(-1);
		let category_data = new_row.insertCell(0);
		let percent_data = new_row.insertCell(1);

		category_data.appendChild(document.createElement('input'));
		percent_data.appendChild(document.createElement('input'));
	} else{
		alert("Too many categories")
	}});
removeCategoryBtn.addEventListener('click', function(){
	var rows = document.getElementById("category_table").getElementsByTagName("tr").length
	if (rows > 2){
		category_table.deleteRow(-1);
	} else{
		alert("Must have at least one Category")
	}});


pointBtn.addEventListener('click', function(){
	document.getElementById('categories').style.display ='none';
	document.getElementById('assignment_category').textContent = "Denominator: ";
	
});
percentBtn.addEventListener('click', function(){
	document.getElementById('categories').style.display = 'block';
	document.getElementById('assignment_category').textContent = "Category: ";

});
function makeConfig(){
	gradeType = document.getElementById('point').checked ? "point" : "percent";
	config = {
		gradeType : gradeType,
		desiredGrade : parseFloat(document.getElementById('desiredgrade').value),
	};
	
	if (gradeType == 'point')
		config["info"] = parseFloat(document.getElementById('necessary_info').value)
	else 
		config["info"] = document.getElementById('necessary_info').value;
	categories = {}

	if (gradeType == 'percent'){
		var category_table = document.getElementById('category_table');
		var rowArray = Array.from(category_table.rows).splice(1,category_table.rows.length);

		rowArray.forEach(tr => {
			categories[tr.cells[0].getElementsByTagName('input')[0].value] = parseInt(tr.cells[1].getElementsByTagName('input')[0].value, 10);
		});
		config["percentage"] = categories;
	} 
	return config
}

calcBtn.addEventListener('click', function(){
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		console.log(tabs[0].url);
		config = makeConfig();
		chrome.tabs.sendMessage(tabs[0].id, config, (response)=> {
			console.log(response.grade);
			document.getElementById('finalgrade').textContent = response.grade;
		});;
	});
});

document.addEventListener("DOMContentLoaded", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    if(tabs[0].url.indexOf("https://ps01.bergen.org/guardian/scores.html")>=0) {
      document.getElementById("options").style.display = "block";
    } else{

      document.getElementById("wrong_page").style.display = "block";
    }
  });
});





