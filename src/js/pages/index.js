  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
  ScrollSmoother.create({
    wrapper: "#smoother-wrapper",
    content: "#smoother-content",
    smooth: 2,
    speed: 1,
    normalizeScroll: true,
    ignoreMobileResize: true,
    smoothTouch: 0.1,
    effects: true,
    preventDefault: true,
    normalizeScroll: { allowNestedScroll: true }
  });
  


  const sublayout__breadcrumb = document.querySelector(".sublayout__breadcrumb");
  const sublayout__page = document.querySelector(".sublayout__page");
  const sublayout__desc = document.querySelector(".sublayout__desc");
  const sublayout__title = document.querySelector(".sublayout__title");
  const sublayoutTitle = document.querySelector(".sublayout__title");
  const sublayoutPoint = sublayoutTitle?.querySelector(".point b");
  const sublayoutImage = document.querySelector(".image-background img");

  // gsap set으로 기본 상태 지정
  gsap.set(sublayout__breadcrumb, { opacity: 0, x: -20 });
  gsap.set(sublayoutImage, {  scale: 1.15 });
  gsap.set(sublayout__page, { opacity: 0, filter: "blur(20px)" });
  gsap.set(sublayout__desc, { opacity: 0, filter: "blur(20px)" });
  gsap.set(sublayoutPoint, { opacity: 0, y: 30});

  // sublayout
  const sublayoutTimeline = gsap.timeline();
  
  // 초기 텍스트 등장
  sublayoutTimeline.to(".sublayout__breadcrumb", {
      opacity: 1,
      x: 1,
      duration: 0.8,
  })
  .to(sublayoutImage, {
    scale: 1,
    duration: 3,
  }, "-=0.6")
  .to(sublayout__page, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 1.2,
  }, "<")
  .to(sublayout__desc, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 1.2,
  }, "<")
  .to(sublayoutPoint, {
    opacity: 1,
    y: 0,
    delay: 0.6,
    blur: 0,
    duration: 1,
  },">");



  window.addEventListener("resize", () => {
    ScrollSmoother.update();
    ScrollSmoother.refresh();
    ScrollTrigger.refresh();
  });