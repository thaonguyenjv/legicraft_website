function showTab(tab) {
    var revenueContent = document.getElementById("revenueContent");
    var productsContent = document.getElementById("productsContent");
    var tabTitle = document.getElementById("tabTitle");
    var filterTabs = document.querySelectorAll(".filter-tab");

    // Remove active class from all tabs
    filterTabs.forEach(function(tabElement) {
        tabElement.classList.remove("active");
    });

    // Show the selected tab content and set the active tab
    if (tab === "revenue") {
        revenueContent.style.display = "block";
        productsContent.style.display = "none";
        tabTitle.textContent = "Thống kê doanh thu";
        filterTabs[0].classList.add("active");
    } else if (tab === "products") {
        revenueContent.style.display = "none";
        productsContent.style.display = "block";
        tabTitle.textContent = "Thống kê sản phẩm";
        filterTabs[1].classList.add("active");
    }
}

function showStats() {
    var timePeriod = document.getElementById("timePeriod").value;
    var table = document.getElementById("statsTable");
    var rows = table.getElementsByTagName("tr");
    var total = 0;
    var i = 1; // Bắt đầu từ 1 để bỏ qua hàng tiêu đề

    // Xóa dữ liệu cũ ở cột Tổng tiền
    while (i < rows.length) {
        var cells = rows[i].getElementsByTagName("td");
        cells[3].textContent = "";
        i++;
    }

    i = 1; // Reset i để duyệt lại
    var foundData = false;

    // Giả lập dữ liệu thống kê
    var statsData = {
        "day": { "HD0010": 30, "HD0011": 570000, "HD0012": 219000, "HD0013": 600000, "HD0014": 500000, "HD0015": 219000, "HD0016": 49000 },
        "month": { "HD0010": 300, "HD0011": 5700000, "HD0012": 2190000, "HD0013": 6000000, "HD0014": 5000000, "HD0015": 2190000, "HD0016": 490000 },
        "year": { "HD0010": 3000, "HD0011": 57000000, "HD0012": 21900000, "HD0013": 60000000, "HD0014": 50000000, "HD0015": 21900000, "HD0016": 4900000 }
    };

    // Hiển thị dữ liệu theo thời kỳ được chọn
    i = 1;
    while (i < rows.length) {
        var cells = rows[i].getElementsByTagName("td");
        var maHD = cells[0].textContent;
        if (statsData[timePeriod][maHD] !== undefined) {
            var value = statsData[timePeriod][maHD];
            cells[3].textContent = value.toLocaleString() + (value > 1000 ? " VND" : "");
            total += value;
            foundData = true;
        }
        i++;
    }

    // Hiển thị tổng doanh thu
    var totalDisplay = document.querySelector("#revenueContent .stats-options span:first-child");
    if (foundData) {
        totalDisplay.textContent = "₫ " + total.toLocaleString() + " VND";
    } else {
        totalDisplay.textContent = "₫ 0 VND";
    }
}

function showTopProducts() {
    var timePeriod = document.getElementById("productPeriod").value;
    var table = document.getElementById("productTable");
    var rows = table.getElementsByTagName("tr");
    var totalProducts = 0;
    var i = 0;

    // Giả lập dữ liệu top 10 sản phẩm bán chạy
    var productData = {
        "day": [
            { "id": "HWH01", "name": "Hot Wheels Porsche 356", "category": "Hot Wheels", "sold": 150 },
            { "id": "MGT07", "name": "Lamborghini Aventador SVJ", "category": "Mini GT", "sold": 120 },
            { "id": "LBB02", "name": "LaBuBu Hip-hop Girl Figure", "category": "LaBuBu", "sold": 100 },
            { "id": "BBC08", "name": "Baby Cry Again Series", "category": "Baby Cry", "sold": 90 },
            { "id": "BBT10", "name": "Animal Party Big Cute Plush", "category": "Baby Three", "sold": 80 },
            { "id": "TMW03", "name": "Tarmac Works Mitsubishi Lancer", "category": "Tarmac Works", "sold": 70 },
            { "id": "HWH02", "name": "Voiture Pagani Huayra", "category": "Hot Wheels", "sold": 60 },
            { "id": "HD0012", "name": "Macaron Bunny Series", "category": "Baby Three", "sold": 50 },
            { "id": "HD0013", "name": "Ford RS200", "category": "Tarmac Works", "sold": 40 },
            { "id": "HD0014", "name": "Ferrari 458 Italia GT3", "category": "Tarmac Works", "sold": 30 }
        ],
        "month": [
            { "id": "HWH01", "name": "Hot Wheels Porsche 356", "category": "Hot Wheels", "sold": 1200 },
            { "id": "MGT07", "name": "Lamborghini Aventador SVJ", "category": "Mini GT", "sold": 1000 },
            { "id": "LBB02", "name": "LaBuBu Hip-hop Girl Figure", "category": "LaBuBu", "sold": 900 },
            { "id": "BBC08", "name": "Baby Cry Again Series", "category": "Baby Cry", "sold": 800 },
            { "id": "BBT10", "name": "Animal Party Big Cute Plush", "category": "Baby Three", "sold": 700 },
            { "id": "TMW03", "name": "Tarmac Works Mitsubishi Lancer", "category": "Tarmac Works", "sold": 600 },
            { "id": "HWH02", "name": "Voiture Pagani Huayra", "category": "Hot Wheels", "sold": 500 },
            { "id": "HD0012", "name": "Macaron Bunny Series", "category": "Baby Three", "sold": 400 },
            { "id": "HD0013", "name": "Ford RS200", "category": "Tarmac Works", "sold": 300 },
            { "id": "HD0014", "name": "Ferrari 458 Italia GT3", "category": "Tarmac Works", "sold": 200 }
        ],
        "year": [
            { "id": "HWH01", "name": "Hot Wheels Porsche 356", "category": "Hot Wheels", "sold": 10000 },
            { "id": "MGT07", "name": "Lamborghini Aventador SVJ", "category": "Mini GT", "sold": 9000 },
            { "id": "LBB02", "name": "LaBuBu Hip-hop Girl Figure", "category": "LaBuBu", "sold": 8000 },
            { "id": "BBC08", "name": "Baby Cry Again Series", "category": "Baby Cry", "sold": 7000 },
            { "id": "BBT10", "name": "Animal Party Big Cute Plush", "category": "Baby Three", "sold": 6000 },
            { "id": "TMW03", "name": "Tarmac Works Mitsubishi Lancer", "category": "Tarmac Works", "sold": 5000 },
            { "id": "HWH02", "name": "Voiture Pagani Huayra", "category": "Hot Wheels", "sold": 4000 },
            { "id": "HD0012", "name": "Macaron Bunny Series", "category": "Baby Three", "sold": 3000 },
            { "id": "HD0013", "name": "Ford RS200", "category": "Tarmac Works", "sold": 2000 },
            { "id": "HD0014", "name": "Ferrari 458 Italia GT3", "category": "Tarmac Works", "sold": 1000 }
        ]
    };

    // Cập nhật bảng sản phẩm
    var products = productData[timePeriod];
    i = 0;
    while (i < rows.length) {
        var cells = rows[i].getElementsByTagName("td");
        var product = products[i];
        cells[0].textContent = product.id;
        cells[1].textContent = product.name;
        cells[2].textContent = product.category;
        cells[3].textContent = product.sold.toLocaleString();
        totalProducts++;
        i++;
    }

    // Hiển thị tổng số sản phẩm
    var totalDisplay = document.getElementById("totalProducts");
    totalDisplay.textContent = "Tổng sản phẩm: " + totalProducts;
}

// Khởi tạo tab mặc định
showTab("revenue");