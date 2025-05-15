// Dữ liệu đơn hàng
const orders = [
  {
    id: "SGN0120",
    customerName: "Mai Quỳnh",
    phone: "0901234567",
    email: "maiquynh@gmail.com",
    date: "01/12/2024",
    productCode: "HWH01",
    productName: "Labubu version 1",
    status: "delivered",
    value: "300.000 vnđ",
    address: "123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
    quantity: 1,
    unitPrice: "300.000 vnđ",
    shipping: "0 vnđ"
  },
  {
    id: "DAD0012",
    customerName: "Minh Hiếu",
    phone: "0912345678",
    email: "minhhieu@gmail.com",
    date: "05/12/2024",
    productCode: "MGT07",
    productName: "Baby Cry version 2",
    status: "delivered",
    value: "400.000 vnđ",
    address: "45 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    paymentMethod: "Chuyển khoản ngân hàng",
    quantity: 1,
    unitPrice: "400.000 vnđ",
    shipping: "0 vnđ"
  },
  {
    id: "HAN0051",
    customerName: "Hải Đăng",
    phone: "0978123456",
    email: "haidang@gmail.com",
    date: "13/12/2024",
    productCode: "LBB02",
    productName: "Baby Cry version 3",
    status: "cancelled",
    value: "1.200.000 vnđ",
    address: "78 Lê Thanh Nghị, Hai Bà Trưng, Hà Nội",
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
    quantity: 1,
    unitPrice: "1.200.000 vnđ",
    shipping: "0 vnđ",
    cancelReason: "Khách hàng đổi ý"
  },
  {
    id: "SGN0121",
    customerName: "Mỹ Hòa",
    phone: "0909456789",
    email: "myhoa@gmail.com",
    date: "14/12/2024",
    productCode: "BBC10",
    productName: "Baby Cry version 4",
    status: "delivered",
    value: "460.000 vnđ",
    address: "56 Võ Văn Tần, Quận 3, TP. Hồ Chí Minh",
    paymentMethod: "Thanh toán online",
    quantity: 1,
    unitPrice: "460.000 vnđ",
    shipping: "0 vnđ"
  },
  {
    id: "SGN0122",
    customerName: "Diệu Huyền",
    phone: "0976543210",
    email: "dieuhuyen@gmail.com",
    date: "20/12/2024",
    productCode: "BBT09",
    productName: "Baby Cry version 5",
    status: "delivered",
    value: "230.000 vnđ",
    address: "28 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh",
    paymentMethod: "Ví điện tử MoMo",
    quantity: 1,
    unitPrice: "230.000 vnđ",
    shipping: "0 vnđ"
  },
  {
    id: "HUI0010",
    customerName: "Quang Thái",
    phone: "0932145678",
    email: "quangthai@gmail.com",
    date: "19/01/2025",
    productCode: "TMW03",
    productName: "Baby Cry version 6",
    status: "pending",
    value: "550.000 vnđ",
    address: "105 Nguyễn Huệ, Huế, Thừa Thiên Huế",
    paymentMethod: "Chuyển khoản ngân hàng",
    quantity: 1,
    unitPrice: "550.000 vnđ",
    shipping: "0 vnđ"
  },
  {
    id: "DLI0050",
    customerName: "Trang Phạm",
    phone: "0945678912",
    email: "trangpham@gmail.com",
    date: "20/03/2025",
    productCode: "HWH05",
    productName: "Baby Cry version 7",
    status: "shipping",
    value: "300.000 vnđ",
    address: "23 Trần Phú, TP. Đà Lạt, Lâm Đồng",
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
    quantity: 1,
    unitPrice: "300.000 vnđ",
    shipping: "0 vnđ"
  }
];

// Chuyển đổi trạng thái từ tiếng Anh sang tiếng Việt
function getStatusText(status) {
  const statusMap = {
    'pending': 'Chờ xác nhận',
    'confirmed': 'Đã xác nhận',
    'shipping': 'Chờ giao',
    'delivered': 'Đã giao',
    'cancelled': 'Đã hủy'
  };
  return statusMap[status] || status;
}

// Lấy class tương ứng với trạng thái
function getStatusClass(status) {
  const classMap = {
    'pending': 'status-pending',
    'confirmed': 'status-confirmed',
    'shipping': 'status-shipping',
    'delivered': 'status-delivered',
    'cancelled': 'status-cancelled'
  };
  return classMap[status] || '';
}

// Hiển thị danh sách đơn hàng
function displayOrders(filteredOrders = orders) {
  const tableBody = document.querySelector('.order-table tbody');
  tableBody.innerHTML = '';

  filteredOrders.forEach(order => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customerName}</td>
      <td>${order.productCode}</td>
      <td>${order.date}</td>
      <td><span class="status ${getStatusClass(order.status)}">${getStatusText(order.status)}</span></td>
      <td>${order.value}</td>
      <td class="action-buttons">
        <button class="btn btn-view" onclick="openOrderDetails('${order.id}')"><i class="fas fa-eye"></i></button>
        <button class="btn btn-edit" onclick="openEditOrder('${order.id}')"><i class="fas fa-edit"></i></button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Tìm kiếm đơn hàng theo mã
function searchOrder() {
  const searchInput = document.querySelector('.search-bar input').value.trim().toUpperCase();
  if (searchInput === '') {
    displayOrders();
    return;
  }

  const filteredOrders = orders.filter(order => 
    order.id.toUpperCase().includes(searchInput)
  );

  displayOrders(filteredOrders);
}

// Lọc đơn hàng theo trạng thái
function filterOrdersByStatus(status) {
  if (status === 'all') {
    displayOrders();
    return;
  }

  const filteredOrders = orders.filter(order => 
    order.status === status
  );

  displayOrders(filteredOrders);
}

// Sắp xếp đơn hàng
let sortDirection = {};
function sortOrders(column) {
  sortDirection[column] = !sortDirection[column]; // Toggle direction
  const direction = sortDirection[column] ? 1 : -1;

  const sortedOrders = [...orders].sort((a, b) => {
    let valA = a[column];
    let valB = b[column];

    if (column === 'value') {
      valA = parseFloat(valA.replace(/[^0-9.-]+/g, ''));
      valB = parseFloat(valB.replace(/[^0-9.-]+/g, ''));
    } else if (column === 'date') {
      valA = new Date(valA.split('/').reverse().join('-'));
      valB = new Date(valB.split('/').reverse().join('-'));
    }

    if (valA < valB) return -1 * direction;
    if (valA > valB) return 1 * direction;
    return 0;
  });

  displayOrders(sortedOrders);
}

// Hiển thị chi tiết đơn hàng
function openOrderDetails(orderId) {
  const order = orders.find(order => order.id === orderId);
  if (!order) return;

  // Cập nhật thông tin trong modal
  document.getElementById('orderIdDisplay').textContent = order.id;

  // Thông tin khách hàng
  document.querySelector('.modal-body .order-info div:nth-child(1) .info-group:nth-child(1) div:nth-child(2)').textContent = order.customerName;
  document.querySelector('.modal-body .order-info div:nth-child(1) .info-group:nth-child(2) div:nth-child(2)').textContent = order.phone;
  document.querySelector('.modal-body .order-info div:nth-child(1) .info-group:nth-child(3) div:nth-child(2)').textContent = order.address;
  
  // Thông tin đơn hàng
  document.querySelector('.modal-body .order-info div:nth-child(2) .info-group:nth-child(1) div:nth-child(2)').textContent = order.date;
  document.querySelector('.modal-body .order-info div:nth-child(2) .info-group:nth-child(2) div:nth-child(2)').textContent = order.paymentMethod;
  document.querySelector('.modal-body .order-info div:nth-child(2) .info-group:nth-child(3) div:nth-child(2)').innerHTML = `<span class="status ${getStatusClass(order.status)}">${getStatusText(order.status)}</span>`;
  

  

  // Thông tin sản phẩm
  document.querySelector('.product-item .product-details').innerHTML = `
    <h4>${order.productCode} - ${order.productName}</h4>
    <div>Số lượng: ${order.quantity}</div>
    <div>Đơn giá: ${order.unitPrice}</div>
  `;

  // Tổng cộng
  document.querySelector('.modal-body div[style="text-align: right; margin-top: 20px;"] div[style="margin-bottom: 5px;"]').textContent = `Phí vận chuyển: ${order.shipping}`;
  document.querySelector('.modal-body div[style="text-align: right; margin-top: 20px;"] div[style="font-size: 1.2em; font-weight: bold;"]').textContent = `Tổng cộng: ${order.value}`;

  // Cập nhật giá trị select box
  document.getElementById('statusUpdate').value = order.status;

  // Hiển thị modal
  document.getElementById('orderDetailsModal').style.display = 'block';
}

// Cập nhật trạng thái đơn hàng
function updateOrderStatus() {
  const orderId = document.getElementById('orderIdDisplay').textContent;
  const newStatus = document.getElementById('statusUpdate').value;

  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].status = newStatus;
    displayOrders();
    openOrderDetails(orderId); // Refresh modal
    alert('Cập nhật trạng thái đơn hàng thành công!');
  }
}

// Mở form chỉnh sửa đơn hàng
function openEditOrder(orderId) {
  openOrderDetails(orderId);
  alert('Chức năng chỉnh sửa đơn hàng sẽ được phát triển trong phiên bản tiếp theo!');
}

// Sự kiện khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
  // Hiển thị danh sách đơn hàng ban đầu
  displayOrders();

  // Thêm sự kiện tìm kiếm
  const searchButton = document.querySelector('.search-bar button');
  searchButton.addEventListener('click', searchOrder);

  const searchInput = document.querySelector('.search-bar input');
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchOrder();
    }
  });

  // Thêm sự kiện lọc theo tab
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const tabText = this.textContent.trim();
      let status = 'all';
      if (tabText === 'Chờ xác nhận') status = 'pending';
      else if (tabText === 'Chờ giao hàng') status = 'shipping';
      else if (tabText === 'Đã giao') status = 'delivered';
      else if (tabText === 'Đã hủy') status = 'cancelled';

      filterOrdersByStatus(status);
    });
  });

  // Thêm sự kiện sắp xếp
  const sortableHeaders = document.querySelectorAll('.order-table th');
  sortableHeaders.forEach((header, index) => {
    if (header.querySelector('.sort-icon')) {
      header.addEventListener('click', () => {
        const columnMap = ['id', 'customerName', null, 'date', null, 'value'];
        const column = columnMap[index];
        if (column) sortOrders(column);
      });
    }
  });

  // Thêm sự kiện cập nhật trạng thái
  document.querySelector('.btn-update').addEventListener('click', updateOrderStatus);
});