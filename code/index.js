import { io } from "./nod";
//const socket = io("http://localhost:3000/");
const before_load_btn = document.querySelectorAll(".before-load-btn");
const withFriend = document.querySelector(".with-friend");
const alone = document.querySelector(".alone");
const withFriendOnline = document.querySelector(".with-friend-online");
const before_load_box = document.querySelector(".before-load-box");

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
}

function playWithFriendOnline() {

}

initializeEverything();