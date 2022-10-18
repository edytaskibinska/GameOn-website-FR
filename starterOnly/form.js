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
let formValid = false;

function showEmailError(elem) {
  console.log(elem.validity, "in showEmailError");
  if (elem.value == "") {
    emailError.textContent = "doit etre rempli.";
  } else if (elem.validity.valueMissing) {
    // If  empty,
    emailError.textContent = "You need to enter an e-mail address.";
  } else if (elem.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    emailError.textContent = "Entered value needs to be an e-mail address.";
  } else if (elem.validity.tooShort) {
    // If data is too short,
    emailError.textContent = `Email should be at least ${elem.minLength} characters; you entered ${email.value.length}.`;
  }
  emailError.className = "error active";
}

function showInputTextError(elem) {
  console.log("elem.value.trim()", elem.value.trim())
  if (elem.value.trim() === "") {
    if (elem.id == "first") {
      prenomError.textContent = `Entrez un Prénom`;
    } else if (elem.id == "last") {
      nomError.textContent = `Entrez un Nom`;
    } else if (elem.id == "quantity") {
      quantityError.textContent = `Entrez une quantité`;
    }
  } else if (elem.validity.tooShort) {
    if (elem.id == "first") {
      prenomError.textContent = `Le champs doit contenir minimum ${elem.minLength} caractères.`;
    } else if (elem.id == "last") {
      nomError.textContent = `Le champs doit contenir minimum ${elem.minLength} caractères.`;
    }
    else if (elem.id == "quantity") {
      nomError.textContent = `Le champs doit contenir minimum ${elem.minLength} caractères.`;
    }
  }
  // Set the styling appropriately
  prenomError.className = "error active";
  nomError.className = "error active";
}

const inputElements = [
  {
    element: prenom,
    errorElement: prenomError,
    errorMessage: showInputTextError,
  },
  {
    element: nom,
    errorElement: nomError,
    errorMessage: showInputTextError,
  },
  {
    element: email,
    errorElement: emailError,
    errorMessage: showEmailError,
  },
  {
    element: quantity,
    errorElement: quantityError,
    errorMessage: showInputTextError,
  },
];

inputElements.forEach((elem) => {
  elem.element.addEventListener("input", (event) => {
    console.log("elem", elem, "elem.element", elem.errorElement);
    if (elem.element.value.length && elem.element.validity.valid) {
      elem.errorElement.textContent = ""; // Reset the content of the message
      elem.errorElement.className = "error"; // Reset the visual state of the message
    } else {
      elem.errorMessage(elem.element);
    }
  });
});

function validate(event) {
  console.log("event", event);
  console.log("email.validity.valid", !email.validity.valid);
  console.log("email.value", email.value);
  console.log("prenom.value", prenom.value);
  console.log("nom.value", nom.value);
  // if the email field is valid, we let the form submit
  if (
    email.value == "" ||
    prenom.value == "" ||
    nom.value == "" ||
    quantity.value == ""
  ) {
    console.log("values empty");
    event.preventDefault();
  } else if (!email.validity.valid) {
    console.log("!email.validity.valid");

    // If it isn't, we display an appropriate error message
    showEmailError();
    // Then we prevent the form from being sent by canceling the event
    formValid = false;
    event.preventDefault();
  } else if (!prenom.validity.valid) {
    console.log("!prenom.validity.valid");

    // If it isn't, we display an appropriate error message
    showInputTextError(prenom);
    // Then we prevent the form from being sent by canceling the event
    formValid = false;
    event.preventDefault();
  } else if (!nom.validity.valid) {
    console.log("!nom.validity.valid");

    // If it isn't, we display an appropriate error message
    showInputTextError(nom);
    // Then we prevent the form from being sent by canceling the event
    formValid = false;
    event.preventDefault();
  }
  formValid = true;
}

function checkValidity(event) {
  validate(event);
  formValid ? console.log("valid") : event.preventDefault();
}
btnSubmit.addEventListener("click", checkValidity);
