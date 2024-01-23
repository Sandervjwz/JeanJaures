// https://docs.google.com/spreadsheets/d/12pejFXzogBFjWxH0qodEhfLl6eWxAVf2B23BEaoRYKQ/edit#gid=0
const sheetID = '12pejFXzogBFjWxH0qodEhfLl6eWxAVf2B23BEaoRYKQ'
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
const sheetName = 'ResultSheet';
//let qu = 'select *'
//const query = encodeURIComponent('select *'); //encodeURIComponent(qu) &tq${query}
const url = `${base}&sheet=${sheetName}`
const data = [];
const data_ = [];
document.addEventListener("DOMContentLoaded", init);
//const output = document.getElementById("Clubkampioenschap")
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
                    colz.push(heading.label.toLowerCase().replace(/\s/g, ''));
                } 
            }
        })
        var j = 0;
        jsData.table.rows.forEach(main => {
            if(j < 19){
                const row = {};
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
            reeks_A.push(json[i])
        } else {
            reeks_B.push(json[i])            
        }
    }
    arrMakeOver(reeks_A, "A-reeks");
    arrMakeOver(reeks_B, "B-reeks");
}

function arrMakeOver(arr, reeks){
    arr[0][0] = ''
    for(var i = 0; i < arr.length; i++){   
        if(reeks == 'A-reeks'){
            arr[i].splice(9,1)
        } 
        if(i != 0){
            arr[i][0] = arr[i][0].slice(2);
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
            //console.log(result, currentSubarray)
            currentSubarray = [];
            speeldagen.push(arr[i].substring(8, 13).trim());
        } else {
            if(arr[i] !== ""){
                currentSubarray.push(arr[i])
            }
        }
    }
    result.reverse();
    speeldagen.reverse().shift();
    //console.log(speeldagen, result)
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