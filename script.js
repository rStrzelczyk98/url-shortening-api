"use strict";
const btn = document.querySelector(".submit");

const menu_btn = document.querySelector(".hamburger");

btn.addEventListener("click", function (e) {
  const input = document.getElementById("input");
  getURL(input.value);
});
menu_btn.addEventListener("click", displayMenu);

async function getURL(link) {
  const data = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);
  const url = await data.json();
  urlCard(link, url.result.short_link);
  // copy(url.result.short_link);
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
