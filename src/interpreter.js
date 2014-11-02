function Interpreter() {
    this.environment = require("./environment");
}

Interpreter.prototype.apply_keyword = function(keyword, args, env) {
    if (keyword.arguments !== Infinity && keyword.arguments !== args.length) {
        throw new SyntaxError(keyword.error_msg);
    }

    return keyword.handler.call(this, args, env);
};

Interpreter.prototype.evaluate = function(expr, env) {
    switch(expr.type) {
        case "value":
            return expr.value;

        case "word":
            if (expr.value in env) { return env[expr.value]; }
            else { throw new ReferenceError("Undefined variable found: " + expr["value"]); }

        case "apply":
            if (expr.op.type == "word" && expr.op.value in this.environment.keywords) {
                return this.apply_keyword(this.environment.keywords[expr.op.value], expr.args, env);
            }

            var op = this.evaluate(expr.op, env);
            if (typeof op != "function") {
                throw new TypeError("Non-funcion apply detected.");
            }

            return op.apply(null, expr.args.map(function(arg){
                return this.evaluate(arg, env);
            }, this));
        
    }
};

module.exports = Interpreter;