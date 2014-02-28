(function($) {
  $.fn.social_limiter = function(options) {
    var $this, counter, settings, span_html, prev_text_color;

    $this = this;
    prev_text_color = $this.css('color')
    settings = $.extend({
      color: '#CD2626',
      limiter: null,
      social_name: null,
      onExceed: null,
      onLimit: null
    }, options);

    // Seeting limit counter with social name is mandatory
    if(settings.social_name === null && settings.limiter == null)
      return $.error('Cant limit character without social name and limiter');

    span_html = "<span class='ui-social-limiter-counter'>" + settings.limiter + "</span>"
    $(span_html).insertAfter($this);

    if (!$.data(this, 'social_limiter')) this.data('social_limiter', SocialLimiter(this, settings))

    $this.on('keyup', function(e) {
      var text_count = this.value.length;
      $('span.ui-social-limiter-counter').text(settings.limiter - text_count)
      if(text_count > settings.limiter) {
        $('span.ui-social-limiter-counter').addClass('ui-social-limiter-counter-exceeded').
          css('color', settings.color)
          if( $.isFunction( settings.onExceed ) ) {
            settings.onExceed.call( this );
          }
      }
      else {
        $('span.ui-social-limiter-counter').removeClass('ui-social-limiter-counter-exceeded').
          css('color', prev_text_color)
          if( $.isFunction( settings.onLimit ) ) {
            settings.onLimit.call( this );
          }
      }
    });

    function SocialLimiter(el, options) {
      options.$color = options.color;
      options.$element = $(el);
      options.$limiter = options.limiter;
      options.$social_name = options.social_name;
      return options;
    };
  };
}(jQuery));
