$(document).ready(function() {
  $('textarea').social_limiter({
    limiter: 10,
    social_name: 'kavita',
    onLimit: function() {
      console.log('onLimit')
    },
    onExceed: function() {
      console.log('onExceed')
    }
  })
})
