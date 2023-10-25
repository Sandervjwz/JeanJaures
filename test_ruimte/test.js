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