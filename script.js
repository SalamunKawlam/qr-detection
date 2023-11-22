const near = document.getElementById('near');
let result = document.getElementById('result');
let nearSense = 0;
let light = 0;
let count = 0;
let camOn = false;
let lightPrev = 0;
// const scrWidth = screen.width;
// const scrHeight = screen.height;
// const minRes = Math.min(scrWidth, scrHeight);
let scanRegion = Math.floor(document.getElementById("reader").clientWidth);

const scanner = new Html5QrcodeScanner('reader',{qrbox: {width: scanRegion*0.5, height: scanRegion*0.5}, fps: 30});
let type = document.getElementsByName('scanType');

if ("AmbientLightSensor" in window) {
    const sensor = new AmbientLightSensor();

    sensor.addEventListener("reading", (event) => {
        light = sensor.illuminance;
        document.getElementById("lightData").innerHTML = `<h5>Light Level: ${light}</h5>`;
        if (light > 100 && lightPrev<=100){
            checkStatus();
        }
        lightPrev = light;
    });

    sensor.addEventListener("error", (event) => {
        console.log(event.error.name, event.error.message);
    });
    sensor.start();
}

checkStatus = () => {
    near.checked?nearSense = 1 : nearSense = 0;
    console.log("NearSense: "+nearSense);
    console.log("ScanRegion: "+scanRegion);
    
    if (nearSense == 0){
        scanner.render(success, error);
        camOn = true;
    }

    else if (nearSense == 1) {
        dynamicScanner();
    }

    // Disable the switch for 2 seconds
    near.disabled = true;
    near.classList.add('disabled'); // Add the disabled class for styling
    setTimeout(() => {
        near.classList.remove('disabled'); // Remove the disabled class
        near.disabled = false; // Re-enable the switch after 2 seconds
    }, 4000);
}

checkStatus();

dynamicScanner = () => {
    if (light > 100){
        result.innerHTML = `<h3 class="success">Sensed someone! Initiating Scanner...</h3>`;
        if (!camOn) {
            canner.render(success, error);
            camOn = true;
        }
    }

    else{
        result.innerHTML = `<h3>No one nearby! On Standby</h3>`;
        scanner.clear();
        camOn = false;
    }
}

function success(result) {
    console.log(result);
    count = count+1;

    if (type[1].checked){
        if (count == 1){
            document.getElementById("result").innerHTML = `<h3 class="success">QR Detected Successfully</h3> <a href="${result}">${result}</a> <p>${count}</p>`;
            playaudio();
        }
    }
        
    else if (type[0].checked){
        document.getElementById("result").innerHTML = `<h3 class="success">QR Detected Successfully</h3> <a href="${result}">${result}</a> <p>${count}</p>`;
        playaudio();
    }  
}

function error() {
    count = 0;
    result.innerHTML = `<h3 class="error">QR Not Found</h3>`;
}


function playaudio() {
    let audio = new Audio("success.mp3");
    audio.play();
}