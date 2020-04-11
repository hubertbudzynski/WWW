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
// const kolorTeczy = (ms) => new Promise(res => setTimeout(res, ms));
/*function koloryTeczy(el: HTMLElement, kolor : string, czas : number) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            el.style.backgroundColor = kolor;
        }, czas);
        resolve("gitara");
    });
}
*/
function opoznij(czas) {
    return new Promise(function (resolve, reject) {
        return setTimeout(function () { resolve(); }, czas);
    });
}
/*
koloryTeczy(document.querySelector("body"), 'red', 1000) {
    koloryTeczy(document.querySelector("body"), 'orange', 1000) {
        koloryTeczy(document.querySelector("body"), 'yellow', 1000) {
            koloryTeczy(document.querySelector("body"), 'green', 1000) {
                koloryTeczy(document.querySelector("body"), 'blue', 1000) {
                    koloryTeczy(document.querySelector("body"), 'indigo', 1000) {
                    }
                }
            }
        }
    }
}


function teczoweKolory(el: HTMLElement) {

    setTimeout(function () {

        console.log('red');

        el.style.backgroundColor = 'red';

        setTimeout(function() {

            el.style.backgroundColor = 'orange';

            setTimeout(function() {

                el.style.backgroundColor = 'yellow';

                setTimeout(function() {

                    el.style.backgroundColor = 'green';

                    setTimeout(function() {

                        el.style.backgroundColor = 'blue';

                        setTimeout(function() {

                            el.style.backgroundColor = 'indigo';

                            setTimeout(function() {

                                el.style.backgroundColor = 'purple';

                            }, 1000);

                        }, 1000);

                    }, 1000);

                }, 1000);

            }, 1000);

        }, 1000);

    }, 1000);

}
*/
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
//# sourceMappingURL=main.js.map