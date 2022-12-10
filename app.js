function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "hideAlert", () => $d0f7ce18c37ad6f6$export$516836c6a9dfc573);
$parcel$export(module.exports, "showAlert", () => $d0f7ce18c37ad6f6$export$de026b00723010c1);
// import axios from "axios";
const $70af9284e599e604$export$516836c6a9dfc573 = ()=>{
    const error = document.querySelector(".alert");
    if (error) error.parentElement.removeChild(error);
};
const $70af9284e599e604$export$de026b00723010c1 = (type, msg)=>{
    $70af9284e599e604$export$516836c6a9dfc573();
    const markUp = `<div class=alert alert--${type}>${msg}</div>`;
    document.querySelector(".header").insertAdjacentHTML("afterbegin", markUp);
    window.setTimeout($70af9284e599e604$export$516836c6a9dfc573, 5000);
};
const $70af9284e599e604$export$dcb3afa56f3b80bd = async function(val) {
    try {
        const data = await fetch("http://127.0.0.1:2000/api/v1/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(val)
        });
        const res = await data.json();
        // if ()
        if (res.status === "success") {
            $70af9284e599e604$export$de026b00723010c1("succesfuly", "you have been logged in");
            window.setTimeout(()=>{
                location.assign("/");
            }, 5000);
        } else $70af9284e599e604$export$de026b00723010c1("error", res.message);
    } catch (err) {
        $70af9284e599e604$export$de026b00723010c1("error", "its not successful");
    }
};
const $70af9284e599e604$export$464881f0a7cf0212 = async ()=>{
    try {
        const data = await fetch("http://127.0.0.1:2000/api/v1/user/logout");
        const res = await data.json();
        if (res.status === "success") {
            $70af9284e599e604$export$de026b00723010c1("success", "You have logged out successfully");
            window.setTimeout(()=>{
                location.assign("/login");
            }, 5000);
        }
    } catch (err) {}
};


const $3fffefddab1a405a$export$516836c6a9dfc573 = ()=>{
    const error = document.querySelector(".alert");
    if (error) error.parentElement.removeChild(error);
};
const $3fffefddab1a405a$export$de026b00723010c1 = (type, msg)=>{
    $3fffefddab1a405a$export$516836c6a9dfc573();
    const markUp = `<div class=alert alert--${type}>${msg}</div>`;
    document.querySelector(".header").insertAdjacentHTML("afterbegin", markUp);
    window.setTimeout($3fffefddab1a405a$export$516836c6a9dfc573, 5000);
};
const $3fffefddab1a405a$export$938883bc05c38657 = async (val, url)=>{
    try {
        const address = url === "password" ? "http://127.0.0.1:2000/api/v1/user/updatePassword" : "http://127.0.0.1:2000/api/v1/user/updateUser";
        const data = await fetch(address, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(val)
        });
        const res = await data.json();
        if (res.status === "success") $3fffefddab1a405a$export$de026b00723010c1("success", "Data has been updated succesfully");
    } catch (err) {
        $3fffefddab1a405a$export$de026b00723010c1("error", "network failure");
    }
};


const $6710bca62beba915$var$pubLicKey = "pk_test_51MAk3lBjyYuT7Rfw1XOPlsvqLnbmvGXWn43pRNFmaa1GKyZEAT9PTtvxmtkngbg1040oSZ8oXgKTEpL2eGP3ysQp00yccipvFx";
const $6710bca62beba915$var$stripe = Stripe($6710bca62beba915$var$pubLicKey);
const $6710bca62beba915$export$8252328d63b22f49 = async (id)=>{
    try {
        const session = await axios({
            method: "POST",
            data: {
                id: id
            },
            url: `http://127.0.0.1:2000/api/v1/bookings/create-checkout-session`
        });
        await $6710bca62beba915$var$stripe.directToCheckout({
            session: session.data.session.id
        });
    // window.location.replace(session.data.session.url);
    } catch (err) {}
};


// logIn();
const $d0f7ce18c37ad6f6$var$LogOut = document.querySelector(".nav__el-logout");
// if ()
const $d0f7ce18c37ad6f6$var$bookingTour = document.getElementById("booking--tour");
if ($d0f7ce18c37ad6f6$var$bookingTour) $d0f7ce18c37ad6f6$var$bookingTour.addEventListener("click", function(e) {
    (0, $6710bca62beba915$export$8252328d63b22f49)(e.target.dataset.venueId);
});
const $d0f7ce18c37ad6f6$export$516836c6a9dfc573 = ()=>{
    const error = document.querySelector(".alert");
    if (error) error.parentElement.removeChild(error);
};
const $d0f7ce18c37ad6f6$export$de026b00723010c1 = (type, msg)=>{
    $d0f7ce18c37ad6f6$export$516836c6a9dfc573();
    const markUp = `<div class=alert alert--${type}>${msg}</div>`;
    document.querySelector(".header").insertAdjacentHTML("afterbegin", markUp);
    window.setTimeout($d0f7ce18c37ad6f6$export$516836c6a9dfc573, 5000);
};
const $d0f7ce18c37ad6f6$var$form = document.querySelector(".form");
const $d0f7ce18c37ad6f6$var$logout = document.querySelector(".nav__el-logout");
const $d0f7ce18c37ad6f6$var$updateForm = document.querySelector(".form-user-data");
const $d0f7ce18c37ad6f6$var$updatePasswordForm = document.querySelector(".form-user-settings");
if ($d0f7ce18c37ad6f6$var$updatePasswordForm) {
    $d0f7ce18c37ad6f6$var$updatePasswordForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const passwordCurrent1 = document.getElementById("password-current");
        const passwordNew1 = document.getElementById("password");
        const passwordConfirm1 = document.getElementById("password-confirm");
        (0, $3fffefddab1a405a$export$938883bc05c38657)({
            passwordCurrent: passwordCurrent1.value,
            passwordNew: passwordNew1.value,
            passwordConfirm: passwordConfirm1.value
        }, "password");
    });
    passwordConfirm.value = "";
    passwordNew.value = "";
    passwordCurrent.value = "";
}
if ($d0f7ce18c37ad6f6$var$form) $d0f7ce18c37ad6f6$var$form.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, $70af9284e599e604$export$dcb3afa56f3b80bd)({
        email: email,
        password: password
    });
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
});
if ($d0f7ce18c37ad6f6$var$LogOut) $d0f7ce18c37ad6f6$var$LogOut.addEventListener("click", function(e) {
    (0, $70af9284e599e604$export$464881f0a7cf0212)();
});
if ($d0f7ce18c37ad6f6$var$updateForm) $d0f7ce18c37ad6f6$var$updateForm.addEventListener("submit", function() {
    const upLoad = new FormData();
    upLoad.append("name", document.getElementById("name").value);
    upLoad.append("email", document.getElementById("email").value);
    upLoad.append("photo", document.getElementById("photo").files[0]);
    (0, $3fffefddab1a405a$export$938883bc05c38657)(upLoad, "");
});


//# sourceMappingURL=app.js.map
