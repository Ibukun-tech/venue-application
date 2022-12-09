export const hideAlert = () => {
  const error = document.querySelector(".alert");
  if (error) error.parentElement.removeChild(error);
};
export const showAlert = (type, msg) => {
  hideAlert();
  const markUp = `<div class=alert alert--${type}>${msg}</div>`;

  document.querySelector(".header").insertAdjacentHTML("afterbegin", markUp);
  window.setTimeout(hideAlert, 5000);
};
export const upDateFoms = async (val, url) => {
  try {
    const address =
      url === "password"
        ? "http://127.0.0.1:2000/api/v1/user/updatePassword"
        : "http://127.0.0.1:2000/api/v1/user/updateUser";
    const data = await fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(val),
    });
    const res = await data.json();
    if (res.status === "success") {
      showAlert("success", "Data has been updated succesfully");
    }
  } catch (err) {
    showAlert("error", "network failure");
  }
};
