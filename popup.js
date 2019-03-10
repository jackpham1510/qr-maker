let $ = q => document.querySelector(q);
let $generate = $('#generate');
let $input = $('#input');
let $qrcode = $('#qrcode');
let qrcode = null;

function processQR() {
  let val = $input.value;
  if (val.length > 0) {
    $qrcode.style.display = 'block';
    if (qrcode) {
      qrcode.makeCode(val);
    }
    else {
      qrcode = new QRCode("qrcode", {
        text: val,
        width: 256,
        height: 256
      });
    }
  }
  else {
    $qrcode.style.display = 'none';
  }
}

$input.onkeyup = processQR;
console.log(chrome.tabs);
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(tabs[0].id, {
    file: 'contentScript.js'  
  }, function (result) {
    if (result) {
      let selection = result[0];
      if (selection && selection.length > 0) {
        $input.value = selection;
        processQR();
      }
    }
  });
});
