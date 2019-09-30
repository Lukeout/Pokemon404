//Create the renderer and Stage
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {transparent: true});
//renderer.backgroundColor = 0xCCFFFF;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
//renderer.resize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

// Global Variables for our "game"
var score = 0;
var x = 0;
var counter = 0; 

// Generates random Pokemon to display from Sprites
function randomPokemon() {
    
    //Dev normal 
    //return "/sprites/" + (Math.floor(Math.random() * (404 - 1 + 1)) + 1) + ".png";

    // Value for Github pages
    return "https://raw.githubusercontent.com/Lukeout/Pokemon404/gh-pages/sprites/" + 
    (Math.floor(Math.random() * (404 - 1 + 1)) + 1)
    + ".png";
}


// Event function fired when Pokemon are caught, displays a Pokeball
function drawPokeball(x, y) {
    var audio = new Audio('catch.mp3');
    audio.play();
    var ball= stage.addChild(new PIXI.Sprite.fromImage("poke.png"));
    ball.x = x + 25; 
    ball.y = y + 25;
    ball.type = "ball";
    //console.log(ball.x);
    PIXI.loader.reset();                     
}

// Draws a Pokemon using Pixi Library
function drawPokemon() {
    var poke = stage.addChild(new PIXI.Sprite.fromImage(randomPokemon()));
    poke.x = (Math.random() * window.innerWidth/1.1) - 10;
    poke.interactive = true;
    poke.on('click', function() {
        score += 1;
        document.getElementById("sc").innerHTML = score; 
        console.log(score);
        stage.removeChild(poke); 
        drawPokeball(poke.x, poke.y);
    });
    poke.on('touchstart', function() {
        score += 1;
        document.getElementById("sc").innerHTML = score; 
        console.log(score);
        stage.removeChild(poke); 
        drawPokeball(poke.x, poke.y);
    });
    PIXI.loader.reset();
    counter += 1; 
    //console.log(counter);
}

// Draw a Pokemon every .2 seconds, stop after 404 - this function fires automaticallu
var intervalID = setInterval(function () {
   drawPokemon();
   if (++x === 404) {
       window.clearInterval(intervalID);
   }
}, 200);

// Will add to each Pokemon's/Ball's X cordinate making them fall 
function gameLoop() {
   requestAnimationFrame(gameLoop);    
    for (var i = 0; i < 700; i++) {
        if (stage.children[i]) {
            if (stage.children[i].position.y <= window.innerHeight - 90) {
            stage.children[i].position.y = stage.children[i].position.y+1;
            PIXI.loader.reset();
            
            if (stage.children[i].position.y === window.innerHeight - 140) {
                if (stage.children[i].type !== "ball")
                stage.removeChild(stage.children[i]);
            }
            }
        }
        
    }
    renderer.render(stage);
}

// Begin Game
gameLoop();

