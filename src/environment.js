var base = {
    //"chuck-norris": Infinity,
    "true"  : true,
    "false" : false
}


var keywords = {
    "+": {
        // Addition operator
        // -------------------------------------
        // Usage     : +(1, 1, 1, ...)
        // Returns   : Sum of all arguments
        // Arguments : List of numbers

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
        // Substraction operator
        // -------------------------------------
        // Usage     : -(1, 1, 1, ...)
        // Returns   : Difference of all arguments
        // Arguments : List of numbers

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
        // Multiplication operator
        // -------------------------------------
        // Usage     : *(1, 1, 1, ...)
        // Returns   : Product of all arguments
        // Arguments : List of numbers

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
        // Power  operator
        // -------------------------------------
        // Usage     : **(2, 4)
        // Returns   : Power of two arguments
        // Arguments : args[0] - Base
        //             args[1] - Exponent

        arguments: 2,
        error_msg: "Bad number of arguments in '*'",
        handler: function(args, env) {
            return Math.pow(this.evaluate(args[0], env), this.evaluate(args[1], env));
        }
    },

    "/": {
        // Division operator
        // -------------------------------------
        // Usage     : /(10, 5)
        // Returns   : Quotient of two arguments
        // Arguments : args[0] - Devidend
        //             args[1] - Divisor

        arguments: 2,
        error_msg: "Bad number of arguments in '/'",
        handler: function(args, env) {
            return this.evaluate(args[0], env) / this.evaluate(args[1], env);
        }
    },

    "%": {
        // Remainder operator
        // -------------------------------------
        // Usage     : %(10, 3)
        // Returns   : Modulo of two arguments
        // Arguments : args[0] - Devidend
        //             args[1] - Divisor

        arguments: 2,
        error_msg: "Bad number of arguments in '%'",
        handler: function(args, env) {
            return this.evaluate(args[0], env) % this.evaluate(args[1], env);
        }
    },

    "==": {
        // Equality operator
        // -------------------------------------
        // Usage     : ==(1, 1, 1, ...)
        // Returns   : true if all objects are equal, false otherwise
        // Arguments : List of objects for comparison

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
        // Less than operator
        // -------------------------------------
        // Usage     : <(4, 10)
        // Returns   : True if args[0] is less than args[1]
        // Arguments : args[0] - Left operand
        //             args[1] - Right operand

        arguments: 2,
        error_msg: "Bad number of arguments in '<'",
        handler: function(args, env) {
            return this.evaluate(args[0], env) < this.evaluate(args[1], env);
        }
    },

    ">": {
        // Less than operator
        // -------------------------------------
        // Usage     : >(10, 4)
        // Returns   : True if args[0] is greater than args[1]
        // Arguments : args[0] - Left operand
        //             args[1] - Right operand

        arguments: 2,
        error_msg: "Bad number of arguments in '>'",
        handler: function(args, env) {
            return this.evaluate(args[0], env) > this.evaluate(args[1], env);
        }
    },

    "?": {
        // Condition operator
        // -------------------------------------
        // Usage     : ?(true, 1, 2)
        // Returns   : args[1] if args[0] is true , args[2] otherwise
        // Arguments : args[0] - Condition
        //             args[1] - Evaluated when condition is true
        //             args[2] - Evaluated when condition is false

        arguments: 3,
        error_msg: "Bad number of arguments in condition.",
        handler: function(args, env) {
            return (this.evaluate(args[0], env) !== false)
                ? this.evaluate(args[1], env)
                : this.evaluate(args[2], env);
        }
    },

    "loop": {
        // Loop
        // -------------------------------------
        // Usage     : loop(true, 1)
        // Returns   : false
        // Arguments : args[0] - Condition
        //             args[1] - Body

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
        // Universal function
        // -------------------------------------
        // Usage     : ->(expr, expr, expr, ... )
        // Returns   : Produced value of last argument
        // Arguments : Expressions list

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
        // Variable declaration
        // -------------------------------------
        // Usage     : def(a, 10)
        // Returns   : Value of defined variable
        // Arguments : args[0] - Variable name
        //             args[1] - Variable value

        arguments: 2,
        error_msg: "Variable declaration error.",
        handler: function(args, env) {
            var value = this.evaluate(args[1], env);
            env[args[0].value] = value;

            return value;
        }
    },

    "out": {
        // Output
        // -------------------------------------
        // Usage     : out("hello world")
        // Returns   : Output to stdout
        // Arguments : args[0] - Value

        arguments: 1,
        error_msg: "",
        handler: function(args, env) {
            console.log(this.evaluate(args[0], env));
            return true;
        }
    },

    "fun": {
        // Function declaration
        // -------------------------------------
        // Usage     : fun(arguments *n , body)
        // Returns   : Function
        // Arguments : args[0..n] - Function arguments
        //             args[last] - Function body

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
