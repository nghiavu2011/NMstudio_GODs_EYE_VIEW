/**
 * N&M Studio — Bilingual Slice (EN/VN) & Tactical Guide Modal System
 * Hotline / Zalo: 0985 578 385
 */

const DICT = {
  en: {
    kicker: 'N&M STUDIO // TACTICAL COMMAND',
    subtitle: 'GLOBAL REALTIME OSINT · NO PLACE LEFT BEHIND',
    comm_code: 'SECURE COMM LINK',
    comm_status: 'ONLINE',
    guide_btn: 'GUIDE',
    active_style: 'ACTIVE STYLE',
    data_layers: 'DATA LAYERS',
    visual_presets: 'VISUAL PRESETS',
    location: 'LOCATION',
    search_placeholder: 'Search any location...',
    welcome_kicker: 'N&M STUDIO COMMAND · MISSION CONTROL // LEVEL-5',
    welcome_desc: 'A classified reconnaissance console for planet Earth—real-time telemetry from orbit to ground level.',
    m_contacts_title: 'LIVE CONTACTS',
    m_contacts_sub: 'Aircraft, vessels and nearby intelligence',
    m_space_title: 'SPACE MISSIONS',
    m_space_sub: 'Launches, spacecraft and orbital context',
    m_env_title: 'ENVIRONMENTAL',
    m_env_sub: 'Live earthquakes and active fires, from USGS and NASA',
    m_explore_title: 'EXPLORE MANUALLY',
    m_explore_sub: 'Begin with a clean globe',
    m_suppress: "Don't show this again",
    m_esc: 'ESC to dismiss',
    guide_title: 'TACTICAL MISSION HANDBOOK',
    guide_subtitle: 'System Architecture, Feature Controls & Real-time Operations',
    guide_close: 'CLOSE HANDBOOK',
    guide_footer: "N&Mstudio_ GOD's EYE VIEW · Tactical OSINT Console",
    sec1_title: 'WHY ARE MANY FEATURES OFF BY DEFAULT?',
    sec1_desc: `
      <p><strong>Bandwidth & GPU Protection:</strong> N&Mstudio_ GOD's EYE VIEW streams dozens of real-time intelligence feeds (over 10,000 live ADS-B aircraft, maritime vessels, orbital satellites, seismographs, NASA wildfire sensors...).</p>
      <p>Automatically loading all layers at startup would congest network bandwidth and overwhelm your device's GPU/memory. Therefore, layers are partitioned into modular missions that you can toggle individually as needed!</p>
    `,
    sec2_title: 'HOW TO ACTIVATE & OPERATE LAYERS',
    sec2_desc: `
      <ul class="nm-guide-list">
        <li><strong>DATA LAYERS Panel (Left Edge):</strong> Click the <code>+</code> button on the left panel to expand the roster and toggle: <em>Flights, Marine vessels, Satellites, Earthquakes, Wildfires, Global Radio</em>.</li>
        <li><strong>Cockpit Mode:</strong> Click any airborne plane in the sky &rarr; its telemetry card appears &rarr; click <strong>COCKPIT</strong> (or press <strong>C</strong>) to ride inside its cockpit over real terrain!</li>
        <li><strong>Multispectral Sensor Styles:</strong> Tap keys <strong>1 through 7</strong> on your keyboard to switch optics: <em>Normal, CRT Phosphor, Night Vision NVG, FLIR Thermal, Anime, Noir, Snow</em>.</li>
      </ul>
    `,
    sec3_title: 'TACTICAL HOTKEYS REFERENCE',
    key_styles: 'Switch visual sensor styles (Normal / CRT / NVG / FLIR...)',
    key_hud: 'Toggle Intelligence Telemetry HUD',
    key_detect: 'Toggle Detection Mesh bounding boxes',
    key_cockpit: 'Enter cockpit of tracked aircraft',
    key_fps: 'Toggle FPS and WebGL performance telemetry',
    key_esc: 'Deselect target / Reset to full globe',
    sec4_title: 'UNLOCKING 3D TERRAIN & VOICE AI (POWER UP)',
    sec4_desc: `
      <p>17 out of 19 layers in this app are <strong>COMPLETELY FREE & KEYLESS</strong>. To activate photorealistic terrain or voice control:</p>
      <ul class="nm-guide-list">
        <li>Click the <strong>POWER UP</strong> button in the bottom-right corner to paste keys directly into the app (zero coding required).</li>
        <li><strong>Cesium ion Token:</strong> Free at cesium.com for global 3D buildings and elevation terrain.</li>
        <li><strong>OpenAI Key:</strong> Activates the <strong>GEV MIC</strong> button to talk to planet Earth by voice.</li>
      </ul>
    `,
    sec5_title: 'DIRECT OPERATOR UPLINK // N&M STUDIO',
    sec5_desc: 'For technical support, custom GIS integrations, real estate spatial scoring, or bespoke military HUD development:'
  },
  vi: {
    kicker: 'N&M STUDIO // CHỈ HUY TÁC CHIẾN',
    subtitle: 'TÌNH BÁO KHÔNG GIAN REALTIME · KHÔNG BỎ SÓT BẤT KỲ ĐÂU',
    comm_code: 'KÊNH BẢO MẬT',
    comm_status: 'TRỰC TUYẾN',
    guide_btn: 'HƯỚNG DẪN',
    active_style: 'QUANG PHỔ',
    data_layers: 'CÁC LỚP DỮ LIỆU',
    visual_presets: 'BỘ LỌC QUANG PHỔ',
    location: 'VỊ TRÍ & TỌA ĐỘ',
    search_placeholder: 'Tìm kiếm địa điểm hoặc tọa độ...',
    welcome_kicker: 'CHỈ HUY N&M STUDIO · PHÒNG ĐIỀU HÀNH TÁC CHIẾN // CẤP 5',
    welcome_desc: 'Bảng điều khiển trinh sát không gian toàn cầu—dữ liệu viễn thám và tình báo realtime từ quỹ đạo đến mặt đất.',
    m_contacts_title: 'MỤC TIÊU REALTIME',
    m_contacts_sub: 'Máy bay, tàu biển và tình báo lân cận',
    m_space_title: 'NHIỆM VỤ KHÔNG GIAN',
    m_space_sub: 'Vệ tinh, tàu vũ trụ và quỹ đạo',
    m_env_title: 'MÔI TRƯỜNG & THIÊN TAI',
    m_env_sub: 'Động đất và cháy rừng trực tiếp từ USGS & NASA',
    m_explore_title: 'TỰ KHÁM PHÁ',
    m_explore_sub: 'Bắt đầu với quả địa cầu trống',
    m_suppress: 'Không hiện lại bảng này',
    m_esc: 'Nhấn ESC để đóng',
    guide_title: 'CẨM NANG HƯỚNG DẪN TÁC CHIẾN',
    guide_subtitle: 'Cấu trúc hệ thống, Điều khiển tính năng & Vận hành thời gian thực',
    guide_close: 'ĐÃ HIỂU / ĐÓNG',
    guide_footer: "N&Mstudio_ GOD's EYE VIEW · Bảng điều khiển Tình báo Không gian",
    sec1_title: 'TẠI SAO NHIỀU TÍNH NĂNG MẶC ĐỊNH ĐỂ "OFF"?',
    sec1_desc: `
      <p><strong>Bảo vệ Băng thông & Hiệu năng GPU:</strong> N&Mstudio_ GOD's EYE VIEW kết nối trực tiếp đến hàng chục nguồn tình báo toàn cầu (hơn 10.000 máy bay ADS-B đang bay, tàu biển AIS, hàng vạn mảnh vệ tinh quỹ đạo, trạm đo địa chấn, vệ tinh nhiệt NASA...).</p>
      <p>Nếu tự động nạp tất cả các lớp cùng lúc khi mở web, trình duyệt sẽ bị giật lag đồ họa 3D và ngốn hàng GB dữ liệu mạng. Vì vậy hệ thống chia thành các <strong>Module Nhiệm vụ</strong> tắt sẵn để bạn chủ động kích hoạt theo nhu cầu!</p>
    `,
    sec2_title: 'CÁCH BẬT & ĐIỀU KHIỂN CÁC LỚP TÌNH BÁO',
    sec2_desc: `
      <ul class="nm-guide-list">
        <li><strong>Bảng DATA LAYERS (Góc trái):</strong> Bấm vào dấu <code>+</code> ở panel bên trái để mở danh sách và bật tắt nhanh các lớp: <em>Flights (Máy bay), Marine (Tàu biển), Satellites (Vệ tinh), Earthquakes (Động đất), Fires (Cháy rừng), Radio (Đài phát thanh toàn cầu)</em>.</li>
        <li><strong>Chế độ Buồng lái (Cockpit Mode):</strong> Nhấp chuột vào bất kỳ máy bay nào đang bay trên bầu trời, thanh thông tin máy bay sẽ hiện ra &rarr; Bấm <strong>COCKPIT</strong> (hoặc nhấn phím <strong>C</strong>) để ngồi thẳng vào buồng lái máy bay lướt trên địa hình thực tế!</li>
        <li><strong>Chế độ Trinh sát Đa quang phổ:</strong> Nhấn các phím số từ <strong>1 đến 7</strong> trên bàn phím để đổi chế độ nhìn: <em>Bình thường, Màn hình CRT, Kính nhìn đêm NVG, Camera ảnh nhiệt FLIR, Anime, Noir, Tuyết trắng</em>.</li>
      </ul>
    `,
    sec3_title: 'BẢNG PHÍM TẮT TÁC CHIẾN (TACTICAL HOTKEYS)',
    key_styles: 'Đổi bộ lọc quang phổ (Normal / CRT / NVG / FLIR...)',
    key_hud: 'Bật / Tắt Tactical HUD tình báo',
    key_detect: 'Bật / Tắt Lưới nhận diện mục tiêu (Detection Mesh)',
    key_cockpit: 'Nhập buồng lái máy bay đang khóa mục tiêu',
    key_fps: 'Hiện tốc độ khung hình (FPS) & thông số WebGL',
    key_esc: 'Bỏ chọn mục tiêu / Trở về toàn cảnh Trái Đất',
    sec4_title: 'MỞ KHÓA TÍNH NĂNG 3D & TRỢ LÝ GIỌNG NÓI (POWER UP)',
    sec4_desc: `
      <p>17 trên 19 lớp dữ liệu của ứng dụng là <strong>HOÀN TOÀN MIỄN PHÍ & KHÔNG CẦN KEY</strong>. Nếu muốn mở thêm tính năng cao cấp:</p>
      <ul class="nm-guide-list">
        <li>Nhấp nút <strong>POWER UP</strong> ở góc dưới cùng bên phải màn hình để dán trực tiếp Key (không cần chạm vào code).</li>
        <li><strong>Cesium ion Token:</strong> Miễn phí tạo tại cesium.com để bật địa hình 3D núi đồi và công trình toàn thế giới.</li>
        <li><strong>OpenAI Key:</strong> Mở tính năng trò chuyện bằng giọng nói <strong>GEV MIC</strong> để ra lệnh cho Trái Đất bằng tiếng Anh.</li>
      </ul>
    `,
    sec5_title: 'HỖ TRỢ TRỰC TIẾP TỪ N&M STUDIO',
    sec5_desc: 'Mọi thắc mắc kỹ thuật, yêu cầu tích hợp dữ liệu GIS/BĐS hoặc tùy biến giao diện quân sự theo yêu cầu riêng:'
  }
};

let currentLang = localStorage.getItem('nm_lang') || 'vi';

export function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('nm_lang', lang);
  document.documentElement.setAttribute('lang', lang === 'vi' ? 'vi' : 'en');
  
  const d = DICT[lang];
  if (!d) return;

  // Toggle slider visual state
  const toggleBtn = document.getElementById('nm-lang-toggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('data-lang', lang);
    const chipEn = toggleBtn.querySelector('.nm-lang-en');
    const chipVn = toggleBtn.querySelector('.nm-lang-vn');
    if (chipEn) chipEn.classList.toggle('active', lang === 'en');
    if (chipVn) chipVn.classList.toggle('active', lang === 'vi');
  }

  // Update elements by specific selectors
  const kicker = document.querySelector('.brand-studio-kicker');
  if (kicker) kicker.textContent = d.kicker;

  const sub = document.querySelector('.nm-title-bar .subtitle .sub-text');
  if (sub) sub.textContent = d.subtitle;

  const commCode = document.querySelector('.tac-badge-code');
  if (commCode) commCode.textContent = d.comm_code;

  const commStatus = document.querySelector('.tac-badge-status');
  if (commStatus) commStatus.textContent = d.comm_status;

  const guideBtnText = document.querySelector('.guide-text');
  if (guideBtnText) guideBtnText.textContent = d.guide_btn;

  const activeStyle = document.querySelector('.indicator-label');
  if (activeStyle) activeStyle.textContent = d.active_style;

  const dataTitle = document.querySelector('#data-panel .panel-title');
  if (dataTitle) dataTitle.textContent = d.data_layers;

  const ctrlTitle = document.querySelector('#control-panel-toggle .panel-title');
  if (ctrlTitle) {
    const icon = ctrlTitle.querySelector('.dock-label-icon');
    ctrlTitle.textContent = '';
    if (icon) ctrlTitle.appendChild(icon);
    ctrlTitle.append(document.createTextNode(d.visual_presets));
  }

  const locTitle = document.querySelector('#location-bar-toggle .location-toolbar-label');
  if (locTitle) {
    const icon = locTitle.querySelector('.dock-label-icon');
    locTitle.textContent = '';
    if (icon) locTitle.appendChild(icon);
    locTitle.append(document.createTextNode(d.location));
  }

  const searchInput = document.getElementById('location-search');
  if (searchInput) searchInput.setAttribute('placeholder', d.search_placeholder);

  // Welcome modal
  const welcomeKicker = document.querySelector('.first-run-kicker');
  if (welcomeKicker) welcomeKicker.textContent = d.welcome_kicker;

  const welcomeDesc = document.getElementById('first-run-description');
  if (welcomeDesc) welcomeDesc.textContent = d.welcome_desc;

  const cContactsTitle = document.querySelector('[data-first-run-choice="contacts"] strong');
  const cContactsSub = document.querySelector('[data-first-run-choice="contacts"] small');
  if (cContactsTitle) cContactsTitle.textContent = d.m_contacts_title;
  if (cContactsSub) cContactsSub.textContent = d.m_contacts_sub;

  const cSpaceTitle = document.querySelector('[data-first-run-choice="space-missions"] strong');
  const cSpaceSub = document.querySelector('[data-first-run-choice="space-missions"] small');
  if (cSpaceTitle) cSpaceTitle.textContent = d.m_space_title;
  if (cSpaceSub) cSpaceSub.textContent = d.m_space_sub;

  const cEnvTitle = document.querySelector('[data-first-run-environmental-title]');
  const cEnvSub = document.querySelector('[data-first-run-choice="environmental"] small');
  if (cEnvTitle) cEnvTitle.textContent = d.m_env_title;
  if (cEnvSub) cEnvSub.textContent = d.m_env_sub;

  const cExploreTitle = document.querySelector('[data-first-run-choice="explore"] strong');
  const cExploreSub = document.querySelector('[data-first-run-choice="explore"] small');
  if (cExploreTitle) cExploreTitle.textContent = d.m_explore_title;
  if (cExploreSub) cExploreSub.textContent = d.m_explore_sub;

  const suppressLabel = document.querySelector('.first-run-suppress span');
  if (suppressLabel) suppressLabel.textContent = d.m_suppress;

  // Generic data-i18n replacements
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (d[key]) {
      if (typeof d[key] === 'string' && d[key].includes('<')) {
        el.innerHTML = d[key];
      } else {
        el.textContent = d[key];
      }
    }
  });
}

export function initNmLanguageAndGuide() {
  // Apply saved or default language
  applyLanguage(currentLang);

  // Toggle button listener
  const toggleBtn = document.getElementById('nm-lang-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextLang = currentLang === 'en' ? 'vi' : 'en';
      applyLanguage(nextLang);
    });
  }

  // Guide modal listeners
  const guideBtn = document.getElementById('nm-help-btn');
  const guideModal = document.getElementById('nm-guide-modal');

  if (guideBtn && guideModal) {
    guideBtn.addEventListener('click', () => {
      guideModal.removeAttribute('hidden');
      guideModal.classList.add('visible');
    });

    const closeGuide = () => {
      guideModal.classList.remove('visible');
      guideModal.setAttribute('hidden', '');
    };

    guideModal.querySelectorAll('[data-close-guide]').forEach((btn) => {
      btn.addEventListener('click', closeGuide);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !guideModal.hasAttribute('hidden')) {
        closeGuide();
      }
    });
  }
}
