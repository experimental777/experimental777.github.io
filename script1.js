var tests = {
"tests":  [
{
  "qID": 1,
  "qName": "К заслугам основоположника микробиологии Р.Коха не относится:",
  "rA": [
    "Создание учения о фагоцитозе",
    ],
  "wA": [
    "Открытие возбудителя холеры",
    "Открытие возбудителя туберкулеза",
    "Получение альттуберкулина ",
    "Введение в практику анилиновых красителей"]
},
{
  "qID": 26,
  "qName": "Способность бактерий к конъюгации связана с наличием:",
  "rA": [
    "Половых пилей",
    ],
  "wA": [
    "Пилей общего типа",
    "Жгутиков"]
},{
  "qID": 27,
  "qName": "Конъюгация генетически детерминирована",
  "rA": [
    "F – плазмидой ",
    ],
  "wA": [
    "Профагом",
    "Хромосомной мутацией"]
},{
  "qID": 28,
  "qName": "Объектами изучения санитарной микробиологии не являются:",
  "rA": [
    "Испражнения",
    ],
  "wA": [
    "Вода",
    "Почва",
    "Воздух",
    "Пищевые продукты"]
},{
  "qID": 29,
  "qName": "К формам антагонистических типов взаимодействия между микробами не относится:",
  "rA": [
    "Метабиоз",
    ],
  "wA": [
    "Антибио",
    "Паразитизм",
    "Хищничество",
    "Конкуренция"]
},{
  "qID": 30,
  "qName": "Санитарно-показательные бактерии должны отвечать следующим требованиям, кроме одного:",
  "rA": [
    "Должны иметь другие природные резервуары",
    ],
  "wA": [
    "Должны постоянно содержаться в выделениях человека",
    "Должны выделяться в больших количествах",
    "Срок выживания их во внешней среде должен быть равен сроку выживания патогенных микробов, выводимых из организма теми же путями",
    "Не должны размножаться в окружающей среде"]
},{
  "qID": 31,
  "qName": "В ротовой полости могут быть обнаружены следующие микробы кроме:",
  "rA": [
    "Bacillus  anthracis",
    ],
  "wA": [
    "Leptothrix buccalis",
    "B. maximus buccalis",
    "Borrelia buccalis",
    "Treponema microdentium"]
},{
  "qID": 32,
  "qName": "Для выявления дисбактериоза кишечника не выявляют количество:",
  "rA": [
    "Сальмонелл",
    ],
  "wA": [
    "Кишечных палочек ",
    "Кокков",
    "Бифидобактерий",
    "Дрожжеподобных грибов"]
},{
  "qID": 33,
  "qName": "Для восстановления нормальной микрофлоры толстого кишечника не применяют:",
  "rA": [
    "true",
    ],
  "wA": [
    "false",
    "false",
    "false",
    "false"]
},
]
};
var test = 0;
var amountTest = 0;
var iterGlobal = 0;
var exit = 0;
var key = [];
var selected = [];
var right = 0;
var wrongAnswers = [];
document.querySelector(".button").addEventListener("click", startQuiz);


var oToday = new Date();

function getDaysLeft(oDeadLineDate, oToday){
  return oDeadLineDate > oToday ? Math.ceil((oDeadLineDate - oToday) / (1000 * 60 * 60 * 24)) : null;
}

function MkDaysLeft(sDeadLineDate, sDeadLineText){
  var sTime = sDeadLineDate + " " + oToday.getHours() + ":" + oToday.getMinutes() + ":" + oToday.getSeconds();
  var oDeadLineDate = new Date(sTime);
  var nDaysLeft = getDaysLeft(oDeadLineDate, oToday);
  if (nDaysLeft){
    var sDaysLeft = String(nDaysLeft);
    var sDaysText = "дней";
    var nDaysLeftLength = sDaysLeft.length;
    if (sDaysLeft.charAt(nDaysLeftLength - 2) != "1"){
      if (sDaysLeft.charAt(nDaysLeftLength - 1) == "2" || sDaysLeft.charAt(nDaysLeftLength - 1) == "3" || sDaysLeft.charAt(nDaysLeftLength - 1) == "4") sDaysText = "дня";
      else if (sDaysLeft.charAt(nDaysLeftLength - 1) == "1") sDaysText = "день";
    }
    var sLeftText = sDaysText == "день" ? "остался" : "осталось";
    return sDeadLineText + " " + sLeftText + " " + nDaysLeft + " " + sDaysText + ".";
  }else return "Ну вот и тесты";
}
window.onload = function() {
document.querySelector(".status-timer").innerHTML = MkDaysLeft("May 25, 2018", "До тестов");
}


function startQuiz() {
	document.querySelector(".status").style.display = "block";
	document.querySelector(".status-timer").style.display = "none";
	document.querySelector(".checkbox-wrapper").style.display = "none";
	var variant = document.querySelector('.select').selectedIndex;
	console.log(variant);
	var varfile;
	switch(variant) {
		case 0:
			varfile = 'pulm.json';
			break;
		case 1:
			varfile = 'ibs.json';
			break;
		case 2:
			varfile = 'gbreum.json';
			break;
		case 3:
			varfile = 'klsn.json';
			break;
		case 4:
			varfile = 'gdcp.json';
			break;
		case 5:
			varfile = 'hep.json';
			break;
		case 6:
			varfile = 'nephr.json';
			break;
	}
	var xhr = new XMLHttpRequest();
	var xhrre;
	xhr.open('GET', varfile, false);
	xhr.send();
	if (xhr.status != 200) {
	  test = tests.tests;
	  alert( 'Нажми для продолжения' );
	} else {
	  xhrre = JSON.parse(xhr.responseText);
	  test = xhrre.tests;
	}
	if (document.querySelector(".checkbox").checked === true) {
	test = shuffle(test);
	}
	amountTest = test.length;
	iterGlobal = 0;
	exit = 0;
	key = [];
	selected = [];
	right = 0;
	wrongAnswers = [];
	document.querySelector(".button").removeEventListener("click", startQuiz);
	newQuestion();
	startTimer();
}
function newQuestion() {
	drawStatus();
	while (document.querySelector('.answers').hasChildNodes()) {
    	document.querySelector('.answers').removeChild(document.querySelector('.answers').lastChild);
	} // Очищаем предыдущие варианты	
	currentQuestion = test[iterGlobal]; // Текущий вопрос
	key = getKey(currentQuestion.rA.length, currentQuestion.wA.length); // Ключ к вопросу
	drawQuestion(currentQuestion, key);

	document.querySelector(".button").innerHTML = "ПОДТВЕРДИТЬ";
	document.querySelector(".button").addEventListener("click", compare);
	document.querySelector(".button").removeEventListener("click", newQuestion);
	if (document.querySelector(".select").getAttribute('hidden') == null) document.querySelector(".select").setAttribute('hidden', 'true');

}
function compare() {
	for (var i= 0; i < key.length; i++) {
		if (key[i] == 1) {
			document.getElementById(i + 1).className += " answers__answer_right";
		}
	}
	if (key.join(";") == selected.join(";")) {
		right++;
	} else {
		wrongAnswers.push(iterGlobal);
	}
	iterGlobal++;
  	if (iterGlobal < amountTest) {
 		document.querySelector(".button").innerHTML = "ДАЛЕЕ";
 		document.querySelector(".button").addEventListener("click", newQuestion);
 		document.querySelector(".button").removeEventListener("click", compare);
	} else {
		document.querySelector(".button").innerHTML = "ЗАКОНЧИТЬ";
 		document.querySelector(".button").addEventListener("click", drawEnd);
  		document.querySelector(".button").addEventListener("click", drawStatus);
 		document.querySelector(".button").removeEventListener("click", compare);
	}
}

function drawStatus() {
	var iter = iterGlobal + 1;
	if (iterGlobal == amountTest) iter = iterGlobal;
	var accuracy = right * 100 / iterGlobal;
	if (right == 0) {
		accuracy = 0;
	}
	var wrong = iterGlobal - right;
	document.querySelector(".status__index").innerHTML = iter + " / " + amountTest;
	document.querySelector(".status__accuracy").innerHTML = Math.round(accuracy) + "% | " + wrong + " неверно";
}


function drawQuestion(currentQuestion, key) {
	document.querySelector('.question__name').innerHTML = currentQuestion.qName;
	rA = shuffle(currentQuestion.rA);
	rAi = 0;
	wA = shuffle(currentQuestion.wA);
	wAi = 0;
	selected = [];
	amountAnswers = rA.length + wA.length;
	for (var i = 0; i < amountAnswers; i++) {
		if (key[i] == 0) {
			var answer = document.createElement('div');
			answer.className = "answers__answer answers__answer_unselected";
			answer.id = i + 1;
			answer.innerHTML = wA[wAi];
			wAi++;
			document.querySelector('.answers').appendChild(answer);
			document.querySelector('.answers').lastChild.addEventListener("click", getSelected);
			selected.push(0);
		} else {
			var answer = document.createElement('div');
			answer.className = "answers__answer answers__answer_unselected";
			answer.id = i + 1;
			answer.innerHTML = rA[rAi];
			rAi++;
			document.querySelector('.answers').appendChild(answer);
			document.querySelector('.answers').lastChild.addEventListener("click", getSelected);	
			selected.push(0);		
		}
	}
}

function drawEnd() {
	stopTimer();
	while (document.querySelector('.answers').hasChildNodes()) {
    document.querySelector('.answers').removeChild(document.querySelector('.answers').lastChild);
	}
	document.querySelector(".button").setAttribute('hidden', 'true');
	document.querySelector('.question__name').innerHTML = "РЕЗУЛЬТАТ";
	document.querySelector(".result").removeAttribute('hidden');
	document.querySelector(".bblock").removeAttribute('hidden');
	document.querySelector(".bblcok__button1").addEventListener("click", function() {window.location.href = "index.html" });
	document.querySelector(".bblcok__button3").addEventListener("click", function() {window.location.reload(false) });
	var accuracy = right * 100 / iterGlobal;
	document.querySelector('.result').innerHTML = Math.round(accuracy) + "%";
	if (wrongAnswers.length > 0) {
		document.querySelector(".bblcok__button2").addEventListener("click", reMatch);
	} else {
		document.querySelector(".bblcok__button2").className += " bblcok__button2_inactive";
	}
}

function reMatch() {
	startTimer();
	var newTest = [];
	for (var i=0; i < wrongAnswers.length; i++) {
		var iTest = wrongAnswers[i];
		newTest.push(test[iTest]);
	}
	test = newTest;
	iterGlobal = 0;
	amountTest = test.length;
	right = 0;
	key = [];
	selected = [];
	wrongAnswers = [];
	document.querySelector(".button").removeAttribute('hidden', 'true');
	document.querySelector(".result").setAttribute('hidden', 'true');
	document.querySelector(".bblock").setAttribute('hidden', 'true');
 	document.querySelector(".button").removeEventListener("click", drawEnd);
 	document.querySelector(".bblcok__button2").removeEventListener("click", reMatch);
	newQuestion();
}
function getSelected(elem) {
	selected[elem.target.id - 1] = 1;
	elem.target.className = "answers__answer answers__answer_selected";
	elem.target.removeEventListener("click", getSelected);
	elem.target.addEventListener("click", getUnSelected);
}
function getUnSelected(elem) {
	selected[elem.target.id - 1] = 0;
	elem.target.className = "answers__answer answers__answer_unselected";
	elem.target.removeEventListener("click", getUnSelected);
	elem.target.addEventListener("click", getSelected);
}
var timer;
function startTimer() {
	if (timer) clearInterval(timer);
	secs = 0;
	min = 0;
	document.querySelector('.status__time').innerHTML = min + ":0" + secs;
	timer = setInterval(
		function () {
			secs++;
			if (secs == 60) {
				secs = 0;
				min++;
			}
			if (secs < 10) {
				document.querySelector('.status__time').innerHTML = min + ":0" + secs;
			} else {
				document.querySelector('.status__time').innerHTML = min + ":" + secs;
			}
		},
		1000
	);
}
function stopTimer() {
    if (timer) clearInterval(timer); 	
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function getKey(rAL, wAL) {
	arr = [];
	for (rAL; rAL > 0; rAL--) {
		arr.push(1);
	}
	for (wAL; wAL > 0; wAL--) {
		arr.push(0);
	}
	shuffle(arr);
	return(arr);
}
/*
function newQuestion(i) {
	var currentTest = test[i];
	var amountAnswers = currentTest.rA.length + currentTest.wA.length;
	var key = getKey(currentTest.rA.length, currentTest.wA.length);
	var iterKey = 0;
	var iterWA = 0;
	var iterRA = 0;
	var allAnswers = [];
	for (iterKey; iterKey < amountAnswers; iterKey++) {
		if (key[iterKey] == 0) {
			allAnswers.push(currentTest.wA[iterWA]);
			iterWA++;
		} else {
			allAnswers.push(currentTest.rA[iterRA]);
			iterRA++;
		}
	}
	document.querySelector('.question__name').innerHTML = currentTest.qName;
	var amountAnswersIter = amountAnswers;
	var iter = 0;
	while (document.querySelector('.answers').hasChildNodes()) {
    	document.querySelector('.answers').removeChild(document.querySelector('.answers').lastChild);
	}	
	for (amountAnswersIter; amountAnswersIter > 0; amountAnswersIter--) {
		var answer = document.createElement('div');
		answer.className = "answers__answer answers__answer_unselected";
		answer.id = iter + 1;
		answer.innerHTML = allAnswers[iter];
		document.querySelector('.answers').appendChild(answer);
		document.querySelector('.answers').lastChild.addEventListener("click", getSelected);
		selected.push(0);
		iter++;
	}
	iter = 0;
	function compare(elem) {
		var iter = 0;
		console.log(key);
		for (iter; iter < key.length; iter++) {
			if (key[iter] == 1) {
				console.log(iter);
				document.getElementById(iter + 1).className += " answers__answer_right";
			}
		}
		if (selected == key) right++;
		elem.toElement.removeEventListener("click", compare);
		elem.toElement.addEventListener("click", goToNext);	
		elem.toElement.innerHTML = "ДАЛЕЕ";
	}
	function goToNext(elem) {
	newQuestion(2)
	elem.toElement.removeEventListener("click", goToNext);
	elem.toElement.addEventListener("click", compare);
	elem.toElement.innerHTML = "ПОДТВЕРДИТЬ";
	}
	document.querySelector('.button').addEventListener("click", compare);

}
newQuestion(1)
function getSelected(elem) {
	selected[elem.toElement.id - 1] = 1;
	console.log(selected);
	elem.toElement.className = "answers__answer answers__answer_selected";
	elem.toElement.removeEventListener("click", getSelected);
	elem.toElement.addEventListener("click", getUnSelected);
}
function getUnSelected(elem) {
	selected[elem.toElement.id - 1] = 0;
	console.log(selected);
	elem.toElement.className = "answers__answer answers__answer_unselected";
	elem.toElement.removeEventListener("click", getUnSelected);
	elem.toElement.addEventListener("click", getSelected);
}
*/
