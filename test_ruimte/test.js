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

// https://docs.google.com/spreadsheets/d/1WigEkjbs9IqhgCRG3Vl7HOzRQ4IRtsznDuafR9IWi2o/edit#gid=1454454143
const sheetID = '1WigEkjbs9IqhgCRG3Vl7HOzRQ4IRtsznDuafR9IWi2o'
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
const sheetName = '2324_Jean_Jaurès';
//let qu = 'select *'
const query = encodeURIComponent('select *'); //encodeURIComponent(qu)
const url = `${base}&sheet=${sheetName}&tq${query}`
const data = [];
document.addEventListener("DOMContentLoaded", init);

const output = document.querySelector(".output")

function init(){
    //console.log(url, query, "wekrt");
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        //console.log(rep);
        const jsData = JSON.parse(rep.substring(47).slice(0, -2))
        console.log(jsData);
        const colz = [];
        //first = true;
        jsData.table.cols.forEach(heading => {
            /*if(first){
                first = false;
                console.log(heading);
                console.log("eerste")
            } else { && !first
            }*/
            if(heading.label != null){
                //console.log("tweede", heading.id, heading.id.charCodeAt(0))
                if (heading.id.charCodeAt(0) < 76){
                    //console.log(heading.id);
                    colz.push(heading.label.toLowerCase().replace(/\s/g, ''));
                } 
            }
        })
        //colz.slice(-2);
        //console.log("colz", colz);
        jsData.table.rows.forEach(main => {
            //console.log("main", main);
            const row = {};
            cur_arr = []
            for(var i = 0; i < colz.length; i++){
                cur_arr.push((main.c[i] != null) ? main.c[i].v : '-')
                //console.log(cur_arr);
            }
            data.push(cur_arr);
            /*colz.forEach((ele, ind) => {
                //console.log(ele, ind);
                row[i] = (main.c[ind] != null) ? main.c[ind].v : '';
                console.log("/row = data/", row, "ele = ?", ele, "ind", ind, "main", ((main.c[ind] != null) ? main.c[ind].v : ''), row);
            })
            console.log("row", row);*/
        })
        maker(data);
        //console.log("data", data);
    })
}

function maker(json){
    //console.log(json)
    const reeks_A = [];
    const reeks_B = [];
    for(var i = 0; i < json.length; i++){
        //console.log(json[i])
        if(i < 9){
            reeks_A.push(json[i])
        } else {
            reeks_B.push(json[i])            
        }
    }
    //console.log(reeks_A, reeks_B);
    arrMakeOver(reeks_A, true);
    arrMakeOver(reeks_B, false);
    console.log(reeks_A, reeks_B);
    let first = true;
    /*json.forEach(el => {
        //console.log(el);
        
        console.log('el', el)
        const keys = Object.keys(el);
        div.style.gridTemplateColumns = `repeat (${keys.length}, 1fr)`
        if(first){
            first = false;
            keys.forEach(heading => {
                const ele = document.createElement('div');
                ele.textContent = heading.toUpperCase();
                ele.style.background = 'Black'
                ele.style.color = 'white'
                div.append(ele);
            })
        }
        keys.forEach(key => {
            const ele = document.createElement('div');
            ele.textContent = el[key];
            ele.style.border = '1px solid #ddd'
            div.append(ele);
        })
    })*/
}

function arrMakeOver(arr, bool){
    for(var i = 0; i < arr.length; i++){   
        if(bool){
            arr[i].splice(9,1)
            //console.log(arr[i])
        } 
        if(i != 0){
            arr[i][0] = arr[i][0].slice(2);
            arr[i][i] = 'X'         
            //console.log(arr[i][0].slice(2))
        }
    }
    arrInRows(arr);
}

function arrInRows(arr){
    const div = document.createElement('div');
    div.style.display = 'grid';
    div.style.gridTemplateColumns = `repeat (${arr.length}, 1fr)`;
    first = true;
    //console.log(arr, arr[0])
    arr.forEach(line => {
        if(line === arr[0]){
            div.append(makeElement(arrinColumns(line), "header", "row"));
        } else {            
            //var test = arrinColumns(line);
            //console.log(line, test);
            //arrinColumns(line, line);
            //console.log(line, ele);
            div.append(makeElement(arrinColumns(line), "line", "row"));
        }
    })
    output.append(div);
}

function arrinColumns(arr){
    //console.log(arr);
    const rowResult = document.createElement('div');
    for(var i = 0; i < arr.length; i++){
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
    //console.log(rowResult, rowResult.innerHTML);
    return rowResult.innerHTML
}

function makeElement(text, classA, classB){
    const ele = document.createElement('div');
    ele.classList.add(classA)
    if(classB !== " "){
        ele.classList.add(classB)
    }
    ele.innerHTML = text //.toUpperCase();
    return ele;
}