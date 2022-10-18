//defining elements

const modalbg2 = document.querySelector(".bground");

const form = document.querySelector("form");
const btnSubmit = document.querySelector(".btn-submit");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");

const prenom = document.getElementById("first");
const prenomError = document.querySelector("#first + span.error");

const nom = document.getElementById("last");
const nomError = document.querySelector("#last + span.error");

const date = document.getElementById("birthdate");
const dateError = document.querySelector("#birthdate + span.error");

const quantity = document.getElementById("quantity");
const quantityError = document.querySelector("#quantity + span.error");

const options = document.querySelectorAll(".location-radio");
const optionError = document.querySelector("#options + span.error");
const optionTextError = "Vous devez choisir une option.";

const conditions = document.querySelector(".conditions");
const conditionsError = document.querySelector("#conditions + span.error");
const conditionsTextError =
  "Vous devez vérifier que vous acceptez les termes et conditions.";

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
function generateMessage(elem) {
  return `Veuillez entrer ${elem.minLength} caractères ou plus pour le champs ${elem.name}.`
}
function showEmailError(elem, errorContainer) {
  if (elem.value == "") {
    // If  empty,
    errorContainer.textContent = generateMessage(elem);
  } else if (elem.validity.valueMissing) {
    // If  value missing,
    errorContainer.textContent = generateMessage(elem);
  } else if (elem.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    errorContainer.textContent = "Veuillez entrer une adresse email correcte.";
  } else if (elem.validity.tooShort) {
    // If data is too short,
    errorContainer.textContent = generateMessage(elem);
  }
  errorContainer.className = "error active";
}

function showInputTextError(elem, errorContainer) {
  //console.log("elem.value.trim()", elem.value.trim());
  if (elem.value === "" || elem.validity.tooShort) {
    errorContainer.textContent = generateMessage(elem);
  }
  // Set the styling appropriately
  errorContainer.className = "error active";
}
function showInputDateError(elem, errorContainer) {
  if (elem.value === "") {
    errorContainer.textContent = `Vous devez entrer votre date de naissance.`;
  }
  // Set the styling appropriately
  errorContainer.className = "error active";
}

// input elements list
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
    element: date,
    errorElement: dateError,
    errorMessage: showInputDateError,
  },
  {
    element: quantity,
    errorElement: quantityError,
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
      elem.errorMessage(elem.element, elem.errorElement); //set error message
    }
  });
});

//setting error message for set of options
for (const option of options) {
  option.onclick = (e) => {
    showOptionError(option, optionError, optionTextError);//set option error
  };
}
//setting error message for otion conditions of use
conditions.addEventListener("click", (event) => {
  showOptionError(conditions, conditionsError, conditionsTextError);//set option conditions of use  error
});

//validate form conditions
function validate(event) {
  //check for fields
  let fieldsValid = false;
  //check for options
  let optionsValid = false;
  //fields validity check
  inputElements.forEach((elem) => {
    //add for mail
    if (elem.element.value === "" || !elem.element.validity.valid) {
      event.preventDefault();
      elem.errorMessage(elem.element, elem.errorElement);
      fieldsValid = false;
    } else {
      fieldsValid = true;
    }
  });
  //options validity check
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
    optionsValid = false;
  } else {
    optionsValid = true;
  }
  //check result for both condition - form valid if both true
  return fieldsValid && optionsValid;
}
//block the page refresh to keep a valid conformation modal on
function validConfirmation(event) {
  event.preventDefault();
  closeModal();
  confirmationModalS.style.display = "block";
}
//check validity for button submit
function checkValidity(event) {
  //store the result of form validation
  const formValid = validate(event);
  //if form valid so show confirmation modal else prevent refresh
  formValid ? validConfirmation(event) : event.preventDefault();
}
// adding event listener for submit button of form
btnSubmit.addEventListener("click", checkValidity);
