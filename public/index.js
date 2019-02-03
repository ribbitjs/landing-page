const submitBtn = document.querySelector("#submitBtn");
const emailForm = document.getElementById("emailForm");
const responseBox = document.getElementById("response-container");
const errorText = document.getElementById("error-text");
const successText = document.getElementById("success-text");

emailForm.addEventListener("submit", e => {
  e.preventDefault();
  errorText.innerHTML = "";
  successText.innerHTML = "";
  const email = e.target[0].value;
  const isValid = ValidateEmail(email);

  if (isValid) {
    submitBtn.innerHTML = "Sent!";
    sendPost(email);
    e.target[0].value = "";
  }
});

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    alert("You have entered an invalid email address!");
    return false;
  }
}

function sendPost(email) {
  const postObj = {
    email
  };
  fetch("http://localhost:3000/signup", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj)
  })
    .then(res => {
      if (res.status === 400) {
        errorText.innerHTML = "Error :(";
      } else {
        successText.innerHTML = "Success! :)";
      }
    })
    .catch(res => console.log(res));
}
