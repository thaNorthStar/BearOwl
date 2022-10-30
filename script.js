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
        constructor(game){
            this.game = game;
            this.spriteWidth = 200;
            this.spriteHeight = 200;
            this.frameX = 0;
            this.frameY = 4;
            this.maxFrame = 30;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = 200;
            this.y = 200;
            this.speedX = 0;
            //  pixels per animation frame
            this.speedY = 0;
            this.maxSpeed = 2;
            this.image = document.getElementById('owlbear');
            this.fps = 60;
            this.frameInterval = 1000/this.fps;
            this.frameTimer = 0;
        }
        draw(context){
          //  context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight, this.width, this.height);
        }
        setSpeed(speedX, speedY){
            this.speedX = speedX;
            this.speedY= speedY;
        }
        update(deltaTime){
            if (this.game.lastKey == 'PArrowLeft'){
                this.setSpeed(-this.maxSpeed, 0);
                this.frameY = 3;
            } else if (this.game.lastKey == 'RArrowLeft' && this.speedX < 0){
                this.setSpeed(0, 0);
                this.frameY = 2;
            } else if  (this.game.lastKey == 'PArrowRight'){
                this.setSpeed(this.maxSpeed, 0);
                this.frameY = 5;
            } else if  (this.game.lastKey == 'RArrowRight' && this.speedX > 0){
                this.setSpeed(0, 0);
                this.frameY = 4;
            } else if (this.game.lastKey == 'PArrowUp') {
                this.setSpeed(0, -this.maxSpeed * 0.6);
                this.frameY = 7;
            } else if (this.game.lastKey == 'RArrowUp' && this.speedY < 0) {
                this.setSpeed(0, 0);
                this.frameY = 6;
            } else if (this.game.lastKey == 'PArrowDown') {
                this.setSpeed(0, this.maxSpeed * 0.6);
                this.frameY = 1;
            } else if (this.game.lastKey == 'RArrowDown' && this.speedY > 0) {
                this.setSpeed(0, 0);
                this.frameY = 0;
            } 
            this.x += this.speedX;
            this.y += this.speedY;
            // horizontal boundries so player cant leave canvas\
            if (this.x < 0){
                this.x = 0;
            } else if (this.x > this.game.width - this.width){
                this.x = this.game.width - this.width;
            }
            // vertical boundries
            if (this.y < 0 + this.game.topMargin){
                this.y = this.game.topMargin;
            } else if (this.y > this.game.height - this.height){
                this.y = this.game.height - this.height
            }
            // sprite animations
            if (this.frameTimer > this.frameInterval){
                //ternary
                (this.frameX < this.maxFrame) ? this.frameX++ : this.frameX=0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
        }
    }
    
    class Object {
        constructor(game){
            this.game = game;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        // update to be added later to add more features
        update(){
        }
    }
    class Bush extends Object{
        constructor(game){
            super(game);
            this.game = game;
            this.image = document.getElementById('bush');
            this.imageWidth = this.width = 216;
            this.imageHeight = this.height = 100;
            this.x = Math.random() * this.game.width - this.width;
            this.y = this.game.topMargin + Math.random() * (this.game.height - this.height - this.game.topMargin);
        }
    }

    class Plant extends Object{
        constructor(game){
            super(game);
            this.game = game;
            this.image = document.getElementById('plant');
            this.imageWidth = this.width = 212;
            this.imageHeight = this.height = 118;
            this.x = Math.random() * this.game.width - this.width;
            this.y = this.game.topMargin + Math.random() * (this.game.height - this.height - this.game.topMargin);
        }
    }

    class Grass extends Object{
        constructor(game){
            super(game);
            this.game = game;
            this.image = document.getElementById('grass');
            this.width = this.imageWidth = 103;
            this.height = this.imageHeight = 102;
            this.x = Math.random() * this.game.width - this.width;
            this.y = this.game.topMargin + Math.random() * (this.game.height - this.height - this.game.topMargin);
        }
    }

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.topMargin = 200;
            this.lastKey = undefined;
            this.input = new InputHandler(this);
            this.owlbear = new Owlbear(this);
            this.numberOfPlants = 10;
            this.plants = [];
            this.gameObjects = [];
        }
        render(context, deltaTime){
            this.gameObjects = [...this.plants, this.owlbear];
            this.gameObjects.sort((a,b) => {
                return (a.y + a.height) - (b.y + b.height)
            });
            this.gameObjects.forEach(object => {
                object.draw(context);
                object.update(deltaTime);
            });
        }
        init(){
            for (let i = 0; i < this.numberOfPlants; i++){
                const randomize = Math.random();
                if (randomize < 0.3) this.plants.push(new Plant(this));
                else if (randomize < 0.6) this.plants.push(new Bush(this));
                else this.plants.push(new Grass(this));
            }
        }
    }

    const game = new Game(canvas.width, canvas.height);
    game.init();
    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        game.render(ctx, deltaTime);
        requestAnimationFrame(animate);
    }
    
    animate(0);
});