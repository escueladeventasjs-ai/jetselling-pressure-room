const scenarios = [
"PRIMER CONTACTO",
"CLIENTE OCUPADO",
"DESINTERÉS INICIAL",
"CLIENTE DOMINANTE",
"COMPARACIÓN CON LA COMPETENCIA",
"DESCONFIANZA HACIA TU MARCA",
"CLIENTE FOCALIZADO EN OTROS PROVEEDORES",
"CIERRE Y PRÓXIMOS PASOS",
"RECHAZO TOTAL A CUALQUIER CAMBIO"
];

const pressures = [
"INTERRUMPE CONSTANTEMENTE",
"SE MUESTRA DESINTERESADO",
"CAMBIA DE TEMA CONSTANTEMENTE",
"CUESTIONA TODO Y NO DECIDE",
"DICE QUE LO PENSARÁ",
"PIDE COMPENSACIÓN POR VISIBILIDAD",
"POSPONE DECISIONES SIN FECHA CLARA",
"COMPARA TODO Y NUNCA ELIGE",
"ESCURRE EL TIEMPO SIN AVANZAR"
];

let time = 120;
let interval;

let players = [];

function randomItem(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

function startRound(){

    document.getElementById("scenarioCard").innerText =
    randomItem(scenarios);

    resetTimer();

    interval = setInterval(()=>{

        time--;

        document.getElementById("timer").innerText = time;

        if(time <= 0){

            clearInterval(interval);

            alert("FIN DE LA RONDA");
        }

    },1000);
}

function newPressure(){

    document.getElementById("pressureCard").innerText =
    randomItem(pressures);
}

function resetTimer(){

    clearInterval(interval);

    time = 120;

    document.getElementById("timer").innerText = time;
}

function showMode(mode){

    document.querySelectorAll(".mode").forEach(el=>{
        el.classList.remove("active");
    });

    document.getElementById(mode).classList.add("active");
}

function createChampionship(){

    const name =
    document.getElementById("championshipName").value;

    document.getElementById("championshipOutput").innerHTML =
    `
    <p>
        <strong>Campeonato:</strong> ${name}
    </p>

    <p>
        Código sala:
        PR-${Math.floor(Math.random()*9999)}
    </p>
    `;
}

function addPlayer(){

    const player =
    document.getElementById("playerName").value;

    if(!player) return;

    players.push({
        name:player,
        points:Math.floor(Math.random()*100)
    });

    renderPlayers();
}

function renderPlayers(){

    const list =
    document.getElementById("playersList");

    const ranking =
    document.getElementById("ranking");

    list.innerHTML = "";
    ranking.innerHTML = "";

    players.forEach(p=>{

        list.innerHTML += `
        <li>${p.name}</li>
        `;
    });

    players
    .sort((a,b)=>b.points-a.points)
    .forEach(p=>{

        ranking.innerHTML += `
        <li>${p.name} — ${p.points} pts</li>
        `;
    });
}
