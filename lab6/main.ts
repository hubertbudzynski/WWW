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

let data = ("data-identyfikator-pasazera");

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

koloryTeczy(document.querySelector("body"));