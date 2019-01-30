const submitBtn = document.querySelector("#submitBtn");
console.log(submitBtn);
const emailForm = document.getElementById("emailForm");
emailForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = e.target[0].value;
  const isValid = ValidateEmail(email);

  if (isValid) {
    console.log("valid email");
    submitBtn.innerHTML = "Sent!";
    postEmail(email);
    console.log("sent post");
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

function postEmail(email) {
  const postObj = {
    email_address: email,
    status: "subscribed"
  };
  fetch("https://us20.api.mailchimp.com/3.0/lists/119c756bcc/members/", {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    user: "anystring: 8c203182f5c7ff0c237075bdf3b9a356-us20",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj)
  })
    .then(res => console.log(res))
    .catch(res => console.log(res));
}
