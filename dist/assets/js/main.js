(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
document.addEventListener("DOMContentLoaded", function() {
  const gnbItems = document.querySelectorAll(".gnb-lv1");
  const headerBottom = document.querySelector(".header-bottom");
  gnbItems.forEach((item) => {
    const submenu = item.querySelector(".gnb-submenu");
    if (submenu) {
      item.addEventListener("mouseenter", function() {
        document.querySelectorAll(".gnb-submenu").forEach((sm) => {
          sm.style.display = "none";
          sm.classList.remove("toBottom");
        });
        document.querySelectorAll(".gnb-lv1").forEach((li) => {
          li.classList.remove("active");
        });
        submenu.style.display = "block";
        submenu.classList.add("toBottom");
        item.classList.add("active");
        headerBottom.style.height = "254px";
      });
      item.addEventListener("mouseleave", function() {
        submenu.style.display = "none";
        submenu.classList.remove("toBottom");
        item.classList.remove("active");
        headerBottom.style.height = "0";
      });
    }
  });
  const asideMenu = document.querySelector(".aside-menu");
  const asideOpenBtn = document.querySelector("#asideOpen");
  const asideCloseBtn = document.querySelector("#asideClose");
  if (asideOpenBtn) {
    asideOpenBtn.addEventListener("click", function() {
      asideMenu.style.display = "flex";
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        asideMenu.style.left = "0%";
      }, 10);
    });
  }
  if (asideCloseBtn) {
    asideCloseBtn.addEventListener("click", function() {
      asideMenu.style.left = "100%";
      setTimeout(() => {
        asideMenu.style.display = "none";
        document.body.style.overflow = "";
      }, 300);
    });
  }
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", function() {
      const submenu = btn.closest("li").querySelector(".mobile-menu-submenu");
      if (submenu) {
        const isActive = submenu.style.display === "block";
        document.querySelectorAll(".mobile-menu-submenu").forEach((menu) => {
          menu.style.display = "none";
        });
        document.querySelectorAll(".toggle-btn").forEach((toggleBtn) => {
          toggleBtn.classList.remove("active");
        });
        if (!isActive) {
          submenu.style.display = "block";
          btn.classList.add("active");
        }
      }
    });
  });
});
