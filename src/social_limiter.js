(function($){
  var _defaults, methods, span_html;

  _defaults = {
    background_color: '#CD2626',
    color: '#CD2626',  // set color if limit is exceeded
    insert_counter_to: 'body', // hook-up the counter to particular ID
    limiter: null,   // set the counter
    social_name: null,  // set the name
    onExceed: null,  // callback when limit is exceeded
    onLimit: null  // callback when limit isnt exceeded
  };

  methods = {
    init: function(options)
      {
        return this.each(function()
        {
          var $this = $(this);

          var settings = $.extend({}, _defaults);

          if (options) {
            settings = $.extend(settings, options);
            settings['prev_text_color'] = $this.css('color')
            settings.limiter = parseInt(settings.limiter)
          }

          if(settings.social_name === null && settings.limiter == null)
            return $.error('Cant limit character without social name and limiter');

          if (!$.data(this, 'social_limiter'))
            $this.data('social_limiter', settings);

          span_html = "<span class='ui-social-limiter-counter'>" + settings.limiter + "</span>"
          $(settings.insert_counter_to).append(span_html)
          $(settings.insert_counter_to).find('.ui-social-limiter-counter').text(settings.limiter - $this.val().length);

          $this.on('keyup.social_limiter', function(e) {
            _keyuphandler(this, settings);
          });
        });
      }
    };

  function _keyuphandler($el, options) {
    var $el, text_count;
    $el = $($el);
    value = $el.val();
    text_count = value.length;

    $('span.ui-social-limiter-counter').text(options.limiter - text_count);

    if(value.length > options.limiter) {
      $('span.ui-social-limiter-counter').addClass('ui-social-limiter-counter-exceeded').
        css('color', options.color)
        if( $.isFunction( options.onExceed ) ) {
          options.onExceed.call( $el );
        }
    } else {
      $('span.ui-social-limiter-counter').removeClass('ui-social-limiter-counter-exceeded').
        css('color', options.prev_text_color)
        if( $.isFunction( options.onLimit ) ) {
          options.onLimit.call( this );
        }
    }
  };

  // Plugin entry
  $.fn.social_limiter = function(method)
  {
    if(methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); }
    else if(typeof method === "object" || !method) { return methods.init.apply(this, arguments); }
    else { $.error("Method "+ method + " does not exist on jQuery.social_limiter"); }
  }
}(jQuery));
