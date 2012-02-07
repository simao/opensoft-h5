(function () {
    var logBox = document.getElementById("ws-logbox");
    
    function startConnection (evt) {
        var socket = new WebSocket('ws://echo.websocket.org?encoding=text');
        
        logBox.value = "Connecting..\n"

        socket.onopen = function(event) {
            socket.send('Hello, Opensoft!');
        };

        socket.onmessage = function(event) { 
            logBox.value += 'Received echo: ' + event.data + '\n';

            socket.close();
        }
        
        socket.onclose = function(event) { 
            logBox.value += 'Closed Connection\n';
        }        
    }

    document.getElementById("ws-start-btn").addEventListener('click', startConnection);
})();

(function() {
            var map = null;
            var geolog = document.querySelector('#geo-log');
            var geoMap = document.querySelector('#geo-map');

            function showPosition(position) {
              geolog.textContent = "Está a menos de " + position.coords.accuracy +
                  " metros de: (" + position.coords.latitude + ", " +
                  position.coords.longitude + ")";
              var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              var marker = new google.maps.Marker({
                position: latLng,
                map: map
              });
              map.setCenter(latLng);
              map.setZoom(15);

                console.log(map)
            }

            function handlePositionError(evt) {
              geolog.textContent = evt.message;
            }

            function successPositionHandler(evt) {
              // Load map if it doesn't already exist and when user clicks the button.
              if (!map) {
                map = new google.maps.Map(geoMap, {
                  zoom: 3,
                  center: new google.maps.LatLng(37.4419, -94.1419), // United States
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                map.getDiv().style.border =  '1px solid #ccc';
              }

              if (navigator.geolocation) {
                geolog.style.visibility = 'visible';
                geolog.textContent = 'Looking for location...';
                navigator.geolocation.getCurrentPosition(showPosition, handlePositionError);
                // Also monitor position as it changes.
                //navigator.geolocation.watchPosition(showPosition, handlePositionError);
              } else {
                geolog.textContent = 'Oops! Your browser does not support geolocation.';
              }
            }

    document.getElementById("see-position").addEventListener('click', successPositionHandler);
    geoMap.addEventListener('click', successPositionHandler, false);
})();

(function () {
    function draw() {
        var canvasContext = document.getElementById("canvas").getContext("2d");
        canvasContext.fillRect(250, 25, 150, 100);
        canvasContext.beginPath();
        canvasContext.arc(450, 110, 100, Math.PI * 1/2, Math.PI * 3/2);
        canvasContext.lineWidth = 15;
        canvasContext.strokeStyle = 'rgba(255, 127, 0, 0.5)';
        canvasContext.stroke();    
    };

    document.getElementById("draw-btn").addEventListener('click', draw);
})();


(function() {
    var dragZone = document.querySelector('#drag-zone');
    var dropZone = document.querySelector('#drop-zone');
    dragZone.addEventListener('dragend', function(event) {
        event.target.style.border = "4px solid #888";
        return true;
    }, true);
    dropZone.addEventListener('dragover', function(event) {
        if (event.preventDefault) event.preventDefault(); // allows us to drop
        event.dataTransfer.dropEffect = 'copy';
        return false;
    }, false);
    dropZone.addEventListener('drop', function(event) {
        if (event.preventDefault) event.preventDefault();
        var dropdata = document.querySelector('#drop-data');
        var types = event.dataTransfer.types;
        this.innerHTML = '';
        var cEl = document.createElement('canvas');
        cEl.width = 317;
        cEl.height = 114;
        var ctx = cEl.getContext('2d');
        var img_buffer = document.createElement('img');
        img_buffer.src = "img/logo_os.png";
        img_buffer.style.display = 'none';
        img_buffer.onload = function() { ctx.drawImage(img_buffer,0,0,317,114); }
        this.appendChild(cEl);
        return false;
    }, false);
})();

(function() {
    function showNotification() {
        if (window.webkitNotifications.checkPermission() == 0) {
            window.webkitNotifications.createNotification("img/logo_os_small.png", "Olá!", "Olá Opensoft").show();
        } else {
            window.webkitNotifications.requestPermission();
        }        
    }
    document.getElementById("show-notif-btn").addEventListener('click', showNotification);
})();
