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
            input_box.style.transform = "translate(-50%,-50%) scale(1.2)";
            setTimeout(() => {
                input_box.style.transform = "translate(-50%,-50%) scale(0)";
                setTimeout(() => {
                    title.style.opacity = "1";
                }, 600);
            }, 300);
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
                room = false;
            }

        } else {
            join_btn.style.backgroundColor = "";
            join_btn.style.cursor = "not-allowed";
            input_text.textContent = "הצתרפות למשחק";
            room = false;
        }

        if (data.numberOfUsers === 2) {
            input_text.textContent = ` הצתרפות למשחק ${data.room}`;
        }
        if (data.numberOfUsers === 1) {
            input_text.textContent = ` יצירת משחק ${data.room}`;
        }
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
}

initializeEverything();