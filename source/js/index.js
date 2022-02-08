$(window).resize(function () {
  let windowsize = $(window).width();
  console.log(windowsize);
  let prodcutOwl = $("#product-carousel");
  if (windowsize < 768) {
    prodcutOwl.owlCarousel({
      nav: false,
      dots: true,
      responsive: {
        0: {
          loop: true,
          items: 3,
        },
      },
    });
    $("#productLeftArrow").on("click", () => {
      prodcutOwl.trigger("prev.owl.carousel");
    });
    $("#productRightArrow").on("click", () => {
      prodcutOwl.trigger("next.owl.carousel");
    });
  } else {
    prodcutOwl.trigger("destroy.owl.carousel");
  }
});

$(document).ready(function () {
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
