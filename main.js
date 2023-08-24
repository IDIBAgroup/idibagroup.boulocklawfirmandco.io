/**
 * Website Name: Aser Boulock Law Office - v1.0.0
 * Author: Idiba Group
 *  Website Url: https://idibagroup.com
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Initiate  glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */

  /**
   * Init swiper slider with 1 slide at once in desktop view*/
   
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 2 slides at once in desktop view*/
   
  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });
  
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });
})();


// Videos players


const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');

const controlsContainer = document.querySelector('.controls-container');
const leftSideControls = document.querySelector('.left-side-controls');

const volumeControl = document.querySelector('.volume-control');
const volumePanel = document.querySelector('.volume-panel');
const volumeRange = volumePanel.querySelector('input');
const volumeProgress = volumePanel.querySelector('.volume-progress');

const playPauseButton = document.querySelector('.play-pause-btn');
const volumeButton = document.querySelector('.volume-btn');
const fullScreenButton = document.querySelector('.full-screen-btn');
const playButton = playPauseButton.querySelector('.play');
const pauseButton = playPauseButton.querySelector('.pause');
const fullVolumeButton = volumeButton.querySelector('.full-volume');
const halfVolumeButton = volumeButton.querySelector('.half-volume');
const mutedButton = volumeButton.querySelector('.muted');
const maximizeButton = fullScreenButton.querySelector('.maximize');
const minimizeButton = fullScreenButton.querySelector('.minimize');

const progressBar = document.querySelector('.progress-bar');
const watchedBar = document.querySelector('.watched-bar');
const playHead = document.querySelector('.playhead');

const current_time = document.querySelector('.current-time');
const video_duration = document.querySelector('.video-duration');

pauseButton.style.display = 'none';
halfVolumeButton.style.display = 'none';
mutedButton.style.display = 'none';
minimizeButton.style.display = 'none';

window.onresize = function () {
    var width = window.innerWidth - 30;
    controlsContainer.style.width = width + 'px';
}

document.addEventListener('DOMContentLoaded', function () {
    var width = window.innerWidth - 30;
    controlsContainer.style.width = width + 'px';
});

const playPause = () => {
    if (video.paused) {
        video.play();
        playButton.style.display = 'none';
        pauseButton.style.display = '';
    } else {
        video.pause();
        playButton.style.display = '';
        pauseButton.style.display = 'none';
    }
};

const toggleMute = () => {
    video.muted = !video.muted;
    if (video.muted) {
        fullVolumeButton.style.display = 'none';
        halfVolumeButton.style.display = 'none';
        mutedButton.style.display = '';
        volumeRange.value = '0';
    } else {
        volumeRange.value = video.volume * 100;

        if (video.volume <= 0.5) {
            fullVolumeButton.style.display = 'none';
            halfVolumeButton.style.display = '';
            mutedButton.style.display = 'none';
        } else if (video.volume > 0.5) {
            fullVolumeButton.style.display = '';
            halfVolumeButton.style.display = 'none';
            mutedButton.style.display = 'none';
        }      
    }
};

const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
        maximizeButton.style.display = '';
        minimizeButton.style.display = 'none';
    } else {
        maximizeButton.style.display = 'none';
        minimizeButton.style.display = '';
    }
});

video.addEventListener('timeupdate', function() {
    var watched = 100 / video.duration * video.currentTime;
    watchedBar.style.width = watched + '%';
    playHead.style.left = watched + '%';

    // current time
    var currentHours = Math.floor(video.currentTime / 3600);
    var currentMinutes = Math.floor(video.currentTime / 60 % 60);
    var currentSeconds = Math.floor(video.currentTime % 60);
    if ((video.currentTime >= 600) && (currentMinutes < 10)) {
        currentMinutes = '0' + currentMinutes;
    }
    current_time.textContent = `${currentHours ? currentHours+':' : ''}${currentMinutes}:${currentSeconds >= 10 ? currentSeconds : '0'+currentSeconds}`;
    
    if(video.ended) {
        playButton.style.display = '';
        pauseButton.style.display = 'none';
    }
});

// video duration
var i = setInterval(function() {
    if (video.readyState > 0) {
        var hours = Math.floor(video.duration / 3600);
        var minutes = Math.floor(video.duration / 60 % 60);
        var seconds = Math.floor(video.duration % 60);
        if ((video.duration >= 600) && (minutes < 10)) {
            minutes = '0' + minutes;
        }
        video_duration.textContent = `${hours ? hours+':' : ''}${minutes}:${seconds >= 10 ? seconds : '0'+seconds}`;
        clearInterval(i);
    }
});

progressBar.addEventListener('mousedown', function(event) {
    const pos = (event.pageX - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
    video.currentTime = pos * video.duration;
}); 


video.addEventListener('click', playPause);

video.addEventListener('dblclick', toggleFullScreen);

playPauseButton.addEventListener('click', playPause);

volumeButton.addEventListener('click', toggleMute);

fullScreenButton.addEventListener('click', toggleFullScreen);

volumeRange.addEventListener('input', function(e) {
    volumeProgress.style.width = volumeRange.value + '%';

    video.volume = volumeRange.value / 100;

    if (volumeRange.value <= 0) {
        fullVolumeButton.style.display = 'none';
        halfVolumeButton.style.display = 'none';
        mutedButton.style.display = '';
    } else if (volumeRange.value <= 50) {
        video.muted = false;
        fullVolumeButton.style.display = 'none';
        halfVolumeButton.style.display = '';
        mutedButton.style.display = 'none';
    } else if (volumeRange.value > 50) {
        video.muted = false;
        fullVolumeButton.style.display = '';
        halfVolumeButton.style.display = 'none';
        mutedButton.style.display = 'none';
    }
}, false);

volumeButton.addEventListener('mouseenter', function() {
    volumeControl.style.margin = '0px 2px 0px 0px';
    volumePanel.style.width = '52px';
});

leftSideControls.addEventListener('mouseleave', function() {
    volumeControl.style.margin = '0px 0px 0px 0px';
    volumePanel.style.width = '0px';
});

setInterval(function() {
    volumeProgress.style.width = volumeRange.value + '%';
}, 1);