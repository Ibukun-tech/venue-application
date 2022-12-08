var $knI9B$axios = require("axios");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

const $70af9284e599e604$export$dcb3afa56f3b80bd = async function (val) {
  await (0, $parcel$interopDefault($knI9B$axios))();
  console.log(val);
}; // export default logIn;

// logIn();
const $d0f7ce18c37ad6f6$var$form = document.querySelector(".form");
if ($d0f7ce18c37ad6f6$var$form)
  $d0f7ce18c37ad6f6$var$form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, $70af9284e599e604$export$dcb3afa56f3b80bd)({
      email: email,
      password: password,
    });
    console.log(email, password);
  });
console.log("welcome home");

//# sourceMappingURL=app.js.map
