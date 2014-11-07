#!/usr/bin/env node

var fs = require("fs");
var Emesh = require("./emesh");

var input_file = null;

if (process.argv.length < 3) {
    // No arguments passed
    require("./repl")();

} else {
    
    input_file = process.argv[2];
    fs.readFile(input_file, "utf8", function(err, source) {
        var emesh = new Emesh();
        if (err) throw err;
        emesh.run(source);
    });
}
