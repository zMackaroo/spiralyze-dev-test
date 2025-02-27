document.addEventListener("DOMContentLoaded", () => {
  const countrySelector = document.getElementById("country-list__select");
  const countryOptions = document.getElementById("country-lists");
  const countryField = document.getElementById("country");
  const contactForm = document.getElementById("contact-form");

  // Country dropdown functionality
  countrySelector.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent document click from immediately closing dropdown
    toggleCountryDropdown();
  });

  // Add document click listener to close dropdown when clicking outside
  document.addEventListener("click", () => {
    if (countryOptions.classList.contains("show")) {
      countryOptions.classList.remove("show");
    }
  });

  // Prevent dropdown from closing when clicking inside the options
  countryOptions.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent document click from triggering
    const selectedValue = event.target.innerHTML;
    const fieldLabel = countrySelector.querySelector("#label-country");
    const errorMessage = countrySelector.querySelector(".form-error_msg");

    fieldLabel.className = "label-country";
    countryField.value = selectedValue;

    if (errorMessage) {
      countrySelector.removeChild(errorMessage);
      countrySelector.classList.remove("form-error_input");
    }
    countryOptions.classList?.remove("show");
  });

  function toggleCountryDropdown() {
    countryOptions.classList.toggle("show");
  }

  // Form submission handling
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formFields = event.target.querySelectorAll("input");
    const fieldOrder = [
      formFields[0],
      formFields[2],
      formFields[1],
      formFields[3],
      formFields[4],
    ];

    const isFormValid = Array.from(fieldOrder).every(validateFormField);

    if (isFormValid) {
      event.target.reset();
      window.location.href = "thankyou.html";
    }
  });

  function clearErrorState(inputField) {
    if (!inputField) return;

    const fieldContainer = inputField.parentElement;
    const errorElement =
      fieldContainer.getElementsByClassName("form-error_msg")[0];

    if (errorElement) {
      fieldContainer.removeChild(errorElement);
      fieldContainer.classList.remove("form-error_input");
    }
  }

  function validateFormField(inputField) {
    if (!inputField) return;

    const fieldContainer = inputField.parentElement;
    const fieldValue = inputField.value.trim();
    const emailPattern =
      /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    const isEmptyField = fieldValue === "";
    const isEmailField = inputField.name === "email";

    const displayError = (message) => {
      clearErrorState(inputField);
      const errorElement = createErrorMessage(message);
      fieldContainer.classList.add("form-error_input");
      fieldContainer.append(errorElement);
      inputField.focus();
    };

    if (isEmptyField) {
      displayError("This field cannot be empty.");
      return false;
    }

    if (isEmailField && !emailPattern.test(fieldValue)) {
      displayError("Please insert a valid email.");
      return false;
    }

    clearErrorState(inputField);
    return true;
  }

  function createErrorMessage(message) {
    const errorContainer = document.createElement("div");
    const errorIcon = document.createElement("div");
    const errorText = document.createElement("p");

    errorContainer.classList.add("form-error_msg");
    errorIcon.classList.add("polygon");
    errorText.innerHTML = message;

    errorContainer.append(errorIcon);
    errorContainer.append(errorText);

    return errorContainer;
  }

  // Handle input field changes
  contactForm.addEventListener("change", (event) => {
    const fieldLabel = event.target.nextElementSibling;
    const hasContent = event.target.value.trim();

    if (hasContent.length > 0) {
      fieldLabel.classList.add("input-has-value");
    } else {
      fieldLabel.classList.remove("input-has-value");
    }
  });
});
