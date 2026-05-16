// SUPABASE BAĞLANTISI
const { createClient } = supabase;
const supabaseClient = createClient(
  'https://zetyyolrgoatlydijags.supabase.co',
  'sb_publishable_s9AcIZ5j2HXXsO6H_6RPxg_cL37aJw7'
);

// OYUN VERİTABANI
const oyunlar = [
  { kod: "Vq341El6", isim: "Subnautica 2", resim: "https://cdn.itemsatis.com/uploads/post_images/subnautica-2-6080593.png", username: "subnautica_user", password: "sub123456" },
  { kod: "Cs1S5Jw1", isim: "Gta V", resim: "https://images.hepsiburada.net/description-assets/description-prod-30/4452b4c6-6ddd-4fd5-a111-750de34d7a4c.jpg", username: "gtav_user", password: "gta123456" },
  { kod: "6işİQ293", isim: "The Forest", resim: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/capsule_616x353.jpg?t=1699381053", username: "forest_user", password: "forest123456" }
];

// URL'den kodu al
const urlParams = new URLSearchParams(window.location.search);
const kod = urlParams.get("kod");
const oyun = oyunlar.find(o => o.kod === kod);

if (oyun) {
  document.getElementById("oyunResimKucuk").src = oyun.resim;
  document.getElementById("oyunAdiBaslik").innerText = oyun.isim;
  document.getElementById("usernameGoster").innerText = oyun.username;
  document.getElementById("passwordGercek").innerText = oyun.password;

  const simdi = new Date();
  document.getElementById("tarih").innerText = simdi.toLocaleDateString("tr-TR") + ", " + simdi.toLocaleTimeString("tr-TR", {hour: "2-digit", minute: "2-digit"});
} else {
  document.body.innerHTML = "<p style='color:white; padding:40px;'>Oyun bulunamadı.</p>";
}

// Şifre göster/gizle
let sifregoster = false;
function goster() {
  sifregoster = !sifregoster;
  const gercek = document.getElementById("passwordGercek").innerText;
  document.getElementById("passwordGoster").innerText = sifregoster ? gercek : "••••••••••";
}

// Kopyala
function kopyala(id) {
  const metin = document.getElementById(id).innerText;
  navigator.clipboard.writeText(metin);
  alert("Kopyalandı!");
}

// Giriş kontrolü
supabaseClient.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    const logoAlan = document.getElementById("logoAlan");
    if (logoAlan) {
      logoAlan.innerHTML = `<span style="color:#8b5cf6; font-size:16px;">${session.user.email}</span>`;
    }
    const cikisBtn = document.getElementById("cikisBtn");
    if (cikisBtn) {
      cikisBtn.style.display = "block";
    }
  }
});

async function cikisYap() {
  await supabaseClient.auth.signOut();
  window.location.href = "index.html";
}
async function guardTalep() {
  document.getElementById("guardKod").innerText = "Yükleniyor...";
  
  try {
    const response = await fetch('/api/gmail');
    const data = await response.json();
    
    if (data.kod) {
      document.getElementById("guardKod").innerText = data.kod;
    } else {
      document.getElementById("guardKod").innerText = "Kod bulunamadı";
    }
  } catch (error) {
    document.getElementById("guardKod").innerText = "Hata oluştu";
  }
}
