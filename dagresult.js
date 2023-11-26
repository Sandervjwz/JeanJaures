// https://docs.google.com/spreadsheets/d/1bzNwfuNE9HUIAMSa-JBz_1M9K9XFXwGMr84TFDpDY-g/edit#gid=0
const sheetID_ = '1bzNwfuNE9HUIAMSa-JBz_1M9K9XFXwGMr84TFDpDY-g'
const base_ = `https://docs.google.com/spreadsheets/d/${sheetID_}/gviz/tq?`
const sheetName_ = 'DagResultaatCC';
//let qu = 'select *'
//const query = encodeURIComponent('select *'); //encodeURIComponent(qu) &tq${query}
const url_ = `${base_}&sheet=${sheetName_}`
const data_ = [];
document.addEventListener("initDone", init2);

//const output = document.querySelector(".output")

function init2(){
    //console.log(url, "wekrt");
    fetch(url_)
    .then(res => res.text())
    .then(rep => {
        //console.log(rep);
        const jsData = JSON.parse(rep.substring(47).slice(0, -2));
        //console.log(jsData);
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
            data_.push(cur_arr);
        })
        //console.log("data", data_);
        maker2(data_);
    })
}

function maker2(json){
    //console.log("maker");
    const reeks_A = [];
    const reeks_B = [];
    for(var i = 0; i < json.length; i++){
        //console.log(json[i])
        reeks_A.push(json[i][0])
        reeks_B.push(json[i][1])
    }
    arrMakeOver2(reeks_A);
    arrMakeOver2(reeks_B);
    volgendeMover();
    //console.log(reeks_A, reeks_B);
}

function arrMakeOver2(arr){
    var result = [];
    var speeldagen = [];
    var currentSubarray = [];
    var reekschecker = arr[0].substring(0, 7);
    var reeks_HTML = waitForElement(reekschecker);
    //console.log(reeks_HTML)
    for(var i = 0; i < arr.length; i++){
        //console.log("make over", arr[i], arr[i].substring(0, 7), reekschecker);
        if(arr[i].substring(0, 7) == reekschecker){
            if (currentSubarray.length > 0) {
                result.push(currentSubarray);
            }
            currentSubarray = [];
            //console.log(arr[i], "test", arr[i].substring(8, 13).trim(), "zonder", arr[i].substring(8, 13))
            speeldagen.push(arr[i].substring(8, 13).trim());
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
    //ele.hidden = false
    if(classB !== " "){
        ele.classList.add(classB)
    }
    //console.log("text", text)
    ele.innerHTML = `<h4>${reeks} speeldag ${hoeveelste} ${speeldag}</h4><p>${text.join("</p><p>")}</p>` //.toUpperCase();
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
    //console.log(getReeks, getReeks.length);
    for(var i = 0; i < getReeks.length; i++){
        var element = getReeks[i].childNodes[1].childNodes[0];
        getReeks[i].childNodes[1].removeChild(element)
        getReeks[i].childNodes[0].innerHTML += element.outerHTML;        
        //console.log(getReeks[i].childNodes[1].childNodes.length);    
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
    //console.log(reeks, ele);
    reeks.append(ele)
    meerMinderKnop(ele);
}

function meerMinderKnop(knop){
    var speeldagen = Array.from(knop.parentElement.getElementsByClassName("speeldag"))
    console.log("ik werk", knop, speeldagen)
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