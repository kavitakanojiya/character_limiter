$(document).ready(function() {
  $('textarea').social_limiter({
    insert_counter_to: '.limiter',
    limiter: 10,
    social_name: 'demo',
    onLimit: function() {
      $('.status').removeClass('error').text('You have space. Please continue!!')
    },
    onExceed: function() {
      $('.status').addClass('error').text('You have exceeded space.')
    }
  })
})
