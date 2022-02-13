let isMobile = $(window).width() > 768;

//-- range slider part
let rangeInput = document.querySelectorAll(".amount-input");
let currentAge = 35,
  retireAge = 65,
  lifeSpan = 75,
  totalAssets = 500000,
  salary = 46000,
  incomeReplacementRatio = 70,
  inflation = 5,
  totalInvest = 2;
let insuranceVal = 17120;

let requiredAmount = document.getElementById("requiredAmount");
let shortage = document.getElementById("shortage");
let rspResult = document.getElementById("rspResult");

function PMT(ir, np, pv, fv, type) {
  /*
   * ir   - interest rate per month
   * np   - number of periods (months)
   * pv   - present value
   * fv   - future value
   * type - when the payments are due:
   *        0: end of the period, e.g. end of month (default)
   *        1: beginning of period
   */
  var pmt, pvif;
  fv || (fv = 0);
  type || (type = 0);

  if (ir === 0) return -(pv + fv) / np;

  pvif = Math.pow(1 + ir, np);
  pmt = (-ir * (pv * pvif + fv)) / (pvif - 1);

  if (type === 1) pmt /= 1 + ir;

  console.log("pmt in function:" + pmt);
  return pmt;
}

function calcRequiredAmount() {
  var requiredAmountVal = Math.ceil(
    salary * (incomeReplacementRatio / 100) * (lifeSpan - retireAge) * 12
  );
  requiredAmount.innerHTML = formatValWithCommas(requiredAmountVal);
  return requiredAmountVal;
}

// calc present insurance value
function calcPresentInsuranceValue(rate, nper, pmt) {
  rate = rate / 12 / 100;
  if (rate === 0 || !rate) {
    return false;
  } else {
    var val = Math.round((-pmt * (1 - 1 / Math.pow(1 + rate, nper))) / rate);
    return val;
  }
}

// This function is from David Goodman's Javascript Bible.
function conv_number(expr, decplaces) {
  var str = "" + Math.round(eval(expr) * Math.pow(10, decplaces));
  while (str.length <= decplaces) {
    str = "0" + str;
  }

  var decpoint = str.length - decplaces;
  return str.substring(0, decpoint) + "." + str.substring(decpoint, str.length);
}
// Parameters are rate, total number of periods, payment made each period and future value
function pv(rate, nper, pmt, fv) {
  rate = parseFloat(rate);
  nper = parseFloat(nper);
  pmt = parseFloat(pmt);
  fv = parseFloat(fv);
  if (nper == 0) {
    alert("Why do you want to test me with zeros?");
    return 0;
  }
  if (rate == 0) {
    // Interest rate is 0
    pv_value = -(fv + pmt * nper);
  } else {
    x = Math.pow(1 + rate, -nper);
    y = Math.pow(1 + rate, nper);
    pv_value = -(x * (fv * rate - pmt + y * pmt)) / rate;
  }
  pv_value = conv_number(pv_value, 2);
  return pv_value;
}

//--------

//calc total deposit assets 計算活儲資產
function calcCurrentDepositAssets(totalAssets, retireAge, currentAge) {
  totalAssets = Math.floor(totalAssets);
  // var periods = retireAge - currentAge;
  return Math.round(totalAssets * Math.pow(1.01, retireAge - currentAge));
}

function calcShortage() {
  var requiredAmountVal = calcRequiredAmount();
  var currentDepositAssets = calcCurrentDepositAssets(
    totalAssets,
    retireAge,
    currentAge
  );
  var presentValueOfInsurance = calcPresentInsuranceValue(
    inflation,
    (lifeSpan - retireAge) * 12,
    insuranceVal * -1,
    0
  );

  // var ppPV = pv(inflation / 100 / 12, (lifeSpan - retireAge) * 12, insuranceVal * -1, 0);

  var shortageVal =
    requiredAmountVal - presentValueOfInsurance - currentDepositAssets;
  console.log("currentDepositAssets:" + currentDepositAssets);
  console.log("presentValueOfInsurance:" + presentValueOfInsurance);

  // console.log('ppPV:' + ppPV);

  shortage.innerHTML = formatValWithCommas(shortageVal);
  return shortageVal;
}

function calcPMT() {
  // alert('call pmt');
  var shortageVal = calcShortage();
  var pmtV = Math.floor(
    PMT(
      totalInvest / 100 / 12,
      (retireAge - currentAge) * 12,
      0,
      shortageVal * -1,
      0
    )
  );
  console.log("pmtV:" + pmtV);
  rspResult.innerHTML = formatValWithCommas(pmtV);
  return pmtV;
}

function formatValWithCommas(val) {
  val = val.toString();
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// check if input value over max / below min
function checkIfLimit(value, progressName) {
  var maxV = $(`#progress-${progressName}`).slider("option", "max");
  var minV = $(`#progress-${progressName}`).slider("option", "min");
  // console.log(maxV);
  if (value > maxV || minV > value) {
    if (value > maxV) {
      return { limit: "more", max: maxV, min: minV };
    } else {
      return { limit: "less", max: maxV, min: minV };
    }
  } else {
    return false;
  }
}

// check return value for ui slider
function calcValForRangeSlider(value, progressName) {
  console.log(value);
  console.log(progressName);
  var step = $(`#progress-${progressName}`).slider("option", "step");
  console.log(step);
  $(`#progress-${progressName}`).slider("value", value);
}

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

function setCarousel() {
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
}

function setSlider(
  progressName,
  min = 0,
  max = 100,
  v = 0,
  s = 1,
  setVariable
) {
  $(`#progress-${progressName}`).slider({
    range: "min",
    min: min,
    max: max,
    value: v,
    step: s,
    slide: function (event, ui) {
      setVariable(ui.value);
    },
    change: function (event, ui) {
      calcRequiredAmount();
      calcShortage();
      calcPMT();
    },
  });
  $(`#amount-${progressName}`).on("change", function () {
    $(`#progress-${progressName}`).slider("value", $(this).val());
    setVariable($(this).val());
    calcValForRangeSlider($(this).val(), progressName);
  });
}

$(document).ready(function () {
  checkWid($(window).width());
  setCarousel();

  setSlider("currentAge", 18, 74, 35, 1, (val) => {
    $(`#amount-currentAge`).val(val);
    currentAge = val;
  });
  setSlider("retireAge", 50, 75, 65, 1, (val) => {
    $(`#amount-retireAge`).val(val);
    retireAge = val;
  });
  setSlider("lifeSpan", 66, 99, 75, 1, (val) => {
    $(`#amount-lifeSpan`).val(val);
    lifeSpan = val;
  });
  setSlider("totalAssets", 0, 3000, 50, 0.1, (val) => {
    $(`#amount-totalAssets`).val(val);
    totalAssets = val * 10000;
  });
  setSlider("salary", 2.3, 30, 4.6, 0.1, (val) => {
    $(`#amount-salary`).val(val);
    salary = val * 10000;
  });
  setSlider("incomeReplacementRatio", 10, 100, 70, 1, (val) => {
    $(`#amount-incomeReplacementRatio`).val(val);
    incomeReplacementRatio = val;
  });
  setSlider("inflation", 0, 5, 5, 1, (val) => {
    $(`#amount-inflation`).val(val);
    inflation = val;
  });
  setSlider("totalInvest", 0, 10, 2, 1, (val) => {
    $(`#amount-totalInvest`).val(val);
    totalInvest = val;
  });

  calcRequiredAmount();
  calcShortage();
  calcPMT();

  $("#popupHandler1").on("click", () => {
    $("#popup1").fadeIn();
  });
  $("#popupHandler2").on("click", () => {
    $("#popup2").fadeIn();
  });
  $(".close,.mask").on("click", function () {
    $(this).closest(".popup").fadeOut();
  });
});
