// import * as config from "./modules/config";
import Swal from "sweetalert2";

const key = "5f96ae094b77c1637d147e0d";
const endpoint = "https://nitzan-1edb.restdb.io/rest/dxcform";

// Post user information to the data list after ubmiting a form

function post(data) {
  const postData = JSON.stringify(data);
  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      form.elements.submit.disabled = false;
      // get(data);
    });
}

// Update user entries to the form

function put(id) {
  let data = {
    real_name: "Dannie Vinther",
    hero_name: "El Puritan",
    age: 18,
  };
  let postData = JSON.stringify(data);

  fetch(`${endpoint}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((d) => d.json())
    .then((t) => get());
}
const emailField = document.querySelector("input[type=email]");
emailField.addEventListener("blur", (e) => {
  const emailIsValid = emailField.checkValidity();

  if (emailIsValid) {
    emailField.classList.remove("invalid");

    emailField.classList.add("valid");
  } else {
    emailField.classList.remove("valid");

    emailField.classList.add("invalid");
  }
});

const form = document.querySelector("form");
form.setAttribute("novalidate", true);

console.log(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("in ubmit", form.elements);
  form.elements.submit.disabled = true;
  console.log(form.elements.fullname.value);

  const formIsValid = form.checkValidity();
  if (formIsValid) {
    Swal.fire("Good job!", "We forwared your details", "success");
    post(myData);
  } else {
    prompt("form is not valid");
  }

  const myData = {
    full_name: form.elements.fullname.value,
    email: form.elements.email.value,
    company: form.elements.company.value,
  };
});

// Changing content
const logo = document.querySelector(".logo");
const nextBtn = document.querySelector(".next");
const backBtn = document.querySelector(".back");

const textSection = document.querySelector(".text");
const formSection = document.querySelector(".form");

nextBtn.addEventListener("click", () => {
  textSection.classList.add("fadeout");
  // setTimeout(() => {
  textSection.classList.add("hidden");
  logo.classList.add("hidden");
  formSection.classList.remove("hidden");
  formSection.classList.add("fadein");
  // }, 300);
});

backBtn.addEventListener("click", () => {
  textSection.classList.remove("fadeout");
  formSection.classList.add("fadeout");

  // setTimeout(() => {
  formSection.classList.add("hidden");
  logo.classList.remove("hidden");
  textSection.classList.remove("hidden");
  textSection.classList.add("fadein");
  // }, 300);
});
