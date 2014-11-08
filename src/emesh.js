var Parser = require("./parser");
var Interpreter = require("./interpreter");
var environment = require("./environment");


function Emesh() {
    this.__version__ = "0.1.6";
    this.env = Object.create(environment.base);
    this.parser = new Parser();
    this.interpreter = new Interpreter();
};

Emesh.prototype.run = function(){
    var program = [].slice.call(arguments, 0).join("\n");
    var stree   = this.parser.parse(program).tree;
    var result  = this.interpreter.evaluate(stree, this.env);

    return result;
}


module.exports = Emesh;