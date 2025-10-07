'use strict';

let tamaño = 0;
let numMinas = 0;
let minaF = 0;
let minaC = 0;

tamaño = parseInt(prompt("Introduce el tamaño del tablero"));
numMinas = (tamaño*30)/100;

console.log("El número de minas es: " + numMinas);

let tablero = [];
let tableroJuego = [];

for (let i = 0; i < tamaño; i++) {
    tablero[i] = [];
    for (let j = 0; j < tamaño; j++) {
        tablero[i][j] = 0;
    }
}

function generarTableroJuego(tamaño) {
    for (let i = 0; i < tamaño; i++) {
        tableroJuego[i] = [];
        for (let j = 0; j < tamaño; j++) {
            tableroJuego[i][j] = "X";
        }
    }
}

for (let i = 0; i < numMinas; i++) {
    minaF = Math.floor(Math.random() * tamaño);
    minaC = Math.floor(Math.random() * tamaño);
    if (tablero[minaF][minaC] === "*") {
        i--;
    } else {
        tablero[minaF][minaC] = "*";
        for (let j = -1; j <= 1; j++) {
            if (minaF + j >= 0 && minaF + j < tamaño) {
                for (let k = -1; k <= 1; k++) {
                    if (minaC + k >= 0 && minaC + k < tamaño) {
                        if (tablero[minaF + j][minaC + k] !== "*") {
                            tablero[minaF + j][minaC + k]++;
                        }
                    }
                }
            }
        }
    }

}

function mostrarTablero(tableroJuego) {
    console.table(tableroJuego);
}

generarTableroJuego(tamaño);

console.table(tablero);

mostrarTablero(tableroJuego);