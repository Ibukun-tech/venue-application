import { logIn, logOut } from "./login.js";
import { upDateFoms } from "./updateSetting.js";
import { booking } from "./stripe.js";
// logIn();
const LogOut = document.querySelector(".nav__el-logout");
// if ()
const bookingTour = document.getElementById("booking--tour");
if (bookingTour) {
  bookingTour.addEventListener("click", function (e) {
    booking(e.target.dataset.venueId);
  });
}
export const hideAlert = () => {
  const error = document.querySelector(".alert");
  if (error) error.parentElement.removeChild(error);
  console.log(error);
};
export const showAlert = (type, msg) => {
  hideAlert();
  const markUp = `<div class=alert alert--${type}>${msg}</div>`;
  console.log(
    document.querySelector(".body"),
    document.querySelector(".header")
  );
  document.querySelector(".header").insertAdjacentHTML("afterbegin", markUp);
  window.setTimeout(hideAlert, 5000);
};
const form = document.querySelector(".form");
const logout = document.querySelector(".nav__el-logout");
const updateForm = document.querySelector(".form-user-data");
const updatePasswordForm = document.querySelector(".form-user-settings");
console.log(form);
if (updatePasswordForm) {
  updatePasswordForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const passwordCurrent = document.getElementById("password-current");
    const passwordNew = document.getElementById("password");
    const passwordConfirm = document.getElementById("password-confirm");
    upDateFoms(
      {
        passwordCurrent: passwordCurrent.value,
        passwordNew: passwordNew.value,
        passwordConfirm: passwordConfirm.value,
      },
      "password"
    );
  });
  passwordConfirm.value = "";
  passwordNew.value = "";
  passwordCurrent.value = "";
}
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    logIn({ email, password });
    console.log(email, password);
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  });
}
console.log(LogOut);
if (LogOut) {
  LogOut.addEventListener("click", function (e) {
    logOut();
  });
}
if (updateForm) {
  updateForm.addEventListener("submit", function () {
    const upLoad = new FormData();
    upLoad.append("name", document.getElementById("name").value);
    upLoad.append("email", document.getElementById("email").value);
    upLoad.append("photo", document.getElementById("photo").files[0]);
    upDateFoms(upLoad, "");
  });
}
