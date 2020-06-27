"use strict";
var quizEasy = {
    "name": "Łatwy quiz",
    "questions": [
        {
            "question": "Ile wynosi 10 : 5 + 8?",
            "solution": 10,
            "penalty": 10
        },
        {
            "question": "Ile wynosi 2 + 2 * 2?",
            "solution": 6,
            "penalty": 15
        },
        {
            "question": "Ile wynosi 1 + 2 + 3 + 4 + 5?",
            "solution": 15,
            "penalty": 20
        },
        {
            "question": "Ile wynosi 2^(2^2)?",
            "solution": 16,
            "penalty": 25
        }
    ]
};
var quizHard = {
    "name": "Trudny quiz",
    "questions": [
        {
            "question": "Ile wynosi 15^449 mod 113?",
            "solution": 15,
            "penalty": 10
        },
        {
            "question": "Jaka jest najmniejsza liczba ważeń na wadze szalkowej, w której można \
            stwierdzić, która z 15 monet jest cięższa od pozostałych?",
            "solution": 3,
            "penalty": 15
        },
        {
            "question": "Z punktu A do punktu B, w linii prostej, wyjechał Adam z prędkością początkową 7 m/s i stałym przyśpieszeniem 2 m/s\
            . W tym samym czasie z punktu B do punktu A idzie w linii prostej Bartek ze stałą prędkością 4 m/s? Jeżeli odległość między punktami\
            A i B wynosi 900 metrów, to po ilu sekundach Adam i Bartek się spotkają?",
            "solution": 25,
            "penalty": 20
        }
    ]
};
module.exports = [quizEasy, quizHard];
