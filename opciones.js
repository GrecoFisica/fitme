
document.getElementById('togglePassword1').addEventListener('change', function () {
const password = document.getElementById('password');
password.type = this.checked ? 'text' : 'password';
});

document.getElementById('togglePassword2').addEventListener('change', function () {
const confirmar = document.getElementById('confirmar');
confirmar.type = this.checked ? 'text' : 'password';
});

