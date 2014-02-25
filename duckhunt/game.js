function draw() {
    canvas = document.getElementById('game');


    /* check if drawing is supported by browser */
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        img = new Image();
        img.src = "assets/duckhunt.png";
        img.onload = function() {
            /* draw tree */
            ctx.drawImage(img, 0, 271, 80, 125, 100, 300, 140, 200);

            /* draw dirt, grass, and bushes */
            ctx.drawImage(img, 0, 710, 900, 190, 0, 410, 800, 190);

            /* draw sniffing dog */
            ctx.drawImage(img, 0, 0, 61, 45, 100, 500, 100, 75);

            /* draw birds */
            ctx.drawImage(img, 0, 118, 36, 31, 150, 50, 58, 49);
            ctx.drawImage(img, 124, 116, 42, 32, 170, 150, 58, 49);
            ctx.drawImage(img, 259, 195, 35, 39, 300, 250, 50, 56);
            ctx.drawImage(img, 299, 119, 37, 29, 500, 100, 58, 49);
            ctx.drawImage(img, 206, 151, 37, 38, 575, 300, 54, 58);
        }
        
    } else {
        alert('Sorry, canvas is not supported on your browser');
    }
}
