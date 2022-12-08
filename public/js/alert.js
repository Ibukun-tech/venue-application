export const hideAlert = () => {
  const error = document.querySelector(".error");
  if (error) error.parentElement.removeChild(error);
};
export const showAlert = (type, msg) => {
  hideAlert();
  const markUp = `<div class=alert alert--${type}>${msg}</div>`;
  console.log(
    document.querySelector(".body"),
    document.querySelector(".header")
  );
  document.querySelector(".header").insertAdjacentElement("afterbegin", markUp);
  window.setTimeout(hideAlert, 5000);
};
