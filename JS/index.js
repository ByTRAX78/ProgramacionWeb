var aOtherFunctions = document.getElementsByClassName('separacion');

var contenedorIframe = document.getElementById('frame');

var iframe = document.createElement('iframe');

iframe.src = '../HTML/index.html';

iframe.width = '100%';
iframe.height = '100%';
iframe.frameBorder = '0';

contenedorIframe.innerHTML = '';

contenedorIframe.appendChild(iframe);


for (let i = 0; i < aOtherFunctions.length; i++) {
    aOtherFunctions[i].addEventListener('click', function name(params) {
        
        if (i == 0) {
            iframe.src = '../HTML/index.html';
        } else if (i == 1) {
            iframe.src = '../HTML/Abautus.html';
        } else if (i == 2) {
            iframe.src = '../HTML/foro.html';
        }
        contenedorIframe.innerHTML = '';
        contenedorIframe.appendChild(iframe);
    });
}