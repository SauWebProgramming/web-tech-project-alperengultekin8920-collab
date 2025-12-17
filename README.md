# 🎬 Popüler Film Arşivi (İnteraktif Medya Kitaplığı)

Bu proje, **BST-207 Web Teknolojileri** dersi kapsamında geliştirilmiş, istemci tarafında çalışan ve modern web teknolojilerini kullanan bir **Single Page Application (SPA)** uygulamasıdır.

Uygulama, yerel bir JSON veri kaynağından alınan film verilerini dinamik olarak kullanıcıya sunar. Kullanıcılar film listesini inceleyebilir, arama ve filtreleme işlemleri yapabilir, film detaylarını görüntüleyebilir ve favori listelerini yönetebilir.

---

## 🔗 Proje Linkleri

**Canlı Demo (GitHub Pages):**  
https://sauwebprogramming.github.io/web-tech-project-alperengultekin_b220102042/

---

## 🚀 Öne Çıkan Özellikler

- **Dinamik Veri Yönetimi**  
  Film verileri `media.json` dosyasından **Fetch API** kullanılarak asenkron şekilde yüklenmektedir.

- **Arama ve Filtreleme**  
  Filmler başlığa göre aranabilir; kategori ve yıl bilgisine göre anlık olarak filtrelenebilir.

- **SPA Mimarisi (Single Page Application)**  
  Film detayları ayrı bir HTML sayfası kullanılmadan, JavaScript ile dinamik olarak oluşturulmaktadır.

- **Favoriler Sistemi**  
  Kullanıcıların favoriye eklediği filmler **localStorage** kullanılarak tarayıcıda saklanır ve sayfa yenilendiğinde kaybolmaz.

- **Responsive Tasarım**  
  Arayüz, CSS Grid ve Flexbox kullanılarak mobil, tablet ve masaüstü cihazlara uyumlu hale getirilmiştir.

---

## 🛠️ Teknik Gereksinimler

Bu proje, ödev yönergesine uygun olarak tamamen **statik dosyalar** kullanılarak geliştirilmiştir ve sunucu taraflı bir teknoloji gerektirmez.

- **HTML5**  
  Anlamsal (semantic) etiketler kullanılarak sayfa yapısı oluşturulmuştur.

- **CSS3**  
  Harici stil dosyası ile modern ve responsive bir kullanıcı arayüzü tasarlanmıştır.

- **JavaScript (ES6+)**  
  `const / let`, arrow function’lar, `async / await` ve `fetch API` gibi modern JavaScript özellikleri kullanılmıştır.

- **Versiyon Kontrolü**  
  Proje geliştirme süreci Git ile yönetilmiş ve GitHub üzerinde paylaşılmıştır.

---

## 📂 Proje Yapısı

```plaintext
├── assets/
│   └── img/            # Film posterleri
├── css/
│   └── style.css       # Stil ve responsive tasarım
├── data/
│   └── media.json      # Film veri kaynağı
├── js/
│   └── app.js          # Uygulama mantığı (SPA, filtreleme, favoriler)
├── index.html          # Ana uygulama dosyası
└── README.md           # Proje açıklaması

