// Đăng ký
async function register() {
    const fullName = document.getElementById('register-full-name').value;
    const email = document.getElementById('register-email').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    if (!fullName || !email || !username || !password || !confirmPassword) {
        alert('Vui lòng nhập đầy đủ thông tin!')
        return;
    }
    if (password != confirmPassword) {
        alert('Mật khẩu không trùng khớp!')
        return;
    }
    const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, username, password })
    })
    const result = await res.json();
    alert(result.message);
    if (result.success)
        location.href = '/';
}

// Đăng nhập
async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if (!username || !password) {
        alert('Vui lòng nhập đầy đủ thông tin!')
        return;
    }
    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    const result = await res.json();
    if (!result.success)
        alert(result.message);
    else
        location.href = '/home';
}

// Hiển thị mật khẩu
function showPassword() {
    const check = document.getElementById('check-to-show');
    if (check.checked)
        check.checked = false;
    else
        check.checked = true;
    const password = document.getElementById('register-password')
        || document.getElementById('login-password');
    const confirmPassword = document.getElementById('confirm-password');
    if (check.checked) {
        password.setAttribute('type', 'text');
        confirmPassword.setAttribute('type', 'text');
    }
    else {
        password.setAttribute('type', 'password');
        confirmPassword.setAttribute('type', 'password');
    }
}
