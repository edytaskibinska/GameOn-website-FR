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

//refexp for email
const refexpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//test regexp for email
const validateEmail = (emailValue) => {
  return refexpEmail.test(emailValue);
};

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
  return `Veuillez entrer ${elem.minLength} caractères ou plus pour le champs ${elem.name}.`;
}
function showEmailError(elem, errorContainer) {
  console.log("elem.value", elem.value);

  if (elem.value == "") {
    // If  empty,
    errorContainer.textContent = generateMessage(elem);
  } else if (!validateEmail(elem.value)) {
    errorContainer.textContent = "Veuillez entrer une adresse email correcte.";
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
  if (elem.value === "" || elem.value === null || elem.validity.tooShort) {
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
    isValidField: false,
    elementId: "first",
    errorMessage: showInputTextError,
  },
  {
    element: nom,
    errorElement: nomError,
    isValidField: false,
    elementId: "last",
    errorMessage: showInputTextError,
  },
  {
    element: email,
    errorElement: emailError,
    isValidField: false,
    elementId: "email",
    errorMessage: showEmailError,
  },
  {
    element: date,
    errorElement: dateError,
    isValidField: false,
    elementId: "birthdate",
    errorMessage: showInputDateError,
  },
  {
    element: quantity,
    errorElement: quantityError,
    isValidField: false,
    elementId: "quantity",
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
    showOptionError(option, optionError, optionTextError); //set option error
  };
}
//setting error message for option conditions of use
conditions.addEventListener("click", (event) => {
  showOptionError(conditions, conditionsError, conditionsTextError); //set option conditions of use  error
});

function validateField(elementBase, elemId) {
  if (elementBase.element.id === elemId) {
    elementBase.isValidField =
      elementBase.element.value === "" || !elementBase.element.validity.valid
        ? false
        : true;
    if (!elementBase.isValidField) {
      elementBase.errorMessage(elementBase.element, elementBase.errorElement); //set error message
    }
    return elementBase.isValidField;
  }
}
//defining variables for filsd validation initialized to false
let emailRegexValid = false;
let optionsValid = false;
let termOfUseValid = false;

//validate form conditions - return true or false
function validate(event) {
  //for all fields in inputElements - validity check
  inputElements.forEach((elem) => {
    validateField(elem, elem.elementId);
    //add for mail
    if (elem.element.id === "email") {
      emailRegexValid = validateEmail(elem.element.value);
      if (!emailRegexValid) {
        elem.errorMessage(elem.element, elem.errorElement); //set error message
      }
    }
  });
  //for all fields in inputElements - validity result
  const inputsAreValid =
    inputElements[0].isValidField &&
    inputElements[1].isValidField &&
    inputElements[2].isValidField &&
    inputElements[3].isValidField &&
    inputElements[4].isValidField;

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

  if (!conditions.checked) {
    showOptionError(conditions, conditionsError, conditionsTextError); //set option conditions of use  error
    event.preventDefault();
    termOfUseValid = false;
  } else {
    termOfUseValid = true;
  }

  return inputsAreValid && optionsValid && emailRegexValid && termOfUseValid;
}

//block the page refresh to keep a valid conformation modal on
function validConfirmation(event) {
  event.preventDefault(); //revoir si possible d'afficher sans prevent default
  closeModal();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  confirmationModalS.style.display = "block";
}
//check validity for button submit
function checkValidity(event) {
  //store the result of form validation
  const formIsValid = validate(event);
  //if form valid so show confirmation modal else prevent refresh
  formIsValid ? validConfirmation(event) : event.preventDefault();
}
// adding event listener for submit button of form
btnSubmit.addEventListener("click", checkValidity);
