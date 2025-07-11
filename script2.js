let body = document.getElementById("chat");
let head = document.querySelector("header");

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);

head.textContent = `${urlParams.get("name")}`;

let msgWindow = document.querySelector(".messages");

document.addEventListener("DOMContentLoaded", () => {
  msgWindow.scrollTo({ top: msgWindow.scrollHeight });
});
