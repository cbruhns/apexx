(function($){
  $.fn.extend({
    apexx: function(options) {
      //Settings Defaults
      var defaults = {
        maxSlides : 3,
        minSlides : 1
      };
      var options = $.extend(defaults, options);
      return this.each(function() {
        var o = options;
        var obj = $(this);
        // Pre-Wrap
        obj.wrap("<div class='wrapper'></div>");
        obj.parents(".wrapper").append("<div class='clearfix'></div><div class='controls'></div>");
        obj.siblings(".controls").append("<div class='next'></div><div class='prev'></div><div class='pager'></div>");
        obj.siblings(".controls").children(".next, .prev").append("<div class='top'><span></span></div><div class='bottom'><span></span></div>");
        // Variables
        var controls = obj.siblings(".controls"),
        pager = controls.children('.pager'),
        next = controls.children('.next'),
        prev = controls.children('.prev'),
        items = obj.children('li'),
        currentIndex = 0,
        itemAmt = items.length;
        // Init Pager
        items.each(function(){
          obj.siblings('.controls').children('.pager').append('<span class="pagerdot" data-index="' + $(this).index() + '"></span>');
          $(this).attr("data-index", $(this).index() );
        });
        // Window Resize
        $(window).resize(function(){
          setTimeout(function(){
            var currentHeight = 0, currentItems = obj.children('li.active');
            currentItems.each(function() {
              currentHeight = currentHeight > $(this).height() ? currentHeight : $(this).height();
              obj.parents(".wrapper").css("height",currentHeight);
              obj.css("height",currentHeight);
            });
          }, 300);
        });
        // media query event handler
        if (matchMedia) {
          var mq = window.matchMedia("(min-width: 900px)");
          mq.addListener(WidthChange);
          WidthChange(mq);
        }
        function WidthChange(mq) {
          if (mq.matches) { // window width is at least 900px
            // Establish Width Variables
            var percentWidth = (94 / o.maxSlides).toFixed(2) + "%", percentMargin = ((6 / o.maxSlides) / 2).toFixed(0)  + "%";
            items.width(percentWidth + "%").css({ "width" : percentWidth, "margin-left" : percentMargin,  "margin-right" : percentMargin });
            // CORE FUNCTION
            function cycleItems() {
              var e = 0, currentItems = [], activeData = [];
              items.removeClass("active");
              // Establish Current
              for (var i=0;i<o.maxSlides;i++) {
                (i + currentIndex) < itemAmt ? (currentItems.push(items.eq(currentIndex + i)),activeData.push(items.eq(currentIndex + i).attr('data-index'))) : (currentItems.push(items.eq(e)),activeData.push(items.eq(e).attr('data-index')),e++);
              }
              // Update Pager
              pager.children('.pagerdot').each(function(){
                activeData.indexOf($(this).attr('data-index')) >= 0 ? $(this).addClass('active') : $(this).removeClass('active');
              });
              // Set Current Positions
              for (var i=0;i<currentItems.length;i++) {
                var v = (( 100 / o.maxSlides) * i).toFixed(2);
                currentItems[i].addClass('active').css("left", "" + v + "%");
              }
              // Update Wrapper Height
              var currentHeight = 0, currentItems = obj.children('li.active');
              currentItems.each(function() {
                currentHeight = currentHeight > $(this).height() ? currentHeight : $(this).height();
                obj.parents(".wrapper").css("height",currentHeight);
                obj.css("height",currentHeight);
              });
            }
            // Next & Previous Clicks
            next.unbind('click').click(function() {
              currentIndex += 1;
              if (currentIndex > itemAmt - 1) { currentIndex = 0; }
              cycleItems();
            });
            prev.unbind('click').click(function() {
              currentIndex -= 1;
              if (currentIndex < 0) { currentIndex = itemAmt - 1; }
              cycleItems();
            });
            cycleItems();
          } else { // window width is less than 900px
            // Set Widths - MOBILE
            var percentWidth = (90 / o.minSlides).toFixed(2), percentMargin = ((10 / o.minSlides) / 2).toFixed(0), marginString = "0" + percentMargin + "%";
            items.width(percentWidth + "%").css({ "margin-left" : marginString, "margin-right" : marginString });
            // CORE FUNCTION - MOBILE
            function cycleItemsResponsive() {
              var e = 0, currentItems = [], activeData = [];
              items.removeClass("active");
              // Establish Current - MOBILE
              for (var i=0;i<o.minSlides;i++) {
                (i + currentIndex) < itemAmt ? (currentItems.push(items.eq(currentIndex + i)),activeData.push(items.eq(currentIndex + i).attr('data-index'))) : (currentItems.push(items.eq(e)),activeData.push(items.eq(e).attr('data-index')),e++);
              }
              // Update Pager - MOBILE
              pager.children('.pagerdot').each(function(){
                activeData.indexOf($(this).attr('data-index')) >= 0 ? $(this).addClass('active') : $(this).removeClass('active');
              });
              // Set Current Position - MOBILE
              for (var i=0;i<currentItems.length;i++) {
                var v = (( 100 / o.minSlides) * i).toFixed(2);
                currentItems[i].addClass('active').css("left", "" + v + "%");
              }
              // Update Wrapper Height - MOBILE
              var currentHeight = 0, currentItems = obj.children('li.active');
              currentItems.each(function() {
                currentHeight = currentHeight > $(this).height() ? currentHeight : $(this).height();
                obj.parents(".wrapper").css("height", currentHeight);
                obj.css("height", currentHeight);
              });
            }
            next.unbind('click').click(function() {
              currentIndex += 1;
              if (currentIndex > itemAmt - 1) { currentIndex = 0; }
              cycleItemsResponsive();
            });
            prev.unbind('click').click(function() {
              currentIndex -= 1;
              if (currentIndex < 0) { currentIndex = itemAmt - 1; }
              cycleItemsResponsive();
            });
            cycleItemsResponsive();
          }
        }
      });
    }
  });
})(jQuery);
