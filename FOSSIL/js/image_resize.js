/**
 *
 * 이미지 리사이징
 *
 */

$(function () {
  (function () {
    var timer = false
    var resize = function () {
      var bool = false
      var size = $('.list_image > a > img').size()
      if (size > 0) {
        $('.list_image > a > img').each(function () {
          var width = $(this).width()
          var height = $(this).height()
          if (width != height) {
            $(this).height(width)
          }
        })
        bool = true
      }

      // 하이엔드
      var sizeTimeeal = $('.list_wide_image > a > img').size()
      if (sizeTimeeal > 0) {
        $('.list_wide_image > a > img').each(function () {
          var width = $(this).width()
          var height = $(this).height()
          if (width != height) {
            $(this).height(width)
          }
        })
        bool = true
      }
      return bool
    }

    // DOM 확인
    timer = setInterval(function () {
      if (resize()) {
        // clearInterval(timer);
      }
    }, 30)

    // window resize
    $(window).resize(function () {
      resize()
    })
  })()
})
