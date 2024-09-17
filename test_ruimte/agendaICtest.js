// https://docs.google.com/spreadsheets/d/1bmYBrKD63aJ6uHzLmXcBbB5qf5ecCrHEqNV9b7N-X1U/edit?gid=0#gid=0
const sheetID = '1bmYBrKD63aJ6uHzLmXcBbB5qf5ecCrHEqNV9b7N-X1U'
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
const sheetName = 'Interclub';
const url = `${base}&sheet=${sheetName}`

document.addEventListener("DOMContentLoaded", initIC);
const outputIC = document.getElementById("agendaICtest");

function initIC(){
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        const jsData = JSON.parse(rep.substring(47).slice(0, -2))
        console.log(jsData);
        const data = [];
        const colz = [];
        const labelArr = [];
        jsData.table.cols.forEach((heading, index) => {
            //console.log(heading.id.charCodeAt(0), heading.id, heading.label)
            if(index < 7){
                colz.push(heading.id);
                labelArr.push(heading.label);
            }
        })
        data.push(labelArr);
        jsData.table.rows.forEach(main => {
            tempArr = [];
            for(var i = 0; i < colz.length; i++){
                if(i == colz.length - 1){
                    //console.log("0-0")
                    tempArr.push("0-0")
                } else {
                    //console.log((main.c[i] != null) ? main.c[i].v : '-')
                    tempArr.push((main.c[i] != null) ? main.c[i].v : '-')
                }             
            }
            data.push(tempArr)
        })
        console.log("data", data);
        ICmaker(data);
    })
}

function ICmaker(ICdata){
    // devisions maakt per devisie een verzameling van alle rondes
    var devisions = [];
    // devisionsArr is de opbouwArray voor devisions
    var devisionsArr = [];
    // headers is voor de beschrijving van de kolommen
    var headers = [];
    ICdata.forEach(ICline =>{
        if(ICline[0].split(" ")[0] == "Division"){
            if(devisionsArr.length !== 0){
                devisionsArr.pop()
                devisions.push(devisionsArr)
                devisions.push(ICline[0])
                devisionsArr = []
            } else {
                devisions.push(ICline[0])
                for(var i = 1; i < ICline.length; i++){
                    headers.push(ICline[i])
                }
            }
        } else {
            devisionsArr.push(ICline)
            ICline.shift()
            //console.log("test1st", ICline)
        }
    })
    devisionsArr.pop()
    devisions.push(devisionsArr)
    console.log(devisions, devisionsArr, headers)


    let options = {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    };
    let options2 = {
        weekday: 'long',  // Full name of the day (e.g., Zondag)
        day: 'numeric',   // Day of the month as a number (e.g., 29)
        month: 'long',    // Full name of the month (e.g., september)
        year: 'numeric'   // Full year (e.g., 2024)
    };
    var datum = eval("new " + devisionsArr[0][1])
    console.log((datum.toLocaleDateString("nl-BE", options2).charAt(0).toUpperCase() + datum.toLocaleDateString("nl-BE", options2).slice(1)), datum.toLocaleDateString("nl-BE", options), devisionsArr[0][1])
}

function IClineElement(naam, score, bool, tegenstander){
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