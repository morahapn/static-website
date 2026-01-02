// ---------- CART (localStorage) ----------
let cart = JSON.parse(localStorage.getItem("cart")) || {};

function addToCart(item, price) {
  if (cart[item]) {
    cart[item].quantity++;
  } else {
    cart[item] = { price: price, quantity: 1 };
  }
  saveCart();
  displayCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
  const cartList = document.getElementById("cartItems");
  cartList.innerHTML = "";
  let total = 0;

  if (Object.keys(cart).length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    for (let item in cart) {
      let itemTotal = cart[item].price * cart[item].quantity;
      total += itemTotal;
      cartList.innerHTML += `<li>${item} x ${cart[item].quantity} = R${itemTotal}</li>`;
    }
  }

  document.getElementById("totalPrice").textContent = `Total: R${total}`;
}

// ---------- CLEAR CART ----------
function clearCart() {
  localStorage.removeItem("cart");
  cart = {};
  deleteCookie("username");
  deleteCookie("currency");
  displayCart();
  document.getElementById("greeting").textContent = "Welcome!";
}

// ---------- FONT PREFERENCE (sessionStorage) ----------
const fontSelect = document.getElementById("fontSelect");

fontSelect.addEventListener("change", () => {
  sessionStorage.setItem("font", fontSelect.value);
  document.body.style.fontFamily = fontSelect.value;
});

function loadFontPreference() {
  const savedFont = sessionStorage.getItem("font");
  if (savedFont) {
    document.body.style.fontFamily = savedFont;
    fontSelect.value = savedFont;
  }
}

// ---------- COOKIES ----------
function saveUser() {
  const username = document.getElementById("usernameInput").value;
  if (username) {
    setCookie("username", username, 7);
    greetUser();
  }
}

function greetUser() {
  const user = getCookie("username");
  if (user) {
    document.getElementById("greeting").textContent = `Welcome back, ${user}!`;
  }
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 86400000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let c of cookies) {
    let [key, value] = c.split("=");
    if (key === name) return value;
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// ---------- CACHE INDICATOR ----------
function showCacheInfo() {
  document.getElementById("cacheInfo").textContent =
    "✔ Product images and styles are loaded from browser cache for faster performance.";
}

// ---------- INIT ----------
window.onload = function () {
  displayCart();
  loadFontPreference();
  greetUser();
  showCacheInfo();
};
