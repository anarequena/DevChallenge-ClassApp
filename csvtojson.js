/* 	Author: Ana Carolina Requena Barbosa
	ClassApp DevChallenge https://gist.github.com/lucas-brito/84a77f08115ae4b9b034c010ff2a2ab4
	*/

var csv = require("fast-csv");
var csvElements = [];
var Element = new Object;
var myJSON;
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
function instElement(data){
	var elemento = {};
	
	elemento.fullname = data['0'];
	
	elemento.eid = data['1'];
	
	elemento.classes = new Array();
	elemento.classes.push(data['2']);
	elemento.classes.push(data['3']);
	
	elemento.addresses = new Array();
	elemento.addresses.push(typeAdress(data['4'], 4));
	elemento.addresses.push(typeAdress(data['5'], 5));
	elemento.addresses.push(typeAdress(data['6'], 6));
	elemento.addresses.push(typeAdress(data['7'], 7));
	elemento.addresses.push(typeAdress(data['8'], 8));
	elemento.addresses.push(typeAdress(data['9'], 9));
	
	if(data['10'] === 0) elemento.invisible = true;
	else elemento.invisible = false;
	
	if(data['11'] === 'yes') elemento.see_all = true;
	else elemento.see_all = false;
	
	return elemento;
}

// update an existing element with new info given
function updateElement(data, index){
	csvElements[index].classes.push(data['2']);
	csvElements[index].classes.push(data['3']);
	csvElements[index].addresses.push(typeAdress(data['4'], 4));
	csvElements[index].addresses.push(typeAdress(data['5'], 5));
	csvElements[index].addresses.push(typeAdress(data['6'], 6));
	csvElements[index].addresses.push(typeAdress(data['7'], 7));
	csvElements[index].addresses.push(typeAdress(data['8'], 8));
	csvElements[index].addresses.push(typeAdress(data['9'], 9));
	
	if(data['10'] === 0) csvElements[index].invisible = true;
	else csvElements[index].invisible = false;

	if(data['11'] === 'yes') csvElements[index].see_all = true;
	else csvElements[index].see_all = false;
}

// check if theres a existing element with the same id
function eidCheck(eid){
	var index = -1;
	csvElements.findIndex(function(value, key){
		if(value.eid === eid)
			index = key;
	});
	return index;
}

csv
 .fromPath("input.csv")
 .on("data", function(data){
	// the first line contains the headers 
	if(i === 0) {
		header = data;
	} else {
		var index = eidCheck(data['1']);
		// if theres no existing element with the eid, creates new element
		if(index === -1){
			Element = instElement(data);
			csvElements.push(Element);
		}
		// update existing element
		else {
			updateElement(data, index);
		}
	}
	i++;
 })
 .on("end", function(){
	
	myJSON = JSON.stringify(csvElements, null, 2);
    var fs = require('fs');
		fs.writeFile('output.json', myJSON, function (err){
		if(err) throw err;
	});
 });
