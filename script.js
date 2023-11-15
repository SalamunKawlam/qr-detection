const near = document.getElementById('near');
let result = document.getElementById('result');
let nearSense = 0;
let light = 0;
// const scrWidth = screen.width;
// const scrHeight = screen.height;
// const minRes = Math.min(scrWidth, scrHeight);
let scanRegion = document.getElementById("reader").offsetWidth;

const scanner = new Html5QrcodeScanner('reader',{qrbox: {width: scanRegion*0.5, height: scanRegion*0.5}, fps: 30});
let type = document.getElementsByName('scanType');

function checkStatus(){
    near.checked?nearSense =1 : nearSense = 0;
    console.log("NearSense: "+nearSense);
    console.log("ScanRegion: "+scanRegion);
    
    if (nearSense == 0){
        scanner.render(success, error);
    }

    else if (nearSense == 1) {
        scanner.clear();

        if ("AmbientLightSensor" in window) {
            const sensor = new AmbientLightSensor();
        
            sensor.addEventListener("reading", (event) => {
                light = sensor.illuminance;
                // result.innerHTML = `<h3>Light Level: ${light}</h3>`;

                if (light > 100){
                    result.innerHTML = `<h3 class="success">Sensed someone! Initiating Scanner...</h3>`;
                    scanner.render(success, error);
                }
        
                else{
                    result.innerHTML = `<h3>No one nearby! On Standby <br>Light Level: ${light}</h3>`;
                }
            });
        
            sensor.addEventListener("error", (event) => {
                console.log(event.error.name, event.error.message);
            });
            sensor.start();
        }
    }

    // Disable the switch for 2 seconds
    near.disabled = true;
    near.classList.add('disabled'); // Add the disabled class for styling
    setTimeout(() => {
        near.classList.remove('disabled'); // Remove the disabled class
        near.disabled = false; // Re-enable the switch after 2 seconds
    }, 2000);
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