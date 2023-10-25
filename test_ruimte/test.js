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
        first = true;
        jsData.table.cols.forEach(heading => {
            if(first){
                first = false;
                console.log(heading);
                console.log("eerste")
            } else {
                if(heading.label != null && !first){
                    console.log("tweede")
                    colz.push(heading.label.toLowerCase().replace(/\s/g, ''));
                } 
            } 
            //console.log("colz", colz);
        })
        jsData.table.rows.forEach(main => {
            //console.log("main", main);
            const row = {};
            colz.forEach((ele, ind) => {
                //console.log(ele, ind);
                row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
                //console.log("row", row, "ele", ele, "ind", ind);
            })
            data.push(row);
        })
        maker(data);
            console.log("data", data);
    })
}

function maker(json){
    const div = document.createElement('div');
    div.style.display = 'grid';
    output.append(div);
    let first = true;
    json.forEach(el => {
        //console.log(el);
        /*
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
        })*/
    })
}