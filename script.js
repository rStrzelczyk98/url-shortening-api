"use strict";
const btn = document.querySelector(".submit");
const menu_btn = document.querySelector(".hamburger");
const input = document.getElementById("input");
let linksArray = [];

window.addEventListener("load", getLinks);
input.addEventListener("focus", removeError);
btn.addEventListener("click", function (e) {
  if (!input.value) {
    displayError("Please add a link");
    return;
  }
  getURL(input.value);
});
menu_btn.addEventListener("click", displayMenu);

async function getURL(link) {
  try {
    const data = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);
    const url = await data.json();
    if (url.ok) {
      const url_object = { url: link, short_url: url.result.short_link };
      linksArray.push(url_object);
      localStorage.setItem("links", JSON.stringify(linksArray));
      urlCard(link, url.result.short_link);
    } else {
      throw new Error(url.error);
    }
  } catch (error) {
    displayError(error.message.split(",")[0]);
  }
}

function copy(url) {
  const cards = document.querySelectorAll(".copy");
  cards.forEach(toggle);
  this.classList.add("active");
  this.textContent = "Copied!";
  navigator.clipboard.writeText(url);
}
function displayMenu(e) {
  const menu = document.querySelector(".main-nav");
  const btn = e.target.closest(".hamburger");
  btn.classList.toggle("active");
  menu.classList.toggle("active");
}

function urlCard(long, short) {
  const container = document.querySelector(".statistics");
  const html = ` <div class="url-card">
          <p>${long}</p>
          <a href="https://${short}" target="_blank">${short}</a>
          <button class="copy cta" onclick="copy.bind(this, '${short}')()">Copy</button>
        </div>`;
  container.insertAdjacentHTML("afterbegin", html);
}
function toggle(el) {
  el.classList.remove("active");
  el.textContent = "Copy";
}

function getLinks() {
  if (!localStorage.getItem("links")) return;
  const data = localStorage.getItem("links");
  const array = JSON.parse(data);
  linksArray = array;
  linksArray.forEach((el) => urlCard(el.url, el.short_url));
}
function displayError(msg) {
  const error = document.getElementById("error");
  input.classList.add("error");
  input.ariaInvalid = true;
  error.textContent = msg;
}
function removeError() {
  const error = document.getElementById("error");
  input.classList.remove("error");
  input.ariaInvalid = false;
  error.textContent = "";
}
