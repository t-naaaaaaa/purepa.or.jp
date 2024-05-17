// JavaScript Document

  $(function() {
      $('.file-menu').hide();
      $('.category').click(function() {
          var $this = $(this);
          if ($this.hasClass('active')) {
              $this.removeClass('active');
          }else {
              $this.addClass('active');
          }
          $this.next('.file-menu').slideToggle('slow');
      });
  });