//Create the renderer
var renderer = PIXI.autoDetectRenderer();
renderer.backgroundColor = 0xCCFFFF;

var score = 0;

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";

renderer.autoResize = true;

renderer.resize(window.innerWidth, window.innerHeight);


document.body.appendChild(renderer.view);

var stage = new PIXI.Container();


function randomPokemon() {
    //return "/sprites/" + (Math.floor(Math.random() * (404 - 1 + 1)) + 1) + ".png";
    return "http://raw.githubusercontent.com/Lukeout/Pokemon404/gh-pages/25.png";
}


function loadPokemon() {
    var pkmn = null; 

    PIXI.loader.add('pkmn', randomPokemon()).load(function (loader, resources) {
    // This creates a texture from a 'bunny.png' image.
    pkmn = new PIXI.Sprite(resources.pkmn.texture);

    // Setup the position and scale of the bunny
    pkmn.position.x = Math.floor((Math.random() * window.innerWidthwidth/1.1) + 10)
    pkmn.position.y = 300;

    pkmn.scale.x = 1;
    pkmn.scale.y = 1;
    pkmn.interactive = true;
    pkmn.on('mousedown', onButtonDown);

    // Add the bunny to the scene we are building.
    stage.addChild(pkmn);
        
    //PIXI.loader.reset();


    // kick off the animation loop (defined below)
});
}

//for (var i = 0; i < 404; i++) {
//    var i = null;
//}
//loadPokemon();
// load the texture we need

console.log(window.innerWidth);
console.log(Math.random() * window.innerWidth);

function draw() {
for (var i = 0; i < 2; i++) {
    var yo =  stage.addChild(new PIXI.Sprite.fromImage(randomPokemon()));
    yo.x = Math.random() * window.innerWidth
    yo.interactive = true;
    yo.on('click', function() {
        score += score; 
        console.log(score);
        yo.visible = false;
    });
    PIXI.loader.reset();
}

}


function displayPokeball(x, y) {
    //var audio = new Audio('catch.mp3');
    //audio.play();
    //var ball1 = stage.addChild(new PIXI.Sprite.fromImage("ball2.png"));
    //ball1.x = x +25;
    //ball1.y = y + 25; 
    //stage.removeChild(ball1);
    var ball= stage.addChild(new PIXI.Sprite.fromImage("poke.png"));
    ball.x = x + 25; 
    ball.y = y + 25;
    ball.type = "ball";
    console.log(ball.x);
    //stage.addChild(frame1);
    PIXI.loader.reset();
                         
}

var x = 0;
var counter = 0; 
function drawPokemon() {
    var poke = stage.addChild(new PIXI.Sprite.fromImage(randomPokemon()));
    console.log(x)
    //var ball= stage.addChild(new PIXI.Sprite.fromImage("poke.png"));
    poke.x = Math.random() * window.innerWidth
    poke.interactive = true;
    poke.on('click', function() {
        score += 1;
        console.log(score);
        stage.removeChild(poke); 
        displayPokeball(poke.x, poke.y);
    });
    poke.on('touchstart', function() {
        score += 1;
        console.log(score);
        stage.removeChild(poke);
        stage.addChild(new PIXI.Sprite.fromImage("poke.png"));
    });
    
    PIXI.loader.reset();
    counter += 1; 
}


//var timerId = setInterval(drawPokemon, 300);




var intervalID = setInterval(function () {

   drawPokemon();
   //console.log(x);

   if (++x === 405) {
       window.clearInterval(intervalID);
   }
}, 200);


//draw();
//setInterval(draw, 2);
//console.log(window.innerHeight);

function gameLoop() {
   requestAnimationFrame(gameLoop);
    
    //setInterval(drawPokemon, 5000);

    
    for (var i = 0; i < 200; i++) {
        if (stage.children[i]) {
            if (stage.children[i].position.y <= window.innerHeight - 100) {
            stage.children[i].position.y = stage.children[i].position.y+1;
            PIXI.loader.reset();
            
            if (stage.children[i].position.y === window.innerHeight - 200) {
                if (stage.children[i].type !== "ball")
                stage.removeChild(stage.children[i]);
            }
            }
        }
       // PIXI.loader.reset();
        
    }
    //console.log(timerId);
    //var count = 0;
    //stage.addChild(new PIXI.Sprite.fromImage(randomPokemon()));
    //count += 1; 
    //console.log(count);

    //if (count < 404) {
      //  requestAnimationFrame(gameLoop);
        //stage.addChild(new PIXI.Sprite.fromImage(randomPokemon()));
    //}


    
    //var hold = stage.addChild(new PIXI.Sprite.fromImage(randomPokemon()));
    
    
    //stage.children[i].position.y = stage.children[i].position.y+1;
  
    
    //loadPokemon();
    
    renderer.render(stage);
}

function onButtonDown() {
    score = score + 1;
    //this.destroy();
    //stage.removeChild(child)
    console.log(score);
    //destroy = true;
}

function onMouseUp(child) {
    //stage.removeChild(child);
}

requestAnimationFrame(gameLoop)
//setInterval(gameLoop(), 1000)
