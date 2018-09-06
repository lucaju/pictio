var artyom;

// init();

function init() {

    artyom = new Artyom();
console.log(artyom.getVoices());

console.log('oi');

artyom.addCommands([
    {
        indexes: ["Good morning"],
        action: function(i){
            console.log("Good morning Triggered");
        }
    },
    {
        indexes: ["Good night"],
        action: function(i){
            console.log("Good night Triggered");
        }
    },
    {
        indexes: ["Let's Play"],
        action: function(i){
            showColorChoice();
        }
    }
]);

// Or the artisan mode to write less

artyom.on(["Good morning"]).then(function(i){
    console.log("Triggered");
});

console.log(artyom.getVoices());

artyom.initialize({
    lang:"en-US",
    debug:true, // Show what recognizes in the Console
    listen:true, // Start listening after this
    speed:0.9, // Talk a little bit slow
    mode:"normal" // This parameter is not required as it will be normal by default
});


var voices = artyom.getVoices();



for(var i = 0;i < voices.length;i++){
    var voice = voices[i];
    console.log(voice.name);
}


}
