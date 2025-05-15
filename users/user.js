function searchUsers() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const table = document.getElementById('userTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let match = false;
        for (let j = 0; j < cells.length - 1; j++) {
            if (cells[j].innerText.toLowerCase().includes(input)) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? '' : 'none';
    }
}

function searchTableContent() {
    const input = document.getElementById('tableSearchInput').value.toLowerCase();
    const table = document.getElementById('userTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let match = false;
        for (let j = 0; j < cells.length - 1; j++) {
            if (cells[j].innerText.toLowerCase().includes(input)) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? '' : 'none';
    }
}

function filterUsers(filter) {
    const table = document.getElementById('userTable');
    const rows = table.getElementsByTagName('tr');
    const tabs = document.getElementsByClassName('tab');

    for (let tab of tabs) {
        tab.classList.remove('active');
    }
    event.target.classList.add('active');

    for (let i = 1; i < rows.length; i++) {
        const statusCell = rows[i].getElementsByTagName('td')[5];
        const status = statusCell.innerText.trim();

        if (filter === 'all') {
            rows[i].style.display = '';
        } else if (filter === 'active' && status === 'Hoạt động') {
            rows[i].style.display = '';
        } else if (filter === 'blocked' && status === 'Khóa') {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

const userData = {
    "USR001": {
        name: "Mai Quỳnh",
        email: "maiquynh@gmail.com",
        phone: "0901234567",
        regDate: "01/12/2023",
        status: "Hoạt động",
        orders: [
            { id: "SGN0120", product: "HW7001", date: "01/12/2024", value: "300.000 vnđ", status: "Đã giao" },
            { id: "SGN0121", product: "BBC010", date: "14/12/2024", value: "460.000 vnđ", status: "Đã giao" }
        ]
    },
    "USR002": {
        name: "Minh Hiếu",
        email: "minhhieu@gmail.com",
        phone: "0912345678",
        regDate: "05/12/2023",
        status: "Hoạt động",
        orders: [
            { id: "DAD0012", product: "MGT007", date: "05/12/2024", value: "400.000 vnđ", status: "Đã giao" }
        ]
    },
    "USR003": {
        name: "Hải Đăng",
        email: "haidang@gmail.com",
        phone: "0923456789",
        regDate: "13/12/2023",
        status: "Khóa",
        orders: [
            { id: "HAN0051", product: "LBB021", date: "13/12/2024", value: "1.200.000 vnđ", status: "Đã hủy" }
        ]
    },
    "USR004": {
        name: "Mỹ Hoà",
        email: "myhoa@gmail.com",
        phone: "0934567890",
        regDate: "14/12/2023",
        status: "Hoạt động",
        orders: [
            { id: "SGN0122", product: "BBT709", date: "20/12/2024", value: "230.000 vnđ", status: "Đã giao" }
        ]
    }
};

function showDetails(userId) {
    const modal = document.getElementById('userModal');
    const user = userData[userId];

    document.getElementById('modalUserId').innerText = userId;
    document.getElementById('modalUserName').innerText = user.name;
    document.getElementById('modalUserEmail').innerText = user.email;
    document.getElementById('modalUserPhone').innerText = user.phone;
    document.getElementById('modalUserRegDate').innerText = user.regDate;
    document.getElementById('modalUserStatus').innerText = user.status;

    const orderHistoryBody = document.getElementById('orderHistoryBody');
    orderHistoryBody.innerHTML = '';
    user.orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.product}</td>
            <td>${order.date}</td>
            <td>${order.value}</td>
            <td>${order.status}</td>
        `;
        orderHistoryBody.appendChild(row);
    });

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('userModal');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('userModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};