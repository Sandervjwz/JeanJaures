console.log("ik werk");
var menuItems = document.getElementsByClassName("menuItem");
var itemMenu = document.getElementsByClassName("itemMenu")
var arr_menuItems = [];
console.log("ik werk",);

window.onload = function () {
   jaar.innerText = new Date().getFullYear();
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
   //MUST remove: maakt automatische resultatenoverzicht
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
   /*menuItems.forEach(element => {
      console.log(element)
   });*/
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

for (var i = 0; i < menuItems.length; i++) {
   menuItems[i].addEventListener('click', menuFunction, false);
};
