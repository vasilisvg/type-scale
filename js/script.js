
$(document).ready(function() {

  //viewportHeight = $(window).innerHeight();
  $('.stage').css('min-height', $(window).innerHeight());

  $('.article_preview_button').click(function() {
    $(this).toggleClass('fa-times').toggleClass('fa-chevron-left');
    $('.article_preview').toggleClass('article_preview_open');
  });

  $('.more_options_button').click(function() {
    $('.more_options_button .fa').toggleClass('fa-times').toggleClass('fa-chevron-down');
    setPreviewHeight();
  });

  $('.param_url').hover(function() {
    $(this).attr('href', $(this).text())
  });

  $('[data-toggle]').click(function(e){
    e.preventDefault();
    $($(this).data('toggle')).toggle();
  });

  // $('.input_select_all').click(function () {
  //   $(this).select();
  // });

  function getQueryVariable(variable) {
    var vars = window.location.search.substring(1).split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return decodeURIComponent(pair[1]);}
  }
  return(false);
  };



  function setBaseSize() {
    if (getQueryVariable('size') === false) {
      baseSize = 1.25;
      $('.base_size').val(20);
    }
    else {
      baseSize = getQueryVariable('size') / 16;
      $('.base_size').val(getQueryVariable('size'));
      $('.article_container').css('font-size', Math.round(baseSize*1000)/1000 + 'em');
      $('.param_size').text(getQueryVariable('size'));
    };
    $('.base_em').text(Math.round(baseSize*1000)/1000);
  };
  setBaseSize();

  $('.base_size').bind("change paste keyup", function() {
    if($.isNumeric($(this).val())){
      baseSize = $(this).val() / 16;
    }
    else {
      baseSize = 0;
    };
    $('.base_em').text(Math.round(baseSize*1000)/1000);
    $('.param_size').text($(this).val());
    $('.article_container').css('font-size', Math.round(baseSize*1000)/1000 + 'em');
    scaleSelect();
  });



  function setScale() {
    if (getQueryVariable('scale') === false) {
      scaleRatio = 1.414;
    }
    else {
      scaleRatio = getQueryVariable('scale');
      $('.font_scale').val(getQueryVariable('scale'));
      $('.param_scale').text(getQueryVariable('scale'));
    };
    scaleCalc();
  };
  setScale();

  $('.font_scale').bind("change paste keyup", function() {
    scaleSelect();
    $('.param_scale').text($(this).val());
  });

  function scaleSelect() {
    scaleRatio = $('.font_scale').val();
    scaleCalc();
  };



  function setPreviewText() {
    if (getQueryVariable('text') !== false) {
      $('.preview_text').val(getQueryVariable('text'));
      $('.scale_preview_text').text(getQueryVariable('text'));
      $('.param_text').text(getQueryVariable('text'));
    };
  };
  setPreviewText();

  $('.preview_text').bind("change paste keyup", function() {
    previewText = $(this).val();
    $('.scale_preview_text').text(previewText);
    $('.param_text').text(encodeURIComponent($(this).val()));
  });



  function setTag() {
    if (getQueryVariable('webfont') !== false) {
      $('.web_font').val(getQueryVariable('webfont'));
      $('.webfont_url').attr('href', 'http://fonts.googleapis.com/css?family=' + getQueryVariable('webfont'));
      $('.param_font').text(getQueryVariable('webfont'));
    };
  };
  setTag();

  $('.web_font').bind("change paste keyup", function() {
    $('.webfont_url').attr('href', 'http://fonts.googleapis.com/css?family=' + $(this).val());
    $('.param_font').text(encodeURIComponent($(this).val()));
  });



  function setCss() {
    if (getQueryVariable('font-family') !== false) {
      $('.web_font_name').val(getQueryVariable('font-family'));
      $('.scale_webfont, .article_content').attr('style', "font-family:" + getQueryVariable('font-family'));
      $('.param_css').text(getQueryVariable('font-family'));
    };
  };
  setCss();

  $('.web_font_name').bind("change paste keyup", function() {
    webFontName = $(this).val();
    $('.scale_webfont, .article_content').attr('style', "font-family:" + webFontName);
    $('.param_css').text(encodeURIComponent($(this).val()));
  });



  function setFontHeaders() {
    if (getQueryVariable('font-family-headers') !== false) {
      $('.font_family_headers').val(getQueryVariable('font-family-headers'));
      $('.style_font_headers').html('.article_header {font-family:' + getQueryVariable('font-family-headers') + ';}');
      $('.param_font_headers').text(getQueryVariable('font-family-headers'));
    };
  };

  setFontHeaders();
  $('.font_family_headers').bind("change paste keyup", function() {
    $('.style_font_headers').html('.article_header {font-family:' + $(this).val() + ';}');
    $('.param_font_headers').text(encodeURIComponent($(this).val()));
    setPreviewHeight();
  });



  function setBackgroundColor() {
    if (getQueryVariable('background-color') !== false) {
      $('.background_color').val(getQueryVariable('background-color'));
      $('.style_background_color').html('.article_preview_open {background-color:' + getQueryVariable('background-color') + ';}');
      $('.param_background_color').text(getQueryVariable('background-color'));
    };
  };
  setBackgroundColor();

  $('.background_color').bind("change paste keyup", function() {
    $('.style_background_color').html('.article_preview_open {background-color:' + $(this).val() + ';}');
    $('.param_background_color').text(encodeURIComponent($(this).val()));
  });



  function setFontColor() {
    if (getQueryVariable('font-color') !== false) {
      $('.font_color').val(getQueryVariable('font-color'));
      $('.style_font_color').html('.article_preview_open {color:' + getQueryVariable('font-color') + ';}');
      $('.param_font_color').text(getQueryVariable('font-color'));
    };
  };

  setFontColor();
  $('.font_color').bind("change paste keyup", function() {
    $('.style_font_color').html('.article_preview_open {color:' + $(this).val() + ';}');
    $('.param_font_color').text(encodeURIComponent($(this).val()));
  });



  function scaleCalc() {
    function scaleHigh() {
      a = baseSize;
      b = scaleRatio;
      result = baseSize;

      $($('.scale_high').get().reverse()).each(function(index) {
        $(this).css('font-size', Math.round(result*1000)/1000 + 'em');
        result = a*b;
        a = result;
      });
    };

    function scaleHighLabel() {
      a = 1;
      b = scaleRatio;
      result = 1;

      $($('.scale_high_label').get().reverse()).each(function(index) {
        $(this).text(Math.round(result*1000)/1000 + 'em');
        result = a*b;
        a = result;
      });
    };

    function articleHeader() {
      a = 1;
      b = scaleRatio;
      result = 1;

      $($('.article_header').get().reverse()).each(function(index) {
        result = a*b;
        a = result;
        $(this).css('font-size', Math.round(result*1000)/1000 + 'em');
      });
    };

    function scaleLow() {
      a = baseSize;
      b = scaleRatio;
      result = baseSize;

      $('.scale_low').each(function(index) {
        result = a/b;
        a = result;
        $(this).css('font-size', Math.round(result*1000)/1000 + 'em');
      });
    };

    function scaleLowLabel() {
      a = 1;
      b = scaleRatio;
      result = 1;

      $('.scale_low_label').each(function(index) {
        result = a/b;
        a = result;
        $(this).text(Math.round(result*1000)/1000 + 'em');
      });
    };

    scaleHigh();
    scaleHighLabel();
    articleHeader();
    scaleLow();
    scaleLowLabel();
    setPreviewHeight();
  };

  function setPreviewHeight() {
    $('body').delay(650).queue(function(next) {
      $(this).css('min-height', $('.article_preview_inner').outerHeight());
      next();
    });
  };

});
