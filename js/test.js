
testOus = {organisationUnits: 
[
{
name: "Província de Cuanza-Norte",
id: "yRqJG7DoimT"
},
{
name: "Província de Malange",
id: "TFqReCyXfvb"
},
{
name: "Província de Lunda-Norte",
id: "BIfhhZKD1Qv"
},
{
name: "Província de Namibe",
id: "Pgm9VeU7yuj"
},
{
name: "Angola",
id: "Pfy7gorG7pR"
},
{
name: "Província de Uíge",
id: "H2V3Bstv3Fc"
},
{
name: "Província de Lunda-Sul",
id: "q4ZAkSiLdsd"
},
{
name: "Província de Zaire",
id: "Pu5Tzt9z1ak"
}
]}

testOus.organisationUnits.sort(function(a,b){
	var nameA = a.name.toUpperCase();
	var nameB = b.name.toUpperCase();

	if (nameA < nameB){
		return -1;
	}

	if (nameA > nameB){
		return 1;
	}

	return 0;

})

console.log(testOus.organisationUnits)

for (var i = 0; i < testOus.organisationUnits.length; i++){
	console.log(testOus.organisationUnits[i].id + " " + testOus.organisationUnits[i].name)
}