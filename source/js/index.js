let fun = () => {
  $(document).ready(function () {
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
          margin: 100,
        },
      },
    });
  });
};

fun();
