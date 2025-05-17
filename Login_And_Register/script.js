document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    var registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var accountType = document.getElementById('accountType').value;
            alert('Đăng nhập thành công!');
            if (accountType === 'customer') {
                window.location.href = '../homepage/index.html';
            } else if (accountType === 'admin') {
                window.location.href = '../adminpage/index.html';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            window.location.href = 'login.html';
        });
    }
});

function updateEmail() {
    var accountType = document.getElementById('accountType').value;
    var emailField = document.getElementById('email');
    if (accountType === 'customer') {
        emailField.value = 'customer@example.com';
    } else if (accountType === 'admin') {
        emailField.value = 'admin@example.com';
    }
}