const modalbg2 = document.querySelector(".bground");

const form = document.querySelector("form");
const btnSubmit = document.querySelector(".btn-submit");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");

const prenom = document.getElementById("first");
const prenomError = document.querySelector("#first + span.error");
const nom = document.getElementById("last");
const nomError = document.querySelector("#last + span.error");

const quantity = document.getElementById("quantity");
const quantityError = document.querySelector("#quantity + span.error");

const options = document.querySelectorAll(".location-radio");
const optionError = document.querySelector("#options + span.error");
const optionTextError = "Choisissez au moins une option";

const conditions = document.querySelector(".conditions");
const conditionsError = document.querySelector("#conditions + span.error");
const conditionsTextError = "Acceptez les conditions";

const confirmationModalS = document.querySelector(".confirmation");

// close modal form on form valid
function closeModal() {
  modalbg2.style.display = "none";
}

//error messages functions :
function showOptionError(elem, errorContainer, textError) {
  if (!elem.checked) {
    errorContainer.textContent = textError;
    return false;
  } else {
    errorContainer.textContent = "";
  }
}

function showEmailError(elem, errorContainer, textError) {
  if (elem.value == "") {
    // If  empty,
    errorContainer.textContent = textError;
  } else if (elem.validity.valueMissing) {
    // If  value missing,
    errorContainer.textContent = "You need to enter an e-mail address.";
  } else if (elem.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    errorContainer.textContent = "Entered value needs to be an e-mail address.";
  } else if (elem.validity.tooShort) {
    // If data is too short,
    errorContainer.textContent = `Email should be at least ${elem.minLength} characters; you entered ${email.value.length}.`;
  }
  errorContainer.className = "error active";
}

function showInputTextError(elem, errorContainer, textError) {
  //console.log("elem.value.trim()", elem.value.trim());
  if (elem.value === "") {
    errorContainer.textContent = textError;
  } else if (elem.validity.tooShort) {
    errorContainer.textContent = `Le champs doit contenir minimum ${elem.minLength} caractères.`;
  }
  // Set the styling appropriately
  errorContainer.className = "error active";
}

// input elements
const inputElements = [
  {
    element: prenom,
    errorElement: prenomError,
    textError: "entrez un prenom",
    errorMessage: showInputTextError,
  },
  {
    element: nom,
    errorElement: nomError,
    textError: "entrez un nom",
    errorMessage: showInputTextError,
  },
  {
    element: email,
    errorElement: emailError,
    textError: "entrez un email",
    errorMessage: showEmailError,
  },
  {
    element: quantity,
    errorElement: quantityError,
    textError: "Entrez une quantité",
    errorMessage: showInputTextError,
  },
];

//setting error message for inputs individually
inputElements.forEach((elem) => {
  elem.element.addEventListener("input", (event) => {
    if (elem.element.value.length && elem.element.validity.valid) {
      elem.errorElement.textContent = ""; // Reset the content of the message
      elem.errorElement.className = "error"; // Reset the visual state of the message
    } else {
      elem.errorMessage(elem.element, elem.errorElement, elem.textError);
    }
  });
});

//setting error message for set of options
for (const option of options) {
  option.onclick = (e) => {
    console.log(e.target.value);
    console.log("option", option.checked);
    showOptionError(option, optionError, optionTextError);
  };
}
//setting error message for ption conditions of use
conditions.addEventListener("click", (event) => {
  showOptionError(conditions, conditionsError, conditionsTextError);
});

//validate form conditions
function validate(event) {
  let condition1 = false
  let condition2 = false
  
  inputElements.forEach((elem) => {
    if (elem.element.value === "" || !elem.element.validity.valid) {
      
      event.preventDefault();
      elem.errorMessage(elem.element, elem.errorElement, elem.textError);
      condition1 = false;
    } else {
      condition1 = true;
    }
  });
  if (
    !(
      options[0].checked ||
      options[1].checked ||
      options[2].checked ||
      options[3].checked ||
      options[4].checked ||
      options[5].checked
    )
  ) {
    showOptionError(options, optionError, optionTextError);
    event.preventDefault();
    condition2 = false
  } else {
    condition2 = true
  }

  return condition1 && condition2;
}
function validConfirmation(event) {
  event.preventDefault()
  closeModal()
  confirmationModalS.style.display = "block"
}

function checkValidity(event) {
 const formValid =  validate(event);
  console.log("formValid", formValid)
  formValid ? validConfirmation(event) : event.preventDefault();
}
btnSubmit.addEventListener("click", checkValidity);
