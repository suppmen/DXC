import * as config from "./modules/config";
import { get } from "./modules/rest";
import Swal from "sweetalert2";

let visitsCount = 1;

// Post user information to the data list after ubmiting a form

function post(data) {
  const postData = JSON.stringify(data);
  fetch(config.endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": config.key,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      form.elements.submit.disabled = false;
    });
}

// Update user entries to the form

function put(id) {
  let data = {
    visits: visitsCount,
  };
  let postData = JSON.stringify(data);

  fetch(`${config.endpoint}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": config.key,
      "cache-control": "no-cache",
    },
    body: postData,
  }).then((d) => d.json());
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
  console.log(form.elements.check.checked);
  if (!form.elements.check.checked) {
    const erorr = document.querySelector(".astrix");
    erorr.style.display = "block";
  }

  const formIsValid = form.checkValidity();
  if (formIsValid) {
    let person = {
      name: form.elements.fullname.value,
      visits: visitsCount,
      email: form.elements.email.value,
    };
    let stringyPerson = JSON.stringify(person);
    // Setting up a new user with the username in the local storage after submitting the form
    localStorage.setItem("user", stringyPerson);

    const myData = {
      full_name: form.elements.fullname.value,
      email: form.elements.email.value,
      company: form.elements.company.value,
      visits: 1,
    };

    post(myData);
    window.location.href = "pdf.html";
  } else {
    Swal.fire({
      icon: "error",
      title: "Form is not valid",
    });
  }
});

// Changing content
const logo = document.querySelector(".logo");
const nextBtn = document.querySelector(".next");
const backBtn = document.querySelector(".back");

const textSection = document.querySelector(".text");
const formSection = document.querySelector(".form");

nextBtn.addEventListener("click", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (user) {
    console.log(user);
    visitsCount++;
    let updatedPerson = {
      name: user.name,
      visits: visitsCount,
      email: user.email,
    };
    let stringyPerson = JSON.stringify(updatedPerson);
    localStorage.setItem("user", stringyPerson);

    window.location.href = "pdf.html";
    get(config.endpoint, handleData);
  } else {
    textSection.classList.add("fadeout");
    textSection.classList.add("hidden");
    logo.classList.add("hidden");
    formSection.classList.remove("hidden");
    formSection.classList.add("fadein");
    console.log("no user");
  }
});

backBtn.addEventListener("click", () => {
  textSection.classList.remove("fadeout");
  formSection.classList.add("fadeout");

  formSection.classList.add("hidden");
  logo.classList.remove("hidden");
  textSection.classList.remove("hidden");
  textSection.classList.add("fadein");
});

function handleData(data) {
  console.log(data);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.email);
  const filterdUers = data.filter((dataUser) => dataUser.email === user.email);
  console.log(filterdUers);
  put(filterdUers[0]._id);
}
