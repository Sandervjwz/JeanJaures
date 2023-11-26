//document.body.innerHTML += "<p>js werkt</p>"
var namenArray = ["test1", "test2", "test3"];
var orders = document.getElementById("orders")
var rijen = document.getElementById("rijen");

window.onload = function (){
    //document.body.innerHTML += "<p>js werkt</p>"
    console.log("test", orders, namenArray)
    for(var j = 0; j < namenArray.length; j++){
        orders.innerHTML += `<div class="order">${j}</div>`
        rijen.innerHTML += 
        `<div class="rij flex">
            <div class="order">${j}</div>
            <div class="item_naam">${namenArray[j]}</div>
            ${maakScoreSchema(j)}
        </div>
        `
    }
    //testspan.innerText = '';
    /*for(var i = 0; i < orders.length; i++){
        for(var j = 0; j < namenArray.length; j++){
            orders[i].innerHTML += `<div class="order">${j}</div>`
        }
    }*/
}

function maakScoreSchema(index){
    var resultaat = ''
    for(var i = 0; i < namenArray.length; i++){
        if(index == i){
            resultaat += `<div class="item">x</div>`
        } else {            
            resultaat += `<div class="item">-</div>`
        }
    }
    return resultaat
}

let timer;
const waitTime = 1000;
const testspan = document.getElementById('testspan');
const inputvakje = document.getElementById('inputvakje');

inputvakje.addEventListener('keyup', event => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    doneTyping(event.target.value);
  }, waitTime);
});

function doneTyping(value) {
    var te_testen = value.split("@").pop();
    if(value.includes('@')){
        if(te_testen.trim().toLowerCase() == 'softtouch.be'){
            testspan.innerText = "Opgepast, ben je zeker dat je je @softtouch.be account wilt gebruiken?".toUpperCase();
            //alert("Opgepast, ben je zeker dat je je @softtouch.be account wilt gebruiken?".toUpperCase());
            testspan.style.color = "red";
        } else {
            testspan.innerText = "";
        }
    } else {
        testspan.innerText = "";
    } 
}

window.onclick = function (event) {
    var myBox = document.getElementById('test1');

    if (event.target.contains(myBox) && event.target !== myBox) {
       console.log('You clicked outside the box!', event.target, event);
    } else {
        console.log('You clicked inside the box!');
    }
}

// https://docs.google.com/spreadsheets/d/1bzNwfuNE9HUIAMSa-JBz_1M9K9XFXwGMr84TFDpDY-g/edit#gid=0
const sheetID = '1bzNwfuNE9HUIAMSa-JBz_1M9K9XFXwGMr84TFDpDY-g'
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
const sheetName = 'DagResultaatCC';
//let qu = 'select *'
//const query = encodeURIComponent('select *'); //encodeURIComponent(qu) &tq${query}
const url = `${base}&sheet=${sheetName}`
const data = [];
document.addEventListener("DOMContentLoaded", init);

const output = document.querySelector(".output")

function init(){
    //console.log(url, "wekrt");
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        //console.log(rep);
        const jsData = JSON.parse(rep.substring(47).slice(0, -2));
        console.log(jsData);
        const colz = [];
        jsData.table.cols.forEach(heading => {
            if(heading.label != null){
                if (heading.id.charCodeAt(0) < 76){
                    colz.push(heading.label.toLowerCase().replace(/\s/g, ''));
                } 
            }
        })
        jsData.table.rows.forEach(main => {
            //console.log(main)
            //const row = {};
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
            data.push(cur_arr);
        })
        console.log("data", data);
        maker(data);
    })
}

function maker(json){
    //console.log("maker");
    const reeks_A = [];
    const reeks_B = [];
    for(var i = 0; i < json.length; i++){
        //console.log(json[i])
        reeks_A.push(json[i][0])
        reeks_B.push(json[i][1])
    }
    arrMakeOver(reeks_A);
    arrMakeOver(reeks_B);
    //console.log(reeks_A, reeks_B);
}

function arrMakeOver(arr){
    var result = [];
    var speeldagen = [];
    var currentSubarray = [];
    var reekschecker = arr[0].substring(0, 7);
    var reeks_HTML = document.getElementById(reekschecker);
    console.log(reeks_HTML)
    for(var i = 0; i < arr.length; i++){
        //console.log("make over", arr[i], arr[i].substring(0, 7));
        if(arr[i].substring(0, 7) == reekschecker){
            if (currentSubarray.length > 0) {
                result.push(currentSubarray);
            }
            currentSubarray = [];
            //console.log(arr[i], "test", arr[i].substring(8, 13).trim(), "zonder", arr[i].substring(8, 13))
            speeldagen.push(arr[i].substring(8, 13).trim());
            //console.log()
        } else {
            if(arr[i] !== ""){
                currentSubarray.push(arr[i])
            }
        }
    }
    result.reverse();
    speeldagen.reverse().shift();
    //console.log("result", result, speeldagen);
    const speeldagen_html = document.createElement('div');
    speeldagen_html.classList.add('speeldagen')
    for(var i = 0; i < result.length; i++){
        if(i == 0){
            speeldagen_html.append(makeElement(result[i], "speeldag", speeldagen[i], result.length - i, "volgende", `${reekschecker} Volgende`))
        } else {
            speeldagen_html.append(makeElement(result[i], "speeldag", speeldagen[i], result.length - i, " ", reekschecker))              
        }      
    }
    output.append(speeldagen_html);
}

function makeElement(text, classA, speeldag, hoeveelste, classB, reeks){
    const ele = document.createElement('div');
    ele.classList.add(classA)
    if(classB !== " "){
        ele.classList.add(classB)
    }
    //console.log("text", text)
    ele.innerHTML = `<h4>${reeks} speeldag ${hoeveelste} ${speeldag}</h4><p>${text.join("</p><p>")}</p>` //.toUpperCase();
    return ele;
}