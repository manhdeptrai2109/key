// =============================================
// TAO TAI KHOAN MAC DINH
// =============================================
var defaultUsers = [
  { name: "admin", password: "123" }
];

// =============================================
// DU LIEU SAN PHAM (PHAN LOAI THEO THU MUC)
// =============================================
var products = [
  // === ĐỊNH VỊ (thư mục images/dinhvi/) ===
  { id: 1, name: "Định vị nhân vật 2 lớp trắng xanh - Filza (anti band)", price: 25000, image: "images/dinhvi/dvitrangxanh.jpg", category: "dinhvi" },
  { id: 2, name: "Định vị nhân vật 2 lớp hồng cam - Filza (anti band)", price: 25000, image: "images/dinhvi/dvihongcam.jpg", category: "dinhvi" },
  { id: 3, name: "Định vị nhân vật trắng - Filza (anti band)", price: 20000, image: "images/dinhvi/dvitrang.jpg", category: "dinhvi" },
  { id: 4, name: "Định vị nhân vật đỏ - Filza (anti band)", price: 20000, image: "images/dinhvi/dvido.jpg", category: "dinhvi" },
  { id: 5, name: "Định vị nhân vật xanh nước - Filza (anti band)", price: 20000, image: "images/dinhvi/dvixanhnuoc.jpg", category: "dinhvi" },
  { id: 6, name: "Định vị nhân vật xanh lá - Filza (anti band)", price: 20000, image: "images/dinhvi/dvixanhla.jpg", category: "dinhvi" },
  { id: 7, name: "Định vị nhân vật vàng - Filza (anti band)", price: 20000, image: "images/dinhvi/dvivang.jpg", category: "dinhvi" },
  
  // === FILE AIM (thư mục images/aim/) ===
  { id: 8, name: "File nhẹ tâm - Filza (cân rank)", price: 30000, image: "images/aim/nhetam.jpg", category: "fileaim", fileUrl: "https://www.mediafire.com/file/lufmc3gukni1681/nh%e1%ba%b9+t%c3%a2m+By+TManh+ios.zip/file" },
  { id: 9, name: "File AIM Config V2 - Pro Settings", price: 20000, image: "images/aim/file aim v2.jpg", category: "fileaim" },
  { id: 10, name: "File AIM Config V3 - Aimbot Extreme", price: 25000, image: "images/aim/file aim v3.jpg", category: "fileaim" },
  
  // === MOD (thư mục images/mod/) ===
  { id: 11, name: "Mod M1887 Rồng Ender - Full Effects", price: 5000, image: "images/mod/modm1887ender.jpg", category: "mod" },
  { id: 12, name: "Mod Skin Ninja - Legendary", price: 8000, image: "images/mod/mod skin ninja.jpg", category: "mod" },
  { id: 13, name: "Mod Skin Samurai - Epic", price: 10000, image: "images/mod/mod skin samurai.jpg", category: "mod" }
];

function $(id) { return document.getElementById(id); }
function money(n) { return n.toLocaleString("vi-VN") + "đ"; }

function getProduct(id) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) return products[i];
  }
  return null;
}

// =============================================
// HE THONG SO DU
// =============================================

function getUserBalance(username) {
  var data = localStorage.getItem("shopCuaManhBalance_" + username);
  return data ? parseInt(data) : 0;
}

function setUserBalance(username, amount) {
  localStorage.setItem("shopCuaManhBalance_" + username, String(amount));
}

function addUserBalance(username, amount) {
  var current = getUserBalance(username);
  var newBalance = current + amount;
  setUserBalance(username, newBalance);
  return newBalance;
}

// =============================================
// TAO MA NAP TIEN (TManhios-XXXXXX)
// =============================================

function generateRechargeCode() {
  var randomNum = Math.floor(Math.random() * 1000000).toString();
  while (randomNum.length < 6) randomNum = "0" + randomNum;
  return "TManhios-" + randomNum;
}

// =============================================
// QUAN LY MA NAP (TU DONG HET HAN SAU 10 PHUT)
// =============================================

function savePendingCode(code, amount) {
  var pending = getPendingCodes();
  var newPending = [];
  for (var i = 0; i < pending.length; i++) {
    if (pending[i].code !== code) {
      newPending.push(pending[i]);
    }
  }
  newPending.push({
    code: code,
    amount: amount,
    time: Date.now()
  });
  localStorage.setItem("pendingRechargeCodes", JSON.stringify(newPending));
}

function getPendingCodes() {
  var data = localStorage.getItem("pendingRechargeCodes");
  if (data) {
    try { return JSON.parse(data); } catch(e) { return []; }
  }
  return [];
}

function cleanExpiredCodes() {
  var pending = getPendingCodes();
  var now = Date.now();
  var newPending = [];
  for (var i = 0; i < pending.length; i++) {
    if (now - pending[i].time < 600000) {
      newPending.push(pending[i]);
    }
  }
  if (newPending.length !== pending.length) {
    localStorage.setItem("pendingRechargeCodes", JSON.stringify(newPending));
  }
  return newPending;
}

function isCodeValid(code) {
  cleanExpiredCodes();
  var pending = getPendingCodes();
  for (var i = 0; i < pending.length; i++) {
    if (pending[i].code === code) {
      return true;
    }
  }
  return false;
}

function removePendingCode(code) {
  var pending = getPendingCodes();
  var newPending = [];
  for (var i = 0; i < pending.length; i++) {
    if (pending[i].code !== code) {
      newPending.push(pending[i]);
    }
  }
  localStorage.setItem("pendingRechargeCodes", JSON.stringify(newPending));
}

// =============================================
// QUAN LY YEU CAU NAP CHO DUYET
// =============================================

function getPendingApprovals() {
  var data = localStorage.getItem('pendingApprovals');
  if (data) {
    try { return JSON.parse(data); } catch(e) { return []; }
  }
  return [];
}

function savePendingApprovals(approvals) {
  localStorage.setItem('pendingApprovals', JSON.stringify(approvals));
}

// =============================================
// CHUC NANG DUYET TIEN CHO ADMIN
// =============================================

function showAdminPendingList() {
  var pending = getPendingApprovals();
  
  if (pending.length === 0) {
    showPopup("Quản lý nạp tiền", "Hiện không có yêu cầu nạp tiền nào đang chờ duyệt.", "success");
    return;
  }

  var html = '<div style="text-align:left;max-height:380px;overflow-y:auto;padding-right:5px;">';
  
  for (var i = 0; i < pending.length; i++) {
    var req = pending[i];
    html += '<div style="background:#06082a;padding:12px;margin-bottom:10px;border-radius:10px;border:1px solid #4e3aa2;">';
    html += '<p style="margin:2px 0;color:#fff;font-size:14px;">👤 <b>Khách hàng:</b> ' + escapeHtml(req.username) + '</p>';
    html += '<p style="margin:2px 0;color:#ff59e8;font-size:14px;">💰 <b>Số tiền:</b> ' + money(req.amount) + '</p>';
    html += '<p style="margin:2px 0;color:#ffd43b;font-size:14px;">📌 <b>Mã GD:</b> ' + escapeHtml(req.code) + '</p>';
    html += '<p style="margin:2px 0;color:#888;font-size:12px;">⏰ <b>Thời gian:</b> ' + req.time + '</p>';
    html += '<div style="display:flex;gap:8px;margin-top:10px;">';
    html += '<button onclick="approveRecharge(\'' + req.code + '\')" style="flex:1;padding:8px;background:#16a34a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;">✅ Duyệt cộng tiền</button>';
    html += '<button onclick="rejectRecharge(\'' + req.code + '\')" style="flex:1;padding:8px;background:#dc2626;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;">❌ Từ chối</button>';
    html += '</div></div>';
  }
  
  html += '</div>';

  showPopup("📥 Danh sách chờ duyệt", html, "info");
}

function approveRecharge(code) {
  var pending = getPendingApprovals();
  var reqIndex = -1;
  
  for (var i = 0; i < pending.length; i++) {
    if (pending[i].code === code) {
      reqIndex = i;
      break;
    }
  }

  if (reqIndex === -1) {
    showPopup("Lỗi", "Không tìm thấy giao dịch này!", "error");
    return;
  }

  var req = pending[reqIndex];

  // 1. Cộng tiền cho khách
  addUserBalance(req.username, req.amount);

  // 2. Lưu lịch sử nạp
  var history = getRechargeHistory();
  history.push({
    username: req.username,
    amount: req.amount,
    code: req.code,
    time: new Date().toLocaleString('vi-VN'),
    type: 'recharge'
  });
  saveRechargeHistory(history);

  // 3. Xóa yêu cầu khỏi danh sách chờ
  pending.splice(reqIndex, 1);
  savePendingApprovals(pending);

  // 4. Thông báo kết quả
  showPopup("Thành công 🎉", "Đã cộng <b>" + money(req.amount) + "</b> cho <b>" + escapeHtml(req.username) + "</b>", "success", function() {
    updateBalanceUI();
    showAdminPendingList();
  });
}

function rejectRecharge(code) {
  var pending = getPendingApprovals();
  var newPending = pending.filter(function(item) { return item.code !== code; });
  
  savePendingApprovals(newPending);
  showPopup("Đã từ chối", "Đã xóa yêu cầu nạp tiền mã " + escapeHtml(code), "success", function() {
    showAdminPendingList();
  });
}

// =============================================
// LICH SU NAP TIEN
// =============================================

function getRechargeHistory() {
  var data = localStorage.getItem('rechargeHistory');
  if (data) {
    try { return JSON.parse(data); } catch(e) { return []; }
  }
  return [];
}

function saveRechargeHistory(history) {
  localStorage.setItem('rechargeHistory', JSON.stringify(history));
}

// =============================================
// POPUP HTML
// =============================================

function showPopup(title, message, type, callback) {
  var oldPopup = document.querySelector(".custom-popup-overlay");
  if (oldPopup) document.body.removeChild(oldPopup);

  var overlay = document.createElement("div");
  overlay.className = "custom-popup-overlay";
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    backdrop-filter: blur(8px);
    animation: popupFadeIn 0.3s ease;
  `;

  var modal = document.createElement("div");
  modal.style.cssText = `
    background: linear-gradient(145deg, #0b0d3b, #03051d);
    border: 1px solid #833cff;
    border-radius: 20px;
    padding: 30px 28px;
    max-width: 480px;
    width: 92%;
    text-align: center;
    box-shadow: 0 0 50px rgba(112,30,255,0.5);
    animation: popupScaleIn 0.3s ease;
    max-height: 90vh;
    overflow-y: auto;
  `;

  var icon = type === "success" ? "✅" : type === "error" ? "❌" : "🛒";

  modal.innerHTML = `
    <div style="font-size:48px;margin-bottom:8px;">${icon}</div>
    <h2 style="color:white;margin:0 0 6px;font-size:20px;">${title}</h2>
    <div style="color:#b0b8e0;margin:0 0 20px;font-size:15px;line-height:1.5;">${message}</div>
    <div id="popup-buttons" style="display:flex;gap:12px;justify-content:center;"></div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  var btnContainer = modal.querySelector("#popup-buttons");

  if (type === "confirm") {
    var cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Hủy bỏ";
    cancelBtn.style.cssText = `
      flex:1;
      padding:10px 20px;
      background:transparent;
      border:1px solid #6a3fff;
      border-radius:12px;
      color:#b0b8e0;
      font-size:15px;
      font-weight:bold;
      cursor:pointer;
      transition:0.3s;
    `;
    cancelBtn.onclick = function() {
      document.body.removeChild(overlay);
      if (callback) callback(false);
    };

    var okBtn = document.createElement("button");
    okBtn.textContent = "Xác nhận";
    okBtn.style.cssText = `
      flex:1;
      padding:10px 20px;
      background:linear-gradient(135deg,#16a34a,#15803d);
      border:none;
      border-radius:12px;
      color:white;
      font-size:15px;
      font-weight:bold;
      cursor:pointer;
      transition:0.3s;
    `;
    okBtn.onclick = function() {
      document.body.removeChild(overlay);
      if (callback) callback(true);
    };

    btnContainer.appendChild(cancelBtn);
    btnContainer.appendChild(okBtn);
  } else {
    var okBtn = document.createElement("button");
    okBtn.textContent = "OK";
    okBtn.style.cssText = `
      padding:10px 40px;
      background:linear-gradient(135deg,#6a3fff,#a855f7);
      border:none;
      border-radius:12px;
      color:white;
      font-size:15px;
      font-weight:bold;
      cursor:pointer;
      transition:0.3s;
    `;
    okBtn.onclick = function() {
      document.body.removeChild(overlay);
      if (callback) callback();
    };

    btnContainer.appendChild(okBtn);
  }
}

// =============================================
// XEM LICH SU GIAO DICH
// =============================================

function getUserHistory() {
  var user = currentUser();
  if (!user) {
    showPopup("Thông báo", "Vui lòng đăng nhập!", "error");
    return;
  }

  var history = getRechargeHistory();
  var userHistory = [];
  
  for (var i = 0; i < history.length; i++) {
    if (history[i].username === user.name) {
      userHistory.push(history[i]);
    }
  }

  if (userHistory.length === 0) {
    showPopup("📋 Lịch sử giao dịch", "Bạn chưa có lịch sử giao dịch nào.", "success");
    return;
  }

  var html = '<div style="text-align:left;max-height:350px;overflow-y:auto;">';
  for (var i = userHistory.length - 1; i >= 0; i--) {
    var h = userHistory[i];
    var isRemove = h.type === 'remove';
    var sign = isRemove ? '' : '+';
    var color = isRemove ? '#ff6b6b' : '#51cf66';
    var label = isRemove ? 'Trừ tiền' : 'Nạp tiền';
    
    html += '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #1a1a4a;font-size:14px;">';
    html += '<span style="color:#888;font-size:12px;">' + h.time + '</span>';
    html += '<span style="color:' + color + ';">' + sign + money(Math.abs(h.amount)) + '</span>';
    html += '<span style="color:#888;font-size:11px;">' + escapeHtml(h.code || '') + '</span>';
    html += '<span style="font-size:11px;color:#666;">' + label + '</span>';
    html += '</div>';
  }
  html += '</div>';

  showPopup("📋 Lịch sử giao dịch", html, "success");
}

// =============================================
// ESCAPE HTML
// =============================================

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, function(c) {
    if (c === "&") return "&amp;";
    if (c === "<") return "&lt;";
    if (c === ">") return "&gt;";
    if (c === '"') return "&quot;";
    if (c === "'") return "&#039;";
    return c;
  });
}

// =============================================
// LOC SAN PHAM THEO DANH MUC
// =============================================

var currentCategory = 'all';

function filterProducts(category) {
  currentCategory = category;
  
  var tabs = document.querySelectorAll('.category-tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
    if (tabs[i].getAttribute('data-category') === category) {
      tabs[i].classList.add('active');
    }
  }
  
  var filtered = [];
  if (category === 'all') {
    filtered = products;
  } else {
    for (var i = 0; i < products.length; i++) {
      if (products[i].category === category) {
        filtered.push(products[i]);
      }
    }
  }
  
  renderProducts(filtered);
}

// =============================================
// HIEN THI SAN PHAM
// =============================================

function productCard(p) {
  return '<article class="product-card">' +
    '<img class="product-image" src="' + p.image + '" alt="' + escapeHtml(p.name) + '" onerror="this.style.opacity=\'.15\';">' +
    '<div class="product-info">' +
      '<h3 class="product-name">' + escapeHtml(p.name) + '</h3>' +
      '<div class="price">' + money(p.price) + '</div>' +
      '<button class="gradient-btn" onclick="buyNow(' + p.id + ')">Mua</button>' +
    '</div>' +
  '</article>';
}

function renderProducts(list) {
  if (!list) list = products;
  var grid = $("productGrid");
  if (!grid) return;
  
  if (list.length === 0) {
    grid.innerHTML = '';
    var noProducts = $("noProducts");
    if (noProducts) noProducts.hidden = false;
    return;
  }
  
  var html = "";
  for (var i = 0; i < list.length; i++) {
    html += productCard(list[i]);
  }
  grid.innerHTML = html;
  
  var noProducts = $("noProducts");
  if (noProducts) noProducts.hidden = true;
}

// =============================================
// TIM KIEM SAN PHAM
// =============================================

function searchProducts() {
  var input = $("searchInput");
  if (!input) return;
  var q = input.value.trim().toLowerCase();
  var result = [];
  
  for (var i = 0; i < products.length; i++) {
    var matchCategory = (currentCategory === 'all' || products[i].category === currentCategory);
    var matchName = products[i].name.toLowerCase().includes(q);
    if (matchCategory && matchName) {
      result.push(products[i]);
    }
  }
  
  renderProducts(result);
}

// =============================================
// MUA NGAY
// =============================================

function buyNow(productId) {
  var user = currentUser();
  if (!user) {
    showPopup("Thông báo", "Vui lòng đăng nhập để mua hàng!", "error", function() {
      openLogin();
    });
    return;
  }

  var product = getProduct(productId);
  if (!product) return;

  var balance = getUserBalance(user.name);
  if (balance < product.price) {
    showPopup(
      "⚠️ Số dư không đủ!",
      "Bạn cần <strong style='color:#ff59e8;'>" + money(product.price) + "</strong> để mua sản phẩm này.<br>💰 Số dư hiện tại: <strong style='color:#51cf66;'>" + money(balance) + "</strong>",
      "error"
    );
    return;
  }

  showPopup(
    "Xác nhận mua hàng",
    "Bạn có chắc muốn mua <strong>" + escapeHtml(product.name) + "</strong> giá <strong style='color:#ff59e8;'>" + money(product.price) + "</strong>?",
    "confirm",
    function(result) {
      if (result) {
        var newBalance = balance - product.price;
        setUserBalance(user.name, newBalance);
        updateBalanceUI();
        
        showPopup(
          "🎉 Mua hàng thành công!",
          "Đã thanh toán thành công!<br>📥 Nhấn OK để tải file.",
          "success",
          function() {
            if (product.fileUrl) {
              window.open(product.fileUrl, '_blank');
            } else {
              showPopup("Thông báo", "Sản phẩm chưa có file liên kết. Vui lòng liên hệ Admin!", "error");
            }
          }
        );
      }
    }
  );
}

// =============================================
// POPUP NAP TIEN (GIAO DIEN THANH TOAN)
// =============================================

function showRechargePopup(rechargeCode, amount) {
  var oldPopup = document.querySelector(".custom-popup-overlay");
  if (oldPopup) document.body.removeChild(oldPopup);

  var overlay = document.createElement("div");
  overlay.className = "custom-popup-overlay";
  overlay.style.cssText = `
    position: fixed; inset: 0; background: rgba(0,0,0,0.85);
    display: flex; justify-content: center; align-items: center;
    z-index: 99999; backdrop-filter: blur(10px);
  `;

  var modal = document.createElement("div");
  modal.style.cssText = `
    background: linear-gradient(145deg, #0b0d3b, #03051d);
    border: 1px solid #833cff; border-radius: 20px;
    padding: 22px; max-width: 420px; width: 94%; text-align: center;
  `;

  modal.innerHTML = `
    <div style="font-size:36px;margin-bottom:4px;">💰</div>
    <h2 style="color:white;margin:0 0 3px;font-size:19px;">Nạp tiền vào ví</h2>
    <p style="color:#b0b8e0;margin:0 0 14px;font-size:13px;">Quét mã QR để chuyển khoản</p>

    <div style="background:#06082a;padding:14px;border-radius:12px;border:1px solid #4e3aa2;margin-bottom:14px;">
      <img src="images/manganhang.jpg" alt="Mã QR" style="width:100%;max-width:200px;border-radius:10px;display:block;margin:0 auto;">
    </div>

    <div style="margin:0 0 12px;text-align:left;background:#06082a;padding:12px;border-radius:12px;border:1px solid #4e3aa2;font-size:13px;color:#b0b8e0;">
      <p style="margin:2px 0;">💳 <b>Ngân hàng:</b> MB Bank</p>
      <p style="margin:2px 0;">🔢 <b>STK:</b> 08122261152109</p>
      <p style="margin:2px 0;">👤 <b>Chủ TK:</b> PHAM TIEN MANH</p>
      <p style="margin:2px 0;">💰 <b>Số tiền:</b> <span style="color:#ff59e8;font-size:16px;font-weight:bold;">${money(amount)}</span></p>
    </div>

    <div style="margin:0 0 14px;padding:12px;background:#fff3cd;border-radius:12px;border:2px solid #ffc107;">
      <p style="color:#856404;font-weight:bold;margin:0 0 4px;font-size:13px;">📌 Nội dung chuyển khoản:</p>
      <p style="font-size:18px;font-weight:bold;color:#d63384;margin:0;">${rechargeCode}</p>
    </div>

    <button onclick="copyContent('${rechargeCode}')" style="width:100%;padding:10px;background:#0d6efd;color:white;border:none;border-radius:12px;font-weight:bold;cursor:pointer;margin-bottom:8px;">
      📋 Copy nội dung CK
    </button>
    <button onclick="completeRecharge('${rechargeCode}', ${amount})" style="width:100%;padding:12px;background:#16a34a;color:white;border:none;border-radius:12px;font-size:15px;font-weight:bold;cursor:pointer;">
      ✅ Tôi đã chuyển khoản
    </button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function copyContent(text) {
  navigator.clipboard.writeText(text).then(function() {
    showPopup("✅ Đã copy!", "Nội dung chuyển khoản đã được chép.", "success");
  });
}

// =============================================
// XAC NHAN NAP TIEN (GUI YEU CAU TOI ADMIN)
// =============================================

function completeRecharge(rechargeCode, amount) {
  var user = currentUser();
  if (!user) return;

  if (!isCodeValid(rechargeCode)) {
    showPopup("⚠️ Mã đã hết hạn!", "Mã nạp tiền đã hết hiệu lực. Vui lòng tạo mã mới.", "error");
    return;
  }

  var overlay = document.querySelector(".custom-popup-overlay");
  if (overlay) document.body.removeChild(overlay);

  var pendingApprovals = getPendingApprovals();
  pendingApprovals.push({
    code: rechargeCode,
    username: user.name,
    amount: amount,
    time: new Date().toLocaleString('vi-VN'),
    status: 'pending'
  });
  savePendingApprovals(pendingApprovals);

  showPopup(
    "⏳ Đã gửi yêu cầu!",
    "Yêu cầu nạp <b>" + money(amount) + "</b> với mã <b>" + rechargeCode + "</b> đã được gửi.<br>Vui lòng chờ Admin xác nhận!",
    "success"
  );
}

// =============================================
// HE THONG DANG NHAP / DANG KY
// =============================================

function initUsers() {
  if (!localStorage.getItem("shopCuaManhUsers")) {
    localStorage.setItem("shopCuaManhUsers", JSON.stringify(defaultUsers));
  }
}

function getUsers() {
  var data = localStorage.getItem("shopCuaManhUsers");
  if (data) {
    try { return JSON.parse(data); } catch(e) { return []; }
  }
  return [];
}

function saveUsers(users) {
  localStorage.setItem("shopCuaManhUsers", JSON.stringify(users));
}

function currentUser() {
  var data = localStorage.getItem("shopCuaManhCurrentUser");
  if (data) {
    try { return JSON.parse(data); } catch(e) { return null; }
  }
  return null;
}

function setCurrentUser(user) {
  localStorage.setItem("shopCuaManhCurrentUser", JSON.stringify(user));
}

function removeCurrentUser() {
  localStorage.removeItem("shopCuaManhCurrentUser");
}

function updateBalanceUI() {
  var balanceEl = document.getElementById("userBalance");
  var user = currentUser();
  if (balanceEl && user) {
    balanceEl.textContent = money(getUserBalance(user.name));
    balanceEl.style.display = "inline";
  } else if (balanceEl) {
    balanceEl.style.display = "none";
  }
}

function recharge() {
  var user = currentUser();
  if (!user) {
    showPopup("Thông báo", "Vui lòng đăng nhập để nạp tiền!", "error", function() { openLogin(); });
    return;
  }
  showRechargeOptions();
}

function showRechargeOptions() {
  var amounts = [10000, 20000, 50000, 100000, 200000, 500000];
  var overlay = document.createElement("div");
  overlay.className = "custom-popup-overlay";
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;justify-content:center;align-items:center;z-index:99999;";

  var modal = document.createElement("div");
  modal.style.cssText = "background:#0b0d3b;border:1px solid #833cff;border-radius:20px;padding:24px;max-width:420px;width:92%;text-align:center;";

  var html = '<h2 style="color:white;margin-bottom:12px;">Chọn số tiền nạp</h2>';
  html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;">';
  for (var i = 0; i < amounts.length; i++) {
    html += '<button onclick="selectRechargeAmount(' + amounts[i] + ')" style="padding:12px;background:#6a3fff;border:none;border-radius:12px;color:white;font-weight:bold;cursor:pointer;">' + money(amounts[i]) + '</button>';
  }
  html += '</div>';

  modal.innerHTML = html;
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  overlay.onclick = function(e) { if (e.target === overlay) document.body.removeChild(overlay); };
}

function selectRechargeAmount(amount) {
  var overlay = document.querySelector(".custom-popup-overlay");
  if (overlay) document.body.removeChild(overlay);

  cleanExpiredCodes();
  var rechargeCode = generateRechargeCode();
  savePendingCode(rechargeCode, amount);
  showRechargePopup(rechargeCode, amount);
}

// =============================================
// XU LY UI AUTHCATION & FORM
// =============================================

var loginModal = $("loginModal");
var openLoginBtn = $("openLoginBtn");
var closeLoginBtn = $("closeLoginBtn");
var closeLoginBackdrop = $("closeLoginBackdrop");
var authForm = $("authForm");
var authTitle = $("authTitle");
var authSubtitle = $("authSubtitle");
var authSubmit = $("authSubmit");
var switchAuthBtn = $("switchAuthBtn");
var loginFields = $("loginFields");
var registerFields = $("registerFields");
var loginNameInput = $("loginNameInput");
var loginPasswordInput = $("loginPasswordInput");
var registerNameInput = $("registerNameInput");
var registerPasswordInput = $("registerPasswordInput");
var registerConfirmInput = $("registerConfirmInput");
var authMessage = $("authMessage");
var loginLabel = $("loginLabel");
var logoutBtn = $("logoutBtn");

var registerMode = false;

function updateAuthFieldsState() {
  if (!loginNameInput) return;
  loginNameInput.disabled = registerMode;
  loginPasswordInput.disabled = registerMode;
  registerNameInput.disabled = !registerMode;
  registerPasswordInput.disabled = !registerMode;
  registerConfirmInput.disabled = !registerMode;
}

function openLogin() {
  if (!loginModal) return;
  var user = currentUser();
  if (user) {
    authForm.hidden = true;
    if (switchAuthBtn) switchAuthBtn.hidden = true;
    if (logoutBtn) logoutBtn.hidden = false;
    loginFields.hidden = true;
    registerFields.hidden = true;
    authMessage.textContent = "Xin chào: " + user.name;
    authMessage.style.color = "#ffd43b";
  } else {
    authForm.hidden = false;
    if (switchAuthBtn) switchAuthBtn.hidden = false;
    if (logoutBtn) logoutBtn.hidden = true;
    loginFields.hidden = registerMode;
    registerFields.hidden = !registerMode;
    authMessage.textContent = "";
  }
  loginModal.classList.add("open");
}

function closeLogin() {
  if (!loginModal) return;
  loginModal.classList.remove("open");
  if (authMessage) authMessage.textContent = "";
  if (authForm) {
    authForm.hidden = false;
    authForm.reset();
  }
  if (switchAuthBtn) switchAuthBtn.hidden = false;
  if (logoutBtn) logoutBtn.hidden = true;
  updateAuthFieldsState();
}

function updateAuthUI() {
  var user = currentUser();

  if (loginLabel) loginLabel.textContent = user ? user.name : "Đăng nhập";
  if (authTitle) authTitle.textContent = registerMode ? "Tạo tài khoản" : "Đăng nhập";
  if (authSubmit) authSubmit.textContent = registerMode ? "Đăng ký" : "Đăng nhập";
  if (loginFields) loginFields.hidden = registerMode;
  if (registerFields) registerFields.hidden = !registerMode;
  
  if (switchAuthBtn) {
    switchAuthBtn.innerHTML = registerMode ? 'Đã có tài khoản? <b>Đăng nhập</b>' : 'Chưa có tài khoản? <b>Đăng ký</b>';
  }

  updateAuthFieldsState();
  updateBalanceUI();
}

if (openLoginBtn) openLoginBtn.addEventListener("click", openLogin);
if (closeLoginBtn) closeLoginBtn.addEventListener("click", closeLogin);
if (closeLoginBackdrop) closeLoginBackdrop.addEventListener("click", closeLogin);

if (switchAuthBtn) {
  switchAuthBtn.addEventListener("click", function() {
    registerMode = !registerMode;
    authMessage.textContent = "";
    authForm.hidden = false;
    if (logoutBtn) logoutBtn.hidden = true;
    authForm.reset();
    updateAuthUI();
  });
}

if (authForm) {
  authForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (registerMode) {
      var name = registerNameInput.value.trim();
      var password = registerPasswordInput.value;
      var confirm = registerConfirmInput.value;

      if (!name || !password || !confirm) {
        authMessage.textContent = "Vui lòng nhập đầy đủ thông tin.";
        authMessage.style.color = "#ff6b6b";
        return;
      }
      if (password !== confirm) {
        authMessage.textContent = "Mật khẩu không khớp!";
        authMessage.style.color = "#ff6b6b";
        return;
      }

      var users = getUsers();
      for (var i = 0; i < users.length; i++) {
        if (users[i].name.toLowerCase() === name.toLowerCase()) {
          authMessage.textContent = "Tên tài khoản này đã tồn tại.";
          authMessage.style.color = "#ff6b6b";
          return;
        }
      }

      users.push({ name: name, password: password });
      saveUsers(users);
      setUserBalance(name, 0);

      registerMode = false;
      authMessage.textContent = "Đăng ký thành công! Vui lòng đăng nhập.";
      authMessage.style.color = "#51cf66";
      updateAuthUI();
    } else {
      var name = loginNameInput.value.trim();
      var password = loginPasswordInput.value;

      var users = getUsers();
      var user = null;
      for (var i = 0; i < users.length; i++) {
        if (users[i].name.toLowerCase() === name.toLowerCase() && users[i].password === password) {
          user = users[i];
          break;
        }
      }

      if (!user) {
        authMessage.textContent = "Sai tên đăng nhập hoặc mật khẩu.";
        authMessage.style.color = "#ff6b6b";
        return;
      }

      setCurrentUser({ name: user.name });
      updateAuthUI();
      closeLogin();
      showPopup("Thành công", "Chào mừng " + user.name + " đã đăng nhập!", "success");
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", function() {
    removeCurrentUser();
    updateAuthUI();
    closeLogin();
    showPopup("Thông báo", "Đã đăng xuất thành công!", "success");
  });
}

// =============================================
// NOIDUNG HEADER DANG BUTTONS
// =============================================

function addNavButtons() {
  var navActions = document.querySelector(".nav-actions");
  if (!navActions) return;

  if (document.getElementById("rechargeBtn")) return;

  var balanceSpan = document.createElement("span");
  balanceSpan.id = "userBalance";
  balanceSpan.style.cssText = "color:#51cf66;font-weight:bold;font-size:13px;margin-right:6px;display:none;";

  var rechargeBtn = document.createElement("button");
  rechargeBtn.className = "login-top";
  rechargeBtn.id = "rechargeBtn";
  rechargeBtn.innerHTML = '💰 Nạp tiền';
  rechargeBtn.onclick = recharge;

  var historyBtn = document.createElement("button");
  historyBtn.className = "login-top";
  historyBtn.id = "historyBtn";
  historyBtn.innerHTML = '📋 Lịch sử';
  historyBtn.onclick = getUserHistory;

  var adminBtn = document.createElement("button");
  adminBtn.className = "login-top";
  adminBtn.id = "adminBtn";
  adminBtn.style.cssText = "border-color:#ff4757;color:#ff4757;";
  adminBtn.innerHTML = '👑 Admin Duyệt';
  adminBtn.onclick = showAdminPendingList;

  var authBtn = document.getElementById("openLoginBtn");
  if (authBtn) {
    navActions.insertBefore(balanceSpan, authBtn);
    navActions.insertBefore(rechargeBtn, authBtn);
    navActions.insertBefore(historyBtn, authBtn);
    navActions.insertBefore(adminBtn, authBtn);
  }
}

// =============================================
// KHOI CHAY UNG DUNG
// =============================================

document.addEventListener("DOMContentLoaded", function() {
  initUsers();
  filterProducts('all');
  addNavButtons();
  updateAuthUI();

  var searchInput = $("searchInput");
  if (searchInput) searchInput.addEventListener("input", searchProducts);

  setInterval(cleanExpiredCodes, 30000);
});
