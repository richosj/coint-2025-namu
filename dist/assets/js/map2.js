(() => {
  function init() {
    if (document.getElementById("map")) {
      new ol.Map({
        target: "map",
        controls: ol.control.defaults.defaults({
          zoom: false
        }),
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([127.7669, 35.9078]),
          // 대한민국 중심 좌표
          zoom: 7
        })
      });
    }
    setupHeaderExtend();
    setupPcContentExtend();
    setupMobileMenu();
    setupLegend();
    setupMinimap();
    setupZoomControls();
    setupPanelTabs();
    setupToggleButtons();
    setupViewMode();
    setupLayerAccordion();
    setupOptionPanels();
    setupBufferControls();
    setupMarkerOpacityRange();
  }
  function setupMarkerOpacityRange() {
    const range = document.getElementById("markerOpacityRange");
    const rangeValue = document.getElementById("markerOpacityValue");
    function updateRangeBackground(value) {
      range.style.background = `linear-gradient(to right, #555 ${value}%, #ccc ${value}%)`;
      rangeValue.textContent = `${value}%`;
    }
    updateRangeBackground(range.value);
    range.addEventListener("input", (e) => {
      updateRangeBackground(e.target.value);
    });
  }
  function setupHeaderExtend() {
    const btnHeaderExtend = document.querySelector(".btn-header-extend");
    btnHeaderExtend == null ? void 0 : btnHeaderExtend.addEventListener("click", () => {
      document.body.classList.toggle("header-hide");
      btnHeaderExtend.classList.toggle("active");
    });
  }
  function setupPcContentExtend() {
    const btnPcContentExtend = document.querySelector(".pc-content-extend");
    btnPcContentExtend == null ? void 0 : btnPcContentExtend.addEventListener("click", () => {
      document.body.classList.toggle("aside-fold");
      btnPcContentExtend.classList.toggle("active");
    });
  }
  function setupMobileMenu() {
    const nav = document.querySelector("#nav");
    const toggleBtn = document.querySelector(".mobile-btn-menu");
    const depth1Buttons = document.querySelectorAll(".gnb-lv1 > a");
    const isMobile = () => window.innerWidth <= 1024;
    const toggleMenu = () => {
      if (isMobile()) {
        const isActive = nav.classList.contains("mobile-active");
        if (isActive) {
          nav.classList.remove("mobile-active");
          toggleBtn.setAttribute("aria-expanded", "false");
          toggleBtn.setAttribute("aria-label", "메뉴 열기");
          toggleBtn.setAttribute("title", "메뉴 열기");
          toggleBtn.classList.remove("active");
          document.querySelectorAll(".gnb-submenu").forEach((submenu) => {
            submenu.classList.remove("show");
          });
        } else {
          nav.classList.add("mobile-active");
          toggleBtn.setAttribute("aria-expanded", "true");
          toggleBtn.setAttribute("aria-label", "메뉴 닫기");
          toggleBtn.setAttribute("title", "메뉴 닫기");
          toggleBtn.classList.add("active");
        }
      }
    };
    depth1Buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (isMobile()) {
          e.preventDefault();
          const submenu = btn.nextElementSibling;
          if (submenu && submenu.classList.contains("gnb-submenu")) {
            submenu.classList.toggle("show");
            btn.setAttribute(
              "aria-expanded",
              submenu.classList.contains("show")
            );
          }
        }
      });
    });
    toggleBtn == null ? void 0 : toggleBtn.addEventListener("click", toggleMenu);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("mobile-active")) {
        toggleMenu();
      }
    });
    window.addEventListener("resize", () => {
      if (!isMobile()) {
        nav.classList.remove("mobile-active");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.setAttribute("aria-label", "메뉴 열기");
        toggleBtn.setAttribute("title", "메뉴 열기");
        toggleBtn.classList.remove("active");
        document.querySelectorAll(".gnb-submenu").forEach((submenu) => {
          submenu.classList.remove("show");
        });
      }
    });
  }
  function setupLegend() {
    const legendWrap = document.querySelector(".legend-wrap");
    const toggleBtn = legendWrap == null ? void 0 : legendWrap.querySelector(".btn-legend");
    const legendFloat = legendWrap == null ? void 0 : legendWrap.querySelector(".legend-float");
    const tabBtns = legendWrap == null ? void 0 : legendWrap.querySelectorAll(".btn-legend-tab");
    const tabContents = legendWrap == null ? void 0 : legendWrap.querySelectorAll(".legend-tab-content");
    const closeBtn = legendWrap == null ? void 0 : legendWrap.querySelector(".btn-legend-tab-close");
    toggleBtn == null ? void 0 : toggleBtn.addEventListener("click", () => {
      const isPressed = toggleBtn.getAttribute("aria-pressed") === "true";
      toggleBtn.setAttribute("aria-pressed", !isPressed);
      toggleBtn.setAttribute("title", isPressed ? "열림" : "닫기");
      if (isPressed) {
        legendFloat == null ? void 0 : legendFloat.classList.remove("show");
      } else {
        legendFloat == null ? void 0 : legendFloat.classList.add("show");
      }
    });
    tabBtns == null ? void 0 : tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabIndex = btn.getAttribute("data-tab");
        tabBtns.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));
        btn.classList.add("active");
        if (tabContents[tabIndex]) {
          tabContents[tabIndex].classList.add("active");
        }
      });
    });
    const tab2Btns = legendWrap == null ? void 0 : legendWrap.querySelectorAll(".btn-legend-tab2");
    const tab2Contents = legendWrap == null ? void 0 : legendWrap.querySelectorAll(".legend-tab2-content");
    tab2Btns == null ? void 0 : tab2Btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabIndex = btn.getAttribute("data-tab");
        tab2Btns.forEach((b) => b.classList.remove("active"));
        tab2Contents.forEach((content) => content.classList.remove("active"));
        btn.classList.add("active");
        if (tab2Contents[tabIndex]) {
          tab2Contents[tabIndex].classList.add("active");
        }
      });
    });
    closeBtn == null ? void 0 : closeBtn.addEventListener("click", () => {
      legendFloat == null ? void 0 : legendFloat.classList.remove("show");
      toggleBtn == null ? void 0 : toggleBtn.setAttribute("aria-pressed", "false");
      toggleBtn == null ? void 0 : toggleBtn.setAttribute("title", "열림");
    });
    document.addEventListener("click", (e) => {
      if (!(legendWrap == null ? void 0 : legendWrap.contains(e.target)) && !e.target.closest(".btn-legend")) {
        legendFloat == null ? void 0 : legendFloat.classList.remove("show");
        toggleBtn == null ? void 0 : toggleBtn.setAttribute("aria-pressed", "false");
        toggleBtn == null ? void 0 : toggleBtn.setAttribute("title", "열림");
      }
    });
    const isMobile = () => window.innerWidth <= 1024;
    if (isMobile()) {
      const btnLegend = document.querySelector(".btn-control-legend");
      btnLegend == null ? void 0 : btnLegend.addEventListener("click", (e) => {
        e.stopPropagation();
        btnLegend.setAttribute("aria-pressed", (legendFloat == null ? void 0 : legendFloat.classList.contains("show")) ? "false" : "true");
        legendFloat.classList.toggle("show");
      });
      const mobileContentExtend = document.querySelector(".mobile-content-extend");
      mobileContentExtend == null ? void 0 : mobileContentExtend.addEventListener("click", () => {
        document.querySelector(".aside-content").classList.toggle("max");
      });
    }
  }
  function setupMinimap() {
    const btnMinimap = document.querySelector(".btn-minimap");
    const miniMapMain = document.querySelector(".mini-map-main");
    if (btnMinimap && miniMapMain) {
      btnMinimap.addEventListener("click", () => {
        miniMapMain.classList.toggle("active");
        btnMinimap.classList.toggle("active");
        btnMinimap.setAttribute(
          "title",
          miniMapMain.classList.contains("active") ? "미니맵 확대" : "미니맵 축소"
        );
      });
    }
  }
  function setupZoomControls() {
    const range = document.getElementById("zoom-range");
    const zoomIn = document.getElementById("zoom-in");
    const zoomOut = document.getElementById("zoom-out");
    if (!range || !zoomIn || !zoomOut) {
      return;
    }
    function updateSliderGradient() {
      parseInt(range.min, 10);
      parseInt(range.max, 10);
      parseInt(range.value, 10);
      console.log(range.value);
    }
    zoomIn.addEventListener("click", () => {
      const val = parseInt(range.value, 10);
      if (val < parseInt(range.max, 10)) {
        range.value = val + 1;
        updateSliderGradient();
      }
    });
    zoomOut.addEventListener("click", () => {
      const val = parseInt(range.value, 10);
      if (val > parseInt(range.min, 10)) {
        range.value = val - 1;
        updateSliderGradient();
      }
    });
    range.addEventListener("input", updateSliderGradient);
    updateSliderGradient();
  }
  function setupPanelTabs() {
    const panelTabs = document.querySelectorAll(".panel-tab");
    const panelTabContents = document.querySelectorAll(".panel-tab-content");
    panelTabs.forEach(function(btn, idx) {
      btn.addEventListener("click", function() {
        panelTabs.forEach(function(b, i) {
          b.setAttribute("aria-selected", i === idx ? "true" : "false");
          b.tabIndex = i === idx ? 0 : -1;
        });
        panelTabContents.forEach(function(content, i) {
          content.classList.toggle("active", i === idx);
        });
      });
    });
  }
  function setupToggleButtons() {
    const toggleBtns = document.querySelectorAll(".toggle-btn");
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.setAttribute(
          "aria-pressed",
          btn.getAttribute("aria-pressed") === "true" ? "false" : "true"
        );
      });
    });
  }
  function setupViewMode() {
    const viewModeToggle = document.querySelector(".panel-close");
    if (viewModeToggle) {
      viewModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("view-mode");
      });
    }
  }
  function setupLayerAccordion() {
    document.querySelectorAll(".layer-accordion__title").forEach(function(btn) {
      btn.addEventListener("click", function() {
        const panel = document.getElementById(
          btn.getAttribute("aria-controls")
        );
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", !expanded);
        if (panel) {
          if (expanded) {
            panel.classList.remove("show");
          } else {
            panel.classList.add("show");
          }
        }
      });
      btn.addEventListener("keydown", function(e) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          btn.click();
        }
      });
    });
    document.querySelectorAll(".layer-accordion__title2").forEach(function(btn) {
      btn.addEventListener("click", function() {
        const panel = document.getElementById(
          btn.getAttribute("aria-controls")
        );
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", !expanded);
        if (panel) {
          if (expanded) {
            panel.classList.remove("show");
          } else {
            panel.classList.add("show");
          }
        }
      });
      btn.addEventListener("keydown", function(e) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }
  function setupOptionPanels() {
    const controlButtons = document.querySelectorAll(".btn-control-popup");
    const optionPanels = document.querySelectorAll(".option-panel");
    const closeButtons = document.querySelectorAll(".option-close");
    const btnControlDistance = document.querySelector(".btn-control-distance");
    const distancePanel = document.querySelector(".distance-panel");
    if (btnControlDistance && distancePanel) {
      btnControlDistance.addEventListener("click", () => {
        const isShow = distancePanel.classList.toggle("show");
        optionPanels.forEach((panel) => {
          if (panel !== distancePanel) {
            panel.classList.remove("show");
          }
        });
        controlButtons.forEach((btn) => {
          if (btn !== btnControlDistance) {
            btn.classList.remove("active");
            btn.classList.remove("show");
            btn.setAttribute("aria-pressed", "false");
          }
        });
        btnControlDistance.classList.toggle("active", isShow);
        btnControlDistance.setAttribute(
          "aria-pressed",
          isShow ? "true" : "false"
        );
      });
    }
    const distancePanelBtns = document.querySelectorAll(".distance-panel-btn");
    distancePanelBtns.forEach((btn) => {
      btn.addEventListener("click", function() {
        const icon = this.querySelector(".svg-icon");
        const text = this.querySelector("span").textContent;
        if (btnControlDistance) {
          const topIcon = btnControlDistance.querySelector(".svg-icon");
          if (topIcon) {
            topIcon.className = "svg-icon";
            if (icon.classList.contains("ico-distance2")) {
              topIcon.classList.add("ico-distance");
            } else if (icon.classList.contains("ico-area")) {
              topIcon.classList.add("ico-area");
            } else if (icon.classList.contains("ico-radius")) {
              topIcon.classList.add("ico-radius");
            }
          }
          const tooltip = btnControlDistance.querySelector(".btn-tooltip");
          if (tooltip) {
            tooltip.textContent = text;
          }
        }
      });
    });
    controlButtons.forEach((button) => {
      button.addEventListener("click", function() {
        const targetId = this.getAttribute("data-option-target");
        const targetPanel = document.querySelector(
          `.option-panel[data-option-panel="${targetId}"]`
        );
        optionPanels.forEach((panel) => {
          if (panel !== targetPanel) {
            panel.classList.remove("show");
          }
        });
        controlButtons.forEach((btn) => {
          if (btn !== this) {
            btn.classList.remove("active");
            btn.classList.remove("show");
            btn.setAttribute("aria-pressed", "false");
          }
        });
        if (distancePanel) {
          distancePanel.classList.remove("show");
        }
        if (btnControlDistance) {
          btnControlDistance.classList.remove("active");
          btnControlDistance.setAttribute("aria-pressed", "false");
        }
        if (targetPanel) {
          const isShow = targetPanel.classList.toggle("show");
          if (isShow) {
            this.classList.add("active");
            this.setAttribute("aria-pressed", "true");
          } else {
            this.classList.remove("active");
            this.setAttribute("aria-pressed", "false");
          }
        }
      });
    });
    closeButtons.forEach((button) => {
      button.addEventListener("click", function() {
        const panel = this.closest(".option-panel");
        if (panel) {
          panel.classList.remove("show");
          const targetId = panel.getAttribute("data-option-target");
          const controlBtn = document.querySelector(
            `.btn-control-popup[data-option-target="${targetId}"]`
          );
          if (controlBtn) {
            controlBtn.classList.remove("active");
            controlBtn.classList.remove("show");
            controlBtn.setAttribute("aria-pressed", "false");
          }
        }
      });
    });
    document.addEventListener("click", function(e) {
      if (!e.target.closest(".option-panel") && !e.target.closest(".btn-control-popup") && !e.target.closest(".distance-panel") && !e.target.closest(".btn-control-distance")) {
        optionPanels.forEach((panel) => {
          panel.classList.remove("show");
        });
        controlButtons.forEach((btn) => {
          btn.classList.remove("active");
          btn.classList.remove("show");
          btn.setAttribute("aria-pressed", "false");
        });
        if (distancePanel) {
          distancePanel.classList.remove("show");
        }
        if (btnControlDistance) {
          btnControlDistance.classList.remove("active");
          btnControlDistance.setAttribute("aria-pressed", "false");
        }
      }
    });
  }
  function setupBufferControls() {
    const bufferInput = document.getElementById("bufferInput");
    const bufferCells = document.querySelectorAll(
      ".area-controls__buffer-cell"
    );
    const btnReset = document.getElementById("btnAreaReset");
    const btnAreaSelect = document.getElementById("btnAreaSelect");
    bufferCells.forEach((cell) => {
      cell.addEventListener("click", function() {
        bufferCells.forEach(
          (c) => c.classList.remove("area-controls__buffer-cell--selected")
        );
        cell.classList.add("area-controls__buffer-cell--selected");
        if (bufferInput) bufferInput.value = cell.dataset.value;
        if (window.onBufferChange) window.onBufferChange(cell.dataset.value);
      });
    });
    if (bufferInput) {
      bufferInput.addEventListener("input", function() {
        bufferCells.forEach(
          (c) => c.classList.remove("area-controls__buffer-cell--selected")
        );
        if (window.onBufferChange) window.onBufferChange(bufferInput.value);
      });
    }
    if (btnReset) {
      btnReset.addEventListener("click", function() {
        if (bufferInput) bufferInput.value = "";
        bufferCells.forEach(
          (c) => c.classList.remove("area-controls__buffer-cell--selected")
        );
        if (window.onBufferReset) window.onBufferReset();
      });
    }
    if (btnAreaSelect) {
      btnAreaSelect.addEventListener("click", function() {
        if (window.onAreaSelect) window.onAreaSelect();
      });
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
