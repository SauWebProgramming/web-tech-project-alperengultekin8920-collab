const e = {
  liste: document.querySelector("#mediaList"),
  detay: document.querySelector("#mediaDetail"),
  arama: document.querySelector("#searchInput"),
  kategori: document.querySelector("#categorySelect"),
  yil: document.querySelector("#yearSelect"),
  favBtn: document.querySelector("#favBtnNav"),
};

const LS_ANAHTAR = "media_spa_fav_v1";

let tumListe = [];
let gosterilecekListe = [];
let favoriler = new Set();
let sayfaModu = "hepsi"; // "hepsi" | "favori"

const guvenliYazi = (metin) =>
  String(metin)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const benzersiz = (dizi) => [...new Set(dizi)];

const favorileriYukle = () => {
  const ham = localStorage.getItem(LS_ANAHTAR);
  const liste = ham ? JSON.parse(ham) : [];
  favoriler = new Set(liste.map((x) => String(x)));
};

const favorileriKaydet = () => {
  localStorage.setItem(LS_ANAHTAR, JSON.stringify([...favoriler]));
};

const verileriCek = async () => {
  const cevap = await fetch("./data/media.json");
  if (!cevap.ok) throw new Error("media.json okunamadı. Live Server ile açtığından emin ol.");
  tumListe = await cevap.json();
  gosterilecekListe = [...tumListe];
};

const secenekleriDoldur = () => {
  const kategoriler = benzersiz(tumListe.map((x) => x.category)).sort();
  const yillar = benzersiz(tumListe.map((x) => x.year)).sort((a, b) => b - a);

  e.kategori.innerHTML =
    `<option value="">Tüm Kategoriler</option>` +
    kategoriler.map((k) => `<option value="${guvenliYazi(k)}">${guvenliYazi(k)}</option>`).join("");

  e.yil.innerHTML =
    `<option value="">Tüm Yıllar</option>` +
    yillar.map((y) => `<option value="${y}">${y}</option>`).join("");
};

const kartBas = (film) => {
  const favMi = favoriler.has(String(film.id));
  const posterVarMi = film.poster && film.poster.trim() ? film.poster.trim() : "";

  return `
    <article class="card">
      ${
        posterVarMi
          ? `<img class="poster" src="${guvenliYazi(posterVarMi)}" alt="${guvenliYazi(film.title)} posteri">`
          : ``
      }
      <div class="card-body">
        <h3>${guvenliYazi(film.title)}</h3>
        <p>${guvenliYazi(film.category)} • ${film.year} • ⭐ ${film.rating}</p>
        <div class="actions">
          <button class="btn primary" data-detay="${film.id}">Detay</button>
          <button class="btn" data-fav="${film.id}">
            ${favMi ? "Favoriden Çıkar" : "Favoriye Ekle"}
          </button>
        </div>
      </div>
    </article>
  `;
};

const listeyiBas = (liste) => {
  e.detay.classList.add("hidden");
  e.liste.classList.remove("hidden");

  if (!liste.length) {
    e.liste.innerHTML = `<p>Sonuç bulunamadı.</p>`;
    return;
  }

  e.liste.innerHTML = liste.map(kartBas).join("");

  e.liste.querySelectorAll("[data-detay]").forEach((btn) => {
    btn.addEventListener("click", () => {
      location.hash = `#detay-${btn.dataset.detay}`;
    });
  });

  e.liste.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      favoriDegistir(btn.dataset.fav);
    });
  });
};

const detayGoster = (id) => {
  const film = tumListe.find((x) => String(x.id) === String(id));
  if (!film) {
    location.hash = "#anasayfa";
    return;
  }

  const favMi = favoriler.has(String(film.id));

  e.liste.classList.add("hidden");
  e.detay.classList.remove("hidden");

  e.detay.innerHTML = `
    <button class="btn" id="geriBtn">← Geri</button>
    <h2>${guvenliYazi(film.title)} (${film.year})</h2>
    <p><strong>Kategori:</strong> ${guvenliYazi(film.category)}</p>
    <p><strong>Yönetmen:</strong> ${guvenliYazi(film.director)}</p>
    <p><strong>Puan:</strong> ${film.rating}</p>
    <p>${guvenliYazi(film.summary)}</p>
    <button class="btn primary" id="detayFavBtn">
      ${favMi ? "Favoriden Çıkar" : "Favoriye Ekle"}
    </button>
  `;

  document.querySelector("#geriBtn").addEventListener("click", () => {
    location.hash = sayfaModu === "favori" ? "#favoriler" : "#anasayfa";
  });

  document.querySelector("#detayFavBtn").addEventListener("click", () => {
    favoriDegistir(film.id);
  });
};

const filtreleVeGoster = () => {
  const aranan = e.arama.value.trim().toLowerCase();
  const seciliKategori = e.kategori.value;
  const seciliYil = e.yil.value;

  let temel = tumListe;

  if (sayfaModu === "favori") {
    temel = temel.filter((x) => favoriler.has(String(x.id)));
  }

  gosterilecekListe = temel.filter((film) => {
    const adUyar = !aranan || film.title.toLowerCase().includes(aranan);
    const katUyar = !seciliKategori || film.category === seciliKategori;
    const yilUyar = !seciliYil || String(film.year) === String(seciliYil);
    return adUyar && katUyar && yilUyar;
  });

  listeyiBas(gosterilecekListe);
};

const favoriDegistir = (filmId) => {
  const id = String(filmId);

  if (favoriler.has(id)) favoriler.delete(id);
  else favoriler.add(id);

  favorileriKaydet();

  if (location.hash.startsWith("#detay-")) {
    detayGoster(location.hash.replace("#detay-", ""));
  } else {
    filtreleVeGoster();
  }
};

const sayfayiCoz = () => {
  const hash = location.hash || "#anasayfa";

  if (hash === "#favoriler") {
    sayfaModu = "favori";
    filtreleVeGoster();
    return;
  }

  if (hash.startsWith("#detay-")) {
    detayGoster(hash.replace("#detay-", ""));
    return;
  }

  sayfaModu = "hepsi";
  filtreleVeGoster();
};

const baslat = async () => {
  favorileriYukle();
  await verileriCek();
  secenekleriDoldur();

  e.arama.addEventListener("input", filtreleVeGoster);
  e.kategori.addEventListener("change", filtreleVeGoster);
  e.yil.addEventListener("change", filtreleVeGoster);

  e.favBtn.addEventListener("click", () => {
    location.hash = sayfaModu === "favori" ? "#anasayfa" : "#favoriler";
  });

  window.addEventListener("hashchange", sayfayiCoz);
  sayfayiCoz();
};

baslat().catch((hata) => {
  document.body.innerHTML = `<pre style="padding:16px;">Hata: ${hata.message}</pre>`;
});
