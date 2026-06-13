// MENU RESPONSIVO

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// CONTADOR ANIMADO

const counter = document.getElementById("counter");

let score = 0;

const interval = setInterval(() => {

    score += 137;

    counter.innerText = score.toLocaleString();

    if(score >= 99999){
        clearInterval(interval);
    }

},30);

// MODAL

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

document.querySelectorAll(".gallery-img")
.forEach(img => {

    img.addEventListener("click", () => {

        modal.style.display = "flex";
        modalImg.src = img.src;

    });

});

document.getElementById("close")
.addEventListener("click", () => {

    modal.style.display = "none";

});

// VOLTAR AO TOPO

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});