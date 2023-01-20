jQuery(document).ready(function($){

  var show_button = wps_frontend_i18n?.settings?.display_spoiler_button;
  var show_tooltip = wps_frontend_i18n?.settings?.show_tooltip;
  var tool_tip_msg = wps_frontend_i18n?.settings?.tooltip_message;
  console.log(wps_frontend_i18n?.settings?.display_spoiler_button)
  if(show_button === 'yes'){
    $(".wps-spoiler").append("<button>Reveal Spoiler!</button>");

    if(show_tooltip === 'yes' && tool_tip_msg != ""){
      tippy('.wps-spoiler button', {
        content: tool_tip_msg,
      });
    }
    
  } else {

    if(show_tooltip === 'yes' && tool_tip_msg != ""){
      tippy('.wps-spoiler', {
        content: tool_tip_msg,
      });
    }
    
  }
  
  $(".wps-spoiler button").click(function(){
    $(this).remove();
    $(".wps-spoiler").css({
      'color': 'inherit',
      'text-shadow': 'none'
    })
  });




});