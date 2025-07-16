const hebdo_schedule = document.getElementById("all_schedule");
function show_schedule() {
    hebdo_schedule.classList.toggle("hidden");
}

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const heures = Array.from({ length: 17 }, (_, i) => i + 7); // 7h à 23h

const planning = {
    "Lundi": [{ start: 7, end: 16, type: "work" }, { start: 17, end: 18, type: "sport", activity: "Full body" }, { start: 18, end: 19, type: "projet", activity: "Projet perso" }, { start: 19, end: 20, type: "lecture", activity: "Lecture" }],
    "Mardi": [{ start: 8, end: 17, type: "work" }, { start: 18, end: 19, type: "sport", activity: "Cardio" }, { start: 19, end: 20, type: "projet", activity: "Projet perso" }, { start: 22, end: 23, type: "lecture", activity: "Lecture" }],
    "Mercredi": [{ start: 8, end: 17, type: "work" }, { start: 18, end: 19, type: "sport", activity: "Haut du corps" }, { start: 19, end: 20, type: "projet", activity: "Projet perso" }, { start: 22, end: 23, type: "lecture", activity: "Lecture" }],
    "Jeudi": [{ start: 8, end: 17, type: "work" }, { start: 22, end: 23, type: "lecture", activity: "Lecture" }],
    "Vendredi": [{ start: 7, end: 16, type: "work" }, { start: 17, end: 18, type: "sport", activity: "Bas du corps" }, { start: 18, end: 19, type: "projet", activity: "Projet perso" }, { start: 19, end: 20, type: "lecture", activity: "Lecture" }],
    "Samedi": [{ start: 9, end: 10, type: "sport", activity: "Cardio" }, { start: 14, end: 15, type: "lecture", activity: "Lecture" }, { start: 16, end: 17, type: "projet", activity: "Projet perso" }],
    "Dimanche": [{ start: 9, end: 10, type: "sport", activity: "Stretching" }, { start: 11, end: 12, type: "lecture", activity: "Lecture" }, { start: 14, end: 15, type: "projet", activity: "Projet perso" }]
};

const container = document.getElementById("schedule");
// Ligne d'heures
container.innerHTML += '<div class="day-label"></div>';
heures.forEach(h => {
    container.innerHTML += `<div class="hour-label">${h}h</div>`;
});

// Affichage jour par jour
today_date = new Date();
today = today_date.getDate();
jours.forEach(jour => {
    container.innerHTML += `<div class="day-label">${jour}</div>`;
    heures.forEach(h => {
    const cell = document.createElement("div");
    cell.classList.add("cell");


    const bloc = planning[jour]?.find(item => h >= item.start && h < item.end);
    if (bloc) {
        cell.classList.add(bloc.type);
        if (bloc.activity != undefined) {
        cell.innerHTML += `<p class="activity">${bloc.activity}</p>`;
        }
    }
    
    container.appendChild(cell);
    });
});

// Activité du jour
const day_container = document.getElementById("day_schedule");
today_date = new Date();
today = today_date.getDay();
if (today == 0) {
    today = 6;
} else {
    today = today - 1;
}

function random(value1, value2) {
    return Math.random() < 0.5 ? value1 : value2;
}
// Nb KCAL
// console.log((10*85+6.25*182-5*29+5)*1.1);
var video_activity = "";
abs = true;
day_container.innerHTML += `<h2>${jours[today]}</h2>`;
planning[jours[today]].forEach(today_activity => {
    if (today_activity.type != "work") {
        day_container.innerHTML += `<div class="daily_activity ${today_activity.type}">${today_activity.start}h - ${today_activity.end}h ${today_activity.activity}</div>`;
        if (today_activity.type == "sport") {
            day_container.innerHTML += `<div class='row center-align' id='item_video'></div>`;
            video_container = document.getElementById("item_video");

            if (today_activity.activity == "Full body" || today_activity.activity == "Cardio") {
            video_activity = "10_min_full_body_cardio";
            abs = false; // si full body ou cardio pas d'abdo mais posture
            } else if (today_activity.activity == "Haut du corps") {
            video_activity = "100_push_ups_a_day_challenge";
            } else if (today_activity.activity == "Bas du corps") {
            video_activity = "7_min_legs";
            }

            video_container.innerHTML += `<div class="col-sm-12 col-lg-4">
                <video controls="controls" preload="true">
                    <source src="src/video/warm_up_routine.mp4" type="video/mov"/>
                    <source src="src/video/warm_up_routine.mp4" type="video/mp4" />
                    <source src="src/video/warm_up_routine.mp4" type="video/oog" />
                    Your browser does not support the video tag.
                </video>
            </div>`;
            video_container.innerHTML += `<div class="col-sm-12 col-lg-4">
                <video controls="controls" preload="true">
                    <source src="src/video/${video_activity}.mp4" type="video/mov"/>
                    <source src="src/video/${video_activity}.mp4" type="video/mp4" />
                    <source src="src/video/${video_activity}.mp4" type="video/oog" />
                    Your browser does not support the video tag.
                </video>
            </div>`;
            if (abs) {
                video_container.innerHTML += `<div class="col-sm-12 col-lg-4">
                    <video controls="controls" preload="true">
                        <source src="src/video/${random("5_min_abs_no_rest", "abs_challenge")}.mp4" type="video/mov"/>
                        <source src="src/video/${random("5_min_abs_no_rest", "abs_challenge")}.mp4" type="video/mp4" />
                        <source src="src/video/${random("5_min_abs_no_rest", "abs_challenge")}.mp4" type="video/oog" />
                        Your browser does not support the video tag.
                    </video>
                </div>`;
            } else {
                video_container.innerHTML += `<div class="col-sm-12 col-lg-4">
                    <video controls="controls" preload="true">
                        <source src="src/video/8_min_to_fix_posture.mp4" type="video/mov"/>
                        <source src="src/video/8_min_to_fix_posture.mp4" type="video/mp4" />
                        <source src="src/video/8_min_to_fix_posture.mp4" type="video/oog" />
                        Your browser does not support the video tag.
                    </video>
                </div>`;
            }
        }
    }
});

// chrono
function show_chrono() {
    document.getElementById("chrono_container").classList.toggle("hidden");
}
let chronoInterval;
let startTime = 0;
let elapsedTime = 0;
let running = false;

let minuteurActif = false;
let minuteurInterval = null; // référence du setInterval du minuteur

function toggleChrono() {
    document.getElementById("start_chrono_btn").classList.toggle("hidden");
    document.getElementById("stop_chrono_btn").classList.toggle("hidden");
    if (!running) {
    startTime = Date.now() - elapsedTime;
    chronoInterval = setInterval(updateChrono, 50);
    running = true;
    } else {
    clearInterval(chronoInterval);
    elapsedTime = Date.now() - startTime;
    running = false;
    }
}

function updateChrono() {
    const now = Date.now();
    const diff = now - startTime;

    const totalMs = diff;

    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const milliseconds = Math.floor((totalMs % 1000) / 10); // deux chiffres

    document.getElementById('chrono').textContent =
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function resetChrono() {
    document.getElementById("start_chrono_btn").classList.remove("hidden");
    document.getElementById("stop_chrono_btn").classList.add("hidden");
    clearInterval(chronoInterval);
    elapsedTime = 0;
    startTime = 0;
    running = false;
    document.getElementById('chrono').textContent = '00:00:00.00';

    // Réinitialiser le minuteur
    if (minuteurInterval) {
    clearInterval(minuteurInterval);
    minuteurInterval = null;
    }
    minuteurActif = false;

    // Supprimer les minuteurs visuels
    document.getElementById('minuteurs').innerHTML = '';
}

function pad(n) {
    return n.toString().padStart(2, '0');
}

function ajouterMinuteur() {
    if (minuteurActif) {
    return;
    }

    const select = document.getElementById('minuteurSelect');
    const seconds = parseInt(select.value, 10);

    const container = document.createElement('div');
    container.className = 'minuteur';
    container.textContent = `${seconds}s`;

    document.getElementById('minuteurs').appendChild(container);

    let timeLeft = seconds;
    minuteurActif = true;

    minuteurInterval = setInterval(() => {
    timeLeft--;
    container.textContent = `${timeLeft}s`;

    if (timeLeft <= 3
    ) {
        document.getElementById('bip').play();
    }
    if (timeLeft <= 0) {
        clearInterval(minuteurInterval);
        minuteurInterval = null;
        container.remove();
        minuteurActif = false;
    }
    }, 1000);
}

// ouverture de la modal
function openModal(id_modal) {
    $("#" + id_modal).removeClass("hidden fade-out").addClass("fade-in");
    $("#" + id_modal + " .modal-content").removeClass("move-down").addClass("move-up");
    $("body").css("overflow", "hidden");
    $(".dice-align").fadeOut(100);
}
// fermeture de la modal
function closeModal() {
    $(".modal-content").removeClass("move-up").addClass("move-down");
    $(".modal").removeClass("fade-in").addClass("fade-out");
    $("body").css("overflow", "auto");
    $(".dice-align").fadeIn();
    setTimeout(() => {
        $(".modal").addClass("hidden");
        $("#add_player_in_game, #add_rules").removeClass("hidden");
    }, 450);
}
window.onclick = function (event) {
    if (event.target.classList[0] == "modal") {
        closeModal();
    }
}