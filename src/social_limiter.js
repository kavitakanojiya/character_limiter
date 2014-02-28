(function($) {
  $.fn.social_limiter = function(options) {
    var $this, counter, settings, span_html, prev_text_color;

    $this = this;
    prev_text_color = $this.css('color')
    settings = $.extend({
      insert_counter_to: 'body', // hook-up the counter to particular ID
      color: '#CD2626',  // set color if limit is exceeded
      limiter: null,   // set the counter
      social_name: null,  // set the name
      onExceed: null,  // callback when limit is exceeded
      onLimit: null  // callback when limit isnt exceeded
    }, options);

    // Ensure we have Integer value to compare content length
    settings.limiter = parseInt(settings.limiter)

    // Setting character counter and social name are mandatory
    if(settings.social_name === null && settings.limiter == null)
      return $.error('Cant limit character without social name and limiter');

    span_html = "<span class='ui-social-limiter-counter'>" + settings.limiter + "</span>"
    $(settings.insert_counter_to).html(span_html)
    $(settings.insert_counter_to).find('.ui-social-limiter-counter').text(settings.limiter - this.val().length);
    computeCountAndRunCallback(this, settings);

    if (!$.data(this, 'social_limiter')) this.data('social_limiter', SocialLimiter(this, settings))

    $this.on('keyup', function(e) {
      var text_count = this.value.length;

      $('span.ui-social-limiter-counter').text(settings.limiter - text_count)
      computeCountAndRunCallback(this, settings);
    });

    function computeCountAndRunCallback($el, options) {
      if($($el).val().length > options.limiter) {
        $('span.ui-social-limiter-counter').addClass('ui-social-limiter-counter-exceeded').
          css('color', options.color)
          if( $.isFunction( options.onExceed ) ) {
            options.onExceed.call( this );
          }
      } else {
        $('span.ui-social-limiter-counter').removeClass('ui-social-limiter-counter-exceeded').
          css('color', prev_text_color)
          if( $.isFunction( options.onLimit ) ) {
            options.onLimit.call( this );
          }
      }
    };

    function SocialLimiter(el, options) {
      options.$color = options.color;
      options.$element = $(el);
      options.$limiter = options.limiter;
      options.$social_name = options.social_name;
      return options;
    };
  };
}(jQuery));
