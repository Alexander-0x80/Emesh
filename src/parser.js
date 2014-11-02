var expressions = require("./expressions");
var utils = require("./utils");

var Expression = expressions.Expression;
var syntax = {
    arg_separator:  ",",
    func_open:      "(",
    func_close:     ")"
};

function Parser() {}

Parser.prototype.parse = function(source) {
    var match, expr;
    source = utils.trim(source);

    for(type in expressions.types) {
        if (match = expressions.types[type].re.exec(source)) {
            expr = new Expression(expressions.types[type].type, expressions.types[type].set(match));
            break;
        }
    }

    if (expr === undefined) {
        throw new SyntaxError("Unexpected syntax: " + source);
    }

    return this.apply_parse(expr, source.slice(match[0].length));
};

Parser.prototype.apply_parse = function(expr, source) {
    source = utils.trim(source);

    if (source[0] !== syntax.func_open) {
        // Not a function
        return { tree: expr, rest: source };
    }

    // Skip opening parenthesis
    source = utils.trim(source.slice(1));
    expr = new Expression("apply", expr.value, expr, []);

    while(source[0] != syntax.func_close) {
        var arg = this.parse(source);
        expr.args.push(arg.tree);
        source = utils.trim(arg.rest);
        if (source[0] === syntax.arg_separator) {
            source = utils.trim(source.slice(1));
        } else if (source[0] != syntax.func_close) {
            throw new SyntaxError("Expected '" + 
                syntax.arg_separator + "' or '" + 
                syntax.func_close + "'");
        }
    }

    return this.apply_parse(expr, source.slice(1));
}

module.exports = Parser;
