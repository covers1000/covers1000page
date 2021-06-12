    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var fields = reader.result.split(",");
                parseText(fields);
            }
            reader.readAsText(file);
            requestAnimFrame(function(){repaint});
        } else {
            result.innerHTML = "File not supported!"
        }
    });

    var audioInput = document.getElementById('audioInput');
    audioInput.addEventListener('change', function(e) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = e.target.result;            
            if(context.decodeAudioData) {
                context.decodeAudioData(data, function(buff) {
                buffer = buff;
                }, function(e) {
                    console.log(e);
                });
            } else {
                buffer = context.createBuffer(data, false /*mixToMono*/);
                playAudio();
            }    
        }        
        reader.readAsArrayBuffer(audioInput.files[0]);
    });




