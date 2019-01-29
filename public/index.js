const emailForm = document.getElementById("emailForm");
emailForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = e.target[0].value;
  const isValid = ValidateEmail(email);

  if (isValid) {
    console.log("valid email");
  }
});

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}
