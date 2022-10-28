function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalX = document.querySelectorAll(".closeModal");
const confirmationModal = document.querySelector(".confirmation");
const closeConfirmation = document.querySelectorAll(".close-confirmation");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeModalX.forEach((btn) => btn.addEventListener("click", closeModal));
closeConfirmation.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  if(confirmationModal.style.display = "block") {
    confirmationModal.style.display = "none";
  }
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

