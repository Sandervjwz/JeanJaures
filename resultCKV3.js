// https://docs.google.com/spreadsheets/d/12pejFXzogBFjWxH0qodEhfLl6eWxAVf2B23BEaoRYKQ/edit#gid=0
const sheetID = '12pejFXzogBFjWxH0qodEhfLl6eWxAVf2B23BEaoRYKQ'
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
const sheetName = 'ResultSheet';
//let qu = 'select *'
//const query = encodeURIComponent('select *'); //encodeURIComponent(qu) &tq${query}
const url = `${base}&sheet=${sheetName}`
const data = [];
const data_ = [];
const reeksranking = [];
const forfait = [];
//const forfaitB = [];
document.addEventListener("DOMContentLoaded", init);
const output = document.getElementById("Clubkampioenschap")
var speeldagen_html;

function init(){
    //console.log(url, "wekrt");
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        //console.log(rep);
        const jsData = JSON.parse(rep.substring(47).slice(0, -2))
        //console.log(jsData);
        const colz = [];
        jsData.table.cols.forEach(heading => {
            if(heading.label != null){
                if (heading.id.charCodeAt(0) < 76){
                    //console.log(heading.id.charCodeAt(0), heading.id)
                    colz.push(heading.label.toLowerCase().replace(/\s/g, ''));
                } 
            }
        })
        var j = 0;
        jsData.table.rows.forEach(main => {
            if(j < 19){
                //const row = {};
                cur_arr = []
                for(var i = 0; i < colz.length; i++){
                    cur_arr.push((main.c[i] != null) ? main.c[i].v : '-');
                }
                data.push(cur_arr);  
                j ++              
            } else {
                cur_arr = []
                for(var i = 0; i < colz.length; i++){
                    switch(i){
                        case 0:
                            cur_arr.push((main.c[i] != null) ? main.c[i].v : '');
                            break;
                        case 3:
                            cur_arr.push((main.c[i] != null) ? main.c[i].v : '');
                            break;
                        case 4:
                            i = colz.length;
                            break;
                        default:
                            break;                        
                    }
                }
                data_.push(cur_arr);
            }
        })
        //console.log("data", data);
        //console.log("data_", data_);
        //maker(data);
        maker2(data, data_);
    })
}

function maker2(json, json_){
    const reeks_A = [];
    const reeks_B = [];
    //console.log(json)
    for(var i = 0; i < json.length; i++){
        if(i < 9){
            if(i != 0){
                reeksranking.push(json[i][0].slice(2));
                (json[i][0].charAt(0) == 'F' ? forfait.push(true) : forfait.push(false))
            }     
        } else {
            if(i != 9){
                reeksranking.push(json[i][0].slice(2));
                (json[i][0].charAt(0) == 'F' ? forfait.push(true) : forfait.push(false))
            }    
        }
    }
    json_.forEach(record => {
        reeks_A.push(record[0])
        reeks_B.push(record[1])
    })
    //console.log("json", json, "json_", json_, "reeks A", reeks_A, "reeks B", reeks_B, "reeksranking", reeksranking, "forfait", forfait)
    arrMakeOver2(reeks_A);
    arrMakeOver2(reeks_B);
    volgendeMover();
}

function arrMakeOver2(arr){
    var result = [];
    var speeldagen = [];
    var currentSubarray = [];
    var reekschecker = arr[0].substring(0, 7);
    //console.log(arr, reekschecker)
    //var reeks_HTML = document.getElementById(reekschecker) //waitForElement(reekschecker);
    for(var i = 0; i < arr.length; i++){
        if(arr[i].substring(0, 7) == reekschecker){
            if (currentSubarray.length > 0) {
                //console.log(currentSubarray, result, arr[i].substring(0, 7))
                result.push(currentSubarray);
            }
            //console.log(result, currentSubarray, currentSubarray.length)
            currentSubarray = [];
            speeldagen.push(arr[i].substring(8, 13).trim());
            var currentDate = arr[i].substring(8, 13).trim();
            var currentDateResult;
            var bool = false;
            if(currentDate.length != 5){
                bool = true
                currentDateResult = `${(Number(currentDate.split("/")[0]).length = 1 ? "0" + Number(currentDate.split("/")[0]) : Number(currentDate.split("/")[0]))}/`
            } else {
                if(isNaN(currentDate.split("/")[1])){
                    bool = true
                } else {
                    bool = false
                }
            }
            console.log(currentDate, bool, currentDate.split("/")[0], Number(currentDate.split("/")[1]), currentDateResult)
        } else {
            if(arr[i].split(" : ").length > 1 && arr[i].split(" : ")[1] == "1/2 - 1/2"){
                arr[i] = arr[i].split(" : ")[0] + ' : ½ - ½'
                //console.log("werkt", arr[i].split(" : ")[1], '½ - ½')
            }
            if(arr[i] !== ""){
                //console.log(arr[i].split(" : "), (arr[i].split(" : ").length > 1 && arr[i].split(" : ")[1] == "1/2 - 1/2"))
                currentSubarray.push(arr[i])
            }
        }
    }
    result.reverse();
    speeldagen.reverse().shift();
    //console.log(speeldagen, result)
    speeldagen_html = document.createElement('div')
    speeldagen_html.classList.add('speeldagen')
    for(var i = 0; i < result.length; i++){
        if(i == 0){
            speeldagen_html.append(makeElement2(result[i], "speeldag", speeldagen[i], result.length - i, "volgende", `${reekschecker}: volgende`))
        } else {
            speeldagen_html.append(makeElement2(result[i], "speeldag", speeldagen[i], result.length - i, " ", `${reekschecker}:`))              
        }      
    }
    //console.log(speeldagen_html);
    maakTabel(result.reverse());
    //reeks_HTML.append(speeldagen_html);
}

function makeElement2(text, classA, speeldag, hoeveelste, classB, reeks){
    const ele = document.createElement('div');
    ele.classList.add(classA)
    if(classB !== " "){
        ele.classList.add(classB)
    }
    ele.innerHTML = `<h4>${reeks} speeldag ${hoeveelste} (${speeldag})</h4><p>${text.join("</p><p>")}</p>`
    return ele;
}

function maakTabel(resultArr){
    //resultArr.pop()
    console.log(resultArr)   
    rankingArr = [];
    for(var i = 0; i < resultArr.length - 1; i++){
        resultArr[i].forEach(line =>{
            //console.log(line.trim().toLowerCase()) 
            if(line !== "Geen matchen gespeeld"){
                //console.log("N&I2", line.split(":")[0].trim().split("-")[0].trim(), line.split(":")[1].trim().split("-")[0].trim(), true, line.split(":")[0].trim().split("-")[1].trim())  
                rankingArr.push(createPlayerRecord(line.split(":")[0].trim().split("-")[0].trim(), line.split(":")[1].trim().split("-")[0].trim(), true, line.split(":")[0].trim().split("-")[1].trim()));
                rankingArr.push(createPlayerRecord(line.split(":")[0].trim().split("-")[1].trim(), line.split(":")[1].trim().split("-")[1].trim(), false, line.split(":")[0].trim().split("-")[0].trim()));
                //rankingArr.push(createPlayerRecord(line.split(" : ")[0].split(" - ")[1], line.split(" : ")[1].split(" - ")[1], false, line.split(" : ")[0].split(" - ")[0]));
            }
        })
        //rankingArr.push(null, null, true, line.split(" : ")[0].split(" - ")[1])  
    }
    rankingArr.sort((a, b) => a.Naamnr - b.Naamnr)
    maker3(rankingArr) 
}

function createPlayerRecord(naam, score, bool, tegenstander){
    var record = {
        Naamnr: rankernr(naam.toLowerCase()).returnnr,
        Naam: naam,
        Score: Number(score == "½" || score == "1/2" ? "0.5" : score),
        Wit: bool,
        Tegenstandernr: rankernr(tegenstander.toLowerCase()).returnnr,
        Tegenstander: tegenstander,
        Reeks: rankernr(naam.toLowerCase()).reeks,
        ReeksAantal: rankernr(naam.toLowerCase()).reeksAantal
    };
    return record
}

function rankernr(naam){
    //console.log("naam", naam)
    rankings = [];
    rankingA = [];
    rankingB = [];
    var returnnr;
    var reeks;
    var reeksAantal;
    for(var i = 0; i < reeksranking.length; i++){
        if(i < 8){
            rankingA.push(reeksranking[i].toLowerCase())
        } else {
            rankingB.push(reeksranking[i].toLowerCase())
        }
    }
    rankings.push(rankingA, rankingB)
    rankings.forEach((ranking, index) => {
        for(var i = 0; i < ranking.length; i++){
            if(ranking[i] === naam){
                returnnr = i + 1;
                reeksAantal = ranking.length
                reeks = (index == 0 ? "A" : "B")
                //console.log(ranking[i], "ba", naam, returnnr)
            } 
        }
        (returnnr === undefined ? returnnr = "euh foutje" : null)
    })
    return {returnnr, reeks, reeksAantal}
}

function maker3(Arr){
    var teller = Arr[0].ReeksAantal + 3
    var reeks = `${Arr[0].Reeks}-reeks` //
    //var output2 = document.getElementById("output2");
    const divReeks = document.createElement('div');
    divReeks.id = reeks;
    const reekstitel = document.createElement('h2')
    reekstitel.innerHTML = reeks
    divReeks.classList.add('reeks2');
    const div2 = document.createElement('div');
    div2.classList.add('tableVolgende');
    const div = document.createElement('div');
    div.style.display = 'grid';
    div.classList.add("table");
    //console.log(Arr[Arr.length - 1].Naamnr, Arr[0].ReeksAantal)
    div.style.gridTemplateColumns = `repeat (${teller}, 1fr)`;
    first = true;
    var totaal = 0;
    var punten = 0;
    var puntenblueprint = makePuntenArray(Arr[0].ReeksAantal, 2);
    var samenvattingArr = [];  
    var forfaitTeller = (Arr[0].Reeks == "A" ? 0 : 8);
    for(var i = 0; i < Arr.length; i++){
        if(Arr[i].Naamnr === Arr[i].Naamnr){
            //console.log(Arr[i].Wit, Arr[i].Tegenstandernr, Arr[i].Score, puntenblueprint[(Arr[i].Wit ? 0 : 1)][Arr[i].Tegenstandernr])
            puntenblueprint[(Arr[i].Wit ? 0 : 1)][Arr[i].Tegenstandernr - 1] = Arr[i].Score;
            totaal += 1;
            punten += Number(Arr[i].Score);
            //console.log(i + 1 < Arr.length, Arr[i + 1].Naamnr, Arr.length, Arr[i].Naamnr + 1)
            if((i + 1 < Arr.length ? Arr[i + 1].Naamnr : Arr[i].Naamnr + 1) === Arr[i].Naamnr + 1){
                //console.log(puntenblueprint)
                puntenblueprint[0][Arr[i].Naamnr - 1] = puntenblueprint[1][Arr[i].Naamnr - 1] = "X"
                var PlayerRecordSum = {
                    RankNr_OG : Arr[i].Naamnr,
                    RankNr_new : 0,
                    Naam : Arr[i].Naam,
                    Puntenverdeling : puntenblueprint,
                    Puntenverdeling_tosort : puntenblueprint,
                    Punten : punten,
                    Totaal : totaal,
                    PuntenPercent : 0, 
                    ReeksAantal : Arr[i].ReeksAantal,
                    Forfait : forfait[forfaitTeller]
                }
                //console.log(i, forfaitTeller ,forfait[forfaitTeller])
                samenvattingArr.push(PlayerRecordSum);
                totaal = 0;
                punten = 0;
                puntenblueprint = makePuntenArray(Arr[0].ReeksAantal, 2);        
                forfaitTeller ++        
            }
        }
    }
    var forfaitindex = [];
    console.log(samenvattingArr)
    for(var i = 0; i < samenvattingArr.length; i++){
        if(samenvattingArr[i].Forfait){
            forfaitindex.push(i) 
            var forfaitArr = samenvattingArr[i].Puntenverdeling;
            for(var x = 0; x < forfaitArr.length; x++){
                forfaitArr[x].forEach((punt, index) => {
                    if(punt == "-"){
                        forfaitArr[x][index] = "F0"
                        samenvattingArr[i].Totaal ++;
                    }
                })
            }
            //console.log(samenvattingArr[i].Puntenverdeling, forfaitArr)
        }
    }
    //console.log(forfaitindex)
    for(var i = 0; i < forfaitindex.length; i++){
        for(var j = 0; j < samenvattingArr.length; j++){
            var puntteller = 0;
            //console.log(samenvattingArr[j].Puntenverdeling[0][forfaitindex[i]])
            if(samenvattingArr[j].Puntenverdeling[0][forfaitindex[i]] == "-" || samenvattingArr[j].Puntenverdeling[1][forfaitindex[i]] == "-"){
                if(samenvattingArr[j].Puntenverdeling[0][forfaitindex[i]] == "-"){
                    samenvattingArr[j].Puntenverdeling[0][forfaitindex[i]] = "F1"
                    puntteller ++;
                } 
                if(samenvattingArr[j].Puntenverdeling[1][forfaitindex[i]] == "-"){
                    samenvattingArr[j].Puntenverdeling[1][forfaitindex[i]] = "F1"
                    puntteller ++;
                }
                //console.log(puntteller)
            }
            samenvattingArr[j].Punten += puntteller
            samenvattingArr[j].Totaal += puntteller
        }


    }
    reSort(samenvattingArr)
    var header = {
        Tekst : [],
        ReeksAantal : Arr[0].ReeksAantal
    };
    for(var i = 0; i < teller; i++){
        switch(i){
            case 0:
                header.Tekst.push("");
                break;
            case 1:
                header.Tekst.push(`<img src="./img/kleur4.png" alt="kleur">`);
                break;
            case teller - 1:
                header.Tekst.push("Resultaat");
                break;
            default:
                header.Tekst.push(`${(i - 1)}`);
                //console.log(samenvattingArr[i - 2], (samenvattingArr[i - 2].Forfait ? `<span>F</span>` : ""))
                // (samenvattingArr[i - 2].Forfait ? `<span style="color:black">F</span>` : "")
                // ${`<span style="color:black">F</span>`}
        }        
    }
    //console.log(header);
    //console.log(Arr)
    div.append(makeElement(arrinColumns3(header, true), "header", "row"))
    samenvattingArr.forEach(line => {
        div.append(makeElement(arrinColumns3(line, false), "line", "row"));
    })
    div2.append(div);
    divReeks.append(div2);    
    //console.log("speeldagen", speeldagen_html)
    divReeks.append(speeldagen_html);    
    //speeldagen_html = document.createElement('div');
    output.append(reekstitel)
    output.append(divReeks);
}

function makePuntenArray(x, y){
    var resultaat = []
    for(var i = 0; i < y; i++){
        var subresultaat = []
        for(var j = 0; j < x; j++){
            subresultaat.push("-")
        }
        resultaat.push(subresultaat)
    }
    return resultaat
}

function reSort(input){
    var changeArr = []
    for(var i = 0; i < input.length; i++){
        input[i].PuntenPercent = Math.round(input[i].Punten / input[i].Totaal * 10000) / 100
    }
    input.sort(function (a, b){return b.PuntenPercent - a.PuntenPercent})
    for(var i = 0; i < input.length; i++){
        input[i].RankNr_new = i + 1
        changeArr.push({
            i_old : input[i].RankNr_OG,
            i_new : input[i].RankNr_new,
            Puntenverdeling : input[i].Puntenverdeling_tosort
        })
    }
    for(var i = 0; i < changeArr.length; i++){
        var Puntenverdeling_new = makePuntenArray(changeArr[0].Puntenverdeling[0].length, 2)
        var Puntenverdeling_sort = changeArr[i].Puntenverdeling
        Puntenverdeling_new.forEach((rij, index_r) => {
            changeArr.forEach(element => {
                rij[element.i_new - 1] = Puntenverdeling_sort[index_r][element.i_old - 1]
            })
        })
        changeArr[i].Puntenverdeling = Puntenverdeling_new
    }
    var laatste_dubbele_index = 0
    input.forEach((element, index) => {
        element.Puntenverdeling = changeArr[index].Puntenverdeling
        if(index != 0){
            if(input[index].PuntenPercent == input[index - 1].PuntenPercent){
                if(input[laatste_dubbele_index].PuntenPercent === input[element.RankNr_new - 2].PuntenPercent){
                    element.RankNr_new = input[index - 2].RankNr_new
                } else {
                    laatste_dubbele_index = index
                    element.RankNr_new = index
                }
            }
        }
    })
    //console.log(input, changeArr)
}

function arrinColumns3(arr, header){
    //var forfaitbool = false;
    var teller = arr.ReeksAantal + 3
    const rowResult = document.createElement('div');
    //console.log(arr, arr.Puntenverdeling)
    var subplayer = makeElement("", "subplayer", " ")
    var subresult = makeElement("", "subresult", " ")
    for(var j = 0; j < teller; j++){     
        //console.log(arr[j], arr[arr.length - 1]) //.includes("/"), arr[i].includes(",")
        /*if(arr.Tekst[j] == '0,5' || arr.Tekst[j] == '0.5'){
            arr.Tekst[j] = '&frac12;'
        }*/
        if(header){
            switch(j){
                case 0:
                    rowResult.append(makeElement(arr.Tekst[j], "element", "naam"))
                    break;
                case 1:
                    subresult.append(makeElement(arr.Tekst[j], "element", "point"))
                    break;
                case teller - 1:
                    subplayer.append(subresult)
                    rowResult.append(subplayer)
                    subplayer = makeElement("", "subplayer", " ")
                    subresult = makeElement("", "subresult", " ")
                    rowResult.append(makeElement(arr.Tekst[j], "element", "result"))
                    break;
                default:
                    subresult.append(makeElement(arr.Tekst[j], "element", "point"))
            }
        } else {
            switch(j){
                case 0:
                    rowResult.append(makeElement(`${arr.RankNr_new}) ${arr.Naam}`, "element", "naam"))
                    break;
                case teller - 1:
                    rowResult.append(makeElement(`${arr.Punten} / ${arr.Totaal}`, "element", "result"))
                    break;
                default:
                    rowResult.append(makeElement(maakSubResult(arr), "subplayer", " "))
                    j = teller - 2
            }
        }
    }    
    return rowResult.innerHTML
}

function makeElement(text, classA, classB){
    const ele = document.createElement('div');
    ele.classList.add(classA)
    if(classB !== " "){
        ele.classList.add(classB)
    }
    ele.innerHTML = text;
    return ele;
}

function maakSubResult(obj){
    arr = obj.Puntenverdeling
    var result = document.createElement('div');
    arr.forEach((line, index) => {
        var subresult = makeElement("", "subresult", " ")
        subresult.append(makeElement(``, "element", (index == 0 ? "white" : "black") ))
        line.forEach(punt => {
            /*if(obj.Forfait){
                (punt == '-' ? punt = "F0" : null)
                //console.log(punt, obj.Forfait)
            }*/
            subresult.append(makeElement((punt == '0.5' ? '&frac12;' : punt), "element", "point"))
        })
        result.append(subresult)
    })
    //console.log(result.innerHTML);
    return result.innerHTML
}

function waitForElement(reeks) {
    var element = document.getElementById(reeks);
    while (element === null) {
        setTimeout(() => {
            element = document.getElementById(reeks);
        }, 1000);
    }
    return element
}

function volgendeMover(){
    var getReeks = document.getElementsByClassName('reeks2');
    for(var i = 0; i < getReeks.length; i++){
        var element = getReeks[i].childNodes[1].childNodes[0];
        getReeks[i].childNodes[1].removeChild(element)
        getReeks[i].childNodes[0].innerHTML += element.outerHTML;       
        if(getReeks[i].childNodes[1].childNodes.length > 5){
            meerMinderKnopAdd(getReeks[i].childNodes[1]);
        }
    }
}

function meerMinderKnopAdd(reeks){
    const ele = document.createElement('a');
    ele.innerText = 'meer'
    ele.onclick = function(){
        meerMinderKnop(this)
    };
    ele.classList.add('meerMinderKnop');
    ele.classList.add('meer');
    reeks.append(ele)
    meerMinderKnop(ele);
}

function meerMinderKnop(knop){
    var speeldagen = Array.from(knop.parentElement.getElementsByClassName("speeldag"))
    if(knop.classList.contains("meer")){
        for(var i = 0; i < speeldagen.length; i++){
            if(i > 2){
                speeldagen[i].hidden = true
            }
        }
        knop.classList.remove("meer");
        knop.innerText = 'meer';
    } else {
        for(var i = 0; i < speeldagen.length; i++){
            if(i > 2){
                speeldagen[i].hidden = false
            }
        }
        knop.classList.add("meer");
        knop.innerText = 'minder';
    }
}