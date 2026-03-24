import { alertMessage } from "../js/utils.mjs";

const btn = document.querySelector('#checkoutSubmit');

if (btn) {
    btn.addEventListener('click', handleCheckout);
}

async function handleCheckout(e) {
    e.preventDefault();

    const form = document.querySelector('#checkoutForm');

    const isValid = form.checkValidity();
    form.reportValidity();

    if (!isValid) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        console.log("Order Data:", data);

        // ✅ success
        localStorage.removeItem('so-cart');

        window.location.href = '/checkout/checkoutsuccess.html';

    } catch (err) {
        console.error(err);

        alertMessage(err.message || "Something went wrong");
    }
}