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
koloryTeczy(document.querySelector("body"));
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
