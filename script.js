const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// inicar reconocimiento de voz
recognition.start();

// capturar habla de usuario
function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

// Verificar mensaje contra el numero
function checkNumber(msg) {
    const num = +msg;
    // Verificar si es un numero
    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>Eso no es un número</div>';
        return;
    }

    // verificar rango
    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div>El número debe estar entre 1 y 100</div>';
        return;
    }

    // verificar número
    if (num === randomNum) {
        document.body.innerHTML = `
        <h2>Felicidades, adivinaste el número! <br><br>
        Era ${num}
        </h2>
        <button class="play-again" id="play-again">Jugar otra vez</button>
        `;
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div>Menos...</div>`;
    } else {
        msgEl.innerHTML += `<div>Más...</div>`;
    }
}

// Escribir lo que el usuario habla
function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>Dijiste:</div>
    <span class="box">${msg}</span>
    `;
}

// Generar numero random
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// hablar resultad
recognition.addEventListener('result', onSpeak);

// al finalizar speech api
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
    if (e.target.id === 'play-again') {
        window.location.reload();
    }
});