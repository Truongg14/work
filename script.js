(function () {
  const activeAccount = "TestDB",
    accountKey = (name) => "irs-user-" + activeAccount + "-" + name;
  const authGate = document.querySelector("#auth-gate"),
    loginForm = document.querySelector("#login-form");
  let authenticated = false;
  try {
    authenticated =
      sessionStorage.getItem("irs-auth-account") === activeAccount;
  } catch (error) {}
  if (authenticated) authGate.hidden = true;
  else setTimeout(() => document.querySelector("#login-user").focus(), 0);
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = document.querySelector("#login-user").value.trim(),
      password = document.querySelector("#login-password").value;
    if (user === "TestDB" && password === "123456") {
      try {
        sessionStorage.setItem("irs-auth-account", activeAccount);
      } catch (error) {}
      authGate.hidden = true;
      document.querySelector("#login-error").textContent = "";
    } else {
      document.querySelector("#login-error").textContent =
        "Tài khoản hoặc mật khẩu chưa đúng.";
      document.querySelector("#login-password").select();
    }
  });
  const titles = {
    overview: [
      "Recruitment overview",
      "Enterprise hiring performance, risks, and operational health.",
    ],
    operations: [
      "Vận hành tuyển dụng",
      "Quản lý Request và bảo đảm tiến độ thực hiện.",
    ],
    candidates: [
      "Candidate journey",
      "Trace every candidate from application through probation outcome.",
    ],
    performance: [
      "Performance & KPI",
      "Compare achievement, productivity, cost, and recruitment efficiency.",
    ],
    sources: [
      "Source & channel analytics",
      "Evaluate candidate acquisition volume, conversion, and cost.",
    ],
    forecast: [
      "Recruitment demand forecast",
      "Understand upcoming demand, hiring type, and capacity gaps.",
    ],
    pivot: [
      "Self-service Pivot analytics",
      "Explore governed recruitment data without returning to Excel.",
    ],
    request: ["Tạo Request mới", "Khai báo và phân công Request tuyển dụng."],
    reports: [
      "Reports & data refresh",
      "Monitor automated refresh, validation, generation, and delivery.",
    ],
    admin: [
      "Access & audit",
      "Review role scope, access status, and critical system history.",
    ],
  };
  const appShell = document.querySelector(".app"),
    sidebarToggle = document.querySelector("#sidebar-toggle");
  sidebarToggle.textContent = "‹";
  const roleSelect = document.querySelector("#role");
  ["Account Manager", "Hiring Manager"].forEach((role) => {
    if (![...roleSelect.options].some((option) => option.value === role))
      roleSelect.add(new Option(role, role));
  });
  const sidebarRefresh = document.createElement("div");
  sidebarRefresh.className = "sidebar-refresh";
  const refreshControl = document.querySelector(".refresh-control");
  refreshControl.parentNode.removeChild(refreshControl);
  sidebarRefresh.appendChild(refreshControl);
  sidebarRefresh.insertAdjacentHTML(
    "beforeend",
    '<small id="refresh-status">Sẵn sàng</small>',
  );
  document.querySelector(".sidebar-head").after(sidebarRefresh);
  function setSidebarCollapsed(collapsed) {
    appShell.classList.toggle("nav-collapsed", collapsed);
    sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
    sidebarToggle.setAttribute(
      "aria-label",
      collapsed ? "Expand page navigator" : "Collapse page navigator",
    );
    try {
      localStorage.setItem(
        accountKey("page-navigator-collapsed"),
        String(collapsed),
      );
    } catch (error) {}
  }
  let sidebarCollapsed = false;
  try {
    sidebarCollapsed =
      localStorage.getItem(accountKey("page-navigator-collapsed")) === "true";
  } catch (error) {}
  setSidebarCollapsed(sidebarCollapsed);
  sidebarToggle.addEventListener("click", () =>
    setSidebarCollapsed(!appShell.classList.contains("nav-collapsed")),
  );
  const requestNav = document.createElement("button");
  requestNav.dataset.view = "request";
  requestNav.title = "Tạo Request mới";
  requestNav.innerHTML =
    '<span class="nav-icon" aria-hidden="true">＋</span><span class="nav-label">Tạo Request</span>';
  document
    .querySelector("#nav")
    .insertBefore(requestNav, document.querySelector('[data-view="reports"]'));
  const requests = [
    {
      code: "JR-24071",
      role: "Sales Advisor",
      project: "Retail expansion",
      location: "South",
      owner: "Linh Nguyen",
      qty: 80,
      progress: 62,
      deadline: "05 Aug",
      status: "At risk",
    },
    {
      code: "JR-24066",
      role: "Warehouse Associate",
      project: "Warehouse network",
      location: "Central",
      owner: "Bao Tran",
      qty: 120,
      progress: 38,
      deadline: "09 Aug",
      status: "Watch",
    },
    {
      code: "JR-24059",
      role: "Customer Service Agent",
      project: "Customer service",
      location: "North",
      owner: "Minh Le",
      qty: 60,
      progress: 81,
      deadline: "12 Aug",
      status: "On track",
    },
    {
      code: "JR-24048",
      role: "Store Supervisor",
      project: "Retail expansion",
      location: "South",
      owner: "Thu Pham",
      qty: 24,
      progress: 74,
      deadline: "16 Aug",
      status: "On track",
    },
    {
      code: "JR-24032",
      role: "Team Leader",
      project: "Customer service",
      location: "North",
      owner: "An Hoang",
      qty: 12,
      progress: 46,
      deadline: "18 Aug",
      status: "Watch",
    },
  ];
  const candidates = [
    {
      name: "Nguyen Ha",
      id: "C-10842",
      job: "JR-24071",
      source: "Referral",
      location: "South",
      stage: "Interview",
      date: "24 Jul",
      owner: "Linh Nguyen",
    },
    {
      name: "Tran Minh",
      id: "C-10839",
      job: "JR-24066",
      source: "Job board",
      location: "Central",
      stage: "CV screened",
      date: "24 Jul",
      owner: "Bao Tran",
    },
    {
      name: "Le Anh",
      id: "C-10831",
      job: "JR-24059",
      source: "Campaign",
      location: "North",
      stage: "Hired",
      date: "23 Jul",
      owner: "Minh Le",
    },
    {
      name: "Pham Vy",
      id: "C-10820",
      job: "JR-24071",
      source: "Referral",
      location: "South",
      stage: "Rejected",
      date: "22 Jul",
      owner: "Linh Nguyen",
    },
  ];
  const audit = [
    [
      "01 Aug 08:30",
      "System",
      "Data refresh completed — 3 sources, 18,420 records",
    ],
    [
      "01 Aug 08:12",
      "Admin",
      "Recruiter access granted — Central warehouse project",
    ],
    [
      "31 Jul 17:02",
      "Report service",
      "Daily recruitment operations report delivered",
    ],
    [
      "31 Jul 15:44",
      "Linh Nguyen",
      "Recruitment request JR-24071 marked At risk",
    ],
    [
      "31 Jul 09:16",
      "Validation",
      "3 incomplete candidate-source records flagged",
    ],
  ];
  const pivot = {
    region: { labels: ["North", "Central", "South"], values: [242, 198, 427] },
    channel: {
      labels: ["Employee referral", "Job board", "Social campaign"],
      values: [318, 341, 208],
    },
    recruiter: {
      labels: ["Linh Nguyen", "Bao Tran", "Minh Le"],
      values: [116, 104, 98],
    },
    project: {
      labels: ["Retail expansion", "Warehouse network", "Customer service"],
      values: [354, 218, 295],
    },
  };
  const esc = (v) =>
    String(v).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        })[c],
    );
  const requestFilterIds = [
    "request-status",
    "request-location",
    "request-project",
    "request-owner",
  ];
  function getRequestFilters() {
    return {
      q: document.querySelector("#request-search").value.trim(),
      status: document.querySelector("#request-status").value,
      location: document.querySelector("#request-location").value,
      project: document.querySelector("#request-project").value,
      owner: document.querySelector("#request-owner").value,
    };
  }
  function saveAccountPreferences() {
    try {
      localStorage.setItem(
        accountKey("preferences"),
        JSON.stringify({
          requestFilters: getRequestFilters(),
          pivotRow: document.querySelector("#pivot-row").value,
          pivotValue: document.querySelector("#pivot-value").value,
          pivotCalc: document.querySelector("#pivot-calc").value,
          role: document.querySelector("#role").value,
        }),
      );
    } catch (error) {}
  }
  function restoreAccountPreferences() {
    try {
      const saved = JSON.parse(localStorage.getItem(accountKey("preferences")));
      if (!saved) return;
      if (saved.requestFilters) {
        document.querySelector("#request-search").value =
          saved.requestFilters.q || "";
        requestFilterIds.forEach((id) => {
          const key = id.replace("request-", "");
          if (
            saved.requestFilters[key] &&
            [...document.querySelector("#" + id).options].some(
              (x) => x.value === saved.requestFilters[key],
            )
          )
            document.querySelector("#" + id).value = saved.requestFilters[key];
        });
      }
      if (saved.pivotRow)
        document.querySelector("#pivot-row").value = saved.pivotRow;
      if (saved.pivotValue)
        document.querySelector("#pivot-value").value = saved.pivotValue;
      if (saved.pivotCalc)
        document.querySelector("#pivot-calc").value = saved.pivotCalc;
      if (saved.role) document.querySelector("#role").value = saved.role;
    } catch (error) {}
  }
  const viStatus = {
      "On track": "Đúng tiến độ",
      Watch: "Cần theo dõi",
      "At risk": "Có rủi ro",
    },
    viLocation = {
      North: "Miền Bắc",
      Central: "Miền Trung",
      South: "Miền Nam",
    },
    viProject = {
      "Retail expansion": "Mở rộng bán lẻ",
      "Warehouse network": "Mạng lưới kho vận",
      "Customer service": "Dịch vụ khách hàng",
    },
    viRole = {
      "Sales Advisor": "Tư vấn bán hàng",
      "Warehouse Associate": "Nhân viên kho",
      "Customer Service Agent": "Nhân viên dịch vụ khách hàng",
      "Store Supervisor": "Giám sát cửa hàng",
      "Team Leader": "Trưởng nhóm",
    };
  const selectedText = (id) =>
    document.querySelector("#" + id).selectedOptions[0].textContent;
  function renderFilterSummary() {
    const f = getRequestFilters(),
      active = [];
    if (f.q) active.push(["Tìm kiếm", f.q]);
    if (f.status !== "All statuses")
      active.push(["Trạng thái", selectedText("request-status")]);
    if (f.location !== "All locations")
      active.push(["Khu vực", selectedText("request-location")]);
    if (f.project !== "All projects")
      active.push(["Dự án", selectedText("request-project")]);
    if (f.owner !== "All owners")
      active.push(["Phụ trách", selectedText("request-owner")]);
    document.querySelector("#filter-summary").innerHTML = active.length
      ? "Bộ lọc: " +
        active
          .map(
            (x) =>
              `<span class="filter-chip">${esc(x[0])}: ${esc(x[1])}</span>`,
          )
          .join(" ")
      : "Bộ lọc: Không có";
    document
      .querySelector("#clear-filters")
      .classList.toggle("visible", active.length > 0);
  }
  function renderRequests() {
    const f = getRequestFilters(),
      q = f.q.toLowerCase();
    document.querySelector("#request-body").innerHTML =
      requests
        .filter(
          (x) =>
            (f.status === "All statuses" || x.status === f.status) &&
            (f.location === "All locations" || x.location === f.location) &&
            (f.project === "All projects" || x.project === f.project) &&
            (f.owner === "All owners" || x.owner === f.owner) &&
            (!q ||
              (
                x.code +
                " " +
                x.role +
                " " +
                x.project +
                " " +
                x.location +
                " " +
                x.owner
              )
                .toLowerCase()
                .includes(q)),
        )
        .map(
          (x) =>
            `<tr><td><b>${esc(x.code)}</b><br><span style="color:var(--muted)">${esc(viRole[x.role] || x.role)}</span></td><td>${esc(viProject[x.project] || x.project)}</td><td>${viLocation[x.location] || x.location}</td><td>${esc(x.owner)}</td><td class="num">${x.qty}</td><td><div class="progress"><i style="width:${x.progress}%"></i></div><small>${x.progress}%</small></td><td class="center">${x.deadline.replace("Aug", "Thg 8")}</td><td><button class="status cycle-status" data-code="${x.code}" data-s="${x.status}">${viStatus[x.status] || x.status}</button></td></tr>`,
        )
        .join("") ||
      '<tr><td colspan="8" class="empty">Không có Request phù hợp với bộ lọc đã chọn.</td></tr>';
  }
  function renderCandidates() {
    document.querySelector("#candidate-body").innerHTML = candidates
      .map(
        (x) =>
          `<tr><td><b>${esc(x.name)}</b><br><span style="color:var(--muted)">${x.id}</span></td><td>${x.job}</td><td>${x.source}</td><td>${x.location}</td><td><span class="status" data-s="${x.stage}">${x.stage}</span></td><td class="center">${x.date}</td><td>${x.owner}</td></tr>`,
      )
      .join("");
  }
  function renderPivot() {
    const r = document.querySelector("#pivot-row").value,
      v = document.querySelector("#pivot-value").value,
      d = pivot[r],
      names = {
        region: "Khu vực",
        channel: "Kênh tuyển dụng",
        recruiter: "Nhân sự tuyển dụng",
        project: "Dự án",
      },
      values = {
        hired: "Ứng viên đã tuyển",
        conversion: "Tỷ lệ chuyển đổi",
        cost: "Chi phí mỗi tuyển dụng",
        requests: "Số lượng Request",
      },
      labels = {
        "Employee referral": "Giới thiệu nội bộ",
        "Job board": "Trang tuyển dụng",
        "Social campaign": "Chiến dịch mạng xã hội",
      },
      total = d.values.reduce((a, b) => a + b, 0);
    document.querySelector("#pivot-title").textContent =
      values[v] + " theo " + names[r].toLowerCase();
    document.querySelector("#pivot-dimension").textContent = names[r];
    document.querySelector("#pivot-measure").textContent = values[v];
    document.querySelector("#pivot-body").innerHTML = d.labels
      .map((x, i) => {
        const raw = d.values[i],
          shown =
            v === "conversion"
              ? (8.6 + i * 1.3).toFixed(1) + "%"
              : v === "cost"
                ? "$" + (128 + i * 14)
                : v === "requests"
                  ? Math.round(raw * 1.44).toLocaleString()
                  : raw.toLocaleString();
        return `<tr><td>${esc(viLocation[x] || viProject[x] || labels[x] || x)}</td><td class="num">${shown}</td><td class="num">${((raw / total) * 100).toFixed(1)}%</td><td class="num">${i === 1 ? "-2.1%" : "+" + (3.2 + i).toFixed(1) + "%"}</td></tr>`;
      })
      .join("");
  }
  function addAudit(actor, message) {
    audit.unshift([
      new Date().toLocaleString([], {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      actor,
      message,
    ]);
    renderAudit();
  }
  function renderAudit() {
    document.querySelector("#audit").innerHTML = audit
      .map(
        (x) =>
          `<div class="audit-item"><time>${x[0]}</time><b>${x[1]}</b><span>${x[2]}</span></div>`,
      )
      .join("");
  }
  document.querySelector("#nav").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-view]");
    if (!b) return;
    document
      .querySelectorAll(".nav button")
      .forEach((x) => x.classList.toggle("active", x === b));
    document
      .querySelectorAll(".view")
      .forEach((x) =>
        x.classList.toggle("active", x.id === "view-" + b.dataset.view),
      );
    document.querySelector("#page-title").textContent =
      titles[b.dataset.view][0];
    document.querySelector("#page-copy").textContent =
      titles[b.dataset.view][1];
    document
      .querySelector(".top")
      .classList.toggle("ops-sticky", b.dataset.view === "operations");
    scrollTo({ top: 0, behavior: "smooth" });
  });
  function syncCustomFilter(wrapper) {
    const select = document.querySelector("#" + wrapper.dataset.select),
      value = select.value;
    wrapper.querySelector(".select-trigger span").textContent = value;
    wrapper.querySelectorAll(".select-option").forEach((option) => {
      const selected = option.dataset.value === value;
      option.classList.toggle("selected", selected);
      option.setAttribute("aria-selected", String(selected));
    });
  }
  function closeCustomFilters(except) {
    document.querySelectorAll(".custom-select.open").forEach((wrapper) => {
      if (wrapper === except) return;
      wrapper.classList.remove("open");
      wrapper
        .querySelector(".select-trigger")
        .setAttribute("aria-expanded", "false");
    });
  }
  function initializeCustomFilters() {
    requestFilterIds.forEach((id) => {
      const select = document.querySelector("#" + id),
        label = select.parentElement,
        wrapper = document.createElement("div"),
        caption = document.createElement("span");
      wrapper.className = label.className;
      caption.textContent = label.childNodes[0].textContent.trim();
      wrapper.append(caption, select);
      label.replaceWith(wrapper);
      select.classList.add("native-filter-select");
      select.setAttribute("tabindex", "-1");
      select.setAttribute("aria-hidden", "true");
      wrapper.classList.add("custom-select");
      wrapper.dataset.select = id;
      const trigger = document.createElement("button");
      trigger.className = "select-trigger";
      trigger.type = "button";
      trigger.setAttribute("aria-haspopup", "listbox");
      trigger.setAttribute("aria-expanded", "false");
      trigger.innerHTML = '<span></span><i aria-hidden="true">⌄</i>';
      const menu = document.createElement("div");
      menu.className = "select-menu";
      menu.setAttribute("role", "listbox");
      Array.from(select.options).forEach((item) => {
        const option = document.createElement("button");
        option.className = "select-option";
        option.type = "button";
        option.dataset.value = item.value;
        option.textContent = item.textContent;
        option.addEventListener("click", () => {
          select.value = item.value;
          select.dispatchEvent(new Event("change"));
          syncCustomFilter(wrapper);
          closeCustomFilters();
          trigger.focus();
        });
        menu.appendChild(option);
      });
      trigger.addEventListener("click", () => {
        const opening = !wrapper.classList.contains("open");
        closeCustomFilters(wrapper);
        wrapper.classList.toggle("open", opening);
        trigger.setAttribute("aria-expanded", String(opening));
      });
      wrapper.append(trigger, menu);
      syncCustomFilter(wrapper);
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".custom-select")) closeCustomFilters();
    });
  }
  function localizeOptions(select, map) {
    Array.from(select.options).forEach((option) => {
      const value = option.value;
      option.value = value;
      option.textContent = map[value] || value;
    });
  }
  function localizeOperations() {
    const nav = document.querySelector(".ops-local-nav");
    nav.querySelector("strong").textContent = "Trong trang này";
    nav.querySelector('[data-ops-target="ops-top"]').textContent = "Tổng quan";
    nav.querySelector('[data-ops-target="ops-pivot"]').textContent =
      "Phân tích Pivot";
    nav.querySelector(".ops-count").textContent = "2 mục";
    document.querySelector('[data-view="operations"] .nav-label').textContent =
      "Vận hành tuyển dụng";
    document.querySelector("#open-filter-drawer").textContent = "Bộ lọc";
    document.querySelector("#clear-filters").innerHTML =
      '<span aria-hidden="true">×</span> Xóa toàn bộ bộ lọc';
    document.querySelector("#filter-drawer-title").textContent = "Bộ lọc";
    document.querySelector(".filter-drawer-head p").textContent =
      "Các lựa chọn được áp dụng ngay vào danh sách Request.";
    document
      .querySelector("#close-filter-drawer")
      .setAttribute("aria-label", "Đóng bộ lọc");
    document.querySelector("#close-filter-drawer-footer").textContent = "Xong";
    const search = document.querySelector("#request-search");
    search.parentElement.childNodes[0].nodeValue = "Tìm kiếm";
    search.placeholder = "Tìm mã Request, vị trí, dự án hoặc người phụ trách";
    localizeOptions(document.querySelector("#request-status"), {
      "All statuses": "Tất cả trạng thái",
      ...viStatus,
    });
    localizeOptions(document.querySelector("#request-location"), {
      "All locations": "Tất cả khu vực",
      ...viLocation,
    });
    localizeOptions(document.querySelector("#request-project"), {
      "All projects": "Tất cả dự án",
      ...viProject,
    });
    localizeOptions(document.querySelector("#request-owner"), {
      "All owners": "Tất cả người phụ trách",
    });
    [
      "Mã Request / vị trí",
      "Dự án",
      "Khu vực",
      "Người phụ trách",
      "Nhu cầu",
      "Tiến độ",
      "Hạn hoàn thành",
      "Trạng thái",
    ].forEach(
      (text, index) =>
        (document.querySelectorAll("#ops-requests th")[index].textContent =
          text),
    );
    const config = document.querySelector("#ops-pivot .config");
    config.querySelector("h2").textContent = "Cấu hình";
    config.querySelector("p").textContent =
      "Thiết lập hàng, cột, giá trị, phép tính và bộ lọc. Kết quả được cập nhật ngay.";
    ["Hàng", "Cột", "Giá trị", "Phép tính", "Thời gian"].forEach(
      (text, index) =>
        (config.querySelectorAll(".field")[index].childNodes[0].nodeValue =
          text),
    );
    localizeOptions(document.querySelector("#pivot-row"), {
      region: "Khu vực",
      channel: "Kênh tuyển dụng",
      recruiter: "Nhân sự tuyển dụng",
      project: "Dự án",
    });
    localizeOptions(document.querySelector("#pivot-column"), {
      None: "Không có",
      Status: "Trạng thái",
      Month: "Tháng",
      "Job category": "Nhóm vị trí",
    });
    localizeOptions(document.querySelector("#pivot-value"), {
      hired: "Ứng viên đã tuyển",
      conversion: "Tỷ lệ chuyển đổi",
      cost: "Chi phí mỗi tuyển dụng",
      requests: "Số lượng Request",
    });
    localizeOptions(document.querySelector("#pivot-calc"), {
      Sum: "Tổng",
      Average: "Trung bình",
      Count: "Số lượng",
      "% of total": "% trên tổng",
    });
    config.querySelector("#export-pivot").textContent = "Xuất dữ liệu hiện tại";
    document.querySelector("#ops-pivot .section-head span").textContent =
      "Dữ liệu tuyển dụng đã được quản trị";
    const page = document.querySelector("#view-request");
    page.querySelector("h2").textContent = "Tạo Request tuyển dụng";
    page.querySelector(".section-head span").textContent =
      "Khai báo nhu cầu, người phụ trách và hạn hoàn thành.";
    [
      "Vị trí",
      "Dự án",
      "Khu vực",
      "Số lượng cần tuyển",
      "Người phụ trách",
      "Hạn hoàn thành",
    ].forEach(
      (text, index) =>
        (page.querySelectorAll(".field")[index].childNodes[0].nodeValue = text),
    );
    localizeOptions(page.querySelector('[name="project"]'), viProject);
    localizeOptions(page.querySelector('[name="location"]'), viLocation);
    page.querySelector('[type="reset"]').textContent = "Đặt lại";
    page.querySelector('[type="submit"]').textContent = "Tạo Request";
  }
  localizeOperations();
  const pivotPeriod = document.querySelector(
    "#ops-pivot .config .field:nth-of-type(5) select",
  );
  localizeOptions(pivotPeriod, {
    "Month to date": "Từ đầu tháng đến nay",
    "Quarter to date": "Từ đầu quý đến nay",
    "Year to date": "Từ đầu năm đến nay",
  });
  const pivotHeaders = document.querySelectorAll("#ops-pivot th");
  pivotHeaders[2].textContent = "Tỷ trọng";
  pivotHeaders[3].textContent = "So với kỳ trước";
  restoreAccountPreferences();
  initializeCustomFilters();
  document.addEventListener("change", (event) => {
    if (
      event.target.matches(
        "#request-status,#request-location,#request-project,#request-owner,#pivot-row,#pivot-value,#pivot-calc,#role",
      )
    )
      saveAccountPreferences();
  });
  document
    .querySelector("#request-search")
    .addEventListener("input", saveAccountPreferences);
  document
    .querySelector("#clear-filters")
    .addEventListener("click", () => setTimeout(saveAccountPreferences, 0));
  const filterDrawer = document.querySelector("#filter-drawer"),
    filterBackdrop = document.querySelector("#filter-backdrop"),
    openFilterButton = document.querySelector("#open-filter-drawer");
  function setFilterDrawer(open) {
    filterDrawer.classList.toggle("open", open);
    filterBackdrop.classList.toggle("open", open);
    filterDrawer.setAttribute("aria-hidden", String(!open));
    openFilterButton.setAttribute("aria-expanded", String(open));
    if (open) document.querySelector("#close-filter-drawer").focus();
    else openFilterButton.focus();
  }
  openFilterButton.addEventListener("click", () => setFilterDrawer(true));
  document
    .querySelector("#close-filter-drawer")
    .addEventListener("click", () => setFilterDrawer(false));
  document
    .querySelector("#close-filter-drawer-footer")
    .addEventListener("click", () => setFilterDrawer(false));
  filterBackdrop.addEventListener("click", () => setFilterDrawer(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && filterDrawer.classList.contains("open"))
      setFilterDrawer(false);
  });
  document.querySelector("#request-search").addEventListener("input", () => {
    renderRequests();
    renderFilterSummary();
  });
  requestFilterIds.forEach((id) =>
    document.querySelector("#" + id).addEventListener("change", () => {
      renderRequests();
      renderFilterSummary();
    }),
  );
  document.querySelector("#clear-filters").addEventListener("click", () => {
    document.querySelector("#request-search").value = "";
    requestFilterIds.forEach((id) => {
      const select = document.querySelector("#" + id);
      select.selectedIndex = 0;
      syncCustomFilter(select.parentElement);
    });
    closeCustomFilters();
    renderRequests();
    renderFilterSummary();
    document.querySelector("#request-search").focus();
  });
  document.querySelector("#request-body").addEventListener("click", (e) => {
    const b = e.target.closest(".cycle-status");
    if (!b) return;
    const x = requests.find((r) => r.code === b.dataset.code),
      states = ["On track", "Watch", "At risk"];
    x.status = states[(states.indexOf(x.status) + 1) % states.length];
    addAudit(
      "Người dùng hiện tại",
      "Trạng thái " + x.code + " đã đổi thành " + viStatus[x.status],
    );
    renderRequests();
    renderFilterSummary();
  });
  const requestPageForm = document.querySelector("#request-page-form");
  requestPageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(requestPageForm);
    requests.unshift({
      code: "JR-" + String(Date.now()).slice(-5),
      role: d.get("role"),
      project: d.get("project"),
      location: d.get("location"),
      owner: d.get("owner"),
      qty: Number(d.get("quantity")),
      progress: 0,
      deadline: new Date(d.get("deadline") + "T00:00:00").toLocaleDateString(
        "vi-VN",
        { day: "2-digit", month: "short" },
      ),
      status: "On track",
    });
    addAudit(d.get("owner"), "Đã tạo Request tuyển dụng mới");
    renderRequests();
    requestPageForm.reset();
    document.querySelector('[data-view="operations"]').click();
  });
  document.querySelector("#pivot-row").addEventListener("change", renderPivot);
  document
    .querySelector("#pivot-value")
    .addEventListener("change", renderPivot);
  document
    .querySelector("#pivot-calc")
    .addEventListener("change", () =>
      addAudit("Người dùng hiện tại", "Đã thay đổi phép tính Pivot"),
    );
  document.querySelector("#export-pivot").onclick = () => {
    addAudit("Người dùng hiện tại", "Đã xuất dữ liệu Pivot");
    alert(
      "Dữ liệu Pivot hiện tại đã sẵn sàng để xuất trong phiên bản hoàn chỉnh.",
    );
  };
  document.querySelector("#refresh").onclick = () => {
    document.querySelector("#refresh-status").textContent = "Đang làm mới";
    document.querySelector("#refresh-label").textContent =
      "Đang cập nhật dữ liệu…";
    setTimeout(() => {
      document.querySelector("#refresh-status").textContent = "Thành công";
      document.querySelector("#refresh-label").textContent =
        "Dữ liệu vừa được cập nhật";
      addAudit("Hệ thống", "Đã làm mới dữ liệu thủ công");
    }, 700);
  };
  document.querySelectorAll(".run-report").forEach(
    (b) =>
      (b.onclick = () => {
        b.textContent = "Generated";
        b.disabled = true;
        addAudit("Report service", "Manual report generated");
      }),
  );
  document.querySelector("#role").addEventListener("change", (e) => {
    const role = e.target.value,
      admin = document.querySelector('[data-view="admin"]');
    document.querySelector("#role-summary").textContent = role;
    admin.style.display = role === "Recruitment Manager" ? "block" : "none";
    if (
      role !== "Recruitment Manager" &&
      document.querySelector("#view-admin").classList.contains("active")
    )
      document.querySelector('[data-view="overview"]').click();
    addAudit("System", "Preview role changed to " + role);
  });
  const opsNav = document.querySelector(".ops-local-nav"),
    opsTopBar = document.querySelector(".top"),
    opsFilterToolbar = document.querySelector(".ops-filter-toolbar"),
    opsFilterToolbarHome = opsFilterToolbar.parentNode,
    opsFilterToolbarNext = opsFilterToolbar.nextSibling;
  opsTopBar.insertBefore(opsNav, document.querySelector(".actions"));
  function opsSyncStickyFilterToolbar() {
    const compact = opsTopBar.classList.contains("compact");
    if (compact) {
      if (opsFilterToolbar.parentNode !== opsTopBar)
        opsTopBar.insertBefore(
          opsFilterToolbar,
          document.querySelector(".actions"),
        );
    } else if (opsFilterToolbar.parentNode !== opsFilterToolbarHome)
      opsFilterToolbarHome.insertBefore(opsFilterToolbar, opsFilterToolbarNext);
  }
  function setOpsNavActive(id) {
    const target =
      opsSourceState && opsSourceState.activeSection
        ? opsSourceState.activeSection
        : id;
    opsNav
      .querySelectorAll("[data-ops-target]")
      .forEach((button) =>
        button.classList.toggle("active", button.dataset.opsTarget === target),
      );
  }
  opsNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-ops-target]");
    if (!button) return;
    opsActivateSection(button.dataset.opsTarget);
  });
  window.addEventListener(
    "scroll",
    () => {
      const operationsActive = document
          .querySelector("#view-operations")
          .classList.contains("active"),
        top = document.querySelector(".top");
      top.classList.toggle("compact", operationsActive && window.scrollY > 0);
      opsSyncStickyFilterToolbar();
    },
    { passive: true },
  );
  const opsSourceProjects = [
    "Alpha FMCG",
    "Bách Việt",
    "Central Trade",
    "Delta Retail",
    "Evergreen",
  ];
  const opsSourceBase = {
    "Alpha FMCG": {
      order: 248,
      done: 174,
      close: 21,
      late: 18,
      noCandidate: 7,
      target: 75,
      otif: 84,
      approach: 926,
      onboard: 112,
      ttf: 19,
      leave: 9,
      sent: 316,
    },
    "Bách Việt": {
      order: 192,
      done: 119,
      close: 15,
      late: 27,
      noCandidate: 12,
      target: 70,
      otif: 73,
      approach: 711,
      onboard: 81,
      ttf: 26,
      leave: 13,
      sent: 241,
    },
    "Central Trade": {
      order: 154,
      done: 123,
      close: 11,
      late: 8,
      noCandidate: 3,
      target: 78,
      otif: 91,
      approach: 624,
      onboard: 94,
      ttf: 17,
      leave: 6,
      sent: 228,
    },
    "Delta Retail": {
      order: 221,
      done: 139,
      close: 17,
      late: 31,
      noCandidate: 15,
      target: 72,
      otif: 69,
      approach: 804,
      onboard: 97,
      ttf: 29,
      leave: 17,
      sent: 273,
    },
    Evergreen: {
      order: 137,
      done: 101,
      close: 9,
      late: 11,
      noCandidate: 4,
      target: 74,
      otif: 87,
      approach: 519,
      onboard: 72,
      ttf: 21,
      leave: 5,
      sent: 194,
    },
  };
  const opsSectionMeta = [
    ["ops-summary", "Tổng hợp vận hành"],
    ["ops-orders", "Tổng hợp Order"],
    ["ops-deadline", "Deadline và cảnh báo"],
    ["ops-pipeline", "Tình trạng và chất lượng ứng viên"],
    ["ops-outcome", "Năng suất"],
  ];
  let opsSourceState = {
    project: "all",
    region: "all",
    grain: "month",
    count: 12,
    kpiCols: 4,
    visualCols: 2,
    columnCols: 2,
    tableCols: 1,
    activeSection: "ops-summary",
    visible: opsSectionMeta.map((x) => x[0]),
    orderFilters: {
      year: "",
      month: "",
      period: "day",
      viewMode: "7",
      viewCount: 7,
      project: "all",
      region: "all",
      city: "all",
      position: "all",
      hireType: "all",
      status: "all",
      otif: "all",
      progress: "all",
      am: "all",
      supervisor: "all",
      teamLead: "all",
      recruiter: "all",
    },
    orderOpen: [],
    orderRecruitType: "all",
    visuals: [
      {
        id: "column-order-project",
        name: "Order theo dự án",
        type: "column",
        dimension: "Project",
        metric: "Total Order",
        agg: "SUM",
      },
      {
        id: "table-order-operation",
        name: "Bảng vận hành Order",
        type: "table",
        tableMode: "table",
        rows: ["Project"],
        columns: ["Status"],
        metrics: ["Total Order", "Order Done", "% Done"],
        metricAgg: {
          "Total Order": "SUM",
          "Order Done": "SUM",
          "% Done": "Average",
        },
      },
    ],
  };
  try {
    const saved = JSON.parse(
      localStorage.getItem(accountKey("operations-source-layout")),
    );
    if (saved) opsSourceState = { ...opsSourceState, ...saved };
  } catch (error) {}
  if (!Array.isArray(opsSourceState.visuals)) opsSourceState.visuals = [];
  if (!opsSourceState.columnCols) opsSourceState.columnCols = 2;
  if (!opsSourceState.tableCols) opsSourceState.tableCols = 1;
  if (!opsSourceState.orderFilters)
    opsSourceState.orderFilters = {
      year: "",
      month: "",
      period: "day",
      viewMode: "7",
      viewCount: 7,
      project: "all",
      region: "all",
      city: "all",
      position: "all",
      hireType: "all",
      status: "all",
      otif: "all",
      progress: "all",
    };
  ["am", "supervisor", "teamLead", "recruiter", "people"].forEach((key) => {
    if (opsSourceState.orderFilters[key] === undefined)
      opsSourceState.orderFilters[key] = "all";
  });
  if (!Array.isArray(opsSourceState.orderOpen)) opsSourceState.orderOpen = [];
  if (!opsSourceState.orderRecruitType) opsSourceState.orderRecruitType = "all";
  if (!opsSourceState.visible.includes(opsSourceState.activeSection))
    opsSourceState.activeSection = opsSourceState.visible[0] || "ops-summary";
  function opsSaveState() {
    try {
      localStorage.setItem(
        accountKey("operations-source-layout"),
        JSON.stringify(opsSourceState),
      );
    } catch (error) {}
  }
  function opsFmt(value) {
    return Number(value).toLocaleString("vi-VN");
  }
  function opsData() {
    const keys =
        opsSourceState.project === "all"
          ? opsSourceProjects
          : [opsSourceState.project],
      factor =
        opsSourceState.region === "all"
          ? 1
          : { North: 0.38, Central: 0.29, South: 0.33 }[opsSourceState.region],
      sum = (key) =>
        Math.round(
          keys.reduce((total, p) => total + opsSourceBase[p][key], 0) * factor,
        ),
      avg = (key) =>
        Math.round(
          keys.reduce((total, p) => total + opsSourceBase[p][key], 0) /
            keys.length,
        );
    return {
      keys,
      order: sum("order"),
      done: sum("done"),
      close: sum("close"),
      late: sum("late"),
      noCandidate: sum("noCandidate"),
      approach: sum("approach"),
      onboard: sum("onboard"),
      leave: sum("leave"),
      sent: sum("sent"),
      otif: avg("otif"),
      ttf: avg("ttf"),
      targetHit: keys.filter(
        (p) =>
          (opsSourceBase[p].done / opsSourceBase[p].order) * 100 >=
          opsSourceBase[p].target,
      ).length,
      factor,
    };
  }
  function opsKpis(items) {
    return (
      '<div class="ops-source-kpis" style="--ops-kpi-count:' +
      items.length +
      '">' +
      items
        .map(
          (item) =>
            '<article class="ops-source-kpi"><span>' +
            item[0] +
            "</span><strong>" +
            item[1] +
            '</strong><small class="' +
            (item[2] && item[2].includes("▼") ? "down" : "") +
            '">' +
            (item[2] || "▲ 4,2% so với kỳ trước") +
            "</small></article>",
        )
        .join("") +
      "</div>"
    );
  }
  const opsDataBeforeOrderPeriodScale = opsData;
  opsData = function () {
    const data = opsDataBeforeOrderPeriodScale(),
      filters = opsSourceState.orderFilters || {},
      count = Math.max(
        1,
        Number(
          filters.viewMode === "custom" ? filters.viewCount : filters.viewMode,
        ) || 7,
      );
    if (filters.period !== "week") return data;
    const targetTotal = Math.round((1673 * count) / 7),
      scale = targetTotal / Math.max(1, data.order),
      scaled = { ...data };
    [
      "order",
      "done",
      "close",
      "late",
      "noCandidate",
      "approach",
      "onboard",
      "leave",
      "sent",
    ].forEach((key) => (scaled[key] = Math.round(data[key] * scale)));
    scaled.order = targetTotal;
    return scaled;
  };
  function opsCard(title, body, sub, full) {
    return (
      '<article class="ops-source-card ' +
      (full ? "full" : "") +
      '"><h3>' +
      title +
      '</h3><div class="sub">' +
      (sub || "") +
      "</div>" +
      body +
      "</article>"
    );
  }
  function opsLabels() {
    const names = [],
      now = new Date(2026, 7, 2);
    for (let i = opsSourceState.count - 1; i >= 0; i--) {
      const d = new Date(now);
      if (opsSourceState.grain === "day") {
        d.setDate(d.getDate() - i);
        names.push(
          String(d.getDate()).padStart(2, "0") +
            "/" +
            String(d.getMonth() + 1).padStart(2, "0"),
        );
      } else if (opsSourceState.grain === "week") {
        d.setDate(d.getDate() - i * 7);
        const start = new Date(d.getFullYear(), 0, 1),
          week = Math.ceil(((d - start) / 86400000 + start.getDay() + 1) / 7);
        names.push("W" + week);
      } else {
        d.setMonth(d.getMonth() - i);
        names.push("T" + (d.getMonth() + 1));
      }
    }
    return names;
  }
  function opsSeries() {
    const d = opsData(),
      n = opsSourceState.count;
    return opsLabels().map((label, i) => {
      const wave = Math.sin(i * 0.8) * 0.13 + 1,
        order = Math.max(5, Math.round((d.order / n) * wave)),
        done = Math.max(3, Math.round(order * (0.63 + (i % 4) * 0.06)));
      return { label, order, done, gap: order - done };
    });
  }
  function opsTrend() {
    const series = opsSeries(),
      w = 760,
      h = 250,
      pad = 34,
      max = Math.max(...series.flatMap((x) => [x.order, x.done])) * 1.2,
      x = (i) => pad + (i * (w - pad * 2)) / Math.max(series.length - 1, 1),
      y = (v) => h - pad - (v / max) * (h - pad * 2),
      path = (key) =>
        series
          .map((v, i) => (i ? "L " : "M ") + x(i) + " " + y(v[key]))
          .join(" "),
      ticks = series
        .map(
          (v, i) =>
            '<text x="' +
            x(i) +
            '" y="242" text-anchor="middle">' +
            v.label +
            "</text>",
        )
        .join("");
    return (
      '<svg class="ops-source-trend" viewBox="0 0 760 250" preserveAspectRatio="none"><line class="gridline" x1="34" y1="55" x2="726" y2="55"/><line class="gridline" x1="34" y1="125" x2="726" y2="125"/><line class="gridline" x1="34" y1="195" x2="726" y2="195"/><path class="order" d="' +
      path("order") +
      '"/><path class="done" d="' +
      path("done") +
      '"/>' +
      ticks +
      '</svg><div class="ops-source-legend"><span><i style="background:var(--red)"></i>Order</span><span><i style="background:var(--green)"></i>Order Done</span></div>'
    );
  }
  function opsBars(metric) {
    const d = opsData(),
      values = d.keys.map((p) => ({
        label: p.split(" ")[0],
        value: Math.round(opsSourceBase[p][metric] * d.factor),
      })),
      max = Math.max(...values.map((x) => x.value), 1);
    return (
      '<div class="ops-source-chart">' +
      values
        .map(
          (x) =>
            '<div class="ops-source-bar" style="height:' +
            Math.max(8, (x.value / max) * 170) +
            'px"><b>' +
            x.value +
            "</b><label>" +
            x.label +
            "</label></div>",
        )
        .join("") +
      "</div>"
    );
  }
  function opsOperationTable() {
    const d = opsData();
    return (
      '<div class="table-wrap"><table><thead><tr><th>Dự án</th><th>Order</th><th>Done</th><th>% Done</th><th>Close</th><th>Processing Late</th><th>Late chưa có UV</th><th>% Target</th><th>Kết quả</th></tr></thead><tbody>' +
      d.keys
        .map((p) => {
          const a = opsSourceBase[p],
            order = Math.round(a.order * d.factor),
            done = Math.round(a.done * d.factor),
            pct = Math.round((done / order) * 100),
            hit = pct >= a.target;
          return (
            "<tr><td><b>" +
            p +
            "</b></td><td>" +
            order +
            "</td><td>" +
            done +
            "</td><td>" +
            pct +
            "%</td><td>" +
            Math.round(a.close * d.factor) +
            "</td><td>" +
            Math.round(a.late * d.factor) +
            '</td><td><span class="status" data-s="At risk">' +
            Math.round(a.noCandidate * d.factor) +
            "</span></td><td>" +
            a.target +
            "%</td><td>" +
            (hit ? "Đạt" : "Chưa đạt") +
            "</td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div>"
    );
  }
  function opsPipeline() {
    const d = opsData(),
      values = [
        d.approach,
        Math.round(d.approach * 0.74),
        Math.round(d.approach * 0.52),
        Math.round(d.approach * 0.34),
        Math.round(d.approach * 0.22),
        d.onboard,
        Math.round(d.onboard * 0.81),
      ],
      names = [
        "All Data",
        "Approach Data",
        "PV V1",
        "PV V2",
        "Học việc",
        "Onboard",
        "Pass BH",
      ];
    return (
      '<div class="ops-pipeline-flow">' +
      values
        .map(
          (value, i) =>
            '<div class="ops-pipe"><small>' +
            names[i] +
            "</small><b>" +
            opsFmt(value) +
            "</b><small>" +
            (i
              ? Math.round((value / values[i - 1]) * 100) + "% từ bước trước"
              : "100% đầu vào") +
            "</small></div>",
        )
        .join("") +
      "</div>"
    );
  }
  function opsRiskTable() {
    const d = opsData();
    return (
      '<div class="table-wrap"><table><thead><tr><th>Dự án</th><th>Mã Order</th><th>Vị trí</th><th>Recruiter</th><th>Trạng thái</th><th>Tuổi Order</th></tr></thead><tbody>' +
      d.keys
        .map(
          (p, i) =>
            "<tr><td>" +
            p +
            "</td><td>ORD-" +
            (2410 + i) +
            "</td><td>" +
            ["Sales Rep", "PG", "Supervisor"][i % 3] +
            "</td><td>" +
            ["Minh", "Lan", "Trang", "Huy"][i % 4] +
            '</td><td><span class="status" data-s="' +
            (i % 2 ? "At risk" : "Watch") +
            '">' +
            (i % 2 ? "Late" : "Cần theo dõi") +
            "</span></td><td>" +
            (12 + i * 5) +
            " ngày</td></tr>",
        )
        .join("") +
      "</tbody></table></div>"
    );
  }
  function opsSectionHead(title, copy) {
    return (
      '<div class="ops-source-head"><div><h2>' +
      title +
      "</h2><p>" +
      copy +
      "</p></div></div>"
    );
  }
  function opsRenderSummary() {
    const d = opsData(),
      pct = Math.round((d.done / d.order) * 100),
      gap = d.order - d.done;
    return (
      opsSectionHead(
        "Tổng hợp vận hành",
        "Sức khỏe vận hành, mức hoàn thành và vấn đề cần ưu tiên.",
        true,
      ) +
      opsKpis([
        ["Số lượng Order", opsFmt(d.order)],
        ["Số lượng Done", opsFmt(d.done)],
        ["% Done", pct + "%"],
        ["Gap", opsFmt(gap), "▼ 3,1% so với kỳ trước"],
        ["Dự án đạt % Target", d.targetHit + "/" + d.keys.length],
        ["Late", opsFmt(d.late), "▼ 2,1% so với kỳ trước"],
        ["Late chưa có UV", opsFmt(d.noCandidate), "▼ 1,4% so với kỳ trước"],
      ]) +
      '<div class="ops-source-grid" style="--ops-visual-cols:' +
      opsSourceState.visualCols +
      '">' +
      opsCard(
        "Xu hướng " + opsSourceState.count + " kỳ gần nhất",
        opsTrend(),
        "Order, Done và nhịp biến động theo thời gian",
        true,
      ) +
      opsCard(
        "Hiệu suất theo dự án",
        opsOperationTable(),
        "Cảnh báo Late, target và tiến độ",
        true,
      ) +
      opsCard(
        "Candidate Pipeline",
        opsPipeline(),
        "Conversion theo từng phase",
        true,
      ) +
      "</div>"
    );
  }
  const opsVisualDimensions = ["Project", "Region", "Status"];
  const opsVisualMetrics = [
    "Total Order",
    "Order Done",
    "% Done",
    "Processing Late",
    "Late chưa có UV",
    "Fulfill Ontime Rate",
  ];
  function opsEscape(value) {
    return String(value == null ? "" : value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  }
  function opsVisualRows() {
    const d = opsData(),
      regions = ["Miền Bắc", "Miền Trung", "Miền Nam"];
    return d.keys.map((p, i) => {
      const a = opsSourceBase[p],
        order = Math.round(a.order * d.factor),
        done = Math.round(a.done * d.factor);
      return {
        Project: p,
        Region: regions[i % 3],
        Status: a.late > a.order * 0.1 ? "Cần chú ý" : "Ổn định",
        "Total Order": order,
        "Order Done": done,
        "% Done": Math.round((done / order) * 100),
        "Processing Late": Math.round(a.late * d.factor),
        "Late chưa có UV": Math.round(a.noCandidate * d.factor),
        "Fulfill Ontime Rate": a.otif,
      };
    });
  }
  function opsAggregate(values, agg) {
    const clean = values.map(Number).filter(Number.isFinite);
    if (!clean.length) return 0;
    if (agg === "Average")
      return Math.round(clean.reduce((a, b) => a + b, 0) / clean.length);
    if (agg === "Max") return Math.max(...clean);
    if (agg === "Min") return Math.min(...clean);
    return clean.reduce((a, b) => a + b, 0);
  }
  function opsColumnVisual(visual) {
    const rows = opsVisualRows(),
      groups = {};
    rows.forEach((row) =>
      (groups[row[visual.dimension]] ||= []).push(row[visual.metric]),
    );
    const values = Object.keys(groups).map((label) => ({
        label,
        value: opsAggregate(groups[label], visual.agg),
      })),
      max = Math.max(1, ...values.map((x) => x.value));
    return (
      '<div class="ops-source-chart">' +
      values
        .map(
          (x) =>
            '<div class="ops-source-bar" style="height:' +
            Math.max(8, (x.value / max) * 126) +
            'px"><b>' +
            opsFmt(x.value) +
            "</b><label>" +
            opsEscape(x.label) +
            "</label></div>",
        )
        .join("") +
      "</div>"
    );
  }
  function opsTableVisual(visual) {
    const rows = opsVisualRows(),
      dimensions =
        visual.tableMode === "matrix"
          ? visual.rows.concat(visual.columns)
          : visual.rows,
      metrics = visual.metrics || [];
    if (visual.tableMode === "matrix" && visual.columns.length) {
      const rowDim = visual.rows[0] || "Project",
        colDim = visual.columns[0],
        cols = [...new Set(rows.map((row) => row[colDim]))],
        metric = metrics[0] || "Total Order",
        agg = (visual.metricAgg || {})[metric] || "SUM",
        rowValues = [...new Set(rows.map((row) => row[rowDim]))];
      return (
        '<div class="ops-mini-table"><table><thead><tr><th>' +
        opsEscape(rowDim) +
        " / " +
        opsEscape(colDim) +
        "</th>" +
        cols.map((x) => "<th>" + opsEscape(x) + "</th>").join("") +
        "</tr></thead><tbody>" +
        rowValues
          .map(
            (rv) =>
              "<tr><td><b>" +
              opsEscape(rv) +
              "</b></td>" +
              cols
                .map(
                  (cv) =>
                    "<td>" +
                    opsFmt(
                      opsAggregate(
                        rows
                          .filter((r) => r[rowDim] === rv && r[colDim] === cv)
                          .map((r) => r[metric]),
                        agg,
                      ),
                    ) +
                    "</td>",
                )
                .join("") +
              "</tr>",
          )
          .join("") +
        "</tbody></table></div>"
      );
    }
    return (
      '<div class="ops-mini-table"><table><thead><tr>' +
      dimensions
        .concat(metrics)
        .map((x) => "<th>" + opsEscape(x) + "</th>")
        .join("") +
      "</tr></thead><tbody>" +
      rows
        .map(
          (row) =>
            "<tr>" +
            dimensions
              .map((x) => "<td>" + opsEscape(row[x]) + "</td>")
              .join("") +
            metrics.map((x) => "<td>" + opsFmt(row[x]) + "</td>").join("") +
            "</tr>",
        )
        .join("") +
      "</tbody></table></div>"
    );
  }
  function opsVisualCard(visual) {
    const meta =
      visual.type === "column"
        ? "Column · " +
          visual.dimension +
          " · " +
          visual.metric +
          " (" +
          visual.agg +
          ")"
        : (visual.tableMode === "matrix" ? "Matrix Table" : "Table") +
          " · " +
          (visual.metrics || []).join(", ");
    return (
      '<article class="ops-visual-card"><button class="ops-visual-edit" data-visual-edit="' +
      visual.id +
      '" type="button" aria-label="Chỉnh sửa">✎</button><h4>' +
      opsEscape(visual.name) +
      '</h4><div class="meta">' +
      opsEscape(meta) +
      "</div>" +
      (visual.type === "column"
        ? opsColumnVisual(visual)
        : opsTableVisual(visual)) +
      "</article>"
    );
  }
  function opsVisualWorkspace() {
    const columns = opsSourceState.visuals.filter((x) => x.type === "column"),
      tables = opsSourceState.visuals.filter((x) => x.type === "table"),
      group = (type, title, copy, items, cols) =>
        '<div class="ops-visual-group"><div class="ops-visual-group-head"><div><h3>' +
        title +
        "</h3><p>" +
        copy +
        '</p></div><button class="btn" data-visual-config="' +
        type +
        '" type="button">Cấu hình</button></div><div class="ops-visual-grid" style="--visual-group-cols:' +
        cols +
        '">' +
        (items.length
          ? items.map(opsVisualCard).join("")
          : '<div class="ops-visual-empty">Chưa có visual. Chọn Cấu hình để thêm mới.</div>') +
        "</div></div>";
    return (
      '<div class="ops-visual-workspace">' +
      group(
        "column",
        "Column Charts",
        "Biểu đồ cột có dimension, metric và phép tổng hợp riêng.",
        columns,
        opsSourceState.columnCols,
      ) +
      group(
        "table",
        "Table Visuals",
        "Bảng thường hoặc matrix với nhiều dimension và metric.",
        tables,
        opsSourceState.tableCols,
      ) +
      "</div>"
    );
  }
  const opsOrderOptions = {
    projects: [
      "LG",
      "Panasonic",
      "Toshiba",
      "Marico",
      "Honor",
      "Aqua",
      "Vinamilk",
      "Coke",
    ],
    regions: ["Central", "HCMC", "MKD", "North"],
    cities: [
      "Hà Nội",
      "Hải Phòng",
      "Bắc Ninh",
      "Đà Nẵng",
      "Huế",
      "TP. Hồ Chí Minh",
      "Bình Dương",
      "Đồng Nai",
      "Cần Thơ",
      "An Giang",
    ],
    positions: ["MER", "SR", "SR Tempo", "SS", "Nhân viên tiếp thị"],
    progress: [
      "Chưa có ứng viên",
      "Tuyển lại",
      "Chờ duyệt",
      "Scan CV",
      "Phỏng vấn vòng 2",
      "Chờ kết quả phỏng vấn vòng 2",
      "Phỏng vấn vòng 3",
      "Chờ kết quả phỏng vấn vòng 3",
      "Onboard",
      "Học việc",
      "Đạt học việc",
    ],
    ams: ["Nguyễn Minh", "Trần Hạ"],
    supervisors: {
      all: ["Trần Linh", "Đỗ Hải", "Ngô Mai"],
      "Nguyễn Minh": ["Trần Linh", "Đỗ Hải"],
      "Trần Hạ": ["Ngô Mai"],
    },
    teamLeads: {
      all: ["Phạm An", "Võ Thư", "Lâm Tú"],
      "Trần Linh": ["Phạm An"],
      "Đỗ Hải": ["Võ Thư"],
      "Ngô Mai": ["Lâm Tú"],
    },
    recruiters: {
      all: ["Lê Vy", "Hoàng Nam", "Mai Chi", "Tuấn Anh"],
      "Phạm An": ["Lê Vy", "Hoàng Nam"],
      "Võ Thư": ["Mai Chi"],
      "Lâm Tú": ["Tuấn Anh"],
    },
  };
  function opsOrderSelect(name, label, items, allLabel) {
    const value = opsSourceState.orderFilters[name];
    return (
      "<label>" +
      label +
      '<select data-order-filter="' +
      name +
      '"><option value="all">' +
      (allLabel || "Tất cả") +
      "</option>" +
      items
        .map(
          (x) =>
            '<option value="' +
            opsEscape(x) +
            '" ' +
            (value === x ? "selected" : "") +
            ">" +
            opsEscape(x) +
            "</option>",
        )
        .join("") +
      "</select></label>"
    );
  }
  function opsOrderGroup(id, title, content) {
    return (
      '<details class="ops-order-filter-group" data-order-group="' +
      id +
      '" ' +
      (opsSourceState.orderOpen.includes(id) ? "open" : "") +
      "><summary>" +
      title +
      '</summary><div class="ops-order-filter-fields">' +
      content +
      "</div></details>"
    );
  }
  function opsOrderTimeContext() {
    const f = opsSourceState.orderFilters,
      count = Math.max(
        1,
        Number(f.viewMode === "custom" ? f.viewCount : f.viewMode) || 7,
      ),
      now = new Date(),
      period = f.period,
      hasPast = f.year !== "";
    let anchor, end;
    if (hasPast) {
      const year = Number(f.year),
        month = f.month === "" ? 11 : Number(f.month);
      anchor = new Date(year, month + 1, 0);
      end = new Date(anchor);
      if (period === "day") end.setDate(end.getDate() + count - 1);
      else if (period === "week") end.setDate(end.getDate() + (count - 1) * 7);
      else end.setMonth(end.getMonth() + count - 1);
    } else {
      end = new Date(now);
      anchor = new Date(now);
      if (period === "day") anchor.setDate(anchor.getDate() - count + 1);
      else if (period === "week")
        anchor.setDate(anchor.getDate() - (count - 1) * 7);
      else anchor.setMonth(anchor.getMonth() - count + 1);
    }
    const future = anchor > now || end > now,
      fmt = (date) =>
        date.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      periodName = { day: "ngày", week: "tuần", month: "tháng" }[period];
    let currentLabel;
    if (period === "day")
      currentLabel = hasPast
        ? "Order ngày " + fmt(anchor)
        : "Order hôm nay · " + fmt(now);
    else if (period === "week") {
      const start = new Date(anchor.getFullYear(), 0, 1),
        week = Math.ceil(
          ((anchor - start) / 86400000 + start.getDay() + 1) / 7,
        );
      currentLabel = "Order tuần " + week + " · " + anchor.getFullYear();
    } else
      currentLabel =
        "Order tháng " + (anchor.getMonth() + 1) + "/" + anchor.getFullYear();
    return {
      count,
      anchor,
      end,
      future,
      range: fmt(anchor) + " → " + fmt(end),
      periodName,
      currentLabel,
    };
  }
  function opsOrderPeopleFields() {
    const f = opsSourceState.orderFilters,
      role = document.querySelector("#role").value,
      rank =
        {
          Recruiter: 0,
          "Team Leader": 1,
          Supervisor: 2,
          "Account Manager": 3,
          "Recruitment Manager": 4,
          "Hiring Manager": 4,
        }[role] ?? 0;
    if (rank === 0) return "";
    let html = "";
    if (rank >= 4)
      html += opsOrderSelect("am", "Account Manager", opsOrderOptions.ams);
    const sups =
      opsOrderOptions.supervisors[f.am] || opsOrderOptions.supervisors.all;
    if (rank >= 3) html += opsOrderSelect("supervisor", "Supervisor", sups);
    const tls =
      opsOrderOptions.teamLeads[f.supervisor] || opsOrderOptions.teamLeads.all;
    if (rank >= 2) html += opsOrderSelect("teamLead", "Team Leader", tls);
    const recruiters =
      opsOrderOptions.recruiters[f.teamLead] || opsOrderOptions.recruiters.all;
    if (rank >= 1) html += opsOrderSelect("recruiter", "Recruiter", recruiters);
    return html;
  }
  function opsOrderFilterPanel() {
    const f = opsSourceState.orderFilters,
      years = ["2023", "2024", "2025", "2026", "2027"],
      months = Array.from({ length: 12 }, (_, i) => String(i)),
      time = opsOrderGroup(
        "time",
        "Thời gian",
        '<label>Năm<select data-order-filter="year"><option value="">Hiện tại</option>' +
          years
            .map(
              (y) =>
                "<option " +
                (f.year === y ? "selected" : "") +
                ">" +
                y +
                "</option>",
            )
            .join("") +
          '</select></label><label>Tháng<select data-order-filter="month"><option value="">Không chọn tháng</option>' +
          months
            .map(
              (m) =>
                '<option value="' +
                m +
                '" ' +
                (f.month === m ? "selected" : "") +
                ">Tháng " +
                (Number(m) + 1) +
                "</option>",
            )
            .join("") +
          '</select></label><label>Period<select data-order-filter="period"><option value="day" ' +
          (f.period === "day" ? "selected" : "") +
          '>Daily</option><option value="week" ' +
          (f.period === "week" ? "selected" : "") +
          '>Weekly</option><option value="month" ' +
          (f.period === "month" ? "selected" : "") +
          '>Monthly</option></select></label><label>Thời gian view<select data-order-filter="viewMode"><option value="7" ' +
          (f.viewMode === "7" ? "selected" : "") +
          '>7 kỳ</option><option value="14" ' +
          (f.viewMode === "14" ? "selected" : "") +
          '>14 kỳ</option><option value="custom" ' +
          (f.viewMode === "custom" ? "selected" : "") +
          ">Tự nhập</option></select></label>" +
          (f.viewMode === "custom"
            ? '<label>Số kỳ<input type="number" min="1" max="120" value="' +
              f.viewCount +
              '" data-order-filter="viewCount"></label>'
            : ""),
      ),
      scope = opsOrderGroup(
        "scope",
        "Dự án & phạm vi",
        opsOrderSelect("project", "Dự án", opsOrderOptions.projects) +
          opsOrderSelect("region", "Khu vực", opsOrderOptions.regions) +
          opsOrderSelect("city", "Thành phố", opsOrderOptions.cities) +
          opsOrderSelect(
            "position",
            "Vị trí tuyển dụng",
            opsOrderOptions.positions,
          ),
      ),
      status = opsOrderGroup(
        "status",
        "Trạng thái & OTIF",
        opsOrderSelect("status", "Trạng thái", [
          "Processing",
          "Done",
          "Close",
        ]) +
          opsOrderSelect("otif", "OTIF", ["Done", "Late"]) +
          opsOrderSelect("hireType", "Loại tuyển", [
            "Tuyển mới",
            "Tuyển thay thế",
          ]),
      ),
      progress = opsOrderGroup(
        "progress",
        "Tiến độ",
        opsOrderSelect("progress", "Tiến độ Order", opsOrderOptions.progress),
      ),
      peopleFields = opsOrderPeopleFields(),
      people = peopleFields
        ? opsOrderGroup("people", "Nhân sự theo Preview Role", peopleFields)
        : "";
    return (
      '<details class="ops-order-filter" open><summary><span>Bộ lọc Tổng hợp Order</span><small>' +
      opsOrderTimeContext().count +
      " kỳ · " +
      { day: "Daily", week: "Weekly", month: "Monthly" }[f.period] +
      '</small></summary><div class="ops-order-filter-body"><div class="ops-order-filter-groups">' +
      time +
      scope +
      status +
      progress +
      people +
      '</div><div class="ops-order-filter-note"><span>Khoảng dữ liệu: ' +
      opsOrderTimeContext().range +
      '</span><button class="btn" data-order-reset type="button">Đặt lại bộ lọc</button></div></div></details>'
    );
  }
  function opsOrderMetric(label, value, total, kind, note) {
    const dist = total ? Math.round((value / total) * 100) : 0;
    return (
      '<article class="ops-order-metric ' +
      (kind || "") +
      '"><label>' +
      label +
      "</label><strong>" +
      opsFmt(value) +
      "</strong><small>" +
      (note || "%Dist so với Total Order · " + dist + "%") +
      "</small></article>"
    );
  }
  function opsOrderDashboard() {
    const d = opsData(),
      f = opsSourceState.orderFilters,
      time = opsOrderTimeContext(),
      type = opsSourceState.orderRecruitType,
      peopleFactor = ["am", "supervisor", "teamLead", "recruiter"].reduce(
        (factor, key) => factor * (f[key] && f[key] !== "all" ? 0.78 : 1),
        1,
      ),
      scopeFactor =
        (f.project !== "all" ? 0.18 : 1) *
        (f.region !== "all" ? 0.36 : 1) *
        (f.city !== "all" ? 0.52 : 1) *
        (f.position !== "all" ? 0.58 : 1) *
        peopleFactor,
      baseTotal = Math.max(1, Math.round(d.order * scopeFactor)),
      newCount = Math.round(baseTotal * 0.64),
      replaceCount = baseTotal - newCount,
      typeFactor = type === "new" ? 0.64 : type === "replace" ? 0.36 : 1,
      total = Math.max(1, Math.round(baseTotal * typeFactor)),
      today = Math.max(1, Math.round((total / time.count) * 1.08)),
      done = Math.min(total, Math.round((d.done / d.order) * total)),
      close = Math.min(total - done, Math.round((d.close / d.order) * total)),
      processing = Math.max(0, total - done - close),
      doneOn = Math.round(done * (type === "replace" ? 0.71 : d.otif / 100)),
      doneLate = done - doneOn,
      processingLate = Math.min(
        processing,
        Math.max(0, Math.round((d.late / d.order) * total)),
      ),
      processingOn = processing - processingLate,
      lateNo = Math.min(
        processingLate,
        Math.max(
          0,
          Math.round(
            (d.noCandidate / d.order) * total * (type === "replace" ? 1.35 : 1),
          ),
        ),
      ),
      lateHas = processingLate - lateNo,
      onNo = Math.min(
        processingOn,
        Math.round(processingOn * (type === "replace" ? 0.18 : 0.1)),
      ),
      onHas = processingOn - onNo,
      rate = done ? Math.round((doneOn / done) * 100) : 0;
    if (time.future)
      return '<div class="ops-order-alert"><b>!</b><span>Dữ liệu không tồn tại ở mốc thời gian này. Hãy chọn khoảng thời gian kết thúc trước hoặc bằng ngày hiện tại.</span></div>';
    const node = (label, value, left, top, state, note) =>
        '<article class="ops-board-node final focused ' +
        (state || "") +
        '" style="left:' +
        left +
        "%;top:" +
        top +
        '%"><label>' +
        label +
        "</label><strong>" +
        opsFmt(value) +
        "</strong><small>" +
        (note || Math.round((value / total) * 100) + "% tổng") +
        "</small></article>",
      wire = (kind, left, top, size, state) =>
        '<i class="ops-board-wire ' +
        kind +
        " " +
        (state || "") +
        '" style="left:' +
        left +
        "%;top:" +
        top +
        "%;" +
        (kind === "h" ? "width" : "height") +
        ":" +
        size +
        '%"></i>',
      typeButton = (key, label, value, share) =>
        '<button type="button" data-order-type="' +
        key +
        '" class="ops-support-type ' +
        (type === key ? "active" : "") +
        '"><span>' +
        label +
        "</span><strong>" +
        opsFmt(value) +
        "</strong><small>" +
        share +
        "% Order</small></button>";
    const nodes =
      node(
        time.currentLabel,
        today,
        1,
        56,
        "",
        Math.round((today / total) * 100) + "% lũy tiến",
      ) +
      node(
        "Order lũy tiến",
        total,
        20,
        56,
        "path-root",
        time.count + " " + time.periodName,
      ) +
      node("Done", done, 40, 17, "") +
      node("Processing", processing, 40, 56, "path-risk") +
      node("Close", close, 40, 91, "") +
      node("On-Time", doneOn, 60, 9, "") +
      node("Late", doneLate, 60, 26, "") +
      node("On-Time", processingOn, 60, 50, "") +
      node("Late", processingLate, 60, 76, "path-risk") +
      node("Có UV", onHas, 80, 44, "") +
      node("Không có UV / Tuyển lại", onNo, 80, 59, onNo > 0 ? "alert" : "") +
      node("Có UV", lateHas, 80, 75, "") +
      node(
        "Không có UV / Tuyển lại",
        lateNo,
        80,
        91,
        "path-critical",
        "Cảnh báo · " + Math.round((lateNo / total) * 100) + "% tổng",
      );
    const wires =
      wire("h", 14.5, 56, 5.5) +
      wire("h", 33.5, 56, 4.5, "path") +
      wire("v", 38, 17, 74) +
      wire("h", 38, 17, 2) +
      wire("h", 38, 56, 2, "path") +
      wire("h", 38, 91, 2) +
      wire("h", 53.5, 17, 3.5) +
      wire("v", 57, 9, 17) +
      wire("h", 57, 9, 3) +
      wire("h", 57, 26, 3) +
      wire("h", 53.5, 56, 3.5, "path") +
      wire("v", 57, 50, 26, "path") +
      wire("h", 57, 50, 3) +
      wire("h", 57, 76, 3, "path") +
      wire("h", 73.5, 50, 3.5) +
      wire("v", 77, 44, 15) +
      wire("h", 77, 44, 3) +
      wire("h", 77, 59, 3) +
      wire("h", 73.5, 76, 3.5, "path") +
      wire("v", 77, 75, 16, "path") +
      wire("h", 77, 75, 3) +
      wire("h", 77, 91, 3, "path");
    const dock =
      '<details class="ops-info-dock"><summary><span>Fulfill Ontime Rate<strong>' +
      rate +
      "%</strong></span><span>Tuyển mới<strong>" +
      opsFmt(newCount) +
      "</strong></span><span>Tuyển lại<strong>" +
      opsFmt(replaceCount) +
      '</strong></span></summary><div class="ops-info-panel">' +
      typeButton("new", "Tuyển mới", newCount, 64) +
      typeButton("replace", "Tuyển lại", replaceCount, 36) +
      "</div></details>";
    return (
      '<div class="ops-board"><div class="ops-board-inner"><div class="ops-board-toolbar final focused"><div class="ops-board-heading"><h2>Luồng phân bổ Order</h2><p><b>% tổng</b> = Giá trị node / Order lũy tiến. <span class="ops-focus-note">Đỏ thẫm đánh dấu tuyến rủi ro cần ưu tiên giải trình.</span></p></div>' +
      dock +
      '</div><div class="ops-board-levels focused"><div><span>1</span>Order</div><div><span>2</span>Trạng thái</div><div><span>3</span>OTIF</div><div><span>4</span>Tình trạng UV</div></div><div class="ops-board-canvas final focused"><i class="ops-board-lane on"></i><i class="ops-board-lane late"></i>' +
      wires +
      nodes +
      "</div></div></div>"
    );
  }
  const opsOrderDashboardBeforeTrend = opsOrderDashboard;
  opsOrderDashboard = function () {
    const deltas = [9, 4, 12, -3, 5, 2, 7, 18, 5, 11, 9, 24],
      series = [
        [5, 7, 8, 10, 12],
        [7, 8, 7, 10, 11],
        [4, 6, 8, 10, 14],
        [10, 8, 9, 7, 6],
        [6, 7, 9, 10, 12],
        [11, 10, 8, 9, 7],
        [5, 7, 6, 10, 12],
        [4, 6, 8, 11, 15],
        [6, 7, 8, 10, 11],
        [5, 7, 8, 9, 12],
        [5, 6, 9, 11, 13],
        [3, 5, 7, 11, 15],
      ];
    let html = opsOrderDashboardBeforeTrend(),
      index = 0,
      todayLabel = "Order hôm nay",
      todayValue = "";
    html = html
      .replace(
        /<article class="ops-board-node final focused " style="left:1%;top:56%"><label>([\s\S]*?)<\/label><strong>([\s\S]*?)<\/strong><small>[\s\S]*?<\/small><\/article>/,
        (match, label, value) => {
          todayLabel = label;
          todayValue = value;
          return "";
        },
      )
      .replace(
        /<i class="ops-board-wire h " style="left:14\.5%;top:56%;width:5\.5%"><\/i>/,
        "",
      )
      .replace("left:20%;top:56%", "left:10%;top:56%")
      .replace(
        "left:33.5%;top:56%;width:4.5%",
        "left:23.5%;top:56%;width:14.5%",
      )
      .replace(
        /(<article class="ops-board-node final focused path-root"[^>]*>[\s\S]*?)(<\/article>)/,
        '$1<div class="ops-order-today-inline"><span>' +
          todayLabel +
          "</span><strong>" +
          todayValue +
          "</strong><em>↑ 6% vs kỳ trước</em></div>$2",
      );
    return html
      .replace(
        "ops-board-canvas final focused",
        "ops-board-canvas final focused trended",
      )
      .replaceAll("top:44%", "top:43%")
      .replaceAll("top:59%", "top:60%")
      .replaceAll("top:75%", "top:76%")
      .replaceAll("top:91%", "top:93%")
      .replace("top:43%;height:15%", "top:43%;height:17%")
      .replace("top:76%;height:16%", "top:76%;height:17%")
      .replace(
        /<article class="ops-board-node final focused ([^"]*)"([^>]*)>([\s\S]*?)<\/article>/g,
        (match, state, attrs, body) => {
          const delta = deltas[index] ?? 0,
            bars = series[index] || series[0],
            direction = delta > 0 ? "up" : delta < 0 ? "down" : "flat",
            arrow = delta > 0 ? "↑" : delta < 0 ? "↓" : "–";
          index++;
          return (
            '<article class="ops-board-node final focused has-trend ' +
            state +
            '"' +
            attrs +
            ">" +
            body.replace(
              /<small>([\s\S]*?)<\/small>/,
              '<small><span class="ops-node-context"><span>$1</span><span class="ops-node-vs ' +
                direction +
                '">' +
                arrow +
                " " +
                Math.abs(delta) +
                '% vs kỳ trước</span></span><span class="ops-mini-trend" aria-hidden="true">' +
                bars
                  .map((height) => '<i style="height:' + height + 'px"></i>')
                  .join("") +
                "</span></small>",
            ) +
            "</article>"
          );
        },
      );
  };
  opsOrderDashboard = function () {
    const d = opsData(),
      f = opsSourceState.orderFilters,
      time = opsOrderTimeContext(),
      peopleFactor = ["am", "supervisor", "teamLead", "recruiter"].reduce(
        (factor, key) => factor * (f[key] && f[key] !== "all" ? 0.78 : 1),
        1,
      ),
      scopeFactor =
        (f.project !== "all" ? 0.18 : 1) *
        (f.region !== "all" ? 0.36 : 1) *
        (f.city !== "all" ? 0.52 : 1) *
        (f.position !== "all" ? 0.58 : 1) *
        peopleFactor,
      total = Math.max(1, Math.round(d.order * scopeFactor)),
      today = Math.max(1, Math.round((total / time.count) * 1.08)),
      done = Math.min(total, Math.round((d.done / d.order) * total)),
      close = Math.min(total - done, Math.round((d.close / d.order) * total)),
      processing = Math.max(0, total - done - close),
      doneOn = Math.round((done * d.otif) / 100),
      doneLate = done - doneOn,
      processingLate = Math.min(
        processing,
        Math.max(0, Math.round((d.late / d.order) * total)),
      ),
      processingOn = processing - processingLate,
      lateNo = Math.min(
        processingLate,
        Math.max(0, Math.round((d.noCandidate / d.order) * total)),
      ),
      lateHas = processingLate - lateNo,
      onNo = Math.min(processingOn, Math.round(processingOn * 0.1)),
      onHas = processingOn - onNo,
      fulfill = done ? Math.round((doneOn / done) * 100) : 0,
      official = Math.round(total * 0.72),
      backup = total - official,
      newCount = Math.round(total * 0.64),
      replaceCount = total - newCount,
      start = opsSourceState.orderPhaseOne || "flow-new",
      selected = opsSourceState.orderPath || "candidate-late-no";
    if (time.future)
      return '<div class="ops-order-alert"><b>!</b><span>Dữ liệu không tồn tại ở mốc thời gian này. Hãy chọn khoảng thời gian kết thúc trước hoặc bằng ngày hiện tại.</span></div>';
    const routeMap = {
        "status-done": ["status-done", "otif-done-on"],
        "status-processing": [
          "status-processing",
          "otif-processing-late",
          "candidate-late-no",
        ],
        "status-close": ["status-close"],
        "otif-done-on": ["status-done", "otif-done-on"],
        "otif-done-late": ["status-done", "otif-done-late"],
        "otif-processing-on": [
          "status-processing",
          "otif-processing-on",
          "candidate-on-has",
        ],
        "otif-processing-late": [
          "status-processing",
          "otif-processing-late",
          "candidate-late-no",
        ],
        "candidate-on-has": [
          "status-processing",
          "otif-processing-on",
          "candidate-on-has",
        ],
        "candidate-on-no": [
          "status-processing",
          "otif-processing-on",
          "candidate-on-no",
        ],
        "candidate-late-has": [
          "status-processing",
          "otif-processing-late",
          "candidate-late-has",
        ],
        "candidate-late-no": [
          "status-processing",
          "otif-processing-late",
          "candidate-late-no",
        ],
      },
      active = [
        start,
        ...(routeMap[selected] || routeMap["candidate-late-no"]),
      ],
      dist = (value) => Math.round((value / total) * 100),
      row = (step, key, name, value, change, group, extra, terminal) =>
        '<tr tabindex="0" data-phase-step="' +
        step +
        '" data-phase-path="' +
        key +
        '" class="' +
        (active.includes(key) ? "path-active " : "") +
        (terminal ? "path-terminal " : "") +
        (extra === "measure" ? "measure-start" : "") +
        '"><td><span class="phase-name">' +
        name +
        "</span>" +
        (group ? '<span class="phase-group">' + group + "</span>" : "") +
        '</td><td><span class="phase-value">' +
        opsFmt(value) +
        '</span><span class="phase-dist">' +
        dist(value) +
        '% Dist.</span></td><td class="phase-change">' +
        (change >= 0 ? "↑ " : "↓ ") +
        Math.abs(change) +
        "%</td>" +
        (extra && extra !== "measure"
          ? '<td class="phase-fulfill">' + extra + "</td>"
          : "") +
        "</tr>",
      table = (rows, fulfillColumn) =>
        '<table class="ops-mini-table ' +
        (fulfillColumn ? "fulfill-table" : "") +
        '"><thead><tr><th>Tên</th><th>Số lượng & %Dist.</th><th>%Change</th>' +
        (fulfillColumn ? "<th>Fulfill</th>" : "") +
        "</tr></thead><tbody>" +
        rows +
        "</tbody></table>",
      phase = (index, title, body) =>
        '<section class="ops-phase-card"><div class="ops-phase-title"><span>' +
        index +
        "</span>" +
        title +
        "</div>" +
        body +
        "</section>";
    const classification =
        row(1, "flow-official", "Chính thức", official, 4, "Luồng") +
        row(1, "flow-backup", "Dự phòng", backup, -3, "Luồng") +
        row(1, "flow-new", "Tuyển mới", newCount, 7, "Loại tuyển", "measure") +
        row(1, "flow-replace", "Tuyển lại", replaceCount, 11, "Loại tuyển"),
      status =
        row(2, "status-done", "Done", done, 4) +
        row(2, "status-processing", "Processing", processing, 12) +
        row(2, "status-close", "Close", close, -3),
      otif =
        row(3, "otif-done-on", "On-Time", doneOn, 5, "Từ Done", fulfill + "%") +
        row(3, "otif-done-late", "Late", doneLate, 2, "Từ Done", "—") +
        row(
          3,
          "otif-processing-on",
          "On-Time",
          processingOn,
          7,
          "Từ Processing",
          "—",
        ) +
        row(
          3,
          "otif-processing-late",
          "Late",
          processingLate,
          18,
          "Từ Processing",
          "—",
        ),
      candidate =
        row(4, "candidate-on-has", "Có UV", onHas, 5, "Processing On-Time") +
        row(
          4,
          "candidate-on-no",
          "Không có UV / Tuyển lại",
          onNo,
          11,
          "Processing On-Time",
        ) +
        row(4, "candidate-late-has", "Có UV", lateHas, 9, "Processing Late") +
        row(
          4,
          "candidate-late-no",
          "Không có UV / Tuyển lại",
          lateNo,
          24,
          "Processing Late",
          undefined,
          true,
        );
    const order =
      '<article class="ops-phase-kpi"><label>Order lũy tiến</label><div class="ops-phase-kpi-main"><strong>' +
      opsFmt(total) +
      '</strong><small>↑ 9% vs kỳ trước</small></div><div class="ops-phase-today"><span>' +
      time.currentLabel +
      "</span><strong>" +
      opsFmt(today) +
      '</strong></div></article><div class="ops-interpreted"><label>Interpreted table</label>' +
      table(classification, false) +
      "</div>";
    return (
      '<div class="ops-phase-flow" id="ops-phase-flow"><div class="ops-phase-path-layer" aria-hidden="true"></div><div class="ops-phase-flow-head"><div><h2>Luồng phân bổ Order</h2><p>Chọn một value để chuyển path. <b>Row và connector đỏ</b> là tuyến đang được bắt.</p></div></div><div class="ops-phase-grid">' +
      phase("1", "Order", order) +
      phase("2", "Trạng thái", table(status, false)) +
      phase("3", "OTIF", table(otif, true)) +
      phase("4", "Tình trạng UV", table(candidate, false)) +
      '</div><div class="ops-phase-legend"><span><b>%Dist.</b> = Số lượng / Order lũy tiến.</span></div></div>'
    );
  };
  const opsOrderDashboardBeforeCardFix = opsOrderDashboard;
  opsOrderDashboard = function () {
    return opsOrderDashboardBeforeCardFix().replaceAll(
      "ops-mini-table",
      "ops-phase-table",
    );
  };
  opsOrderDashboard = function () {
    const d = opsData(),
      f = opsSourceState.orderFilters,
      time = opsOrderTimeContext(),
      peopleFactor = ["am", "supervisor", "teamLead", "recruiter"].reduce(
        (factor, key) => factor * (f[key] && f[key] !== "all" ? 0.78 : 1),
        1,
      ),
      scopeFactor =
        (f.project !== "all" ? 0.18 : 1) *
        (f.region !== "all" ? 0.36 : 1) *
        (f.city !== "all" ? 0.52 : 1) *
        (f.position !== "all" ? 0.58 : 1) *
        peopleFactor,
      total = Math.max(1, Math.round(d.order * scopeFactor)),
      today = Math.max(1, Math.round((total / time.count) * 1.08)),
      done = Math.min(total, Math.round((d.done / d.order) * total)),
      closeOther = Math.min(
        total - done,
        Math.round((d.close / d.order) * total),
      ),
      processing = Math.max(0, total - done - closeOther),
      doneOn = Math.round((done * d.otif) / 100),
      doneLate = done - doneOn,
      processingLate = Math.min(
        processing,
        Math.max(0, Math.round((d.late / d.order) * total)),
      ),
      processingOn = processing - processingLate,
      lateNo = Math.min(
        processingLate,
        Math.max(0, Math.round((d.noCandidate / d.order) * total)),
      ),
      lateHas = processingLate - lateNo,
      onNo = Math.min(processingOn, Math.round(processingOn * 0.1)),
      onHas = processingOn - onNo,
      fulfill = done ? Math.round((doneOn / done) * 100) : 0,
      official = Math.round(total * 0.72),
      backup = total - official,
      newCount = Math.round(total * 0.64),
      replaceCount = total - newCount,
      closed = Math.round(closeOther * 0.55),
      pending = Math.round(closeOther * 0.3),
      rejected = closeOther - closed - pending,
      start = opsSourceState.orderPhaseOne || "",
      selected = opsSourceState.orderPath || "candidate-late-no";
    if (time.future)
      return '<div class="ops-order-alert"><b>!</b><span>Dữ liệu không tồn tại ở mốc thời gian này. Hãy chọn khoảng thời gian kết thúc trước hoặc bằng ngày hiện tại.</span></div>';
    const branch =
        selected === "status-done" || selected.startsWith("otif-done")
          ? "done"
          : selected === "status-close-other" || selected.startsWith("close-")
            ? "close"
            : "processing",
      active =
        branch === "done"
          ? [
              "status-done",
              selected.startsWith("otif-done") ? selected : "otif-done-on",
            ]
          : branch === "close"
            ? [
                "status-close-other",
                selected.startsWith("close-") ? selected : "close-closed",
              ]
            : [
                "status-processing",
                selected.startsWith("otif-processing-on")
                  ? "otif-processing-on"
                  : selected.startsWith("candidate-on")
                    ? "otif-processing-on"
                    : "otif-processing-late",
                selected.startsWith("candidate-")
                  ? selected
                  : "candidate-late-no",
              ],
      dist = (value) => Math.round((value / total) * 100),
      row = (
        step,
        key,
        name,
        value,
        change,
        group,
        fulfillValue,
        terminal,
        measureStart,
      ) =>
        '<tr tabindex="0" data-phase-node data-phase-step="' +
        step +
        '" data-phase-path="' +
        key +
        '" class="' +
        (key === start || active.includes(key) ? "path-active " : "") +
        (terminal ? "path-terminal " : "") +
        (measureStart ? "measure-start" : "") +
        '"><td><span class="phase-name">' +
        name +
        "</span>" +
        (group ? '<span class="phase-group">' + group + "</span>" : "") +
        '</td><td><span class="phase-value">' +
        opsFmt(value) +
        '</span><span class="phase-dist">' +
        dist(value) +
        '% Dist.</span></td><td class="phase-change">' +
        (change >= 0 ? "↑ " : "↓ ") +
        Math.abs(change) +
        "%</td>" +
        (fulfillValue !== undefined
          ? '<td class="phase-fulfill">' + fulfillValue + "</td>"
          : "") +
        "</tr>",
      table = (rows, fulfillColumn) =>
        '<table class="ops-phase-table ' +
        (fulfillColumn ? "fulfill-table" : "") +
        '"><thead><tr><th>Tên</th><th>Số lượng & %Dist.</th><th>%Change</th>' +
        (fulfillColumn ? '<th class="fulfill-head">Fulfill %</th>' : "") +
        "</tr></thead><tbody>" +
        rows +
        "</tbody></table>",
      phase = (index, title, body, detail) =>
        '<section class="ops-phase-card ' +
        (detail ? "phase-detail" : "") +
        '"><div class="ops-phase-title"><span>' +
        index +
        "</span>" +
        title +
        "</div>" +
        body +
        "</section>";
    const classification =
        row(
          1,
          "flow-official",
          "Chính thức",
          official,
          4,
          "Luồng",
          undefined,
          false,
          false,
        ) +
        row(
          1,
          "flow-backup",
          "Dự phòng",
          backup,
          -3,
          "Luồng",
          undefined,
          false,
          false,
        ) +
        row(
          1,
          "flow-new",
          "Tuyển mới",
          newCount,
          7,
          "Loại tuyển",
          undefined,
          false,
          true,
        ) +
        row(1, "flow-replace", "Tuyển lại", replaceCount, 11, "Loại tuyển"),
      status =
        row(2, "status-done", "Done", done, 4) +
        row(2, "status-processing", "Processing", processing, 12) +
        row(2, "status-close-other", "Close & Other", closeOther, -3),
      doneOtif =
        row(3, "otif-done-on", "On-Time", doneOn, 5, "Từ Done", fulfill + "%") +
        row(3, "otif-done-late", "Late", doneLate, 2, "Từ Done", "—"),
      processingOtif =
        row(
          3,
          "otif-processing-on",
          "On-Time",
          processingOn,
          7,
          "Từ Processing",
        ) +
        row(
          3,
          "otif-processing-late",
          "Late",
          processingLate,
          18,
          "Từ Processing",
        ),
      candidate =
        row(4, "candidate-on-has", "Có UV", onHas, 5, "Processing On-Time") +
        row(
          4,
          "candidate-on-no",
          "Không có UV / Tuyển lại",
          onNo,
          11,
          "Processing On-Time",
        ) +
        row(4, "candidate-late-has", "Có UV", lateHas, 9, "Processing Late") +
        row(
          4,
          "candidate-late-no",
          "Không có UV / Tuyển lại",
          lateNo,
          24,
          "Processing Late",
          undefined,
          true,
        ),
      closeDetail =
        row(3, "close-closed", "Close", closed, -2, "Close & Other") +
        row(3, "close-pending", "Pending", pending, 6, "Close & Other") +
        row(3, "close-rejected", "Không duyệt", rejected, 3, "Close & Other");
    const order =
        '<article class="ops-phase-kpi ' +
        (!start ? "path-active" : "") +
        '" tabindex="0" data-phase-node data-phase-step="1" data-phase-total><label>Order lũy tiến</label><div class="ops-phase-kpi-main"><strong>' +
        opsFmt(total) +
        '</strong><small>↑ 9% vs kỳ trước</small></div><div class="ops-phase-today"><span>' +
        time.currentLabel +
        "</span><strong>" +
        opsFmt(today) +
        '</strong></div></article><div class="ops-interpreted"><div class="ops-phase-source-hint"><span>Interpreted table</span><b>' +
        (start ? "Đang bắt từ breakdown" : "Mặc định bắt từ Total") +
        "</b></div>" +
        table(classification, false) +
        "</div>",
      phaseThree =
        branch === "done"
          ? phase("3", "OTIF · Done", table(doneOtif, true), true)
          : branch === "close"
            ? phase(
                "3",
                "Chi tiết Close & Other",
                table(closeDetail, false),
                true,
              )
            : phase(
                "3",
                "OTIF · Processing",
                table(processingOtif, false),
                true,
              ),
      phaseFour =
        branch === "processing"
          ? phase("4", "Tình trạng UV", table(candidate, false), true)
          : "";
    return (
      '<div class="ops-phase-flow" id="ops-phase-flow"><div class="ops-phase-path-layer" aria-hidden="true"></div><div class="ops-phase-flow-head"><div><h2>Luồng phân bổ Order</h2><p>Nguồn mặc định là <b>Order lũy tiến</b>. Click breakdown để bắt/nhả nguồn; click status để đổi nhánh.</p></div></div><div class="ops-phase-grid ' +
      (branch === "processing" ? "" : "phases-3") +
      '">' +
      phase("1", "Order", order) +
      phase("2", "Trạng thái", table(status, false)) +
      phaseThree +
      phaseFour +
      '</div><div class="ops-phase-legend"><span><b>Path mặc định:</b> Processing → Late → Không có UV/Tuyển lại.</span></div></div>'
    );
  };
  const opsOrderDashboardBeforeUvGroups = opsOrderDashboard;
  opsOrderDashboard = function () {
    let html = opsOrderDashboardBeforeUvGroups();
    if (!html.includes("Tình trạng UV")) return html;
    html = html.replace(
      'Tình trạng UV</div><table class="ops-phase-table ',
      'Tình trạng UV</div><table class="ops-phase-table candidate-table ',
    );
    html = html
      .replace(
        /(<tr[^>]*data-phase-path="candidate-on-has"[^>]*>)/,
        '<tr class="candidate-parent"><td colspan="3"><span>Processing On-Time</span><b>128 Order</b></td></tr>$1',
      )
      .replace(
        /(<tr[^>]*data-phase-path="candidate-late-has"[^>]*>)/,
        '<tr class="candidate-parent"><td colspan="3"><span>Processing Late</span><b>95 Order</b></td></tr>$1',
      )
      .replaceAll('<span class="phase-group">Processing On-Time</span>', "")
      .replaceAll('<span class="phase-group">Processing Late</span>', "")
      .replace(
        /<tr([^>]*data-phase-path="candidate-[^"]+"[^>]*)>/g,
        '<tr$1 class="phase-child $2">',
      );
    return html;
  };
  const opsOrderDashboardBeforeUvSanitize = opsOrderDashboard;
  opsOrderDashboard = function () {
    return opsOrderDashboardBeforeUvSanitize()
      .replaceAll(' class="phase-child $2"', "")
      .replace("128 Order", "2 tình trạng")
      .replace("95 Order", "2 tình trạng");
  };
  opsOrderDashboard = function () {
    const d = opsData(),
      f = opsSourceState.orderFilters,
      time = opsOrderTimeContext(),
      peopleFactor = ["am", "supervisor", "teamLead", "recruiter"].reduce(
        (factor, key) => factor * (f[key] && f[key] !== "all" ? 0.78 : 1),
        1,
      ),
      scopeFactor =
        (f.project !== "all" ? 0.18 : 1) *
        (f.region !== "all" ? 0.36 : 1) *
        (f.city !== "all" ? 0.52 : 1) *
        (f.position !== "all" ? 0.58 : 1) *
        peopleFactor,
      total = Math.max(1, Math.round(d.order * scopeFactor)),
      today = Math.max(1, Math.round((total / time.count) * 1.08)),
      done = Math.min(total, Math.round((d.done / d.order) * total)),
      closeOther = Math.min(
        total - done,
        Math.round((d.close / d.order) * total),
      ),
      processing = Math.max(0, total - done - closeOther),
      doneOn = Math.round((done * d.otif) / 100),
      doneLate = done - doneOn,
      processingLate = Math.min(
        processing,
        Math.max(0, Math.round((d.late / d.order) * total)),
      ),
      processingOn = processing - processingLate,
      lateNo = Math.min(
        processingLate,
        Math.max(0, Math.round((d.noCandidate / d.order) * total)),
      ),
      lateHas = processingLate - lateNo,
      onNo = Math.min(processingOn, Math.round(processingOn * 0.1)),
      onHas = processingOn - onNo,
      fulfill = done ? Math.round((doneOn / done) * 100) : 0,
      official = Math.round(total * 0.72),
      backup = total - official,
      newCount = Math.round(total * 0.64),
      replaceCount = total - newCount,
      closed = Math.round(closeOther * 0.55),
      pending = Math.round(closeOther * 0.3),
      rejected = closeOther - closed - pending,
      start = opsSourceState.orderPhaseOne || "",
      selected = opsSourceState.orderPath || "candidate-late-no";
    if (time.future)
      return '<div class="ops-order-alert"><b>!</b><span>Dữ liệu không tồn tại ở mốc thời gian này. Hãy chọn khoảng thời gian kết thúc trước hoặc bằng ngày hiện tại.</span></div>';
    const branch =
        selected === "status-done" || selected.startsWith("otif-done")
          ? "done"
          : selected === "status-close-other" || selected.startsWith("close-")
            ? "close"
            : "processing",
      active =
        branch === "done"
          ? [
              "status-done",
              selected.startsWith("otif-done") ? selected : "otif-done-on",
            ]
          : branch === "close"
            ? [
                "status-close-other",
                selected.startsWith("close-") ? selected : "close-closed",
              ]
            : [
                "status-processing",
                selected.startsWith("candidate-on") ||
                selected === "otif-processing-on"
                  ? "otif-processing-on"
                  : "otif-processing-late",
                selected.startsWith("candidate-")
                  ? selected
                  : "candidate-late-no",
              ],
      dist = (value) => Math.round((value / total) * 100),
      metric = (step, key, name, value, change, sub) =>
        '<button type="button" class="ops-swim-metric ' +
        (active.includes(key) ? "path-active" : "") +
        '" data-phase-step="' +
        step +
        '" data-phase-path="' +
        key +
        '"><span>' +
        name +
        (sub ? "<small>" + sub + "</small>" : "") +
        "</span><b>" +
        opsFmt(value) +
        "</b><em>" +
        dist(value) +
        "% · " +
        (change >= 0 ? "↑" : "↓") +
        Math.abs(change) +
        "%</em></button>",
      status = (key, name, value, change) =>
        '<button type="button" class="ops-swim-status" data-phase-step="2" data-phase-path="' +
        key +
        '"><div class="ops-swim-lane-title"><strong>' +
        name +
        "</strong><span>" +
        opsFmt(value) +
        " · " +
        dist(value) +
        '%</span></div><small class="ops-swim-lane-meta">' +
        (change >= 0 ? "↑" : "↓") +
        " " +
        Math.abs(change) +
        "% vs kỳ trước</small></button>",
      breakRow = (key, name, value, change, group) =>
        '<button type="button" class="ops-swim-break-row ' +
        (start === key ? "path-active" : "") +
        '" data-phase-step="1" data-phase-path="' +
        key +
        '"><span>' +
        name +
        "<small>" +
        group +
        "</small></span><b>" +
        opsFmt(value) +
        "</b><em>" +
        dist(value) +
        "% · " +
        (change >= 0 ? "↑" : "↓") +
        Math.abs(change) +
        "%</em></button>",
      laneClass = (name) =>
        "ops-swim-cell " + (branch === name ? "lane-active " : "");
    const order =
      '<section class="ops-swim-cell ops-swim-order ' +
      (!start ? "lane-active" : "") +
      '" data-phase-total data-phase-step="1"><div class="ops-swim-order-main"><label>Order lũy tiến</label><div class="ops-swim-order-value"><strong>' +
      opsFmt(total) +
      '</strong><small>↑ 9% vs kỳ trước</small></div><div class="ops-swim-today"><span>' +
      time.currentLabel +
      "</span><strong>" +
      opsFmt(today) +
      '</strong></div></div><div class="ops-swim-breakdown"><span>Interpreted table · click để bắt/nhả nguồn</span>' +
      breakRow("flow-official", "Chính thức", official, 4, "Luồng") +
      breakRow("flow-backup", "Dự phòng", backup, -3, "Luồng") +
      breakRow("flow-new", "Tuyển mới", newCount, 7, "Loại tuyển") +
      breakRow("flow-replace", "Tuyển lại", replaceCount, 11, "Loại tuyển") +
      "</div></section>";
    return (
      '<div class="ops-swim"><div class="ops-swim-head"><div><h2>Luồng phân bổ Order</h2><p>Toàn bộ dữ liệu được giữ trong ba swimlane. <b>Lane đỏ nhạt</b> là path đang chọn.</p></div></div><div class="ops-swim-headers"><div class="ops-swim-header"><span>1</span>Order</div><div class="ops-swim-header"><span>2</span>Trạng thái</div><div class="ops-swim-header"><span>3</span>OTIF / Chi tiết</div><div class="ops-swim-header"><span>4</span>Tình trạng UV</div></div><div class="ops-swim-matrix">' +
      order +
      '<section class="' +
      laneClass("done") +
      'ops-swim-done">' +
      status("status-done", "Done", done, 4) +
      '</section><section class="' +
      laneClass("done") +
      'ops-swim-done-otif">' +
      metric(
        3,
        "otif-done-on",
        "On-Time",
        doneOn,
        5,
        "Fulfill " + fulfill + "%",
      ) +
      metric(3, "otif-done-late", "Late", doneLate, 2, "Từ Done") +
      '</section><section class="' +
      laneClass("done") +
      'ops-swim-done-end swim-last ops-swim-empty">Kết thúc tại OTIF</section><section class="' +
      laneClass("processing") +
      'ops-swim-processing">' +
      status("status-processing", "Processing", processing, 12) +
      '</section><section class="' +
      laneClass("processing") +
      'ops-swim-processing-otif">' +
      metric(
        3,
        "otif-processing-on",
        "On-Time",
        processingOn,
        7,
        "Từ Processing",
      ) +
      metric(
        3,
        "otif-processing-late",
        "Late",
        processingLate,
        18,
        "Từ Processing",
      ) +
      '</section><section class="' +
      laneClass("processing") +
      'ops-swim-processing-uv swim-last"><span class="ops-swim-group">Từ Processing On-Time</span>' +
      metric(4, "candidate-on-has", "Có UV", onHas, 5) +
      metric(4, "candidate-on-no", "Không có UV / Tuyển lại", onNo, 11) +
      '<span class="ops-swim-group">Từ Processing Late</span>' +
      metric(4, "candidate-late-has", "Có UV", lateHas, 9) +
      metric(4, "candidate-late-no", "Không có UV / Tuyển lại", lateNo, 24) +
      '</section><section class="' +
      laneClass("close") +
      'ops-swim-close">' +
      status("status-close-other", "Close & Other", closeOther, -3) +
      '</section><section class="' +
      laneClass("close") +
      'ops-swim-close-detail">' +
      metric(3, "close-closed", "Close", closed, -2) +
      metric(3, "close-pending", "Pending", pending, 6) +
      metric(3, "close-rejected", "Không duyệt", rejected, 3) +
      '</section><section class="' +
      laneClass("close") +
      'ops-swim-close-end swim-last ops-swim-empty">Không có Tình trạng UV</section></div><div class="ops-swim-note"><span><b>Path mặc định:</b> Processing → Late → Không có UV/Tuyển lại.</span></div></div>'
    );
  };
  const opsOrderDashboardBeforeTealPath = opsOrderDashboard;
  opsOrderDashboard = function () {
    return opsOrderDashboardBeforeTealPath().replace(
      "Lane đỏ nhạt",
      "Lane xanh teal",
    );
  };
  function opsOrderTrendLabels() {
    const time = opsOrderTimeContext(),
      labels = [];
    for (let i = 0; i < time.count; i++) {
      const date = new Date(time.anchor);
      if (opsSourceState.orderFilters.period === "day")
        date.setDate(date.getDate() + i);
      else if (opsSourceState.orderFilters.period === "week")
        date.setDate(date.getDate() + i * 7);
      else date.setMonth(date.getMonth() + i);
      if (opsSourceState.orderFilters.period === "day")
        labels.push(
          String(date.getDate()).padStart(2, "0") +
            "/" +
            String(date.getMonth() + 1).padStart(2, "0"),
        );
      else if (opsSourceState.orderFilters.period === "week") {
        const start = new Date(date.getFullYear(), 0, 1),
          week = Math.ceil(
            ((date - start) / 86400000 + start.getDay() + 1) / 7,
          );
        labels.push("W" + week);
      } else labels.push("T" + (date.getMonth() + 1));
    }
    return labels;
  }
  function opsOrderTrendData() {
    const data = opsData(),
      f = opsSourceState.orderFilters,
      time = opsOrderTimeContext(),
      peopleFactor = ["am", "supervisor", "teamLead", "recruiter"].reduce(
        (factor, key) => factor * (f[key] && f[key] !== "all" ? 0.78 : 1),
        1,
      ),
      scopeFactor =
        (f.project !== "all" ? 0.18 : 1) *
        (f.region !== "all" ? 0.36 : 1) *
        (f.city !== "all" ? 0.52 : 1) *
        (f.position !== "all" ? 0.58 : 1) *
        peopleFactor,
      total = Math.max(1, Math.round(data.order * scopeFactor)),
      weights = Array.from(
        { length: time.count },
        (_, i) => 1 + Math.sin(i * 0.86) * 0.12 + ((i % 3) - 1) * 0.035,
      ),
      sum = weights.reduce((a, b) => a + b, 0),
      totals = weights.map((w) => Math.max(1, Math.round((total * w) / sum)));
    totals[totals.length - 1] += total - totals.reduce((a, b) => a + b, 0);
    return opsOrderTrendLabels().map((label, i) => {
      const doneRate = 0.64 + (i % 4) * 0.025,
        done = Math.round(totals[i] * doneRate),
        processing = totals[i] - done,
        onRate = 0.76 + (i % 3) * 0.035,
        onTime = Math.round(done * onRate),
        late = done - onTime,
        sent = Math.round(totals[i] * (1.16 + (i % 3) * 0.06));
      return { label, total: totals[i], done, processing, onTime, late, sent };
    });
  }
  function opsOrderTrendCharts() {
    const rows = opsOrderTrendData(),
      mode = opsSourceState.orderChartMode || "stacked",
      hundred = mode === "percent",
      max = Math.max(...rows.map((row) => Math.max(row.total, row.sent)), 1),
      maxDone = Math.max(...rows.map((row) => row.done), 1),
      avgTotal = Math.round(
        rows.reduce((sum, row) => sum + row.total, 0) / rows.length,
      ),
      avgSent = Math.round(
        rows.reduce((sum, row) => sum + row.sent, 0) / rows.length,
      ),
      column = (row) => {
        const stack = hundred ? 100 : (row.total / max) * 100,
          done = (row.done / row.total) * 100;
        return (
          '<div class="ops-trend-column" style="--stack-height:' +
          stack +
          "%;--done-height:" +
          done +
          '%"><div class="ops-trend-stack"><i class="done"></i></div><b>' +
          opsFmt(row.total) +
          "</b><label>" +
          row.label +
          "</label></div>"
        );
      },
      otif = (row) => {
        const stack = hundred ? 100 : (row.done / maxDone) * 100,
          on = row.done ? (row.onTime / row.done) * 100 : 0;
        return (
          '<div class="ops-trend-column" style="--stack-height:' +
          stack +
          "%;--on-height:" +
          on +
          '%"><div class="ops-trend-stack otif"><i class="ontime"></i><i class="late"></i></div><b>' +
          opsFmt(row.done) +
          "</b><label>" +
          row.label +
          "</label></div>"
        );
      };
    return (
      '<section class="ops-order-trends"><div class="ops-order-trends-head"><div><h2>Xu hướng Order</h2><p>' +
      { day: "Daily", week: "Weekly", month: "Monthly" }[
        opsSourceState.orderFilters.period
      ] +
      " · " +
      rows.length +
      ' kỳ · Đồng bộ với bộ lọc Tổng hợp Order</p></div><div class="ops-trend-mode" role="group" aria-label="Kiểu cột"><button type="button" data-order-chart-mode="stacked" class="' +
      (!hundred ? "active" : "") +
      '">Stacked</button><button type="button" data-order-chart-mode="percent" class="' +
      (hundred ? "active" : "") +
      '">100% Stacked</button></div></div><div class="ops-order-trend-grid"><article class="ops-trend-card"><div class="ops-trend-card-head"><div><h3>Total Order, Done & Processing</h3><small>Cột overlap · Done nằm trong Total Order</small></div><div class="ops-trend-legend"><span><i class="done"></i>Done</span><span><i class="processing"></i>Processing</span></div></div><div class="ops-trend-plot"><div class="ops-trend-reference" style="--line-y:' +
      Math.min(92, (avgTotal / max) * 100) +
      '%"><span>Total Orders · ' +
      opsFmt(avgTotal) +
      '</span></div><div class="ops-trend-reference sent" style="--line-y:' +
      Math.min(92, (avgSent / max) * 100) +
      '%"><span>Số UV đã gửi · ' +
      opsFmt(avgSent) +
      '</span></div><div class="ops-trend-columns" style="--trend-count:' +
      rows.length +
      '">' +
      rows.map(column).join("") +
      '</div></div></article><article class="ops-trend-card"><div class="ops-trend-card-head"><div><h3>OTIF theo thời gian</h3><small>Phân bổ Done On-Time và Done Late</small></div><div class="ops-trend-legend"><span><i class="ontime"></i>On-Time</span><span><i class="late"></i>Late</span></div></div><div class="ops-trend-plot"><div class="ops-trend-columns" style="--trend-count:' +
      rows.length +
      '">' +
      rows.map(otif).join("") +
      "</div></div></article></div></section>"
    );
  }
  const opsOrderTrendChartsBeforeTrendLines = opsOrderTrendCharts;
  opsOrderTrendCharts = function () {
    return opsOrderTrendChartsBeforeTrendLines().replace(
      /<div class="ops-trend-reference"[\s\S]*?<\/div><div class="ops-trend-reference sent"[\s\S]*?<\/div>/,
      '<canvas class="ops-trend-lines" aria-label="Trend Total Orders và Số UV đã gửi"></canvas>',
    );
  };
  opsOrderTrendCharts = function () {
    const rows = opsOrderTrendData(),
      hundred = (opsSourceState.orderChartMode || "stacked") === "percent",
      max = Math.max(...rows.map((row) => Math.max(row.total, row.sent)), 1),
      maxDone = Math.max(...rows.map((row) => row.done), 1),
      column = (row) => {
        const stack = hundred ? 100 : (row.total / max) * 100,
          done = (row.done / row.total) * 100,
          processing = 100 - done;
        return (
          '<div class="ops-trend-column" style="--stack-height:' +
          stack +
          "%;--done-height:" +
          done +
          "%;--processing-height:" +
          processing +
          '%"><div class="ops-trend-stack"><i class="processing"><span>' +
          opsFmt(row.processing) +
          '</span></i><i class="done"><span>' +
          opsFmt(row.done) +
          "</span></i></div><b>" +
          opsFmt(row.total) +
          "</b><label>" +
          row.label +
          "</label></div>"
        );
      },
      otif = (row) => {
        const stack = hundred ? 100 : (row.done / maxDone) * 100,
          on = row.done ? (row.onTime / row.done) * 100 : 0;
        return (
          '<div class="ops-trend-column" style="--stack-height:' +
          stack +
          "%;--on-height:" +
          on +
          '%"><div class="ops-trend-stack otif"><i class="ontime"></i><i class="late"></i></div><b>' +
          opsFmt(row.done) +
          "</b><label>" +
          row.label +
          "</label></div>"
        );
      };
    return (
      '<section class="ops-order-trends"><div class="ops-order-trends-head"><div><h2>Xu hướng Order</h2><p>' +
      { day: "Daily", week: "Weekly", month: "Monthly" }[
        opsSourceState.orderFilters.period
      ] +
      " · " +
      rows.length +
      ' kỳ · Đồng bộ với bộ lọc Tổng hợp Order</p></div><div class="ops-trend-mode" role="group" aria-label="Kiểu cột"><button type="button" data-order-chart-mode="stacked" class="' +
      (!hundred ? "active" : "") +
      '">Stacked</button><button type="button" data-order-chart-mode="percent" class="' +
      (hundred ? "active" : "") +
      '">100% Stacked</button></div></div><div class="ops-order-trend-grid"><article class="ops-trend-card"><div class="ops-trend-card-head"><div><h3>Total Order theo trạng thái</h3><small>Done + Processing = Total Orders</small></div><div class="ops-trend-legend"><span><i class="done"></i>Done</span><span><i class="processing"></i>Processing</span></div></div><div class="ops-trend-plot"><canvas class="ops-trend-lines" aria-label="Trend Số lượng UV đã gửi"></canvas><div class="ops-trend-columns" style="--trend-count:' +
      rows.length +
      '">' +
      rows.map(column).join("") +
      '</div></div></article><article class="ops-trend-card"><div class="ops-trend-card-head"><div><h3>OTIF theo thời gian</h3><small>Phân bổ Done On-Time và Done Late</small></div><div class="ops-trend-legend"><span><i class="ontime"></i>On-Time</span><span><i class="late"></i>Late</span></div></div><div class="ops-trend-plot"><div class="ops-trend-columns" style="--trend-count:' +
      rows.length +
      '">' +
      rows.map(otif).join("") +
      "</div></div></article></div></section>"
    );
  };
  function opsDrawOrderTrendLines() {
    const canvas = document.querySelector(".ops-trend-lines");
    if (!canvas) return;
    const rows = opsOrderTrendData(),
      box = canvas.getBoundingClientRect(),
      ratio = window.devicePixelRatio || 1,
      width = Math.max(1, box.width),
      height = Math.max(1, box.height);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    const max = Math.max(
        ...rows.map((row) => Math.max(row.total, row.sent)),
        1,
      ),
      x = (index) => ((index + 0.5) * width) / rows.length,
      y = (value) => height - (value / max) * (height - 8) - 4;
    ctx.beginPath();
    rows.forEach((row, index) => {
      const px = x(index),
        py = y(row.sent);
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = "#a50034";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
    rows.forEach((row, index) => {
      const px = x(index),
        py = y(row.sent);
      ctx.beginPath();
      ctx.arc(px, py, 2.3, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = "#a50034";
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.font = '600 6.5px "Segoe UI",sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = "#a50034";
      ctx.fillText(opsFmt(row.sent), px, Math.max(8, py - 5));
    });
    const last = rows[rows.length - 1];
    ctx.font = '600 7px "Segoe UI",sans-serif';
    ctx.textAlign = "right";
    ctx.fillText(
      "Số lượng UV đã gửi",
      width - 3,
      Math.max(9, y(last.sent) - 16),
    );
  }
  const opsOrderTrendChartsBeforePercentCap = opsOrderTrendCharts;
  opsOrderTrendCharts = function () {
    let html = opsOrderTrendChartsBeforePercentCap();
    if ((opsSourceState.orderChartMode || "stacked") !== "percent") return html;
    const rows = opsOrderTrendData(),
      max = Math.max(...rows.map((row) => Math.max(row.total, row.sent)), 1),
      maxTotal = Math.max(...rows.map((row) => row.total), 1),
      cap = ((maxTotal / max) * 100).toFixed(2),
      parts = html.split("</article><article");
    parts[0] = parts[0].replace(
      /--stack-height:100%/g,
      "--stack-height:" + cap + "%",
    );
    return parts.length > 1
      ? parts[0] +
          "</article><article" +
          parts.slice(1).join("</article><article")
      : html;
  };
  opsDrawOrderTrendLines = function () {
    const canvas = document.querySelector(".ops-trend-lines");
    if (!canvas) return;
    const rows = opsOrderTrendData(),
      box = canvas.getBoundingClientRect(),
      ratio = window.devicePixelRatio || 1,
      width = Math.max(1, box.width),
      height = Math.max(1, box.height);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    const max = Math.max(
        ...rows.map((row) => Math.max(row.total, row.sent)),
        1,
      ),
      x = (index) => ((index + 0.5) * width) / rows.length,
      y = (value) => height - (value / max) * (height - 8) - 4,
      color = "#167f77";
    ctx.beginPath();
    rows.forEach((row, index) => {
      const px = x(index),
        py = y(row.sent);
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
    rows.forEach((row, index) => {
      const px = x(index),
        py = y(row.sent);
      ctx.beginPath();
      ctx.arc(px, py, 2.3, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.font = '600 6.5px "Segoe UI",sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = color;
      ctx.fillText(opsFmt(row.sent), px, Math.max(8, py - 5));
    });
    const last = rows[rows.length - 1];
    ctx.font = '600 7px "Segoe UI",sans-serif';
    ctx.textAlign = "right";
    ctx.fillText(
      "Số lượng UV đã gửi",
      width - 3,
      Math.max(9, y(last.sent) - 16),
    );
  };
  const opsOrderTrendChartsBeforeFixedUvLabel = opsOrderTrendCharts;
  opsOrderTrendCharts = function () {
    return opsOrderTrendChartsBeforeFixedUvLabel().replace(
      '<canvas class="ops-trend-lines" aria-label="Trend Số lượng UV đã gửi"></canvas>',
      '<span class="ops-trend-fixed-label">Số lượng UV đã gửi</span><canvas class="ops-trend-lines" aria-label="Trend Số lượng UV đã gửi"></canvas>',
    );
  };
  opsDrawOrderTrendLines = function () {
    const canvas = document.querySelector(".ops-trend-lines");
    if (!canvas) return;
    const rows = opsOrderTrendData(),
      box = canvas.getBoundingClientRect(),
      ratio = window.devicePixelRatio || 1,
      width = Math.max(1, box.width),
      height = Math.max(1, box.height);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    const max = Math.max(
        ...rows.map((row) => Math.max(row.total, row.sent)),
        1,
      ),
      x = (index) => ((index + 0.5) * width) / rows.length,
      y = (value) => height - (value / max) * (height - 8) - 4,
      color = "#167f77";
    ctx.beginPath();
    rows.forEach((row, index) => {
      const px = x(index),
        py = y(row.sent);
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
    rows.forEach((row, index) => {
      const px = x(index),
        py = y(row.sent);
      ctx.beginPath();
      ctx.arc(px, py, 2.3, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.font = '600 6.5px "Segoe UI",sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = color;
      ctx.fillText(opsFmt(row.sent), px, Math.max(8, py - 5));
    });
  };
  const opsOrderTrendChartsBeforeMarkerGap = opsOrderTrendCharts;
  opsOrderTrendCharts = function () {
    let html = opsOrderTrendChartsBeforeMarkerGap(),
      rows = opsOrderTrendData(),
      max = Math.max(...rows.map((row) => Math.max(row.total, row.sent)), 1),
      maxTotal = Math.max(...rows.map((row) => row.total), 1),
      minSent = Math.min(...rows.map((row) => row.sent)),
      plotInnerHeight = 252,
      gapPercent = (15 / plotInnerHeight) * 100,
      cap = Math.max(18, (minSent / max) * 100 - gapPercent),
      hundred = (opsSourceState.orderChartMode || "stacked") === "percent",
      heights = rows.map((row) =>
        hundred ? cap : (row.total / maxTotal) * cap,
      ),
      parts = html.split("</article><article"),
      index = 0;
    parts[0] = parts[0].replace(/--stack-height:[\d.]+%/g, () =>
      index < heights.length
        ? "--stack-height:" + heights[index++].toFixed(2) + "%"
        : "--stack-height:0%",
    );
    return parts.length > 1
      ? parts[0] +
          "</article><article" +
          parts.slice(1).join("</article><article")
      : html;
  };
  const opsOrderTrendChartsBeforePercentLabels = opsOrderTrendCharts;
  opsOrderTrendCharts = function () {
    let html = opsOrderTrendChartsBeforePercentLabels(),
      rows = opsOrderTrendData(),
      max = Math.max(...rows.map((row) => Math.max(row.total, row.sent)), 1),
      maxTotal = Math.max(...rows.map((row) => row.total), 1),
      minSent = Math.min(...rows.map((row) => row.sent)),
      plotInnerHeight = 252,
      gapPercent = (25 / plotInnerHeight) * 100,
      cap = Math.max(18, (minSent / max) * 100 - gapPercent),
      hundred = (opsSourceState.orderChartMode || "stacked") === "percent",
      heights = rows.map((row) =>
        hundred ? cap : (row.total / maxTotal) * cap,
      ),
      parts = html.split("</article><article"),
      heightIndex = 0;
    parts[0] = parts[0].replace(/--stack-height:[\d.]+%/g, () =>
      heightIndex < heights.length
        ? "--stack-height:" + heights[heightIndex++].toFixed(2) + "%"
        : "--stack-height:0%",
    );
    if (hundred) {
      let labelIndex = 0;
      parts[0] = parts[0].replace(
        /<i class="processing"><span>[^<]+<\/span><\/i><i class="done"><span>[^<]+<\/span><\/i><\/div><b>[^<]+<\/b>/g,
        () => {
          const row = rows[labelIndex++],
            done = Math.round((row.done / row.total) * 100),
            processing = 100 - done;
          return (
            '<i class="processing"><span>' +
            processing +
            '%</span></i><i class="done"><span>' +
            done +
            "%</span></i></div><b>100%</b>"
          );
        },
      );
    }
    return parts.length > 1
      ? parts[0] +
          "</article><article" +
          parts.slice(1).join("</article><article")
      : html;
  };
  const opsOrderTrendChartsBeforeOtifLabels = opsOrderTrendCharts;
  opsOrderTrendCharts = function () {
    let html = opsOrderTrendChartsBeforeOtifLabels(),
      rows = opsOrderTrendData(),
      hundred = (opsSourceState.orderChartMode || "stacked") === "percent",
      parts = html.split("</article><article");
    if (parts.length < 2) return html;
    let index = 0;
    parts[1] = parts[1].replace(
      /<i class="ontime"><\/i><i class="late"><\/i><\/div><b>[^<]+<\/b>/g,
      () => {
        const row = rows[index++],
          on = hundred
            ? Math.round((row.onTime / row.done) * 100) + "%"
            : opsFmt(row.onTime),
          late = hundred
            ? 100 - Math.round((row.onTime / row.done) * 100) + "%"
            : opsFmt(row.late),
          total = hundred ? "100%" : opsFmt(row.done);
        return (
          '<i class="ontime"><span>' +
          on +
          '</span></i><i class="late"><span>' +
          late +
          "</span></i></div><b>" +
          total +
          "</b>"
        );
      },
    );
    return (
      parts[0] +
      "</article><article" +
      parts.slice(1).join("</article><article")
    );
  };
  function opsRenderOrders() {
    return (
      opsOrderDashboard() +
      opsOrderTrendCharts() +
      opsProjectTable() +
      opsVisualWorkspace()
    );
  }
  function opsRenderDeadline() {
    const d = opsData();
    return (
      opsSectionHead(
        "Deadline & Cảnh báo",
        "Tập trung backlog, SLA và các Order cần can thiệp.",
      ) +
      opsKpis([
        ["Order Late", opsFmt(d.late), "▼ 2,1%"],
        ["Sắp đến deadline", opsFmt(Math.round(d.late * 1.7))],
        ["Tồn > 14 ngày", opsFmt(Math.round(d.order * 0.17))],
        ["Tồn > 30 ngày", opsFmt(Math.round(d.order * 0.07))],
        ["Ứng viên quá SLA", opsFmt(Math.round(d.order * 0.06))],
        ["Vị trí tuyển gấp", opsFmt(Math.round(d.order * 0.025))],
      ]) +
      '<div class="ops-source-grid" style="--ops-visual-cols:' +
      opsSourceState.visualCols +
      '">' +
      opsCard("Risk by Project", opsBars("late"), "Volume Late theo dự án") +
      opsCard(
        "Chi tiết cảnh báo",
        opsRiskTable(),
        "Drill-down đến từng Order",
      ) +
      "</div>"
    );
  }
  function opsRenderPipeline() {
    const d = opsData();
    return (
      opsSectionHead(
        "Pipeline ứng viên",
        "Theo dõi volume và conversion từ dữ liệu đầu vào đến bảo hành.",
      ) +
      opsKpis([
        ["All Data", opsFmt(d.approach)],
        ["Ứng viên đã gửi", opsFmt(d.sent)],
        ["Onboard", opsFmt(d.onboard)],
        ["Time to Fill", d.ttf + " ngày"],
        ["Quá SLA", opsFmt(Math.round(d.order * 0.06))],
        ["Conversion", Math.round((d.onboard / d.approach) * 100) + "%"],
      ]) +
      opsCard(
        "Candidate Pipeline",
        opsPipeline(),
        "Conversion theo từng phase",
        true,
      )
    );
  }
  function opsRenderOutcome() {
    const d = opsData();
    return (
      opsSectionHead(
        "Kết quả sau tuyển",
        "Theo dõi onboarding, thử việc, bảo hành và nghỉ việc.",
      ) +
      opsKpis([
        ["Onboard", opsFmt(d.onboard)],
        ["Đạt thử việc", opsFmt(Math.round(d.onboard * 0.82))],
        ["Đang làm", opsFmt(Math.round(d.onboard * 0.76))],
        ["Nghỉ việc", opsFmt(d.leave), "▼ 1,1%"],
        ["Đạt bảo hành", "81%"],
        ["Time to Fill", d.ttf + " ngày"],
      ]) +
      '<div class="ops-source-grid" style="--ops-visual-cols:' +
      opsSourceState.visualCols +
      '">' +
      opsCard(
        "Onboard theo dự án",
        opsBars("onboard"),
        "So sánh volume onboarding",
      ) +
      opsCard(
        "Attrition theo dự án",
        opsBars("leave"),
        "Theo dõi nghỉ việc sau tuyển",
      ) +
      "</div>"
    );
  }
  function opsActivateSection(id) {
    if (!opsSourceState.visible.includes(id)) return;
    opsSourceState.activeSection = id;
    opsRenderSource();
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  function opsSyncOrderFilterDrawer() {
    const fields = document.querySelector(".filter-fields");
    if (!fields) return;
    let holder = document.querySelector("#ops-order-drawer-content");
    if (!holder) {
      holder = document.createElement("div");
      holder.id = "ops-order-drawer-content";
      holder.className = "ops-order-drawer-content";
      fields.appendChild(holder);
    }
    fields.classList.add("order-mode");
    holder.innerHTML = opsOrderFilterPanel();
    document.querySelector("#filter-drawer-title").textContent =
      "Bộ lọc Vận hành tuyển dụng";
    document.querySelector(
      "#filter-drawer-title",
    ).nextElementSibling.textContent =
      "Một bộ lọc dùng chung cho toàn bộ 5 section; thay đổi được áp dụng ngay.";
  }
  function opsRenderSource() {
    const root = document.querySelector("#ops-source-root"),
      renders = {
        "ops-summary": opsRenderSummary,
        "ops-orders": opsRenderOrders,
        "ops-deadline": opsRenderDeadline,
        "ops-pipeline": opsRenderPipeline,
        "ops-outcome": opsRenderOutcome,
      },
      sectionCopy = {
        "ops-summary": "KPI chu kỳ và tín hiệu vận hành quan trọng.",
        "ops-orders":
          "Tổng hợp yêu cầu tuyển dụng, trạng thái triển khai và rủi ro cần ưu tiên.",
        "ops-deadline": "Theo dõi deadline, cảnh báo và kế hoạch xử lý Order.",
        "ops-pipeline":
          "Theo dõi số lượng và chất lượng ứng viên xuyên suốt pipeline.",
        "ops-outcome":
          "Theo dõi khối lượng, tốc độ và chất lượng thực thi theo nhân sự.",
      },
      active = opsSourceState.visible.includes(opsSourceState.activeSection)
        ? opsSourceState.activeSection
        : opsSourceState.visible[0];
    opsSourceState.activeSection = active;
    root.innerHTML =
      '<section class="ops-source-section" id="' +
      active +
      '">' +
      renders[active]() +
      "</section>";
    document.querySelector("#ops-section-title").textContent =
      opsSectionMeta.find((item) => item[0] === active)?.[1] || "";
    document.querySelector("#ops-section-copy").textContent =
      sectionCopy[active] || "";
    root.style.setProperty("--ops-kpi-cols", opsSourceState.kpiCols);
    root.style.setProperty("--ops-visual-cols", opsSourceState.visualCols);
    opsRenderSourceNav();
    opsRenderSourceSummary();
    opsSyncOrderFilterDrawer();
    opsSaveState();
  }
  function opsRenderSourceNav() {
    const nav = document.querySelector(".ops-local-nav"),
      visible = opsSectionMeta.filter((meta) =>
        opsSourceState.visible.includes(meta[0]),
      );
    nav.innerHTML =
      "<strong>Trong trang này</strong>" +
      visible
        .map(
          (meta) =>
            '<button type="button" class="' +
            (meta[0] === opsSourceState.activeSection ? "active" : "") +
            '" data-ops-target="' +
            meta[0] +
            '">' +
            meta[1] +
            "</button>",
        )
        .join("");
    opsSyncStickyFilterToolbar();
  }
  function opsRenderSourceSummary() {
    const summary = document.querySelector("#filter-summary"),
      chips = [];
    if (opsSourceState.activeSection === "ops-orders") {
      const f = opsSourceState.orderFilters,
        time = opsOrderTimeContext();
      chips.push(
        { day: "Daily", week: "Weekly", month: "Monthly" }[f.period] +
          " · " +
          time.count +
          " kỳ",
      );
      [
        ["project", "Dự án"],
        ["region", "Khu vực"],
        ["city", "Thành phố"],
        ["position", "Vị trí"],
        ["status", "Trạng thái"],
        ["otif", "OTIF"],
        ["progress", "Tiến độ"],
        ["am", "AM"],
        ["supervisor", "SUP"],
        ["teamLead", "TL"],
        ["recruiter", "Recruiter"],
      ].forEach((pair) => {
        if (f[pair[0]] && f[pair[0]] !== "all")
          chips.push(pair[1] + ": " + f[pair[0]]);
      });
    } else {
      if (opsSourceState.project !== "all")
        chips.push("Dự án: " + opsSourceState.project);
      if (opsSourceState.region !== "all")
        chips.push(
          "Khu vực: " +
            { North: "Miền Bắc", Central: "Miền Trung", South: "Miền Nam" }[
              opsSourceState.region
            ],
        );
      chips.push(
        "Thời gian: " +
          { day: "Daily", week: "Weekly", month: "Monthly" }[
            opsSourceState.grain
          ],
      );
    }
    summary.innerHTML =
      "Bộ lọc: " +
      chips
        .map((x) => '<span class="filter-chip">' + opsEscape(x) + "</span>")
        .join(" ");
    document.querySelector("#clear-filters").classList.add("visible");
  }
  function opsSetLayoutDrawer(open) {
    document.querySelector("#ops-layout-drawer").classList.toggle("open", open);
    document
      .querySelector("#ops-layout-backdrop")
      .classList.toggle("open", open);
  }
  let opsVisualType = "column",
    opsEditingVisual = null;
  function opsSetVisualDrawer(open) {
    document.querySelector("#ops-visual-drawer").classList.toggle("open", open);
    document
      .querySelector("#ops-visual-backdrop")
      .classList.toggle("open", open);
  }
  function opsOptionList(items, current) {
    return items
      .map(
        (x) =>
          '<option value="' +
          opsEscape(x) +
          '" ' +
          (x === current ? "selected" : "") +
          ">" +
          opsEscape(x) +
          "</option>",
      )
      .join("");
  }
  function opsCheckList(items, selected, kind) {
    return (
      '<div class="ops-check-grid">' +
      items
        .map(
          (x) =>
            '<label><input type="checkbox" data-check-kind="' +
            kind +
            '" value="' +
            opsEscape(x) +
            '" ' +
            (selected.includes(x) ? "checked" : "") +
            "> " +
            opsEscape(x) +
            "</label>",
        )
        .join("") +
      "</div>"
    );
  }
  function opsOpenVisualFolder(type) {
    opsVisualType = type;
    opsEditingVisual = null;
    const drawer = document.querySelector("#ops-visual-drawer"),
      body = document.querySelector("#ops-visual-body"),
      items = opsSourceState.visuals.filter((x) => x.type === type),
      cols =
        type === "column"
          ? opsSourceState.columnCols
          : opsSourceState.tableCols;
    document.querySelector("#ops-visual-title").textContent =
      type === "column" ? "Cấu hình Column Charts" : "Cấu hình Table Visuals";
    body.innerHTML =
      '<div class="ops-config-form"><label>Số visual mỗi hàng<select id="ops-folder-cols"><option value="1">1 visual</option><option value="2">2 visual</option><option value="3">3 visual</option></select></label><button class="btn primary" id="ops-add-visual" type="button">+ Thêm visual mới</button><div class="ops-config-list">' +
      (items.length
        ? items
            .map(
              (x) =>
                '<div class="ops-config-item"><div><strong>' +
                opsEscape(x.name) +
                "</strong><small>" +
                (type === "column"
                  ? "Column chart"
                  : x.tableMode === "matrix"
                    ? "Matrix Table"
                    : "Table") +
                '</small></div><button class="btn" data-folder-edit="' +
                x.id +
                '" type="button">Chỉnh sửa</button></div>',
            )
            .join("")
        : '<div class="ops-visual-empty">Chưa có visual trong nhóm này.</div>') +
      "</div></div>";
    document.querySelector("#ops-folder-cols").value = String(cols);
    document
      .querySelector("#ops-folder-cols")
      .addEventListener("change", (e) => {
        if (type === "column")
          opsSourceState.columnCols = Number(e.target.value);
        else opsSourceState.tableCols = Number(e.target.value);
        opsRenderSource();
      });
    document
      .querySelector("#ops-add-visual")
      .addEventListener("click", () => opsOpenVisualEditor(null, type));
    body
      .querySelectorAll("[data-folder-edit]")
      .forEach((button) =>
        button.addEventListener("click", () =>
          opsOpenVisualEditor(button.dataset.folderEdit, type),
        ),
      );
    opsSetVisualDrawer(true);
  }
  function opsOpenVisualEditor(id, type) {
    const existing = id
      ? opsSourceState.visuals.find((x) => x.id === id)
      : null;
    opsEditingVisual = id;
    const visual = existing || {
      name: type === "column" ? "Column chart mới" : "Table mới",
      type,
      dimension: "Project",
      metric: "Total Order",
      agg: "SUM",
      tableMode: "table",
      rows: ["Project"],
      columns: ["Status"],
      metrics: ["Total Order"],
      metricAgg: { "Total Order": "SUM" },
    };
    document.querySelector("#ops-visual-title").textContent = existing
      ? "Chỉnh sửa visual"
      : "Thêm visual mới";
    const body = document.querySelector("#ops-visual-body"),
      aggs = ["SUM", "Average", "Max", "Min"];
    if (type === "column") {
      body.innerHTML =
        '<div class="ops-config-form"><button class="btn" id="ops-config-back" type="button">← Quay lại Column Charts</button><label>Tên visual<input id="ops-v-name" value="' +
        opsEscape(visual.name) +
        '"></label><label>Dimension<select id="ops-v-dimension">' +
        opsOptionList(opsVisualDimensions, visual.dimension) +
        '</select></label><label>Metric / Value<select id="ops-v-metric">' +
        opsOptionList(opsVisualMetrics, visual.metric) +
        '</select></label><label>Phép tổng hợp<select id="ops-v-agg">' +
        opsOptionList(aggs, visual.agg) +
        '</select></label><div class="ops-drawer-actions">' +
        (existing
          ? '<button class="btn ops-danger" id="ops-delete-visual" type="button">Xóa visual</button>'
          : "<span></span>") +
        '<button class="btn primary" id="ops-save-visual" type="button">Lưu visual</button></div></div>';
    } else {
      body.innerHTML =
        '<div class="ops-config-form"><button class="btn" id="ops-config-back" type="button">← Quay lại Table Visuals</button><label>Tên visual<input id="ops-v-name" value="' +
        opsEscape(visual.name) +
        '"></label><label>Loại bảng<select id="ops-v-table-mode"><option value="table" ' +
        (visual.tableMode === "table" ? "selected" : "") +
        '>Table</option><option value="matrix" ' +
        (visual.tableMode === "matrix" ? "selected" : "") +
        '>Matrix Table</option></select></label><div class="ops-config-block"><strong>Row dimensions</strong>' +
        opsCheckList(opsVisualDimensions, visual.rows || [], "rows") +
        '</div><div class="ops-config-block" id="ops-matrix-columns"><strong>Column dimensions (Matrix)</strong>' +
        opsCheckList(opsVisualDimensions, visual.columns || [], "columns") +
        '</div><div class="ops-config-block"><strong>Metrics và phép tổng hợp</strong>' +
        opsVisualMetrics
          .map(
            (metric) =>
              '<div class="ops-metric-config"><label><input type="checkbox" data-check-kind="metrics" value="' +
              opsEscape(metric) +
              '" ' +
              ((visual.metrics || []).includes(metric) ? "checked" : "") +
              "> " +
              opsEscape(metric) +
              '</label><select data-metric-agg="' +
              opsEscape(metric) +
              '">' +
              opsOptionList(aggs, (visual.metricAgg || {})[metric] || "SUM") +
              "</select></div>",
          )
          .join("") +
        '</div><div class="ops-drawer-actions">' +
        (existing
          ? '<button class="btn ops-danger" id="ops-delete-visual" type="button">Xóa visual</button>'
          : "<span></span>") +
        '<button class="btn primary" id="ops-save-visual" type="button">Lưu visual</button></div></div>';
      const mode = document.querySelector("#ops-v-table-mode"),
        toggle = () =>
          (document.querySelector("#ops-matrix-columns").hidden =
            mode.value !== "matrix");
      mode.addEventListener("change", toggle);
      toggle();
    }
    document
      .querySelector("#ops-config-back")
      .addEventListener("click", () => opsOpenVisualFolder(type));
    document
      .querySelector("#ops-save-visual")
      .addEventListener("click", () => opsSaveVisual(type));
    const remove = document.querySelector("#ops-delete-visual");
    if (remove)
      remove.addEventListener("click", () => {
        opsSourceState.visuals = opsSourceState.visuals.filter(
          (x) => x.id !== id,
        );
        opsRenderSource();
        opsOpenVisualFolder(type);
      });
  }
  function opsSaveVisual(type) {
    const selected = (kind) =>
        [
          ...document.querySelectorAll(
            '[data-check-kind="' + kind + '"]:checked',
          ),
        ].map((x) => x.value),
      name = document.querySelector("#ops-v-name").value.trim() || "Visual mới";
    let visual = {
      id: opsEditingVisual || type + "-" + Date.now(),
      name,
      type,
    };
    if (type === "column")
      visual = {
        ...visual,
        dimension: document.querySelector("#ops-v-dimension").value,
        metric: document.querySelector("#ops-v-metric").value,
        agg: document.querySelector("#ops-v-agg").value,
      };
    else {
      const metrics = selected("metrics"),
        metricAgg = {};
      metrics.forEach(
        (metric) =>
          (metricAgg[metric] = document.querySelector(
            '[data-metric-agg="' + CSS.escape(metric) + '"]',
          ).value),
      );
      visual = {
        ...visual,
        tableMode: document.querySelector("#ops-v-table-mode").value,
        rows: selected("rows").slice(0, 2),
        columns: selected("columns").slice(0, 2),
        metrics: metrics.length ? metrics : ["Total Order"],
        metricAgg,
      };
    }
    const index = opsSourceState.visuals.findIndex(
      (x) => x.id === opsEditingVisual,
    );
    if (index >= 0) opsSourceState.visuals[index] = visual;
    else opsSourceState.visuals.push(visual);
    opsRenderSource();
    opsOpenVisualFolder(type);
  }
  function opsSetupOrderInteractions() {
    document.addEventListener("change", (event) => {
      const field = event.target.closest("[data-order-filter]");
      if (field) {
        opsSourceState.orderOpen = [
          ...document.querySelectorAll(".ops-order-filter-group[open]"),
        ].map((x) => x.dataset.orderGroup);
        const key = field.dataset.orderFilter;
        opsSourceState.orderFilters[key] =
          field.type === "number" ? Number(field.value) : field.value;
        if (key === "viewMode" && field.value !== "custom")
          opsSourceState.orderFilters.viewCount = Number(field.value);
        if (key === "am") {
          opsSourceState.orderFilters.supervisor = "all";
          opsSourceState.orderFilters.teamLead = "all";
          opsSourceState.orderFilters.recruiter = "all";
        }
        if (key === "supervisor") {
          opsSourceState.orderFilters.teamLead = "all";
          opsSourceState.orderFilters.recruiter = "all";
        }
        if (key === "teamLead") opsSourceState.orderFilters.recruiter = "all";
        opsRenderSource();
      }
      if (
        event.target.id === "role" &&
        opsSourceState.activeSection === "ops-orders"
      )
        opsRenderSource();
    });
    document.addEventListener("click", (event) => {
      const type = event.target.closest("[data-order-type]"),
        reset = event.target.closest("[data-order-reset]");
      if (type) {
        opsSourceState.orderRecruitType =
          opsSourceState.orderRecruitType === type.dataset.orderType
            ? "all"
            : type.dataset.orderType;
        opsRenderSource();
      }
      if (reset) {
        opsSourceState.orderFilters = {
          year: "",
          month: "",
          period: "day",
          viewMode: "7",
          viewCount: 7,
          project: "all",
          region: "all",
          city: "all",
          position: "all",
          hireType: "all",
          status: "all",
          otif: "all",
          progress: "all",
          am: "all",
          supervisor: "all",
          teamLead: "all",
          recruiter: "all",
          people: "all",
        };
        opsSourceState.orderOpen = [];
        opsSourceState.orderRecruitType = "all";
        opsRenderSource();
      }
    });
  }
  function opsSetupOrderClear() {
    document.querySelector("#clear-filters").addEventListener("click", () => {
      if (opsSourceState.activeSection !== "ops-orders") return;
      opsSourceState.orderFilters = {
        year: "",
        month: "",
        period: "day",
        viewMode: "7",
        viewCount: 7,
        project: "all",
        region: "all",
        city: "all",
        position: "all",
        hireType: "all",
        status: "all",
        otif: "all",
        progress: "all",
        am: "all",
        supervisor: "all",
        teamLead: "all",
        recruiter: "all",
        people: "all",
      };
      opsSourceState.orderOpen = [];
      opsSourceState.orderRecruitType = "all";
      opsRenderSource();
    });
  }
  function opsSetupVisualDrawer() {
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div class="ops-layout-backdrop" id="ops-visual-backdrop"></div><aside class="ops-layout-drawer ops-visual-drawer" id="ops-visual-drawer"><div class="filter-drawer-head"><div><h2 id="ops-visual-title">Cấu hình visual</h2><p>Thêm và bố trí visual trong Tổng hợp Order.</p></div><button class="filter-close" id="ops-visual-close" type="button">×</button></div><div id="ops-visual-body"></div></aside>',
    );
    document
      .querySelector("#ops-visual-close")
      .addEventListener("click", () => opsSetVisualDrawer(false));
    document
      .querySelector("#ops-visual-backdrop")
      .addEventListener("click", () => opsSetVisualDrawer(false));
    document
      .querySelector("#ops-source-root")
      .addEventListener("click", (event) => {
        const config = event.target.closest("[data-visual-config]"),
          edit = event.target.closest("[data-visual-edit]");
        if (config) opsOpenVisualFolder(config.dataset.visualConfig);
        if (edit) {
          const visual = opsSourceState.visuals.find(
            (x) => x.id === edit.dataset.visualEdit,
          );
          if (visual) opsOpenVisualEditor(visual.id, visual.type);
        }
      });
  }
  function opsSetupSource() {
    const view = document.querySelector("#view-operations"),
      oldTable = document.querySelector("#ops-requests"),
      oldPivot = document.querySelector("#ops-pivot");
    oldTable.hidden = true;
    oldPivot.hidden = true;
    const root = document.createElement("div");
    root.id = "ops-source-root";
    root.className = "ops-source-root";
    oldTable.parentNode.insertBefore(root, oldTable);
    const fields = document.querySelector(".filter-fields");
    fields.classList.add("source-mode");
    fields.insertAdjacentHTML(
      "beforeend",
      '<label class="ops-source-filter">Dự án<select id="ops-source-project"><option value="all">Tất cả dự án</option>' +
        opsSourceProjects.map((p) => "<option>" + p + "</option>").join("") +
        '</select></label><label class="ops-source-filter">Khu vực<select id="ops-source-region"><option value="all">Tất cả khu vực</option><option value="North">Miền Bắc</option><option value="Central">Miền Trung</option><option value="South">Miền Nam</option></select></label><label class="ops-source-filter">Góc thời gian<select id="ops-source-grain"><option value="day">Daily</option><option value="week">Weekly</option><option value="month">Monthly</option></select></label><label class="ops-source-filter">Số kỳ hiển thị<select id="ops-source-count"><option value="7">7 kỳ</option><option value="12">12 kỳ</option><option value="30">30 kỳ</option></select></label>',
    );
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div class="ops-layout-backdrop" id="ops-layout-backdrop"></div><aside class="ops-layout-drawer" id="ops-layout-drawer"><div class="filter-drawer-head"><div><h2>Cấu hình layout</h2><p>Chỉ điều chỉnh cách bố trí; style hiện tại được giữ nguyên.</p></div><button class="filter-close" id="ops-layout-close" type="button">×</button></div><div class="ops-layout-fields"><label class="ops-source-filter">KPI mỗi hàng<select id="ops-kpi-cols"><option value="3">3 KPI</option><option value="4">4 KPI</option><option value="5">5 KPI</option></select></label><label class="ops-source-filter">Visual mỗi hàng<select id="ops-visual-cols"><option value="1">1 visual</option><option value="2">2 visual</option></select></label><div><strong style="font-size:12px">Section hiển thị</strong><div class="ops-layout-checks">' +
        opsSectionMeta
          .map(
            (meta) =>
              '<label><input type="checkbox" value="' +
              meta[0] +
              '" ' +
              (opsSourceState.visible.includes(meta[0]) ? "checked" : "") +
              "> " +
              meta[1] +
              "</label>",
          )
          .join("") +
        '</div></div></div><div class="filter-drawer-footer"><button class="btn" id="ops-layout-done" type="button">Xong</button></div></aside>',
    );
    const project = document.querySelector("#ops-source-project"),
      region = document.querySelector("#ops-source-region"),
      grain = document.querySelector("#ops-source-grain"),
      count = document.querySelector("#ops-source-count");
    project.value = opsSourceState.project;
    region.value = opsSourceState.region;
    grain.value = opsSourceState.grain;
    count.value = String(opsSourceState.count);
    [
      [project, "project"],
      [region, "region"],
      [grain, "grain"],
    ].forEach((pair) =>
      pair[0].addEventListener("change", (event) => {
        opsSourceState[pair[1]] = event.target.value;
        opsRenderSource();
      }),
    );
    count.addEventListener("change", (event) => {
      opsSourceState.count = Number(event.target.value);
      opsRenderSource();
    });
    document.querySelector("#ops-kpi-cols").value = String(
      opsSourceState.kpiCols,
    );
    document.querySelector("#ops-visual-cols").value = String(
      opsSourceState.visualCols,
    );
    document
      .querySelector("#ops-kpi-cols")
      .addEventListener("change", (event) => {
        opsSourceState.kpiCols = Number(event.target.value);
        opsRenderSource();
      });
    document
      .querySelector("#ops-visual-cols")
      .addEventListener("change", (event) => {
        opsSourceState.visualCols = Number(event.target.value);
        opsRenderSource();
      });
    document.querySelectorAll(".ops-layout-checks input").forEach((input) =>
      input.addEventListener("change", () => {
        const chosen = [
          ...document.querySelectorAll(".ops-layout-checks input:checked"),
        ].map((x) => x.value);
        if (chosen.length) opsSourceState.visible = chosen;
        else input.checked = true;
        opsRenderSource();
      }),
    );
    document
      .querySelector("#ops-layout-close")
      .addEventListener("click", () => opsSetLayoutDrawer(false));
    document
      .querySelector("#ops-layout-done")
      .addEventListener("click", () => opsSetLayoutDrawer(false));
    document
      .querySelector("#ops-layout-backdrop")
      .addEventListener("click", () => opsSetLayoutDrawer(false));
    document.querySelector("#clear-filters").addEventListener("click", () => {
      opsSourceState.project = "all";
      opsSourceState.region = "all";
      opsSourceState.grain = "month";
      opsSourceState.count = 12;
      project.value = "all";
      region.value = "all";
      grain.value = "month";
      count.value = "12";
      opsRenderSource();
    });
    window.addEventListener(
      "scroll",
      () => {
        if (!view.classList.contains("active")) return;
        let current = opsSourceState.visible[0];
        opsSourceState.visible.forEach((id) => {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= 100)
            current = id;
        });
        setOpsNavActive(current);
      },
      { passive: true },
    );
    opsRenderSource();
  }
  const opsOrderDashboardBeforeSourceFilter = opsOrderDashboard;
  opsOrderDashboard = function () {
    let html = opsOrderDashboardBeforeSourceFilter(),
      key = opsSourceState.orderPhaseOne || "",
      factor = {
        "flow-official": 0.72,
        "flow-backup": 0.28,
        "flow-new": 0.64,
        "flow-replace": 0.36,
      }[key];
    if (!factor) return html;
    const read = (pattern) => {
        const match = html.match(pattern);
        return match ? Number(match[1].replace(/\D/g, "")) : 0;
      },
      total = read(/ops-swim-order-value"><strong>([\d.,]+)/),
      today = read(/ops-swim-today">[\s\S]*?<strong>([\d.,]+)/);
    if (!total || !today) return html;
    html = html
      .replace(
        /(ops-swim-order-value"><strong>)[\d.,]+/,
        "$1" + opsFmt(Math.round(total * factor)),
      )
      .replace(
        /(ops-swim-today">[\s\S]*?<strong>)[\d.,]+/,
        "$1" + opsFmt(Math.max(1, Math.round(today * factor))),
      );
    return html;
  };
  const opsOrderDashboardBeforeBranchAnchor = opsOrderDashboard;
  opsOrderDashboard = function () {
    let html = opsOrderDashboardBeforeBranchAnchor(),
      key = opsSourceState.orderPath || "candidate-late-no",
      branch =
        key === "status-done" || key.startsWith("otif-done")
          ? "done"
          : key === "status-close-other" || key.startsWith("close-")
            ? "close"
            : "processing";
    return html.replace(
      '<div class="ops-swim">',
      '<div class="ops-swim branch-' + branch + '">',
    );
  };
  const opsOrderDashboardBeforeFormatRefine = opsOrderDashboard;
  opsOrderDashboard = function () {
    let html = opsOrderDashboardBeforeFormatRefine();
    html = html
      .replaceAll("<small>Từ Done</small>", "")
      .replaceAll("<small>Từ Processing</small>", "")
      .replaceAll(
        '<span class="ops-swim-group">Từ Processing On-Time</span>',
        '<span class="ops-swim-group">On-Time</span>',
      )
      .replaceAll(
        '<span class="ops-swim-group">Từ Processing Late</span>',
        '<span class="ops-swim-group">Late</span>',
      )
      .replace(
        /<small>Fulfill ([^<]+)<\/small>/,
        '<small class="ops-fulfill">Fulfill <b>$1</b></small>',
      );
    const detail = html.match(
      /<section class="([^"]*ops-swim-close-detail[^"]*)">([\s\S]*?)<\/section>/,
    );
    if (detail) {
      html = html
        .replace(
          /<section class="([^"]*ops-swim-close[^"]*)">[\s\S]*?<\/section>/,
          (match, classes) =>
            '<section class="' +
            classes +
            ' ops-swim-close-list">' +
            detail[2] +
            "</section>",
        )
        .replace(detail[0], "");
    }
    return html;
  };
  const opsOrderDashboardBeforeFinalFormatting = opsOrderDashboard;
  opsOrderDashboard = function () {
    let html = opsOrderDashboardBeforeFinalFormatting().replace(
      "OTIF / Chi tiết",
      "OTIF",
    );
    return html.replace(
      /(<button[^>]*data-phase-path="otif-done-on"[^>]*>[\s\S]*?)<small class="ops-fulfill">Fulfill <b>([^<]+)<\/b><\/small>([\s\S]*?<\/button>)/,
      (match, before, value, after) =>
        before +
        after +
        '<div class="ops-swim-fulfill-row"><span>Fulfill On-Time</span><b>' +
        value +
        "</b><em></em></div>",
    );
  };
  const opsOrderDashboardBeforeFulfillLabel = opsOrderDashboard;
  opsOrderDashboard = function () {
    return opsOrderDashboardBeforeFulfillLabel().replace(
      "Fulfill On-Time",
      "%Fullfill On-Time",
    );
  };
  const opsOrderDashboardBeforeMetricRules = opsOrderDashboard;
  opsOrderDashboard = function () {
    let html = opsOrderDashboardBeforeMetricRules();
    html = html.replace(
      /<button([^>]*class="[^"]*ops-swim-break-row[^"]*"[^>]*)>([\s\S]*?)<\/button>/g,
      (match, attrs, body) =>
        "<button" +
        attrs +
        ">" +
        body.replace(
          /<em>(\d+)% · ([↑↓])(\d+)%<\/em>/,
          '<em><span class="ops-cycle-dist">$1% Dist.</span><strong class="ops-cycle-change ' +
            ("$2" === "↑" ? "up" : "down") +
            '">$2$3% chu kỳ trước</strong></em>',
        ) +
        "</button>",
    );
    html = html
      .replace(/<small class="ops-swim-lane-meta">[\s\S]*?<\/small>/g, "")
      .replace(/<em>(\d+)% · [↑↓]\d+%<\/em>/g, "<em>$1% Dist.</em>")
      .replace(
        '<div class="ops-swim-fulfill-row"><span>%Fullfill On-Time</span><b>81%</b><em></em></div>',
        '<div class="ops-swim-fulfill-row"><span>%Fullfill On-Time</span><b>81%</b><em class="ops-fulfill-change">↑ 6%</em></div>',
      );
    html = html
      .replace(
        /(<button[^>]*data-phase-path="otif-processing-on"[^>]*><span>On-Time)(<\/span>)/,
        '$1<i class="ops-quick-flag-trigger" role="button" tabindex="0" data-quick-flag="on-time">Flag</i>$2',
      )
      .replace(
        /(<button[^>]*data-phase-path="otif-processing-late"[^>]*><span>Late)(<\/span>)/,
        '$1<i class="ops-quick-flag-trigger" role="button" tabindex="0" data-quick-flag="late">Flag</i>$2',
      );
    return html;
  };
  function opsDrawPhasePath() {
    const flow = document.querySelector("#ops-phase-flow");
    if (!flow) return;
    const layer = flow.querySelector(".ops-phase-path-layer"),
      box = flow.getBoundingClientRect(),
      rows = [...flow.querySelectorAll("tr.path-active[data-phase-step]")].sort(
        (a, b) => Number(a.dataset.phaseStep) - Number(b.dataset.phaseStep),
      );
    layer.innerHTML = "";
    for (let i = 0; i < rows.length - 1; i++) {
      const a = rows[i].getBoundingClientRect(),
        b = rows[i + 1].getBoundingClientRect(),
        x1 = a.right - box.left,
        y1 = a.top + a.height / 2 - box.top,
        x2 = b.left - box.left,
        y2 = b.top + b.height / 2 - box.top,
        mid = x1 + (x2 - x1) / 2,
        segment = (kind, left, top, width, height) => {
          const el = document.createElement("i");
          el.className = "ops-phase-path-segment " + kind;
          el.style.left = left + "px";
          el.style.top = top + "px";
          if (width !== undefined) el.style.width = Math.max(0, width) + "px";
          if (height !== undefined) el.style.height = Math.abs(height) + "px";
          layer.appendChild(el);
        };
      segment("h", x1, y1, mid - x1);
      if (Math.abs(y2 - y1) > 1)
        segment("v", mid, Math.min(y1, y2), undefined, y2 - y1);
      segment("h", mid, y2, x2 - mid);
      [
        [x1, y1],
        [x2, y2],
      ].forEach((point) => {
        const dot = document.createElement("i");
        dot.className = "ops-phase-path-dot";
        dot.style.left = point[0] + "px";
        dot.style.top = point[1] + "px";
        layer.appendChild(dot);
      });
    }
  }
  function opsSetupPhasePath() {
    const select = (target) => {
      const row = target.closest("[data-phase-path]");
      if (!row) return;
      const key = row.dataset.phasePath;
      if (Number(row.dataset.phaseStep) === 1)
        opsSourceState.orderPhaseOne = key;
      else opsSourceState.orderPath = key;
      opsRenderSource();
    };
    document.addEventListener("click", (event) => select(event.target));
    document.addEventListener("keydown", (event) => {
      if (
        (event.key === "Enter" || event.key === " ") &&
        event.target.closest("[data-phase-path]")
      ) {
        event.preventDefault();
        select(event.target);
      }
    });
    window.addEventListener(
      "resize",
      () => requestAnimationFrame(opsDrawPhasePath),
      { passive: true },
    );
  }
  opsDrawPhasePath = function () {
    const flow = document.querySelector("#ops-phase-flow");
    if (!flow) return;
    const layer = flow.querySelector(".ops-phase-path-layer"),
      box = flow.getBoundingClientRect(),
      nodes = [...flow.querySelectorAll("[data-phase-node].path-active")].sort(
        (a, b) => Number(a.dataset.phaseStep) - Number(b.dataset.phaseStep),
      );
    layer.innerHTML = "";
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i].getBoundingClientRect(),
        b = nodes[i + 1].getBoundingClientRect(),
        x1 = a.right - box.left,
        y1 = a.top + a.height / 2 - box.top,
        x2 = b.left - box.left,
        y2 = b.top + b.height / 2 - box.top,
        mid = x1 + (x2 - x1) / 2,
        segment = (kind, left, top, width, height) => {
          const el = document.createElement("i");
          el.className = "ops-phase-path-segment " + kind;
          el.style.left = left + "px";
          el.style.top = top + "px";
          if (width !== undefined) el.style.width = Math.max(0, width) + "px";
          if (height !== undefined) el.style.height = Math.abs(height) + "px";
          layer.appendChild(el);
        };
      segment("h", x1, y1, mid - x1);
      if (Math.abs(y2 - y1) > 1)
        segment("v", mid, Math.min(y1, y2), undefined, y2 - y1);
      segment("h", mid, y2, x2 - mid);
      [
        [x1, y1],
        [x2, y2],
      ].forEach((point) => {
        const dot = document.createElement("i");
        dot.className = "ops-phase-path-dot";
        dot.style.left = point[0] + "px";
        dot.style.top = point[1] + "px";
        layer.appendChild(dot);
      });
    }
  };
  opsSetupPhasePath = function () {
    const select = (target) => {
      const node = target.closest("[data-phase-path],[data-phase-total]");
      if (!node) return;
      if (node.hasAttribute("data-phase-total"))
        opsSourceState.orderPhaseOne = "";
      else if (Number(node.dataset.phaseStep) === 1)
        opsSourceState.orderPhaseOne =
          opsSourceState.orderPhaseOne === node.dataset.phasePath
            ? ""
            : node.dataset.phasePath;
      else opsSourceState.orderPath = node.dataset.phasePath;
      opsRenderSource();
    };
    document.addEventListener("click", (event) => select(event.target));
    document.addEventListener("keydown", (event) => {
      if (
        (event.key === "Enter" || event.key === " ") &&
        event.target.closest("[data-phase-path],[data-phase-total]")
      ) {
        event.preventDefault();
        select(event.target);
      }
    });
    window.addEventListener(
      "resize",
      () => requestAnimationFrame(opsDrawPhasePath),
      { passive: true },
    );
  };
  const opsSetupPhasePathBeforeUvGroups = opsSetupPhasePath;
  opsSetupPhasePath = function () {
    const select = (target) => {
      const node = target.closest("[data-phase-path],[data-phase-total]");
      if (!node) return;
      if (node.hasAttribute("data-phase-total"))
        opsSourceState.orderPhaseOne = "";
      else if (Number(node.dataset.phaseStep) === 1)
        opsSourceState.orderPhaseOne =
          opsSourceState.orderPhaseOne === node.dataset.phasePath
            ? ""
            : node.dataset.phasePath;
      else {
        const key = node.dataset.phasePath;
        opsSourceState.orderPath =
          key === "otif-processing-on"
            ? "candidate-on-no"
            : key === "otif-processing-late"
              ? "candidate-late-no"
              : key;
      }
      opsRenderSource();
    };
    document.addEventListener("click", (event) => select(event.target));
    document.addEventListener("keydown", (event) => {
      if (
        (event.key === "Enter" || event.key === " ") &&
        event.target.closest("[data-phase-path],[data-phase-total]")
      ) {
        event.preventDefault();
        select(event.target);
      }
    });
    window.addEventListener(
      "resize",
      () => requestAnimationFrame(opsDrawPhasePath),
      { passive: true },
    );
  };
  const opsRenderSourceBeforePhasePath = opsRenderSource;
  opsRenderSource = function () {
    opsRenderSourceBeforePhasePath();
    requestAnimationFrame(opsDrawPhasePath);
  };
  function opsBuildFocusRail() {
    const flow = document.querySelector("#ops-phase-flow");
    if (!flow) return;
    flow.querySelector(".ops-focus-rail")?.remove();
    const nodes = [
      ...flow.querySelectorAll("[data-phase-node].path-active"),
    ].sort((a, b) => Number(a.dataset.phaseStep) - Number(b.dataset.phaseStep));
    if (!nodes.length) return;
    const rail = document.createElement("div");
    rail.className = "ops-focus-rail";
    rail.style.setProperty("--focus-count", String(nodes.length));
    rail.innerHTML =
      '<div class="ops-focus-label"><b>Path đang xem</b><span>— đọc toàn bộ tuyến trên một hàng</span></div>' +
      nodes
        .map((node, index) => {
          const name = node.matches("[data-phase-total]")
              ? "Order lũy tiến"
              : node.querySelector(".phase-name")?.textContent.trim() ||
                "Value",
            value = node.matches("[data-phase-total]")
              ? node
                  .querySelector(".ops-phase-kpi-main strong")
                  ?.textContent.trim()
              : node.querySelector(".phase-value")?.textContent.trim();
          return (
            '<div class="ops-focus-item"><small>Phase ' +
            (index + 1) +
            "</small><span>" +
            opsEscape(name) +
            "</span><strong>" +
            opsEscape(value || "") +
            "</strong></div>"
          );
        })
        .join("");
    flow.querySelector(".ops-phase-flow-head").after(rail);
  }
  const opsRenderSourceBeforeFocusRail = opsRenderSource;
  opsRenderSource = function () {
    opsRenderSourceBeforeFocusRail();
    requestAnimationFrame(() => {
      opsBuildFocusRail();
      opsDrawPhasePath();
    });
  };
  function opsAlignCloseArrow() {
    const swim = document.querySelector(".ops-swim.branch-close");
    if (!swim) return;
    const order = swim.querySelector(".ops-swim-order"),
      target = swim.querySelector(".ops-swim-close");
    if (!order || !target) return;
    const start = order.getBoundingClientRect().right + 12,
      end = target.getBoundingClientRect().left,
      width = Math.max(12, end - start - 1);
    swim.style.setProperty("--close-arrow-width", width + "px");
  }
  const opsRenderSourceBeforeCloseArrow = opsRenderSource;
  opsRenderSource = function () {
    opsRenderSourceBeforeCloseArrow();
    requestAnimationFrame(opsAlignCloseArrow);
  };
  window.addEventListener(
    "resize",
    () => requestAnimationFrame(opsAlignCloseArrow),
    { passive: true },
  );
  function opsDrawOrderConnector() {
    const swim = document.querySelector(".ops-swim");
    if (!swim) return;
    swim.querySelector(".ops-order-connector")?.remove();
    const source = swim.querySelector(".ops-swim-order-main"),
      target = swim.classList.contains("branch-done")
        ? swim.querySelector(".ops-swim-done")
        : swim.classList.contains("branch-close")
          ? swim.querySelector(".ops-swim-close")
          : swim.querySelector(".ops-swim-processing");
    if (!source || !target) return;
    const box = swim.getBoundingClientRect(),
      a = source.getBoundingClientRect(),
      b = target.getBoundingClientRect(),
      x1 = a.right - box.left,
      y1 = a.top + a.height / 2 - box.top,
      x2 = b.left - box.left,
      y2 = b.top + b.height / 2 - box.top,
      turn = x1 + Math.min(24, Math.max(12, (x2 - x1) / 2)),
      layer = document.createElement("span");
    layer.className = "ops-order-connector";
    const add = (name, left, top, width, height) => {
      const part = document.createElement("i");
      part.className = name;
      part.style.left = left + "px";
      part.style.top = top + "px";
      if (width !== undefined) part.style.width = Math.max(0, width) + "px";
      if (height !== undefined) part.style.height = Math.max(0, height) + "px";
      layer.appendChild(part);
    };
    add("connector-h", x1, y1, turn - x1);
    if (Math.abs(y2 - y1) > 1)
      add("connector-v", turn, Math.min(y1, y2), undefined, Math.abs(y2 - y1));
    add("connector-h", turn, y2, Math.max(0, x2 - turn - 8));
    add("connector-arrow", x2 - 8, y2 - 3.25);
    swim.appendChild(layer);
  }
  const opsRenderSourceBeforeOrderConnector = opsRenderSource;
  opsRenderSource = function () {
    opsRenderSourceBeforeOrderConnector();
    requestAnimationFrame(opsDrawOrderConnector);
  };
  window.addEventListener(
    "resize",
    () => requestAnimationFrame(opsDrawOrderConnector),
    { passive: true },
  );
  let opsConnectorResizeFrame = 0;
  function opsRefreshOrderConnector() {
    cancelAnimationFrame(opsConnectorResizeFrame);
    opsConnectorResizeFrame = requestAnimationFrame(opsDrawOrderConnector);
  }
  if ("ResizeObserver" in window) {
    const opsConnectorResizeObserver = new ResizeObserver(
      opsRefreshOrderConnector,
    );
    opsConnectorResizeObserver.observe(document.querySelector(".main"));
  }
  appShell.addEventListener("transitionend", (event) => {
    if (event.propertyName === "grid-template-columns")
      opsRefreshOrderConnector();
  });
  const opsOrderDashboardBeforeCycleColor = opsOrderDashboard;
  opsOrderDashboard = function () {
    return opsOrderDashboardBeforeCycleColor().replace(
      /class="ops-cycle-change down">↑/g,
      'class="ops-cycle-change up">↑',
    );
  };
  const opsOrderDashboardBeforeUvFlag = opsOrderDashboard;
  opsOrderDashboard = function () {
    let html = opsOrderDashboardBeforeUvFlag().replaceAll(" Dist.", "");
    html = html
      .replace(
        /<i class="ops-quick-flag-trigger"[^>]*data-quick-flag="[^"]+"[^>]*>Flag<\/i>/g,
        "",
      )
      .replace(
        '<span class="ops-swim-group">On-Time</span>',
        '<span class="ops-swim-group">On-Time<i class="ops-quick-flag-trigger" role="button" tabindex="0" data-quick-flag="on-time"><u class="ops-flag-dot"></u>CLICK HERE</i></span>',
      )
      .replace(
        '<span class="ops-swim-group">Late</span>',
        '<span class="ops-swim-group">Late<i class="ops-quick-flag-trigger" role="button" tabindex="0" data-quick-flag="late"><u class="ops-flag-dot"></u>CLICK HERE</i></span>',
      );
    return html;
  };
  function opsQuickFlagContent(mode) {
    const onTime = mode === "on-time",
      progress = onTime
        ? [
            ["Chờ duyệt", 18],
            ["Scan CV", 22],
            ["Phỏng vấn vòng 2", 20],
            ["Chờ kết quả phỏng vấn vòng 2", 14],
            ["Phỏng vấn vòng 3", 12],
            ["Chờ kết quả phỏng vấn vòng 3", 10],
            ["Onboard", 9],
            ["Học việc", 6],
            ["Đạt học việc", 4],
          ]
        : [
            ["Chờ duyệt", 8],
            ["Scan CV", 11],
            ["Phỏng vấn vòng 2", 9],
            ["Chờ kết quả phỏng vấn vòng 2", 7],
            ["Phỏng vấn vòng 3", 6],
            ["Chờ kết quả phỏng vấn vòng 3", 5],
            ["Onboard", 4],
            ["Học việc", 3],
            ["Đạt học việc", 1],
          ],
      deadlines = onTime
        ? [
            ["Còn 1 ngày", 3],
            ["Còn 2 ngày", 2],
            ["Còn 3 ngày", 2],
            ["Còn 4 ngày", 1],
            ["Còn 5 ngày", 1],
            ["Còn 6 ngày", 1],
            ["Còn 7 ngày", 1],
            ["Còn ≤14 ngày", 1],
            ["Còn >14 ngày", 1],
          ]
        : [
            ["Trễ 1 ngày", 8],
            ["Trễ 2 ngày", 7],
            ["Trễ 3 ngày", 6],
            ["Trễ 4 ngày", 5],
            ["Trễ 5 ngày", 4],
            ["Trễ 6 ngày", 3],
            ["Trễ 7 ngày", 3],
            ["Trễ ≤14 ngày", 3],
            ["Trễ >14 ngày", 2],
          ],
      hasUv = onTime ? 115 : 54,
      noUv = onTime ? 13 : 41,
      max = Math.max(...progress.map((x) => x[1]));
    return (
      '<div class="ops-flag-summary"><div class="ops-flag-kpi"><span>Có UV</span><b>' +
      hasUv +
      '</b></div><div class="ops-flag-kpi"><span>Không/Chưa có UV</span><b>' +
      noUv +
      '</b></div></div><section class="ops-flag-block"><h3>Có UV · Theo tiến độ</h3><p>Sắp xếp theo đúng trình tự xử lý trong bộ lọc Tiến độ.</p>' +
      progress
        .map(
          (x) =>
            '<div class="ops-progress-flag"><span style="--intensity:' +
            Math.round((x[1] / max) * 100) +
            '%"><i>' +
            x[0] +
            "</i></span><b>" +
            x[1] +
            "</b></div>",
        )
        .join("") +
      '</section><section class="ops-flag-block"><h3>Không/Chưa có UV · ' +
      (onTime ? "Deadline còn lại" : "Số ngày trễ") +
      "</h3><p>" +
      (onTime
        ? "Order chưa có ứng viên được nhóm theo thời gian còn lại."
        : "Order chưa có ứng viên được nhóm theo số ngày đã trễ.") +
      '</p><div class="ops-deadline-grid">' +
      deadlines
        .map(
          (x) =>
            '<div class="ops-deadline-flag"><span>' +
            x[0] +
            "</span><b>" +
            x[1] +
            "</b></div>",
        )
        .join("") +
      "</div></section>"
    );
  }
  const opsQuickFlagContentBeforeRefine = opsQuickFlagContent;
  opsQuickFlagContent = function (mode) {
    let html = opsQuickFlagContentBeforeRefine(mode)
        .replace(
          /<div class="ops-progress-flag"><span[^>]*><i>Đạt học việc<\/i><\/span><b>\d+<\/b><\/div>/,
          "",
        )
        .replace(
          /(<i>Học việc<\/i><\/span><b>)\d+(<\/b>)/,
          "$1" + (mode === "on-time" ? 10 : 4) + "$2",
        ),
      values =
        mode === "on-time"
          ? [3, 2, 2, 1, 1, 1, 1, 1, 1]
          : [8, 7, 6, 5, 4, 3, 3, 3, 2],
      max = Math.max(...values),
      index = 0;
    return html.replace(
      /<div class="ops-deadline-flag">/g,
      () =>
        '<div class="ops-deadline-flag" style="--flag-level:' +
        Math.round((values[index++] / max) * 100) +
        '%">',
    );
  };
  const opsQuickFlagContentBeforeHeat = opsQuickFlagContent;
  opsQuickFlagContent = function (mode) {
    let html = opsQuickFlagContentBeforeHeat(mode),
      values =
        mode === "on-time"
          ? [3, 2, 2, 1, 1, 1, 1, 1, 1]
          : [8, 7, 6, 5, 4, 3, 3, 3, 2],
      max = Math.max(...values),
      index = 0;
    return html.replace(/style="--flag-level:[^"]+"/g, () => {
      const ratio = values[index++] / max,
        alpha = (0.055 + ratio * 0.205).toFixed(3);
      return 'style="--flag-heat:rgba(176,0,58,' + alpha + ')"';
    });
  };
  function opsOpenQuickFlag(mode) {
    const drawer = document.querySelector("#ops-flag-drawer");
    document.querySelector("#ops-flag-title").textContent =
      "Quick Flag · Processing " + (mode === "on-time" ? "On-Time" : "Late");
    document.querySelector("#ops-flag-subtitle").textContent =
      mode === "on-time"
        ? "Theo dõi deadline còn lại và tiến độ ứng viên."
        : "Theo dõi số ngày trễ và tiến độ ứng viên.";
    document.querySelector("#ops-flag-body").innerHTML =
      opsQuickFlagContent(mode);
    drawer.classList.add("open");
    document.querySelector("#ops-flag-backdrop").classList.add("open");
  }
  function opsCloseQuickFlag() {
    document.querySelector("#ops-flag-drawer")?.classList.remove("open");
    document.querySelector("#ops-flag-backdrop")?.classList.remove("open");
  }
  function opsSetupQuickFlag() {
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div class="ops-flag-backdrop" id="ops-flag-backdrop"></div><aside class="ops-flag-drawer" id="ops-flag-drawer" aria-label="Quick Flag"><div class="ops-flag-head"><div><h2 id="ops-flag-title">Quick Flag</h2><p id="ops-flag-subtitle"></p></div><button class="filter-close" id="ops-flag-close" type="button">×</button></div><div class="ops-flag-body" id="ops-flag-body"></div></aside>',
    );
    document.addEventListener(
      "click",
      (event) => {
        const trigger = event.target.closest("[data-quick-flag]");
        if (trigger) {
          event.preventDefault();
          event.stopImmediatePropagation();
          opsOpenQuickFlag(trigger.dataset.quickFlag);
        }
      },
      true,
    );
    document.addEventListener(
      "keydown",
      (event) => {
        const trigger = event.target.closest("[data-quick-flag]");
        if (trigger && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.stopImmediatePropagation();
          opsOpenQuickFlag(trigger.dataset.quickFlag);
        }
        if (event.key === "Escape") opsCloseQuickFlag();
      },
      true,
    );
    document
      .querySelector("#ops-flag-close")
      .addEventListener("click", opsCloseQuickFlag);
    document
      .querySelector("#ops-flag-backdrop")
      .addEventListener("click", opsCloseQuickFlag);
  }
  const opsOrderDashboardBeforeStatusValueEmphasis = opsOrderDashboard;
  opsOrderDashboard = function () {
    return opsOrderDashboardBeforeStatusValueEmphasis().replace(
      /(<div class="ops-swim-lane-title"><strong>(?:Done|Processing)<\/strong>)<span>([\d.,]+)\s*·\s*(\d+)%<\/span>/g,
      (match, prefix, value, percent) =>
        prefix +
        '<span class="ops-status-value"><b>' +
        value +
        "</b><em>" +
        percent +
        "%</em></span>",
    );
  };
  opsDrawOrderTrendLines = function () {
    const canvas = document.querySelector(".ops-trend-lines");
    if (!canvas) return;
    const rows = opsOrderTrendData(),
      box = canvas.getBoundingClientRect(),
      ratio = window.devicePixelRatio || 1,
      width = Math.max(1, box.width),
      height = Math.max(1, box.height);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    const max = Math.max(
        ...rows.map((row) => Math.max(row.total, row.sent)),
        1,
      ),
      x = (index) => ((index + 0.5) * width) / rows.length,
      y = (value) => height - (value / max) * (height - 8) - 4,
      color = "#5f8f94";
    ctx.beginPath();
    rows.forEach((row, index) => {
      const px = x(index),
        py = y(row.sent);
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
    rows.forEach((row, index) => {
      const px = x(index),
        py = y(row.sent);
      ctx.beginPath();
      ctx.arc(px, py, 2.3, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.font = '600 6.5px "Segoe UI",sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = color;
      ctx.fillText(opsFmt(row.sent), px, Math.max(8, py - 5));
    });
  };
  const opsDrawOrderTrendLinesBeforeCollisionFix = opsDrawOrderTrendLines;
  opsDrawOrderTrendLines = function () {
    const canvas = document.querySelector(".ops-trend-lines");
    if (!canvas) return;
    const rows = opsOrderTrendData(),
      box = canvas.getBoundingClientRect(),
      ratio = window.devicePixelRatio || 1,
      width = Math.max(1, box.width),
      height = Math.max(1, box.height);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    const max = Math.max(
        ...rows.map((row) => Math.max(row.total, row.sent)),
        1,
      ),
      x = (index) => ((index + 0.5) * width) / rows.length,
      y = (value) => height - (value / max) * (height - 8) - 4,
      color = "#5f8f94";
    ctx.beginPath();
    rows.forEach((row, index) => {
      const px = x(index),
        py = y(row.sent);
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
    rows.forEach((row, index) => {
      const px = x(index),
        py = y(row.sent),
        label = opsFmt(row.sent),
        placeBelow = py < 18,
        labelY = placeBelow ? py + 13 : py - 8;
      ctx.beginPath();
      ctx.arc(px, py, 2.3, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.font = '600 6.5px "Segoe UI",sans-serif';
      const metrics = ctx.measureText(label),
        labelWidth = metrics.width + 6;
      ctx.fillStyle = "rgba(255,255,255,.94)";
      ctx.fillRect(px - labelWidth / 2, labelY - 7, labelWidth, 9);
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = color;
      ctx.fillText(label, px, labelY);
    });
  };
  function opsConfigDimensions() {
    return [
      "Năm",
      "Tháng",
      "Period",
      "Dự án",
      "Khu vực",
      "Thành phố",
      "Vị trí tuyển dụng",
      "Loại tuyển",
      "Trạng thái",
      "OTIF",
      "Tiến độ",
      "Account Manager",
      "Supervisor",
      "Team Leader",
      "Recruiter",
    ];
  }
  function opsConfigMetrics() {
    return [
      "Order hôm nay",
      "Order lũy tiến",
      "Order Done",
      "Order Processing",
      "Done On-Time",
      "%Fullfill On-Time",
      "Done Late",
      "Processing On-Time",
      "Processing On-Time Có UV",
      "Processing On-Time Không UV",
      "Processing Late Có UV",
      "Processing Late Không UV",
      "Close",
      "Pending",
      "Không duyệt",
    ];
  }
  function opsNormalizeDimension(value) {
    return (
      { Project: "Dự án", Region: "Khu vực", Status: "Trạng thái" }[value] ||
      value ||
      "Dự án"
    );
  }
  function opsNormalizeMetric(value) {
    return (
      {
        "Total Order": "Order lũy tiến",
        "% Done": "%Fullfill On-Time",
        "Processing Late": "Processing Late Không UV",
        "Late chưa có UV": "Processing Late Không UV",
        "Fulfill Ontime Rate": "%Fullfill On-Time",
      }[value] ||
      value ||
      "Order lũy tiến"
    );
  }
  function opsDateInputValue(date) {
    const pad = (value) => String(value).padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate())
    );
  }
  function opsNormalizeOrderTime() {
    const f = opsSourceState.orderFilters,
      now = new Date(),
      start = new Date(now);
    start.setDate(start.getDate() - 13);
    if (!["approved", "completed", "kpi"].includes(f.timeBasis))
      f.timeBasis = "approved";
    if (!f.dateFrom) f.dateFrom = opsDateInputValue(start);
    if (!f.dateTo) f.dateTo = opsDateInputValue(now);
    if (!["year", "month"].includes(f.kpiScope)) f.kpiScope = "month";
    if (!f.kpiYear) f.kpiYear = String(now.getFullYear());
    if (f.kpiMonth === undefined || f.kpiMonth === "")
      f.kpiMonth = String(now.getMonth());
    if (!["day", "week", "month"].includes(f.period)) f.period = "day";
    return f;
  }
  opsOrderTimeContext = function () {
    const f = opsNormalizeOrderTime(),
      now = new Date(),
      parse = (value) => {
        const parts = String(value).split("-").map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2]);
      },
      fmt = (date) =>
        date.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
    let anchor, end, basisLabel;
    if (f.timeBasis === "kpi") {
      const year = Number(f.kpiYear) || now.getFullYear(),
        month = Number(f.kpiMonth) || 0;
      if (f.kpiScope === "year") {
        anchor = new Date(year, 0, 1);
        end = new Date(year, 11, 31);
        basisLabel = "Chu kỳ KPI · Năm " + year;
      } else {
        anchor = new Date(year, month, 1);
        end = new Date(year, month + 1, 0);
        basisLabel = "Chu kỳ KPI · Tháng " + (month + 1) + "/" + year;
      }
    } else {
      anchor = parse(f.dateFrom);
      end = parse(f.dateTo);
      if (end < anchor) [anchor, end] = [end, anchor];
      basisLabel =
        f.timeBasis === "completed"
          ? "Ngày hoàn thành Order"
          : "Ngày duyệt Order";
    }
    const days = Math.max(1, Math.floor((end - anchor) / 86400000) + 1),
      count =
        f.period === "day"
          ? days
          : f.period === "week"
            ? Math.max(1, Math.ceil(days / 7))
            : Math.max(
                1,
                (end.getFullYear() - anchor.getFullYear()) * 12 +
                  end.getMonth() -
                  anchor.getMonth() +
                  1,
              ),
      periodName = { day: "ngày", week: "tuần", month: "tháng" }[f.period];
    let currentLabel;
    if (f.period === "day")
      currentLabel =
        opsDateInputValue(end) === opsDateInputValue(now)
          ? "Order hôm nay · " + fmt(end)
          : "Order ngày " + fmt(end);
    else if (f.period === "week") {
      const first = new Date(end.getFullYear(), 0, 1),
        week = Math.ceil(((end - first) / 86400000 + first.getDay() + 1) / 7);
      currentLabel = "Order tuần " + week + " · " + end.getFullYear();
    } else
      currentLabel =
        "Order tháng " + (end.getMonth() + 1) + "/" + end.getFullYear();
    return {
      count,
      anchor,
      end,
      future: false,
      range: fmt(anchor) + " → " + fmt(end),
      periodName,
      currentLabel,
      basisLabel,
    };
  };
  opsOrderFilterPanel = function () {
    const f = opsNormalizeOrderTime(),
      time = opsOrderTimeContext(),
      years = ["2023", "2024", "2025", "2026", "2027", "2028"],
      months = Array.from({ length: 12 }, (_, index) => String(index)),
      basis =
        '<label class="ops-order-time-mode">Căn cứ thời gian<select data-order-filter="timeBasis"><option value="approved" ' +
        (f.timeBasis === "approved" ? "selected" : "") +
        '>Ngày duyệt Order</option><option value="completed" ' +
        (f.timeBasis === "completed" ? "selected" : "") +
        '>Ngày hoàn thành Order</option><option value="kpi" ' +
        (f.timeBasis === "kpi" ? "selected" : "") +
        ">Chu kỳ KPI</option></select></label>",
      period =
        '<label>Period<select data-order-filter="period"><option value="day" ' +
        (f.period === "day" ? "selected" : "") +
        '>Daily</option><option value="week" ' +
        (f.period === "week" ? "selected" : "") +
        '>Weekly</option><option value="month" ' +
        (f.period === "month" ? "selected" : "") +
        ">Monthly</option></select></label>",
      dateFields =
        '<div class="ops-order-date-range"><label>Từ ngày<input type="date" data-order-filter="dateFrom" value="' +
        f.dateFrom +
        '"></label><label>Đến ngày<input type="date" data-order-filter="dateTo" value="' +
        f.dateTo +
        '"></label></div><p class="ops-order-time-copy">Khoảng ngày áp dụng theo ' +
        (f.timeBasis === "completed" ? "ngày hoàn thành" : "ngày duyệt") +
        " của Order.</p>",
      kpiFields =
        '<label>Hiển thị KPI<select data-order-filter="kpiScope"><option value="month" ' +
        (f.kpiScope === "month" ? "selected" : "") +
        '>Theo tháng</option><option value="year" ' +
        (f.kpiScope === "year" ? "selected" : "") +
        '>Theo năm</option></select></label><label>Năm<select data-order-filter="kpiYear">' +
        years
          .map(
            (year) =>
              '<option value="' +
              year +
              '" ' +
              (f.kpiYear === year ? "selected" : "") +
              ">" +
              year +
              "</option>",
          )
          .join("") +
        "</select></label>" +
        (f.kpiScope === "month"
          ? '<label>Tháng<select data-order-filter="kpiMonth">' +
            months
              .map(
                (month) =>
                  '<option value="' +
                  month +
                  '" ' +
                  (f.kpiMonth === month ? "selected" : "") +
                  ">Tháng " +
                  (Number(month) + 1) +
                  "</option>",
              )
              .join("") +
            "</select></label>"
          : "") +
        '<p class="ops-order-time-copy">Chu kỳ KPI không sử dụng calendar.</p>',
      timeGroup = opsOrderGroup(
        "time",
        "Thời gian",
        basis + period + (f.timeBasis === "kpi" ? kpiFields : dateFields),
      ),
      scope = opsOrderGroup(
        "scope",
        "Dự án & phạm vi",
        opsOrderSelect("project", "Dự án", opsOrderOptions.projects) +
          opsOrderSelect("region", "Khu vực", opsOrderOptions.regions) +
          opsOrderSelect("city", "Thành phố", opsOrderOptions.cities) +
          opsOrderSelect(
            "position",
            "Vị trí tuyển dụng",
            opsOrderOptions.positions,
          ),
      ),
      status = opsOrderGroup(
        "status",
        "Trạng thái & OTIF",
        opsOrderSelect("status", "Trạng thái", [
          "Processing",
          "Done",
          "Close",
        ]) +
          opsOrderSelect("otif", "OTIF", ["Done", "Late"]) +
          opsOrderSelect("hireType", "Loại tuyển", [
            "Tuyển mới",
            "Tuyển thay thế",
          ]),
      ),
      progress = opsOrderGroup(
        "progress",
        "Tiến độ",
        opsOrderSelect("progress", "Tiến độ Order", opsOrderOptions.progress),
      ),
      peopleFields = opsOrderPeopleFields(),
      people = peopleFields
        ? opsOrderGroup("people", "Nhân sự theo Preview Role", peopleFields)
        : "";
    return (
      '<details class="ops-order-filter" open><summary><span>Bộ lọc Tổng hợp Order</span><small>' +
      time.basisLabel +
      " · " +
      { day: "Daily", week: "Weekly", month: "Monthly" }[f.period] +
      '</small></summary><div class="ops-order-filter-body"><div class="ops-order-filter-groups">' +
      timeGroup +
      scope +
      status +
      progress +
      people +
      '</div><div class="ops-order-filter-note"><span>Khoảng dữ liệu: ' +
      time.range +
      '</span><button class="btn" data-order-reset type="button">Đặt lại bộ lọc</button></div></div></details>'
    );
  };
  const opsDataBeforeCalendar = opsData;
  opsData = function () {
    const data = opsDataBeforeCalendar(),
      f = opsNormalizeOrderTime();
    if (f.period !== "week") return data;
    const target = Math.round((1673 * opsOrderTimeContext().count) / 7),
      scale = target / Math.max(1, data.order),
      result = { ...data };
    [
      "order",
      "done",
      "close",
      "late",
      "noCandidate",
      "approach",
      "onboard",
      "leave",
      "sent",
    ].forEach((key) => (result[key] = Math.round(data[key] * scale)));
    result.order = target;
    return result;
  };
  const opsRenderSourceSummaryBeforeCalendar = opsRenderSourceSummary;
  opsRenderSourceSummary = function () {
    opsRenderSourceSummaryBeforeCalendar();
    if (opsSourceState.activeSection !== "ops-orders") return;
    const summary = document.querySelector("#filter-summary"),
      f = opsNormalizeOrderTime(),
      time = opsOrderTimeContext(),
      chips = [
        time.basisLabel,
        { day: "Daily", week: "Weekly", month: "Monthly" }[f.period],
        f.timeBasis === "kpi" ? time.range : "Ngày: " + time.range,
      ];
    [
      ["project", "Dự án"],
      ["region", "Khu vực"],
      ["city", "Thành phố"],
      ["position", "Vị trí"],
      ["status", "Trạng thái"],
      ["otif", "OTIF"],
      ["progress", "Tiến độ"],
      ["am", "AM"],
      ["supervisor", "SUP"],
      ["teamLead", "TL"],
      ["recruiter", "Recruiter"],
    ].forEach((pair) => {
      if (f[pair[0]] && f[pair[0]] !== "all")
        chips.push(pair[1] + ": " + f[pair[0]]);
    });
    summary.innerHTML =
      "Bộ lọc: " +
      chips
        .map(
          (value) =>
            '<span class="filter-chip">' + opsEscape(value) + "</span>",
        )
        .join(" ");
    const fullFilterText =
      "Bộ lọc đang áp dụng:\n" + chips.map((value) => "• " + value).join("\n");
    summary.title = fullFilterText;
    summary.setAttribute("aria-label", fullFilterText);
  };
  const opsOrderDashboardBeforeTodaySource = opsOrderDashboard;
  opsOrderDashboard = function () {
    let html = opsOrderDashboardBeforeTodaySource(),
      active = opsSourceState.orderPhaseOne === "flow-today";
    const totalMatch = html.match(/ops-swim-order-value"><strong>([\d.,]+)/),
      todayMatch = html.match(/ops-swim-today">[\s\S]*?<strong>([\d.,]+)/),
      number = (value) => Number(String(value).replace(/\D/g, ""));
    if (active && totalMatch && todayMatch) {
      const total = number(totalMatch[1]),
        today = number(todayMatch[1]),
        factor = today / Math.max(1, total),
        scaled = (value) =>
          opsFmt(Math.max(0, Math.round(number(value) * factor)));
      html = html
        .replace(
          /(ops-swim-order-value"><strong>)[\d.,]+/,
          "$1" + opsFmt(today),
        )
        .replace(
          /(<button[^>]*class="[^"]*ops-swim-break-row[^"]*"[^>]*>[\s\S]*?<b>)([\d.,]+)/g,
          (match, prefix, value) => prefix + scaled(value),
        )
        .replace(
          /(<span class="ops-status-value"><b>)([\d.,]+)/g,
          (match, prefix, value) => prefix + scaled(value),
        )
        .replace(
          /(<button[^>]*class="[^"]*ops-swim-metric[^"]*"[^>]*>[\s\S]*?<b>)([\d.,]+)/g,
          (match, prefix, value) => prefix + scaled(value),
        );
    }
    return html.replace(
      /<div class="ops-swim-today">([\s\S]*?)<\/div>/,
      '<button type="button" class="ops-swim-today ' +
        (active ? "path-active" : "") +
        '" data-phase-today data-phase-step="1">$1</button>',
    );
  };
  opsSetupPhasePath = function () {
    const select = (target) => {
      const node = target.closest(
        "[data-phase-path],[data-phase-total],[data-phase-today]",
      );
      if (!node) return;
      if (node.hasAttribute("data-phase-total"))
        opsSourceState.orderPhaseOne = "";
      else if (node.hasAttribute("data-phase-today"))
        opsSourceState.orderPhaseOne =
          opsSourceState.orderPhaseOne === "flow-today" ? "" : "flow-today";
      else if (Number(node.dataset.phaseStep) === 1)
        opsSourceState.orderPhaseOne =
          opsSourceState.orderPhaseOne === node.dataset.phasePath
            ? ""
            : node.dataset.phasePath;
      else {
        const key = node.dataset.phasePath;
        opsSourceState.orderPath =
          key === "otif-processing-on"
            ? "candidate-on-no"
            : key === "otif-processing-late"
              ? "candidate-late-no"
              : key;
      }
      opsRenderSource();
    };
    document.addEventListener("click", (event) => select(event.target));
    document.addEventListener("keydown", (event) => {
      if (
        (event.key === "Enter" || event.key === " ") &&
        event.target.closest(
          "[data-phase-path],[data-phase-total],[data-phase-today]",
        )
      ) {
        event.preventDefault();
        select(event.target);
      }
    });
    window.addEventListener(
      "resize",
      () => requestAnimationFrame(opsDrawPhasePath),
      { passive: true },
    );
  };
  let opsCalendarOpen = false,
    opsCalendarCursor = null,
    opsCalendarDraftStart = null;
  const opsNormalizeOrderTimeBeforeRange = opsNormalizeOrderTime;
  opsNormalizeOrderTime = function () {
    const f = opsNormalizeOrderTimeBeforeRange();
    f.kpiScope = "year";
    if (!Array.isArray(f.kpiMonths)) f.kpiMonths = [];
    if (f.toCurrent === undefined) f.toCurrent = false;
    return f;
  };
  opsOrderTimeContext = function () {
    const f = opsNormalizeOrderTime(),
      now = new Date(),
      parse = (value) => {
        const parts = String(value).split("-").map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2]);
      },
      fmt = (date) =>
        date.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      periodName = { day: "ngày", week: "tuần", month: "tháng" }[f.period];
    let anchor, end, basisLabel, count;
    if (f.timeBasis === "kpi") {
      const year = Number(f.kpiYear) || now.getFullYear(),
        months = f.kpiMonths
          .map(Number)
          .filter((value) => value >= 0 && value < 12)
          .sort((a, b) => a - b);
      anchor = new Date(year, months.length ? months[0] : 0, 1);
      end = new Date(
        year,
        (months.length ? months[months.length - 1] : 11) + 1,
        0,
      );
      const days = Math.max(1, Math.floor((end - anchor) / 86400000) + 1);
      count =
        f.period === "month"
          ? months.length || 12
          : f.period === "week"
            ? Math.ceil(days / 7)
            : days;
      basisLabel =
        "Chu kỳ KPI · Năm " +
        year +
        (months.length ? " · " + months.length + " tháng" : "");
    } else {
      anchor = parse(f.dateFrom);
      end = f.toCurrent
        ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
        : parse(f.dateTo);
      if (end < anchor) [anchor, end] = [end, anchor];
      const days = Math.max(1, Math.floor((end - anchor) / 86400000) + 1);
      count =
        f.period === "day"
          ? days
          : f.period === "week"
            ? Math.max(1, Math.ceil(days / 7))
            : Math.max(
                1,
                (end.getFullYear() - anchor.getFullYear()) * 12 +
                  end.getMonth() -
                  anchor.getMonth() +
                  1,
              );
      basisLabel =
        f.timeBasis === "completed"
          ? "Ngày hoàn thành Order"
          : "Ngày duyệt Order";
    }
    let currentLabel;
    if (f.period === "day")
      currentLabel =
        opsDateInputValue(end) === opsDateInputValue(now)
          ? "Order hôm nay · " + fmt(end)
          : "Order ngày " + fmt(end);
    else if (f.period === "week") {
      const first = new Date(end.getFullYear(), 0, 1),
        week = Math.ceil(((end - first) / 86400000 + first.getDay() + 1) / 7);
      currentLabel = "Order tuần " + week + " · " + end.getFullYear();
    } else
      currentLabel =
        "Order tháng " + (end.getMonth() + 1) + "/" + end.getFullYear();
    return {
      count,
      anchor,
      end,
      future: false,
      range: fmt(anchor) + " → " + fmt(end),
      periodName,
      currentLabel,
      basisLabel,
    };
  };
  function opsCalendarHtml() {
    const f = opsNormalizeOrderTime(),
      cursor =
        opsCalendarCursor ||
        new Date(
          Number(f.dateFrom.slice(0, 4)),
          Number(f.dateFrom.slice(5, 7)) - 1,
          1,
        ),
      year = cursor.getFullYear(),
      month = cursor.getMonth(),
      first = new Date(year, month, 1),
      startCell = new Date(year, month, 1 - first.getDay()),
      committedStart = f.dateFrom,
      committedEnd = f.toCurrent ? opsDateInputValue(new Date()) : f.dateTo,
      rangeStart = opsCalendarDraftStart || committedStart,
      rangeEnd = opsCalendarDraftStart ? opsCalendarDraftStart : committedEnd,
      days = Array.from({ length: 42 }, (_, index) => {
        const date = new Date(startCell);
        date.setDate(startCell.getDate() + index);
        const key = opsDateInputValue(date),
          muted = date.getMonth() !== month,
          inRange = key >= rangeStart && key <= rangeEnd,
          start = key === rangeStart,
          end = key === rangeEnd;
        return (
          '<button type="button" class="ops-calendar-day ' +
          (muted ? "muted " : "") +
          (inRange ? "in-range " : "") +
          (start ? "range-start " : "") +
          (end ? "range-end" : "") +
          '" data-calendar-date="' +
          key +
          '">' +
          date.getDate() +
          "</button>"
        );
      }).join(""),
      status = opsCalendarDraftStart
        ? "Đã chọn ngày đầu · chọn thêm ngày kết thúc"
        : f.toCurrent
          ? "Đang tính đến ngày hiện tại"
          : "Bắt buộc đủ hai mốc";
    return (
      '<div class="ops-calendar-popover"><div class="ops-calendar-head"><button type="button" data-calendar-nav="-1">‹</button><strong>Tháng ' +
      (month + 1) +
      " · " +
      year +
      '</strong><button type="button" data-calendar-nav="1">›</button></div><div class="ops-calendar-week">' +
      ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
        .map((day) => "<span>" + day + "</span>")
        .join("") +
      '</div><div class="ops-calendar-days">' +
      days +
      '</div><div class="ops-calendar-footer"><label><input type="checkbox" data-calendar-current ' +
      (f.toCurrent ? "checked" : "") +
      '> Đến ngày hiện tại</label><span class="ops-calendar-status">' +
      status +
      "</span></div></div>"
    );
  }
  function opsKpiMonthsHtml() {
    const f = opsNormalizeOrderTime(),
      selected = f.kpiMonths.map(Number).sort((a, b) => a - b),
      summary = selected.length
        ? selected.map((value) => "T" + (value + 1)).join(", ")
        : "Cả năm";
    return (
      '<details class="ops-kpi-months"><summary><span>Tháng zoom</span><b>' +
      summary +
      '</b></summary><div class="ops-kpi-month-grid">' +
      Array.from(
        { length: 12 },
        (_, month) =>
          '<label><input type="checkbox" data-kpi-month="' +
          month +
          '" ' +
          (selected.includes(month) ? "checked" : "") +
          "> Tháng " +
          (month + 1) +
          "</label>",
      ).join("") +
      '</div></details><p class="ops-kpi-zoom-copy">Không chọn tháng = xem cả năm. Có thể chọn nhiều tháng để zoom.</p>'
    );
  }
  opsOrderFilterPanel = function () {
    const f = opsNormalizeOrderTime(),
      time = opsOrderTimeContext(),
      years = ["2023", "2024", "2025", "2026", "2027", "2028"],
      basis =
        '<label class="ops-order-time-mode">Căn cứ thời gian<select data-order-filter="timeBasis"><option value="approved" ' +
        (f.timeBasis === "approved" ? "selected" : "") +
        '>Ngày duyệt Order</option><option value="completed" ' +
        (f.timeBasis === "completed" ? "selected" : "") +
        '>Ngày hoàn thành Order</option><option value="kpi" ' +
        (f.timeBasis === "kpi" ? "selected" : "") +
        ">Chu kỳ KPI</option></select></label>",
      period =
        '<label>Period<select data-order-filter="period"><option value="day" ' +
        (f.period === "day" ? "selected" : "") +
        '>Daily</option><option value="week" ' +
        (f.period === "week" ? "selected" : "") +
        '>Weekly</option><option value="month" ' +
        (f.period === "month" ? "selected" : "") +
        ">Monthly</option></select></label>",
      rangeLabel = f.toCurrent
        ? new Date(f.dateFrom + "T00:00:00").toLocaleDateString("vi-VN") +
          " → Hiện tại"
        : time.range,
      dateFields =
        '<div class="ops-range-field"><button type="button" class="ops-range-trigger ' +
        (opsCalendarOpen ? "open" : "") +
        '" data-calendar-toggle><span>' +
        rangeLabel +
        "</span><i>▣</i></button>" +
        (opsCalendarOpen ? opsCalendarHtml() : "") +
        "</div>",
      kpiFields =
        '<label>Năm KPI<select data-order-filter="kpiYear">' +
        years
          .map(
            (year) =>
              '<option value="' +
              year +
              '" ' +
              (f.kpiYear === year ? "selected" : "") +
              ">" +
              year +
              "</option>",
          )
          .join("") +
        "</select></label>" +
        opsKpiMonthsHtml(),
      timeGroup = opsOrderGroup(
        "time",
        "Thời gian",
        basis + period + (f.timeBasis === "kpi" ? kpiFields : dateFields),
      ),
      scope = opsOrderGroup(
        "scope",
        "Dự án & phạm vi",
        opsOrderSelect("project", "Dự án", opsOrderOptions.projects) +
          opsOrderSelect("region", "Khu vực", opsOrderOptions.regions) +
          opsOrderSelect("city", "Thành phố", opsOrderOptions.cities) +
          opsOrderSelect(
            "position",
            "Vị trí tuyển dụng",
            opsOrderOptions.positions,
          ),
      ),
      status = opsOrderGroup(
        "status",
        "Trạng thái & OTIF",
        opsOrderSelect("status", "Trạng thái", [
          "Processing",
          "Done",
          "Close",
        ]) +
          opsOrderSelect("otif", "OTIF", ["Done", "Late"]) +
          opsOrderSelect("hireType", "Loại tuyển", [
            "Tuyển mới",
            "Tuyển thay thế",
          ]),
      ),
      progress = opsOrderGroup(
        "progress",
        "Tiến độ",
        opsOrderSelect("progress", "Tiến độ Order", opsOrderOptions.progress),
      ),
      peopleFields = opsOrderPeopleFields(),
      people = peopleFields
        ? opsOrderGroup("people", "Nhân sự theo Preview Role", peopleFields)
        : "";
    return (
      '<details class="ops-order-filter" open><summary><span>Bộ lọc Tổng hợp Order</span><small>' +
      time.basisLabel +
      " · " +
      { day: "Daily", week: "Weekly", month: "Monthly" }[f.period] +
      '</small></summary><div class="ops-order-filter-body"><div class="ops-order-filter-groups">' +
      timeGroup +
      scope +
      status +
      progress +
      people +
      '</div><div class="ops-order-filter-note"><span>Khoảng dữ liệu: ' +
      time.range +
      '</span><button class="btn" data-order-reset type="button">Đặt lại bộ lọc</button></div></div></details>'
    );
  };
  const opsOrderTrendLabelsBeforeKpiZoom = opsOrderTrendLabels;
  opsOrderTrendLabels = function () {
    const f = opsNormalizeOrderTime();
    if (f.timeBasis === "kpi" && f.period === "month" && f.kpiMonths.length)
      return f.kpiMonths
        .map(Number)
        .sort((a, b) => a - b)
        .map((month) => "T" + (month + 1));
    return opsOrderTrendLabelsBeforeKpiZoom();
  };
  const opsOrderDashboardBeforeYtd = opsOrderDashboard;
  opsOrderDashboard = function () {
    return opsOrderDashboardBeforeYtd().replaceAll("Order lũy tiến", "YTD");
  };
  const opsProjectTableBeforeYtd = opsProjectTable;
  opsProjectTable = function () {
    return opsProjectTableBeforeYtd().replaceAll("Order lũy tiến", "YTD");
  };
  opsData = function () {
    return opsDataBeforeOrderPeriodScale();
  };
  function opsSetupAdvancedTimeFilter() {
    document.addEventListener(
      "click",
      (event) => {
        const toggle = event.target.closest("[data-calendar-toggle]"),
          nav = event.target.closest("[data-calendar-nav]"),
          day = event.target.closest("[data-calendar-date]");
        if (toggle) {
          opsCalendarOpen = !opsCalendarOpen;
          if (opsCalendarOpen && !opsCalendarCursor) {
            const f = opsNormalizeOrderTime();
            opsCalendarCursor = new Date(
              Number(f.dateFrom.slice(0, 4)),
              Number(f.dateFrom.slice(5, 7)) - 1,
              1,
            );
          }
          opsSourceState.orderOpen = [
            ...new Set([...(opsSourceState.orderOpen || []), "time"]),
          ];
          opsRenderSource();
          return;
        }
        if (nav) {
          opsCalendarCursor.setMonth(
            opsCalendarCursor.getMonth() + Number(nav.dataset.calendarNav),
          );
          opsRenderSource();
          return;
        }
        if (day) {
          const f = opsNormalizeOrderTime(),
            date = day.dataset.calendarDate;
          if (!opsCalendarDraftStart) {
            opsCalendarDraftStart = date;
            f.toCurrent = false;
          } else {
            f.dateFrom =
              date < opsCalendarDraftStart ? date : opsCalendarDraftStart;
            f.dateTo =
              date < opsCalendarDraftStart ? opsCalendarDraftStart : date;
            f.toCurrent = false;
            opsCalendarDraftStart = null;
          }
          opsSourceState.orderOpen = [
            ...new Set([...(opsSourceState.orderOpen || []), "time"]),
          ];
          opsRenderSource();
        }
      },
      true,
    );
    document.addEventListener("change", (event) => {
      if (event.target.matches("[data-calendar-current]")) {
        const f = opsNormalizeOrderTime();
        if (event.target.checked) {
          f.dateFrom = opsCalendarDraftStart || f.dateFrom;
          f.dateTo = opsDateInputValue(new Date());
          f.toCurrent = true;
          opsCalendarDraftStart = null;
        } else f.toCurrent = false;
        opsRenderSource();
      }
      if (event.target.matches("[data-kpi-month]")) {
        const f = opsNormalizeOrderTime(),
          month = Number(event.target.dataset.kpiMonth),
          months = new Set(f.kpiMonths.map(Number));
        event.target.checked ? months.add(month) : months.delete(month);
        f.kpiMonths = [...months].sort((a, b) => a - b);
        opsSourceState.orderOpen = [
          ...new Set([...(opsSourceState.orderOpen || []), "time"]),
        ];
        opsRenderSource();
      }
    });
  }
  function opsSetupPersistentTimeReset() {
    document.addEventListener(
      "click",
      (event) => {
        const reset = event.target.closest("[data-order-reset],#clear-filters");
        if (!reset || !document.querySelector("#view-operations.active"))
          return;
        event.preventDefault();
        event.stopImmediatePropagation();
        const f = opsNormalizeOrderTime(),
          now = new Date(),
          start = new Date(now);
        start.setDate(start.getDate() - 13);
        const persistent = { timeBasis: f.timeBasis, period: f.period },
          defaults = {
            year: "",
            month: "",
            viewMode: "7",
            viewCount: 7,
            dateFrom: opsDateInputValue(start),
            dateTo: opsDateInputValue(now),
            toCurrent: false,
            kpiYear: String(now.getFullYear()),
            kpiMonths: [],
            project: "all",
            region: "all",
            city: "all",
            position: "all",
            hireType: "all",
            status: "all",
            otif: "all",
            progress: "all",
            am: "all",
            supervisor: "all",
            teamLead: "all",
            recruiter: "all",
            people: "all",
          };
        opsSourceState.orderFilters = { ...defaults, ...persistent };
        opsSourceState.orderRecruitType = "all";
        opsSourceState.orderPhaseOne = "";
        opsCalendarDraftStart = null;
        opsCalendarCursor = null;
        opsRenderSource();
      },
      true,
    );
  }
  opsVisualRows = function () {
    const time = opsOrderTimeContext(),
      f = opsSourceState.orderFilters,
      cities = opsOrderOptions.cities,
      positions = opsOrderOptions.positions,
      progress = opsOrderOptions.progress.filter((x) => x !== "Đạt học việc"),
      ams = opsOrderOptions.ams,
      sups = opsOrderOptions.supervisors.all,
      tls = opsOrderOptions.teamLeads.all,
      recruiters = opsOrderOptions.recruiters.all;
    return opsProjectRows().map((row, index) => ({
      Năm: String(time.anchor.getFullYear()),
      Tháng: "Tháng " + (time.anchor.getMonth() + 1),
      Period: { day: "Daily", week: "Weekly", month: "Monthly" }[f.period],
      "Dự án": row.project,
      "Khu vực":
        opsOrderOptions.regions[index % opsOrderOptions.regions.length],
      "Thành phố": cities[index % cities.length],
      "Vị trí tuyển dụng": positions[index % positions.length],
      "Loại tuyển": index % 3 ? "Tuyển mới" : "Tuyển thay thế",
      "Trạng thái": row.processing > row.done ? "Processing" : "Done",
      OTIF: row.doneLate > row.doneOn ? "Late" : "On-Time",
      "Tiến độ": progress[index % progress.length],
      "Account Manager": ams[index % ams.length],
      Supervisor: sups[index % sups.length],
      "Team Leader": tls[index % tls.length],
      Recruiter: recruiters[index % recruiters.length],
      "Order hôm nay": row.current,
      "Order lũy tiến": row.total,
      "Order Done": row.done,
      "Order Processing": row.processing,
      "Done On-Time": row.doneOn,
      "%Fullfill On-Time": row.fulfill,
      "Done Late": row.doneLate,
      "Processing On-Time": row.processingOn,
      "Processing On-Time Có UV": row.onHas,
      "Processing On-Time Không UV": row.onNo,
      "Processing Late Có UV": row.lateHas,
      "Processing Late Không UV": row.lateNo,
      Close: Math.round(row.total * 0.045),
      Pending: Math.round(row.total * 0.025),
      "Không duyệt": Math.round(row.total * 0.012),
    }));
  };
  function opsVisualMetricTotal(rows, metric) {
    const values = rows.map((row) => Number(row[metric]) || 0);
    return metric.startsWith("%")
      ? Math.round(
          values.reduce((a, b) => a + b, 0) / Math.max(1, values.length),
        )
      : values.reduce((a, b) => a + b, 0);
  }
  opsColumnVisual = function (visual) {
    const rows = opsVisualRows(),
      dimension = opsNormalizeDimension(visual.dimension),
      metrics = (
        visual.metrics && visual.metrics.length
          ? visual.metrics
          : [visual.metric || "Order lũy tiến"]
      )
        .map(opsNormalizeMetric)
        .slice(0, 2),
      labels = [...new Set(rows.map((row) => row[dimension]))],
      series = labels.map((label) => ({
        label,
        values: metrics.map((metric) =>
          opsVisualMetricTotal(
            rows.filter((row) => row[dimension] === label),
            metric,
          ),
        ),
      })),
      max = Math.max(1, ...series.flatMap((item) => item.values)),
      legend =
        '<div class="ops-visual-legend">' +
        metrics
          .map((metric) => "<span><i></i>" + opsEscape(metric) + "</span>")
          .join("") +
        "</div>";
    return (
      legend +
      '<div class="ops-source-chart multi">' +
      series
        .map(
          (item) =>
            '<div class="ops-source-bar-group">' +
            item.values
              .map(
                (value, index) =>
                  '<div class="ops-source-bar ' +
                  (index === 1 ? "metric-2" : "") +
                  '" style="height:' +
                  Math.max(8, (value / max) * 126) +
                  'px"><b>' +
                  opsFmt(value) +
                  (metrics[index].startsWith("%") ? "%" : "") +
                  "</b></div>",
              )
              .join("") +
            "<label>" +
            opsEscape(item.label) +
            "</label></div>",
        )
        .join("") +
      "</div>"
    );
  };
  opsTableVisual = function (visual) {
    const rows = opsVisualRows(),
      rowDims = (
        visual.rows && visual.rows.length ? visual.rows : ["Dự án"]
      ).slice(0, 2),
      colDims = (visual.columns || []).slice(0, 2),
      metrics =
        visual.metrics && visual.metrics.length
          ? visual.metrics
          : ["Order lũy tiến"];
    if (visual.tableMode === "matrix" && colDims.length) {
      const rowDim = rowDims[0],
        colDim = colDims[0],
        cols = [...new Set(rows.map((row) => row[colDim]))],
        rowValues = [...new Set(rows.map((row) => row[rowDim]))];
      return (
        '<div class="ops-mini-table"><table><thead><tr><th>' +
        opsEscape(rowDim) +
        " / " +
        opsEscape(colDim) +
        "</th>" +
        cols
          .map((col) =>
            metrics
              .map(
                (metric) =>
                  "<th>" +
                  opsEscape(col) +
                  "<small>" +
                  opsEscape(metric) +
                  "</small></th>",
              )
              .join(""),
          )
          .join("") +
        "</tr></thead><tbody>" +
        rowValues
          .map(
            (value) =>
              "<tr><td><b>" +
              opsEscape(value) +
              "</b></td>" +
              cols
                .map((col) => {
                  const scoped = rows.filter(
                    (row) => row[rowDim] === value && row[colDim] === col,
                  );
                  return metrics
                    .map(
                      (metric) =>
                        "<td>" +
                        opsFmt(opsVisualMetricTotal(scoped, metric)) +
                        (metric.startsWith("%") ? "%" : "") +
                        "</td>",
                    )
                    .join("");
                })
                .join("") +
              "</tr>",
          )
          .join("") +
        "</tbody></table></div>"
      );
    }
    const dimensions = [...new Set(rowDims.concat(colDims))],
      keys = [],
      seen = new Set();
    rows.forEach((row) => {
      const values = dimensions.map((dim) => row[dim]),
        key = JSON.stringify(values);
      if (!seen.has(key)) {
        seen.add(key);
        keys.push(values);
      }
    });
    return (
      '<div class="ops-mini-table"><table><thead><tr>' +
      dimensions
        .concat(metrics)
        .map((item) => "<th>" + opsEscape(item) + "</th>")
        .join("") +
      "</tr></thead><tbody>" +
      keys
        .map((values) => {
          const scoped = rows.filter((row) =>
            dimensions.every((dim, index) => row[dim] === values[index]),
          );
          return (
            "<tr>" +
            values
              .map((value) => "<td>" + opsEscape(value) + "</td>")
              .join("") +
            metrics
              .map(
                (metric) =>
                  "<td>" +
                  opsFmt(opsVisualMetricTotal(scoped, metric)) +
                  (metric.startsWith("%") ? "%" : "") +
                  "</td>",
              )
              .join("") +
            "</tr>"
          );
        })
        .join("") +
      "</tbody></table></div>"
    );
  };
  const opsTableVisualConfigured = opsTableVisual;
  function opsMatrixVisual(visual) {
    const data = opsVisualRows(),
      rowDims = (visual.rows && visual.rows.length ? visual.rows : ["Dự án"])
        .map(opsNormalizeDimension)
        .slice(0, 3),
      colDims = (visual.columns || []).map(opsNormalizeDimension).slice(0, 2),
      metrics = (
        visual.metrics && visual.metrics.length
          ? visual.metrics
          : ["Order lũy tiến"]
      ).map(opsNormalizeMetric),
      unique = (rows, dims) => {
        const seen = new Set();
        return rows
          .map((row) => dims.map((dim) => row[dim]))
          .filter((values) => {
            const key = JSON.stringify(values);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
      },
      rowCombos = unique(data, rowDims),
      colCombos = colDims.length ? unique(data, colDims) : [[]],
      depth = Math.max(1, colDims.length) + 1;
    let head =
      "<tr>" +
      rowDims
        .map(
          (dim, index) =>
            '<th rowspan="' +
            depth +
            '">Level ' +
            (index + 1) +
            "<small>" +
            opsEscape(dim) +
            "</small></th>",
        )
        .join("");
    if (colDims.length === 2) {
      const level1 = [...new Set(colCombos.map((combo) => combo[0]))];
      head +=
        level1
          .map(
            (value) =>
              '<th colspan="' +
              colCombos.filter((combo) => combo[0] === value).length *
                metrics.length +
              '">' +
              opsEscape(value) +
              "</th>",
          )
          .join("") +
        "</tr><tr>" +
        level1
          .map((value) =>
            colCombos
              .filter((combo) => combo[0] === value)
              .map(
                (combo) =>
                  '<th colspan="' +
                  metrics.length +
                  '">' +
                  opsEscape(combo[1]) +
                  "</th>",
              )
              .join(""),
          )
          .join("") +
        "</tr><tr>" +
        colCombos
          .map(() =>
            metrics
              .map((metric) => "<th>" + opsEscape(metric) + "</th>")
              .join(""),
          )
          .join("") +
        "</tr>";
    } else if (colDims.length === 1) {
      head +=
        colCombos
          .map(
            (combo) =>
              '<th colspan="' +
              metrics.length +
              '">' +
              opsEscape(combo[0]) +
              "</th>",
          )
          .join("") +
        "</tr><tr>" +
        colCombos
          .map(() =>
            metrics
              .map((metric) => "<th>" + opsEscape(metric) + "</th>")
              .join(""),
          )
          .join("") +
        "</tr>";
    } else {
      head +=
        metrics.map((metric) => "<th>" + opsEscape(metric) + "</th>").join("") +
        "</tr><tr>" +
        metrics.map(() => "<th>Value</th>").join("") +
        "</tr>";
    }
    const rowSpan = (index, level) => {
        let span = 1;
        for (let next = index + 1; next < rowCombos.length; next++) {
          if (
            rowCombos[next]
              .slice(0, level + 1)
              .every((value, i) => value === rowCombos[index][i])
          )
            span++;
          else break;
        }
        return span;
      },
      body = rowCombos
        .map((combo, index) => {
          let cells = "";
          rowDims.forEach((dim, level) => {
            const first =
              index === 0 ||
              !combo
                .slice(0, level + 1)
                .every((value, i) => value === rowCombos[index - 1][i]);
            if (first)
              cells +=
                '<td class="matrix-level" rowspan="' +
                rowSpan(index, level) +
                '">' +
                opsEscape(combo[level]) +
                "</td>";
          });
          const rowScope = data.filter((row) =>
            rowDims.every((dim, i) => row[dim] === combo[i]),
          );
          cells += colCombos
            .map((col) => {
              const scope = rowScope.filter((row) =>
                colDims.every((dim, i) => row[dim] === col[i]),
              );
              return metrics
                .map(
                  (metric) =>
                    "<td>" +
                    opsFmt(opsVisualMetricTotal(scope, metric)) +
                    (metric.startsWith("%") ? "%" : "") +
                    "</td>",
                )
                .join("");
            })
            .join("");
          return "<tr>" + cells + "</tr>";
        })
        .join("");
    return (
      '<p class="ops-matrix-levels"><b>Rows:</b> ' +
      rowDims.map((dim, i) => "Level " + (i + 1) + " · " + dim).join(" → ") +
      " &nbsp; <b>Columns:</b> " +
      (colDims.length
        ? colDims.map((dim, i) => "Level " + (i + 1) + " · " + dim).join(" → ")
        : "Không có") +
      '</p><div class="ops-mini-table"><table class="ops-matrix-table"><thead>' +
      head +
      "</thead><tbody>" +
      body +
      "</tbody></table></div>"
    );
  }
  opsTableVisual = function (visual) {
    const normalized = {
      ...visual,
      rows: (visual.rows || ["Dự án"]).map(opsNormalizeDimension),
      columns: (visual.columns || []).map(opsNormalizeDimension),
      metrics: (visual.metrics || ["Order lũy tiến"]).map(opsNormalizeMetric),
    };
    return normalized.tableMode === "matrix"
      ? opsMatrixVisual(normalized)
      : opsTableVisualConfigured({ ...normalized, columns: [] });
  };
  opsVisualCard = function (visual) {
    const metrics = (
        visual.metrics && visual.metrics.length
          ? visual.metrics
          : [visual.metric]
      )
        .filter(Boolean)
        .map(opsNormalizeMetric),
      dimension = opsNormalizeDimension(visual.dimension),
      rows = (visual.rows || []).map(opsNormalizeDimension),
      meta =
        visual.type === "column"
          ? "Column · " + dimension + " · " + metrics.join(" + ")
          : (visual.tableMode === "matrix" ? "Matrix" : "Table") +
            " · " +
            rows.join(", ") +
            " · " +
            metrics.join(", ");
    return (
      '<article class="ops-visual-card"><button class="ops-visual-edit" data-visual-edit="' +
      visual.id +
      '" type="button" aria-label="Chỉnh sửa">✎</button><h4>' +
      opsEscape(visual.name) +
      '</h4><div class="meta">' +
      opsEscape(meta) +
      "</div>" +
      (visual.type === "column"
        ? opsColumnVisual(visual)
        : opsTableVisual(visual)) +
      "</article>"
    );
  };
  const opsVisualWorkspaceConfigured = opsVisualWorkspace;
  opsVisualWorkspace = function () {
    return opsVisualWorkspaceConfigured()
      .replace(
        "Biểu đồ cột có dimension, metric và phép tổng hợp riêng.",
        "Biểu đồ cột theo dimension và tối đa 2 metrics.",
      )
      .replace(
        "Bảng thường hoặc matrix với nhiều dimension và metric.",
        "Table và Matrix hiển thị đúng dimensions, metrics đã cấu hình.",
      );
  };
  let opsEditorDimensionOrder = { rows: [], columns: [] };
  function opsReadVisualForm(type) {
    const name =
        document.querySelector("#ops-v-name").value.trim() || "Visual mới",
      base = { id: opsEditingVisual, name, type };
    if (type === "column")
      return {
        ...base,
        dimension: document.querySelector("#ops-v-dimension").value,
        metrics: [
          ...document.querySelectorAll(
            '[data-check-kind="column-metrics"]:checked',
          ),
        ]
          .map((x) => x.value)
          .slice(0, 2),
      };
    const tableMode = document.querySelector("#ops-v-table-mode").value;
    return {
      ...base,
      tableMode,
      rows: opsEditorDimensionOrder.rows.slice(0, 2),
      columns:
        tableMode === "matrix"
          ? opsEditorDimensionOrder.columns.slice(0, 2)
          : [],
      metrics: [
        ...document.querySelectorAll('[data-check-kind="metrics"]:checked'),
      ].map((x) => x.value),
    };
  }
  function opsCommitVisual(type, finish) {
    const visual = opsReadVisualForm(type);
    if (!visual.metrics.length) visual.metrics = ["Order lũy tiến"];
    if (type === "table" && !visual.rows.length) visual.rows = ["Dự án"];
    const index = opsSourceState.visuals.findIndex(
      (item) => item.id === visual.id,
    );
    if (index >= 0) opsSourceState.visuals[index] = visual;
    else opsSourceState.visuals.push(visual);
    opsRenderSource();
    if (finish) opsOpenVisualFolder(type);
  }
  function opsBindLiveVisual(type) {
    const body = document.querySelector("#ops-visual-body"),
      sync = () => opsCommitVisual(type, false);
    body.querySelectorAll("input,select").forEach((field) =>
      field.addEventListener("change", (event) => {
        if (
          type === "column" &&
          event.target.matches('[data-check-kind="column-metrics"]')
        ) {
          const checked = [
            ...body.querySelectorAll(
              '[data-check-kind="column-metrics"]:checked',
            ),
          ];
          if (checked.length > 2) {
            event.target.checked = false;
            return;
          }
          body.querySelector(".ops-config-hint").textContent =
            checked.length + "/2 metric đã chọn";
        }
        const kind = event.target.dataset.checkKind;
        if (type === "table" && (kind === "rows" || kind === "columns")) {
          const order = opsEditorDimensionOrder[kind],
            value = event.target.value;
          if (event.target.checked) {
            if (!order.includes(value)) order.push(value);
            if (order.length > 2) {
              order.pop();
              event.target.checked = false;
              return;
            }
          } else
            opsEditorDimensionOrder[kind] = order.filter(
              (item) => item !== value,
            );
          const hint = body.querySelector('[data-level-hint="' + kind + '"]');
          if (hint)
            hint.textContent =
              opsEditorDimensionOrder[kind]
                .map((item, index) => "Level " + (index + 1) + " · " + item)
                .join(" → ") || "Chưa chọn dimension";
        }
        sync();
      }),
    );
    document.querySelector("#ops-v-name").addEventListener("input", sync);
  }
  opsOpenVisualEditor = function (id, type) {
    const existing = id
      ? opsSourceState.visuals.find((item) => item.id === id)
      : null;
    opsEditingVisual = id || type + "-" + Date.now();
    const visual = existing || {
        name: type === "column" ? "Column chart mới" : "Table mới",
        type,
        dimension: "Dự án",
        metrics: ["Order lũy tiến"],
        tableMode: "table",
        rows: ["Dự án"],
        columns: ["Trạng thái"],
      },
      dimensions = opsConfigDimensions(),
      metrics = opsConfigMetrics(),
      body = document.querySelector("#ops-visual-body");
    document.querySelector("#ops-visual-title").textContent = existing
      ? "Chỉnh sửa visual"
      : "Thêm visual mới";
    if (type === "column") {
      const selected = (
        visual.metrics && visual.metrics.length
          ? visual.metrics
          : [visual.metric || "Order lũy tiến"]
      ).slice(0, 2);
      body.innerHTML =
        '<div class="ops-config-form"><button class="btn" id="ops-config-back" type="button">← Quay lại Column Charts</button><label>Tên visual<input id="ops-v-name" value="' +
        opsEscape(visual.name) +
        '"></label><label>Dimension<select id="ops-v-dimension">' +
        opsOptionList(dimensions, visual.dimension || "Dự án") +
        '</select></label><div class="ops-config-block"><strong>Metrics</strong><p class="ops-config-hint">' +
        selected.length +
        "/2 metric đã chọn · tối đa 2</p>" +
        opsCheckList(metrics, selected, "column-metrics") +
        '</div><div class="ops-drawer-actions">' +
        (existing
          ? '<button class="btn ops-danger" id="ops-delete-visual" type="button">Xóa visual</button>'
          : "<span></span>") +
        '<button class="btn primary" id="ops-save-visual" type="button">Lưu visual</button></div></div>';
    } else {
      body.innerHTML =
        '<div class="ops-config-form"><button class="btn" id="ops-config-back" type="button">← Quay lại Table Visuals</button><label>Tên visual<input id="ops-v-name" value="' +
        opsEscape(visual.name) +
        '"></label><label>Loại bảng<select id="ops-v-table-mode"><option value="table" ' +
        (visual.tableMode === "table" ? "selected" : "") +
        '>Table</option><option value="matrix" ' +
        (visual.tableMode === "matrix" ? "selected" : "") +
        '>Matrix Table</option></select></label><div class="ops-config-block"><strong>Row dimensions</strong>' +
        opsCheckList(dimensions, visual.rows || ["Dự án"], "rows") +
        '</div><div class="ops-config-block" id="ops-matrix-columns"><strong>Column dimensions · chỉ dùng cho Matrix</strong>' +
        opsCheckList(dimensions, visual.columns || [], "columns") +
        '</div><div class="ops-config-block"><strong>Metrics</strong>' +
        opsCheckList(metrics, visual.metrics || ["Order lũy tiến"], "metrics") +
        '</div><div class="ops-drawer-actions">' +
        (existing
          ? '<button class="btn ops-danger" id="ops-delete-visual" type="button">Xóa visual</button>'
          : "<span></span>") +
        '<button class="btn primary" id="ops-save-visual" type="button">Lưu visual</button></div></div>';
      const mode = document.querySelector("#ops-v-table-mode"),
        toggle = () =>
          (document.querySelector("#ops-matrix-columns").hidden =
            mode.value !== "matrix");
      mode.addEventListener("change", toggle);
      toggle();
    }
    document
      .querySelector("#ops-config-back")
      .addEventListener("click", () => opsOpenVisualFolder(type));
    document
      .querySelector("#ops-save-visual")
      .addEventListener("click", () => opsCommitVisual(type, true));
    const remove = document.querySelector("#ops-delete-visual");
    if (remove)
      remove.addEventListener("click", () => {
        opsSourceState.visuals = opsSourceState.visuals.filter(
          (item) => item.id !== id,
        );
        opsRenderSource();
        opsOpenVisualFolder(type);
      });
    opsBindLiveVisual(type);
  };
  const opsOpenVisualEditorConfigured = opsOpenVisualEditor;
  opsOpenVisualEditor = function (id, type) {
    let visual = id
      ? opsSourceState.visuals.find((item) => item.id === id)
      : null;
    if (visual) {
      visual.dimension = opsNormalizeDimension(visual.dimension);
      visual.rows = (visual.rows || []).map(opsNormalizeDimension);
      visual.columns = (visual.columns || []).map(opsNormalizeDimension);
      visual.metrics = (
        visual.metrics && visual.metrics.length
          ? visual.metrics
          : [visual.metric]
      )
        .filter(Boolean)
        .map(opsNormalizeMetric);
    }
    if (type === "table")
      opsEditorDimensionOrder = {
        rows: (visual?.rows || ["Dự án"]).slice(0, 2),
        columns: (visual?.columns || ["Trạng thái"]).slice(0, 2),
      };
    const result = opsOpenVisualEditorConfigured(id, type);
    if (type === "table") {
      ["rows", "columns"].forEach((kind) => {
        const grid = document
          .querySelector('[data-check-kind="' + kind + '"]')
          ?.closest(".ops-check-grid");
        if (grid) {
          const hint = document.createElement("p");
          hint.className = "ops-config-hint";
          hint.dataset.levelHint = kind;
          hint.textContent =
            opsEditorDimensionOrder[kind]
              .map((item, index) => "Level " + (index + 1) + " · " + item)
              .join(" → ") || "Chưa chọn dimension";
          grid.before(hint);
        }
      });
    }
    opsSetVisualDrawer(true);
    return result;
  };
  opsSaveVisual = function (type) {
    opsCommitVisual(type, true);
  };
  let opsProjectTrendProject = null;
  function opsProjectRows() {
    const projects = opsOrderOptions.projects,
      weights = [0.18, 0.16, 0.15, 0.13, 0.12, 0.1, 0.09, 0.07],
      risk = [0.46, 0.39, 0.34, 0.29, 0.25, 0.21, 0.17, 0.13],
      grand = opsOrderTrendData().reduce((sum, row) => sum + row.total, 0),
      time = opsOrderTimeContext();
    let used = 0;
    return projects.map((project, index) => {
      const total =
        index === projects.length - 1
          ? Math.max(1, grand - used)
          : Math.max(1, Math.round(grand * weights[index]));
      used += total;
      const current = Math.max(1, Math.round((total / time.count) * 1.08)),
        done = Math.round(total * (0.66 + (index % 3) * 0.025)),
        processing = Math.max(0, total - done),
        doneOn = Math.round(done * (0.78 + (index % 4) * 0.025)),
        doneLate = done - doneOn,
        processingLate = Math.round(processing * (0.35 + (index % 3) * 0.04)),
        processingOn = processing - processingLate,
        onNo = Math.round(processingOn * (0.08 + (index % 3) * 0.025)),
        onHas = processingOn - onNo,
        lateNo = Math.round(processingLate * risk[index]),
        lateHas = processingLate - lateNo;
      return {
        project,
        current,
        total,
        done,
        processing,
        doneOn,
        fulfill: done ? Math.round((doneOn / done) * 100) : 0,
        doneLate,
        processingOn,
        onHas,
        onNo,
        processingLate,
        lateHas,
        lateNo,
      };
    });
  }
  function opsProjectTable() {
    const selected = opsSourceState.orderFilters.project,
      rows = opsProjectRows().filter(
        (row) => selected === "all" || row.project === selected,
      ),
      time = opsOrderTimeContext(),
      heads = [
        "Dự án",
        time.currentLabel,
        "Order lũy tiến",
        "Order Done",
        "Order Processing",
        "Done On-Time",
        "%Fullfill On-Time",
        "Done Late",
        "Processing On-Time",
        "Processing On-Time Có UV",
        "Processing On-Time Không UV",
        "Processing Late Có UV",
        "Processing Late Không UV",
        "Trend",
      ];
    return (
      '<section class="ops-project-table-section"><div class="ops-project-table-head"><div><h2>Chi tiết theo dự án</h2><p>Đồng bộ với bộ lọc Tổng hợp Order · ' +
      time.range +
      '</p></div><span class="ops-trend-meta">' +
      rows.length +
      ' dự án</span></div><div class="ops-project-table-wrap"><table class="ops-project-table"><thead><tr>' +
      heads.map((head) => "<th>" + head + "</th>").join("") +
      "</tr></thead><tbody>" +
      rows
        .map(
          (row) =>
            "<tr><td>" +
            row.project +
            "</td>" +
            [
              row.current,
              row.total,
              row.done,
              row.processing,
              row.doneOn,
              row.fulfill + "%",
              row.doneLate,
              row.processingOn,
              row.onHas,
              row.onNo,
              row.lateHas,
              row.lateNo,
            ]
              .map(
                (value) =>
                  '<td class="num">' +
                  (typeof value === "number" ? opsFmt(value) : value) +
                  "</td>",
              )
              .join("") +
            '<td><button class="ops-project-trend-open" type="button" data-project-trend="' +
            row.project +
            '">Click Here</button></td></tr>',
        )
        .join("") +
      "</tbody></table></div></section>"
    );
  }
  function opsProjectTrendOrder() {
    return opsProjectRows()
      .slice()
      .sort(
        (a, b) => b.lateNo - a.lateNo || a.project.localeCompare(b.project),
      );
  }
  function opsProjectSeries(row) {
    const labels = opsOrderTrendLabels(),
      waves = [
        0.91, 1.04, 1.12, 0.98, 0.94, 1.08, 1.01, 0.89, 0.97, 1.06, 0.93, 1.03,
        0.96, 0.9,
      ],
      raw = labels.map((label, index) => ({
        label,
        w: waves[index % waves.length],
      })),
      sum = raw.reduce((value, item) => value + item.w, 0);
    let used = 0;
    return raw.map((item, index) => {
      const total =
        index === raw.length - 1
          ? Math.max(1, row.total - used)
          : Math.max(1, Math.round((row.total * item.w) / sum));
      used += total;
      const done = Math.round((total * row.done) / Math.max(1, row.total)),
        processing = total - done,
        on = Math.round((done * row.fulfill) / 100),
        late = done - on;
      return { label: item.label, total, done, processing, on, late };
    });
  }
  function opsProjectMiniChart(title, subtitle, series, type) {
    const max = Math.max(
        ...series.map((row) =>
          type === "status" ? row.total : row.on + row.late,
        ),
        1,
      ),
      bars = series
        .map((row) => {
          const total = type === "status" ? row.total : row.on + row.late,
            primary = type === "status" ? row.done : row.on,
            height = Math.max(18, Math.round((total / max) * 100)),
            share = Math.round((primary / Math.max(1, total)) * 100);
          return (
            '<div class="ops-project-mini-col"><b>' +
            opsFmt(total) +
            '</b><span class="ops-project-mini-stack" style="--h:' +
            height +
            "%;--a:" +
            share +
            '%"><i class="primary"></i><i class="secondary"></i></span><label>' +
            row.label +
            "</label></div>"
          );
        })
        .join("");
    return (
      '<section class="ops-project-drawer-chart"><h3>' +
      title +
      "</h3><p>" +
      subtitle +
      '</p><div class="ops-project-mini-plot">' +
      bars +
      "</div></section>"
    );
  }
  function opsProjectFlag(title, hasUv, noUv, late) {
    const first = late ? "Trễ 1–3 ngày" : "Còn 1–3 ngày",
      second = late ? "Trễ 4–7 ngày" : "Còn 4–7 ngày";
    return (
      '<section class="ops-project-flag"><h3>' +
      title +
      '</h3><div class="ops-project-flag-row"><span>Có UV</span><b>' +
      opsFmt(hasUv) +
      '</b></div><div class="ops-project-flag-row"><span>Không/Chưa có UV</span><b>' +
      opsFmt(noUv) +
      '</b></div><div class="ops-project-flag-row"><span>' +
      first +
      "</span><b>" +
      Math.max(1, Math.round(noUv * 0.42)) +
      '</b></div><div class="ops-project-flag-row"><span>' +
      second +
      "</span><b>" +
      Math.max(1, Math.round(noUv * 0.31)) +
      '</b></div><div class="ops-project-flag-row"><span>' +
      (late ? "Trễ >7 ngày" : "Còn >7 ngày") +
      "</span><b>" +
      Math.max(
        0,
        noUv -
          Math.max(1, Math.round(noUv * 0.42)) -
          Math.max(1, Math.round(noUv * 0.31)),
      ) +
      "</b></div></section>"
    );
  }
  function opsProjectDrawerContent(project) {
    const ordered = opsProjectTrendOrder(),
      row = ordered.find((item) => item.project === project) || ordered[0],
      series = opsProjectSeries(row),
      options = ordered
        .map(
          (item) =>
            '<option value="' +
            item.project +
            '" ' +
            (item.project === row.project ? "selected" : "") +
            ">" +
            item.project +
            " · " +
            item.lateNo +
            " Processing Late chưa UV</option>",
        )
        .join("");
    return (
      '<div class="filter-drawer-head"><div><h2>Trend dự án · ' +
      row.project +
      '</h2><p>Xếp thứ tự theo Processing Late Không/Chưa có UV.</p></div><button class="filter-close" data-project-trend-close type="button">×</button></div><div class="ops-project-trend-controls"><button type="button" data-project-trend-prev aria-label="Dự án trước">‹</button><label>Dự án<select data-project-trend-select>' +
      options +
      '</select></label><button type="button" data-project-trend-next aria-label="Dự án tiếp theo">›</button></div>' +
      opsProjectMiniChart(
        "Total Order theo trạng thái",
        "Done và Processing theo " + opsOrderTimeContext().periodName + ".",
        series,
        "status",
      ) +
      opsProjectMiniChart(
        "OTIF theo thời gian",
        "Done On-Time và Done Late theo cùng mốc thời gian.",
        series,
        "otif",
      ) +
      '<div class="ops-project-flag-grid">' +
      opsProjectFlag("Processing On-Time", row.onHas, row.onNo, false) +
      opsProjectFlag("Processing Late", row.lateHas, row.lateNo, true) +
      '</div><div class="ops-project-trend-actions"><button class="btn primary" data-project-trend-details type="button">Details · Deadline & Cảnh báo</button></div>'
    );
  }
  function opsOpenProjectTrend(project) {
    opsProjectTrendProject = project;
    const drawer = document.querySelector("#ops-project-trend-drawer");
    drawer.innerHTML = opsProjectDrawerContent(project);
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.querySelector("#ops-project-trend-backdrop").classList.add("open");
  }
  function opsCloseProjectTrend() {
    const drawer = document.querySelector("#ops-project-trend-drawer");
    drawer?.classList.remove("open");
    drawer?.setAttribute("aria-hidden", "true");
    document
      .querySelector("#ops-project-trend-backdrop")
      ?.classList.remove("open");
  }
  function opsMoveProjectTrend(step) {
    const rows = opsProjectTrendOrder(),
      index = Math.max(
        0,
        rows.findIndex((row) => row.project === opsProjectTrendProject),
      ),
      next = (index + step + rows.length) % rows.length;
    opsOpenProjectTrend(rows[next].project);
  }
  function opsSetupProjectTrendDrawer() {
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div class="ops-project-trend-backdrop" id="ops-project-trend-backdrop"></div><aside class="ops-project-trend-drawer" id="ops-project-trend-drawer" aria-label="Trend dự án" aria-hidden="true"></aside>',
    );
    document.addEventListener("click", (event) => {
      const open = event.target.closest("[data-project-trend]");
      if (open) opsOpenProjectTrend(open.dataset.projectTrend);
      if (event.target.closest("[data-project-trend-close]"))
        opsCloseProjectTrend();
      if (event.target.closest("[data-project-trend-prev]"))
        opsMoveProjectTrend(-1);
      if (event.target.closest("[data-project-trend-next]"))
        opsMoveProjectTrend(1);
      if (event.target.closest("[data-project-trend-details]")) {
        opsCloseProjectTrend();
        opsActivateSection("ops-deadline");
      }
    });
    document.addEventListener("change", (event) => {
      if (event.target.matches("[data-project-trend-select]"))
        opsOpenProjectTrend(event.target.value);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") opsCloseProjectTrend();
    });
    document
      .querySelector("#ops-project-trend-backdrop")
      .addEventListener("click", opsCloseProjectTrend);
  }
  function opsSetupVisualConfigDelegation() {
    document.addEventListener("click", (event) => {
      const config = event.target.closest("[data-visual-config]"),
        edit = event.target.closest("[data-visual-edit]");
      if (config) {
        event.preventDefault();
        opsOpenVisualFolder(config.dataset.visualConfig);
      } else if (edit) {
        event.preventDefault();
        const visual = opsSourceState.visuals.find(
          (item) => item.id === edit.dataset.visualEdit,
        );
        if (visual) opsOpenVisualEditor(visual.id, visual.type);
      }
    });
  }
  function opsSetupOrderTrendMode() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-order-chart-mode]");
      if (!button) return;
      opsSourceState.orderChartMode = button.dataset.orderChartMode;
      opsRenderSource();
    });
    window.addEventListener(
      "resize",
      () => requestAnimationFrame(opsDrawOrderTrendLines),
      { passive: true },
    );
  }
  const opsRenderSourceBeforeTrendLines = opsRenderSource;
  opsRenderSource = function () {
    opsRenderSourceBeforeTrendLines();
    requestAnimationFrame(opsDrawOrderTrendLines);
  };
  function opsBriefTable(headers, rows, classes = "") {
    return (
      '<div class="table-wrap ops-brief-table ' +
      classes +
      '"><table><thead><tr>' +
      headers.map((x) => "<th>" + x + "</th>").join("") +
      "</tr></thead><tbody>" +
      rows
        .map(
          (row) =>
            "<tr>" +
            row
              .map(
                (value, index) =>
                  '<td class="' + (index ? "num" : "") + '">' + value + "</td>",
              )
              .join("") +
            "</tr>",
        )
        .join("") +
      "</tbody></table></div>"
    );
  }
  function opsBriefKpiMatrix() {
    const months = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"],
      projects = ["LG", "Panasonic", "Toshiba", "Marico"],
      scores = [
        [96, 93, 91, 88, 86, 82, 79, 76],
        [92, 94, 89, 91, 87, 85, 83, 81],
        [98, 96, 95, 93, 90, 88, 86, 84],
        [89, 91, 88, 85, 82, 80, 78, 75],
      ];
    return (
      '<article class="ops-source-card full ops-brief-card"><div class="ops-brief-title"><div><h3>KPI theo chu kỳ</h3><p>Chỉ sử dụng chu kỳ KPI · Gửi CV đúng hạn và chất lượng CV Pass BH theo tháng.</p></div><span>Chu kỳ KPI</span></div><div class="ops-kpi-matrix"><table><thead><tr><th rowspan="2">Dự án</th><th colspan="8">% KPI theo tháng</th><th rowspan="2">Streak rớt</th></tr><tr>' +
      months.map((x) => "<th>" + x + "</th>").join("") +
      "</tr></thead><tbody>" +
      projects
        .map(
          (project, i) =>
            "<tr><td><b>" +
            project +
            "</b><small>Gửi CV / Pass BH</small></td>" +
            scores[i]
              .map(
                (value) =>
                  '<td><span class="ops-kpi-cell ' +
                  (value < 85 ? "risk" : value < 90 ? "watch" : "") +
                  '">' +
                  value +
                  "%</span></td>",
              )
              .join("") +
            '<td><strong class="ops-streak ' +
            (i > 1 ? "watch" : "risk") +
            '">' +
            (i + 2) +
            " tháng</strong></td></tr>",
        )
        .join("") +
      "</tbody></table></div></article>"
    );
  }
  function opsBriefQuickSummary() {
    const d = opsData();
    return (
      '<div class="ops-brief-quick">' +
      [
        [
          "Order Processing",
          opsFmt(Math.max(0, d.order - d.done - d.close)),
          "ops-orders",
        ],
        ["Processing Late", opsFmt(d.late), "ops-deadline"],
        ["Late chưa có UV", opsFmt(d.noCandidate), "ops-deadline"],
        ["Ứng viên đã gửi", opsFmt(d.sent), "ops-pipeline"],
        ["Pass bảo hành", Math.round(d.onboard * 0.81), "ops-pipeline"],
        ["Năng suất / Recruiter", "18,6", "ops-outcome"],
      ]
        .map(
          (item) =>
            "<article><span>" +
            item[0] +
            "</span><strong>" +
            item[1] +
            '</strong><button type="button" data-ops-target="' +
            item[2] +
            '">Chi tiết →</button></article>',
        )
        .join("") +
      "</div>"
    );
  }
  opsRenderSummary = function () {
    return (
      opsSectionHead(
        "Tổng hợp vận hành",
        "KPI chu kỳ và các tín hiệu vận hành quan trọng dành cho tất cả user.",
      ) +
      opsBriefKpiMatrix() +
      '<div class="ops-brief-title ops-brief-summary-title"><div><h3>Tổng hợp nhanh</h3><p>Các tín hiệu chính từ những section phía sau.</p></div></div>' +
      opsBriefQuickSummary()
    );
  };
  function opsDeadlineCards() {
    const labels = [
        "06/08",
        "07/08",
        "08/08",
        "09/08",
        "10/08",
        "11/08",
        "12/08",
      ],
      values = [38, 42, 31, 27, 24, 19, 16];
    return (
      '<div class="ops-deadline-cards"><section><header><b>Processing On-Time</b><span>Còn deadline</span></header><div class="ops-deadline-periods">' +
      labels
        .map(
          (label, i) =>
            "<article><small>" +
            label +
            "</small><strong>" +
            values[i] +
            "</strong><em>Có UV " +
            Math.round(values[i] * 0.76) +
            "</em><em>Chưa UV " +
            Math.round(values[i] * 0.16) +
            "</em><em>Tuyển lại " +
            Math.round(values[i] * 0.08) +
            "</em></article>",
        )
        .join("") +
      '</div></section><section class="late"><header><b>Processing Late</b><span>Cần can thiệp</span></header><article class="ops-late-total"><strong>95</strong><div><span>Có UV <b>54</b></span><span>Chưa UV <b>28</b></span><span>Tuyển lại <b>13</b></span></div></article></section></div>'
    );
  }
  function opsDeadlineMatrix() {
    const progress = [
      "Chờ duyệt",
      "Scan CV",
      "Phỏng vấn vòng 2",
      "Chờ KQ vòng 2",
      "Phỏng vấn vòng 3",
      "Onboard",
      "Học việc",
    ];
    return opsBriefTable(
      [
        "Tiến độ",
        "Còn 1 kỳ",
        "Còn 2 kỳ",
        "Còn 3 kỳ",
        "Còn 4–7 kỳ",
        "Late · Có UV",
      ],
      progress.map((name, i) => [
        name,
        8 + i,
        12 - i,
        10 + (i % 3),
        18 - i,
        Math.max(2, 11 - i),
      ]),
      "deadline-matrix",
    );
  }
  function opsDeadlinePlan() {
    const rows = [
      [
        "LG",
        "LG-MER-042",
        "HCMC",
        "MER",
        "AEON Tân Phú",
        "28/07/2026",
        "Late",
        "Chưa có ứng viên",
        "",
        "Nguồn ứng viên thấp",
        "Mở rộng CTV",
        "06/08/2026",
      ],
      [
        "Panasonic",
        "PNS-SR-118",
        "Hà Nội",
        "SR",
        "Cầu Giấy",
        "29/07/2026",
        "On-Time",
        "Tuyển lại",
        "4",
        "UV rút trước PV",
        "Bổ sung shortlist",
        "07/08/2026",
      ],
      [
        "Coke",
        "CK-SS-071",
        "Cần Thơ",
        "SS",
        "Ninh Kiều",
        "25/07/2026",
        "Late",
        "Tuyển lại",
        "6",
        "Không đạt vòng 2",
        "Điều chỉnh tiêu chí",
        "06/08/2026",
      ],
    ];
    return (
      '<div class="ops-plan-head"><div class="ops-plan-kpi"><span>On-Time chưa UV / tuyển lại</span><b>13</b></div><div class="ops-plan-kpi risk"><span>Late chưa UV / tuyển lại</span><b>41</b></div><div class="ops-tile"><button class="active">All</button><button>Chưa có ứng viên</button><button>Tuyển lại</button></div></div>' +
      opsBriefTable(
        [
          "Dự án",
          "Jobcode",
          "Thành phố",
          "Vị trí",
          "Store",
          "Ngày tạo",
          "OTIF",
          "Tình trạng",
          "UV đã gửi",
          "Khó khăn",
          "Đề xuất",
          "Plan gửi hồ sơ",
        ],
        rows,
        "plan-table",
      )
    );
  }
  opsRenderDeadline = function () {
    return (
      opsSectionHead(
        "Deadline và cảnh báo",
        "Order cận deadline, vị trí đang pending và kế hoạch xử lý các case chưa có ứng viên.",
      ) +
      opsDeadlineCards() +
      '<article class="ops-source-card full ops-brief-card"><div class="ops-brief-title"><div><h3>Order có ứng viên theo tiến độ</h3><p>Matrix thay đổi theo Period; dimension bổ sung có thể cấu hình riêng.</p></div><button class="btn">Chọn dimension</button></div>' +
      opsDeadlineMatrix() +
      '</article><article class="ops-source-card full ops-brief-card"><div class="ops-brief-title"><div><h3>Plan gửi ứng viên</h3><p>Danh sách Jobcode chưa có ứng viên hoặc đang tuyển lại.</p></div></div>' +
      opsDeadlinePlan() +
      "</article>"
    );
  };
  function opsCandidateTrend() {
    const values = [74, 88, 81, 103, 96, 112, 125, 118],
      max = Math.max(...values);
    return (
      '<div class="ops-candidate-trend">' +
      values
        .map(
          (value, i) =>
            "<div><b>" +
            value +
            '</b><i style="height:' +
            Math.round((value / max) * 100) +
            '%"></i><span>T' +
            (i + 1) +
            "</span></div>",
        )
        .join("") +
      "</div>"
    );
  }
  function opsCandidateFunnel() {
    const stages = [
      ["All Data", 3180, 100],
      ["Approach", 2144, 67],
      ["Ứng viên gửi", 874, 41],
      ["Phỏng vấn", 496, 57],
      ["Onboard", 238, 48],
      ["Pass BH", 193, 81],
    ];
    return (
      '<div class="ops-candidate-funnel">' +
      stages
        .map(
          (stage, i) =>
            '<button type="button" style="--funnel:' +
            stage[2] +
            '%"><span>' +
            stage[0] +
            "</span><b>" +
            opsFmt(stage[1]) +
            "</b><small>" +
            (i ? "Chuyển đổi " + stage[2] + "%" : "100% đầu vào") +
            "</small></button>",
        )
        .join("") +
      "</div>"
    );
  }
  opsRenderPipeline = function () {
    const matrixRows = [
      ["LG", "Chờ duyệt", 44, 51, 48, 59],
      ["LG", "Scan CV", 31, 37, 42, 39],
      ["Panasonic", "Phỏng vấn vòng 2", 28, 34, 31, 38],
      ["Toshiba", "Onboard", 17, 21, 19, 24],
    ];
    return (
      opsSectionHead(
        "Tình trạng và chất lượng ứng viên",
        "Số lượng ứng viên, nơi tập trung volume và chất lượng xuyên suốt pipeline.",
      ) +
      '<div class="ops-candidate-overview"><article class="ops-source-card"><div class="ops-brief-title"><div><h3>Ứng viên đã gửi</h3><p>Theo bộ lọc thời gian hiện tại.</p></div><strong>1.673</strong></div>' +
      opsCandidateTrend() +
      '</article><article class="ops-source-card"><div class="ops-brief-title"><div><h3>Theo dự án</h3><p>Pass bảo hành và tỷ lệ Pass BH.</p></div></div>' +
      opsBriefTable(
        ["Dự án", "UV đã gửi", "Pass BH", "% Pass BH"],
        [
          ["LG", 412, 97, "24%"],
          ["Panasonic", 336, 81, "24%"],
          ["Toshiba", 278, 63, "23%"],
          ["Coke", 241, 58, "24%"],
        ],
      ) +
      '</article></div><article class="ops-source-card full ops-brief-card"><div class="ops-brief-title"><div><h3>Ứng viên theo dự án và tiến độ</h3><p>Hai level row · cột thay đổi theo Daily / Weekly / Monthly.</p></div><button class="btn">Lọc tiến độ</button></div>' +
      opsBriefTable(
        ["Dự án", "Tiến độ", "Kỳ 1", "Kỳ 2", "Kỳ 3", "Kỳ 4"],
        matrixRows,
      ) +
      '</article><article class="ops-source-card full ops-brief-card"><div class="ops-brief-title"><div><h3>Phễu và chất lượng ứng viên</h3><p>Click từng phase để xem kết quả và nguyên nhân rơi khỏi phễu.</p></div><div class="ops-pass-bh"><span>Pass BH từ Approach</span><b>9%</b></div></div>' +
      opsCandidateFunnel() +
      "</article>" +
      opsBriefTable(
        [
          "Nguồn",
          "Supervisor",
          "Recruiter / CTV",
          "Data",
          "Approach",
          "Ứng viên gửi",
          "AVG UV/ngày",
          "Pass BH",
          "Đánh giá",
        ],
        [
          ["Facebook", "Trần Linh", "Lê Vy", 840, 612, 236, "11,2", 58, "Tốt"],
          ["Referral", "Đỗ Hải", "Mai Chi", 624, 481, 172, "8,2", 46, "Tốt"],
          [
            "Job site",
            "Ngô Mai",
            "Tuấn Anh",
            916,
            531,
            188,
            "9,0",
            39,
            "Xem xét",
          ],
          [
            "CTV Network",
            "Trần Linh",
            "Hoàng Nam",
            800,
            520,
            278,
            "13,2",
            50,
            "Xem xét",
          ],
        ],
        "candidate-quality",
      )
    );
  };
  opsRenderOutcome = function () {
    return (
      opsSectionHead(
        "Năng suất",
        "Khối lượng xử lý, tốc độ và chất lượng thực thi theo từng cấp nhân sự.",
      ) +
      opsKpis([
        ["Order / Recruiter", "18,6", "↑ 8% so chu kỳ trước"],
        ["UV gửi / ngày", "9,4", "↑ 6% so chu kỳ trước"],
        ["Tỷ lệ đúng hạn", "86%", "↑ 3 điểm %"],
        ["AVG Time to Fill", "21 ngày", "▼ 2 ngày"],
        ["Pass BH / Recruiter", "4,8", "↑ 5%"],
        ["Order cần hỗ trợ", "27", "▼ 9%"],
      ]) +
      '<div class="ops-source-grid" style="--ops-visual-cols:2">' +
      opsCard(
        "Năng suất theo Recruiter",
        opsBars("sent"),
        "Ứng viên gửi và Order phụ trách theo data scope",
      ) +
      opsCard(
        "Chất lượng thực thi",
        opsBriefTable(
          ["Nhân sự", "Order", "Done", "UV gửi", "Pass BH", "Đánh giá"],
          [
            ["Lê Vy", 24, 19, 168, 13, "Tốt"],
            ["Hoàng Nam", 21, 15, 142, 10, "Tốt"],
            ["Mai Chi", 18, 12, 109, 7, "Xem xét"],
            ["Tuấn Anh", 16, 9, 87, 5, "Cần hỗ trợ"],
          ],
        ),
        "Đánh giá dựa trên volume, chuyển đổi và đúng hạn",
      ) +
      "</div>"
    );
  };
  const opsBriefScopeRows = [
    {
      project: "LG",
      region: "HCMC",
      city: "TP. Hồ Chí Minh",
      position: "MER",
      type: "Tuyển mới",
      otif: "Late",
      progress: "Chưa có ứng viên",
      am: "Nguyễn Minh",
      sup: "Trần Linh",
      tl: "Phạm An",
      person: "Lê Vy",
      kind: "Recruiter",
    },
    {
      project: "Panasonic",
      region: "North",
      city: "Hà Nội",
      position: "SR",
      type: "Tuyển thay thế",
      otif: "On-Time",
      progress: "Tuyển lại",
      am: "Nguyễn Minh",
      sup: "Trần Linh",
      tl: "Phạm An",
      person: "Hoàng Nam",
      kind: "Recruiter",
    },
    {
      project: "Toshiba",
      region: "North",
      city: "Hải Phòng",
      position: "SR Tempo",
      type: "Tuyển mới",
      otif: "On-Time",
      progress: "Chờ duyệt",
      am: "Nguyễn Minh",
      sup: "Đỗ Hải",
      tl: "Võ Thư",
      person: "Mai Chi",
      kind: "Recruiter",
    },
    {
      project: "Marico",
      region: "Central",
      city: "Đà Nẵng",
      position: "SS",
      type: "Tuyển thay thế",
      otif: "Late",
      progress: "Scan CV",
      am: "Nguyễn Minh",
      sup: "Đỗ Hải",
      tl: "Võ Thư",
      person: "Tuấn Anh",
      kind: "Recruiter",
    },
    {
      project: "Honor",
      region: "HCMC",
      city: "Bình Dương",
      position: "Nhân viên tiếp thị",
      type: "Tuyển mới",
      otif: "On-Time",
      progress: "Phỏng vấn vòng 2",
      am: "Trần Hạ",
      sup: "Ngô Mai",
      tl: "Lâm Tú",
      person: "Trúc Linh",
      kind: "Recruiter",
    },
    {
      project: "Aqua",
      region: "MKD",
      city: "Cần Thơ",
      position: "MER",
      type: "Tuyển thay thế",
      otif: "Late",
      progress: "Chờ kết quả phỏng vấn vòng 2",
      am: "Trần Hạ",
      sup: "Ngô Mai",
      tl: "Lâm Tú",
      person: "CTV Minh Khang",
      kind: "CTV",
    },
    {
      project: "Vinamilk",
      region: "Central",
      city: "Huế",
      position: "SR",
      type: "Tuyển mới",
      otif: "On-Time",
      progress: "Phỏng vấn vòng 3",
      am: "Trần Hạ",
      sup: "Trần Linh",
      tl: "Phạm An",
      person: "CTV Hải Yến",
      kind: "CTV",
    },
    {
      project: "Coke",
      region: "MKD",
      city: "An Giang",
      position: "SS",
      type: "Tuyển thay thế",
      otif: "Late",
      progress: "Chờ kết quả phỏng vấn vòng 3",
      am: "Trần Hạ",
      sup: "Đỗ Hải",
      tl: "Võ Thư",
      person: "CTV Hoàng Anh",
      kind: "CTV",
    },
    {
      project: "LG",
      region: "North",
      city: "Bắc Ninh",
      position: "SR Tempo",
      type: "Tuyển mới",
      otif: "On-Time",
      progress: "Onboard",
      am: "Nguyễn Minh",
      sup: "Trần Linh",
      tl: "Phạm An",
      person: "Ngọc Hà",
      kind: "Recruiter",
    },
    {
      project: "Panasonic",
      region: "HCMC",
      city: "Đồng Nai",
      position: "Nhân viên tiếp thị",
      type: "Tuyển mới",
      otif: "Late",
      progress: "Học việc",
      am: "Nguyễn Minh",
      sup: "Đỗ Hải",
      tl: "Võ Thư",
      person: "CTV Gia Hân",
      kind: "CTV",
    },
    {
      project: "Vinamilk",
      region: "MKD",
      city: "Cần Thơ",
      position: "MER",
      type: "Tuyển thay thế",
      otif: "On-Time",
      progress: "Scan CV",
      am: "Trần Hạ",
      sup: "Ngô Mai",
      tl: "Lâm Tú",
      person: "Khánh Ly",
      kind: "Recruiter",
    },
    {
      project: "Coke",
      region: "HCMC",
      city: "TP. Hồ Chí Minh",
      position: "SR",
      type: "Tuyển mới",
      otif: "Late",
      progress: "Tuyển lại",
      am: "Trần Hạ",
      sup: "Ngô Mai",
      tl: "Lâm Tú",
      person: "CTV Quốc Bảo",
      kind: "CTV",
    },
  ];
  opsBriefKpiMatrix = function () {
    const months = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"],
      projects = opsOrderOptions.projects;
    return (
      '<article class="ops-source-card full ops-brief-card"><div class="ops-brief-title"><div><h3>KPI theo chu kỳ</h3><p>Gửi CV đúng hạn và chất lượng CV Pass BH theo tháng · toàn bộ dự án trong data scope.</p></div><span>Chu kỳ KPI</span></div><div class="ops-kpi-matrix"><table><thead><tr><th rowspan="2">Dự án</th><th colspan="8">% KPI theo tháng</th><th rowspan="2">Streak rớt</th></tr><tr>' +
      months.map((x) => "<th>" + x + "</th>").join("") +
      "</tr></thead><tbody>" +
      projects
        .map((project, i) => {
          const scores = months.map((_, m) =>
            Math.max(68, 98 - i * 2 - m * 2 + (m % 3) * 3),
          );
          let streak = 0;
          for (let x = scores.length - 1; x >= 0 && scores[x] < 90; x--)
            streak++;
          return (
            "<tr><td><b>" +
            project +
            "</b><small>Gửi CV / Pass BH</small></td>" +
            scores
              .map(
                (value) =>
                  '<td><span class="ops-kpi-cell ' +
                  (value < 85 ? "risk" : value < 90 ? "watch" : "") +
                  '">' +
                  value +
                  "%</span></td>",
              )
              .join("") +
            '<td><strong class="ops-streak ' +
            (streak > 2 ? "risk" : "watch") +
            '">' +
            streak +
            " tháng</strong></td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div></article>"
    );
  };
  opsDeadlineMatrix = function () {
    const progress = opsOrderOptions.progress.filter(
      (x) => x !== "Đạt học việc",
    );
    return opsBriefTable(
      [
        "Tiến độ",
        "Còn 1 kỳ",
        "Còn 2 kỳ",
        "Còn 3 kỳ",
        "Còn 4 kỳ",
        "Còn 5 kỳ",
        "Còn 6 kỳ",
        "Còn 7 kỳ",
        "≤14 kỳ",
        ">14 kỳ",
        "Late · Có UV",
      ],
      progress.map((name, i) => [
        name,
        8 + i,
        12 + (i % 4),
        10 + (i % 3),
        9 + (i % 5),
        8 + (i % 2),
        7 + (i % 4),
        6 + (i % 3),
        14 + i,
        5 + (i % 4),
        Math.max(2, 13 - i),
      ]),
      "deadline-matrix",
    );
  };
  opsDeadlinePlan = function () {
    const difficulties = [
        "Nguồn ứng viên thấp",
        "Ứng viên rút trước PV",
        "Không đạt vòng 2",
        "Yêu cầu lương cao",
        "Địa điểm xa",
        "Ca làm chưa phù hợp",
      ],
      actions = [
        "Mở rộng CTV",
        "Bổ sung shortlist",
        "Điều chỉnh tiêu chí",
        "Mở thêm nguồn",
        "Chạy referral",
        "Review JD với client",
      ];
    const rows = opsBriefScopeRows.map((r, i) => [
      r.project,
      r.project.slice(0, 3).toUpperCase() +
        "-" +
        r.position.replaceAll(" ", "").slice(0, 3).toUpperCase() +
        "-" +
        String(42 + i).padStart(3, "0"),
      r.region,
      r.city,
      r.position,
      "Store " + (i + 1),
      "2" + (i % 9) + "/07/2026",
      r.otif,
      i % 3 ? "Tuyển lại" : "Chưa có ứng viên",
      i % 3 ? 2 + i : "",
      difficulties[i % difficulties.length],
      actions[i % actions.length],
      String(6 + (i % 8)).padStart(2, "0") + "/08/2026",
      r.person,
    ]);
    return (
      '<div class="ops-plan-head"><div class="ops-plan-kpi"><span>On-Time chưa UV / tuyển lại</span><b>13</b></div><div class="ops-plan-kpi risk"><span>Late chưa UV / tuyển lại</span><b>41</b></div><div class="ops-tile"><button class="active">All</button><button>Chưa có ứng viên</button><button>Tuyển lại</button></div></div>' +
      opsBriefTable(
        [
          "Dự án",
          "Jobcode",
          "Khu vực",
          "Thành phố",
          "Vị trí",
          "Store",
          "Ngày tạo",
          "OTIF",
          "Tình trạng",
          "UV đã gửi",
          "Khó khăn",
          "Đề xuất",
          "Plan gửi hồ sơ",
          "Recruiter/CTV",
        ],
        rows,
        "plan-table",
      )
    );
  };
  opsRenderPipeline = function () {
    const projects = opsOrderOptions.projects,
      progress = opsOrderOptions.progress.filter((x) => x !== "Đạt học việc"),
      matrixRows = opsBriefScopeRows.map((r, i) => [
        r.project,
        r.region,
        r.city,
        r.position,
        r.type,
        r.progress,
        31 + i * 3,
        37 + (i % 5) * 4,
        42 + (i % 4) * 3,
        39 + (i % 6) * 2,
      ]),
      projectRows = projects.map((p, i) => [
        p,
        412 - i * 25,
        97 - i * 5,
        24 - (i % 3) + "%",
      ]),
      qualityRows = opsBriefScopeRows.map((r, i) => [
        ["Facebook", "Referral", "Job site", "CTV Network"][i % 4],
        r.sup,
        r.tl,
        r.person,
        r.kind,
        840 - i * 31,
        612 - i * 24,
        236 - i * 9,
        (11.2 - i * 0.35).toFixed(1).replace(".", ","),
        Math.max(18, 58 - i * 3),
        i < 5 ? "Tốt" : i < 9 ? "Xem xét" : "Cần hỗ trợ",
      ]);
    return (
      opsSectionHead(
        "Tình trạng và chất lượng ứng viên",
        "Số lượng ứng viên theo toàn bộ dimension nghiệp vụ và chất lượng xuyên suốt pipeline.",
      ) +
      '<div class="ops-candidate-overview"><article class="ops-source-card"><div class="ops-brief-title"><div><h3>Ứng viên đã gửi</h3><p>Theo bộ lọc thời gian hiện tại.</p></div><strong>1.673</strong></div>' +
      opsCandidateTrend() +
      '</article><article class="ops-source-card"><div class="ops-brief-title"><div><h3>Theo dự án</h3><p>Toàn bộ dự án · Pass bảo hành và tỷ lệ Pass BH.</p></div></div>' +
      opsBriefTable(
        ["Dự án", "UV đã gửi", "Pass BH", "% Pass BH"],
        projectRows,
      ) +
      '</article></div><article class="ops-source-card full ops-brief-card"><div class="ops-brief-title"><div><h3>Ứng viên theo dimension chi tiết</h3><p>Dự án → Khu vực → Thành phố → Vị trí → Loại tuyển → Tiến độ; cột đổi theo Period.</p></div><button class="btn">Chọn dimension</button></div>' +
      opsBriefTable(
        [
          "Dự án",
          "Khu vực",
          "Thành phố",
          "Vị trí",
          "Loại tuyển",
          "Tiến độ",
          "Kỳ 1",
          "Kỳ 2",
          "Kỳ 3",
          "Kỳ 4",
        ],
        matrixRows,
      ) +
      '</article><article class="ops-source-card full ops-brief-card"><div class="ops-brief-title"><div><h3>Phễu và chất lượng ứng viên</h3><p>Click từng phase để xem kết quả và nguyên nhân rơi khỏi phễu.</p></div><div class="ops-pass-bh"><span>Pass BH từ Approach</span><b>9%</b></div></div>' +
      opsCandidateFunnel() +
      "</article>" +
      opsBriefTable(
        [
          "Nguồn",
          "Supervisor",
          "Team Leader",
          "Recruiter / CTV",
          "Loại",
          "Data",
          "Approach",
          "Ứng viên gửi",
          "AVG UV/ngày",
          "Pass BH",
          "Đánh giá",
        ],
        qualityRows,
        "candidate-quality",
      )
    );
  };
  opsRenderOutcome = function () {
    const rows = opsBriefScopeRows.map((r, i) => [
      r.am,
      r.sup,
      r.tl,
      r.person,
      r.kind,
      r.project,
      r.region,
      16 + (i % 9),
      9 + (i % 8),
      87 + i * 6,
      Math.max(3, 12 - (i % 7)),
      (7.4 + i * 0.45).toFixed(1).replace(".", ","),
      80 + (i % 6) * 3 + "%",
      18 + (i % 7),
      i < 5 ? "Tốt" : i < 9 ? "Xem xét" : "Cần hỗ trợ",
    ]);
    return (
      opsSectionHead(
        "Năng suất",
        "Drill-down theo AM → Supervisor → Team Leader → từng Recruiter/CTV, đồng bộ data scope của bộ lọc.",
      ) +
      opsKpis([
        ["Order / Recruiter", "18,6", "↑ 8% so chu kỳ trước"],
        ["UV gửi / ngày", "9,4", "↑ 6% so chu kỳ trước"],
        ["Tỷ lệ đúng hạn", "86%", "↑ 3 điểm %"],
        ["AVG Time to Fill", "21 ngày", "▼ 2 ngày"],
        ["Pass BH / Recruiter", "4,8", "↑ 5%"],
        ["Order cần hỗ trợ", "27", "▼ 9%"],
      ]) +
      '<article class="ops-source-card full ops-brief-card"><div class="ops-brief-title"><div><h3>Năng suất theo hệ thống nhân sự</h3><p>Hierarchy: Account Manager → Supervisor → Team Leader → Recruiter/CTV.</p></div><div class="ops-tile"><button class="active">All</button><button>Recruiter</button><button>CTV</button></div></div>' +
      opsBriefTable(
        [
          "AM",
          "Supervisor",
          "Team Leader",
          "Recruiter / CTV",
          "Loại",
          "Dự án",
          "Khu vực",
          "Order",
          "Done",
          "UV gửi",
          "Pass BH",
          "AVG UV/ngày",
          "Đúng hạn",
          "Time to Fill",
          "Đánh giá",
        ],
        rows,
        "productivity-table",
      ) +
      "</article>"
    );
  };
  let opsBriefCandidateMode = "all",
    opsBriefPeopleMode = "all";
  function opsBriefFilteredRows() {
    const f = opsNormalizeOrderTime();
    return opsBriefScopeRows.filter(
      (row) =>
        (f.project === "all" || row.project === f.project) &&
        (f.region === "all" || row.region === f.region) &&
        (f.city === "all" || row.city === f.city) &&
        (f.position === "all" || row.position === f.position) &&
        (f.hireType === "all" || row.type === f.hireType) &&
        (f.otif === "all" || row.otif === f.otif) &&
        (f.progress === "all" || row.progress === f.progress) &&
        (f.am === "all" || row.am === f.am) &&
        (f.supervisor === "all" || row.sup === f.supervisor) &&
        (f.teamLead === "all" || row.tl === f.teamLead) &&
        (f.recruiter === "all" || row.person === f.recruiter),
    );
  }
  function opsBriefEmptyRow(cols) {
    return (
      '<tr><td colspan="' +
      cols +
      '" class="ops-empty-filter">Không có dữ liệu phù hợp với bộ lọc đang chọn.</td></tr>'
    );
  }
  const opsBriefTableBeforeFilter = opsBriefTable;
  opsBriefTable = function (headers, rows, classes = "") {
    return rows.length
      ? opsBriefTableBeforeFilter(headers, rows, classes)
      : '<div class="table-wrap ops-brief-table ' +
          classes +
          '"><table><thead><tr>' +
          headers.map((x) => "<th>" + x + "</th>").join("") +
          "</tr></thead><tbody>" +
          opsBriefEmptyRow(headers.length) +
          "</tbody></table></div>";
  };
  opsDeadlinePlan = function () {
    const difficulties = [
        "Nguồn ứng viên thấp",
        "Ứng viên rút trước PV",
        "Không đạt vòng 2",
        "Yêu cầu lương cao",
        "Địa điểm xa",
        "Ca làm chưa phù hợp",
      ],
      actions = [
        "Mở rộng CTV",
        "Bổ sung shortlist",
        "Điều chỉnh tiêu chí",
        "Mở thêm nguồn",
        "Chạy referral",
        "Review JD với client",
      ];
    let source = opsBriefFilteredRows();
    if (opsBriefCandidateMode === "none")
      source = source.filter((_, i) => i % 3 === 0);
    if (opsBriefCandidateMode === "retry")
      source = source.filter((_, i) => i % 3 !== 0);
    const rows = source.map((r, i) => [
      r.project,
      r.project.slice(0, 3).toUpperCase() +
        "-" +
        r.position.replaceAll(" ", "").slice(0, 3).toUpperCase() +
        "-" +
        String(42 + i).padStart(3, "0"),
      r.region,
      r.city,
      r.position,
      "Store " + (i + 1),
      "2" + (i % 9) + "/07/2026",
      r.otif,
      i % 3 ? "Tuyển lại" : "Chưa có ứng viên",
      i % 3 ? 2 + i : "",
      difficulties[i % difficulties.length],
      actions[i % actions.length],
      String(6 + (i % 8)).padStart(2, "0") + "/08/2026",
      r.person,
    ]);
    return (
      '<div class="ops-plan-head"><div class="ops-plan-kpi"><span>On-Time chưa UV / tuyển lại</span><b>' +
      source.filter((x) => x.otif === "On-Time").length +
      '</b></div><div class="ops-plan-kpi risk"><span>Late chưa UV / tuyển lại</span><b>' +
      source.filter((x) => x.otif === "Late").length +
      '</b></div><div class="ops-tile"><button data-brief-candidate="all" class="' +
      (opsBriefCandidateMode === "all" ? "active" : "") +
      '">All</button><button data-brief-candidate="none" class="' +
      (opsBriefCandidateMode === "none" ? "active" : "") +
      '">Chưa có ứng viên</button><button data-brief-candidate="retry" class="' +
      (opsBriefCandidateMode === "retry" ? "active" : "") +
      '">Tuyển lại</button></div></div>' +
      opsBriefTable(
        [
          "Dự án",
          "Jobcode",
          "Khu vực",
          "Thành phố",
          "Vị trí",
          "Store",
          "Ngày tạo",
          "OTIF",
          "Tình trạng",
          "UV đã gửi",
          "Khó khăn",
          "Đề xuất",
          "Plan gửi hồ sơ",
          "Recruiter/CTV",
        ],
        rows,
        "plan-table",
      )
    );
  };
  const opsRenderPipelineFiltered = opsRenderPipeline;
  opsRenderPipeline = function () {
    let html = opsRenderPipelineFiltered(),
      rows = opsBriefFilteredRows();
    const matrixRows = rows.map((r, i) => [
        r.project,
        r.region,
        r.city,
        r.position,
        r.type,
        r.progress,
        31 + i * 3,
        37 + (i % 5) * 4,
        42 + (i % 4) * 3,
        39 + (i % 6) * 2,
      ]),
      qualityRows = rows.map((r, i) => [
        ["Facebook", "Referral", "Job site", "CTV Network"][i % 4],
        r.sup,
        r.tl,
        r.person,
        r.kind,
        840 - i * 31,
        612 - i * 24,
        236 - i * 9,
        (11.2 - i * 0.35).toFixed(1).replace(".", ","),
        Math.max(18, 58 - i * 3),
        i < 5 ? "Tốt" : i < 9 ? "Xem xét" : "Cần hỗ trợ",
      ]);
    html = html.replace(
      /<div class="ops-brief-title"><div><h3>Ứng viên theo dimension chi tiết[\s\S]*?<\/div><\/div><div class="table-wrap ops-brief-table">[\s\S]*?<\/table><\/div><\/article>/,
      '<div class="ops-brief-title"><div><h3>Ứng viên theo dimension chi tiết</h3><p>Dữ liệu đổi trực tiếp theo bộ lọc dùng chung.</p></div></div>' +
        opsBriefTable(
          [
            "Dự án",
            "Khu vực",
            "Thành phố",
            "Vị trí",
            "Loại tuyển",
            "Tiến độ",
            "Kỳ 1",
            "Kỳ 2",
            "Kỳ 3",
            "Kỳ 4",
          ],
          matrixRows,
        ) +
        "</article>",
    );
    const last = html.lastIndexOf(
      '<div class="table-wrap ops-brief-table candidate-quality">',
    );
    if (last >= 0)
      html =
        html.slice(0, last) +
        opsBriefTable(
          [
            "Nguồn",
            "Supervisor",
            "Team Leader",
            "Recruiter / CTV",
            "Loại",
            "Data",
            "Approach",
            "Ứng viên gửi",
            "AVG UV/ngày",
            "Pass BH",
            "Đánh giá",
          ],
          qualityRows,
          "candidate-quality",
        );
    return html;
  };
  opsRenderOutcome = function () {
    let rows = opsBriefFilteredRows();
    if (opsBriefPeopleMode !== "all")
      rows = rows.filter((row) => row.kind === opsBriefPeopleMode);
    const tableRows = rows.map((r, i) => [
      r.am,
      r.sup,
      r.tl,
      r.person,
      r.kind,
      r.project,
      r.region,
      16 + (i % 9),
      9 + (i % 8),
      87 + i * 6,
      Math.max(3, 12 - (i % 7)),
      (7.4 + i * 0.45).toFixed(1).replace(".", ","),
      80 + (i % 6) * 3 + "%",
      18 + (i % 7),
      i < 5 ? "Tốt" : i < 9 ? "Xem xét" : "Cần hỗ trợ",
    ]);
    return (
      opsSectionHead(
        "Năng suất",
        "Drill-down theo AM → Supervisor → Team Leader → từng Recruiter/CTV; dùng chung bộ lọc của Tổng hợp Order.",
      ) +
      opsKpis([
        ["Nhân sự trong scope", rows.length],
        ["Order / Recruiter", "18,6", "↑ 8% so chu kỳ trước"],
        ["UV gửi / ngày", "9,4", "↑ 6% so chu kỳ trước"],
        ["Tỷ lệ đúng hạn", "86%", "↑ 3 điểm %"],
        ["AVG Time to Fill", "21 ngày", "▼ 2 ngày"],
        ["Order cần hỗ trợ", "27", "▼ 9%"],
      ]) +
      '<article class="ops-source-card full ops-brief-card"><div class="ops-brief-title"><div><h3>Năng suất theo hệ thống nhân sự</h3><p>Hierarchy: Account Manager → Supervisor → Team Leader → Recruiter/CTV.</p></div><div class="ops-tile"><button data-brief-people="all" class="' +
      (opsBriefPeopleMode === "all" ? "active" : "") +
      '">All</button><button data-brief-people="Recruiter" class="' +
      (opsBriefPeopleMode === "Recruiter" ? "active" : "") +
      '">Recruiter</button><button data-brief-people="CTV" class="' +
      (opsBriefPeopleMode === "CTV" ? "active" : "") +
      '">CTV</button></div></div>' +
      opsBriefTable(
        [
          "AM",
          "Supervisor",
          "Team Leader",
          "Recruiter / CTV",
          "Loại",
          "Dự án",
          "Khu vực",
          "Order",
          "Done",
          "UV gửi",
          "Pass BH",
          "AVG UV/ngày",
          "Đúng hạn",
          "Time to Fill",
          "Đánh giá",
        ],
        tableRows,
        "productivity-table",
      ) +
      "</article>"
    );
  };
  opsRenderSourceSummary = function () {
    const summary = document.querySelector("#filter-summary"),
      f = opsNormalizeOrderTime(),
      time = opsOrderTimeContext(),
      chips = [
        time.basisLabel,
        { day: "Daily", week: "Weekly", month: "Monthly" }[f.period],
        f.timeBasis === "kpi" ? time.range : "Ngày: " + time.range,
      ];
    [
      ["project", "Dự án"],
      ["region", "Khu vực"],
      ["city", "Thành phố"],
      ["position", "Vị trí"],
      ["hireType", "Loại tuyển"],
      ["status", "Trạng thái"],
      ["otif", "OTIF"],
      ["progress", "Tiến độ"],
      ["am", "AM"],
      ["supervisor", "SUP"],
      ["teamLead", "TL"],
      ["recruiter", "Recruiter"],
    ].forEach((pair) => {
      if (f[pair[0]] && f[pair[0]] !== "all")
        chips.push(pair[1] + ": " + f[pair[0]]);
    });
    summary.innerHTML =
      "Bộ lọc: " +
      chips
        .map(
          (value) =>
            '<span class="filter-chip">' + opsEscape(value) + "</span>",
        )
        .join(" ");
    const full =
      "Bộ lọc đang áp dụng:\n" + chips.map((value) => "• " + value).join("\n");
    summary.title = full;
    summary.setAttribute("aria-label", full);
    document.querySelector("#clear-filters").classList.add("visible");
  };
  function opsSetupBriefInteractions() {
    document.addEventListener("click", (event) => {
      const candidate = event.target.closest("[data-brief-candidate]"),
        people = event.target.closest("[data-brief-people]"),
        nav = event.target.closest(".ops-brief-quick [data-ops-target]");
      if (candidate) {
        opsBriefCandidateMode = candidate.dataset.briefCandidate;
        opsRenderSource();
      }
      if (people) {
        opsBriefPeopleMode = people.dataset.briefPeople;
        opsRenderSource();
      }
      if (nav) opsActivateSection(nav.dataset.opsTarget);
    });
    document.addEventListener("change", (event) => {
      if (
        event.target.id === "role" &&
        document.querySelector("#view-operations.active")
      )
        opsRenderSource();
    });
  }
  const opsRenderDeadlineInteractive = opsRenderDeadline;
  opsRenderDeadline = function () {
    return opsRenderDeadlineInteractive()
      .replace('<button class="btn">Chọn dimension</button>', "")
      .replace('<button class="btn">Lọc tiến độ</button>', "");
  };
  const opsSetupBriefInteractionsBase = opsSetupBriefInteractions;
  opsSetupBriefInteractions = function () {
    opsSetupBriefInteractionsBase();
    document.addEventListener("click", (event) => {
      const stage = event.target.closest(".ops-candidate-funnel button");
      if (!stage) return;
      const funnel = stage.closest(".ops-candidate-funnel"),
        card = funnel.closest(".ops-brief-card");
      funnel
        .querySelectorAll("button")
        .forEach((button) =>
          button.classList.toggle("active", button === stage),
        );
      let detail = card.querySelector(".ops-funnel-detail");
      if (!detail) {
        detail = document.createElement("div");
        detail.className = "ops-funnel-detail";
        funnel.after(detail);
      }
      const name = stage.querySelector("span").textContent,
        value = stage.querySelector("b").textContent,
        conversion = stage.querySelector("small").textContent;
      detail.innerHTML =
        "<div><span>Phase đang xem</span><b>" +
        opsEscape(name) +
        "</b></div><div><span>Số lượng</span><b>" +
        opsEscape(value) +
        "</b></div><div><span>Kết quả chuyển đổi</span><b>" +
        opsEscape(conversion) +
        "</b></div><p>Chi tiết phase đã được kích hoạt theo bộ lọc hiện tại.</p>";
    });
  };
  function opsEnsureBriefVisuals() {
    const defaults = [
        [
          "brief-project",
          "Order theo dự án",
          "Dự án",
          ["Order lũy tiến", "Order Done"],
        ],
        [
          "brief-region",
          "Order theo khu vực",
          "Khu vực",
          ["Order lũy tiến", "Order Done"],
        ],
        [
          "brief-hire",
          "Order theo loại tuyển",
          "Loại tuyển",
          ["Order lũy tiến", "Order Done"],
        ],
        [
          "brief-position",
          "Order theo vị trí tuyển dụng",
          "Vị trí tuyển dụng",
          ["Order lũy tiến", "Order Done"],
        ],
        [
          "brief-progress",
          "Processing và Done theo tiến độ",
          "Tiến độ",
          ["Order Processing", "Order Done"],
        ],
        [
          "brief-risk",
          "Processing Late không UV theo tiến độ",
          "Tiến độ",
          ["Processing Late Không UV"],
        ],
      ].map((item) => ({
        id: item[0],
        name: item[1],
        type: "column",
        dimension: item[2],
        metrics: item[3],
      })),
      matrices = [
        [
          "brief-matrix-project",
          "Processing theo phạm vi",
          ["Dự án", "Khu vực", "Thành phố"],
          ["OTIF", "Loại tuyển"],
        ],
        [
          "brief-matrix-progress",
          "Processing theo OTIF và tiến độ",
          ["Dự án", "Khu vực", "Thành phố"],
          ["OTIF", "Tiến độ"],
        ],
        [
          "brief-matrix-time",
          "Processing theo thời gian",
          ["Dự án", "Khu vực"],
          ["Tháng", "Period"],
        ],
      ].map((item) => ({
        id: item[0],
        name: item[1],
        type: "table",
        tableMode: "matrix",
        rows: item[2],
        columns: item[3],
        metrics: ["Order Processing"],
      }));
    const known = new Set(opsSourceState.visuals.map((item) => item.id));
    [...defaults, ...matrices].forEach((item) => {
      if (!known.has(item.id)) opsSourceState.visuals.push(item);
    });
    opsSourceState.columnCols = 3;
    opsSourceState.tableCols = 1;
  }
  opsEnsureBriefVisuals();

  /* FB0908BEHAVIOR */
  const fbOpenProjects = new Set(opsOrderOptions.projects);
  const fbDefs = [
    [
      "processing",
      "Order Processing",
      223,
      "↑ 12%",
      "ops-orders",
      [184, 191, 198, 205, 216, 219, 223],
    ],
    [
      "late",
      "Processing Late",
      95,
      "↑ 18%",
      "ops-deadline",
      [61, 67, 70, 78, 82, 89, 95],
      1,
    ],
    [
      "noUv",
      "Late chưa có UV",
      41,
      "↑ 24%",
      "ops-deadline",
      [21, 24, 26, 31, 34, 37, 41],
      1,
    ],
    [
      "sent",
      "Ứng viên đã gửi",
      1673,
      "↑ 9%",
      "ops-pipeline",
      [1220, 1288, 1340, 1416, 1499, 1582, 1673],
    ],
    [
      "pass",
      "Ứng viên Pass BH",
      193,
      "↑ 6%",
      "ops-pipeline",
      [142, 151, 159, 168, 176, 184, 193],
    ],
    [
      "prod",
      "Năng suất / Recruiter",
      "18,6",
      "↑ 8%",
      "ops-outcome",
      [14.2, 15.1, 15.8, 16.4, 17.1, 17.9, 18.6],
    ],
  ];
  function fbSvg(v, l, small) {
    const w = small ? 240 : 420,
      h = small ? 64 : 180,
      p = small ? 5 : 28,
      max = Math.max(...v, 1),
      min = Math.min(...v, 0),
      s = Math.max(1, max - min),
      x = (i) => p + (i * (w - p * 2)) / Math.max(1, v.length - 1),
      y = (n) => h - p - ((n - min) / s) * (h - p * 2),
      path = v.map((n, i) => (i ? "L" : "M") + x(i) + " " + y(n)).join(" "),
      grid = small
        ? ""
        : Array.from(
            { length: 4 },
            (_, i) =>
              '<line class="grid" x1="' +
              p +
              '" x2="' +
              (w - p) +
              '" y1="' +
              (p + (i * (h - p * 2)) / 3) +
              '" y2="' +
              (p + (i * (h - p * 2)) / 3) +
              '"/>',
          ).join(""),
      pts = v
        .map(
          (n, i) =>
            '<circle cx="' +
            x(i) +
            '" cy="' +
            y(n) +
            '" r="' +
            (small ? 2 : 3) +
            '"/>' +
            (small
              ? ""
              : '<text x="' +
                x(i) +
                '" y="' +
                (y(n) - 8) +
                '" text-anchor="middle">' +
                n +
                '</text><text x="' +
                x(i) +
                '" y="' +
                (h - 6) +
                '" text-anchor="middle">' +
                opsEscape(l[i]) +
                "</text>"),
        )
        .join("");
    return (
      '<svg class="' +
      (small ? "fb-spark" : "fb-svg") +
      '" viewBox="0 0 ' +
      w +
      " " +
      h +
      '" preserveAspectRatio="none">' +
      grid +
      '<path class="line" d="' +
      path +
      '"/>' +
      pts +
      "</svg>"
    );
  }
  function fbSummaryCharts() {
    const labels = [
        "T1/26",
        "T2/26",
        "T3/26",
        "T4/26",
        "T5/26",
        "T6/26",
        "T7/26",
        "T8/26",
      ],
      arr = [
        ["Không đạt KPI Gửi CV đúng hạn", [1, 2, 2, 3, 3, 4, 5, 4]],
        ["Không đạt KPI Pass BH", [2, 2, 3, 3, 4, 5, 5, 6]],
      ];
    return (
      '<article class="ops-source-card full fb-summary-panel"><div class="ops-brief-title"><div><h3>KPI Summary</h3><p>Số dự án không đạt KPI trong chu kỳ.</p></div><span class="fb-pill">KPI cycle · Monthly</span></div><div class="fb-kpis">' +
      arr
        .map(
          (a) =>
            '<section class="fb-chart"><header><div><h4>' +
            a[0] +
            "</h4><small>Y: dự án · X: tháng/năm</small></div><b>" +
            a[1].at(-1) +
            " dự án</b></header>" +
            fbSvg(a[1], labels, false) +
            "</section>",
        )
        .join("") +
      "</div></article>"
    );
  }
  opsBriefKpiMatrix = function () {
    const m = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"],
      body = opsOrderOptions.projects
        .map((p, i) => {
          const open = fbOpenProjects.has(p),
            types = [
              [
                "Gửi CV đúng hạn",
                m.map((_, j) => Math.max(67, 98 - i * 2 - j * 2 + (j % 3) * 3)),
              ],
              [
                "Chất lượng CV Pass BH",
                m.map((_, j) => Math.max(65, 95 - i * 2 - j * 2 + (j % 2) * 4)),
              ],
            ],
            parent =
              '<tr><td><button class="fb-toggle" data-fb-project="' +
              p +
              '"><i>' +
              (open ? "−" : "+") +
              "</i>" +
              p +
              '</button></td><td colspan="9"></td></tr>',
            child = types
              .map(
                (t) =>
                  '<tr class="fb-child ' +
                  (open ? "" : "hidden") +
                  '"><td>' +
                  t[0] +
                  "</td>" +
                  t[1]
                    .map(
                      (n) =>
                        '<td><span class="ops-kpi-cell ' +
                        (n < 85 ? "risk" : n < 90 ? "watch" : "") +
                        '">' +
                        n +
                        "%</span></td>",
                    )
                    .join("") +
                  '<td><strong class="ops-streak">' +
                  t[1].filter((n) => n < 90).length +
                  " tháng</strong></td></tr>",
              )
              .join("");
          return parent + child;
        })
        .join("");
    return (
      '<article class="ops-source-card full"><div class="ops-brief-title"><div><h3>KPI theo dự án</h3><p>Hai level: Dự án → Loại KPI.</p></div></div><div class="fb-table"><table><thead><tr><th>Dự án / Loại KPI</th>' +
      m.map((x) => "<th>" + x + "</th>").join("") +
      "<th>Streak</th></tr></thead><tbody>" +
      body +
      "</tbody></table></div></article>"
    );
  };
  function fbQuickSummaryChart(values, labels) {
    const w = 260,
      h = 86,
      p = { l: 6, r: 34, t: 14, b: 20 },
      max = Math.max(...values, 1),
      min = Math.min(...values, 0),
      span = Math.max(1, max - min),
      x = (i) => p.l + (i * (w - p.l - p.r)) / Math.max(1, values.length - 1),
      y = (n) => p.t + ((max - n) / span) * (h - p.t - p.b),
      path = values
        .map((n, i) => (i ? "L" : "M") + x(i) + " " + y(n))
        .join(" "),
      last = values.length - 1;
    return (
      '<div class="fb-spark-wrap"><svg class="fb-spark" viewBox="0 0 ' +
      w +
      " " +
      h +
      '" preserveAspectRatio="none"><line class="axis" x1="' +
      p.l +
      '" x2="' +
      (w - p.r) +
      '" y1="' +
      (h - p.b) +
      '" y2="' +
      (h - p.b) +
      '"/><path class="line" d="' +
      path +
      '"/>' +
      values
        .map(
          (n, i) =>
            '<circle cx="' +
            x(i) +
            '" cy="' +
            y(n) +
            '" r="2.5"/>' +
            (i === last
              ? '<text class="end-value" x="' +
                (x(i) + 7) +
                '" y="' +
                (y(n) + 3) +
                '">' +
                opsFmt(n) +
                "</text>"
              : "") +
            '<text x="' +
            x(i) +
            '" y="' +
            (h - 5) +
            '" text-anchor="middle">' +
            labels[i] +
            "</text>",
        )
        .join("") +
      "</svg></div>"
    );
  }
  opsBriefQuickSummary = function () {
    const labels = [
      "T2/2026",
      "T3/2026",
      "T4/2026",
      "T5/2026",
      "T6/2026",
      "T7/2026",
      "T8/2026",
    ];
    return (
      '<div class="ops-brief-quick">' +
      fbDefs
        .map((d) => {
          const total = d[5].reduce((sum, value) => sum + Number(value), 0);
          return (
            '<article class="' +
            (d[7] ? "risk" : "") +
            '"><div class="fb-qhead"><span>' +
            d[1] +
            "</span><em>" +
            d[3] +
            ' so với tháng trước</em></div><div class="fb-total"><strong>' +
            opsFmt(total) +
            "</strong><small>Tổng T2–T8/2026</small></div>" +
            fbQuickSummaryChart(d[5], labels) +
            '<button data-fb-detail="' +
            d[0] +
            '">Xem chi tiết →</button></article>'
          );
        })
        .join("") +
      "</div>"
    );
  };
  opsRenderSummary = function () {
    return (
      opsSectionHead(
        "Tổng hợp vận hành",
        "KPI chu kỳ và tín hiệu vận hành quan trọng.",
      ) +
      fbSummaryCharts() +
      opsBriefKpiMatrix() +
      '<div class="fb-head"><div><h3>Tổng hợp nhanh</h3><p>KPI hiện tại, VSG và đường dẫn phân tích.</p></div></div>' +
      opsBriefQuickSummary()
    );
  };
  function fbLabels() {
    const f = opsNormalizeOrderTime(),
      t = opsOrderTimeContext(),
      d0 = new Date(t.end),
      out = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date(d0);
      if (f.period === "day") d.setDate(d.getDate() + i);
      else if (f.period === "week") d.setDate(d.getDate() + i * 7);
      else d.setMonth(d.getMonth() + i);
      if (f.period === "day")
        out.push(
          String(d.getDate()).padStart(2, "0") +
            "/" +
            String(d.getMonth() + 1).padStart(2, "0"),
        );
      else if (f.period === "week") {
        const a = new Date(d.getFullYear(), 0, 1),
          w = Math.ceil(((d - a) / 86400000 + a.getDay() + 1) / 7);
        out.push("W" + w + "/" + String(d.getFullYear()).slice(-2));
      } else
        out.push(
          "T" + (d.getMonth() + 1) + "/" + String(d.getFullYear()).slice(-2),
        );
    }
    return out;
  }
  function fbBlock(late) {
    const labels = fbLabels(),
      v = late ? [19, 17, 15, 14, 12, 10, 8] : [38, 42, 31, 27, 24, 19, 16];
    return (
      '<section class="' +
      (late ? "late" : "on") +
      '"><header><b>Processing ' +
      (late ? "Late" : "On-Time") +
      "</b><small>" +
      { day: "Daily", week: "Weekly", month: "Monthly" }[
        opsNormalizeOrderTime().period
      ] +
      '</small></header><div class="fb-buckets">' +
      labels
        .map((x, i) => {
          const n = v[i],
            uv = Math.round(n * (late ? 0.52 : 0.72)),
            none = Math.round(n * (late ? 0.31 : 0.18)),
            retry = n - uv - none;
          return (
            '<article class="fb-bucket"><small>' +
            x +
            "</small><strong>" +
            n +
            '</strong><div class="fb-state"><span class="uv">Có UV <b>' +
            uv +
            '</b></span><span class="none">Chưa UV <b>' +
            none +
            '</b></span><span class="retry">Tuyển lại <b>' +
            retry +
            "</b></span></div></article>"
          );
        })
        .join("") +
      "</div></section>"
    );
  }
  opsDeadlineCards = function () {
    return '<div class="fb-dead">' + fbBlock(false) + fbBlock(true) + "</div>";
  };
  opsDeadlineMatrix = function () {
    const labels = fbLabels(),
      name = { day: "Ngày", week: "Tuần", month: "Tháng" }[
        opsNormalizeOrderTime().period
      ],
      p = opsOrderOptions.progress.filter((x) => x !== "Đạt học việc");
    return opsBriefTable(
      ["Tiến độ"]
        .concat(labels.map((x) => name + " " + x))
        .concat(["Late · Có UV"]),
      p.map((x, i) =>
        [x]
          .concat(
            labels.map((_, j) =>
              Math.max(1, 8 + i + (j % 3) - Math.floor(j / 2)),
            ),
          )
          .concat([Math.max(2, 13 - i)]),
      ),
      "deadline-matrix",
    );
  };
  function fbState(r) {
    return opsBriefScopeRows.indexOf(r) % 3 === 0
      ? "Chưa có ứng viên"
      : "Tuyển lại";
  }
  opsDeadlinePlan = function () {
    let src = opsBriefFilteredRows();
    if (opsBriefCandidateMode === "none")
      src = src.filter((r) => fbState(r) === "Chưa có ứng viên");
    if (opsBriefCandidateMode === "retry")
      src = src.filter((r) => fbState(r) === "Tuyển lại");
    const rows = src.map((r, i) => {
      const s = fbState(r);
      return [
        r.project,
        r.project.slice(0, 3).toUpperCase() + "-" + (42 + i),
        r.region,
        r.city,
        r.position,
        "Store " + (i + 1),
        "2" + (i % 9) + "/07/2026",
        r.otif,
        s,
        s === "Tuyển lại" ? 2 + i : "",
        "Nguồn ứng viên thấp",
        "Mở rộng CTV",
        "0" + (6 + (i % 4)) + "/08/2026",
        r.person,
      ];
    });
    return (
      '<div class="ops-plan-head"><div class="ops-plan-kpi"><span>On-Time</span><b>' +
      src.filter((x) => x.otif === "On-Time").length +
      '</b></div><div class="ops-plan-kpi risk"><span>Late</span><b>' +
      src.filter((x) => x.otif === "Late").length +
      '</b></div><div class="ops-tile"><button data-brief-candidate="all" class="' +
      (opsBriefCandidateMode === "all" ? "active" : "") +
      '">All</button><button data-brief-candidate="none" class="' +
      (opsBriefCandidateMode === "none" ? "active" : "") +
      '">Chưa có ứng viên</button><button data-brief-candidate="retry" class="' +
      (opsBriefCandidateMode === "retry" ? "active" : "") +
      '">Tuyển lại</button></div></div><p class="fb-note">Tile lọc trực tiếp theo cột Tình trạng.</p>' +
      opsBriefTable(
        [
          "Dự án",
          "Jobcode",
          "Khu vực",
          "Thành phố",
          "Vị trí",
          "Store",
          "Ngày tạo",
          "OTIF",
          "Tình trạng",
          "UV đã gửi",
          "Khó khăn",
          "Đề xuất",
          "Plan gửi hồ sơ",
          "Recruiter/CTV",
        ],
        rows,
        "plan-table",
      )
    );
  };
  opsRenderDeadline = function () {
    return (
      opsSectionHead(
        "Deadline và cảnh báo",
        "Deadline theo đúng Period và kế hoạch xử lý.",
      ) +
      opsDeadlineCards() +
      '<article class="ops-source-card full"><div class="ops-brief-title"><div><h3>Order có ứng viên theo tiến độ</h3><p>Mốc thời gian đổi theo Period.</p></div><span>' +
      { day: "Daily", week: "Weekly", month: "Monthly" }[
        opsNormalizeOrderTime().period
      ] +
      "</span></div>" +
      opsDeadlineMatrix() +
      '</article><article class="ops-source-card full"><div class="ops-brief-title"><div><h3>Plan gửi ứng viên</h3></div></div>' +
      opsDeadlinePlan() +
      "</article>"
    );
  };
  const fbRowsBase = opsVisualRows;
  opsVisualRows = function () {
    const base = fbRowsBase(),
      labels = opsOrderTrendLabels(),
      out = [];
    base.forEach((r, i) =>
      labels.forEach((label, j) =>
        ["On-Time", "Late"].forEach((otif, k) => {
          const n = {
            ...r,
            Tháng: label,
            Period: { day: "Daily", week: "Weekly", month: "Monthly" }[
              opsNormalizeOrderTime().period
            ],
            OTIF: otif,
          };
          if (otif === "On-Time") {
            n["Done Late"] = 0;
            n["Processing Late Có UV"] = 0;
            n["Processing Late Không UV"] = 0;
          } else {
            n["Done On-Time"] = 0;
            n["Processing On-Time"] = 0;
            n["Processing On-Time Có UV"] = 0;
            n["Processing On-Time Không UV"] = 0;
          }
          out.push(n);
        }),
      ),
    );
    return out;
  };
  opsColumnVisual = function (v) {
    const rows = opsVisualRows(),
      dim = opsNormalizeDimension(v.dimension),
      metrics = (v.metrics?.length ? v.metrics : [v.metric || "Order lũy tiến"])
        .map(opsNormalizeMetric)
        .slice(0, 2),
      labels = [...new Set(rows.map((r) => r[dim]))],
      series = labels.map((label) => ({
        label,
        values: metrics.map((m) =>
          opsVisualMetricTotal(
            rows.filter((r) => r[dim] === label),
            m,
          ),
        ),
      })),
      max = Math.max(1, ...series.flatMap((x) => x.values)),
      legend =
        '<div class="ops-visual-legend">' +
        metrics.map((m) => "<span><i></i>" + m + "</span>").join("") +
        "</div>",
      groups = series
        .map(
          (x) =>
            '<div class="ops-source-bar-group">' +
            x.values
              .map(
                (n, i) =>
                  '<div class="ops-source-bar ' +
                  (i ? "metric-2" : "") +
                  '" style="height:' +
                  Math.max(8, (n / max) * 126) +
                  'px"><b>' +
                  opsFmt(n) +
                  "</b></div>",
              )
              .join("") +
            "<label>" +
            x.label +
            "</label></div>",
        )
        .join("");
    return (
      legend +
      '<div class="ops-column-scroll"><div class="ops-source-chart multi">' +
      groups +
      "</div></div>"
    );
  };
  function fbClose() {
    document.querySelector("#fbDrawer")?.classList.remove("open");
    document.querySelector("#fbBack")?.classList.remove("open");
  }
  function fbOpen(id) {
    const d = fbDefs.find((x) => x[0] === id),
      labels = opsOrderTrendLabels().slice(-14),
      num = Number(String(d[2]).replace(",", ".")),
      vals = labels.map((_, i) =>
        Math.round(num * (0.72 + (i * 0.28) / Math.max(1, labels.length - 1))),
      ),
      projects = opsOrderOptions.projects.map((p, i) => [
        i + 1,
        p,
        Math.max(1, Math.round(num * (0.19 - i * 0.015))),
      ]),
      drawer = document.querySelector("#fbDrawer");
    drawer.innerHTML =
      "<header><div><h2>" +
      d[1] +
      '</h2><p>Trend full label và phân bổ dự án.</p></div><button class="filter-close" data-fb-close>×</button></header><div class="fb-dbody"><div class="fb-full">' +
      fbSvg(vals, labels, false) +
      '</div><div class="fb-rank">' +
      opsBriefTable(["Top", "Dự án", "Số lượng"], projects) +
      '</div></div><button class="btn primary" data-fb-go="' +
      d[4] +
      '">Đi đến section liên quan</button>';
    drawer.classList.add("open");
    document.querySelector("#fbBack").classList.add("open");
  }
  const fbSetup = opsSetupBriefInteractions;
  opsSetupBriefInteractions = function () {
    fbSetup();
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div class="fb-back" id="fbBack"></div><aside class="fb-drawer" id="fbDrawer"></aside>',
    );
    document.addEventListener("click", (e) => {
      const p = e.target.closest("[data-fb-project]"),
        d = e.target.closest("[data-fb-detail]"),
        c = e.target.closest("[data-fb-close]"),
        g = e.target.closest("[data-fb-go]");
      if (p) {
        fbOpenProjects.has(p.dataset.fbProject)
          ? fbOpenProjects.delete(p.dataset.fbProject)
          : fbOpenProjects.add(p.dataset.fbProject);
        opsRenderSource();
      }
      if (d) fbOpen(d.dataset.fbDetail);
      if (c) fbClose();
      if (g) {
        fbClose();
        opsActivateSection(g.dataset.fbGo);
      }
    });
    document.querySelector("#fbBack").addEventListener("click", fbClose);
  };
  renderRequests();
  renderFilterSummary();
  renderCandidates();
  renderPivot();
  renderAudit();
  opsSetupSource();
  opsSetupVisualDrawer();
  opsSetupOrderInteractions();
  opsSetupPhasePath();
  opsSetupOrderClear();
  opsSetupQuickFlag();
  opsSetupOrderTrendMode();
  opsSetupProjectTrendDrawer();
  opsSetupVisualConfigDelegation();
  opsSetupAdvancedTimeFilter();
  opsSetupPersistentTimeReset();
  opsSetupBriefInteractions();
})();
