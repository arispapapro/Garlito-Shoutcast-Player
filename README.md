# Garlito.js 

Garlito.js is a simple shoutcast radio player.  You can check the [demo](https://garlito.fabricradio.com/) version.


![alt text](https://garlito.fabricradio.com/image.png "Garlito.js Demo Popup")


## Demo

You can check both the popup and static version of the player inside the demo folder of this repository

## Usage

- Include Jquery 3.3.1
- Include Bootstrap 4.2.1
- Include Howler.js
- Include Garlito.js & Garlito.css

```html
 <!-- Garlito CSS -->
<link rel="stylesheet" href="css/garlito.min.css">
<!--Bootstrap -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
<!-- Jquery 3.3.1 -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<!-- Bootstrap JS -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>
<!-- Howler Lib -->
<script src="js/howler.min.js" ></script>
<!-- Garlito JS -->
<script type="text/javascript" src="js/garlito.min.js"></script>
```


- To activate the player in your html

```html
<script>
    $( "#yourplayer" ).garlitoPlayer({
        ip: "x.x.x.x",
        port: "9247",
        volume: 1,
        facebookUrl: "https://facebook.com/fabricradio",
        instagramUrl: "https://instagram.com",
        radioName : "Fabric Radio",
        autoplay: true,
        popup:false,
        lastFmApiKey:"85d4e735d8374226a892f97260219982",
    });
</script>
```

## Options

- `ip`: (default: `''`) Your shoutcast ip adress.
- `port`: (default: `''`) Your shoutcast port.
- `protocol`: (default: `'http://'`) You can use 'http://' or 'https://' depends on your server.
- `emptyCoverImgUrl`: (default: `'img/no-cover.jpg'`) The img used when there is not any cover for the current song.
- `autoplay`: (default: `true`) Boolean determining whether the player starts playing automatically or not.
- `volume`: (default: `0.5`) That is the default value of the player's volume, you can use among 0 - 1 ( Ex. 0.45 ) .
- `popup`: (default: `true`) Boolean determining whether the player is initialising as a popup or static.
- `lastFmApiKey`: (default: `''`) That is the last.fm api key you need for the album covers.
- `facebookUrl`: (default: `false`) You can add your facebook's url page or whatever.
- `instagramUrl`: (default: `false`) You can add your instagram's url page or whatever.
- `logoUrl`: (default: `'img/logo.png'`) The default url of the station logo, replace it with your's,
- `radioName`: (default: `'Radio Station Name'`) The default name of the station, replace it with your's,
- `listenButtonId`: (default: `''`) If you set the popup option as true you should also set this selector to the button pointing.
- `nowPlayingText`: (default: `'Now Playing:'`) In case u want to translate it in your language.

## Thanks to
- Jquery
- Bootstrap
- Howler.js

## License
Copyright (c) 2019 Aris Papaprodromou

Released under the MIT License.




