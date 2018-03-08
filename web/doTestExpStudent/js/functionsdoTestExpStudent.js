function createRadioButton(textLabel, valResponse, idAppend) {
	var label = document.createElement("label");
	label.setAttribute("class", "answer");
	label.innerHTML = textLabel;

	var radio = document.createElement("input");
	radio.setAttribute('type', 'radio');
	radio.setAttribute('name', 'responses');
	radio.setAttribute('value', valResponse);

	label.prepend(radio);
	$("#"+idAppend).append(label);
}

function getDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();

	return [year, month, day].join("-");
}

function incrementCounter(idElement, previousValue, newValue) {
	$("#"+idElement).prop('Counter', previousValue).animate({
		Counter: newValue
	},{
		duration: 2000,
		easing: 'swing',
		step: function (now) {
			$(this).text(now.toFixed(2));
		}
	});
}

$(document).ready(function () {
    var globals = {};
    globals.questions = [];
    globals.responses = [];
	globals.currentQuestionIndex = 0;
	globals.currentResponseMinIndex = 0;
	globals.currentResponseMaxIndex = 0;
	globals.points = 0;

    var urlParams = new URLSearchParams(window.location.search);
	var testExpId = urlParams.get("TestExpId");

	var url = "http://localhost:8888/L-earn/web/doTestExpStudent/doTestExpStudent.php";

    var testEntreName = function () {
        var data = {
            action: "getTestEntreName",
            TestExpId: testExpId
        };
        $.ajax({
            url: url,
            data: data,
            method: "GET",
            success: function (result) {
                resultTitles = JSON.parse(result);

                var breadcrumbFirstItem = document.createElement("a");
                breadcrumbFirstItem.setAttribute("href", "../unitStudent/unitStudent.php?AsignId=" + resultTitles.IdAsign);
                breadcrumbFirstItem.innerHTML = resultTitles.NombreAsign;

                var breadcrumbSeparator1 = document.createElement("span");
                breadcrumbSeparator1.innerHTML = " · ";

                var breadcrumbSecondItem = document.createElement("a");
                breadcrumbSecondItem.setAttribute("href", "../testStudent/testStudent.php?UnitId=" + resultTitles.IdTema);
                breadcrumbSecondItem.innerHTML = "Tema "+resultTitles.OrdenTema;

                var breadcrumbSeparator2 = document.createElement("span");
                breadcrumbSeparator2.innerHTML = " · ";

                var breadcrumbThirdItem = document.createElement("span");
                breadcrumbThirdItem.innerHTML = "Test de entrenamiento";

                $("#breadcrumb").append(breadcrumbFirstItem);
                $("#breadcrumb").append(breadcrumbSeparator1);
                $("#breadcrumb").append(breadcrumbSecondItem);
                $("#breadcrumb").append(breadcrumbSeparator2);
                $("#breadcrumb").append(breadcrumbThirdItem);

                var testName = document.createElement("h3");
                testName.setAttribute("class", "test-title");
                testName.innerHTML = resultTitles.NombreEntre;

                var testDesc = document.createElement("div");
                testDesc.setAttribute("class", "test-descr");
                testDesc.innerHTML = resultTitles.DescripcionEntre;

                var makeTest = document.createElement("button");
                makeTest.setAttribute("id", "btnDoTest");
                makeTest.innerHTML = "Hacer test";
                $("#test-do").append(testName);
                $("#test-do").append(testDesc);
                $("#test-do").append(makeTest);

                $("#step-0").addClass("stepsSelected");

                $("#btnDoTest").on("click", function() {
                    doTestEntre();
                })
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
                alert(textStatus);
                alert(errorThrown);
            }

        });
    }
    testEntreName();

	var testEntreQuestions = function () {
		var data = {
			action : "getEntreQuestions",
			TestExpId: testExpId
		};
		$.ajax({
			url: url,
			data: data,
			method: "GET",
			success: function (result) {
				resultArray = JSON.parse(result);
				resultArray.forEach(function(elem){
					globals.questions.push(
						[parseInt(elem.PreguIdFin), elem.PreguntaEntre]
					);
				});
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert(jqXHR.status);
				alert(textStatus);
				alert(errorThrown);
			}

		});

    }
    testEntreQuestions();

	var testEntreResponses = function () {
		var data = {
            action : "getEntreResponses",
            TestExpId: testExpId
        };
        $.ajax({
            url: url,
            data: data,
            method: "GET",
            success: function (result) {
                resultArray = JSON.parse(result);
                resultArray.forEach(function(elem){
                    globals.responses.push(
                        [parseInt(elem.RespuIdEntre), elem.RespuestaEntre, parseInt(elem.PesoEntre), parseInt(elem.CorrectaEntre)]
                    );
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
                alert(textStatus);
                alert(errorThrown);
            }

        });

	}
	testEntreResponses();

    var doTestEntre = function () {
        $("#test-do").empty();
		$("#step-0").removeClass("stepsSelected");
		$("#step-1").addClass("stepsSelected");

		function loadQuestion(currentQuestion) {
			var questionItem = document.createElement("div");
			questionItem.setAttribute("class", "questionItem");
			questionItem.innerHTML = globals.questions[currentQuestion][1];
			$("#test-do").append(questionItem);

			var form = document.createElement("form");
			form.setAttribute("id", "responsesForm");
			$("#test-do").append(form);
		}
		loadQuestion(globals.currentQuestionIndex);

		function loadResponses() {
			globals.currentResponseMinIndex = globals.currentQuestionIndex * 4;
			globals.currentResponseMaxIndex = (globals.currentQuestionIndex * 4)+3;

			for (var i = globals.currentResponseMinIndex; i <= globals.currentResponseMaxIndex; i++) {
				createRadioButton(globals.responses[i][1], i, "responsesForm");
			}
		}
		loadResponses();

		var continueTest = document.createElement("button");
		continueTest.setAttribute("id", "btnContinueTest");
		continueTest.innerHTML = "Continuar";
		$("#test").append(continueTest);

		function checkAnswer() {
			$("label").on("click", function (event) {
				event.preventDefault();

				var indexReponse = $(this).children().val();

				if (globals.responses[indexReponse][3] == 1){
					// console.log("correcta");
					$(this).closest("label").addClass("correct-answer");
				} else {
					// console.log("incorrecta");
					$(this).closest("label").addClass("incorrect-answer");

					$("input[name=responses]").each(function(){
					    var indexAnswers = $(this).val();
						if (globals.responses[indexAnswers][3] == 1){
							// console.log("correcta");
							$(this).closest("label").addClass("correct-answer");
						}
					})
				}

				globals.points += globals.responses[indexReponse][2];
			});
		}
		checkAnswer();

		function sendResultTest() {
			var date = getDate();
			var expPoints = Math.floor(globals.points/10);

			var data = {
	            action: "getResultTest",
				date: date,
				TestExpId: testExpId,
				points: expPoints
	        };
	        $.ajax({
	            url: url,
	            data: data,
	            method: "GET",
	            success: function (result) {
	                percentageUpdate = JSON.parse(result);
					var previousValue = $("#headPercent").text();
					incrementCounter("headPercent", previousValue, percentageUpdate);
	            },
	            error: function (jqXHR, textStatus, errorThrown) {
	                alert(jqXHR.status);
	                alert(textStatus);
	                alert(errorThrown);
	            }

	        });
		}

        $("#btnContinueTest").on("click", function() {
			globals.currentQuestionIndex ++;
			$("#test-do").empty();

			if (globals.currentQuestionIndex >= 10) {
				$("#test-do").html(Math.floor(globals.points/10));
				sendResultTest();
			}else {
				loadQuestion(globals.currentQuestionIndex);
				loadResponses();
				checkAnswer();
			}
        });
    }

});
