// Variables
const casilla = [];
const tablero = document.querySelector('#tablero');
const restart = document.querySelector('.restart')
const puntos1 = document.querySelector('#puntos1');
const puntos2 = document.querySelector('#puntos2');
const mensajes = document.querySelector('#mensajes')
const combinacionesGanadoras = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
let jugando = true;
let jugador1 = 0;
let inicio = true;
let jugador2 = 0;
for (let i = 1; i < 10; i++) {
    casilla[i] = document.querySelector(`#tablero .casilla[data-index="${i}"]`);
}
let contador = 0;




// Eventos
for (let i = 1; i < 10; i++) {
    casilla[i].addEventListener('click', () => {
        if(contador%2==0 && casilla[i].textContent =='' && jugando){
            inicio = false;
            restart.classList.remove('restartOn');
            casilla[i].classList.remove('rojo');
            casilla[i].classList.add('verde');
            casilla[i].textContent = 'X';
            mensajes.textContent = 'Turno del jugador 2'
            ++contador;    
            verificarTresEnRaya();
        }else if(contador%2!==0 && casilla[i].textContent =='' && jugando){
            restart.classList.remove('restartOn');
            casilla[i].classList.remove('remove');
            casilla[i].classList.add('rojo');
            casilla[i].textContent = 'O';
            mensajes.textContent = 'Turno del jugador 1'
            ++contador;   
            verificarTresEnRaya();
        }
    });
}

restart.addEventListener('click', reiniciar);






// Funciones
function reiniciar(){
    if(!jugando || inicio){
        for (let i = 1; i < 10; i++) {
            casilla[i].textContent = '';
            casilla[i].classList.remove('highlightO');
            casilla[i].classList.remove('highlightX');
    
        };
        contador = 0;
        jugando = true;
        mensajes.textContent = 'Turno del jugador 1'
        restart.classList.remove('restartOn');
    }

}



function verificarTresEnRaya() {
    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (casilla[a].textContent === 'X' && 
            casilla[a].textContent === casilla[b].textContent && 
            casilla[a].textContent === casilla[c].textContent) {
            jugando = false;
            ++jugador1;
            puntos1.textContent = jugador1;
            mensajes.textContent = 'Jugador 1 ha ganado'
            restart.classList.add('restartOn');
            casilla[a].classList.add('highlightX');
            casilla[b].classList.add('highlightX');
            casilla[c].classList.add('highlightX');
            return true;
        }
        if (casilla[a].textContent === 'O' && 
            casilla[a].textContent === casilla[b].textContent && 
            casilla[a].textContent === casilla[c].textContent) {
            jugando = false;
            ++jugador2;
            puntos2.textContent = jugador2;
            mensajes.textContent = 'Jugador 2 ha ganado'
            restart.classList.add('restartOn');
            casilla[a].classList.add('highlightO');
            casilla[b].classList.add('highlightO');
            casilla[c].classList.add('highlightO');
            return true;
        }
        if(contador === 9){
            mensajes.textContent = 'Empate'
            restart.classList.add('restartOn');
        }
    }
    return false;
}
