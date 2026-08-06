/* ===================================================================
   Train Search Results — Member 3
   Static dummy data for now. Swap `DUMMY_TRAINS` for an API response
   later without touching the render/filter/sort logic below.
   =================================================================== */

const DUMMY_TRAINS = [
  {
    id: "t1",
    number: "12622",
    name: "Tamil Nadu Express",
    type: "Superfast",
    fromCode: "MAS",
    toCode: "NDLS",
    depTime: "22:00",
    arrTime: "06:35",
    nextDay: true,
    duration: "32h 35m",
    durMinutes: 1955,
    runsOn: [1, 1, 1, 1, 1, 1, 1],
    classes: [
      { code: "SL", label: "Sleeper", fare: 855, status: "AVAILABLE", availText: "AVAILABLE-142" },
      { code: "3A", label: "AC 3 Tier", fare: 2260, status: "AVAILABLE", availText: "AVAILABLE-38" },
      { code: "2A", label: "AC 2 Tier", fare: 3195, status: "RAC", availText: "RAC 12" },
      { code: "1A", label: "AC First Class", fare: 5430, status: "WL", availText: "WL 6" }
    ]
  },
  {
    id: "t2",
    number: "12432",
    name: "Trivandrum Rajdhani",
    type: "Rajdhani",
    fromCode: "TVC",
    toCode: "NDLS",
    depTime: "19:15",
    arrTime: "05:55",
    nextDay: true,
    duration: "34h 40m",
    durMinutes: 2080,
    runsOn: [1, 0, 1, 0, 1, 0, 1],
    classes: [
      { code: "3A", label: "AC 3 Tier", fare: 3145, status: "AVAILABLE", availText: "AVAILABLE-64" },
      { code: "2A", label: "AC 2 Tier", fare: 4520, status: "AVAILABLE", availText: "AVAILABLE-21" },
      { code: "1A", label: "AC First Class", fare: 7610, status: "AVAILABLE", availText: "AVAILABLE-9" }
    ]
  },
  {
    id: "t3",
    number: "16382",
    name: "Kanyakumari Express",
    type: "Express",
    fromCode: "MAS",
    toCode: "CAPE",
    depTime: "17:50",
    arrTime: "09:20",
    nextDay: true,
    duration: "15h 30m",
    durMinutes: 930,
    runsOn: [1, 1, 1, 1, 1, 1, 1],
    classes: [
      { code: "2S", label: "Second Sitting", fare: 195, status: "AVAILABLE", availText: "AVAILABLE-320" },
      { code: "SL", label: "Sleeper", fare: 465, status: "AVAILABLE", availText: "AVAILABLE-96" },
      { code: "3A", label: "AC 3 Tier", fare: 1220, status: "RAC", availText: "RAC 4" }
    ]
  },
  {
    id: "t4",
    number: "12076",
    name: "Ernakulam Shatabdi",
    type: "Shatabdi",
    fromCode: "ERS",
    toCode: "MAS",
    depTime: "05:20",
    arrTime: "13:15",
    nextDay: false,
    duration: "7h 55m",
    durMinutes: 475,
    runsOn: [1, 1, 0, 1, 1, 0, 1],
    classes: [
      { code: "CC", label: "AC Chair Car", fare: 895, status: "AVAILABLE", availText: "AVAILABLE-58" },
      { code: "EC", label: "Executive Chair", fare: 1690, status: "WL", availText: "WL 3" }
    ]
  },
  {
    id: "t5",
    number: "22642",
    name: "Kollam-Chennai SF Express",
    type: "Superfast",
    fromCode: "QLN",
    toCode: "MAS",
    depTime: "13:40",
    arrTime: "05:10",
    nextDay: true,
    duration: "15h 30m",
    durMinutes: 930,
    runsOn: [0, 1, 0, 1, 0, 1, 0],
    classes: [
      { code: "SL", label: "Sleeper", fare: 510, status: "AVAILABLE", availText: "AVAILABLE-77" },
      { code: "3A", label: "AC 3 Tier", fare: 1345, status: "AVAILABLE", availText: "AVAILABLE-19" },
      { code: "2A", label: "AC 2 Tier", fare: 1920, status: "REGRET", availText: "REGRET" }
    ]
  },
  {
    id: "t6",
    number: "16649",
    name: "Parasuram Express",
    type: "Express",
    fromCode: "TVC",
    toCode: "MAO",
    depTime: "10:15",
    arrTime: "23:40",
    nextDay: false,
    duration: "13h 25m",
    durMinutes: 805,
    runsOn: [1, 1, 1, 1, 1, 1, 1],
    classes: [
      { code: "2S", label: "Second Sitting", fare: 165, status: "AVAILABLE", availText: "AVAILABLE-210" },
      { code: "SL", label: "Sleeper", fare: 395, status: "RAC", availText: "RAC 18" },
      { code: "3A", label: "AC 3 Tier", fare: 1050, status: "AVAILABLE", availText: "AVAILABLE-33" }
    ]
  },
  {
    id: "t7",
    number: "12695",
    name: "Trivandrum-Bangalore Express",
    type: "Superfast",
    fromCode: "TVC",
    toCode: "SBC",
    depTime: "16:40",
    arrTime: "10:15",
    nextDay: true,
    duration: "17h 35m",
    durMinutes: 1055,
    runsOn: [1, 0, 0, 1, 0, 0, 1],
    classes: [
      { code: "SL", label: "Sleeper", fare: 540, status: "WL", availText: "WL 24" },
      { code: "3A", label: "AC 3 Tier", fare: 1420, status: "WL", availText: "WL 11" },
      { code: "2A", label: "AC 2 Tier", fare: 2010, status: "AVAILABLE", availText: "AVAILABLE-14" }
    ]
  },
  {
    id: "t8",
    number: "56302",
    name: "Kollam-Punalur Passenger",
    type: "Passenger",
    fromCode: "QLN",
    toCode: "PUU",
    depTime: "06:05",
    arrTime: "07:35",
    nextDay: false,
    duration: "1h 30m",
    durMinutes: 90,
    runsOn: [1, 1, 1, 1, 1, 1, 1],
    classes: [
      { code: "2S", label: "Second Sitting", fare: 35, status: "AVAILABLE", availText: "AVAILABLE-500" }
    ]
  }
];

/* Status -> Tailwind color classes */
const STATUS_STYLES = {
  AVAILABLE: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  RAC: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  WL: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  REGRET: { text: "text-gray-500", bg: "bg-gray-100", border: "border-gray-200" }
};

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

/* ------------------------------------------------------------------
   State
   ------------------------------------------------------------------ */
const state = {
  classes: new Set(),   // selected class filter codes
  types: new Set(),     // selected train type filters
  depSlots: new Set(),  // selected departure time slots
  arrSlots: new Set(),  // selected arrival time slots
  sortKey: "depTime",
  sortDir: "asc",
  quota: "GN",
  expandedCard: null,
  expandedClassCode: null
};

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */
function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getSlot(t) {
  const mins = timeToMinutes(t);
  if (mins < 360) return "night-early"; // 00:00-06:00
  if (mins < 720) return "morning";     // 06:00-12:00
  if (mins < 1080) return "midday";     // 12:00-18:00
  return "night";                       // 18:00-24:00
}

function getMinFare(train) {
  return Math.min(...train.classes.map((c) => c.fare));
}

function matchesFilters(train) {
  if (state.classes.size > 0) {
    const hasClass = train.classes.some((c) => state.classes.has(c.code));
    if (!hasClass) return false;
  }
  if (state.types.size > 0 && !state.types.has(train.type)) return false;
  if (state.depSlots.size > 0 && !state.depSlots.has(getSlot(train.depTime))) return false;
  if (state.arrSlots.size > 0 && !state.arrSlots.has(getSlot(train.arrTime))) return false;
  return true;
}

function sortTrains(trains) {
  const dir = state.sortDir === "asc" ? 1 : -1;
  return trains.slice().sort((a, b) => {
    switch (state.sortKey) {
      case "depTime":
        return (timeToMinutes(a.depTime) - timeToMinutes(b.depTime)) * dir;
      case "arrTime":
        return (timeToMinutes(a.arrTime) - timeToMinutes(b.arrTime)) * dir;
      case "duration":
        return (a.durMinutes - b.durMinutes) * dir;
      case "price":
        return (getMinFare(a) - getMinFare(b)) * dir;
      default:
        return 0;
    }
  });
}

/* ------------------------------------------------------------------
   Rendering
   ------------------------------------------------------------------ */
function renderRunsOn(runsOn) {
  return runsOn
    .map((active, i) => {
      const cls = active
        ? "bg-irctc-blue text-white"
        : "bg-gray-100 text-gray-400";
      return `<span class="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-semibold ${cls}">${DAY_LABELS[i]}</span>`;
    })
    .join("");
}

function renderClassBox(train, cls) {
  const style = STATUS_STYLES[cls.status] || STATUS_STYLES.REGRET;
  const isExpanded = state.expandedCard === train.id && state.expandedClassCode === cls.code;
  return `
    <button
      type="button"
      data-train-id="${train.id}"
      data-class-code="${cls.code}"
      class="class-box shrink-0 w-24 sm:w-28 text-left border rounded px-2 py-1.5 transition-colors ${style.bg} ${style.border} ${isExpanded ? "ring-2 ring-irctc-orange" : ""}"
    >
      <div class="text-xs font-bold text-gray-800">${cls.code}</div>
      <div class="text-[11px] font-medium ${style.text} leading-tight">${cls.availText}</div>
      <div class="text-xs font-semibold text-gray-700 mt-0.5">&#8377;${cls.fare}</div>
    </button>
  `;
}

function renderBookNowPanel(train, cls) {
  return `
    <div class="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-irctc-light border border-gray-200 rounded p-3">
      <div class="text-sm text-gray-700">
        <span class="font-semibold text-irctc-blue">${cls.label} (${cls.code})</span>
        &middot; Fare <span class="font-semibold">&#8377;${cls.fare}</span>
        &middot; Quota <span class="font-semibold" data-quota-label>${state.quota}</span>
      </div>
      <button
        type="button"
        class="book-now-btn bg-irctc-orange hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded transition-colors"
        data-train-id="${train.id}"
        data-class-code="${cls.code}"
      >
        Book Now
      </button>
    </div>
  `;
}

function renderTrainCard(train) {
  const isExpanded = state.expandedCard === train.id;
  const expandedClass = isExpanded
    ? train.classes.find((c) => c.code === state.expandedClassCode)
    : null;

  return `
    <article class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div class="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 class="text-sm sm:text-base font-bold text-irctc-blue">
            ${train.number} - ${train.name}
          </h3>
          <span class="inline-block mt-1 text-[10px] font-semibold tracking-wide uppercase text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            ${train.type}
          </span>
        </div>
        <div class="flex gap-1">${renderRunsOn(train.runsOn)}</div>
      </div>

      <div class="flex items-center justify-between mt-4 gap-3">
        <div class="text-center sm:text-left">
          <div class="text-lg font-bold text-gray-800">${train.depTime}</div>
          <div class="text-xs text-gray-500">${train.fromCode}</div>
        </div>

        <div class="flex-1 flex flex-col items-center px-2">
          <span class="text-xs text-gray-500">${train.duration}</span>
          <div class="w-full flex items-center gap-1">
            <span class="h-px flex-1 bg-gray-300"></span>
            <span class="text-gray-400 text-xs">&#10230;</span>
            <span class="h-px flex-1 bg-gray-300"></span>
          </div>
        </div>

        <div class="text-center sm:text-right">
          <div class="text-lg font-bold text-gray-800">
            ${train.arrTime}
            ${train.nextDay ? '<sup class="text-[10px] text-irctc-orange">+1</sup>' : ""}
          </div>
          <div class="text-xs text-gray-500">${train.toCode}</div>
        </div>
      </div>

      <div class="flex gap-2 overflow-x-auto mt-4 pb-1" data-class-row>
        ${train.classes.map((c) => renderClassBox(train, c)).join("")}
      </div>

      <div data-book-panel>
        ${expandedClass ? renderBookNowPanel(train, expandedClass) : ""}
      </div>
    </article>
  `;
}

function renderTrains() {
  const list = document.getElementById("trainResultsList");
  const emptyState = document.getElementById("noResults");
  const countEl = document.getElementById("resultsCount");
  if (!list) return;

  const filtered = sortTrains(DUMMY_TRAINS.filter(matchesFilters));

  countEl.textContent = `${filtered.length} train${filtered.length === 1 ? "" : "s"} found`;

  if (filtered.length === 0) {
    list.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  list.innerHTML = filtered.map(renderTrainCard).join("");
}

/* ------------------------------------------------------------------
   Event wiring
   ------------------------------------------------------------------ */
function toggleSetValue(set, value) {
  if (set.has(value)) set.delete(value);
  else set.add(value);
}

function initFilterCheckboxes() {
  document.querySelectorAll("[data-filter-class]").forEach((el) => {
    el.addEventListener("change", () => {
      toggleSetValue(state.classes, el.value);
      renderTrains();
    });
  });

  document.querySelectorAll("[data-filter-type]").forEach((el) => {
    el.addEventListener("change", () => {
      toggleSetValue(state.types, el.value);
      renderTrains();
    });
  });

  document.querySelectorAll("[data-filter-dep-slot]").forEach((el) => {
    el.addEventListener("click", () => {
      toggleSetValue(state.depSlots, el.dataset.filterDepSlot);
      el.classList.toggle("bg-irctc-blue");
      el.classList.toggle("text-white");
      el.classList.toggle("border-irctc-blue");
      renderTrains();
    });
  });

  document.querySelectorAll("[data-filter-arr-slot]").forEach((el) => {
    el.addEventListener("click", () => {
      toggleSetValue(state.arrSlots, el.dataset.filterArrSlot);
      el.classList.toggle("bg-irctc-blue");
      el.classList.toggle("text-white");
      el.classList.toggle("border-irctc-blue");
      renderTrains();
    });
  });

  const clearBtn = document.getElementById("clearFiltersBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      state.classes.clear();
      state.types.clear();
      state.depSlots.clear();
      state.arrSlots.clear();
      document.querySelectorAll("[data-filter-class], [data-filter-type]").forEach((el) => {
        el.checked = false;
      });
      document.querySelectorAll("[data-filter-dep-slot], [data-filter-arr-slot]").forEach((el) => {
        el.classList.remove("bg-irctc-blue", "text-white", "border-irctc-blue");
      });
      renderTrains();
    });
  }
}

function initSortButtons() {
  document.querySelectorAll("[data-sort-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.sortKey;
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = key;
        state.sortDir = "asc";
      }
      document.querySelectorAll("[data-sort-key]").forEach((b) => {
        b.classList.remove("text-irctc-blue", "font-semibold");
        b.classList.add("text-gray-600");
        const arrow = b.querySelector("[data-sort-arrow]");
        if (arrow) arrow.textContent = "";
      });
      btn.classList.add("text-irctc-blue", "font-semibold");
      btn.classList.remove("text-gray-600");
      const arrow = btn.querySelector("[data-sort-arrow]");
      if (arrow) arrow.textContent = state.sortDir === "asc" ? " \u2191" : " \u2193";
      renderTrains();
    });
  });
}

function initQuotaTabs() {
  document.querySelectorAll("[data-quota]").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.quota = tab.dataset.quota;
      document.querySelectorAll("[data-quota]").forEach((t) => {
        t.classList.remove("border-irctc-orange", "text-irctc-blue");
        t.classList.add("border-transparent", "text-gray-600");
      });
      tab.classList.add("border-irctc-orange", "text-irctc-blue");
      tab.classList.remove("border-transparent", "text-gray-600");
      renderTrains();
    });
  });
}

function initDateStrip() {
  document.querySelectorAll("[data-date-chip]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-date-chip]").forEach((c) => {
        c.classList.remove("bg-irctc-blue", "text-white");
        c.classList.add("bg-white", "text-gray-700");
      });
      chip.classList.add("bg-irctc-blue", "text-white");
      chip.classList.remove("bg-white", "text-gray-700");
      // NOTE: dummy data has no per-date variation yet — hook up
      // a real date-keyed dataset here once the backend is ready.
    });
  });
}

function initMobileFilterToggle() {
  const toggleBtn = document.getElementById("filterToggleBtn");
  const sidebar = document.getElementById("filtersSidebar");
  if (!toggleBtn || !sidebar) return;
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });
}

/* Delegated listener for class-box clicks + Book Now clicks,
   since train cards are re-rendered on every filter/sort change. */
function initResultsDelegation() {
  const list = document.getElementById("trainResultsList");
  if (!list) return;

  list.addEventListener("click", (e) => {
    const classBox = e.target.closest(".class-box");
    if (classBox) {
      const trainId = classBox.dataset.trainId;
      const classCode = classBox.dataset.classCode;
      if (state.expandedCard === trainId && state.expandedClassCode === classCode) {
        state.expandedCard = null;
        state.expandedClassCode = null;
      } else {
        state.expandedCard = trainId;
        state.expandedClassCode = classCode;
      }
      renderTrains();
      return;
    }

    const bookBtn = e.target.closest(".book-now-btn");
    if (bookBtn) {
      const trainId = bookBtn.dataset.trainId;
      const classCode = bookBtn.dataset.classCode;
      const train = DUMMY_TRAINS.find((t) => t.id === trainId);
      const cls = train.classes.find((c) => c.code === classCode);
      // Front-end only: hand off to Member 4's booking page.
      // Swap this for a real navigation once booking.html exists, e.g:
      // window.location.href = `booking.html?train=${train.number}&class=${cls.code}&quota=${state.quota}`;
      alert(
        `Proceeding to book:\n${train.number} - ${train.name}\nClass: ${cls.label} (${cls.code})\nQuota: ${state.quota}\nFare: \u20B9${cls.fare}`
      );
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFilterCheckboxes();
  initSortButtons();
  initQuotaTabs();
  initDateStrip();
  initMobileFilterToggle();
  initResultsDelegation();
  renderTrains();
});