var output = document.getElementById("agendatest");
var aantal_weekdagen = 7;
const maanden = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]
const dagen = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"]
const aantaldagen = (y, m) => new Date(y, (m + 1), 0).getDate();
const eerstedag = (y, m) => (new Date(y, m, 1).getDay() + 6) % 7;
document.addEventListener("DOMContentLoaded", agenda);

function agenda(){
    var dataArr = maakDataSchema();
    maakSchema(dataArr);
    console.log(dataArr);
}

function maakDataSchema(){
    dag = createDag("2023-10-16") // "2021-02-03"
    var dagen_nummer = []
    for(var i = 0; i < dag.aantal_dagen; i++){
        dagen_nummer.push(i + 1);
    }
    var aantal_rijen = 0
    var tussentotaal = dag.aantal_dagen + dag.eerste_dag
    while(tussentotaal > 0){
        tussentotaal -= 7;
        aantal_rijen ++
    }
    var resultaatArr = [];
    for(var i = -1; i < aantal_rijen; i++){
        var subresultArr = []
        for(var j = 0; j < 7; j++){
            if(i == -1){
                subresultArr.push(dagen[j])
                if(dag.eerste_dag > j){
                    dagen_nummer.unshift("")
                }
            } else {
                subresultArr.push(dagen_nummer[i*7 + j] == undefined ? "" : dagen_nummer[i*7 + j])
                //(dagen_nummer[i*7 + j] == undefined ? "" : dagen_nummer[i*7 + j])
            }
        }
        resultaatArr.push(subresultArr)
    }
    return resultaatArr
}

function createDag(datum){
    const inputdag = (datum == null ? new Date() : new Date(datum)); //"2024-01-21"
    var dag = {
        dag : inputdag.getDate(),
        weekdag : (inputdag.getDay() + 6) % 7,
        weekdag_txt : dagen[(inputdag.getDay() + 6) % 7],
        maand : inputdag.getMonth(),
        maand_txt : maanden[inputdag.getMonth()],
        jaar : inputdag.getFullYear(),
        aantal_dagen : aantaldagen(inputdag.getFullYear(), inputdag.getMonth()),
        eerste_dag : eerstedag(inputdag.getFullYear(), inputdag.getMonth())
    }
    console.log(dag)
    //console.log("ik werk", aantaldagen(2020, 2),vandaag_dag ,vandaag_weekdag , vandaag_weekdag_txt,vandaag_maand ,vandaag_jaar, vandaag_maand_txt, eerstedag(vandaag_jaar, vandaag_maand));
    return dag
}

function maakSchema(Arr){
    const result = document.createElement('div');
    const resultHTML = document.createElement('div');
    resultHTML.style.display = 'grid';
    resultHTML.style.gridTemplateColumns = `repeat (${Arr[0].length}, 1fr)`;
    //var resultaatArr = makeElement("", "resultaat");
    for(var i = 0; i < Arr.length; i++){
        var subresultArr = makeElement("", "rij");
        for(var j = 0; j < Arr[i].length; j++){
            //console.log(Arr[i])
            if(i == 0){
                subresultArr.append(makeElement(Arr[i][j], "header"))
            } else {
                subresultArr.append(makeElement(Arr[i][j], "dag"))
            }
        }
        resultHTML.append(subresultArr)
    }
    //resultHTML.append(resultaatArr)
    result.append(resultHTML)
    console.log(result.innerHTML)
    output.append(result)




    /*const divReeks = document.createElement('div');
    divReeks.id = reeks;
    const reekstitel = document.createElement('h2')
    reekstitel.innerHTML = reeks
    divReeks.classList.add('reeks2');
    const div2 = document.createElement('div');
    div.classList.add("table");
    //console.log(Arr[Arr.length - 1].Naamnr, Arr[0].ReeksAantal)*/

}

function makeElement(text, classA){ //,classB
    const ele = document.createElement('div');
    ele.classList.add(classA)
    /*if(classB !== " "){
        ele.classList.add(classB)
    }*/
    ele.innerHTML = text;
    return ele;
}

