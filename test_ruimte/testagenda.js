var output = document.getElementById("agendatest");
var aantal_weekdagen = 7;
const maanden = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]
const dagen = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"]
const aantaldagen = (y, m) => new Date(y, (m + 1), 0).getDate();
const eerstedag = (y, m) => (new Date(y, m, 1).getDay() + 6) % 7;
document.addEventListener("DOMContentLoaded", agenda);

function agenda(){
    var dataArr = maakDataAgenda();
    maakAgendaTitel(dataArr.Arr, dataArr.Dag)
    output.append(maakAgenda(dataArr.Arr, dataArr.Dag));
    //console.log(dataArr, dataArr.Arr, dataArr.Dag);
}

function maakDataAgenda(datum){
    dag = createDag(datum) // "2021-02-03" "2023-10-16"
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
    return {
        Arr: resultaatArr,
        Dag: dag
    }
}

function createDag(datum){
    var vandaag_bool = (datum != null ? (datum.charAt(9) == 0 ? true : false) : null);
    //console.log(datum, vandaag_bool == true && datum != null)
    if(vandaag_bool == true && datum != null){
        datum = datum.replace("00", "01") //split("-")[2].
        //console.log(datum, datum.split("-")[2])
    }
    const inputdag = (datum == null ? new Date() : new Date(datum)); //"2024-01-21"
    //console.log(vandaag_bool, datum, typeof datum, (datum != null ? (datum.charAt(9) == 0 ? true : false) : null), (datum != null ? `${datum.charAt(9)} / ${datum.charAt(8)}` : null), vandaag_bool == true && datum != null);
    var dag = {
        dag : (!vandaag_bool ? inputdag.getDate() : 0),
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

function maakAgendaTitel(Arr, dagobj){
    const hoofdding = makeElement("", "titelbalk", null) ;
    var vorigjaar_bool = (dagobj.maand == 0 ? true : false);
    var volgendjaar_bool = (dagobj.maand == 11 ? true : false);

    const vorige_maand = maakDataAgenda(`${(vorigjaar_bool ? dagobj.jaar - 1 : dagobj.jaar)}-${(dagobj.maand + 11) % 12 + 1}-00`)
    vorige_maand.Arr[0].forEach((headerdag, index) => {
        vorige_maand.Arr[0][index] = headerdag[0].toUpperCase()
    })
    var vorige_maand_txt = maakAgenda(vorige_maand.Arr, vorige_maand.Dag)

    console.log(vorige_maand, vorige_maand_txt, vorige_maand.Arr[0]) 
    const titel_html = makeElement("", "agendatitel", null)
    const jaar_titel = document.createElement('h3');
    jaar_titel.innerText = dagobj.jaar
    titel_html.append(jaar_titel)
    const maand_titel = document.createElement('h3');
    maand_titel.innerText = dagobj.maand_txt[0].toUpperCase() + dagobj.maand_txt.slice(1)
    titel_html.append(maand_titel)

    const volgende_maand = maakDataAgenda(`${(volgendjaar_bool ? dagobj.jaar + 1 : dagobj.jaar)}-${(dagobj.maand + 1) % 12 + 1}-00`)
    volgende_maand.Arr[0].forEach((headerdag, index) => {
        volgende_maand.Arr[0][index] = headerdag[0].toUpperCase()
    })
    var volgende_maand_txt = maakAgenda(volgende_maand.Arr, volgende_maand.Dag)
    //dagobj.maand + 11) % 12, (dagobj.maand) % 12, (dagobj.maand + 1) % 12, vorige_maand, vorige_maand_txt, (dagobj.maand == 0 ? true : false), vorigjaar_bool, (dagobj.maand == 11 ? true : false), volgendjaar_bool, (vorigjaar_bool ? dagobj.jaar - 1 : (volgendjaar_bool ? dagobj.jaar + 1 : dagobj.jaar)) 
    //`${dagobj.jaar}-${dagobj.maand + 13 % 12}-0`
    //var test = dagobj.maand
    //dagobj.maand = 1
    //dagobj.maand = test
    //const vorigedag = maakDataAgenda(`${dagobj.jaar}-${dagobj.maand}-0`)
    //var test2 = maakDataAgenda("2024-12-00"), test2
    
    //hoofding.append()
    //const hoofdding = (makeElement(`${makeElement("test", "miniagenda", "terug")} ${makeElement(dagobj.maand_txt, "titel", null)} ${makeElement("test2", "miniagenda", "volgende")}`, "titelbalk", null))
    console.log(hoofdding)
    hoofdding.append(vorige_maand_txt)     
    hoofdding.append(titel_html)
    hoofdding.append(volgende_maand_txt)   
    output.append(hoofdding)    
}

function maakAgenda(Arr, dagobj){
    const result = document.createElement('div');
    result.id = "main_agenda"
    const resultHTML = document.createElement('div');
    resultHTML.classList.add("agenda")
    resultHTML.style.display = 'grid';
    resultHTML.style.gridTemplateColumns = `repeat (${Arr[0].length}, 1fr)`;
    //var resultaatArr = makeElement("", "resultaat");
    for(var i = 0; i < Arr.length; i++){
        var subresultArr = makeElement("", "rij", null);
        for(var j = 0; j < Arr[i].length; j++){
            //console.log(Arr[i][j], dagobj.dag, (Arr[i][j] == dagobj.dag ? true : false))
            if(i == 0){
                subresultArr.append(makeElement(Arr[i][j], "header", "agendavakje"))
            } else {
                subresultArr.append(makeElement(Arr[i][j], "dag", "agendavakje", (Arr[i][j] == dagobj.dag ? true : false)))
            }
        }
        resultHTML.append(subresultArr)
    }
    result.append(resultHTML)
    //console.log(result.innerHTML)
    //output.append(hoofdding)
    //output.append(result)       
    return result
}

function makeElement(text, classA, classB, vandaag){ //
    const ele = document.createElement('div');
    ele.classList.add(classA)
    if(classB !== null){
        ele.classList.add(classB)
    }
    if(vandaag){
        ele.style.color = 'red'
    }
    if(classA == "header"){
        ele.innerHTML = `<span class="kort">${text[0].toUpperCase()}</span><span class="lang">${text}</span>`;
    } else {
        ele.innerHTML = text;
    }
    return ele;
}

