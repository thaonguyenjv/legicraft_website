function showTab(tab) {
    var revenueContent = document.getElementById("revenueContent");
    var productsContent = document.getElementById("productsContent");
    var forecastContent = document.getElementById("forecastContent");
    var filterTabs = document.querySelectorAll(".filter-tab");

    // Remove active class from all tabs
    filterTabs.forEach(function(tabElement) {
        tabElement.classList.remove("active");
    });

    // Show the selected tab content and set the active tab
    if (tab === "revenue") {
        revenueContent.style.display = "block";
        productsContent.style.display = "none";
        forecastContent.style.display = "none";
        tabTitle.textContent = "Thống kê doanh thu";
        filterTabs[0].classList.add("active");
    } else if (tab === "products") {
        revenueContent.style.display = "none";
        productsContent.style.display = "block";
        forecastContent.style.display = "none";
        tabTitle.textContent = "Thống kê sản phẩm";
        filterTabs[1].classList.add("active");
    }
    else if (tab === "forecast") {
        revenueContent.style.display = "none";
        productsContent.style.display = "none";
        forecastContent.style.display = "block";
        filterTabs[2].classList.add("active");
        renderForecastChart();
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
        "day": { "HD0010": 70000, "HD0011": 570000, "HD0012": 219000, "HD0013": 600000, "HD0014": 500000, "HD0015": 219000, "HD0016": 49000 },
        "month": { "HD0010": 300000, "HD0011": 5700000, "HD0012": 2190000, "HD0013": 6000000, "HD0014": 5000000, "HD0015": 2190000, "HD0016": 490000 },
        "year": { "HD0010": 3000000, "HD0011": 57000000, "HD0012": 21900000, "HD0013": 60000000, "HD0014": 50000000, "HD0015": 21900000, "HD0016": 4900000 }
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
function renderForecastChart() {
  const ctx = document.getElementById('forecastChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2023', '2024', '2025', '2026', '2027'],
      datasets: [{
        label: 'Doanh thu (triệu VND)',
        data: [200, 350, 500, 750, 900],
        backgroundColor: 'rgba(79, 146, 165, 0.2)',
        borderColor: '#4f92a5',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Dự báo doanh thu trong 3 năm tới'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  // Khởi tạo biểu đồ đầu tư mặc định
  renderInvestmentChart('short');
}
// Hàm tạo biểu đồ phân tích đầu tư
function renderInvestmentChart(period) {
  // Dữ liệu mẫu cho biểu đồ đầu tư
  const investmentData = {
    'short': {
      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      roi: [5, 8, 12, 10, 15, 18],
      cost: [50, 48, 45, 52, 60, 55],
      revenue: [52.5, 51.84, 50.4, 57.2, 69, 64.9]
    },
    'medium': {
      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
      roi: [5, 8, 10, 12, 15, 18, 20, 22, 19, 25, 28, 30],
      cost: [50, 55, 60, 58, 65, 70, 75, 80, 85, 90, 95, 100],
      revenue: [52.5, 59.4, 66, 65, 74.75, 82.6, 90, 97.6, 101.15, 112.5, 121.6, 130]
    },
    'long': {
      labels: ['2024', '2025', '2026', '2027'],
      roi: [15, 25, 35, 40],
      cost: [200, 250, 300, 350],
      revenue: [230, 312.5, 405, 490]
    }
  };
  
  const data = investmentData[period];
  const ctx = document.getElementById('investmentChart').getContext('2d');
  
  // Xóa biểu đồ cũ nếu có
  if (window.investmentChartInstance) {
    window.investmentChartInstance.destroy();
  }
  
  // Tạo biểu đồ mới
  window.investmentChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Chi phí đầu tư (triệu VND)',
          data: data.cost,
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
          order: 2
        },
        {
          label: 'Doanh thu (triệu VND)',
          data: data.revenue,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
          order: 1
        },
        {
          label: 'ROI (%)',
          data: data.roi,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 2,
          type: 'line',
          yAxisID: 'y1',
          order: 0
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Phân tích hiệu quả đầu tư'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Số tiền (triệu VND)'
          }
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: 'ROI (%)'
          },
          grid: {
            drawOnChartArea: false
          }
        }
      }
    }
  });
}

// Hàm cập nhật biểu đồ đầu tư khi thay đổi thời gian
function updateInvestmentChart() {
  const period = document.getElementById('investmentPeriod').value;
  renderInvestmentChart(period);
}
// Khởi tạo tab mặc định
document.addEventListener('DOMContentLoaded', function() {
  showTab("revenue");
});
