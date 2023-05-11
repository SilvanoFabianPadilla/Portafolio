import { valida } from "./validaciones.js";

window.addEventListener("scroll", function () {
  var header = document.querySelector(".menu");
  header.classList.toggle("abajo", window.scrollY > 0);
});

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("blur", (input) => {
    valida(input.target);
  });
});
