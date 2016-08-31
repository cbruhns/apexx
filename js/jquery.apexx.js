(function($){
	$.fn.extend({
    apexx: function(options) {
      //Settings list and the default values
      var defaults = {
        numberOfSlides: 3,
				maxWidth: '900px',
				themeColor: '#d91a05'
      };
      var options = $.extend(defaults, options);

      return this.each(function() {
        var o = options;
				var obj = $(this);
        // Pre-Wrap
        $(this).wrap("<div class='wrapper'></div>");
        $(this).parents(".wrapper").append("<div class='clearfix'></div>");
        $(this).parents(".wrapper").append("<div class='controls'></div>");
        $(this).siblings(".controls").append("<div class='next'></div><div class='prev'></div><div class='pager'></div>");
        $(this).siblings(".controls").children(".next, .prev").append("<div class='top'><span></span></div><div class='bottom'><span></span></div>");

        //Get all <li> elements in the list
        var items = obj.children('li');
        var currentIndex = 0,
        itemAmt = items.length;

        // Init Pager
        items.each(function(){
          var indexVar = ( $(this).index() );
          $(this).parents().siblings('.controls').children('.pager').append('<span class="pagerdot" data-index="' + indexVar + '"></span>');
        });

        // Window Resize
        $(window).resize(function(){
					var currentHeight = 0;
          items.each(function() {
            currentHeight = currentHeight > $(this).height() ? currentHeight : $(this).height();
          });
					obj.parents(".wrapper").css("height",currentHeight);
					$(this).css("height",currentHeight);

        });

        // media query event handler
        if (matchMedia) {
          var mq = window.matchMedia("(min-width: 900px)");
          mq.addListener(WidthChange);
          WidthChange(mq);
        }
        function WidthChange(mq) {
          if (mq.matches) { // window width is at least 900px

            // Set Widths
            var percentWidth = (94 / o.numberOfSlides).toFixed(2) + "%", percentMargin = ((6 / o.numberOfSlides) / 2).toFixed(0)  + "%";
            items.width(percentWidth + "%").css({ "width" : percentWidth, "margin-left" : percentMargin,  "margin-right" : percentMargin });

            // CORE FUNCTION
            function cycleItems() {
              items.removeClass("active first second third");
              if ( (currentIndex + 1) - itemAmt === -1 ) {



                var item1 = items.eq(currentIndex);
                var item2 = items.eq(currentIndex + 1);
                var item3 = items.eq(0);
                obj.siblings('.controls').children('.pager').children('.pagerdot[data-index="' + currentIndex + '"]').addClass("active").siblings().removeClass("active");

                obj.siblings('.controls').children('.pager').children('.pagerdot[data-index="' + currentIndex + '"]').addClass("active");
                obj.siblings('.controls').children('.pager').children('.pagerdot[data-index="' + (currentIndex + 1) + '"]').addClass("active");
                obj.siblings('.controls').children('.pager').children('.pagerdot[data-index="' + 0 + '"]').addClass("active ondeck");


              } else if ( (currentIndex + 1) - itemAmt === 0 ){


                var item1 = items.eq(currentIndex);
                var item2 = items.eq(0);
                var item3 = items.eq(1);
                obj.siblings('.controls').children('.pager').children('.pagerdot[data-index="' + currentIndex + '"]').addClass("active").siblings().removeClass("active");
                obj.siblings('.controls').children('.pager').children('.pagerdot[data-index="' + currentIndex + '"]').addClass("active");
                obj.siblings('.controls').children('.pager').children('.pagerdot[data-index="' + 0 + '"]').addClass("active");
                obj.siblings('.controls').children('.pager').children('.pagerdot[data-index="' + 1 + '"]').addClass("active");


              } else {


                var item1 = items.eq(currentIndex);
                var item2 = items.eq(currentIndex + 1);
                var item3 = items.eq(currentIndex + 2);
                obj.siblings('.controls').children('.pager').children('.pagerdot[data-index="' + currentIndex + '"]').addClass("active").siblings().removeClass("active");
                obj.siblings('.controls').children('.pager').children('.pagerdot[data-index="' + currentIndex + '"]').addClass("active");
                obj.siblings('.controls').children('.pager').children('.pagerdot[data-index="' + (currentIndex + 1) + '"]').addClass("active");
                obj.siblings('.controls').children('.pager').children('.pagerdot[data-index="' + (currentIndex + 2) + '"]').addClass("active");


              }


              item1.addClass("first active").css("left","0");
              item2.addClass("second active").css("left","33.33333%");
              item3.addClass("third active").css("left","66.66666%");

							// Wrapper Height
							var currentHeight = 0;
							items.each(function() {
								currentHeight = currentHeight > $(this).height() ? currentHeight : $(this).height();
							});
							obj.parents(".wrapper").css("height",currentHeight);
							obj.css("height",currentHeight);
						}

						// Next & Previous Clicks
            obj.siblings('.controls').children('.next').unbind('click').click(function() {
              currentIndex += 1;
              if (currentIndex > itemAmt - 1) { currentIndex = 0; }
              cycleItems();
            });
            obj.siblings('.controls').children('.prev').unbind('click').click(function() {
              currentIndex -= 1;
              if (currentIndex < 0) { currentIndex = itemAmt - 1; }
              cycleItems();
            });

            cycleItems();

          } else { // window width is less than 900px
            // Set Widths
            var percentWidth = (90).toFixed(2);
            var percentMargin = (10 / 2).toFixed(0);
            var marginString = "0" + percentMargin + "%";
            items.width(percentWidth + "%").css({
              "margin-left" : marginString,
              "margin-right" : marginString
            });
            // CORE FUNCTION
            function cycleItemsResponsive() {
              items.removeClass("active first second third");
              var item1 = items.eq(currentIndex);
              $('.pagerdot[data-index="' + currentIndex + '"]').addClass("active").siblings().removeClass("active");
              item1.addClass("first active").css("left","0");
              // Wrapper Height
              var currentHeight = 0;
              items.each(function() {
                currentHeight = currentHeight > $(this).height() ? currentHeight : $(this).height();
								obj.parents(".wrapper").css("height", currentHeight);
	              obj.css("height", currentHeight);
              });


            }
            obj.siblings('.controls').children('.next').unbind('click').click(function() {
              currentIndex += 1;
              if (currentIndex > itemAmt - 1) {
                currentIndex = 0;
              }
              cycleItemsResponsive();
            });
            obj.siblings('.controls').children('.prev').unbind('click').click(function() {
              currentIndex -= 1;
              if (currentIndex < 0) {
                currentIndex = itemAmt - 1;
              }
              cycleItemsResponsive();
            });
            cycleItemsResponsive();
          }
        }
      });
    }
  });
})(jQuery);
