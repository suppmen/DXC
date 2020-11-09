"use strict";
// import * as config from "./modules/config";

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

const form = document.querySelector("form");
console.log(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("in ubmit", form.elements);
  form.elements.submit.disabled = true;
  console.log(form.elements.fullname.value);
  const myData = {
    full_name: form.elements.fullname.value,
    email: form.elements.email.value,
    company: form.elements.company.value,
  };

  post(myData);
});
