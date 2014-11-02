var should = require("chai").should();

describe("Environment:", function(){
    var Interpreter = require("../src/interpreter");
    var environment = require("../src/environment");
    var Expression = require("../src/expressions").Expression;

    var interpreter = new Interpreter();
    var keywords = environment.keywords;
    var base = environment.base;

    it("Addition operator", 
        function(){
            var args = [
                new Expression("value", 3) ,
                new Expression("value", 2) ,
                new Expression("value", 1) ,
            ];

            keywords["+"].handler.call(interpreter, args, Object.create(base))
                .should.equal(6);
    });

    it("Substraction operator", 
        function(){
            var args = [
                new Expression("value", 3) ,
                new Expression("value", 2) ,
                new Expression("value", 1) ,
            ];

            keywords["-"].handler.call(interpreter, args, Object.create(base))
                .should.equal(0);
    });

    it("Multiplication operator", 
        function(){
            var args = [
                new Expression("value", 3) ,
                new Expression("value", 2) ,
                new Expression("value", 1) ,
            ];

            keywords["*"].handler.call(interpreter, args, Object.create(base))
                .should.equal(6);
    });

    it("Power operator", 
        function(){
            var args = [
                new Expression("value", 2) ,
                new Expression("value", 4) 
            ];

            keywords["**"].handler.call(interpreter, args, Object.create(base))
                .should.equal(16);
    });

    it("Division operator", 
        function(){
            var args = [
                new Expression("value", 12) ,
                new Expression("value", 5) 
            ];

            keywords["/"].handler.call(interpreter, args, Object.create(base))
                .should.equal(2.4);
    });

    it("Remainder operator", 
        function(){
            var args = [
                new Expression("value", 12) ,
                new Expression("value", 5) 
            ];

            keywords["%"].handler.call(interpreter, args, Object.create(base))
                .should.equal(2);
    });

    it("Equality operator",
        function(){
            var args = [
                new Expression("apply", "==", new Expression("word", "=="),
                    [ new Expression("value", 2), 
                      new Expression("value", 2),
                      new Expression("value", 2) ])
            ];

            keywords["=="].handler.call(interpreter, args, Object.create(base))
                .should.equal(true);
    });

    describe("Greater than operator", 
        function(){
            it("Should return true when left operand is bigger",
            function(){
                var args = [
                    new Expression("value", 12) ,
                    new Expression("value", 5) 
                ];

                keywords[">"].handler.call(interpreter, args, Object.create(base))
                    .should.equal(true);
            });

            it("Should return false when left operand is smaller",
            function(){
                var args = [
                    new Expression("value", 5) ,
                    new Expression("value", 12) 
                ];

                keywords[">"].handler.call(interpreter, args, Object.create(base))
                    .should.equal(false);
            });


    });

    describe("Less than operator",
        function(){
            it("Should return true when left operator is smaller",
            function(){
                var args = [
                    new Expression("value", 5) ,
                    new Expression("value", 12) 
                ];

                keywords["<"].handler.call(interpreter, args, Object.create(base))
                    .should.equal(true);
            });

            it("Should return false when left operator is bigger",
            function(){
                var args = [
                    new Expression("value", 12) ,
                    new Expression("value", 5) 
                ];

                keywords["<"].handler.call(interpreter, args, Object.create(base))
                    .should.equal(false);
            });
    });

    /*it("Condition operator",
        function(){
            var args = [
                new Expression("apply", "?", new Expression("word", "?"),
                    [ new Expression("value", true), 
                      new Expression("value", 1),
                      new Expression("value", 2) ])
            ];

            keywords["?"].handler.call(interpreter, args, Object.create(base))
                .should.equal(1);
    });*/

});