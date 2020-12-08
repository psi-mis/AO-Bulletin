$( document ).ready( function() {
	//console.log('ready!')

	var fillYears = dhis2.report.periods;

	fillYears = fillYears.sort((a,b) => b-a);

	//console.log(fillYears);



	//var fillYears = ['2017','2018','2019','2020'];

	for (var i = 0; i < fillYears.length; i++) {
		$('#startYear').append('<option value="' + fillYears[i] + '">' + fillYears[i] + '</option>');
	}

	// to do on click

	$('#genReportButton').on('click', setVariables);

	document.title = 'Fonte: HNQIS – DHIS2';
	//document.lastModified = 'Data de elaboração: ' + new D
});


	// Report table global vars
	reportTablePlugin.url = "https://ao-dev.hnqis.org";
	chartPlugin.url = "https://ao-dev.hnqis.org";
	reportTablePlugin.loadingIndicator = true;
	chartPlugin.loadingIndicator = true;
	mapPlugin.url = "https://ao-dev.hnqis.org";


	// Get the selected  variables;
	//$('#genReportButton').on('click', setVariables);



	function setVariables() {

		// get variables from the form
		var selectedMonthValue = $('#startMonth-input').val();
		var selectedMonthName = $('#startMonth-input option:selected').text();


		var selectedYear = $('#startYear').val();

		var selectedProviceId = $('#province-select').val();
		var selectedProviceName = $('#province-select option:selected').text();

		//console.log(selectedProviceName);

		// Period option
		var dhis2Period = selectedYear+selectedMonthValue;

		// Table / Chart Options
		//var reportTable1Title = 'Tabela 1: Número de provedores supervisionados, ' + selectedMonthName + ' ' + selectedYear;
		var reportTable1Title = 'Tabela 1: Número de provedores supervisionados'; // + selectedMonthName + ' ' + selectedYear;
		//var chart1Title = 'Gráfico 1: Pontuação total provincial por guião de supervisão, ' + selectedMonthName + ' ' + selectedYear;
		var chart1Title = 'Gráfico 1: Pontuação total provincial por guião de supervisão'; // + selectedMonthName + ' ' + selectedYear;

		//var reportTable2Title = 'Tabela 2: Pontuação Média Guiões de Supervisão por Municípios, ' + selectedMonthName + ' ' + selectedYear;
		var reportTable2Title = 'Tabela 2: Pontuação Média Guiões de Supervisão por Municípios'; // + selectedMonthName + ' ' + selectedYear;

		//var reportTable3Title = 'Tabela 3: Pontuação Média Guiões de Supervisão por Unidades de Saúde, ' + selectedMonthName + ' ' + selectedYear;
		var reportTable3Title = 'Tabela 3: Pontuação Média Guiões de Supervisão por Unidades de Saúde'; // + selectedMonthName + ' ' + selectedYear;

		//var totalSupervisionsTitle = 'Numero total de US supervisionadas (todos guiões), ' + selectedMonthName + ' ' + selectedYear;
		var totalSupervisionsTitle = 'Numero total de US supervisionadas (todos guiões)'; // + selectedMonthName + ' ' + selectedYear;

		var dhis2MapTitle = "Mapa: TDR Malaria - Pontuação média no desempenho de TDR por município";//"TDR Malaria Pontuação meia por municipio";

		var url = '../api/organisationUnits/' + selectedProviceId + '?fields=id,name&level=1';
		var url2 = '../api/organisationUnits/' + selectedProviceId + '?fields=id,name&level=2';

		

		alert('Pulling report for month: ' + selectedMonthValue + '  which is ' + selectedMonthName + ' Year: ' + selectedYear + ' Province: ' + selectedProviceName + '(' + selectedProviceId + ')');
		//});

		$('#report-dimension').text(selectedProviceName + ', ' + selectedMonthName + ' ' + selectedYear);
		$('#section1').text(reportTable1Title);
		$('#section2').text(chart1Title);
		$('#section3').text(reportTable2Title);
		$('#section4').text(reportTable3Title);
		$('#section5').text(dhis2MapTitle);

		// Load OUS
		var dhis2OrgUnits = getOUS(url);
		var dhis2Clinics = getOUS(url2);

		// create the table 1
		var reportTable1 = {
			el: "reportTable1",
			columns: [{
				dimension: "dx",
				items: [
					{id: "oecNFTBwY5O"},
					{id: "mnkolRR686d"},
					{id: "xDwZ00djF4y"},
					{id: "ifDCZxEBKjy"},
					{id: "ZI2M59etLIp"}
					//{id: "Tpt01o40AaT"} The last indicator is'nt applied to providers
				]
			}],
			rows: [
				{dimension: "ou", items: dhis2OrgUnits} // dhis2OrgUnits
			],
			filters: [{
				dimension: "pe",
				//dhis2Period
				items: [{id: dhis2Period}]
				}],
				//title: reportTable1Title,
				showColTotals: true,
				hideEmptyRows: true
			};

		//console.log(reportTable1);

		//console.log(reportTable1.rows);

		reportTablePlugin.load(reportTable1);

		// chart 2

		var chart1 = {
			el: "chart1",
			columns: [{
				dimension: "dx",
				items: [
					{id: "zUlxy3A5ZGn"},
					{id: "VEM0wSlneWC"},
					{id: "nGGmu9yiBdA"},
					{id: "CDB5fjoy2Ee"}, // newly added
					{id: "sHcZctpoe9W"},
					//{id: "FM4ZfEZSGgS"}, // deleted the existing one
					{id: "CM33YGQn9Wy"},
					{id: "mf8JxZRl3RW"} // added a new dx: program indicator  AO HNQIS QRI.0CS-100-Overall QA Score
				]
			}],
			rows: [{
				dimension: "ou", items: [{id: selectedProviceId}]
			}],
			filters: [{
				dimension: "pe",
				items: [
					{id:  dhis2Period}
				]
			}],
			//title: chart1Title,
			type: "bar",
			hideTitle: true,
			//hideSubTitle: true,
			showValues: true
		}

		//console.log(chart1);

		chartPlugin.load(chart1); 

		// report Table 4 : next to the chart
		var reportTable4 = {
			el: "reportTable4",
			columns: [{
				dimension: "pe",
				items: [
					{id: dhis2Period}
				]
			}],
			rows: [{
				dimension: "dx",
				items: [
					{id: "zZ6GsHpH0Od"},
					{id: "Dx3i6pYvojJ"},
					{id: "ozXpbpgJd0B"},
					{id: "w8CloN9Gaa7"},
					{id: "qAFeQRBWZVY"},
					{id: "iDc0Q6gMw0v"},
					{id: "x8liB3YmhN8"}  // new dx mf8JxZRl3RW
				]
			}],
			filters: [{
				dimension: "ou",
				items: [
					{id: selectedProviceId}
				]
			}],
			showColTotals: true,
			hideEmptyRows: true

		}

		reportTablePlugin.load(reportTable4);

		// reportTable 2

		var reportTable2 = {
			el: "reportTable2",
			columns: [{
				dimension: "dx",
				items: [
					{id: "zUlxy3A5ZGn"},
					{id: "VEM0wSlneWC"},
					{id: "nGGmu9yiBdA"},
					{id: "CDB5fjoy2Ee"},  // move to #6 FM4ZfEZSGgS -- now CDB5fjoy2Ee
					{id: "sHcZctpoe9W"},
					{id: "CM33YGQn9Wy"}, // move to #4 CM33YGQn9Wy
					{id: "mf8JxZRl3RW"} // new dx
				]
			}],
			rows: [{
				dimension: "ou",
				items: dhis2OrgUnits
			}],
			filters: [{
				dimension: "pe",
				items: [
					{id: dhis2Period}
				]
			}],
			//title: reportTable2Title,
			showColTotals: true,
			hideEmptyRows: true,
			legendSet: {id: "KC4JHDAej8p"}
		}

		//console.log(reportTable2);
		reportTablePlugin.load(reportTable2); // do not load

		// report Table 3
		var reportTable3 = {
			el: "reportTable3",
			columns: [{
				dimension: "dx",
				items: [
					{id: "zUlxy3A5ZGn"},
					{id: "VEM0wSlneWC"},
					{id: "nGGmu9yiBdA"},
					{id: "CDB5fjoy2Ee"}, // move to # 6 FM4ZfEZSGgS // now CDB5fjoy2Ee
					{id: "sHcZctpoe9W"},
					{id: "CM33YGQn9Wy"}, // move to # 4 CM33YGQn9Wy
					{id: "mf8JxZRl3RW"}  // new dx
				]
			}],
			rows: [{
				dimension: "ou",
				items: dhis2Clinics 
			}],
			filters: [{
				dimension: "pe",
				items: [
					{id: dhis2Period}
				]
			}],
			//title: reportTable3Title,
			showColTotals: true,
			hideEmptyRows: true,
			hideTitle: true,
			legendSet: {id: "KC4JHDAej8p"}
		}

		//console.log(reportTable3);
		reportTablePlugin.load(reportTable3); 


		// A chart to show the total supervions
		//var totalSupervisions = {
		//	el: "totalSupervisions",
		//	columns: [{
		//		dimension: "dx",
		//		items: [
		//			{id: "BiFRfSc4oxj"}
		//		]
		//	}],
		//	rows: [{
		//		dimension: "ou",
		//		items: [
		//			{id: selectedProviceId}
		//		]
		//	}],
		//	filters: [{
		//		dimension: "pe",
		//		items: [
		//			{id: dhis2Period}
		//		]
		//	}],
			//title: totalSupervisionsTitle,
		//	type: "gauge",
		//	showValues: true,
		//	hideTitle: true
		//}

		//console.log(totalSupervisions);

		//chartPlugin.load(totalSupervisions);


		// Map
		//var dhis2Map = {
		//	el: "malQoCMap",
		//	columns: [{
		//				dimension: "dx",
		//				items: [{
		//					id: "sHcZctpoe9W"
		//				}]
		//	}],
		//	rows: [{
		//		dimension: "ou",
		//		items: dhis2OrgUnits
		//	}],
		//	filters: [{
		//		dimension: "pe",
		//		items: [{
		//			id: dhis2Period
		//		}]
		//	}],
			//valueType: "in",
		//	legendSet: {id: "JnlQwggLMN7"}

		//}

		//mapPlugin.load(dhis2Map);

		Ext.onReady( function(){
			DHIS.getMap({
				url: "https://ao-dev.hnqis.org",
				el: "malQoCMap",
				//hideLegend: true,
				//basemap: "googlestreets",
				//baseLayer: "googlestreets",
				mapViews: [{
					columns: [{
						dimension: "dx",
						items: [{
							id: "sHcZctpoe9W",
							dimensionItemType: "INDICATOR"
						}]
					}],
					rows: [{
						dimension: "ou",
						items: [ {id: "LEVEL-4"}, {id: selectedProviceId}] //dhis2OrgUnits
					}],
					filters: [{
						dimension: "pe",
						items: [{
							id: dhis2Period
						}]
					}],
					valueType: "in",
					labels: true,
					layer: "thematic1", //thematic1
					opacity: 0.9,
					legendSet: {id: "JnlQwggLMN7"}
				},{
					layer: "boundary",
					columns: [{
						dimension: "dx",
						items: [{
							id: "sHcZctpoe9W",
							dimensionItemType: "INDICATOR"
						}]
					}],
					rows: [{
						dimension: "ou",
						items: [{id: "LEVEL-4"},{id: selectedProviceId}] //dhis2OrgUnits
					}],
					filters: [{
						dimension: "pe",
						items: [{
							id: dhis2Period
						}]
					}],
					valueType: "in",
					labels: true,
					//layer: "thematic1", //thematic1
					opacity: 0.6
				}]
			});
		})

		
		//var dhis2MapTest = {
		//	url: "https://ao-dev.hnqis.org",
		//	el: "malQoCMap",
		//	id: "M4j7ZAc27XY"
		//}

		//DHIS.getMap(dhis2MapTest);


		

};


function getOUS(url) {

	var req = new XMLHttpRequest();

	// where  to store the orgUnits
	var dhis2OrgUnits = new Array();

	req.onreadystatechange = function() {
		if  (req.readyState == 4 && req.status == 200) {

			var orgUnits = JSON.parse(req.responseText);
				//var orgUnits = this.responseText;

			//console.log(orgUnits);

			for (var i = 0; i < orgUnits.organisationUnits.length; i++) {

					//dhis2OrgUnits[i] = '{id: ' + orgUnits.organisationUnits[i].id + '}';
				dhis2OrgUnits.push({
					id: orgUnits.organisationUnits[i].id

					});


					//console.log(orgUnits.organisationUnits[i].id);
			}

		}
	};

	//var url = '../api/organisationUnits/' + selectedProviceId + '?fields=id,name&level=1';


	//console.log('dhis2Period parsed: '+ dhis2Period);

	//console.log(selectedMonthName);

	req.open('GET', url, true);
	req.send();

	return dhis2OrgUnits


};



$( document ).ready( function() {
	$('.header').css('color', 'black');
});