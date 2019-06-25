
var category_table = document.getElementById('category_table');
var addCategoryBtn = document.getElementById('add');
var removeCategoryBtn = document.getElementById('remove');
var pointBtn = document.getElementById('point');
var percentBtn = document.getElementById('percent');

addCategoryBtn.addEventListener('click', function(){
	var rows = document.getElementById("category_table").getElementsByTagName("tr").length
	if (rows <=5){
		let new_row = category_table.insertRow(-1);
		let category_data = new_row.insertCell(0);
		let percent_data = new_row.insertCell(1);

		category_data.appendChild(document.createElement('input'));
		percent_data.appendChild(document.createElement('input'));
	} else{
		alert("Too many categories")
	}


});
removeCategoryBtn.addEventListener('click', function(){
	var rows = document.getElementById("category_table").getElementsByTagName("tr").length
	if (rows > 1){
		category_table.deleteRow(-1);
	} else{
		alert("Must have at least one Category")
	}
});


pointBtn.addEventListener('click', function(){
	document.getElementById('categories').style.display ='none';
});
percentBtn.addEventListener('click', function(){
	document.getElementById('categories').style.display = 'block';
});




