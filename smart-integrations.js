// ── Smart Integrations: Appliance Control + Grocery Delivery ──
// Phase 5: Smart kitchen appliance links + online grocery ordering
// Depends on: currentUser, userPlan, showToast, I18n (app.js)

if (typeof _t === 'undefined') var _t = (ko, en) => (window.I18n && I18n.lang === 'en') ? en : ko;

// ══════════════════════════════════════════════════════════════
// 1. Smart Appliance Control
// ══════════════════════════════════════════════════════════════

const SMART_APPLIANCES = [
  { id: 'samsung_oven', name: 'Samsung Smart Oven', icon: '🔥', img: 'https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', brand: 'samsung',
    capabilities: ['temperature', 'timer', 'preheat', 'mode'] },
  { id: 'samsung_cooktop', name: 'Samsung Induction Cooktop', icon: '🍳', img: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', brand: 'samsung',
    capabilities: ['temperature', 'timer', 'power'] },
  { id: 'samsung_fridge', name: 'Samsung Family Hub', icon: '🧊', img: 'https://images.pexels.com/photos/2343467/pexels-photo-2343467.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', brand: 'samsung',
    capabilities: ['grocery_sync', 'meal_plan_display'] },
  { id: 'lg_oven', name: 'LG InstaView Oven', icon: '🔥', img: 'https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', brand: 'lg',
    capabilities: ['temperature', 'timer', 'preheat'] },
  { id: 'lg_cooktop', name: 'LG Induction Range', icon: '🍳', img: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', brand: 'lg',
    capabilities: ['temperature', 'timer'] },
  { id: 'balmuda_toaster', name: 'BALMUDA The Toaster', icon: '🍞', img: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', brand: 'balmuda',
    capabilities: ['temperature', 'timer', 'mode'] },
  { id: 'thermomix', name: 'Thermomix TM6', icon: '🥣', img: 'https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', brand: 'vorwerk',
    capabilities: ['temperature', 'timer', 'speed', 'mode'] },
  { id: 'instant_pot', name: 'Instant Pot', icon: '🥘', img: 'https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', brand: 'instant',
    capabilities: ['temperature', 'timer', 'pressure', 'mode'] },
  { id: 'anova_sous_vide', name: 'Anova Precision Cooker', icon: '♨️', img: 'https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', brand: 'anova',
    capabilities: ['temperature', 'timer'] },
  { id: 'june_oven', name: 'June Smart Oven', icon: '🔥', img: 'https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', brand: 'june',
    capabilities: ['temperature', 'timer', 'mode', 'camera'] },
];

let _connectedAppliances = [];
let _appliancePanelOpen = false;

function openAppliancePanel() {
  if (userPlan === 'free') {
    showToast(_t('Pro 플랜에서 스마트 가전 연동을 사용할 수 있습니다', 'Smart appliance integration is available on Pro plan'));
    return;
  }

  let overlay = document.getElementById('applianceOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'applianceOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:8000;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:16px';
    overlay.onclick = e => { if (e.target === overlay) closeAppliancePanel(); };
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
  _appliancePanelOpen = true;
  _loadConnectedAppliances();
  _renderAppliancePanel();
}

function closeAppliancePanel() {
  const overlay = document.getElementById('applianceOverlay');
  if (overlay) overlay.style.display = 'none';
  _appliancePanelOpen = false;
}

function _loadConnectedAppliances() {
  const stored = localStorage.getItem('mealcule_appliances');
  try { _connectedAppliances = stored ? JSON.parse(stored) : []; } catch(e) { _connectedAppliances = []; }
}

function _saveConnectedAppliances() {
  localStorage.setItem('mealcule_appliances', JSON.stringify(_connectedAppliances));
}

function _renderAppliancePanel() {
  const overlay = document.getElementById('applianceOverlay');
  if (!overlay) return;

  let html = `
    <div style="background:var(--bg-secondary);border-radius:16px;max-width:480px;width:100%;max-height:85vh;overflow-y:auto;padding:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:17px"><img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" alt="" style="width:16px;height:16px;vertical-align:middle;border-radius:3px;object-fit:cover;margin-right:4px"> ${_t('스마트 가전 연동', 'Smart Appliances')}</h3>
        <button onclick="closeAppliancePanel()" style="background:none;border:none;font-size:20px;cursor:pointer">&times;</button>
      </div>`;

  // Connected appliances
  if (_connectedAppliances.length > 0) {
    html += `<div style="margin-bottom:16px">
      <div style="font-size:13px;font-weight:600;margin-bottom:8px;color:var(--text)">${_t('연결된 기기', 'Connected Devices')}</div>`;
    _connectedAppliances.forEach(a => {
      const info = SMART_APPLIANCES.find(sa => sa.id === a.id) || a;
      const iconHtml = info.img
        ? `<img src="${info.img}" alt="${info.name}" style="width:28px;height:28px;border-radius:6px;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display=''">`
          + `<span style="font-size:24px;display:none">${info.icon}</span>`
        : `<span style="font-size:24px">${info.icon}</span>`;
      html += `<div style="display:flex;align-items:center;gap:10px;padding:10px;background:rgba(16,185,129,0.08);border-radius:10px;margin-bottom:6px">
        ${iconHtml}
        <div style="flex:1">
          <div style="font-weight:600;font-size:13px">${info.name}</div>
          <div style="font-size:11px;color:#10B981">● ${_t('연결됨', 'Connected')}</div>
        </div>
        <button onclick="_disconnectAppliance('${a.id}')" style="background:none;border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;color:var(--text-muted)">${_t('해제', 'Disconnect')}</button>
      </div>`;
    });
    html += `</div>`;
  }

  // Available appliances
  html += `<div style="font-size:13px;font-weight:600;margin-bottom:8px;color:var(--text)">${_t('연결 가능한 기기', 'Available Devices')}</div>
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">${_t(
      '스마트 가전을 연결하면 레시피의 온도/시간을 기기에 직접 전송할 수 있습니다.',
      'Connect smart appliances to send recipe temperature and timer settings directly to your device.'
    )}</p>`;

  const connected = new Set(_connectedAppliances.map(a => a.id));
  const available = SMART_APPLIANCES.filter(a => !connected.has(a.id));

  // Group by brand
  const brands = {};
  available.forEach(a => {
    if (!brands[a.brand]) brands[a.brand] = [];
    brands[a.brand].push(a);
  });

  Object.entries(brands).forEach(([brand, appliances]) => {
    html += `<div style="margin-bottom:12px">
      <div style="font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase;margin-bottom:6px">${brand}</div>`;
    appliances.forEach(a => {
      const aIconHtml = a.img
        ? `<img src="${a.img}" alt="${a.name}" style="width:24px;height:24px;border-radius:5px;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display=''">`
          + `<span style="font-size:20px;display:none">${a.icon}</span>`
        : `<span style="font-size:20px">${a.icon}</span>`;
      html += `<div style="display:flex;align-items:center;gap:10px;padding:8px;border:1px solid var(--border);border-radius:8px;margin-bottom:4px">
        ${aIconHtml}
        <div style="flex:1;font-size:13px">${a.name}</div>
        <button onclick="_connectAppliance('${a.id}')" style="padding:5px 12px;border:none;border-radius:6px;background:#10B981;color:#fff;font-size:12px;cursor:pointer;font-weight:600">${_t('연결', 'Connect')}</button>
      </div>`;
    });
    html += `</div>`;
  });

  html += `
      <div style="margin-top:16px;padding:12px;background:var(--card);border-radius:10px;font-size:12px;color:var(--text-muted)">
        <img src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=14&h=14&fit=crop" alt="" style="width:14px;height:14px;vertical-align:middle;border-radius:2px;object-fit:cover;margin-right:3px"> ${_t(
          '실제 가전 연동은 각 제조사의 API 키 설정이 필요합니다. 현재는 시뮬레이션 모드입니다.',
          'Actual appliance connection requires manufacturer API keys. Currently in simulation mode.'
        )}
      </div>
    </div>`;

  overlay.innerHTML = html;
}

function _connectAppliance(id) {
  const appliance = SMART_APPLIANCES.find(a => a.id === id);
  if (!appliance) return;
  _connectedAppliances.push({ id, connectedAt: new Date().toISOString() });
  _saveConnectedAppliances();
  _renderAppliancePanel();
  showToast(`${appliance.icon} ${appliance.name} ${_t('연결됨', 'connected')}`);
}

function _disconnectAppliance(id) {
  _connectedAppliances = _connectedAppliances.filter(a => a.id !== id);
  _saveConnectedAppliances();
  _renderAppliancePanel();
  showToast(_t('기기 연결이 해제되었습니다', 'Device disconnected'));
}

// Send cooking settings to a connected appliance (simulation)
function sendToAppliance(temp, timeMin, method) {
  if (_connectedAppliances.length === 0) {
    showToast(_t('연결된 가전이 없습니다', 'No connected appliances'));
    return;
  }

  const primary = _connectedAppliances[0];
  const info = SMART_APPLIANCES.find(a => a.id === primary.id);
  if (!info) return;

  // Build command based on capabilities
  const cmd = {};
  if (info.capabilities.includes('temperature') && temp) cmd.temperature = temp;
  if (info.capabilities.includes('timer') && timeMin) cmd.timer = timeMin;
  if (info.capabilities.includes('preheat') && temp > 100) cmd.preheat = true;

  // Simulate sending
  console.log(`[SmartAppliance] Sending to ${info.name}:`, cmd);
  showToast(`${info.icon} ${info.name}: ${temp ? temp + '°C' : ''} ${timeMin ? timeMin + 'min' : ''} ${_t('전송됨', 'sent')}`);

  return { appliance: info.name, command: cmd, status: 'simulated' };
}

// ══════════════════════════════════════════════════════════════
// 2. Grocery Delivery Integration
// ══════════════════════════════════════════════════════════════

const DELIVERY_SERVICES = [
  // Global
  { id: 'instacart', name: 'Instacart', icon: '🥕', img: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', region: 'us,ca', url: 'https://www.instacart.com/store/search_v3/search?term=' },
  { id: 'amazon_fresh', name: 'Amazon Fresh', icon: '📦', img: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', region: 'us,uk,de,jp', url: 'https://www.amazon.com/s?k=' },
  { id: 'walmart', name: 'Walmart Grocery', icon: '🛒', img: 'https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', region: 'us,ca', url: 'https://www.walmart.com/search?q=' },
  // Korea
  { id: 'coupang', name: 'Coupang', icon: '🚀', img: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', region: 'kr', url: 'https://www.coupang.com/np/search?q=' },
  { id: 'kurly', name: 'Market Kurly', icon: '💜', img: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', region: 'kr', url: 'https://www.kurly.com/search?sword=' },
  { id: 'ssg', name: 'SSG.COM', icon: '🧡', img: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', region: 'kr', url: 'https://www.ssg.com/search.ssg?query=' },
  // Japan
  { id: 'rakuten', name: 'Rakuten Seiyu', icon: '🏪', img: 'https://images.pexels.com/photos/1405717/pexels-photo-1405717.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', region: 'jp', url: 'https://sm.rakuten.co.jp/search?keyword=' },
  // UK/EU
  { id: 'ocado', name: 'Ocado', icon: '🟢', img: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', region: 'uk', url: 'https://www.ocado.com/search?entry=' },
  { id: 'tesco', name: 'Tesco', icon: '🔵', img: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', region: 'uk', url: 'https://www.tesco.com/groceries/en-GB/search?query=' },
  { id: 'rewe', name: 'REWE', icon: '🔴', img: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop', region: 'de', url: 'https://shop.rewe.de/productList?search=' },
];

let _preferredDelivery = null;

function openGroceryDelivery(groceryItems) {
  _preferredDelivery = localStorage.getItem('mealcule_delivery_service');
  const items = groceryItems || [];

  let overlay = document.getElementById('deliveryOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'deliveryOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:8500;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:16px';
    overlay.onclick = e => { if (e.target === overlay) overlay.style.display = 'none'; };
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';

  // Detect region from browser locale
  const locale = (navigator.language || 'en').toLowerCase();
  const regionMap = { ko: 'kr', ja: 'jp', 'en-gb': 'uk', de: 'de' };
  const region = regionMap[locale] || regionMap[locale.split('-')[0]] || 'us';
  const available = DELIVERY_SERVICES.filter(s => s.region.includes(region));
  const others = DELIVERY_SERVICES.filter(s => !s.region.includes(region));

  let html = `
    <div style="background:var(--bg-secondary);border-radius:16px;max-width:440px;width:100%;max-height:85vh;overflow-y:auto;padding:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:17px"><img src="https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" alt="" style="width:16px;height:16px;vertical-align:middle;border-radius:3px;object-fit:cover;margin-right:4px"> ${_t('온라인 장보기', 'Order Groceries Online')}</h3>
        <button onclick="document.getElementById('deliveryOverlay').style.display='none'" style="background:none;border:none;font-size:20px;cursor:pointer">&times;</button>
      </div>`;

  if (items.length > 0) {
    html += `<div style="font-size:13px;margin-bottom:12px;color:var(--text-secondary)">
      ${_t(`${items.length}개 항목을 배달 서비스에서 주문합니다`, `Order ${items.length} items from a delivery service`)}
    </div>`;
  }

  // Build search query from items
  const searchTerms = items.slice(0, 5).map(i => {
    const name = (I18n?.lang === 'en' && i.ingredient_name_en) ? i.ingredient_name_en : i.ingredient_name;
    return name;
  }).join(' ');

  html += `<div style="font-size:13px;font-weight:600;margin-bottom:8px;color:var(--text)">${_t('추천 서비스', 'Recommended')}</div>`;
  available.forEach(s => {
    const isPreferred = _preferredDelivery === s.id;
    html += _renderDeliveryCard(s, searchTerms, isPreferred);
  });

  if (others.length > 0) {
    html += `<div style="font-size:13px;font-weight:600;margin:12px 0 8px;color:var(--text-muted)">${_t('기타 서비스', 'Other Services')}</div>`;
    others.slice(0, 4).forEach(s => {
      html += _renderDeliveryCard(s, searchTerms, false);
    });
  }

  html += `</div>`;
  overlay.innerHTML = html;
}

function _renderDeliveryCard(service, searchTerms, isPreferred) {
  const encodedSearch = encodeURIComponent(searchTerms);
  const fullUrl = service.url + encodedSearch;
  const svcIconHtml = service.img
    ? `<img src="${service.img}" alt="${service.name}" style="width:24px;height:24px;border-radius:5px;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display=''">`
      + `<span style="font-size:24px;display:none">${service.icon}</span>`
    : `<span style="font-size:24px">${service.icon}</span>`;
  return `<div style="display:flex;align-items:center;gap:10px;padding:10px;border:1px solid ${isPreferred ? '#10B981' : 'rgba(255,255,255,0.08)'};border-radius:10px;margin-bottom:6px;${isPreferred ? 'background:rgba(16,185,129,0.08);' : ''}">
    ${svcIconHtml}
    <div style="flex:1">
      <div style="font-weight:600;font-size:13px">${service.name}</div>
      ${isPreferred ? `<div style="font-size:10px;color:#10B981">★ ${_t('기본 서비스', 'Preferred')}</div>` : ''}
    </div>
    <div style="display:flex;gap:4px">
      <button onclick="_setPreferredDelivery('${service.id}')" style="background:none;border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:10px;cursor:pointer;color:var(--text-muted)" title="${_t('기본 설정', 'Set preferred')}">★</button>
      <a href="${fullUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="padding:5px 14px;border:none;border-radius:6px;background:#10B981;color:#fff;font-size:12px;cursor:pointer;font-weight:600;text-decoration:none;display:inline-block">${_t('주문', 'Order')}</a>
    </div>
  </div>`;
}

function _setPreferredDelivery(id) {
  _preferredDelivery = id;
  localStorage.setItem('mealcule_delivery_service', id);
  showToast(_t('기본 배달 서비스가 설정되었습니다', 'Preferred delivery service set'));
  // Re-render
  const overlay = document.getElementById('deliveryOverlay');
  if (overlay?.style.display === 'flex') {
    openGroceryDelivery([]);
  }
}

// Quick order from grocery list
function orderGroceryItems(items) {
  if (!items?.length) {
    showToast(_t('주문할 항목이 없습니다', 'No items to order'));
    return;
  }
  if (_preferredDelivery) {
    const service = DELIVERY_SERVICES.find(s => s.id === _preferredDelivery);
    if (service) {
      const searchTerms = items.slice(0, 8).map(i => {
        return (I18n?.lang === 'en' && i.ingredient_name_en) ? i.ingredient_name_en : i.ingredient_name;
      }).join(' ');
      window.open(service.url + encodeURIComponent(searchTerms), '_blank');
      return;
    }
  }
  openGroceryDelivery(items);
}

// ══════════════════════════════════════════════════════════════
// 3. Init
// ══════════════════════════════════════════════════════════════

function initSmartIntegrations() {
  _loadConnectedAppliances();
  _preferredDelivery = localStorage.getItem('mealcule_delivery_service');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSmartIntegrations);
} else {
  initSmartIntegrations();
}
