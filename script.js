// SUPABASE BAĞLANTISI
const { createClient } = supabase;
const supabaseClient = createClient(
  'https://zetyyolrgoatlydijags.supabase.co',
  'sb_publishable_s9AcIZ5j2HXXsO6H_6RPxg_cL37aJw7'
);

// Sayfa açılınca oturum kontrolü
supabaseClient.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    girisYapildi(session.user.email);
  }
});

function girisYapildi(email) {
  const kullaniciAdi = email.includes('@') ? email.split('@')[0] : email;
  const navButtons = document.querySelector(".nav-buttons");
  if (!navButtons) return;
  navButtons.innerHTML = `
    <button onclick="window.location.href='kutuphanem.html'" style="background: #00d4ff; color: #0a0f1e; border: none; padding: 8px 20px; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer;">🎮 Kütüphanem</button>
    <div style="position:relative;">
      <button onclick="dropdownToggle()" style="background: transparent; color: white; border: 1.5px solid rgba(255,255,255,0.3); padding: 8px 20px; border-radius: 8px; font-size: 14px; cursor: pointer;">👤 ${kullaniciAdi}</button>
      <div id="dropdown-menu" style="display:none; position:absolute; right:0; top:calc(100% + 8px); background:#1a2035; border:1px solid rgba(255,255,255,0.1); border-radius:12px; width:200px; overflow:hidden; z-index:999; box-shadow: 0 8px 24px rgba(0,0,0,0.4);">
        <div style="padding:14px 16px; display:flex; align-items:center; gap:10px; border-bottom:1px solid rgba(255,255,255,0.08);">
          <span style="background:rgba(255,255,255,0.1); border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center;">👤</span>
          <div>
            <div style="color:white; font-size:14px; font-weight:bold;">${kullaniciAdi}</div>
            <div style="color:#7ab3cc; font-size:11px;">Hesabınız</div>
          </div>
        </div>
        <div onclick="window.location.href='ayarlar.html'" style="padding:12px 16px; display:flex; align-items:center; gap:10px; cursor:pointer; color:#ccc; font-size:14px; transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
          <span>⚙️</span> Ayarlar
        </div>
        <div onclick="cikisYap()" style="padding:12px 16px; display:flex; align-items:center; gap:10px; cursor:pointer; color:#ef4444; font-size:14px; transition:background 0.2s;" onmouseover="this.style.background='rgba(239,68,68,0.08)'" onmouseout="this.style.background='transparent'">
          <span>🚪</span> Çıkış Yap
        </div>
      </div>
    </div>
  `;

  // Dışarı tıklanınca kapat
  document.addEventListener('click', function(e) {
    const menu = document.getElementById('dropdown-menu');
    if (menu && !e.target.closest('.nav-buttons')) {
      menu.style.display = 'none';
    }
  });
}

function dropdownToggle() {
  const menu = document.getElementById('dropdown-menu');
  if (menu) {
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  }
}

async function cikisYap() {
  await supabaseClient.auth.signOut();
  location.reload();
}

function showMessage(msg) {
  const el = document.getElementById("successMessage");
  if (!el) return;
  el.innerText = msg;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 3000);
}

// Modal elementleri sadece varsa bağla (index.html'de var, diğerlerinde yok)
const loginBtnOpen = document.getElementById("loginBtn-open");
const closeLoginBtn = document.getElementById("closeLogin");
const registerBtnOpen = document.getElementById("registerBtn-open");
const closeRegisterBtn = document.getElementById("closeRegister");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

if (loginBtnOpen) {
  loginBtnOpen.addEventListener("click", () => {
    document.getElementById("loginModal").classList.add("active");
  });
}

if (closeLoginBtn) {
  closeLoginBtn.addEventListener("click", () => {
    document.getElementById("loginModal").classList.remove("active");
  });
}

if (registerBtnOpen) {
  registerBtnOpen.addEventListener("click", () => {
    document.getElementById("registerModal").classList.add("active");
  });
}

if (closeRegisterBtn) {
  closeRegisterBtn.addEventListener("click", () => {
    document.getElementById("registerModal").classList.remove("active");
  });
}

// KAYIT OL
if (registerBtn) {
  registerBtn.addEventListener("click", async function() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    if (!username || !password) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const email = username.includes('@') ? username : username + '@shino.com';
    const { error } = await supabaseClient.auth.signUp({ email, password });

    if (error) {
      alert("Hata: " + error.message);
    } else {
      document.getElementById("registerModal").classList.remove("active");
      showMessage("Başarıyla kayıt olundu!");
    }
  });
}

// GİRİŞ YAP
if (loginBtn) {
  loginBtn.addEventListener("click", async function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const email = username.includes('@') ? username : username + '@shino.com';
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Hata: " + error.message);
    } else {
      document.getElementById("loginModal").classList.remove("active");
      showMessage("Başarıyla giriş yapıldı!");
      girisYapildi(email);
    }
  });
}

// OYUN VERİTABANI
const oyunlar = [
  { kod: "Vq341El6", isim: "Subnautica 2", tag: "Hayatta Kalma", resim: "https://cdn.itemsatis.com/uploads/post_images/subnautica-2-6080593.png", link: "https://store.steampowered.com/app/1962700/Subnautica_2/" },
  { kod: "Cs1S5Jw1", isim: "Gta V", tag: "Rol Yapma", resim: "https://images.hepsiburada.net/description-assets/description-prod-30/4452b4c6-6ddd-4fd5-a111-750de34d7a4c.jpg", link: "https://store.steampowered.com/app/3240220/Grand_Theft_Auto_V_Enhanced/" },
  { kod: "6işİQ293", isim: "The Forest", tag: "Hayatta Kalma", resim: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/capsule_616x353.jpg?t=1699381053", link: "https://store.steampowered.com/app/242760/The_Forest/" }
];

// ARAMA
const searchInput = document.querySelector(".search-input");
if (searchInput) {
  searchInput.addEventListener("input", function() {
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
}
function kutupHaneGit() {
  supabaseClient.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      window.location.href = 'kutuphanem.html';
    }
  });
}
