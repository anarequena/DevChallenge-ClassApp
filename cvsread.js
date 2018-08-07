var csv = require("fast-csv");
var csvElements = [];
var Element = new Object;
var myJSON = [];
var header = [];
var i = 0;

// instanciate new types of adresses
function typeAdress(data, index){
	var add = {};
	
	if(index === 4){
		add.type = "email";
		add.tags = new Array();
		add.tags.push("Responsável");
		add.tags.push("Pai");
		add.address = data;
	} else if(index === 5){
		add.type = "phone";
		add.tags = new Array();
		add.tags.push("Pai");
		add.address = data;
	} else if(index === 6){
		add.type = "phone";
		add.tags = new Array();
		add.tags.push("Responsável");
		add.tags.push("Mãe");
		add.address = data;
	} else if(index === 7){
		add.type = "email";
		add.tags = new Array();
		add.tags.push("Mãe");
		add.address = data;
	} else if(index === 8){
		add.type = "email";
		add.tags = new Array();
		add.tags.push("Aluno");
		add.address = data;
	} else if(index === 9){
		add.type = "phone";
		add.tags = new Array();
		add.tags.push("Aluno");
		add.address = data;
	}
	
	return add;
}

// instanciate a new Element
function instElement(line){
	Element.fullname = line['0'];
	
	Element.eid = line['1'];
	
	Element.classes = new Array();
	Element.classes.push(line['2']);
	Element.classes.push(line['3']);
	
	Element.addresses = new Array();
	Element.addresses.push(typeAdress(line['4'], 4));
	Element.addresses.push(typeAdress(line['5'], 5));
	Element.addresses.push(typeAdress(line['6'], 6));
	Element.addresses.push(typeAdress(line['7'], 7));
	Element.addresses.push(typeAdress(line['8'], 8));
	Element.addresses.push(typeAdress(line['9'], 9));
	
	if(line['10'] === 0) Element.invisible = true;
	else Element.invisible = false;
	
	if(line['11'] === 'yes') Element.see_all = true;
	else Element.see_all = false;
	
	return Element;
}


csv
 .fromPath("input.csv")
 .on("data", function(data){
	// the first line contains the headers 
	if(i === 0) {
		header = data;
	} else {
		Element = instElement(data);
		csvElements.push(Element);
		myJSON.push(JSON.stringify(Element, null, 2));
	}
	i++;
 })
 .on("end", function(){
    var fs = require('fs');
		fs.writeFile('output.json', myJSON, function (err){
		if(err) throw err;
	});
 });
