function include(file){
  var script  = document.createElement('script');
  script.src  = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);
}

include('javascripts/app/main.js');
include('javascripts/app/bullet.js');
include('javascripts/app/enemy.js');
include('javascripts/app/player.js');