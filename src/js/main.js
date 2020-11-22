(function (window) {
  "use strict";

  var swiper = new Swiper(".swiper-container--about ", {
    direction: "vertical",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  // All Funtions
  PageTransition();
  Fullscreen();
  HomeSlider();
  Sort();
  UniteGallery();
  preloader(true, "black", "green");
})(window);

/*------------------
Page Transition
-------------------*/
function PageTransition() {
  var preload = anime({
    targets: ".ms-preloader",
    opacity: [1, 0],
    duration: 1000,
    easing: "easeInOutCubic",
    complete: function (preload) {
      $(".ms-preloader").css("visibility", "hidden");
    },
  });
  $(".ms-main-container").addClass("loaded");
  var cont = anime({
    targets: ".loaded",
    opacity: [0, 1],
    easing: "easeInOutCubic",
    duration: 1000,
    delay: 300,
    complete: function (preload) {
      $(".ug-thumb-image").css({
        opacity: "1",
      });
      $(".ms-section__block img").css({
        opacity: "1",
      });
      $(".ug-thumb-wrapper, .post-item").css({
        "pointer-events": "auto",
      });
    },
  });
  $(document).on("click", '[data-type="page-transition"]', function (e) {
    var url = $(this).attr("href");
    if (url != "#" && url != "") {
      e.preventDefault();
      $(".ms-preloader").css("visibility", "visible");
      var url = $(this).attr("href");
      var preload = anime({
        targets: ".ms-preloader",
        opacity: [0, 1],
        duration: 300,
        easing: "easeInOutQuad",
        complete: function (preload) {
          window.location.href = url;
        },
      });
    }
  });
}

/*------------------
 Home Slider
-------------------*/
function HomeSlider() {
  if ($.exists(".swiper-container")) {
    var interleaveOffset = -0.6;
    var interleaveEffect = {
      onProgress: function (swiper, progress) {
        for (var i = 0; i < swiper.slides.length; i++) {
          var slide = swiper.slides[i];
          var translate, innerTranslate;
          progress = slide.progress;
          if (progress > 0) {
            translate = progress * swiper.width;
            innerTranslate = translate * interleaveOffset;
          } else {
            innerTranslate =
              Math.abs(progress * swiper.width) * interleaveOffset;
            translate = 0;
          }
          $(slide).css({
            transform: "translate3d(" + translate + "px,0,0)",
          });
          $(slide)
            .find(".slide-inner")
            .css({
              transform: "translate3d(" + innerTranslate + "px,0,0)",
            });
        }
      },
      onTouchStart: function (swiper) {
        for (var i = 0; i < swiper.slides.length; i++) {
          $(swiper.slides[i]).css({
            transition: "",
          });
        }
      },
      onSetTransition: function (swiper, speed) {
        for (var i = 0; i < swiper.slides.length; i++) {
          $(swiper.slides[i])
            .find(".slide-inner")
            .addBack()
            .css({
              transition: speed + "ms",
            });
        }
      },
    };
    var swiperOptions = {
      loop: false,
      speed: 1000,
      grabCursor: false,
      watchSlidesProgress: true,
      mousewheelControl: true,
      keyboardControl: true,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      simulateTouch: false,
      pagination: ".swiper-pagination",
      paginationType: "progress",
      onSlideChangeEnd: function () {
        $(".expanded-timeline__counter span:first-child").text(
          swiper.activeIndex + 1
        );
      },
    };
    swiperOptions = $.extend(swiperOptions, interleaveEffect);
    var swiper = new Swiper(".swiper-container", swiperOptions);
    $(".expanded-timeline__counter span:first-child").text("1");
    $(".expanded-timeline__counter span:last-child").text(swiper.slides.length);
  }
}

/*------------------
Sort
-------------------*/
function Sort() {
  if ($.exists(".filtr-container")) {
    $(".filtr-container").filterizr();
    $(".filtr-btn li").on("click", function () {
      $(".filtr-btn li").removeClass("active");
      $(this).addClass("active");
    });
  }
}
/*------------------
Unite-Gallery
-------------------*/
function UniteGallery() {
  if ($.exists("#gallery")) {
    $("#gallery").unitegallery({
      gallery_theme: "tiles",
      tiles_type: "justified",
      tiles_col_width: 400,
      tiles_justified_row_height: 400,
      tiles_justified_space_between: 30,
      // tile_overlay_color: "#000",
      tile_overlay_opacity: 0.7,
      tile_enable_icons: false,
      tile_textpanel_position: "inside_bottom",
    });
  }
}
/*------------------
Menu
-------------------*/
function Fullscreen() {
  $(".open-menu").removeAttr("disabled");

  $("div.header").on("click", ".open-menu", function () {
    $(this)
      .addClass("close-menu")
      .removeClass("open-menu")
      .attr("disabled", "disabled");
    $(".container").addClass("blur");
    setTimeout(function () {
      $(".close-menu").removeAttr("disabled");
    }, 1100);
    $(".float-nav").show();
    setTimeout(function () {
      $(".float-nav").addClass("active");
    }, 100);
  });
  function fechaMenu() {
    $(".close-menu")
      .removeClass("close-menu")
      .addClass("open-menu")
      .attr("disabled", "disabled");
    $(".float-nav").removeClass("active");
    setTimeout(function () {
      $(".float-nav").hide();
      $(".open-menu").removeAttr("disabled");
    }, 1100);
  }
  $("div.header").on("click", ".close-menu", function () {
    fechaMenu();
  });
  $(".float-nav ul li").on("click", "a", function () {
    fechaMenu();
  });
}
/*----------------------------------------
        PRELOADER
  -----------------------------------------*/
function preloader(immune, background, color) {
  $("body").prepend(
    '<div class="preloader"><span class="loading-bar"></span><i class="radial-loader"></i></div>'
  );
  if (immune == true) {
    $("body > div.preloader").addClass("immune");
  }
  if (background == "white") {
    $("body > div.preloader").addClass("white");
  } else if (background == "black") {
    $("body > div.preloader").addClass("black");
  }
  if (color == "red") {
    $("body > div.preloader span.loading-bar").addClass("red-colored");
    $("body > div.preloader i.radial-loader").addClass("red-colored");
  } else if (color == "blue") {
    $("body > div.preloader span.loading-bar").addClass("blue-colored");
    $("body > div.preloader i.radial-loader").addClass("blue-colored");
  } else if (color == "green") {
    $("body > div.preloader span.loading-bar").addClass("green-colored");
    $("body > div.preloader i.radial-loader").addClass("green-colored");
  } else if (color == "yellow") {
    $("body > div.preloader span.loading-bar").addClass("yellow-colored");
    $("body > div.preloader i.radial-loader").addClass("yellow-colored");
  }
  $(document).ready(function () {
    setTimeout(function () {
      $(".preloader").fadeOut(1000);
    }, 1000);
    setTimeout(function () {
      $(".preloader").remove();
    }, 2000);
  });
}
