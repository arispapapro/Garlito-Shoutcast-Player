

(function ( $ ) {

    $.fn.garlitoPlayer = function( options ) {

        var _this = this; //or var $_this = this;

        // Default Variables
        var settings = $.extend({
            ip : "",
            port: "",
            protocol: "http://",
            emptyCoverImgUrl: "img/no-cover.jpg",
            autoplay:true,
            volume:0.5,
            popup:false,
            lastFmApiKey:"",
            facebookUrl: false,
            instagramUrl: false,
            logoUrl: "img/logo.png",
            radioName : " Radio Station Name",
            listenButtonId:"",
            nowPlayingText:"Now Playing:",

        }, options);




        var htmlPlayer = '<div class="garlito-player"> <div id="garlito-close"><img src="img/close-gray.svg"></div><div class="container-fluid"> <div class="row"> <div class="brand col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 height"> <div class="branding"> <div class="logo-holder"> <div class="garlito-logo"> <img src="' + settings.logoUrl +'" alt="Fabric Radio"> </div></div><div class="name-holder"> <div class="name">'+ settings.radioName + '</div></div><div class="social-media"> <a id="garlitoFacebookUrl" href="' + settings.facebookUrl + '" target="_blank"><img src="img/facebook.svg"></a> <a id="garlitoInstagramUrl" href="'+ settings.instagramUrl + '" target="_blank"><img src="img/instagram.svg"></a> </div><div class="garlito-cover-mobile"> <img width="60" height="60" src="img/no-cover.jpg" id="garlito-cover-mobile"> </div><div class="play-settings"> <div class="play-pause item"> <img id="garlito-play" alt="Play" src="img/play-gray.svg"> <img id="garlito-pause" alt="Pause" src="img/pause-gray.svg"> </div><div class="volume item"> <input type="range" min="0" max="100" value="" class="slider" id="garlito-volume-slider"> </div></div><div class="garlito-cover"> <img id="garlito-cover" width="60" height="60" src="img/no-cover.jpg" id=""> </div><div class="radio-title"> <span class="now-playing">'+settings.nowPlayingText+'<span> <span id="garlito-currentSong"></span> </div></div></div></div></div></div>';

        $(_this).html(htmlPlayer);


        //Main Theme Colors



        if(settings.facebookUrl == false){ $("#garlitoFacebookUrl").css("display", "none"); }
        if(settings.instagramUrl == false){ $("#garlitoInstagramUrl").css("display", "none"); }

        if(settings.facebookUrl == false && settings.instagramUrl == false ){ $(".social-media").css("display", "none"); }



        var statisticsUrl =  settings.protocol + settings.ip + ":" + settings.port + "/statistics?json=1";
        var source =  settings.protocol + settings.ip + ":" + settings.port + "/stream";

        var sound = new Howl({
        src: [source],
        autoplay: settings.autoplay,
        volume: settings.volume,
        html5: true, // A live stream can only be played through HTML5 Audio.
        format: ['mp3','m4a','mpeg','ogg','acc','dolby'],
        onend: function() {
            console.log('Finished!');
        }
    });

    //Elements
    var player = $(".garlito-player");
    var play_element = $("#garlito-play");
    var pause_element = $("#garlito-pause");
    var volume_element = $("#garlito-volume-slider");
    var current_song = $("#garlito-currentSong");
    var cover_image = $("#garlito-cover");
    var cover_image_mobile = $("#garlito-cover-mobile");
    var close_button = $("#garlito-close");
    var open = $(settings.listenButtonId);


    // If the player is popup with button
    if(settings.popup && settings.listenButtonId !== ""){

        // Hides the player and turns off the music
        player.parent('div').css('display','none');
        player.css("display", "none");
        sound.stop();

        //When you click the listen button
        open.click(function () {
            player.addClass("animated pulse");
            player.parent('div').css('display','block');
            player.css("display", "block");
            sound.play();
        });

        // When you click the close button
        close_button.click(function () {
            player.parent('div').css('display','none');
            player.css("display", "none");
            sound.stop();
        });

    }
    // If the player is not a popup one
    else{

        player.parent('div').css('display','block');
        sound.play();

        // When you click the close button
        close_button.click(function () {
            player.parent('div').css('display','none');
            player.css("display", "none");
            sound.stop();
        });

    }


    // Gets the default volume in html
    volume_element.val((sound._volume * 100));

    // When volume changes in slider it changes in the audio too
    volume_element.on("input change", function() {
        sound.volume(volume_element.val()/100);
    });

    // Otan pataw pause
    play_element.click( function(){
        sound.play();
        // Krypse to pause
        play_element.css("display", "none");
        //Emfanise to play
        pause_element.css("display", "inline-block");

    });

    // Otan pataw play
    pause_element.click( function(){
        sound.pause();

        // Krypse to play
        pause_element.css("display", "none");
        //Emfanise to pause
        play_element.css("display", "inline-block");

    });

    //Filters a song removes some filtered words from the link
    function filterSongTitle(string){

        var filter = [
            "Official",
            "Lyric",
            "Video",
            "Official Music Video",
            "Official Video",
            "Official video",
            "official video",
            "Official Video",
            "OFFICIAL VIDEO",
            "Official Audio",
            "Lyrics",
            "lyrics",
            "official",
            "HD",
            "HQ",
            "Original Mix",
            "Original Version",
            "radio edit",
            "Best 92.6",
            "Unknown - ",
            "Premium Content!",
            "Extended Mix",
            "Audio",
            "FULL",
            "[]",
            "[ ]",
            "( )",
            "(  )",
            "()",
        ];

        var search = true;
        var i = 0;

        while(search){

            string = string.replace(filter[i],"");

            i+=1;
            if(i == filter.length){
                search = false;
            }
        }

        return string;

    }

    //Returns the cover's image path of a song
    function searchSong(song){
        $.getJSON('https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + song +'&api_key=' + settings.lastFmApiKey +'&format=json', { get_param: 'data' }, function(data) {

            // console.log(data.results);
            if(data.results.trackmatches.track.length){

                if(data.results.trackmatches.track[0].image[3]["#text"] === ""){
                    cover_image.attr('src',settings.emptyCoverImgUrl);
                    cover_image_mobile.attr('src',settings.emptyCoverImgUrl);

                }else{
                    // console.log(data.results.trackmatches.track[0].image[3]["#text"]);
                    cover_image.attr('src', data.results.trackmatches.track[0].image[3]["#text"]);
                    cover_image_mobile.attr('src', data.results.trackmatches.track[0].image[3]["#text"]);

                }
            }
        });
    }

    // First Fetch of the data
    $.getJSON('https://cors-anywhere.herokuapp.com/' + statisticsUrl, function(data) {

        var song = data.streams[0].songtitle;

       // song = song.split(" - ");

        //song = song[1] + " - " + song[2];

        var currentSong =song;

        current_song.empty();

        current_song.append(filterSongTitle(currentSong));

        searchSong(filterSongTitle(currentSong));
    });

    // Every 5 seconds refresh and calls the api to fetch new data
    setInterval(function(){
        $.getJSON('https://cors-anywhere.herokuapp.com/' + statisticsUrl, function(data) {

            var song = data.streams[0].songtitle;

            //song = song.split(" - ");

            //song = song[1] + " - " + song[2];

            var currentSong =song;

            current_song.empty();

            current_song.append(filterSongTitle(currentSong));

            searchSong(filterSongTitle(currentSong));
        });
    }, 5000);

    return _this;

    };

}( jQuery ));



