console.log("Ależ skomplikowany program!");

function zaloguj(...komunikaty: string[]) {
    console.log("Ależ skomplikowany program!", ...komunikaty);
}

zaloguj("Ja", "cię", "nie", "mogę");

let jsonString: string = `{
    "lotniska": {
        "WAW": ["Warszawa", [3690, 2800]],
        "NRT": ["Narita", [4000, 2500]],
        "BQH": ["Biggin Hill", [1802, 792]],
        "LBG": ["Paris-Le Bourget", [2665, 3000, 1845]]
    }
}`;

interface ILotnisko {
   nazwa : string;
   bilety : number[];
}

class Pilot {
    nazwisko : string;
}

interface ILiniaLotnicza {
    piloci : Pilot[];
    lotniska : ILotnisko[];
}

function sprawdzDaneLiniiLotniczej(dane: any): dane is ILiniaLotnicza {
    return (dane.piloci || dane.piloci === undefined) && (dane.lotniska || dane.lotniska === undefined);

}
let dataStructure = JSON.parse(jsonString);

if(sprawdzDaneLiniiLotniczej(dataStructure)) {
  const juzNaPewnoDaneLinii = dataStructure;

  console.log(juzNaPewnoDaneLinii);
  console.log(juzNaPewnoDaneLinii.piloci.length);
}

