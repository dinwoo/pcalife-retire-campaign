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

  setSlider($("#test"), $("#amount"));
  setSlider($("#test2"), $("#amount2"), 200, 500, 300, 10);

  $("#carousel-box").owlCarousel({
    nav: false,
    dots: true,
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
});
