let order = [];
let clickedOrder = [];
let score = 0;

/* 
0 - verde
1 - vermelho
2 - amarelo
3 - azul
*/

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');


/* Cria ordem aleatoria de cores */
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random()*4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        ligthColor(elementColor, Number(i)+1);
    }
}

/* Acende a proxima cor*/

let ligthColor = (element, number) => {
    number = number * 1000; 
    setTimeout(() => {//Chama primeiro e executa depois
        element.classList.add('selected');
    }, number - 500); //O bloco acenderá nos tempos 0.5, 1.5, 2.5, 3.5, ...

    setTimeout(() => {
        element.classList.remove('selected');
    }, number);//O bloco apagará nos tempos 1, 2, 3, 4, ...
}

/* Checa a sequencia de cliques */
let checkOrder = () => {
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }

    if(clickedOrder.length == order.length){
        alert(`Score: ${score}\nYou Win! Starting the next level`);//Usar "crase"
        nextLevel();
    }
}

/* Funcao de clique*/
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

/* Funcao que retorna a cor */

let createColorElement = (color) => {
    if(color == 0) {
        return green;
    }else if(color == 1) {
        return red;
    }else if(color == 2){ 
        return yellow;
    }else if(color == 3){ 
        return blue;
    }
}

//Funcao de subir nivel
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//Game over
let gameOver = () => {
    alert(`Score: ${score}\nYou Lose!\nClick HERE to restart`);
    order = [];
    clickedOrder = [];

    playGame();
}

//Funcao de play
let playGame = () => {
    alert('Welcome to Genius');

    score = 0;
    nextLevel();   
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();