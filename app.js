const scenarios = [
  {
    title:"CLIENTE DOMINANTE",
    text:"El cliente intenta controlar toda la conversación."
  },
  {
    title:"COMPARACIÓN CON LA COMPETENCIA",
    text:"El cliente compara precio y condiciones."
  },
  {
    title:"RECHAZO TOTAL AL CAMBIO",
    text:"No quiere cambiar proveedor."
  }
];

const pressures = [
  {
    title:"INTERRUMPE CONSTANTEMENTE",
    text:"Debes recuperar el control sin chocar."
  },
  {
    title:"DICE QUE LO PENSARÁ",
    text:"Concreta qué necesita para decidir."
  },
  {
    title:"ESCURRE EL TIEMPO",
    text:"La reunión avanza sin compromiso."
  }
];

const state = {
  time:120,
  interval:null,
  score:0,
  streak:0,
  lives:3,
  combo:1
};

function randomItem(arr){
  return arr[
    Math.floor(Math.random()*arr.length)
  ];
}

function init(){

  document
    .getElementById("enterBtn")
    .addEventListener("click", enterApp);

  document
    .getElementById("startRoundBtn")
    .addEventListener("click", startRound);

  document
    .getElementById("pressureBtn")
    .addEventListener("click", newPressure);

  document
    .getElementById("resetBtn")
    .addEventListener("click", resetRound);

  document
    .getElementById("fullscreenBtn")
    .addEventListener("click", toggleFullscreen);
}

function enterApp(){

  document
    .getElementById("introScreen")
    .style.display = "none";

  showToast("Pressure Room Activated");
}

function startRound(){

  const scenario = randomItem(scenarios);

  document.getElementById("scenarioCard").innerHTML = `
    <p class="eyebrow">ESCENARIO</p>
    <h3>${scenario.title}</h3>
    <p>${scenario.text}</p>
  `;

  clearInterval(state.interval);

  state.time = 120;

  state.interval = setInterval(()=>{

    state.time--;

    document.getElementById("timer").innerText =
      state.time;

    if(state.time <= 10){

      document.body.style.background =
        "#170707";
    }

    if(state.time <= 0){

      clearInterval(state.interval);

      showToast("FIN DE LA RONDA");
    }

  },1000);
}

function newPressure(){

  const pressure = randomItem(pressures);

  document.getElementById("pressureCard").innerHTML = `
    <p class="eyebrow">PRESIÓN ACTIVA</p>
    <h3>${pressure.title}</h3>
    <p>${pressure.text}</p>
  `;

  state.score += 25;

  document.getElementById("score").innerText =
    state.score;

  document.getElementById("homeStreak").innerText =
    state.streak;
}

function resetRound(){

  clearInterval(state.interval);

  state.time = 120;
  state.score = 0;

  document.getElementById("timer").innerText =
    "120";

  document.getElementById("score").innerText =
    "0";

  document.body.style.background =
    "#070B14";

  showToast("Ronda reiniciada");
}

function toggleFullscreen(){

  const elem = document.documentElement;

  if(!document.fullscreenElement){

    elem.requestFullscreen();

  }else{

    document.exitFullscreen();
  }
}

function showToast(message){

  const toast =
    document.getElementById("toast");

  toast.innerText = message;

  toast.style.opacity = "1";

  setTimeout(()=>{
    toast.style.opacity = ".95";
  },100);

  setTimeout(()=>{
    toast.style.opacity = "0";
  },2200);
}

document.addEventListener(
  "DOMContentLoaded",
  init
);
