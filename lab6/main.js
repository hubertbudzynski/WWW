var ele = document.querySelector("input[name=fname]");
// el.style.display = "none";
// el.classList.add("hidden");
var p = document.querySelector("p#lista_lotow");
if (p)
    p.textContent += ' :)';
var nowyElement = document.createElement("tr");
nowyElement.classList.add("odwolany");
nowyElement.innerHTML = "<td>Kraków</td> <td>Szczecin</td> <td>12.04.20</td><td>12:30</td><td> ODWOŁANY </td>";
var tablicaSpoznien = document.querySelector(".late table");
if (tablicaSpoznien)
    tablicaSpoznien.appendChild(nowyElement);
var pasazerData = document.querySelectorAll(".passengers ul li[data-identyfikator-pasazera]");
console.log(pasazerData);
if (pasazerData.length !== 0) {
    var maxVal = "";
    var maxImieNazwisko = void 0;
    for (var _i = 0, _a = Array.prototype.slice.call(pasazerData); _i < _a.length; _i++) {
        var pD = _a[_i];
        if (maxVal < pD.getAttribute("data-identyfikator-pasazera")) {
            maxVal = pD.getAttribute("data-identyfikator-pasazera");
            maxImieNazwisko = pD.innerHTML;
        }
    }
    var i = 0;
    while (i < maxImieNazwisko.length && maxImieNazwisko[i] !== '<') {
        i++;
    }
    maxImieNazwisko = maxImieNazwisko.slice(0, i);
    console.log(maxVal);
    console.log(maxImieNazwisko);
}
function opoznij(czas) {
    return new Promise(function (resolve, reject) {
        return setTimeout(function () { resolve(); }, czas);
    });
}
function koloryTeczy(el) {
    opoznij(1000)
        .then(function () {
        el.style.backgroundColor = 'red';
        return opoznij(1000);
    })
        .then(function () {
        el.style.backgroundColor = 'orange';
        return opoznij(1000);
    })
        .then(function () {
        el.style.backgroundColor = 'yellow';
        return opoznij(1000);
    })
        .then(function () {
        el.style.backgroundColor = 'green';
        return opoznij(1000);
    })
        .then(function () {
        el.style.backgroundColor = 'blue';
        return opoznij(1000);
    })
        .then(function () {
        el.style.backgroundColor = 'indigo';
        return opoznij(1000);
    })
        .then(function () {
        el.style.backgroundColor = 'purple';
        return opoznij(1000);
    });
}
fetch('https://api.github.com/repos/Microsoft/TypeScript/commits')
    .then(function (response) {
    return response.json();
}, function (err) { console.error("Fetch failed", err); })
    .then(function (data) {
    console.log(data.slice(-1));
    console.log(data.slice(-1)['0']['author']['avatar_url']);
    var imgSrc = data.slice(-1)['0']['author']['avatar_url'];
    var pic = document.createElement("img");
    pic.setAttribute('src', imgSrc);
    var foot = document.querySelector("footer");
    foot.appendChild(pic);
}, function (err) { console.error("Display failed", err); });
var late = document.body.querySelector(".late");
var page = document.body.querySelector(".page");
var formularzRezerwacji = document.body.querySelector(".rez");
console.log(late);
// late.addEventListener('click', changeColor, false);
formularzRezerwacji.onclick = function (event) { event.stopPropagation(); };
var clicks = 0;
function fib(index) {
    if (index === 0)
        return 0;
    if (index === 1)
        return 1;
    return fib(index - 1) + fib(index - 2);
}
page.onclick = function (event) {
    var el = event.target;
    if (el instanceof Element && late.contains(el)) {
        if (late.style.backgroundColor === 'cyan')
            late.style.backgroundColor = 'blue';
        else
            late.style.backgroundColor = 'cyan';
    }
    clicks++;
    //alert(fib(10 * clicks));
};
var submitRez = document.body.querySelector(".late input[type='submit']");
var skadRez = document.body.querySelector(".late select[id='skad_rezerwacja']");
var dokadRez = document.body.querySelector(".late select[id='dokad_rezerwacja']");
var imieRez = document.body.querySelector(".late input[id='fname']");
var nazRez = document.body.querySelector(".late input[id='lname']");
var dataRez = document.body.querySelector(".late input[id='date']");
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
dokadRez.oninput = function (event) { return checkForm(); };
skadRez.oninput = function (event) { return checkForm(); };
imieRez.oninput = function (event) { return checkForm(); };
nazRez.oninput = function (event) { return checkForm(); };
dataRez.oninput = function (event) { return checkForm(); };
