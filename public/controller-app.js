$(document).ready(function() {
  $('.direction-control').on('click', function() {
    var direction = $(this).attr('data-direction');
    $.post(window.location.href+'/'+direction);
  });
});
