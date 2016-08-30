$(document).ready(function(){
  // Pre Wrap
  $('.cycle').wrap("<div class='wrapper'></div>");
  $('.wrapper').append("<div class='clearfix'></div>");
  $('.wrapper').append("<div class='controls'></div>");
  $('.controls').append("<div class='next'></div><div class='prev'></div><div class='pager'></div>");
  $('.next, .prev').append("<div class='top'><span></span></div><div class='bottom'><span></span></div>");
  // Initial Setup Of Items
  var currentIndex = 0,
  number = 3,
  items = $('.cycle li'),
  itemAmt = items.length;
  items.each(function(){
    var indexVar = ( $(this).index() );
    $(".pager").append('<span class="pagerdot" data-index="' + indexVar + '"></span>');
    $('.pagerdot[data-index="0"]').addClass("active");
  });
  // PAGER
  /*
  $('.pagerdot').click(function() {
  var dataIndex = parseInt($(this).attr('data-index'));
  if( currentIndex !== dataIndex ){
  clearInterval(autoSlide);
  currentIndex = dataIndex;
  cycleItems();
}
})
*/
// Window Resize
$(window).resize(function(){
  var currentHeight = 0;
  $('.cycle li').each(function() {
    currentHeight = currentHeight > $(this).height() ? currentHeight : $(this).height();
  });
  $(".wrapper").css("height",currentHeight);
  $(".cycle").css("height",currentHeight);
});
// media query event handler
if (matchMedia) {
  var mq = window.matchMedia("(min-width: 900px)");
  mq.addListener(WidthChange);
  WidthChange(mq);
}
// media query change
function WidthChange(mq) {
  if (mq.matches) { // window width is at least 900px
    // Set Widths
    var percentWidth = (94 / number).toFixed(2);
    var percentMargin = ((6 / number) / 2).toFixed(0);
    var marginString = "0" + percentMargin + "%";
    items.width(percentWidth + "%").css({
      "margin-left" : marginString,
      "margin-right" : marginString
    });
    // CORE FUNCTION
    function cycleItems() {
      items.removeClass("active first second third");
      if ( (currentIndex + 1) - itemAmt === -1 ) {
        var item1 = $('.cycle li').eq(currentIndex);
        var item2 = $('.cycle li').eq(currentIndex + 1);
        var item3 = $('.cycle li').eq(0);
        $('.pagerdot[data-index="' + currentIndex + '"]').addClass("active").siblings().removeClass("active upnext ondeck");
        $('.pagerdot[data-index="' + currentIndex + '"]').removeClass("upnext ondeck").addClass("active");
        $('.pagerdot[data-index="' + (currentIndex + 1) + '"]').addClass("active upnext");
        $('.pagerdot[data-index="' + 0 + '"]').addClass("active ondeck");
      } else if ( (currentIndex + 1) - itemAmt === 0 ){
        var item1 = $('.cycle li').eq(currentIndex);
        var item2 = $('.cycle li').eq(0);
        var item3 = $('.cycle li').eq(1);
        $('.pagerdot[data-index="' + currentIndex + '"]').addClass("active").siblings().removeClass("active upnext ondeck");
        $('.pagerdot[data-index="' + currentIndex + '"]').removeClass("upnext ondeck").addClass("active");
        $('.pagerdot[data-index="' + 0 + '"]').addClass("active upnext");
        $('.pagerdot[data-index="' + 1 + '"]').addClass("active ondeck");
      } else {
        var item1 = $('.cycle li').eq(currentIndex);
        var item2 = $('.cycle li').eq(currentIndex + 1);
        var item3 = $('.cycle li').eq(currentIndex + 2);
        $('.pagerdot[data-index="' + currentIndex + '"]').addClass("active").siblings().removeClass("active upnext ondeck");
        $('.pagerdot[data-index="' + currentIndex + '"]').removeClass("upnext ondeck").addClass("active");
        $('.pagerdot[data-index="' + (currentIndex + 1) + '"]').addClass("active upnext");
        $('.pagerdot[data-index="' + (currentIndex + 2) + '"]').addClass("active ondeck");
      }
      item1.addClass("first active").css("left","0");
      item2.addClass("second active").css("left","33.33333%");
      item3.addClass("third active").css("left","66.66666%");

      // Wrapper Height
      var currentHeight = 0;
      $('.cycle li.active').each(function() {
        currentHeight = currentHeight > $(this).height() ? currentHeight : $(this).height();
      });
      $(".wrapper").css("height",currentHeight);
      $(".cycle").css("height",currentHeight);
    }

    $('.next').unbind('click').click(function() {
      currentIndex += 1;
      if (currentIndex > itemAmt - 1) {
        currentIndex = 0;
      }
      cycleItems();
    });

    $('.prev').unbind('click').click(function() {
      currentIndex -= 1;
      if (currentIndex < 0) {
        currentIndex = itemAmt - 1;
      }
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
      var item1 = $('.cycle li').eq(currentIndex);
      $('.pagerdot[data-index="' + currentIndex + '"]').addClass("active").siblings().removeClass("active upnext ondeck");
      item1.addClass("first active").css("left","0");
      // Wrapper Height
      var currentHeight = 0;
      $('.cycle li.active').each(function() {
        currentHeight = currentHeight > $(this).height() ? currentHeight : $(this).height();
      });

      $(".wrapper").css("height",currentHeight);
      $(".cycle").css("height",currentHeight);
    }
    $('.next').unbind('click').click(function() {
      currentIndex += 1;
      if (currentIndex > itemAmt - 1) {
        currentIndex = 0;
      }
      cycleItemsResponsive();
    });
    $('.prev').unbind('click').click(function() {
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
