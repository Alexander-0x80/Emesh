var base = {
    //"chuck-norris": Infinity,
    "true"  : true,
    "false" : false
}


var keywords = {
    "+": {
        arguments: Infinity,
        error_msg: "",
        handler: function(args, env) {
            return args.map(function(arg){
                return this.evaluate(arg, env);
            }, this).reduce(function(prev, cur, i, arr){
                return prev + cur;
            });
        }
    },

    "-": {
        arguments: Infinity,
        error_msg: "",
        handler: function(args, env) {
            return args.map(function(arg){
                return this.evaluate(arg, env);
            }, this).reduce(function(prev, cur, i, arr){
                return prev - cur;
            });
        }
    },

    "*": {
        arguments: Infinity,
        error_msg: "",
        handler: function(args, env) {
            return args.map(function(arg){
                return this.evaluate(arg, env);
            }, this).reduce(function(prev, cur, i, arr){
                return prev * cur;
            });
        }
    },

    "**": { 
        arguments: 2,
        error_msg: "Bad number of arguments in '*'",
        handler: function(args, env) {
            return Math.pow(this.evaluate(args[0], env), this.evaluate(args[1], env));
        }
    },

    "/": {
        arguments: 2,
        error_msg: "Bad number of arguments in '/'",
        handler: function(args, env) {
            return this.evaluate(args[0], env) / this.evaluate(args[1], env);
        }
    },

    "%": {
        arguments: 2,
        error_msg: "Bad number of arguments in '%'",
        handler: function(args, env) {
            return this.evaluate(args[0], env) % this.evaluate(args[1], env);
        }
    },

    "==": {
        arguments: Infinity,
        error_msg: "",
        handler: function(args, env) {
            var arg0 = this.evaluate(args[0]);
            return args.slice(1).every(function(arg){
                return  arg0 === this.evaluate(arg);
            }, this);
        }
    },

    "<": {
        arguments: 2,
        error_msg: "Bad number of arguments in '<'",
        handler: function(args, env) {
            return this.evaluate(args[0], env) < this.evaluate(args[1], env);
        }
    },

    ">": {
        arguments: 2,
        error_msg: "Bad number of arguments in '>'",
        handler: function(args, env) {
            return this.evaluate(args[0], env) > this.evaluate(args[1], env);
        }
    },

    "?": {
        arguments: 3,
        error_msg: "Bad number of arguments in condition.",
        handler: function(args, env) {
            return (this.evaluate(args[0], env) !== false)
                ? this.evaluate(args[1], env)
                : this.evaluate(args[2], env);
        }
    },

    "loop": {
        arguments: 2,
        error_msg: "Bad number of arguments in while.",
        handler: function(args, env) {
            while(this.evaluate(args[0], env) !== false) {
                this.evaluate(args[1], env);
            }

            return false;
        }
    },

    "->": {
        arguments: Infinity,
        error_msg: "",
        handler: function(args, env) {
            var self = this;
            var result = false;
            args.forEach(function(arg) {
                result = self.evaluate(arg, env);
            });

            return result;
        }

    },

    "def": {
        arguments: 2,
        error_msg: "Variable declaration error.",
        handler: function(args, env) {
            var value = this.evaluate(args[1], env);
            env[args[0].value] = value;

            return value;
        }
    },

    "out": {
        arguments: 1,
        error_msg: "",
        handler: function(args, env) {
            console.log(this.evaluate(args[0], env));
        }
    },

    "fun": {
        arguments: Infinity,
        error_msg: "Function declaration without a function_body.",
        handler: function(args, env) {
            // Arguments come first , body last
            var function_body = args[args.length -1];
            var function_arguments = args.slice(0, args.length -1).map(
                    function(expr){
                        if (expr.type != "word") {
                            throw new SyntaxError("Function argument must be a word");
                        }

                        return expr.value;
                    });
            
            return function() {
                if (arguments.length != function_arguments.length) {
                    throw new TypeError("Wrong number of arguments.");
                }

                var local_environment = Object.create(env);
                [].forEach.call(arguments, function(argument, index){
                    local_environment[function_arguments[index]] = argument;
                });

                return this.evaluate(function_body, local_environment);
            }.bind(this);
        }
    }
};


module.exports = {
    base: base,
    keywords:  keywords
};
