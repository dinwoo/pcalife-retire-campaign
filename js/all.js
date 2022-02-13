"use strict";var isMobile=768<$(window).width(),controller=new ScrollMagic.Controller,rangeInput=document.querySelectorAll(".amount-input"),currentAge=35,retireAge=65,lifeSpan=75,totalAssets=5e5,salary=46e3,incomeReplacementRatio=70,inflation=5,totalInvest=2,insuranceVal=17120,requiredAmount=document.getElementById("requiredAmount"),shortage=document.getElementById("shortage"),rspResult=document.getElementById("rspResult");function PMT(e,t,n,o,a){return o=o||0,a=a||0,0===e?-(n+o)/t:(t=-e*(n*(n=Math.pow(1+e,t))+o)/(n-1),1===a&&(t/=1+e),t)}function calcRequiredAmount(){var e=Math.ceil(salary*(incomeReplacementRatio/100)*(lifeSpan-retireAge)*12);return requiredAmount.innerHTML=formatValWithCommas(e),e}function calcPresentInsuranceValue(e,t,n){return!(0===(e=e/12/100)||!e)&&Math.round(-n*(1-1/Math.pow(1+e,t))/e)}function conv_number(expr,decplaces){for(var str=""+Math.round(eval(expr)*Math.pow(10,decplaces));str.length<=decplaces;)str="0"+str;var decpoint=str.length-decplaces;return str.substring(0,decpoint)+"."+str.substring(decpoint,str.length)}function pv(e,t,n,o){return e=parseFloat(e),t=parseFloat(t),n=parseFloat(n),o=parseFloat(o),0==t?(alert("Why do you want to test me with zeros?"),0):(pv_value=0==e?-(o+n*t):(x=Math.pow(1+e,-t),y=Math.pow(1+e,t),-(x*(o*e-n+y*n))/e),pv_value=conv_number(pv_value,2),pv_value)}function calcCurrentDepositAssets(e,t,n){return e=Math.floor(e),Math.round(e*Math.pow(1.01,t-n))}function calcShortage(){var e=calcRequiredAmount(),t=calcCurrentDepositAssets(totalAssets,retireAge,currentAge),n=calcPresentInsuranceValue(inflation,12*(lifeSpan-retireAge),-1*insuranceVal,0),e=e-n-t;return shortage.innerHTML=formatValWithCommas(e),e}function calcPMT(){var e=calcShortage(),e=Math.floor(PMT(totalInvest/100/12,12*(retireAge-currentAge),0,-1*e,0));return rspResult.innerHTML=formatValWithCommas(e),e}function formatValWithCommas(e){return(e=e.toString()).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function checkIfLimit(e,t){var n=$("#progress-".concat(t)).slider("option","max"),t=$("#progress-".concat(t)).slider("option","min");return(n<e||e<t)&&(n<e?{limit:"more",max:n,min:t}:{limit:"less",max:n,min:t})}function calcValForRangeSlider(e,t){$("#progress-".concat(t)).slider("option","step");$("#progress-".concat(t)).slider("value",e)}function checkWid(e){e<768&&!isMobile?(isMobile=!0,mobileFun()):768<e&&isMobile&&(isMobile=!1,desktopFun())}function mobileFun(){var e=$("#product-carousel");e.owlCarousel({nav:!1,dots:!0,responsive:{0:{loop:!1,items:1}},onInitialize:function(e){$("#productLeftArrow").addClass("disabled")},onChanged:function(e){e.page.index<0?$("#productNowPage").text("01"):$("#productNowPage").text("0".concat(e.page.index+1)),e.page.index<=0?$("#productLeftArrow").addClass("disabled"):6==e.page.index?$("#productRightArrow").addClass("disabled"):($("#productLeftArrow").removeClass("disabled"),$("#productRightArrow").removeClass("disabled"))}}),$("#productLeftArrow").on("click",function(){e.trigger("prev.owl.carousel")}),$("#productRightArrow").on("click",function(){e.trigger("next.owl.carousel")})}function desktopFun(){$("#product-carousel").trigger("destroy.owl.carousel"),$("#productLeftArrow").off("click"),$("#productRightArrow").off("click")}function setCarousel(){$("#carouselBox01").owlCarousel({nav:!1,dots:!0,autoplay:!0,responsive:{0:{loop:!0,items:1},769:{loop:!1,items:3,margin:50},1280:{margin:100}}});var e=$("#carouselBox02").owlCarousel({nav:!1,dots:!0,loop:!1,items:1,center:!0,autoHeight:!0,margin:70,onInitialize:function(e){$(".section02 .title1").fadeIn(),$("#infoNowPage").text("01"),$("#infoLeftArrow").addClass("disabled")},onChanged:function(e){0<=e.page.index&&($("#infoNowPage").text("0".concat(e.page.index+1)),$(".section02 .title").fadeOut(),$(".section02 .title".concat(e.page.index+1)).fadeIn()),e.page.index<=0?$("#infoLeftArrow").addClass("disabled"):3==e.page.index?$("#infoRightArrow").addClass("disabled"):($("#infoLeftArrow").removeClass("disabled"),$("#infoRightArrow").removeClass("disabled"))}});$("#infoLeftArrow").on("click",function(){e.trigger("prev.owl.carousel")}),$("#infoRightArrow").on("click",function(){e.trigger("next.owl.carousel")})}function setSlider(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:100,o=3<arguments.length&&void 0!==arguments[3]?arguments[3]:0,a=4<arguments.length&&void 0!==arguments[4]?arguments[4]:1,i=5<arguments.length?arguments[5]:void 0;$("#progress-".concat(e)).slider({range:"min",min:t,max:n,value:o,step:a,slide:function(e,t){i(t.value)},change:function(e,t){calcRequiredAmount(),calcShortage(),calcPMT()}}),$("#amount-".concat(e)).on("change",function(){$("#progress-".concat(e)).slider("value",$(this).val()),i($(this).val()),calcValForRangeSlider($(this).val(),e)})}function setAnimate(){TweenMax.set(".banner .banner-title,.section01 .title,.section01 .pic,.section02 .title img,.section02 .container,.section03 .title img,.section03 .animate-item,.section04 .wrapper,.section05 .title img,.section05 .form-box,.section06 .title img,.section06 .remind,.section06 .box .item",{opacity:0,y:50}),TweenMax.set(".banner .banner-slogan,.banner .dog-box",{opacity:0}),TweenMax.set(".banner .dadnmom",{opacity:0,x:-100}),TweenMax.set(".banner .papamama",{opacity:0,x:100}),doAnimate((new TimelineMax).add(TweenMax.to(".banner .banner-title",.6,{opacity:1,y:0})).add(TweenMax.to(".banner .dadnmom",.6,{opacity:1,x:0})).add(TweenMax.to(".banner .papamama",.6,{opacity:1,x:0,delay:-.6})).add(TweenMax.to(".banner .banner-slogan",1,{opacity:1})).add(TweenMax.to(".banner .dog-box",.6,{opacity:1,delay:.1})),{triggerElement:".banner",offset:0,reverse:!1},"banner"),doAnimate((new TimelineMax).add(TweenMax.to(".section01 .title",.6,{opacity:1,y:0})).add(TweenMax.staggerTo(".section01 .pic",.6,{opacity:1,y:0},.1)),{triggerElement:".section01",offset:0,reverse:!1},"section01"),doAnimate((new TimelineMax).add(TweenMax.to(".section02 .title img",.6,{opacity:1,y:0})).add(TweenMax.staggerTo(".section02 .container",.6,{opacity:1,y:0},.1)),{triggerElement:".section02",offset:0,reverse:!1},"section02"),doAnimate((new TimelineMax).add(TweenMax.to(".section03 .title img",.6,{opacity:1,y:0})).add(TweenMax.staggerTo(".section03 .animate-item",.6,{opacity:1,y:0},.1)),{triggerElement:".section03",offset:0,reverse:!1},"section03"),doAnimate((new TimelineMax).add(TweenMax.to(".section04 .wrapper",.6,{opacity:1,y:0})),{triggerElement:".section04",offset:0,reverse:!1},"section04"),doAnimate((new TimelineMax).add(TweenMax.to(".section05 .title img",.6,{opacity:1,y:0})).add(TweenMax.to(".section05 .form-box",.6,{opacity:1,y:0})),{triggerElement:".section05",offset:0,reverse:!1},"section05"),doAnimate((new TimelineMax).add(TweenMax.to(".section06 .title img",.6,{opacity:1,y:0})).add(TweenMax.to(".section06 .remind",.6,{opacity:1,y:0})).add(TweenMax.staggerTo(".section06 .box .item",.6,{opacity:1,y:0},.1)),{triggerElement:".section06",offset:0,reverse:!1},"section06")}function doAnimate(e,t,n){return new ScrollMagic.Scene(t).setTween(e).addTo(controller)}$(window).resize(function(){checkWid($(window).width())}),$(document).ready(function(){checkWid($(window).width()),setCarousel(),setAnimate(),setSlider("currentAge",18,74,35,1,function(e){$("#amount-currentAge").val(e),currentAge=e}),setSlider("retireAge",50,75,65,1,function(e){$("#amount-retireAge").val(e),retireAge=e}),setSlider("lifeSpan",66,99,75,1,function(e){$("#amount-lifeSpan").val(e),lifeSpan=e}),setSlider("totalAssets",0,3e3,50,.1,function(e){$("#amount-totalAssets").val(e),totalAssets=1e4*e}),setSlider("salary",2.3,30,4.6,.1,function(e){$("#amount-salary").val(e),salary=1e4*e}),setSlider("incomeReplacementRatio",10,100,70,1,function(e){$("#amount-incomeReplacementRatio").val(e),incomeReplacementRatio=e}),setSlider("inflation",0,5,5,1,function(e){$("#amount-inflation").val(e),inflation=e}),setSlider("totalInvest",0,10,2,1,function(e){$("#amount-totalInvest").val(e),totalInvest=e}),calcRequiredAmount(),calcShortage(),calcPMT(),$("#popupHandler1").on("click",function(){$("#popup1").fadeIn()}),$("#popupHandler2").on("click",function(){$("#popup2").fadeIn()}),$(".close,.mask").on("click",function(){$(this).closest(".popup").fadeOut()}),$("#sendBtn").on("click",function(){$("#name").val()?$("#phone").val()?null!=$("input[name='isPcalife']:checked").val()?"1"!=$("input[name='isPcalife']:checked").val()||$("#identityNumber").val()?$("#personalInformation").is(":checked")?$("#checkBtn").is(":checked")?$.ajax({url:"api/postForm",type:"post",data:{name:$("#name").val(),phone:$("#phone").val(),isPcalife:$("input[name='isPcalife']:checked").val(),identityNumber:$("#identityNumber").val(),currentAge:currentAge,retireAge:retireAge,lifeSpan:lifeSpan,totalAssets:totalAssets,salary:salary,incomeReplacementRatio:incomeReplacementRatio,inflation:inflation,totalInvest:totalInvest,requiredAmount:calcRequiredAmount(),shortage:calcShortage(),rspResult:calcPMT()},success:function(e){alert("成功送出資料")},error:function(e){alert("送出失敗")}}):alert("請確認以上資料正確無誤"):alert("請閱讀並同意個人資料告知暨同意事項"):alert("請輸入身分證字號"):alert("請確認是否已經是保誠保戶"):alert("請填寫電話"):alert("請填寫姓名")})});
//# sourceMappingURL=all.js.map
