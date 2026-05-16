// Giriş Yap butonuna tıklanınca ekranı aç
document.getElementById("loginBtn-open").addEventListener("click", function() {
  document.getElementById("loginModal").classList.add("active");
});

// Çarpıya tıklanınca ekranı kapat
document.getElementById("closeLogin").addEventListener("click", function() {
  document.getElementById("loginModal").classList.remove("active");
});
// Kayıt Ol butonuna tıklanınca ekranı aç
document.getElementById("registerBtn-open").addEventListener("click", function() {
  document.getElementById("registerModal").classList.add("active");
});

// Çarpıya tıklanınca ekranı kapat
document.getElementById("closeRegister").addEventListener("click", function() {
  document.getElementById("registerModal").classList.remove("active");
});
