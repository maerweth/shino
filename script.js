// SUPABASE BAĞLANTISI
const { createClient } = supabase;
const supabaseClient = createClient(
  'https://zetyyolrgoatlydijags.supabase.co',
  'sb_publishable_s9AcIZ5j2HXXsO6H_6RPxg_cL37aJw7'
);

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

// KAYIT OL
document.getElementById("registerBtn").addEventListener("click", async function() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  if (!username || !password) {
    alert("Lütfen tüm alanları doldurun!");
    return;
  }

  const { error } = await supabaseClient.auth.signUp({
    email: username,
    password: password,
  });

  if (error) {
    alert("Hata: " + error.message);
  } else {
    alert("Kayıt başarılı! Giriş yapabilirsiniz.");
    document.getElementById("registerModal").classList.remove("active");
  }
});

// GİRİŞ YAP
document.getElementById("loginBtn").addEventListener("click", async function() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Lütfen tüm alanları doldurun!");
    return;
  }

  const { error } = await supabaseClient.auth.signInWithPassword({
    email: username,
    password: password,
  });

  if (error) {
    alert("Hata: " + error.message);
  } else {
    alert("Giriş başarılı! Hoş geldin!");
    document.getElementById("loginModal").classList.remove("active");
  }
});
// Sayfa açılınca giriş durumunu kontrol et
supabaseClient.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    girisYapildi(session.user.email);
  }
});

function girisYapildi(email) {
  document.querySelector(".nav-buttons").innerHTML = `
    <span style="color: white; font-size: 14px;">${email}</span>
    <button onclick="cikisYap()" style="background: transparent; color: #ff8c00; border: 1.5px solid #ff8c00; padding: 8px 20px; border-radius: 8px; font-size: 14px; cursor: pointer;">Çıkış Yap</button>
  `;
}

async function cikisYap() {
  await supabaseClient.auth.signOut();
  location.reload();
}
