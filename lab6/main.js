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
var data = ("data-identyfikator-pasazera");
var pasazerData = document.querySelectorAll(".passengers ul li[data-identyfikator-pasazera]");
var maxVal = "";
var maxImieNazwisko;
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
//# sourceMappingURL=main.js.map