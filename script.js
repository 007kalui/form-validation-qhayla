const form = document.getElementById("validation-form");

const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const phone = document.getElementById("phone");
const country = document.getElementById("country");
const successMessage = document.getElementById("success-message");

function showError(field, errorId, message) {
  field.classList.add("invalid");
  document.getElementById(errorId).textContent = message;
}

function clearError(field, errorId) {
  field.classList.remove("invalid");
  document.getElementById(errorId).textContent = "";
}

function validateEmail(value) {
  const atPosition = value.indexOf("@");
  const dotPosition = value.lastIndexOf(".");

  return atPosition > 0 &&
    dotPosition > atPosition + 1 &&
    dotPosition < value.length - 1 &&
    !value.includes(" ");
}

function validateField(field, errorId, isValid, message) {
  if (isValid) {
    clearError(field, errorId);
    return true;
  }

  showError(field, errorId, message);
  return false;
}

function validateForm() {
  let isValid = true;
  successMessage.textContent = "";

  if (!validateField(fullName, "full-name-error",
      fullName.value.trim() !== "", "Full name cannot be empty.")) {
    isValid = false;
  }

  if (!validateField(email, "email-error",
      validateEmail(email.value.trim()), "Enter a valid email address.")) {
    isValid = false;
  }

  if (!validateField(password, "password-error",
      password.value.length >= 6, "Password must be at least 6 characters.")) {
    isValid = false;
  }

  if (!validateField(confirmPassword, "confirm-password-error",
      confirmPassword.value !== "" && confirmPassword.value === password.value,
      "Passwords must match.")) {
    isValid = false;
  }

  if (!validateField(phone, "phone-error",
      /^\d{10,}$/.test(phone.value), "Phone number must contain only digits and at least 10 numbers.")) {
    isValid = false;
  }

  const genderSelected = document.querySelector('input[name="gender"]:checked');
  const genderGroup = document.getElementById("gender-group");
  if (genderSelected) {
    genderGroup.classList.remove("invalid");
    document.getElementById("gender-error").textContent = "";
  } else {
    genderGroup.classList.add("invalid");
    document.getElementById("gender-error").textContent = "Please select a gender option.";
    isValid = false;
  }

  const hobbiesSelected = document.querySelectorAll('input[name="hobbies"]:checked');
  const hobbiesGroup = document.getElementById("hobbies-group");
  if (hobbiesSelected.length > 0) {
    hobbiesGroup.classList.remove("invalid");
    document.getElementById("hobbies-error").textContent = "";
  } else {
    hobbiesGroup.classList.add("invalid");
    document.getElementById("hobbies-error").textContent = "Select at least one hobby or interest.";
    isValid = false;
  }

  if (!validateField(country, "country-error",
      country.value !== "", "Please select a country.")) {
    isValid = false;
  }

  return isValid;
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  if (validateForm()) {
    successMessage.textContent = "Form submitted successfully!";
    form.reset();

    document.querySelectorAll(".invalid").forEach(function(field) {
      field.classList.remove("invalid");
    });

    document.querySelectorAll(".error-message").forEach(function(message) {
      message.textContent = "";
    });
  }
});

fullName.addEventListener("input", function() {
  validateField(fullName, "full-name-error",
    fullName.value.trim() !== "", "Full name cannot be empty.");
});

email.addEventListener("input", function() {
  validateField(email, "email-error",
    validateEmail(email.value.trim()), "Enter a valid email address.");
});

password.addEventListener("input", function() {
  validateField(password, "password-error",
    password.value.length >= 6, "Password must be at least 6 characters.");

  if (confirmPassword.value !== "") {
    validateField(confirmPassword, "confirm-password-error",
      confirmPassword.value === password.value, "Passwords must match.");
  }
});

confirmPassword.addEventListener("input", function() {
  validateField(confirmPassword, "confirm-password-error",
    confirmPassword.value !== "" && confirmPassword.value === password.value,
    "Passwords must match.");
});

phone.addEventListener("input", function() {
  validateField(phone, "phone-error",
    /^\d{10,}$/.test(phone.value),
    "Phone number must contain only digits and at least 10 numbers.");
});

country.addEventListener("change", function() {
  validateField(country, "country-error",
    country.value !== "", "Please select a country.");
});

document.querySelectorAll('input[name="gender"]').forEach(function(radio) {
  radio.addEventListener("change", function() {
    document.getElementById("gender-group").classList.remove("invalid");
    document.getElementById("gender-error").textContent = "";
  });
});

document.querySelectorAll('input[name="hobbies"]').forEach(function(checkbox) {
  checkbox.addEventListener("change", function() {
    if (document.querySelector('input[name="hobbies"]:checked')) {
      document.getElementById("hobbies-group").classList.remove("invalid");
      document.getElementById("hobbies-error").textContent = "";
    }
  });
});
