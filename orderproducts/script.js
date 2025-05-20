function proceedToPayment() {
  window.location.href = "payment.html";
}

function completePayment() {
  var paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
  var bankDetails = document.getElementById("bank-details");
  var successSection = document.getElementById("success-section");
  var paymentSection = document.getElementById("payment-section");

  if (paymentMethod === "bank") {
    var cardNumber = document.getElementById("card-number").value;
    if (!cardNumber) {
      alert("Vui lòng nhập số thẻ!");
      return;
    }
    bankDetails.style.display = "none"; // Hide bank details after validation (for demo)
  }

  paymentSection.style.display = "none";
  successSection.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function() {
  var paymentOptions = document.getElementsByName("payment-method");
  var bankDetails = document.getElementById("bank-details");

  var i = 0;
  while (i < paymentOptions.length) {
    paymentOptions[i].addEventListener("change", function() {
      if (this.value === "bank") {
        bankDetails.style.display = "block";
      } else {
        bankDetails.style.display = "none";
      }
    });
    i++;
  }
});