'use strict';
let tamaño = 0, numMinas = 0, minaF = 0, minaC = 0, vivo = true, numCasillas = 0, cont = 0;

tamaño = parseInt(prompt("Introduce el tamaño del tablero"));
numMinas = Math.max(1, Math.ceil((tamaño * 30) / 100));
numCasillas = tamaño * tamaño;

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

function colocarMinas(numMinas) {
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
}

colocarMinas(numMinas);

function mostrarTableroJuego(tableroJuego) {
    console.table(tableroJuego);
}

function mostrarTablero(tablero) {
    console.table(tablero);
}

generarTableroJuego(tamaño);

mostrarTablero(tablero);

console.log("¡COMIENZA EL JUEGO!");
console.log("El número de minas es: " + numMinas);

mostrarTableroJuego(tableroJuego);

function jugar() {
    let opcionF = 0;
    let opcionC = 0;
    opcionF = parseInt(prompt("Indica la fila a descubrir"));
    opcionC = parseInt(prompt("Indica la columna a descubrir"));

    if (tableroJuego[opcionF][opcionC] !== "X") {
        console.log("Casilla ya descubierta");
        return;
    }

    if (tablero[opcionF][opcionC] === "*") {
        console.log("¡HAS PERDIDO, había una mina!");
        console.log("        ,--.!,\n" +
            "     __/   -*-\n" +
            "   ,d08b.  '|'\n" +
            "   0088MM\n" +
            "   '9MMP' ");
        tableroJuego[opcionF][opcionC] = tablero[opcionF][opcionC];
        mostrarTableroJuego(tableroJuego);
        vivo = false;
    } else {
        tableroJuego[opcionF][opcionC] = tablero[opcionF][opcionC];
        cont++;

        if (tablero[opcionF][opcionC] === 0) {
            for (let i = -1; i <= 1; i++) {
                if (opcionF + i >= 0 && opcionF + i < tamaño) {
                    for (let j = -1; j <= 1; j++) {
                        if (opcionC + j >= 0 && opcionC + j < tamaño) {
                            if (tableroJuego[opcionF + i][opcionC + j] === "X") {
                                tableroJuego[opcionF + i][opcionC + j] = tablero[opcionF + i][opcionC + j];
                                cont++;
                            }
                        }
                    }
                }
            }
        }
        console.log("El número de minas es: " + numMinas);
        mostrarTableroJuego(tableroJuego);
    }

    if (cont === numCasillas - numMinas) {
        console.log("¡HAS GANADO, no has detonado ninguna mina!");
        console.log("       ___________\n" +
            "      '._==_==_=_.'\n" +
            "      .-\\:      /-.\n" +
            "     | (|:.     |) |\n" +
            "      '-|:.     |-'\n" +
            "        \\::.    /\n" +
            "         '::. .'\n" +
            "           ) (\n" +
            "         _.' '._\n" +
            "        `\"\"\"\"\"\"\"`");
        vivo = false;
    }
}

do {
    jugar();
} while (vivo);