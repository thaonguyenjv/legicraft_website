// DOM Elements
const modal = document.getElementById("productModal");
const form = document.getElementById("productForm");
const modalTitle = document.getElementById("modalTitle");
const editingRowIndex = document.getElementById("editingRowIndex");

const btnAddProduct = document.getElementById("btnAddProduct");
const btnCloseModal = document.querySelector(".close");
const btnCancel = document.getElementById("cancelBtn");

document.querySelectorAll(".search input").forEach(input => {
  input.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const rows = document.querySelectorAll("#productTable tr");

    rows.forEach(row => {
      const name = row.children[1].textContent.toLowerCase();
      row.style.display = name.includes(keyword) ? "" : "none";
    });
  });
});
// Mở modal thêm mới
btnAddProduct.addEventListener("click", () => {
  form.reset();
  editingRowIndex.value = "";
  modalTitle.textContent = "Thêm sản phẩm";
  modal.style.display = "block";
});

// Đóng modal
btnCloseModal.addEventListener("click", () => modal.style.display = "none");
btnCancel.addEventListener("click", () => modal.style.display = "none");

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Submit form: Thêm hoặc Sửa
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("productId").value.trim();
  const name = document.getElementById("productName").value.trim();
  const category = document.getElementById("productCategory").value.trim();
  const quantity = document.getElementById("productQuantity").value;
  const price = document.getElementById("productPrice").value;
  const index = editingRowIndex.value;

  if (!id || !name || !category || !quantity || !price) {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  const table = document.getElementById("productTable");

  if (index === "") {
    // Thêm sản phẩm mới
    const row = table.insertRow(-1);
    row.innerHTML = `
      <td>${id}</td>
      <td>${name}</td>
      <td>${category}</td>
      <td>${quantity}</td>
      <td>${price}</td>
      <td>
        <button class="action-btn btn-edit" onclick="editProduct(this)">Sửa</button>
        <button class="action-btn btn-delete" onclick="deleteProduct(this)">Xóa</button>
      </td>
    `;
  } else {
    // Sửa sản phẩm cũ
    const row = table.rows[index];
    row.cells[0].textContent = id;
    row.cells[1].textContent = name;
    row.cells[2].textContent = category;
    row.cells[3].textContent = quantity;
    row.cells[4].textContent = price;
  }

  modal.style.display = "none";
});

// Sửa sản phẩm
function editProduct(button) {
  const row = button.closest("tr");
  const index = row.rowIndex;

  document.getElementById("productId").value = row.cells[0].textContent;
  document.getElementById("productName").value = row.cells[1].textContent;
  document.getElementById("productCategory").value = row.cells[2].textContent;
  document.getElementById("productQuantity").value = row.cells[3].textContent;
  document.getElementById("productPrice").value = row.cells[4].textContent;

  editingRowIndex.value = index;
  modalTitle.textContent = "Sửa sản phẩm";
  modal.style.display = "block";
}

// Xóa sản phẩm
function deleteProduct(button) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
    const row = button.closest("tr");
    row.remove();
    alert("Xóa sản phẩm thành công.");
  }
}
