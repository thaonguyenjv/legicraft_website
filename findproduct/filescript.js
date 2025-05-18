// Hàm filter sản phẩm theo keyword
function filterProducts(keyword) {
  const products = document.querySelectorAll('.product-card');
  keyword = keyword.toLowerCase();

  products.forEach(product => {
    const title = product.querySelector('h3').textContent.toLowerCase();
    product.style.display = title.includes(keyword) ? 'block' : 'none';
  });
}

// Sự kiện tìm kiếm sản phẩm
document.querySelector('.search-btn').addEventListener('click', () => {
  const keyword = document.querySelector('input[type="text"]').value.trim().toLowerCase();
  filterProducts(keyword);
});

// Sự kiện toggle bộ lọc
document.querySelector('.filter-toggle').addEventListener('click', () => {
  document.body.classList.toggle('show-filter');
});

// Sự kiện lọc danh mục
document.querySelectorAll('.filter-group button[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    const products = document.querySelectorAll('.product-card');

    if (filter === 'all') {
      products.forEach(product => product.style.display = 'block');
    } else {
      products.forEach(product => {
        const category = product.getAttribute('data-category');
        product.style.display = (category === filter) ? 'block' : 'none';
      });
    }
  });
});

// Khi trang load, tự động filter sản phẩm hotwheels
window.addEventListener('DOMContentLoaded', () => {
  filterProducts('hot wheels');
});
// Sự kiện đóng sidebar bằng mũi tên
document.querySelector('.close-filter').addEventListener('click', () => {
  document.body.classList.remove('show-filter');
});
// Sự kiện lọc theo tình trạng
document.querySelectorAll('.filter-group button[data-condition]').forEach(button => {
  button.addEventListener('click', () => {
    const condition = button.getAttribute('data-condition');
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
      const cond = product.getAttribute('data-condition');
      product.style.display = (condition === 'all' || cond === condition) ? 'block' : 'none';
    });
  });
});

// Lọc theo đánh giá sao
document.querySelectorAll('.filter-group button[data-rating]').forEach(button => {
  button.addEventListener('click', () => {
    const minRating = parseFloat(button.getAttribute('data-rating'));
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
      const ratingText = product.querySelector('.product-info p:nth-of-type(2)')?.textContent.trim();
      const ratingMatch = ratingText.match(/(\d+(\.\d+)?)/); // tìm số đầu tiên (ví dụ: 3.1, 4.7...)

      const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;
      product.style.display = (rating >= minRating) ? 'block' : 'none';
    });
  });
});
// Khi click vào sản phẩm
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('h3').textContent;
    const img = card.querySelector('img').src;
    const price = card.querySelector('.price').textContent.replace(/[^\d]/g, '');
    const oldprice = card.querySelector('.price del')?.textContent.replace(/[^\d]/g, '') || price;
    const desc = "CRYBABY Crying Again Series - Vinyl Face Plush Blind Box từ POP MART: bộ sưu tập búp bê dễ thương, mỗi nhân vật đều có nét độc đáo riêng.";

    const url = `product.html?name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}&price=${price}&oldprice=${oldprice}&desc=${encodeURIComponent(desc)}`;
    window.location.href = url;
  });
});
