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

  const email = username.includes('@') ? username : username + '@shino.com';
  const { error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    alert("Hata: " + error.message);
  } else {
    document.getElementById("registerModal").classList.remove("active");
    showMessage("Başarıyla kayıt olundu!");
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

  const email = username.includes('@') ? username : username + '@shino.com';
  const { error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    alert("Hata: " + error.message);
  } else {
    document.getElementById("loginModal").classList.remove("active");
    showMessage("Başarıyla giriş yapıldı!");
    girisYapildi(username);
  }
});

// Sayfa açılınca giriş durumunu kontrol et
supabaseClient.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    girisYapildi(session.user.email);
  }
});

function girisYapildi(email) {
  document.getElementById("logoAlan").innerHTML = `<span style="color: #8b5cf6; font-size: 16px;">${email}</span>`;
  document.querySelector(".nav-buttons").innerHTML = `
    <button onclick="cikisYap()" style="background: transparent; color: #8b5cf6; border: 1.5px solid #8b5cf6; padding: 8px 20px; border-radius: 8px; font-size: 14px; cursor: pointer;">Çıkış Yap</button>
  `;
}

async function cikisYap() {
  await supabaseClient.auth.signOut();
  location.reload();
}

function showMessage(msg) {
  const el = document.getElementById("successMessage");
  el.innerText = msg;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 3000);
}

// OYUN VERİTABANI
const oyunlar = [
  { kod: "Vq341El6", isim: "Subnautica 2", tag: "Hayatta Kalma", resim: "https://cdn.itemsatis.com/uploads/post_images/subnautica-2-6080593.png", link: "https://store.steampowered.com/app/1962700/Subnautica_2/" },
  { kod: "Cs1S5Jw1", isim: "Gta V", tag: "Rol Yapma", resim: "https://images.hepsiburada.net/description-assets/description-prod-30/4452b4c6-6ddd-4fd5-a111-750de34d7a4c.jpg", link: "https://store.steampowered.com/app/3240220/Grand_Theft_Auto_V_Enhanced/" },
  { kod: "6işİQ293", isim: "The Forest", tag: "Hayatta Kalma", resim: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/capsule_616x353.jpg?t=1699381053", link: "https://store.steampowered.com/app/242760/The_Forest/" }
];

// ARAMA
document.querySelector(".search-input").addEventListener("input", function() {
  const aranan = this.value.trim();
  const sonuc = document.getElementById("arama-sonuc");

  if (aranan === "") {
    sonuc.innerHTML = "";
    return;
  }

  const bulunan = oyunlar.find(o => o.kod === aranan);

  if (bulunan) {
    sonuc.innerHTML = `
      <a href="oyun.html?kod=${bulunan.kod}" style="text-decoration:none; display:block; margin:0 32px;">
        <div style="display:flex; align-items:center; gap:16px; background:#0d3349; border-radius:0 0 10px 10px; padding:12px 16px; cursor:pointer;">
          <img src="${bulunan.resim}" style="width:120px; height:70px; object-fit:cover; border-radius:8px;">
          <div>
            <div style="color:white; font-size:16px; font-weight:bold;">${bulunan.isim}</div>
            <div style="color:#7ab3cc; font-size:13px;">${bulunan.tag}</div>
          </div>
        </div>
      </a>
    `;
  } else {
    sonuc.innerHTML = `<p style="color:#888; padding:12px 32px; margin:0;">Oyun bulunamadı.</p>`;
  }
});
