const orders = [
  {
    id: "OB9123456",
    customer: "Quang Thái",
    products: [
      {
        name: "CRYBABY Crying Again Series-Vinyl Face Plush",
        price: 460000,
        image: "product1.png"
      }
    ],
    date: "19/01/2025",
    status: "delivered",
    phone: "Vĩnh Nghi, Huế, Thừa Thiên Huế",
    address: "14 Lê Lợi",
    paymentMethod: "Thanh toán khi nhận hàng",
    shippingFee: 30000,
    total: 490000
  }
];

let currentPage = 1;
const ordersPerPage = 5;
let currentFilter = "delivered";
let ratingValue = 0;

function displayOrders() {
  const tableBody = document.getElementById("order-table-body");
  tableBody.innerHTML = "";
  
  let filteredOrders = orders.filter(order => 
    currentFilter === "all" || order.status === currentFilter
  );
  
  const searchQuery = document.getElementById("order-search").value.toLowerCase();
  if (searchQuery) {
    filteredOrders = filteredOrders.filter(order => 
      order.id.toLowerCase().includes(searchQuery) ||
      order.customer.toLowerCase().includes(searchQuery)
    );
  }
  
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
  
  let i = 0;
  while (i < paginatedOrders.length) {
    const order = paginatedOrders[i];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.products.map(p => p.name).join(", ")}</td>
      <td>${order.date}</td>
      <td><span class="status status-${order.status}">${getStatusText(order.status)}</span></td>
      <td>${order.total.toLocaleString()}đ</td>
      <td class="action-buttons">
        <button class="btn btn-view" onclick="viewOrder('${order.id}')">Xem</button>
        ${order.status === "delivered" ? `<button class="btn btn-edit" onclick="openReviewModal('${order.id}')">Đánh giá</button>` : ""}
      </td>
    `;
    tableBody.appendChild(row);
    i++;
  }
  
  updatePagination(filteredOrders.length);
}

function getStatusText(status) {
  if (status === "pending") return "Chờ xác nhận";
  if (status === "confirmed") return "Đã xác nhận";
  if (status === "shipping") return "Chờ giao";
  if (status === "delivered") return "Đã giao";
  if (status === "cancelled") return "Đã hủy";
  return "";
}

function updatePagination(totalOrders) {
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  
  let page = 1;
  while (page <= totalPages) {
    const button = document.createElement("button");
    button.textContent = page;
    button.onclick = () => changePage(page);
    if (page === currentPage) button.classList.add("active");
    pagination.appendChild(button);
    page++;
  }
  
  if (totalPages > 1) {
    const nextButton = document.createElement("button");
    nextButton.textContent = ">>";
    nextButton.onclick = () => changePage(currentPage + 1);
    pagination.appendChild(nextButton);
  }
}

function changePage(page) {
  const totalPages = Math.ceil(orders.filter(order => 
    currentFilter === "all" || order.status === currentFilter
  ).length / ordersPerPage);
  
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    displayOrders();
  }
}

function searchOrders() {
  currentPage = 1;
  displayOrders();
}

function viewOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    document.getElementById("modal-order-id").textContent = order.id;
    document.getElementById("modal-customer-name").textContent = order.customer;
    document.getElementById("modal-phone").textContent = order.phone;
    document.getElementById("modal-address").textContent = order.address;
    document.getElementById("modal-order-date").textContent = order.date;
    document.getElementById("modal-payment-method").textContent = order.paymentMethod;
    document.getElementById("modal-status").textContent = getStatusText(order.status);
    
    const productList = document.getElementById("modal-product-list");
    productList.innerHTML = "";
    order.products.forEach(product => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");
      productItem.innerHTML = `
        <img class="product-img" src="${product.image}" alt="${product.name}">
        <div class="product-details">
          <div>${product.name}</div>
          <div>${product.price.toLocaleString()}đ</div>
        </div>
      `;
      productList.appendChild(productItem);
    });
    
    document.getElementById("modal-shipping-fee").textContent = order.shippingFee.toLocaleString() + "đ";
    document.getElementById("modal-total").textContent = order.total.toLocaleString() + "đ";
    
    document.getElementById("order-details-modal").style.display = "block";
  }
}

function openReviewModal(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    const product = order.products[0];
    document.getElementById("review-product-img").src = product.image;
    document.getElementById("review-product-name").textContent = product.name;
    document.getElementById("review-product-price").textContent = product.price.toLocaleString() + "đ";
    
    const stars = document.querySelectorAll(".star");
    stars.forEach(star => {
      star.style.color = "#ccc";
      star.onclick = () => {
        ratingValue = parseInt(star.getAttribute("data-value"));
        stars.forEach(s => {
          if (parseInt(s.getAttribute("data-value")) <= ratingValue) {
            s.style.color = "#ffd700";
          } else {
            s.style.color = "#ccc";
          }
        });
      };
    });
    
    document.getElementById("review-comment").value = "";
    document.getElementById("review-modal").style.display = "block";
  }
}

function submitReview() {
  const comment = document.getElementById("review-comment").value;
  if (ratingValue === 0) {
    alert("Vui lòng chọn số sao!");
    return;
  }
  if (!comment) {
    alert("Vui lòng nhập nhận xét!");
    return;
  }
  
  alert("Cảm ơn bạn đã đánh giá! Điểm: " + ratingValue + " sao\nNhận xét: " + comment);
  closeModal("review-modal");
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

document.querySelectorAll(".filter-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentFilter = tab.getAttribute("data-status");
    currentPage = 1;
    displayOrders();
  });
});

window.onload = displayOrders;