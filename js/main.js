import LocomotiveScroll from 'locomotive-scroll';

let locomotiveScrollObj = null;

$(function () {
  $('.tokenslider').slick({
    centerMode: true,
    slidesToShow: 5,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

$(function () {
  $('.ourAdviser-slide').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  });
});

$(function () {
  $('.exploreAppSlide').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    fade: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          fade: true,
          infinite: true,
          dots: false,
        },
      },
    ],
  });
});

$(function () {
  $('#showNav').on('click', function () {
    $('.wh-navbar').addClass('mobileNav');
  });

  $('.closeNav').on('click', function () {
    $('.wh-navbar').removeClass('mobileNav');
  });

  handleSubmit();
  handleCloseAlert();
  observeFooter();
  screenSlider();
});

function screenSlider() {
  $('.explore-app-slider').slick({
    dots: false,
    arrows: false,
    autoplay: true,
  });
}

function observeFooter() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        locomotiveScrollObj.update();
        observer.disconnect();
      }
    });
  });

  observer.observe($('.subscribe-form').get(0));
}

function handleCloseAlert() {
  $('body').on('click', '[data-bs-dismiss="alert"]', function () {
    $(this).parent('.alert').remove();
  });
}

document.addEventListener('readystatechange', function () {
  if (document.readyState === 'complete') {
    setTimeout(() => {
      locomotiveScrollObj = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
      });

      window.locomotiveScrollObj = locomotiveScrollObj;

      document.querySelector('.wa-loader').classList.add('is-hide');
      document.querySelector('body').classList.remove('overflow-hidden');
    }, 2500);
  }
});

function getBrowserName(userAgent) {
  // The order matters here, and this may report false positives for unlisted browsers.

  if (userAgent.includes('Firefox')) {
    // "Mozilla/5.0 (X11; Linux i686; rv:104.0) Gecko/20100101 Firefox/104.0"
    return 'Mozilla Firefox';
  } else if (userAgent.includes('SamsungBrowser')) {
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36"
    return 'Samsung Internet';
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 OPR/90.0.4480.54"
    return 'Opera';
  } else if (userAgent.includes('Trident')) {
    // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)"
    return 'Microsoft Internet Explorer';
  } else if (userAgent.includes('Edge')) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    return 'Microsoft Edge (Legacy)';
  } else if (userAgent.includes('Edg')) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Edg/104.0.1293.70"
    return 'Microsoft Edge (Chromium)';
  } else if (userAgent.includes('Chrome')) {
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    return 'Google Chrome or Chromium';
  } else if (userAgent.includes('Safari')) {
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1"
    return 'Apple Safari';
  } else {
    return 'unknown';
  }
}

function handleSubmit() {
  const posturl =
    'https://prod-34.westeurope.logic.azure.com/workflows/0943c4d8b695471695459bb4de60effc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7Kf5Bi2x1DAQq7Nty9zaEQqRxJZ23BR4B9OfsQHbg3g';
  $('.subscribe-form, .rateEart-sendEmail-form').on('submit', function (e) {
    e.preventDefault();

    const $self = $(this);

    const $input = $(this).find('[type=email]');

    $(this).next('.alert').remove();

    function makeRequest(ip) {
      const inputData = `{
        email: ${$input.val()},
        browserName: ${getBrowserName(navigator.userAgent)},
        ipAddress: ${ip}
      }`;

      $.post(posturl, inputData)
        .done((_d, _x, xhr) => {
          if (xhr.status === 200) {
            $self.append(
              `<div class="alert alert-dismissible alert-success">
              Submit Successfully. Thank you!
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
            );
          } else {
            dangerAlert();
          }
          $input.val('');
        })
        .catch(dangerAlert);
    }

    const dangerAlert = () =>
      $(this).append(
        `<div class="alert alert-dismissible alert-danger">
          Something went wrong. Try again later.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
      );

    $.get('https://api.ipify.org/')
      .done((ip) => {
        makeRequest(ip);
      })
      .fail(() => {
        makeRequest('N/A');
      });
  });
}
