
const near = document.getElementById('near');
let result = document.getElementById('result');
let nearSense = 0;
let light = 0;
// const scrWidth = screen.width;
// const scrHeight = screen.height;
// const minRes = Math.min(scrWidth, scrHeight);
let scanRegion = document.getElementById("reader").offsetWidth;

if ("AmbientLightSensor" in window) {
    const sensor = new AmbientLightSensor();

    sensor.addEventListener("reading", (event) => {
        light = sensor.illuminance;
        // console.log("Light Level: "+light);
    });

    sensor.addEventListener("error", (event) => {
      console.log(event.error.name, event.error.message);
    });
    sensor.start();
}

const scanner = new Html5QrcodeScanner('reader',{qrbox: {width: scanRegion*0.5, height: scanRegion*0.5}, fps: 30});
let type = document.getElementsByName('scanType');

function checkStatus(){
    near.checked?nearSense =1 : nearSense = 0;
    console.log(nearSense);
    
    if (nearSense == 0){
        scanner.render(success, error);
    }

    else if (nearSense == 1) {
        if (light < 200){
        scanner.clear();
        result.innerHTML = `<h3>Light Level: ${light}</h3>`;
        }
        else if (light < 200){
            result.innerHTML = `<h3 class="success">Sensed Someone! Initiating Scanner...</h3>`;
            scanner.render(success, error);
        }
    }
}

checkStatus();

function success(result) {
    console.log(result);
    count = count+1;

    if (type[1].checked){
        if (count == 1){
            console.log(count);
            result.innerHTML = `<h3 class="success">QR Detected Successfully</h3> <a href="${result}">${result}</a> <p>${count}</p>`;
            playaudio();
            }
        }
        
    else if (type[0].checked){
        console.log(count);
        result.innerHTML = `<h3 class="success">QR Detected Successfully</h3> <a href="${result}">${result}</a> <p>${count}</p>`;
        playaudio();
    }  
}

function error(err) {
    count = 0;
    result.innerHTML = `<h3 class="error">QR Not Found</h3>`;
}

function playaudio() {
    let audio = new Audio("success.mp3");
    audio.play();
}