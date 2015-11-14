// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

setTimeout(function (argument) {
  (function(){
    'use strict';

    var $link = $('a');

    for (var i = 0; i < $link.length; i++) {
      (function($link){
        var url = $link.attr('href');
        console.log(url);
        var evtSource = new EventSource(url);
        
        evtSource.onmessage = function(e) {
          var data = JSON.parse(e.data);
          var $l = $('[href="/posts/' + data.id + '"]');

          $l.parent().parent().find('td').eq(0).text( data.title );
          $l.parent().parent().find('td').eq(1).text( data.text );
        }
      })($link.eq(i));
    };
  })();
}, 0);