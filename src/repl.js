var readline = require("readline");
var Emesh = require("./emesh");

var emesh = new Emesh();
var repl = readline.createInterface({
    input: process.stdin,
    output: process.stdout     
});

function greet() {
    console.log("\033[32m" + "Welcome to Emesh REPL." + "\033[0m");   // Green
    console.log("Version: " + emesh.__version__);
    console.log("type exit() to end session.");
}

function wait_for_command() {
    repl.question(">", function(source){
        if (source === "exit()") { 
            repl.close(); 
            return 0;
        }

        try {
            var result = emesh.run(source);
            if (result) { console.log(result) }
        } catch (err) {
            console.log("\033[31m" + err.toString() + "\033[0m");   // Red
        }

        wait_for_command();
    });
};

function run() {
    greet();
    wait_for_command();
}

module.exports = run;