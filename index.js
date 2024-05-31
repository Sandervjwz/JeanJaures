var menuItems = document.getElementsByClassName("menuItem");
var itemMenu = document.getElementsByClassName("itemMenu")
var arr_menuItems = [];
var wedstrijd_index = 0;
var match_dagen = ["24/09", "15/10", "22/10", "19/11", "03/12", "28/01", "04/02", "18/02", "10/03", "24/03", "21/04"];

window.onload = function () {
   jaar.innerText = new Date().getFullYear();
   updateVolgende();
   for (var i = 0; i < menuItems.length; i++) {
      arr_menuItems.push(menuItems[i].innerText);
      menuItems[i].classList.add(menuItems[i].innerText.split(" ")[0]);
      const att = document.createElement("a");
      att.href = `#${menuItems[i].innerText.split(" ")[0]}`
      att.innerText = menuItems[i].innerText;
      menuItems[i].innerText = ''
      menuItems[i].appendChild(att);
      //console.log(menuItems[i].innerText.split(" ")[0], itemMenu[i].href)
   }
   /*MUST remove: maakt automatische resultatenoverzicht
   var overzicht = document.getElementsByClassName("overzicht");
   //overzicht[j].nextElementSibling.innerHTML = '';
   for (var j = 0; j < overzicht.length; j++) {
      var resultaat = overzicht[j].children[1];
      overzicht[j].nextElementSibling.innerHTML = "";
      //console.log(overzicht[j].outerHTML, overzicht[j].nextElementSibling.innerHTML)
      for (var i = 0; i < 5; i++) {
         overzicht[j].nextElementSibling.innerHTML += resultaat.outerHTML;
      }
   }
   //console.log(arr_menuItems, menuItems);
   menuItems.forEach(element => {
      console.log(element)
   });*/
   for (var i = 0; i < itemMenu.length; i++) {
      itemMenu[i].hidden = true;
   }
   itemMenu[0].hidden = false;
   var event = new Event('loadDone');
   document.dispatchEvent(event);  
   
   //const headerElement = document.querySelector('header');
   //const contentElement = document.querySelector('main');
   // Set the margin-top of the content element to the height of the header element
   //contentElement.style.marginTop = `${headerElement.offsetHeight}px`;
   //document.documentElement.style.setProperty('--dynamic-margin', `${document.querySelector('header').style.height}px`);
}

var menuFunction = function () {
   var clickTerm = this.innerText.split(" ")[0]
   console.log(clickTerm)
   for (var i = 0; i < itemMenu.length; i++) {
      itemMenu[i].hidden = true;
      if (itemMenu[i].id == clickTerm) {
         itemMenu[i].hidden = false;
      }
   }
}

//automatisch volgende wedstrijd updaten
function updateVolgende(){
   var update_link = document.getElementsByClassName("ICres");
   var match_numbers = [];
   match_dagen.forEach(element => {
      match_numbers.push(DMConverter(element))
   });
   var dag = new Date().getDate();
   var maand = new Date().getMonth(); //"01/01/2024"
   var vandaag = DMConverter(`${(dag < 10 ? `0${dag}` : dag)}/${(maand + 1 < 10 ? `0${maand + 1}` : maand + 1)}`);
   for(var i = 0; i < match_numbers.length; i++){
      if(match_numbers[i] >= vandaag){
         wedstrijd_index = i + 1;
         i = match_numbers.length;
         for(var j = 0; j < update_link.length; j++){
            var oude_tekst = `${update_link[j].children[2].getAttribute("href")}`;
            var oude_tekst_2 = oude_tekst.split('/')
            oude_tekst_2[6] = wedstrijd_index
            var nieuwe_tekst = oude_tekst_2.join("/")
            update_link[j].children[2].setAttribute("href", nieuwe_tekst);

         }
      }
   }
}

function DMConverter(string){
   var arr = string.split("/")
   var maand = parseInt(arr[1])
   var end_result = parseInt(arr[0]) + ((maand < 8 ? maand + 12 : maand) * 31)
   //maand < 10 ? maand + 13 : maand + 1
   //console.log(parseInt(arr[0]), arr, string, end_result)
   return end_result
}

for (var i = 0; i < menuItems.length; i++) {
   menuItems[i].addEventListener('click', menuFunction, false);
};


