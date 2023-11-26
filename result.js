// https://docs.google.com/spreadsheets/d/1WigEkjbs9IqhgCRG3Vl7HOzRQ4IRtsznDuafR9IWi2o/edit#gid=1454454143
const sheetID = '1WigEkjbs9IqhgCRG3Vl7HOzRQ4IRtsznDuafR9IWi2o'
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
const sheetName = '2324_Jean_Jaurès';
//let qu = 'select *'
//const query = encodeURIComponent('select *'); //encodeURIComponent(qu) &tq${query}
const url = `${base}&sheet=${sheetName}`
const data = [];
document.addEventListener("DOMContentLoaded", init);
const output = document.getElementById("Clubkampioenschap")

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
        jsData.table.rows.forEach(main => {
            const row = {};
            cur_arr = []
            for(var i = 0; i < colz.length; i++){
                cur_arr.push((main.c[i] != null) ? main.c[i].v : '-');
            }
            data.push(cur_arr);
        })
        maker(data);
    })
    var event = new Event('initDone');
    document.dispatchEvent(event);
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
        if(arr[i] == '0.5'){
            arr[i] = '&frac12;'
        }
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