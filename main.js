import './style.scss';
import { io } from "socket.io-client";
const socket = io("http://localhost:3000/");
const before_load_btn = document.querySelectorAll(".before-load-btn");
const withFriend = el(".with-friend");
const alone = el(".alone");
const withFriendOnline = el(".with-friend-online");
const before_load_box = el(".before-load-box");
const blocker = el(".blocker");
const input_box = el(".input-box");
const input = el(".input");
const join_btn = el(".join-btn");
const input_text = el(".input-text");
const title = el(".title");
const count_down = el(".count-down");
const my_character = el(".my-character");
const his_character = el(".his-character");
let room = false;

function el(element) {
    return document.querySelector(element);
}

function eventListeners() {

    input.onkeyup = () => {
        socket.emit("get room status", input.value);
    }

    join_btn.onclick = () => {
        if (room === true) {
            socket.emit("join room", input.value);
            hideInput();
            toggleTitle(true);
        }
    }
}

function socketListeners() {

    socket.on("room status", data => {
        if (data.room !== "") {
            if (data.numberOfUsers > 0 && data.numberOfUsers < 3) {
                join_btn.style.backgroundColor = "#85ffa9";
                join_btn.style.cursor = "pointer";
                room = true;
            } else {
                join_btn.style.backgroundColor = "";
                join_btn.style.cursor = "not-allowed";
                input_text.textContent = `המשחק כבר תפוס`;
                join_btn.textContent = "הצתרף";
                room = false;
            }

        } else {
            join_btn.style.backgroundColor = "";
            join_btn.style.cursor = "not-allowed";
            input_text.textContent = "הצתרפות למשחק";
            room = false;
        }

        if (data.numberOfUsers === 2) {
            input_text.textContent = `הצתרפות למשחק`;
            join_btn.textContent = "הצתרף";
        }
        if (data.numberOfUsers === 1) {
            input_text.textContent = ` יצירת משחק`;
            join_btn.textContent = "צור משחק";
        }
    });

    socket.on("the connection started", () => {
        toggleTitle(false);
        count_down_animation();
    });
}

function listenToModes() {
    alone.addEventListener("click", () => {
        console.log("alone");
    });

    withFriend.addEventListener("click", () => {
        console.log("withFriend");
    });

    withFriendOnline.addEventListener("click", () => {
        playWithFriendOnline();
        goToGame();
    });
}

function listenToBtnEvent() {
    for (let i = 0; i < before_load_btn.length; i++) {
        before_load_btn[i].addEventListener("click", () => {
            btnAnimation(before_load_btn[i]);
        });
    }
}

function goToGame() {
    setTimeout(() => {
        before_load_box.style.transform = "scale(1.2)";
        before_load_box.style.transform = "translateX(-100%)";
        input.focus();
        setTimeout(() => {
            before_load_box.style.transform = "scale(0)";
        }, 300);
    }, 500);
}

function hideInput() {
    input_box.style.transform = "translate(-50%,-50%) scale(1.2)";
    setTimeout(() => {
        input_box.style.transform = "translate(-50%,-50%) scale(0)";
    }, 300);
}

function toggleTitle(toggle) {
    setTimeout(() => {
        if (toggle === true) {
            title.style.opacity = "1";
        } else {
            title.style.opacity = "0";
        }
    }, 600);
}

function count_down_animation() {
    setTimeout(() => {
        count_down.style.transform = "translate(-50%,-50%) scale(1.2)";
        count_down_animation_part(2, "#93c5ff");
        setTimeout(() => {
            count_down_animation_part(1, "#ff91dc");
            setTimeout(() => {
                count_down_animation_part(0, "#b2ff9a");
            }, 1000);
        }, 1000);
    }, 600);
}

function count_down_animation_part(number, color) {
    setTimeout(() => {
        count_down.style.transform = "translate(-50%,-50%) scale(1)";
        setTimeout(() => {
            count_down.style.transform = "translate(-50%,-50%) scale(0.6)";
            count_down.style.backgroundColor = color;
            setTimeout(() => {
                count_down.style.transform = "translate(-50%,-50%) scale(1)";
                count_down.textContent = number;
                setTimeout(() => {
                    if (number === 0) {
                        count_down.style.transform = "translate(-50%,-50%) scale(0)";
                        blocker.style.opacity = "0";
                    } else {
                        count_down.style.transform = "translate(-50%,-50%) scale(0.6)";
                    }
                }, 800);
            }, 200);
        }, 400);
    }, 400);
}

function btnAnimation(btn) {
    btn.style.transform = "scale(1.3)";
    setTimeout(() => {
        btn.style.transform = "scale(1)";
    }, 200);
}

function initializeEverything() {
    listenToBtnEvent();
    listenToModes();
    eventListeners();
    socketListeners();
}

function playWithFriendOnline() {
    input_box.style.opacity = "1";
    document.addEventListener("keyup", () => {
        let right = window.getComputedStyle(my_character).right;
        console.log(right);
        my_character.style.right = right - 10;
    });
}

initializeEverything();