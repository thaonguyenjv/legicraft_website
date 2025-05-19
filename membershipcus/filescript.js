document.addEventListener('DOMContentLoaded', function () {
  const categoryItems = document.querySelectorAll('.category-item');

  categoryItems.forEach(item => {
    item.addEventListener('click', function () {
      this.classList.toggle('active');
      const icon = this.querySelector('i');
      if (this.classList.contains('active')) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
      } else {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
      }
    });
  });

  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('.price').textContent;
      const productImage = productCard.querySelector('img').getAttribute('src');

      // Gán thông tin vào popup
      document.getElementById('popupProductName').textContent = productName;
      document.getElementById('popupProductPrice').textContent = productPrice;
      document.getElementById('popupProductImage').setAttribute('src', productImage);

      // Hiển thị popup
      document.getElementById('cartPopupOverlay').style.display = 'flex';
    });
  });

  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    });
  });

  const searchInput = document.querySelector('.search input');
  const searchButton = document.querySelector('.search button');

  searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
      alert(`Đang tìm kiếm: "${searchTerm}"`);
    } else {
      alert('Vui lòng nhập từ khóa tìm kiếm');
    }
  });

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });

  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Giỏ hàng của bạn hiện đang trống');
    });
  }

  const createMobileNav = () => {
    if (window.innerWidth <= 768) {
      console.log('Mobile view detected');
    }
  };

  createMobileNav();
  window.addEventListener('resize', createMobileNav);
});

// Hàm đóng popup
function closeCartPopup() {
  document.getElementById('cartPopupOverlay').style.display = 'none';
}
