let countMorningCashier =0,countMorningMainCashier =0;
let numMorningCashier =0,numMorningMainCashier =0;
let freedomM = "לא", freedomE ="לא";
let numEveningCashier =0,numEveningMainCashier =0;
let morningArray = [], eveningArray =[] , arrayDeleteAndNever=[];
let arrayEmp = [];
let arrayEmpByDay = [];
let arrayEmpAble = [], arrayEmpUnable = [], arrayEmpPreferNot = [];
let day = 0;
let MorningCashier = [],MorningMainCashier = [];
let sendEndResult = [];
let arrayDefine =[],arrayDefineEmp=[];
let arrayDay =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var shift = 1;
let indexFinish =0, finishInlayArray = [],arrayNoWorkSevenDay =[] ,arrayFinishEmp = [];

function addEmpToArrayByDay() {
    let today = new Date();
    if(today.toString().split(' ')[0]==="Thu") {
        indexFinish = 0;
        saveHours();
        saveEmloyee();
        fetch("/data/Inlay", {
            method: 'POST',
            body: JSON.stringify({}), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => {
            return data.json();
        })
            .then(res => {
                for (var i = 0; i < res.length; i++) {
                    arrayEmp.push(res[i]);
                }
                for (var da = 0; da < arrayDay.length; da++) {
                    arrayEmpByDay = [];
                    sendEndResult = [];
                    arrayEmpAble = [];
                    morningArray = [];
                    eveningArray = [];
                    countMorningMainCashier = 0;
                    countMorningCashier = 0;
                    arrayEmpAble = [];
                    arrayEmpUnable = [];
                    arrayDeleteAndNever = [];
                    arrayEmpPreferNot = [];
                    day++;
                    for (var i = 0; i < arrayEmp.length; i++) {
                        var d = new Date(arrayEmp[i].date);
                        if (arrayEmp[i].day === arrayDay[da]) {
                            arrayEmpByDay.push(arrayEmp[i]);
                        }
                    }
                    divideForShifts();
                    defineHours();
                }
                saveFinishInlay();
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }
    else {
        printEmpFinish();
        arrayFinishEmp = [];
    }
}
function printEmpFinish() {
    fetch("/data/ReturnFinishInlay", {
    method: 'POST',
    body: JSON.stringify({}), // data can be `string` or {object}!
    headers: {
        'Content-Type': 'application/json'
    }
}).then(data => {
    return data.json();
}).then(res=>{
    for (var i = 0; i < res.length; i++) {
        arrayFinishEmp.push(res[i]);
    }
    for (let i = 0, temp =0; i< arrayFinishEmp.length; i++, temp++) {
         if (temp >=7)
             temp=0;
        if (arrayFinishEmp[i].day == "ראשון")
        {
            if(arrayFinishEmp[i].shift == "משמרת בוקר")
            {
                document.querySelector("#day" + 1 + 1 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
            if(arrayFinishEmp[i].shift == "משמרת ערב")
            {
                document.querySelector("#day" + 1 + 2 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
        }
        
        if (arrayFinishEmp[i].day == "שני")
        {
            if(arrayFinishEmp[i].shift == "משמרת בוקר")
            {
                document.querySelector("#day" + 2 + 1 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
            if(arrayFinishEmp[i].shift == "משמרת ערב")
            {
                document.querySelector("#day" + 2 + 2 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
        }
        if (arrayFinishEmp[i].day == "שלישי")
        {
            if(arrayFinishEmp[i].shift == "משמרת בוקר")
            {
                document.querySelector("#day" + 3 + 1 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
            if(arrayFinishEmp[i].shift == "משמרת ערב")
            {
                document.querySelector("#day" + 3 + 2 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
        }
        if (arrayFinishEmp[i].day == "רביעי")
        {
            if(arrayFinishEmp[i].shift == "משמרת בוקר")
            {
                document.querySelector("#day" + 4 + 1 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
            if(arrayFinishEmp[i].shift == "משמרת ערב")
            {
                document.querySelector("#day" + 4 + 2 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
        }
        if (arrayFinishEmp[i].day == "חמישי")
        {
            if(arrayFinishEmp[i].shift == "משמרת בוקר")
            {
                document.querySelector("#day" + 5 + 1 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
            if(arrayFinishEmp[i].shift == "משמרת ערב")
            {
                document.querySelector("#day" + 5 + 2 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
        }
        if (arrayFinishEmp[i].day == "שישי")
        {
            if(arrayFinishEmp[i].shift == "משמרת בוקר")
            {
                document.querySelector("#day" + 6 + 1 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
            if(arrayFinishEmp[i].shift == "משמרת ערב")
            {
                document.querySelector("#day" + 6 + 2 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
        }
        if (arrayFinishEmp[i].day == "שבת")
        {
            if(arrayFinishEmp[i].shift == "משמרת בוקר")
            {
                document.querySelector("#day" + 7 + 1 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
            if(arrayFinishEmp[i].shift == "משמרת ערב")
            {
                document.querySelector("#day" + 7 + 2 + temp).innerHTML = "<div class='size'style=background-color:" + arrayFinishEmp[i].color + ">" + arrayFinishEmp[i].firstName + " " + arrayFinishEmp[i].lastName + "<br>" + arrayFinishEmp[i].state + "<br>" + "</div>"
            }
        }
    }
    })

}
function divideForShifts() {
    checkNoWorkSevenDay();
    for(var i =0; i<arrayEmpByDay.length;i++)
    {
        if(arrayEmpByDay[i].inlayType == 1)
            morningArray.push(arrayEmpByDay[i]);
        if(arrayEmpByDay[i].inlayType == 2)
            eveningArray.push(arrayEmpByDay[i]);
    }
}

function checkNoWorkSevenDay() {
    for(var i =0; i<arrayEmpByDay.length;i++) {
        for (let k = 0; k < arrayNoWorkSevenDay.length; k++) {
            if (arrayNoWorkSevenDay[k].idEmp == arrayEmpByDay[i].idEmp) {
                if (arrayNoWorkSevenDay[k].counter >= 6) {
                    arrayEmpByDay.splice(i, 1);
                    break;
                }
            }
        }
    }
}
function defineHours() {
    numMorningCashier = arrayDefine[day - 1].numCashier;
    numMorningMainCashier = arrayDefine[day - 1].numMainCashier;
    numEveningCashier = arrayDefine[day-1].eveningNumCashier;
    numEveningMainCashier = arrayDefine[day - 1].eveningNumMainCashier;
    freedomM = arrayDefine[day - 1].fridom;
    freedomE = arrayDefine[day - 1].freedomB;
    checkDoubleEmployeeInDay();
    if (freedomM == "לא")
    {inlay(morningArray);}
    for (var i=0; i<sendEndResult.length; i++){
        arrayDeleteAndNever.push(sendEndResult[i]);
    }
    for (let j = 0; j < eveningArray.length; j++) {
        for (let i = 0; i < sendEndResult.length; i++) {
            if (sendEndResult[i].idEmp == eveningArray[j].idEmp){
                eveningArray.splice(j, 1);
                break;
            }
        }
    }
    sendEndResult = [];
    countMorningMainCashier =0;
    countMorningCashier =0;
    arrayEmpAble = [];
    arrayEmpUnable =[];
    arrayEmpPreferNot =[];
    MorningCashier=[];
    numMorningCashier = numEveningCashier;
    numMorningMainCashier = numEveningMainCashier;
    shift = 2;
    if (freedomE == "לא")
    {inlay(eveningArray);}
    shift = 1;
    MorningCashier=[];
}
function checkDoubleEmployeeInDay() {
    for (var i=0; i<sendEndResult.length; i++){
        arrayDeleteAndNever.push(sendEndResult[i]);
    }
    for (let j = 0; j < eveningArray.length; j++) {
        for (let i = 0; i < morningArray.length; i++) {
            if (eveningArray[j].idEmp == morningArray[i].idEmp) {
                if (morningArray[i].levelOfInq > eveningArray[j].levelOfInq) {
                    arrayDeleteAndNever.push(morningArray[i]);
                    morningArray.splice(i, 1);
                    break;
                }
                else if (morningArray[i].levelOfInq < eveningArray[j].levelOfInq) {
                    arrayDeleteAndNever.push(eveningArray[j]);
                    eveningArray.splice(j, 1);
                    break;
                }
                else //equal
                {
                    if (eveningArray.length > morningArray.length) {
                        arrayDeleteAndNever.push(eveningArray[j]);
                        eveningArray.splice(j, 1);
                        break;
                    }
                    else if (eveningArray.length < morningArray.length) {
                        arrayDeleteAndNever.push(morningArray[i]);
                        morningArray.splice(i, 1);
                        break;
                    }
                    else {
                        arrayDeleteAndNever.push(eveningArray[j]);
                        eveningArray.splice(j, 1);
                        break;
                    }
                }
            }
        }
    }
}

function inlay(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].levelOfInq == 1) {//able
            arrayEmpAble.push(array[i]);
        } else if (array[i].levelOfInq == 2) {//unable
            arrayEmpUnable.push(array[i]);
        } else {//לא יכול
            arrayEmpPreferNot.push(array[i]);
        }
    }
    returnState();
}
function returnState() {
    for (var i = 0; i < arrayDefineEmp.length; i++) {
        for (var j = 0; j < arrayEmpAble.length; j++) {
            if (arrayDefineEmp[i].id == arrayEmpAble[j].idEmp) {
                arrayEmpAble[j] = {
                    idEmp: arrayEmpAble[j].idEmp,
                    inlayType: arrayEmpAble[j].inlayType,
                    firstName: arrayDefineEmp[i].firstName,
                    lastName: arrayDefineEmp[i].lastName,
                    state: arrayDefineEmp[i].state,
                    prefer: arrayEmpAble[j].prefer
                };
            }
        }
    }
    checkDoubleEmployee();
}
function checkDoubleEmployee() {
    for (var j=0; j<arrayEmpAble.length; j++) {
        for (var i = j+1; i < arrayEmpAble.length ; i++) {
            if (arrayEmpAble[i].idEmp==arrayEmpAble[j].idEmp)
            {
                arrayEmpAble.splice(j, 1);
            }
        }
    }
    counterStateEmp();
}
function counterStateEmp() {
    for (var i=0; i<arrayEmpAble.length;i++) {
        if (arrayEmpAble[i].state == "קופאי") {
            if (numMorningCashier >= countMorningCashier) {
                MorningCashier.push(arrayEmpAble[i]);
                countMorningCashier++;
            }
        }
        if (arrayEmpAble[i].state == "קופאי ראשי" ) {
            if (numMorningMainCashier >= countMorningMainCashier) {
                MorningMainCashier.push(arrayEmpAble[i]);
                countMorningMainCashier++;
            }
        }
    }
    ableEmp(MorningCashier);
    ableEmpMain(MorningMainCashier);
    printEmp();
}
function ableEmpMain(array) {
    //-------------------------//mainCashier---------------------------------------------

    if (numMorningMainCashier > countMorningMainCashier) {
        inlayEmp("קופאי ראשי");

        Starved(numMorningMainCashier, countMorningMainCashier, "קופאי ראשי");
    } else if (numMorningMainCashier == countMorningMainCashier) {
        inlayEmp("קופאי ראשי");
    } else if (numMorningMainCashier < countMorningMainCashier) {
        random(numMorningMainCashier, countMorningMainCashier, MorningMainCashier);
    }
}

function ableEmp(array) {
    //----------------------//cashier--------------------------------------------------
        if (numMorningCashier > countMorningCashier) {
            inlayEmp("קופאי");
            Starved(numMorningCashier, countMorningCashier, "קופאי");
        } else if (numMorningCashier == countMorningCashier) {
            inlayEmp("קופאי");
        } else if (numMorningCashier < countMorningCashier) {
            random(numMorningCashier, countMorningCashier, MorningCashier);
        }
}
function printEmp() {
    for (let j = 0; j < sendEndResult.length; j++) {
        for (let l = 0; l < arrayDefineEmp.length; l++) {//00000
            if (arrayDefineEmp[l].id == sendEndResult[j].idEmp) {//00000
                document.querySelector("#day" + day + shift + j).innerHTML = "<div class='size'style=background-color:"+ arrayDefineEmp[l].color+">"+ sendEndResult[j].firstName + " " + sendEndResult[j].lastName + "<br>" + sendEndResult[j].state + "<br>" +"</div>"
                finishInlayArray[indexFinish] = {day:day, id:arrayDefineEmp[l].id,shift:returnNameInlayByLevel(shift), color:arrayDefineEmp[l].color,firstName:sendEndResult[j].firstName, lastName:sendEndResult[j].lastName, state:sendEndResult[j].state };
                indexFinish++;
                arrayNoWorkSevenDay[l].counter++;
            }}}

}
//-------------------function------------------------------------
function inlayEmp(type){
    for (var i = 0; i < arrayEmpAble.length; i++) {
        if (arrayEmpAble[i].state == type) {
            sendEndResult.push(arrayEmpAble[i]);
        }
    }
}
function random(num,count,arrayType){
    let counter = 0;
    let countEm=0;
    let emp = [];
    for (var j = 0; j < arrayType.length & emp.length < num; j++) {
        if (arrayType[j].prefer === 1)
            emp.push(arrayType[j]);
    }
    if (emp.length < num) {

        let randomNum;
        counter = 0;

        var k = true;
        var first = 0;
        randomNum = Math.floor(Math.random() * count);
        if (first == 0) {
            emp.push(arrayType[randomNum]);
            arrayType.splice(randomNum, 1);
countEm++;
        }
    }
    while (countEm < num) {
        randomNum = Math.floor(Math.random() * count);
        for (var j = 0; j < arrayType.length; j++) {

            if (JSON.stringify(emp[j]) == JSON.stringify(arrayType[randomNum])) {
                k = false;
            }
        }
        counter++;
        if (k) {
            emp.push(arrayType[randomNum]);
            arrayType.splice(randomNum,1 );
            count--;
            countEm++;
        }
        if (counter >= arrayType.length * num) {
            break;
        }

    }
    for (var i=0; i<emp.length; i++)
        sendEndResult.push(emp[i])

}


function Starved(theNumberNeeded,theActualNumber, typeEmp) {
    var index = 0;
    var arrayTimesDiscriminatedAgainst = [];
    arrayTimesDiscriminatedAgainst = updateAndDelete(arrayTimesDiscriminatedAgainst, typeEmp);

    var temp = [];
    while (theNumberNeeded > theActualNumber) {
        var min = [100, null];
        var minIndex = 0;
        for (var i = index; i < arrayTimesDiscriminatedAgainst.length; i++) {
            if (min[0] > arrayTimesDiscriminatedAgainst[i].discriminatedAgainst) {
                min[0] = arrayTimesDiscriminatedAgainst[i].discriminatedAgainst;
                min[1] = arrayTimesDiscriminatedAgainst[i].id;
                minIndex = i;
            }
        }
        if (min[1] == null) {
        } else {
            var double = false;
            for (var l = 0; l < sendEndResult.length; l++) {
                if (sendEndResult[l].id == arrayTimesDiscriminatedAgainst[minIndex].id) {
                    double = true;
                    index++;
                    l = sendEndResult.length;
                }
                if (!double) {
                    if (inlayWorks(arrayTimesDiscriminatedAgainst, minIndex)) {
                        theActualNumber++;
                        index = 0;
                        l = sendEndResult.length;
                    }
                }
            }
            if (sendEndResult.length == 0) {
                if (inlayWorks(arrayTimesDiscriminatedAgainst, minIndex)) {
                    theActualNumber++;
                    index = 0;
                }
            }
        }
    }
    var count =0;
    for (var i=0; i<sendEndResult.length; i++)
        if (typeEmp == sendEndResult[i].state)
            count++;
    if (count < theNumberNeeded) {
        var arrayTemp = [];
        for (var emp = 0; emp < arrayDefineEmp.length; emp++) {
            for (var j = 0; j < arrayEmpUnable.length; j++) {
                if (arrayDefineEmp[emp].id == arrayEmpUnable[j].idEmp)
                    arrayTemp += arrayDefineEmp[emp].firstName + " " + arrayDefineEmp[emp].lastName + " ";
            }
        }
        for (let j = 0; j < arrayDay.length; j++) {
            if (j == day-1){
                document.querySelector("#error" + j).innerHTML = " ביום " + translateDay(day) +" ב"+returnNameInlayByLevel(shift)+ " חסרים עובדים "+ arrayTemp;
        }}
    }
}

function updateAndDelete(arrayTimesDiscriminatedAgainst, typeEmp) {
    for (var i = 0; i < arrayDefineEmp.length; i++) {
        arrayTimesDiscriminatedAgainst[i] = {
            id: arrayDefineEmp[i].id,
            discriminatedAgainst: arrayDefineEmp[i].counter
        };
    }

    for (let j = 0; j < arrayEmpUnable.length; j++) {
        for (let i = 0; i < arrayTimesDiscriminatedAgainst.length; i++) {
            if (arrayTimesDiscriminatedAgainst[i].id == arrayEmpUnable[j].idEmp) {
                arrayTimesDiscriminatedAgainst.splice(i, 1);
            }
        }
    }
    for (let j = 0; j < arrayDefineEmp.length; j++) {
        for (let i = 0; i < arrayTimesDiscriminatedAgainst.length; i++) {
            if ((arrayTimesDiscriminatedAgainst[i].id == arrayDefineEmp[j].id & arrayDefineEmp[j].state == "סדרן עבודה") || (arrayTimesDiscriminatedAgainst[i].id == arrayDefineEmp[j].id & typeEmp != arrayDefineEmp[j].state)|| arrayNoWorkSevenDay[j].counter>=6) {
                arrayTimesDiscriminatedAgainst.splice(i, 1);
            }
        }
    }
    for (let i=0; i < arrayDeleteAndNever.length; i++){
        for (let j=0; j<arrayTimesDiscriminatedAgainst.length; j++){
            if (arrayDeleteAndNever[i].idEmp == arrayTimesDiscriminatedAgainst[j].id || arrayDeleteAndNever[i].id == arrayTimesDiscriminatedAgainst[j].id){
                arrayTimesDiscriminatedAgainst.splice(j, 1);
            }
        }
    }

    for (let j = 0; j < sendEndResult.length; j++) {
        for (let i = 0; i < arrayTimesDiscriminatedAgainst.length; i++) {
            if (arrayTimesDiscriminatedAgainst[i].id == sendEndResult[j].idEmp) {
                arrayTimesDiscriminatedAgainst.splice(i, 1);
            }
        }
    }

    return arrayTimesDiscriminatedAgainst;
}

function inlayWorks(arrayTimesDiscriminatedAgainst,minIndex)
{
    var inlay = false;
    for (let j = 0; j < arrayDefineEmp.length; j++) {
        if (arrayTimesDiscriminatedAgainst[minIndex].id == arrayDefineEmp[j].id) {
            arrayTimesDiscriminatedAgainst[minIndex].discriminatedAgainst += 1;
            sendEndResult.push({idEmp: arrayDefineEmp[j].id, firstName: arrayDefineEmp[j].firstName, lastName: arrayDefineEmp[j].lastName, state: arrayDefineEmp[j].state});
            arrayDefineEmp[j].counter++;
            console.log("the counter is "+  arrayDefineEmp[j].counter + " " +  arrayDefineEmp[j].firstName + " " + arrayDefineEmp[j].lastName);

            inlay = true;
            arrayTimesDiscriminatedAgainst.splice(minIndex, 1);
            minIndex=0;
            break;
        }
    }

    return inlay;
}

function saveFinishInlay() {
    fetch("/data/FinishInlay", {
        method: 'POST',
        body: JSON.stringify({array:finishInlayArray }), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            console.log('Request failed', error);
        });
    saveCounterInEmployees();

}
function saveCounterInEmployees()
{
    fetch("/data/AddEmployees", {
        method: 'POST',
        body: JSON.stringify({arrays:arrayDefineEmp }), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}
function saveHours() {
    fetch("/data/Week", {
        method: 'POST',
        body: JSON.stringify({}), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => {
        return data.json();
    }).then(res => {
        for (var i = 0; i < res.length; i++)
            arrayDefine.push(res[i]);
    })
        .catch(function (error) {
            console.log('Request failed', error);
        });

}
function saveEmloyee() {
    fetch("/data/Employee", {
        method: 'POST',
        body: JSON.stringify({}), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => {
        return data.json();
    })  .then(res => {
        for (var i = 0; i < res.length; i++){
            arrayDefineEmp.push(res[i]);
            arrayNoWorkSevenDay[i] = {counter:0, idEmp:res[i].id};
        }

    })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

function returnColorByLevel(value) {
    if (value == 1) {
        return "green";
    } else if (value == 2) {
        return "#1b5dfb";
    } else if (value == 3)
        return "red"
}

function returnNameInlayByLevel(value) {
    if (value == 1) {
        return "משמרת בוקר";
    } else if (value == 2) {
        return "משמרת ערב";
    }
}
function translateDay(value){
    if(value == 1)
        return "ראשון";
    if(value == 2)
        return "שני";
    if(value == 3)
        return "שלישי";
    if(value == 4)
        return "רביעי";
    if(value == 5)
        return "חמישי";
    if(value == 6)
        return "שישי";
    if(value ==7)
        return "שבת";
}