// VALIDATION FUNCTIONS
function isNameValid(name) {
  // for first name, last name and company name
  return typeof name === "string" && name !== "";
}
function isEmailValid(email) {
  const VALIDATION_REGEX = /^[a-zA-Z0-9.]{1,64}@[a-zA-Z0-9.]{1,64}$/gm
  return VALIDATION_REGEX.test(email);
}
function isPhoneValid(phone) {
  const VALIDATION_REGEX = /^[ -]*(\d[ -]*){6,}$/gm
  return VALIDATION_REGEX.test(phone);
}

// PERSON VALIDATION
function validatePersonForm(form) {
  const firstNameInput = form.querySelector("#first_name");
  const lastNameInput = form.querySelector("#last_name");
  const emailInput = form.querySelector("#email");
  return isNameValid(firstNameInput.value) && isNameValid(lastNameInput.value) && isEmailValid(emailInput.value);
}

// COMPANY VALIDATION
function validateCompanyForm(form) {
  const companyNameInput = form.querySelector("#company_name");
  const phoneInput = form.querySelector("#phone");
  return isNameValid(companyNameInput.value) && isPhoneValid(phoneInput.value);
}

// HELPER FUNCTIONS
function isRadioBtnChecked(radioBtn) {
  return radioBtn.checked;
}

// MAIN
function solution() {
  const FORM = document.querySelector("form");
  const PERSON_RADIO_BTN = document.querySelector("#type_person");
  const COMPANY_RADIO_BTN = document.querySelector("#type_company");
  if (isRadioBtnChecked(PERSON_RADIO_BTN)) {
    return validatePersonForm(FORM);
  }
  if (isRadioBtnChecked(COMPANY_RADIO_BTN)) {
    return validateCompanyForm(FORM);
  }
}


// Agaty:

function solution() {
  const FORM = 'form';
  const COMPANY = 'company';
  const PERSON = 'person';

  const form = document.getElementsByTagName(FORM)[0];

  let valid = true;

  [...form.elements].forEach((input) => {
    if (input.checked && input.value === PERSON) {
      const firstName =document.getElementById('first_name').value;
      const lastName = document.getElementById('last_name').value;
      const email = document.getElementById("email").value;

      function validateEmail(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test((email.toString()).toLowerCase());
      }

      if (firstName === '' || lastName === '' || !validateEmail(email)) {
        valid = false;
      }
    }
    if (input.checked && input.value === COMPANY) {
      const companyName = document.getElementById('company_name').value;
      const phoneNumber = document.getElementById('phone').value;
      function validatePhoneNumber(phone) {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return regex.test(phone);
      }

      if (companyName === '' || !validatePhoneNumber(phoneNumber)) {
        valid = false;
      }

    }
  });

  return valid;
  // write your code in JavaScript (Node.js 8.9.4)
  //
  // you can access DOM Tree using DOM Object Model:
  // document.getElementById
  // or using jQuery:
  // $('some_tag')
  //
  // you can write to stdout for debugging purposes, e.g.
  // console.log('this is a debug message');
}