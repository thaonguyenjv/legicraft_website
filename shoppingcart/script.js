function formatPrice(num) {
  return Number(num).toLocaleString("vi-VN") + " ₫";
}

function updateTotal() {
  let total = 0;
  document.querySelectorAll(".cart-item").forEach(item => {
    const qty = parseInt(item.querySelector(".qty").textContent);
    const unitPrice = parseInt(item.dataset.price);
    const subtotal = qty * unitPrice;
    item.querySelector(".price").textContent = formatPrice(subtotal); // Định dạng giá
    total += subtotal;
  });
  document.querySelector(".total").textContent = formatPrice(total);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

function setupQtyButtons() {
  document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const item = e.target.closest(".cart-item");
      const qtySpan = item.querySelector(".qty");
      let qty = parseInt(qtySpan.textContent);

      if (e.target.classList.contains("plus")) {
        qty++;
      } else if (e.target.classList.contains("minus") && qty > 1) {
        qty--;
      }

      qtySpan.textContent = qty;
      updateTotal();
    });
  });
}

function setupRemoveButtons() {
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const item = e.target.closest(".cart-item");
      const name = item.querySelector("h4").textContent;
      item.remove();
      updateTotal();
      showToast(`Đã xoá ${name} thành công`);
    });
  });
}

function setupRemoveAllButton() {
  const removeAllBtn = document.querySelector(".remove-all");
  if (removeAllBtn) {
    removeAllBtn.addEventListener("click", () => {
      document.querySelectorAll(".cart-item").forEach(item => item.remove());
      updateTotal();
      showToast("Đã xoá tất cả sản phẩm");
    });
  }
}

// Đảm bảo tất cả script chạy sau khi DOM đã tải xong
document.addEventListener("DOMContentLoaded", () => {
  setupQtyButtons();
  setupRemoveButtons();
  setupRemoveAllButton();
  updateTotal();
});
