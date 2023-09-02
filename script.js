const scanner = new Html5QrcodeScanner('reader',{qrbox: {width: 320, height: 240,}, fps: 30,});
let type = document.getElementsByName('scanType');
let count = 0;

scanner.render(success, error);

function success(result) {
    console.log(result);
    count = count+1;

    if (type[1].checked){
        if (count == 1){
            console.log(count);
            document.getElementById('result').innerHTML = `<h3 class="success">QR Detected Successfully</h3> <a href="${result}">${result}</a> <p>${count}</p>`;
            playaudio();
            }
        }
        
    else if (type[0].checked){
        console.log(count);
        document.getElementById('result').innerHTML = `<h3 class="success">QR Detected Successfully</h3> <a href="${result}">${result}</a> <p>${count}</p>`;
        playaudio();
    }  
}

function error(err) {
    console.log(err);
    count = 0;
    document.getElementById('result').innerHTML = `<h3 class="error">QR Not Found</h3>`;
}

function playaudio() {
    let audio = new Audio("success.mp3");
    audio.play();
}