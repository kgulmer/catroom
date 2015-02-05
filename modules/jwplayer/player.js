jwplayer('video-jwplayer').setup({
  flashplayer:"modules/jwplayer/jwplayer.flash.swf"
  , file:"rtmp://host.damnserver.com:1935/flvplayback/flv:myStream.flv"
  , autoStart: true
  , rtmp:{
    bufferlength:0.1
  }
  , deliveryType: "streaming"
  , width: 960
  , height: 540
  , player: {
    modes: {
      linear: {
        controls:{
          stream:{
            manage:false
            , enabled: false
          }
        }
      }
    }
  }
  , shows: {
    streamTimer: {
      enabled: true
      , tickRate: 100
    }
  }
});