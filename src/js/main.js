/**
 * The valign-wrapper class behaves oddly on small screens. Test screen size and remove/add the class, if needed.
 */
function sizeCheck() {
    if (($(window).width() <= 600 && $("main").hasClass('valign-wrapper')) || ($(window).width() > 600 && !$("main").hasClass('valign-wrapper')))
            $("main").toggleClass('valign-wrapper');
}

/* ------ Polyfills ------ */

// IE does not support Element.remove();
if (!Element.prototype.remove) {
    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(var i = this.length - 1; i >= 0; i--) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }
}

/* IE does not properly perform CSS transformations with border-radius.
   Due to this we'll simply tell IE to use a pre-rendered circular image. */
if (window.navigator.userAgent.indexOf('Trident') !== -1 || window.navigator.userAgent.indexOf('MSIE') !== -1) {
    $("#headshot").attr('src', 'img/headshot-round.png');
    $("#headshot").removeClass('circle');
}

/* ------- End Section ------ */

$(document).ready(function() {

    // set the modals to animate their list options.
    $('.modal').modal({ 
        ready: function(modal, trigger) { 
            Materialize.showStaggeredList("#"+$(modal).children('.modal-content').children('.collection').attr('id')); 
        },
        complete: function(modal, trigger) {
            $("#"+$(modal).children('.modal-content').children('.collection').attr('id')).children('li').css('opacity','0');
        } 
    });
    
    sizeCheck();

    // Initial pop-in animation for page elements.
    $('body').css('overflow', 'hidden');
    $('.scale-1').toggleClass('scale-out');
    $('.scale-2').toggleClass('scale-out');
    setTimeout(function() {
        $('.scale-3').toggleClass('scale-out');
        setTimeout(function() {
            $('.scale-4').toggleClass('scale-out');
            setTimeout(function() {
                $('.scale-5').toggleClass('scale-out');
                setTimeout(function() {
                    $('body').css('overflow', '');
                }, 500);                           
            }, 100);
        }, 100);
    }, 500); 

    // color icons on hover
    $('.hover-card').hover(function() {
        $(this).children().children('i, img').toggleClass('hover-fill');
    });

    // Opens the modal for the relevant item clicked on the main page. Requires a 'for' attribute to be set.
    $('.hover-card').on('click', function() {
        $($(this).attr('for')).modal('open');
    });

    // Inform user that site portion is under construction
    $('.construction').on('click', function() {
        if ($('#toast-container').length < 1)
            Materialize.toast('Coming Soon, I promise!', 3000);
    });

    // Open link specified by href attribute
    $('.contact-icon').on('click', function(e) {
        e.preventDefault();
        window.open($(this).attr('href'));
    });

    $('.clickable-listitem').on('click', function() {
        var childMenuContent = $('.follow-thru').children('.modal-content').children('.collection').children();

        // Build our menu content based off of the current context
        $.each($(this).children('.secondary-content'), function(idx, itm) {
            $(childMenuContent[idx]).css('cursor','pointer').off('click').on('click', function() {
                window.open($(itm).attr('href'));
            });
            $(childMenuContent[idx]).children('p').text($(itm).text());
        });
        $('.follow-thru').modal('open');
    });

    // Toggle valign off on smaller screens...
    $(window).resize(function() {
        sizeCheck();
    });
});