const bipSound = new Audio('./src/audio/bip.mp3');
bipSound.muted = true;
// gestion du volume
function toggleVolume() {
    document.getElementById("volume_up").classList.toggle("hidden");
    document.getElementById("volume_mute").classList.toggle("hidden");
    bipSound.muted = !bipSound.muted;
    bipSound.currentTime = 0;
    bipSound.play();
    setTimeout(() => {
        bipSound.pause();
        bipSound.currentTime = 0;
    }, 500);
}

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
if (container !== null) {
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
    var title_vid = "";
    abs = true;
    day_container.innerHTML += `<h2>${jours[today]}</h2>`;
    planning[jours[today]].forEach(today_activity => {
        if (today_activity.type != "work") {
            day_container.innerHTML += `<div class="daily_activity ${today_activity.type}">${today_activity.start}h - ${today_activity.end}h ${today_activity.activity} <a href="/free-programme" title="programme libre">✪</a></div>`;
            if (today_activity.type == "sport") {
                day_container.innerHTML += `<div class='row center-align' id='item_video'></div>`;
                video_container = document.getElementById("item_video");
    
                if (today_activity.activity == "Full body" || today_activity.activity == "Cardio") {
                    video_activity = "10_min_full_body_cardio";
                    title_vid = "10min Full Body Cardio";
                    abs = false; // si full body ou cardio pas d'abdo mais posture
                } else if (today_activity.activity == "Haut du corps") {
                    video_activity = "100_push_ups_a_day_challenge";
                    title_vid = "100 pompes challenge";
                } else if (today_activity.activity == "Bas du corps") {
                    video_activity = "7_min_legs";
                    title_vid = "7min jambes";
                }
    
                video_container.innerHTML += `<div class="col-sm-12 col-lg-4"><h3>Échauffement</h3>
                    <video controls="controls" preload="true">
                        <source src="src/video/warm_up_routine.mp4" type="video/mov"/>
                        <source src="src/video/warm_up_routine.mp4" type="video/mp4" />
                        <source src="src/video/warm_up_routine.mp4" type="video/oog" />
                        Your browser does not support the video tag.
                    </video>
                </div>`;
                video_container.innerHTML += `<div class="col-sm-12 col-lg-4"><h3>${title_vid}</h3>
                    <video controls="controls" preload="true">
                        <source src="src/video/${video_activity}.mp4" type="video/mov"/>
                        <source src="src/video/${video_activity}.mp4" type="video/mp4" />
                        <source src="src/video/${video_activity}.mp4" type="video/oog" />
                        Your browser does not support the video tag.
                    </video>
                </div>`;
                if (abs) {
                    video_container.innerHTML += `<div class="col-sm-12 col-lg-4"><h3>Abdos</h3>
                        <video controls="controls" preload="true">
                            <source src="src/video/${random("5_min_abs_no_rest", "abs_challenge")}.mp4" type="video/mov"/>
                            <source src="src/video/${random("5_min_abs_no_rest", "abs_challenge")}.mp4" type="video/mp4" />
                            <source src="src/video/${random("5_min_abs_no_rest", "abs_challenge")}.mp4" type="video/oog" />
                            Your browser does not support the video tag.
                        </video>
                    </div>`;
                } else {
                    video_container.innerHTML += `<div class="col-sm-12 col-lg-4"><h3>Stretching</h3>
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
}


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

    document.getElementById('chrono').textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
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

        if (timeLeft <= 3) {
            bipSound.play();
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

// Pumps datas
const pumps = ["-5", "6-10", "11-20", "21-25", "26-30", "31-35", "36-40", "41-45", "51-55", "56-60", "+60"];
const pumps_plan = {
    "-5": [{ day: 1, pause: 60, series: [2, 3, 2, 2, "max (minimum 3)"], break: 1 }, { day: 2, pause: 90, series: [3, 4, 2, 3, "max (minimum 4)"], break: 1 }, { day: 3, pause: 120, series: [4, 5, 4, 4, "max (minimum 5)"], break: 2 }, { day: 4, pause: 60, series: [5, 6, 4, 4, "max (minimum 6)"], break: 1 }, { day: 5, pause: 90, series: [5, 6, 4, 4, "max (minimum 7)"], break: 1 }, { day: 6, pause: 120, series: [5, 7, 5, 5, "max (minimum 7)"], break: 2 }],
    "6-10": [{ day: 1, pause: 60, series: [5, 6, 4, 4, "max (minimum 5)"], break: 1 }, { day: 2, pause: 90, series: [6, 7, 6, 6, "max (minimum 7)"], break: 1 }, { day: 3, pause: 120, series: [8, 10, 7, 7, "max (minimum 10)"], break: 2 }, { day: 4, pause: 60, series: [9, 11, 8, 8, "max (minimum 11)"], break: 1 }, { day: 5, pause: 90, series: [10, 12, 9, 9, "max (minimum 13)"], break: 1 }, { day: 6, pause: 120, series: [12, 13, 10, 10, "max (minimum 15)"], break: 2 }],
    "11-20": [{ day: 1, pause: 60, series: [8, 9, 7, 7, "max (minimum 8)"], break: 1 }, { day: 2, pause: 90, series: [9, 10, 8, 8, "max (minimum 10)"], break: 1 }, { day: 3, pause: 120, series: [11, 13, 9, 9, "max (minimum 13)"], break: 2 }, { day: 4, pause: 60, series: [12, 14, 10, 10, "max (minimum 15)"], break: 1 }, { day: 5, pause: 90, series: [13, 15, 11, 11, "max (minimum 17)"], break: 1 }, { day: 6, pause: 120, series: [14, 16, 13, 13, "max (minimum 19)"], break: 2 }],
    "21-25": [{ day: 1, pause: 60, series: [12, 17, 13, 13, "max (minimum 17)"], break: 1 }, { day: 2, pause: 90, series: [14, 19, 14, 14, "max (minimum 19)"], break: 1 }, { day: 3, pause: 120, series: [16, 21, 15, 15, "max (minimum 21)"], break: 2 }, { day: 4, pause: 60, series: [18, 22, 16, 16, "max (minimum 21)"], break: 1 }, { day: 5, pause: 90, series: [20, 25, 20, 20, "max (minimum 23)"], break: 1 }, { day: 6, pause: 120, series: [23, 28, 22, 22, "max (minimum 25)"], break: 2 }],
    "26-30": [{ day: 1, pause: 60, series: [14, 18, 14, 14, "max (minimum 20)"], break: 1 }, { day: 2, pause: 90, series: [20, 25, 15, 15, "max (minimum 23)"], break: 1 }, { day: 3, pause: 120, series: [20, 27, 18, 18, "max (minimum 25)"], break: 2 }, { day: 4, pause: 60, series: [21, 25, 21, 21, "max (minimum 27)"], break: 1 }, { day: 5, pause: 90, series: [25, 29, 25, 25, "max (minimum 30)"], break: 1 }, { day: 6, pause: 120, series: [29, 33, 29, 29, "max (minimum 33)"], break: 2 }],
    "31-35": [{ day: 1, pause: 45, series: [17, 19, 15, 15, "max (minimum 20)"], break: 1 }, { day: 2, pause: 45, series: [10, 10, 13, 13, 10, 10, 9, "max (minimum 25)"], break: 1 }, { day: 3, pause: 45, series: [13, 13, 15, 15, 12, 12, 10, "max (minimum 30)"], break: 2 }],
    "36-40": [{ day: 1, pause: 45, series: [22, 24, 20, 20, "max (minimum 25)"], break: 1 }, { day: 2, pause: 45, series: [15, 15, 18, 18, 15, 15, 14, "max (minimum 30)"], break: 1 }, { day: 3, pause: 45, series: [18, 18, 20, 20, 17, 17, 15, "max (minimum 35)"], break: 2 }],
    "41-45": [{ day: 1, pause: 45, series: [27, 29, 25, 25, "max (minimum 35)"], break: 1 }, { day: 2, pause: 45, series: [19, 19, 22, 18, 18, 18, 22, "max (minimum 35)"], break: 1 }, { day: 3, pause: 45, series: [20, 20, 24, 24, 20, 20, 22, "max (minimum 40)"], break: 2 }],
    "46-50": [{ day: 1, pause: 45, series: [30, 34, 30, 30, "max (minimum 40)"], break: 1 }, { day: 2, pause: 45, series: [19, 19, 23, 23, 19, 19, 22, "max (minimum 37)"], break: 1 }, { day: 3, pause: 45, series: [20, 20, 27, 27, 21, 21, 21, "max (minimum 44)"], break: 2 }],
    "51-55": [{ day: 1, pause: 45, series: [30, 39, 35, 35, "max (minimum 42)"], break: 1 }, { day: 2, pause: 45, series: [20, 20, 23, 23, 20, 20, 18, 18, "max (minimum 53)"], break: 1 }, { day: 3, pause: 45, series: [22, 22, 30, 30, 25, 25, 18, 18, "max (minimum 55)"], break: 2 }],
    "56-60": [{ day: 1, pause: 45, series: [30, 44, 40, 40, "max (minimum 55)"], break: 1 }, { day: 2, pause: 45, series: [22, 22, 27, 27, 24, 23, 18, 18, "max (minimum 58)"], break: 1 }, { day: 3, pause: 45, series: [26, 26, 33, 33, 26, 26, 22, 22, "max (minimum 60)"], break: 2 }],
    "+60": [{ day: 1, pause: 45, series: [35, 49, 45, 45, "max (minimum 55)"], break: 1 }, { day: 2, pause: 45, series: [22, 22, 30, 30, 24, 24, 18, 18, "max (minimum 59)"], break: 1 }, { day: 3, pause: 45, series: [28, 28, 35, 35, 27, 27, 23, 23, "max (minimum 60)"], break: 2 }],
};

// Legs datas
const legs = ["1-20", "21-40", "41-60", "61-80", "81-100", "101-125", "126-150", "151-175", "176-200"];
const legs_plan = {
    "1-20": [{ day: 1, pause: 60, series: [4, 6, 6, 7, "max (minimum 7)"], break: 1 }, { day: 2, pause: 60, series: [6, 6, 6, 8, "max (minimum 8)"], break: 1 }, { day: 3, pause: 60, series: [8, 6, 6, 8, "max (minimum 8)"], break: 2 }, { day: 4, pause: 60, series: [8, 8, 8, 6, "max (minimum 8)"], break: 1 }, { day: 5, pause: 60, series: [8, 8, 6, 8, "max (minimum 10)"], break: 1 }, { day: 6, pause: 60, series: [8, 8, 8, 8, "max (minimum 10)"], break: 2 }],
    "21-40": [{ day: 1, pause: 60, series: [8, 8, 8, 10, "max (minimum 10)"], break: 1 }, { day: 2, pause: 60, series: [10, 10, 10, 8, "max (minimum 10)"], break: 1 }, { day: 3, pause: 60, series: [12, 10, 10, 12, "max (minimum 12)"], break: 2 }, { day: 4, pause: 60, series: [12, 12, 12, 12, "max (minimum 12)"], break: 1 }, { day: 5, pause: 60, series: [12, 12, 14, 14, "max (minimum 16)"], break: 1 }, { day: 6, pause: 60, series: [14, 12, 14, 16, "max (minimum 15)"], break: 2 }],
    "41-60": [{ day: 1, pause: 60, series: [16, 16, 16, 18, "max (minimum 10)"], break: 1 }, { day: 2, pause: 60, series: [16, 14, 14, 18, "max (minimum 18)"], break: 1 }, { day: 3, pause: 60, series: [18, 18, 16, 16, "max (minimum 18)"], break: 2 }, { day: 4, pause: 60, series: [20, 20, 18, 18, "max (minimum 22)"], break: 1 }, { day: 5, pause: 60, series: [22, 22, 18, 18, "max (minimum 22)"], break: 1 }, { day: 6, pause: 60, series: [22, 22, 20, 20, "max (minimum 24)"], break: 2 }],
    "61-80": [{ day: 1, pause: 60, series: [22, 22, 22, 22, "max (minimum 24)"], break: 1 }, { day: 2, pause: 60, series: [22, 22, 22, 24, "max (minimum 24)"], break: 1 }, { day: 3, pause: 60, series: [22, 24, 24, 22, "max (minimum 24)"], break: 2 }, { day: 4, pause: 60, series: [24, 24, 24, 22, "max (minimum 26)"], break: 1 }, { day: 5, pause: 60, series: [24, 24, 24, 24, "max (minimum 26)"], break: 1 }, { day: 6, pause: 60, series: [26, 26, 24, 24, "max (minimum 28)"], break: 2 }],
    "81-100": [{ day: 1, pause: 60, series: [26, 26, 26, 26, "max (minimum 28)"], break: 1 }, { day: 2, pause: 60, series: [26, 26, 26, 28, "max (minimum 28)"], break: 1 }, { day: 3, pause: 60, series: [28, 26, 26, 28, "max (minimum 30)"], break: 2 }, { day: 4, pause: 60, series: [28, 28, 28, 28, "max (minimum 30)"], break: 1 }, { day: 5, pause: 60, series: [28, 28, 30, 30, "max (minimum 30)"], break: 1 }, { day: 6, pause: 60, series: [30, 30, 28, 30, "max (minimum 32)"], break: 2 }],
    "101-125": [{ day: 1, pause: 60, series: [32, 32, 30, 30, "max (minimum 32)"], break: 1 }, { day: 2, pause: 60, series: [32, 32, 32, 32, "max (minimum 34)"], break: 1 }, { day: 3, pause: 60, series: [34, 32, 32, 34, "max (minimum 36)"], break: 2 }, { day: 4, pause: 60, series: [34, 34, 34, 36, "max (minimum 36)"], break: 1 }, { day: 5, pause: 60, series: [36, 36, 34, 34, "max (minimum 36)"], break: 1 }, { day: 6, pause: 60, series: [36, 36, 36, 34, "max (minimum 38)"], break: 2 }],
    "126-150": [{ day: 1, pause: 60, series: [38, 36, 36, 40, "max (minimum 40)"], break: 1 }, { day: 2, pause: 60, series: [40, 38, 38, 38, "max (minimum 40)"], break: 1 }, { day: 3, pause: 60, series: [40, 38, 38, 40, "max (minimum 42)"], break: 2 }, { day: 4, pause: 60, series: [40, 40, 42, 40, "max (minimum 40)"], break: 1 }, { day: 5, pause: 60, series: [40, 40, 42, 42, "max (minimum 40)"], break: 1 }, { day: 6, pause: 60, series: [42, 42, 40, 40, "max (minimum 46)"], break: 2 }],
    "151-175": [{ day: 1, pause: 60, series: [44, 44, 40, 40, "max (minimum 46)"], break: 1 }, { day: 2, pause: 60, series: [44, 44, 46, 46, "max (minimum 46)"], break: 1 }, { day: 3, pause: 60, series: [46, 46, 46, 44, "max (minimum 46)"], break: 2 }, { day: 4, pause: 60, series: [46, 46, 46, 44, "max (minimum 48)"], break: 1 }, { day: 5, pause: 60, series: [46, 46, 46, 48, "max (minimum 48)"], break: 1 }, { day: 6, pause: 60, series: [48, 48, 46, 46, "max (minimum 50)"], break: 2 }],
    "176-200": [{ day: 1, pause: 60, series: [50, 50, 48, 48, "max (minimum 50)"], break: 1 }, { day: 2, pause: 60, series: [50, 50, 50, 48, "max (minimum 52)"], break: 1 }, { day: 3, pause: 60, series: [52, 52, 50, 50, "max (minimum 52)"], break: 2 }, { day: 4, pause: 60, series: [52, 52, 52, 50, "max (minimum 54)"], break: 1 }, { day: 5, pause: 60, series: [54, 52, 52, 52, "max (minimum 56)"], break: 1 }, { day: 6, pause: 60, series: [52, 52, 54, 52, "max (minimum 60)"], break: 2 }],
};

const exercices_plan_container = document.getElementById("exercices_plan");
const exercices_title_container = document.getElementById("title_exercices_program");
const exercices_program_title_container = document.getElementById("title_list");
const exercices_program_container = document.getElementById("list_exercices_program");
const free_video_container = document.getElementById("free_video");


let show_pump = false;
let show_leg = false;
let show_cardio = false;
let show_abs = false;
let show_stretch = false;


function toggleArrows(activeType) {
    const types = ["pump", "leg", "abs", "cardio", "stretch"];

    types.forEach(type => {
        const upArrows = document.querySelectorAll(`.arrow-up-${type}`);
        const downArrows = document.querySelectorAll(`.arrow-down-${type}`);
        const isActive = type === activeType;

        upArrows.forEach(el => el.classList.toggle("hidden", isActive));
        downArrows.forEach(el => el.classList.toggle("hidden", !isActive));
    });
}

function resetContainers() {
    exercices_plan_container.innerHTML = "";
    exercices_program_container.innerHTML = "";
    exercices_title_container.innerHTML = "";
    exercices_program_title_container.innerHTML = "";
    free_video_container.innerHTML = "";
}

function showProgram(program) {
    const isPump = program === "pump";
    const isLeg = program === "leg";
    const isFreeType = ["abs", "cardio", "stretch"].includes(program);

    const isVisible =
        (isPump && show_pump) ||
        (isLeg && show_leg) ||
        (program === "abs" && show_abs) ||
        (program === "cardio" && show_cardio) ||
        (program === "stretch" && show_stretch);

    if (isVisible) {
        toggleArrows(null); // Réinitialise les flèches
        resetContainers();
        show_pump = false;
        show_leg = false;
        show_cardio = false;
        show_abs = false;
        show_stretch = false;
        return;
    }

    toggleArrows(program);
    resetContainers();

    if (!isFreeType) {
        exercices_program_title_container.innerHTML = "Programmes";

        const list = isPump ? pumps : legs;
        const unit = isPump ? "pompes" : "squats";

        list.forEach(item => {
            exercices_program_container.innerHTML += `
                <li onclick="changeProgram('${item}', '${program}')">
                    ${item} ${unit}
                </li>`;
        });

        const defaultProgram = isPump ? "11-20" : "41-60";
        changeProgram(defaultProgram, program);
    } else {
        changeProgram(null, program); // Appelle quand même changeProgram pour les types libres
    }

    // Met à jour les indicateurs de programme actif
    show_pump = isPump;
    show_leg = isLeg;
    show_abs = program === "abs";
    show_cardio = program === "cardio";
    show_stretch = program === "stretch";
}

// function toggleArrows(activeType) {
//     const types = ["pump", "leg", "abs", "cardio", "stretch"];

//     types.forEach(type => {
//         const upArrows = document.querySelectorAll(`.arrow-up-${type}`);
//         const downArrows = document.querySelectorAll(`.arrow-down-${type}`);
//         const isActive = type === activeType;

//         upArrows.forEach(el => el.classList.toggle("hidden", isActive));
//         downArrows.forEach(el => el.classList.toggle("hidden", !isActive));
//     });
// }

// function resetContainers() {
//     exercices_plan_container.innerHTML = "";
//     exercices_program_container.innerHTML = "";
//     exercices_title_container.innerHTML = "";
//     exercices_program_title_container.innerHTML = "";
//     free_video_container.innerHTML = "";
// }

// function showProgram(program) {
//     const isPump = program === "pump";
//     const isVisible = isPump ? show_pump : show_leg;

//     if (isVisible) {
//         toggleArrows(null); // Réinitialise les flèches
//         resetContainers();
//         show_pump = false;
//         show_leg = false;
//         show_cardio = false;
//         show_abs = false;
//         show_stretch = false;
//         return;
//     }

//     toggleArrows(program);
//     resetContainers();
//     exercices_program_title_container.innerHTML = "Programmes";

//     const list = isPump ? pumps : legs;
//     const unit = isPump ? "pompes" : "squats";

//     list.forEach(item => {
//         exercices_program_container.innerHTML += `<li onclick="changeProgram('${item}', '${program}')">${item} ${unit}</li>`;
//     });

//     const defaultProgram = isPump ? "11-20" : "41-60";
//     changeProgram(defaultProgram, program);

//     show_pump = isPump;
//     show_leg = !isPump;
// }

function changeProgram(name_program, type_program) {
    if (["abs", "cardio", "stretch"].includes(type_program)) {
        showVideoProgram(type_program);
        return;
    }

    if (type_program == "pump") {
        program_name = "pompes";
        programs_plan = pumps_plan[name_program];
        if (name_program == "31-35" || name_program == "36-40" || name_program == "41-45" || name_program == "46-50" || name_program == "51-55" || name_program == "56-60" || name_program == "+60") {
            complete_first_col = true;
        } else {
            complete_first_col = false;
        }
    } else if (type_program == "leg") {
        program_name = "squats";
        programs_plan = legs_plan[name_program];
        complete_first_col = false;
    }

    document.getElementById("title_exercices_program").innerHTML = "Série de " + name_program + " " + program_name;
    exercices_plan_html = "";
    programs_plan.forEach(program_plan => {
        nb_exercice_series = 1;
        exercices_plan_container_html = "";
        if (complete_first_col && nb_exercice_series == 1) {
            exercices_plan_container_html += `<div class="day-serie-col col-sm-12"">`;
            complete_first_col = false;
        } else {
            exercices_plan_container_html += `<div class="day-serie-col col-sm-6"">`;
        }    
        exercices_plan_container_html += `<div class="day-serie">
            <h3>Jour ${program_plan.day}</h3>
            <p class="center-align"><strong>Pause :</strong> ${program_plan.pause} secondes</p>
            <hr>`;

            // Affichage des séries
            program_plan.series.forEach(program_serie => {
                exercices_plan_container_html += `<div class="center-align">
                    <div class="serie-item">
                        <span class="serie-label">Série ${nb_exercice_series}</span>
                        <span class="serie-value">${program_serie}</span>
                    </div>
                </div>`;
                nb_exercice_series++;
            });

            // Bloc de pause entre les jours
            exercices_plan_container_html += `<div class="pause-block">${program_plan.break} jour${program_plan.break > 1 ? 's' : ''} de pause minimum</div>`;

        exercices_plan_container_html += `</div></div>`;
        exercices_plan_html += exercices_plan_container_html;
    });
    exercices_plan_container.innerHTML = "<div class='row'>" + exercices_plan_html + "</div>";
    showVideoProgram(type_program);
}

function showVideoProgram(video_program) {
    free_video_content = "";
    const free_videos = ["warm_up_routine"];
    const name_free_videos = ["Échauffement"];
    if (video_program == "pump") {
        free_videos.push("100_push_ups_a_day_challenge");
        name_free_videos.push("100 pompes challenge");
    } else if (video_program == "leg") {
        free_videos.push("7_min_legs");
        name_free_videos.push("7min jambes");
    } else if (video_program == "leg") { 
        free_videos.push("7_min_legs");
        name_free_videos.push("7min jambes");
    } else if (video_program == "cardio") {
        free_videos.push("10_min_full_body_cardio");
        name_free_videos.push("10min Full Body Cardio");
    } else if (video_program == "abs") {
        free_videos.push("5_min_abs_no_rest", "abs_challenge");
        name_free_videos.push("5min abdos", "Abdos challenge");
    } else {
        free_videos.push("8_min_to_fix_posture");
        name_free_videos.push("8min stretching");
    }
    nb_video = 0;
    nb_videos = free_videos.length;
    if (nb_videos == 1) {
        col_size = 12;
    } else if (nb_videos == 2) {
        col_size = 6;
    } else {
        col_size = 4;
    }
    free_videos.forEach(free_video => {
        free_video_content += `<div class="col-sm-12 col-lg-${col_size}"><h3>${name_free_videos[nb_video]}</h3>
            <video controls="controls" preload="true">
                <source src="src/video/${free_video}.mp4" type="video/mov"/>
                <source src="src/video/${free_video}.mp4" type="video/mp4" />
                <source src="src/video/${free_video}.mp4" type="video/oog" />
                Your browser does not support the video tag.
            </video>
        </div>`;
        nb_video++;
    });
    free_video_container.innerHTML = "<h2>Liste des vidéos</h2><div class='row'>" + free_video_content + "</div>";
}