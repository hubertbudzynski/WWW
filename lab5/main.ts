let el = document.querySelector("input[name=fname]") as HTMLInputElement;
//el.style.display = "none";
el.classList.add("hidden");

let p = document.querySelector("p#lista_lotow") as HTMLParagraphElement;
p.textContent += ' :)';

let nowyElement = document.createElement("tr");
nowyElement.classList.add("odwolany");
nowyElement.innerHTML = "<td>Kraków</td> <td>Szczecin</td> <td>12.04.20</td><td>12:30</td><td> ODWOŁANY </td>";

let tablicaSpoznien = document.querySelector(".late table") as HTMLTableElement;
tablicaSpoznien.appendChild(nowyElement);
