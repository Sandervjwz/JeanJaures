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
document.addEventListener("DOMContentLoaded", init);
const output = document.getElementById("output")

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
        maker(data);
        maker2(data_);
    })
}

function maker(json){
    const reeks_A = [];
    const reeks_B = [];
    for(var i = 0; i < json.length; i++){
        if(i < 9){
            (i != 0 ? reeksranking.push(json[i][0].slice(2)) : null)
            reeks_A.push(json[i])
        } else {
            (i != 9 ? reeksranking.push(json[i][0].slice(2)) : null)
            reeks_B.push(json[i])            
        }
    }
    //console.log(reeksranking)
    arrMakeOver(reeks_A, "A-reeks");
    arrMakeOver(reeks_B, "B-reeks");
}

function maakTabel(resultArr){
    resultArr.pop()
    rankingArr = [];
    for(var i = 0; i < resultArr.length; i++){
        resultArr[i].forEach(line =>{
            if(line == "Geen matchen gespeeld"){
                i++
            } else {
                rankingArr.push(createPlayerRecord(line.split(" : ")[0].split(" - ")[0], line.split(" : ")[1].split(" - ")[0], true, line.split(" : ")[0].split(" - ")[1]))            ;
                rankingArr.push(createPlayerRecord(line.split(" : ")[0].split(" - ")[1], line.split(" : ")[1].split(" - ")[1], false, line.split(" : ")[0].split(" - ")[0]));
            }
        })
        //rankingArr.push(null, null, true, line.split(" : ")[0].split(" - ")[1])  
    }
    rankingArr.sort((a, b) => a.Naamnr - b.Naamnr)
    //console.log(rankingArr)   
    maker3(rankingArr) 
}

function createPlayerRecord(naam, score, bool, tegenstander){
    //&frac12;
    //rankernr();
    var record = {
        Naamnr: rankernr(naam.toLowerCase()).returnnr,
        Naam: naam,
        Score: Number(score == "½" || score == "1/2"? "0.5" : score),
        Wit: bool,
        Tegenstandernr: rankernr(tegenstander.toLowerCase()).returnnr,
        Tegenstander: tegenstander,
        Reeks: rankernr(naam.toLowerCase()).reeks,
        ReeksAantal: rankernr(naam.toLowerCase()).reeksAantal
    };
    //console.log(rankernr(naam.toLowerCase()), rankernr(naam.toLowerCase()).returnnr )
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
    var reeks = `${Arr[0].Reeks}-reeks` //
    var output2 = document.getElementById("output2");
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
    console.log(Arr[Arr.length - 1].Naamnr, Arr[0].ReeksAantal)
    div.style.gridTemplateColumns = `repeat (${Arr[0].ReeksAantal + 3}, 1fr)`;
    first = true;
    var totaal = 0;
    var punten = 0;
    var puntenblueprint = makePuntenArray(Arr[0].ReeksAantal, 2);
    samenvattingArr = [];
    for(var i = 0; i < Arr.length; i++){
        if(Arr[i].Naamnr === Arr[i].Naamnr){
            //console.log(Arr[i].Wit, Arr[i].Tegenstandernr, Arr[i].Score, puntenblueprint[(Arr[i].Wit ? 0 : 1)][Arr[i].Tegenstandernr])
            puntenblueprint[(Arr[i].Wit ? 0 : 1)][Arr[i].Tegenstandernr - 1] = Arr[i].Score;
            totaal += 1;
            punten += Number(Arr[i].Score);
            //console.log(i + 1 < Arr.length, Arr[i + 1].Naamnr, Arr.length, Arr[i].Naamnr + 1)
            if((i + 1 < Arr.length ? Arr[i + 1].Naamnr : Arr[i].Naamnr + 1) === Arr[i].Naamnr + 1){
                console.log(puntenblueprint)
                puntenblueprint[0][Arr[i].Naamnr - 1] = puntenblueprint[1][Arr[i].Naamnr - 1] = "X"
                var PlayerRecordSum = {
                    RankNr : Arr[i].Naamnr,
                    Naam : Arr[i].Naam,
                    Puntenverdeling : puntenblueprint,
                    Punten : punten,
                    Totaal : totaal
                }
                samenvattingArr.push(PlayerRecordSum);
                totaal = 0;
                punten = 0;
                puntenblueprint = makePuntenArray(Arr[0].ReeksAantal, 2);                
            }
        }
    }
    console.log(samenvattingArr);
    console.log(Arr)
    /*
    arr.forEach(line => {
        if(line === arr[0]){
            div.append(makeElement(arrinColumns(line), "header", "row"));
        } else {
            div.append(makeElement(arrinColumns(line), "line", "row"));
        }
    })*/
    div2.append(div);
    divReeks.append(div2);    
    output2.append(reekstitel)
    output2.append(divReeks);
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
    //console.log(resultaat)
    return resultaat
}

function arrMakeOver(arr, reeks){
    arr[0][0] = ''
    for(var i = 0; i < arr.length; i++){   
        if(reeks == 'A-reeks'){
            arr[i].splice(9,1)
        }  
        if(reeks == 'B-reeks'){
            if(arr[9][i] == '-'){
                arr[9][i] = 'F0'
            } if (arr[i][9] == '-'){
                arr[i][9] = 'F1'
            }
        } 
        if(i != 0){
            arr[i][0] = arr[i][0].slice(2);
            //reeksranking.push(arr[i][0])
            arr[i][0] = `${i}) ${arr[i][0]}`
            arr[i][i] = 'X'         
        }
    }
    arrInRows(arr, reeks);
}

function arrInRows(arr, reeks){
    const divReeks = document.createElement('div');
    divReeks.id = reeks;
    const reekstitel = document.createElement('h2')
    reekstitel.innerHTML = reeks
    divReeks.classList.add('reeks');
    const div2 = document.createElement('div');
    div2.classList.add('tableVolgende');
    const div = document.createElement('div');
    div.style.display = 'grid';
    div.classList.add("table");
    div.style.gridTemplateColumns = `repeat (${arr.length}, 1fr)`;
    first = true;
    arr.forEach(line => {
        if(line === arr[0]){
            div.append(makeElement(arrinColumns(line), "header", "row"));
        } else {
            div.append(makeElement(arrinColumns(line), "line", "row"));
        }
    })
    div2.append(div);
    divReeks.append(div2);    
    output.append(reekstitel)
    output.append(divReeks);
}

function arrinColumns(arr){
    const rowResult = document.createElement('div');
    for(var i = 0; i < arr.length; i++){
        var bool = false;
        //console.log(arr[i], typeof arr[i], (typeof arr[i] === 'string' && arr[i].includes(",5"))) //.includes("/"), arr[i].includes(",")
        if(arr[i] == '0,5' || arr[i] == '0.5'){
            arr[i] = '&frac12;'
            bool = true;
        } 
        /*else if (typeof arr[i] === 'string' && arr[i].includes(",5") && bool == false) {
            arr[i] = arr[i].replace(/,5/g, '&frac12;/')
            //console.log(arr[i])
        }*/
        switch(i){
            case 0:
                rowResult.append(makeElement(arr[i], "element", "naam"))
                break;
            case arr.length - 1:
                rowResult.append(makeElement(arr[i], "element", "result"))
                break;
            default:
                rowResult.append(makeElement(arr[i], "element", "point"))
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

function maker2(json){
    const reeks_A = [];
    const reeks_B = [];
    for(var i = 0; i < json.length; i++){
        reeks_A.push(json[i][0])
        reeks_B.push(json[i][1])
    }
    //console.log("json", json, "reeks A", reeks_A, "reeks B", reeks_B)
    arrMakeOver2(reeks_A);
    arrMakeOver2(reeks_B);
    volgendeMover();
}

function arrMakeOver2(arr){
    var result = [];
    var speeldagen = [];
    var currentSubarray = [];
    var reekschecker = arr[0].substring(0, 7);
    var reeks_HTML = waitForElement(reekschecker);
    for(var i = 0; i < arr.length; i++){
        if(arr[i].substring(0, 7) == reekschecker){
            if (currentSubarray.length > 0) {
                result.push(currentSubarray);
            }
            currentSubarray = [];
            speeldagen.push(arr[i].substring(8, 13).trim());
        } else {
            if(arr[i] !== ""){
                currentSubarray.push(arr[i])
            }
        }
    }
    maakTabel(result);
    result.reverse();
    speeldagen.reverse().shift();
    const speeldagen_html = document.createElement('div');
    speeldagen_html.classList.add('speeldagen')
    for(var i = 0; i < result.length; i++){
        if(i == 0){
            speeldagen_html.append(makeElement2(result[i], "speeldag", speeldagen[i], result.length - i, "volgende", `${reekschecker}: volgende`))
        } else {
            speeldagen_html.append(makeElement2(result[i], "speeldag", speeldagen[i], result.length - i, " ", `${reekschecker}:`))              
        }      
    }
    reeks_HTML.append(speeldagen_html);
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
    var getReeks = document.getElementsByClassName('reeks');
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