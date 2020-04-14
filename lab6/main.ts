import fib from './program.ts'

let ele = document.querySelector("input[name=fname]") as HTMLInputElement;
// el.style.display = "none";
// el.classList.add("hidden");

let p = document.querySelector("p#lista_lotow") as HTMLParagraphElement;
if (p)
    p.textContent += ' :)';

let nowyElement = document.createElement("tr");
nowyElement.classList.add("odwolany");
nowyElement.innerHTML = "<td>Kraków</td> <td>Szczecin</td> <td>12.04.20</td><td>12:30</td><td> ODWOŁANY </td>";

let tablicaSpoznien = document.querySelector(".late table") as HTMLTableElement;
if (tablicaSpoznien)
    tablicaSpoznien.appendChild(nowyElement);

let pasazerData = document.querySelectorAll(".passengers ul li[data-identyfikator-pasazera]");
console.log(pasazerData);
if (pasazerData.length !== 0) {
    let maxVal : string = "" ;
    let maxImieNazwisko : string;
    for (const pD of Array.prototype.slice.call(pasazerData)) {
        if (maxVal < pD.getAttribute("data-identyfikator-pasazera")) {
            maxVal = pD.getAttribute("data-identyfikator-pasazera");
            maxImieNazwisko = pD.innerHTML;
        }
    }

    let i : number = 0;
    while (i < maxImieNazwisko.length && maxImieNazwisko[i] !== '<') {
        i++;
    }

    maxImieNazwisko = maxImieNazwisko.slice(0, i);

    console.log(maxVal);
    console.log(maxImieNazwisko);
}


function opoznij(czas : number) {
    return new Promise((resolve, reject) =>
        setTimeout(()=>{resolve()}, czas)
    )
}

function koloryTeczy(el: HTMLElement){
    opoznij(1000)
    .then(function() {
        el.style.backgroundColor = 'red';
        return opoznij(1000);
    })
    .then(function() {
        el.style.backgroundColor = 'orange';
        return opoznij(1000);
    })
    .then(function() {
        el.style.backgroundColor = 'yellow';
        return opoznij(1000);
    })
    .then(function() {
        el.style.backgroundColor = 'green';
        return opoznij(1000);
    })
    .then(function() {
        el.style.backgroundColor = 'blue';
        return opoznij(1000);
    })
    .then(function() {
        el.style.backgroundColor = 'indigo';
        return opoznij(1000);
    })
    .then(function() {
        el.style.backgroundColor = 'purple';
        return opoznij(1000);
    })
}


fetch('https://api.github.com/repos/Microsoft/TypeScript/commits')
  .then((response) => {
    return response.json();
  },(err) => {console.error("Fetch failed", err);})
  .then((data) => {
    console.log(data.slice(-1));
    console.log(data.slice(-1)['0']['author']['avatar_url']);
    let imgSrc : string = data.slice(-1)['0']['author']['avatar_url'];
    let pic = document.createElement("img");
    pic.setAttribute('src', imgSrc);
    let foot = document.querySelector("footer");
    foot.appendChild(pic);
  }, (err)=> {console.error("Display failed", err);});


let late = document.body.querySelector(".late") as HTMLDivElement;
let page = document.body.querySelector(".page") as HTMLDivElement;
let formularzRezerwacji = document.body.querySelector(".rez") as HTMLDivElement;
console.log(late);
// late.addEventListener('click', changeColor, false);

formularzRezerwacji.onclick = function(event){event.stopPropagation();}
let clicks : number = 0;

page.onclick = function (event) {
    let el = event.target;
    if (el instanceof Element && late.contains(el)) {
        if (late.style.backgroundColor === 'cyan')
            late.style.backgroundColor = 'blue';
        else 
            late.style.backgroundColor = 'cyan';
    }
    clicks++;
    alert(fib(10 * clicks));
}

let submitRez = document.body.querySelector(".late input[type='submit']") as HTMLButtonElement;
let skadRez = document.body.querySelector(".late select[id='skad_rezerwacja']") as HTMLSelectElement;
let dokadRez = document.body.querySelector(".late select[id='dokad_rezerwacja']") as HTMLSelectElement;
let imieRez = document.body.querySelector(".late input[id='fname']") as HTMLInputElement;
let nazRez = document.body.querySelector(".late input[id='lname']") as HTMLInputElement;
let dataRez = document.body.querySelector(".late input[id='date']") as HTMLInputElement;

console.log(submitRez, skadRez, dokadRez, imieRez, nazRez);
submitRez.disabled = true;
function checkForm() {

    console.log(dataRez.value);
    console.log(new Date(new Date().toDateString()));
    if (skadRez.selectedIndex !== 0 &&
        dokadRez.selectedIndex !== 0 &&
        dokadRez.selectedIndex !== skadRez.selectedIndex &&
        imieRez.value !== "" &&
        nazRez.value !== "" &&
        new Date(dataRez.value) >= new Date(new Date().toDateString()))
        submitRez.disabled = false;
    else
        submitRez.disabled = true;
}

dokadRez.oninput = (event) => checkForm();
skadRez.oninput = (event) => checkForm();
imieRez.oninput = (event) => checkForm();
nazRez.oninput = (event) => checkForm();
dataRez.oninput = (event) => checkForm();
