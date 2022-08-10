(function($) {
    "use strict";



    function highlighterAction() {}

    function highlighter() {
        setTimeout(function() {
            highlighterAction();
        }, 200);
    }

    if (document.readyState == 'complete') {
        highlighter();
    } else {
        document.onreadystatechange = function() {
            if (document.readyState === "complete") {
                highlighter();
                var preloaderFadeOutTime = 500;

                function hidePreloader() {
                    var preloader = $('.spinner-wrapper');
                    setTimeout(function() {
                        preloader.fadeOut(preloaderFadeOutTime);
                    }, 1000);
                }
                hidePreloader();
            }
        }
    }


    $(window).on('scroll load', function() {
        if ($(".navbar").offset().top > 60) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });


    $(function() {
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    $(".navbar-nav li a").on("click", function(event) {
        if (!$(this).parent().hasClass('dropdown'))
            $(".navbar-collapse").collapse('hide');
    });


    var imageSlider = new Swiper('.image-slider', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        spaceBetween: 30,
        slidesPerView: 5,
        breakpoints: {
            516: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            991: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1199: {
                slidesPerView: 4,
                spaceBetween: 30
            },
        }
    });

    var oneimageSlider = new Swiper('.oneimage-slider', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        loop: false,
        spaceBetween: 60,
        slidesPerView: 1
    });


    $('.popup-link').magnificPopup({
        removalDelay: 300,
        type: 'image',
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure ' + this.st.el.attr('data-effect'));
            },
            beforeClose: function() {
                $('.mfp-figure').addClass('fadeOut');
            }
        },
        gallery: {
            enabled: true
        }
    });


    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: function(url) {
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if (!m || !m[1]) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: function(url) {
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if (!m || !m[5]) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });


    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });


    var a = 0;
    $(window).scroll(function() {
        if ($('#counter').length) {
            var oTop = $('#counter').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function() {
                    var $this = $(this),
                        countTo = $this.attr('data-count');
                    $({
                        countNum: $this.text()
                    }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    });
                });
                a = 1;
            }
        }
    });


    $("input, textarea").keyup(function() {
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });


    $("#privacyForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
        var name = $("#pname").val();
        var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();

        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms,
            success: function(text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
    }

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });

    $(".button, a, button").mouseup(function() {
        $(this).blur();
    });

    function copy(that) {
        var inp = document.createElement('input');
        document.body.appendChild(inp)
        inp.value = that.textContent
        inp.select();
        document.execCommand('copy', false);
        inp.remove();
    }

})(jQuery);

function closePopup() {
    document.getElementsByClassName("popup")[0].classList.remove("active");
    document.getElementsByClassName("page-mask")[0].classList.remove("active");
}

function copyAddress() {
    let text = document.getElementsByClassName("crypto-address")[0]
    navigator.clipboard.writeText(text.textContent.split(" ")[1]);
    if (text.textContent.includes("copy: ")) { text.textContent = text.textContent.replace("copy: ", "copied! "); }
    setTimeout(() => {
        text.textContent = text.textContent.replace("copied! ", "copy: ");
    }, 3000);
}

function segwit() {
    document.getElementsByClassName("qrcode")[0].src = "/images/SegWit.png";
    document.getElementsByClassName("title")[0].textContent = "Bitcoin SegWit";
    document.getElementsByClassName("crypto-address")[0].textContent = "copy: bc1q6jpzd0a8maau0keww0ny4zmgemqs9gk0pdc7dx";

    document.getElementsByClassName("popup")[0].classList.add("active");
    document.getElementsByClassName("page-mask")[0].classList.add("active");
}

function legacy() {
    document.getElementsByClassName("qrcode")[0].src = "/images/Legacy.png";
    document.getElementsByClassName("title")[0].textContent = "Bitcoin Legacy";
    document.getElementsByClassName("crypto-address")[0].textContent = "copy: 1EmyPC2Yb1AQhENvRN1tfH57iE3YfxW2Jg";

    document.getElementsByClassName("popup")[0].classList.add("active");
    document.getElementsByClassName("page-mask")[0].classList.add("active");
}

function ethereum() {
    document.getElementsByClassName("qrcode")[0].src = "/images/Ethereum.png";
    document.getElementsByClassName("title")[0].textContent = "Ethereum";
    document.getElementsByClassName("crypto-address")[0].textContent = "copy: 0xB18E1F2F49B6c73A9DC36c0a0f41641FC3FdAb75";

    document.getElementsByClassName("popup")[0].classList.add("active");
    document.getElementsByClassName("page-mask")[0].classList.add("active");
}