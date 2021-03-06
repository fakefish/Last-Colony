(function(){
  var lastTime = 0;
  var vendors = ['ms','moz','webkit','o'];
  for(var x = 0; x<vendors.length && !window.requestAnimationFrame; ++x){
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelAnimationFrame'];
  }

  if(!window.requestAnimationFrame){
    window.requestAnimationFrame = function(callback, element){
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function(){
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if(!window.CancelAnimationFrame){
    window.calcelAnimationFrame = function(id){
      clearTimeout(id);
    };
  }
})();

var loader = {
  loaded : true,
  loadedCount : 0,
  totalCound : 0,

  init : function(){
    var mp3Support,oggSupport;
    var audio = document.createElement('audio');
    if(audio.canPlayType){
      mp3Support = ""!= audio.canPlayType('audio/mpeg');
      oggSupport = ""!= audio.canPlayType('audio/ogg; codecs="vorbis');
    } else {
      mp3Support = false;
      oggSupport = false;
    }

    loader.soundFileExtn = oggSupport?".ogg":mp3Support?".mp3":undefined;
  },
  loadImage : function(url){
    this.totalCount++;
    this.loaded = false;
    $('#loadingscreen').show();
    var image = new Image();
    image.src = url;
    image.onload = loader.itemLoaded;
    return image;
  },
  soundFileExtn : '.ogg',
  loadSound : function(url){
    this.totalCount++;
    this.loaded = false;
    $('#loadingscreen').show();
    var audio = new Audio();
    audio.src = url+loader.soundFileExtn;
    audio.on('canplaythrough',loader.itemLoaded);
    return audio;
  },
  itemLoaded : function(){
    loader.loadedCount++;
    $('#loadingmessage').html('Load '+loader.loadedCount+' of '+loader.totalCount);
    if(loader.loadedCount === loader.totalCount){
      loader.loaded = true;
      $('#loadingscreen').hide();
      if(loader.onload){
        loader.onload();
        loader.onload = undefined;
      }
    }
  }
}