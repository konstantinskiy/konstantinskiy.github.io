$(document).ready(function(){


    // Adaptive menu toggle

    $('.adaptive-menu-toggler').on('click', function(e){
        e.preventDefault();
        $('.adaptive-menu-container').addClass('open');
    });
    
    $('.adaptive-menu-close').on('click', function(e){
        e.preventDefault();
        $('.adaptive-menu-container').removeClass('open');
    });


    // Modal

    $('.order-rend-modal-trigger').fancybox({
        padding: 0,
        wrapCSS : 'order-rend-wrap',
    });


    // Gallery modal 

    $('.gallery-trigger').fancybox();


    // Tel mask

    $('.form-input-tel').mask("+7(999) 999-99-99");


    // Owl carousels

    $('.main-slider').owlCarousel({
        loop: true,
        items: 1,
        nav: false, 
        dots: true 
    });

    $('.rent-slider').owlCarousel({
        loop: true,
        items: 4,
        nav: true,  
        dots: false,
        margin: 16,     
        responsive: {
            0: {
                items: 1,
            },
            640: {
                items: 2,
            },
            1000: {
                items: 3,
                nav: true,
            },
            1200: {
                items: 4,
                nav: true,
            }
        }
    }); 


    // Rent proposal tab 

    $('.rent-filter-btn').on('click', function(e){
        e.preventDefault();

        $('.rent-filter-btn.rent-filter-btn--active').removeClass('rent-filter-btn--active');
        $(this).addClass('rent-filter-btn--active');
        var blockId = $(this).attr('href');
        $('.rent-slider-block.active').removeClass('active');
        $(blockId).addClass('active');      
    });


    // Rent check filter 

    $('.rent-show-value-link').on('click', function(e){
        e.preventDefault();
        $('.rent-show-value-link.rent-show-value-link--active').removeClass('rent-show-value-link--active');
        $(this).addClass('rent-show-value-link--active');
    });


    // Arenda proposal tab

    $('.advert-menu__item-link').on('click', function(e){
        e.preventDefault();

        $('.advert-menu__item-link.advert-menu__item-link--active').removeClass('advert-menu__item-link--active');
        $(this).addClass('advert-menu__item-link--active');
        var blockId = $(this).attr('href');
        $('.advert-content__item.advert-content__item--active').removeClass('advert-content__item--active');
        $(blockId).addClass('advert-content__item--active');      
    });


    /*--------------------------------------------------------------
    Animate blocks
    --------------------------------------------------------------*/

    function animateItems(itemIdent, animation, timer, interval) {
        var imagePos = itemIdent.offset().top,
            windowHeight = $(window).height() * 0.85,
            topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + windowHeight) {
            itemIdent.each(function () {
                var anim_item = $(this);
                setTimeout(function () {
                    anim_item.addClass(animation);
                }, timer);
                timer = timer + interval;
            })
        }
    }

    if($(window).width() > 1000){
        $(window).scroll(function () {
            animateItems($('.infrastructure-metro-img-animate'), 'visible animated fadeInLeft', 150, 250);
            animateItems($('.infrastructure-metro-text-animate'), 'visible animated fadeInRight', 150, 250);
        });
    }

  
    // Footer google map

    if($('#footer-map').length){
        function initMap(){
            var myLatlng = new google.maps.LatLng(55.7257597, 37.6813138);
            var mapOptions = {
                zoom: 17,
                center: myLatlng,
                scrollwheel: false,
                styles:
                [
                  {
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#1d2c4d"
                      }
                    ]
                  },
                  {
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#8ec3b9"
                      }
                    ]
                  },
                  {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1a3646"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      {
                        "color": "#4b6878"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#64779e"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      {
                        "color": "#4b6878"
                      }
                    ]
                  },
                  {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      {
                        "color": "#334e87"
                      }
                    ]
                  },
                  {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#023e58"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#283d6a"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#6f9ba5"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1d2c4d"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                      {
                        "color": "#023e58"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#3C7680"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#304a7d"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#98a5be"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1d2c4d"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#2c6675"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      {
                        "color": "#255763"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#b0d5ce"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#023e58"
                      }
                    ]
                  },
                  {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#98a5be"
                      }
                    ]
                  },
                  {
                    "featureType": "transit",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1d2c4d"
                      }
                    ]
                  },
                  {
                    "featureType": "transit.line",
                    "elementType": "geometry.fill",
                    "stylers": [
                      {
                        "color": "#283d6a"
                      }
                    ]
                  },
                  {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#3a4762"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#0e1626"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#4e6d70"
                      }
                    ]
                  }
                ]
            }
            var map = new google.maps.Map(document.getElementById('footer-map'), mapOptions);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: 'images/i/map-marker-ico.png'
            });
        }
        google.maps.event.addDomListener(window, 'load', initMap);    
    }   
     
});