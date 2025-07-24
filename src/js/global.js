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

const pumps = ["-5", "6-10", "11-20", "21-25", "26-30", "31-35", "36-40", "41-45", "51-55", "56-60", "+60"];

const pumps_plan = {
    "-5": [{ day: 1, pause: 60, series: [2, 3, 2, 2, "max (minimum 3)"], break: 1 }, { day: 2, pause: 90, series: [3, 4, 2, 3, "max (minimum 4)"], break: 1 }, { day: 3, pause: 120, series: [4, 5, 4, 4, "max (minimum 5)"], break: 2 }, { day: 4, pause: 60, series: [5, 6, 4, 4, "max (minimum 6)"], break: 1 }, { day: 5, pause: 90, series: [5, 6, 4, 4, "max (minimum 7)"], break: 1 }, { day: 6, pause: 120, series: [5, 7, 5, 5, "max (minimum 7)"], break: 2 }],
    "6-10": [{ day: 1, pause: 60, series: [5, 6, 4, 4, "max (minimum 5)"], break: 1 }, { day: 2, pause: 90, series: [6, 7, 6, 6, "max (minimum 7)"], break: 1 }, { day: 3, pause: 120, series: [8, 10, 7, 7, "max (minimum 10)"], break: 2 }, { day: 4, pause: 60, series: [9, 11, 8, 8, "max (minimum 11)"], break: 1 }, { day: 5, pause: 90, series: [10, 12, 9, 9, "max (minimum 13)"], break: 1 }, { day: 6, pause: 120, series: [12, 13, 10, 10, "max (minimum 15)"], break: 2 }],
    "11-20": [{ day: 1, pause: 60, series: [8, 9, 7, 7, "max (minimum 8)"], break: 1 }, { day: 2, pause: 90, series: [9, 10, 8, 8, "max (minimum 10)"], break: 1 }, { day: 3, pause: 120, series: [11, 13, 9, 9, "max (minimum 13)"], break: 2 }, { day: 4, pause: 60, series: [12, 14, 10, 10, "max (minimum 15)"], break: 1 }, { day: 5, pause: 90, series: [13, 15, 11, 11, "max (minimum 17)"], break: 1 }, { day: 6, pause: 120, series: [14, 16, 13, 13, "max (minimum 19)"], break: 2 }],
    "21-25": [{ day: 1, pause: 60, series: [12, 17, 13, 13, "max (minimum 17)"], break: 1 }, { day: 2, pause: 90, series: [14, 19, 14, 14, "max (minimum 19)"], break: 1 }, { day: 3, pause: 120, series: [16, 21, 15, 15, "max (minimum 21)"], break: 2 }, { day: 4, pause: 60, series: [18, 22, 16, 16, "max (minimum 21)"], break: 1 }, { day: 5, pause: 90, series: [20, 25, 20, 20, "max (minimum 23)"], break: 1 }, { day: 6, pause: 120, series: [23, 28, 22, 22, "max (minimum 25)"], break: 2 }],
    "26-30": [{ day: 1, pause: 60, series: [14, 18, 14, 14, "max (minimum 20)"], break: 1 }, { day: 2, pause: 90, series: [20, 25, 15, 15, "max (minimum 23)"], break: 1 }, { day: 3, pause: 120, series: [20, 27, 18, 18, "max (minimum 25)"], break: 2 }, { day: 4, pause: 60, series: [21, 25, 21, 21, "max (minimum 27)"], break: 1 }, { day: 5, pause: 90, series: [25, 29, 25, 25, "max (minimum 30)"], break: 1 }, { day: 6, pause: 120, series: [29, 33, 29, 29, "max (minimum 33)"], break: 2 }],
    "31-35": [{ day: 1, pause: 60, series: [17, 19, 15, 15, "max (minimum 20)"], break: 1 }, { day: 2, pause: 45, series: [10, 10, 13, 13, 10, 10, 9, "max (minimum 25)"], break: 1 }, { day: 3, pause: 45, series: [13, 13, 15, 15, 12, 12, 10, "max (minimum 30)"], break: 2 }],
    "36-40": [{ day: 1, pause: 60, series: [22, 24, 20, 20, "max (minimum 25)"], break: 1 }, { day: 2, pause: 45, series: [15, 15, 18, 18, 15, 15, 14, "max (minimum 30)"], break: 1 }, { day: 3, pause: 45, series: [18, 18, 20, 20, 17, 17, 15, "max (minimum 35)"], break: 2 }],
    "41-45": [{ day: 1, pause: 60, series: [27, 29, 25, 25, "max (minimum 35)"], break: 1 }, { day: 2, pause: 45, series: [19, 19, 22, 18, 18, 18, 22, "max (minimum 35)"], break: 1 }, { day: 3, pause: 45, series: [20, 20, 24, 24, 20, 20, 22, "max (minimum 40)"], break: 2 }],
    "46-50": [{ day: 1, pause: 60, series: [30, 34, 30, 30, "max (minimum 40)"], break: 1 }, { day: 2, pause: 45, series: [19, 19, 23, 23, 19, 19, 22, "max (minimum 37)"], break: 1 }, { day: 3, pause: 45, series: [20, 20, 27, 27, 21, 21, 21, "max (minimum 44)"], break: 2 }],
    "51-55": [{ day: 1, pause: 60, series: [30, 39, 35, 35, "max (minimum 42)"], break: 1 }, { day: 2, pause: 45, series: [20, 20, 23, 23, 20, 20, 18, 18, "max (minimum 53)"], break: 1 }, { day: 3, pause: 45, series: [22, 22, 30, 30, 25, 25, 18, 18, "max (minimum 55)"], break: 2 }],
    "56-60": [{ day: 1, pause: 60, series: [30, 44, 40, 40, "max (minimum 55)"], break: 1 }, { day: 2, pause: 45, series: [22, 22, 27, 27, 24, 23, 18, 18, "max (minimum 58)"], break: 1 }, { day: 3, pause: 45, series: [26, 26, 33, 33, 26, 26, 22, 22, "max (minimum 60)"], break: 2 }],
    "+60": [{ day: 1, pause: 60, series: [35, 49, 45, 45, "max (minimum 55)"], break: 1 }, { day: 2, pause: 45, series: [22, 22, 30, 30, 24, 24, 18, 18, "max (minimum 59)"], break: 1 }, { day: 3, pause: 45, series: [28, 28, 35, 35, 27, 27, 23, 23, "max (minimum 60)"], break: 2 }],
};

const pumps_plan_container = document.getElementById("pumps_plan");
const pumps_title_container = document.getElementById("title_pumps_program");

// Liste de la série 11-20 pompes
document.getElementById("title_pumps_program").innerHTML = "Série de 11-20 pompes";;
pumps_plan_html = "";
pumps_plan["11-20"].forEach(pump_plan => {
    nb_pump_series = 1;
    pumps_plan_container_html = "";
    pumps_plan_container_html += `<div class="day-serie-col col-sm-6""><div class="day-serie">
        <h3>Jour ${pump_plan.day}</h3>
        <p class="center-align"><strong>Pause entre séries :</strong> ${pump_plan.pause} secondes</p>
        <hr>`;

        // Affichage des séries
        pump_plan.series.forEach(pump_serie => {
            pumps_plan_container_html += `<div class="center-align">
                <div class="serie-item">
                    <span class="serie-label">Série ${nb_pump_series}</span>
                    <span class="serie-value">${pump_serie}</span>
                </div>
            </div>`;
            nb_pump_series++;
        });

        // Bloc de pause entre les jours
        pumps_plan_container_html += `<div class="pause-block">
        ${pump_plan.break} jour${pump_plan.break > 1 ? 's' : ''} de pause minimum
        </div>`;

    pumps_plan_container_html += `</div></div>`;
    pumps_plan_html += pumps_plan_container_html;
});
pumps_plan_container.innerHTML = "<div class='row'>" + pumps_plan_html + "</div>";

// Liste des exercice dans une liste
const pump_program_container = document.getElementById("list_pumps_program");
pumps.forEach(pump => {
    pump_program_container.innerHTML += `<li onclick="changeProgram('${pump}')">${pump} pompes</li>`;
});

function changeProgram(name_program) {
    document.getElementById("title_pumps_program").innerHTML = "Série de " + name_program + " pompes";
    pumps_plan_html = "";
    if (name_program == "31-35" || name_program == "36-40" || name_program == "41-45" || name_program == "46-50" || name_program == "51-55" || name_program == "56-60" || name_program == "+60") {
        complete_first_col = true;
    } else {
        complete_first_col = false;
    }
    pumps_plan[name_program].forEach(pump_plan => {
        nb_pump_series = 1;
        pumps_plan_container_html = "";
        if (complete_first_col && nb_pump_series == 1) {
            pumps_plan_container_html += `<div class="day-serie-col col-sm-12"">`;
            complete_first_col = false;
        } else {
            pumps_plan_container_html += `<div class="day-serie-col col-sm-6"">`;
        }    
        pumps_plan_container_html += `<div class="day-serie">
            <h3>Jour ${pump_plan.day}</h3>
            <p class="center-align"><strong>Pause entre séries :</strong> ${pump_plan.pause} secondes</p>
            <hr>`;

            // Affichage des séries
            pump_plan.series.forEach(pump_serie => {
                pumps_plan_container_html += `<div class="center-align">
                    <div class="serie-item">
                        <span class="serie-label">Série ${nb_pump_series}</span>
                        <span class="serie-value">${pump_serie}</span>
                    </div>
                </div>`;
                nb_pump_series++;
            });

            // Bloc de pause entre les jours
            pumps_plan_container_html += `<div class="pause-block">
            ${pump_plan.break} jour${pump_plan.break > 1 ? 's' : ''} de pause minimum
            </div>`;

        pumps_plan_container_html += `</div></div>`;
        pumps_plan_html += pumps_plan_container_html;
    });
    pumps_plan_container.innerHTML = "<div class='row'>" + pumps_plan_html + "</div>";
}