let isMobile = $(window).width() > 768;

$(window).resize(function () {
  let windowSize = $(window).width();
  checkWid(windowSize);
});

function checkWid(windowSize) {
  if (windowSize < 768 && !isMobile) {
    isMobile = true;
    mobileFun();
  } else if (windowSize > 768 && isMobile) {
    isMobile = false;
    desktopFun();
  }
}

function mobileFun() {
  let prodcutOwl = $("#product-carousel");
  prodcutOwl.owlCarousel({
    nav: false,
    dots: true,
    responsive: {
      0: {
        loop: true,
        items: 1,
      },
    },
    onChanged: (event) => {
      if (event.page.index < 0) {
        $("#productNowPage").text(`01`);
      } else {
        $("#productNowPage").text(`0${event.page.index + 1}`);
      }
    },
  });
  $("#productLeftArrow").on("click", () => {
    prodcutOwl.trigger("prev.owl.carousel");
  });
  $("#productRightArrow").on("click", () => {
    prodcutOwl.trigger("next.owl.carousel");
  });
}

function desktopFun() {
  $("#product-carousel").trigger("destroy.owl.carousel");
  $("#productLeftArrow").off("click");
  $("#productRightArrow").off("click");
}

function setSlider(slideEl, inputEl, min = 0, max = 100, v = 0, s = 1) {
  slideEl.slider({
    range: "min",
    min: min,
    max: max,
    value: v,
    step: s,
    slide: function (event, ui) {
      inputEl.val(ui.value);
    },
  });
  inputEl.on("change", function () {
    slideEl.slider("value", $(this).val());
  });
}

$(document).ready(function () {
  checkWid($(window).width());

  setSlider($("#progressbar1"), $("#amount1"), 18, 74, 35, 1);
  setSlider($("#progressbar2"), $("#amount2"), 50, 75, 65, 1);
  setSlider($("#progressbar3"), $("#amount3"), 66, 99, 75, 1);
  setSlider($("#progressbar4"), $("#amount4"), 0, 3000, 50, 0.1);
  setSlider($("#progressbar5"), $("#amount5"), 2.3, 30, 4.6, 0.1);
  setSlider($("#progressbar6"), $("#amount6"), 10, 100, 70, 1);
  setSlider($("#progressbar7"), $("#amount7"), 0, 5, 5, 1);
  setSlider($("#progressbar8"), $("#amount8"), 0, 10, 2, 1);

  $("#carouselBox01").owlCarousel({
    nav: false,
    dots: true,
    autoplay: true,
    responsive: {
      0: {
        loop: true,
        items: 1,
      },
      769: {
        loop: false,
        items: 3,
        margin: 50,
      },
      1280: {
        margin: 100,
      },
    },
  });

  let infoOwl = $("#carouselBox02").owlCarousel({
    nav: false,
    dots: true,
    loop: true,
    items: 1,
    center: true,
    autoHeight: true,
    margin: 70,
    onChanged: (event) => {
      if (event.page.index < 0) {
        $("#infoNowPage").text(`01`);
      } else {
        $("#infoNowPage").text(`0${event.page.index + 1}`);
      }
    },
  });
  $("#infoLeftArrow").on("click", () => {
    infoOwl.trigger("prev.owl.carousel");
  });
  $("#infoRightArrow").on("click", () => {
    infoOwl.trigger("next.owl.carousel");
  });
});
