// import axios from "axios";
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

export const logIn = async function (val) {
  try {
    const data = await fetch("http://127.0.0.1:2000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    });
    const res = await data.json();
    // if ()
    console.log(data, res);
    if (res.status === "success") {
      showAlert("succesfuly", "you have been logged in");
      window.setTimeout(() => {
        location.assign("/");
      }, 5000);
    } else {
      showAlert("error", res.message);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "its not successful");
  }
};
// export default logIn;
export const logOut = async () => {
  try {
    const data = await fetch("http://127.0.0.1:2000/api/v1/user/logout");
    const res = await data.json();
    if (res.status === "success") {
      showAlert("success", "You have logged out successfully");
      window.setTimeout(() => {
        location.assign("/login");
      }, 5000);
    }
  } catch (err) {
    console.log(err);
  }
};
