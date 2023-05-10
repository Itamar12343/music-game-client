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
const join_btn = el("join-btn");

function el(element) {
    return document.querySelector(element);
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
}

function playWithFriendOnline() {

}

initializeEverything();