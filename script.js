// LOAD EVENT is fired when the whole page has loaded,
// inclluding all dependent resources such as stylesheets
// and images

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    class InputHandler {

    }

    class Owlbear {

    }

    class Object {

    }

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
        }

    }

    const game = new Game(canvas.width, canvas.height);

    // console log to check properties/debug
    console.log(game);





});