// https://docs.google.com/spreadsheets/d/1bmYBrKD63aJ6uHzLmXcBbB5qf5ecCrHEqNV9b7N-X1U/edit?gid=0#gid=0
const sheetID = '1bmYBrKD63aJ6uHzLmXcBbB5qf5ecCrHEqNV9b7N-X1U'
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
const sheetNames = ["2024-2025"]//'Interclub'; , "2025-2026"
// headers is voor de beschrijving van de kolommen
var headers = [];

document.addEventListener("DOMContentLoaded", initIC);
const outputIC = document.getElementById("agendaICtest");

function initIC(){
    sheetNames.forEach(sheetName => {
        const url = `${base}&sheet=${sheetName}`
        fetch(url)
        .then(res => res.text())
        .then(rep => {
            const jsData = JSON.parse(rep.substring(47).slice(0, -2))
            const data = [];
            const colz = [];
            const labelArr = [];
            jsData.table.cols.forEach((heading, index) => {
                //console.log(heading.id.charCodeAt(0), heading.id, heading.label)
                if(index < 7){
                    colz.push(heading.id);
                    labelArr.push(heading.label);
                } else if (index == 7 && heading.label != null){
                    labelArr.push(heading.label);
                }
            })
            data.push(labelArr);
            jsData.table.rows.forEach(main => {
                //console.log(main, colz.length)
                tempArr = [];
                if(main.c[colz.length].v !== null){
                    console.log(main.c[colz.length].v)
                }
                for(var i = 0; i < colz.length; i++){
                    if(i == (colz.length - 1)){
                        tempArr.push((main.c[colz.length - 1] != null) ? main.c[colz.length - 1].v : '0-0')
                    } else {
                        tempArr.push((main.c[i] != null) ? main.c[i].v : '-')
                    }             
                }
                data.push(tempArr)
            })
            //console.log("data", data);
            ICmaker(data, sheetName);
        })
        
    })
}

function ICmaker(ICdata, year){
    // devisions maakt per devisie een verzameling van alle rondes
    var devisions = [];
    // devisionsArr is de opbouwArray voor devisions
    var devisionsArr = [];
    ICdata.forEach(ICline =>{
        if(ICline[0].split(" ")[0] == "Division"){
            if(devisionsArr.length !== 0){
                devisionsArr.pop()
                devisions.push(devisionsArr)
                devisionsArr = []
                devisionsArr.push(ICline[0])
            } else {
                devisionsArr.push(ICline[0])
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
    var devisionsObj = [];
    devisions.forEach(devision => {
        var DevisionNaam = devision[0].split(" ")[1]
        devision.slice(1).forEach(devisionlijn => {
            //console.log(IClineElement(DevisionNaam, devisionlijn))
            devisionsObj.push(IClineElement(DevisionNaam, devisionlijn))//,year
        })
    });
    console.log(year, devisionsObj)//, devisionsArr
}

function IClineElement(DevisionNaam, LijnArr){ 
    // Ronde voor de nummer knallen
    LijnArr[0] = headers[0] + " " + LijnArr[0];
    // Datefunction to be being inside another function
    var datum = eval("new " + LijnArr[1])
    let optionsShort = {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    };
    var dateShort = datum.toLocaleDateString("nl-BE", optionsShort)
    let optionsLong = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    var dateLong = (datum.toLocaleDateString("nl-BE", optionsLong).charAt(0).toUpperCase() + datum.toLocaleDateString("nl-BE", optionsLong).slice(1))    
    var DevisionRecord = {
        Afdeling: DevisionNaam,
        DateLong: dateLong,
        DateShort: dateShort
        //,Year: year
    };
    headers.forEach((key, index) => {
        DevisionRecord[key] = LijnArr[index]
    })
    return DevisionRecord
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