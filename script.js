// LOAD EVENT is fired when the whole page has loaded,
// inclluding all dependent resources such as stylesheets
// and images

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    class InputHandler {
        constructor(game){
            this.game = game;
            // ES6 ARROW FUNCTIONS don't bind their own this, but they inherit the one from the 
            // parent scope. We call this lexical scoping
            window.addEventListener('keydown', e => {
                this.game.lastKey = 'P' + e.key;
                // console.log(this.game.lastKey);
            });

            window.addEventListener('keyup', e => {
                this.game.lastKey = 'R' + e.key;
                // console.log(this.game.lastKey);
            });

        }
    }

    class Owlbear {

    }

    class Object {

    }

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.lastKey = undefined;
            this.input = new InputHandler(this);
        }

    }

    const game = new Game(canvas.width, canvas.height);

    // console log to check properties/debug
    console.log(game);





});