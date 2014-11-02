var should = require("chai").should();

describe("Environment:", function(){
    var Interpreter = require("../src/interpreter");
    var environment = require("../src/environment");
    var Expression = require("../src/expressions").Expression;

    var interpreter = new Interpreter();
    var keywords = environment.keywords;
    var base = environment.base;

    it("Addition of two numbers or more.", 
        function(){
            var args = [
                new Expression("value", 3) ,
                new Expression("value", 2) ,
                new Expression("value", 1) ,
            ];

            keywords["+"].handler.call(interpreter, args, Object.create(base))
                .should.equal(6);
    });

    it("Substraction of two numbers or more.", 
        function(){
            var args = [
                new Expression("value", 3) ,
                new Expression("value", 2) ,
                new Expression("value", 1) ,
            ];

            keywords["-"].handler.call(interpreter, args, Object.create(base))
                .should.equal(0);
    });

    it("Multiplication of two numbers or more.", 
        function(){
            var args = [
                new Expression("value", 3) ,
                new Expression("value", 2) ,
                new Expression("value", 1) ,
            ];

            keywords["*"].handler.call(interpreter, args, Object.create(base))
                .should.equal(6);
    });

    it("Power of two numbers.", 
        function(){
            var args = [
                new Expression("value", 2) ,
                new Expression("value", 4) 
            ];

            keywords["**"].handler.call(interpreter, args, Object.create(base))
                .should.equal(16);
    });

    it("Division of two numbers.", 
        function(){
            var args = [
                new Expression("value", 12) ,
                new Expression("value", 5) 
            ];

            keywords["/"].handler.call(interpreter, args, Object.create(base))
                .should.equal(2.4);
    });

    it("Remainder of two numbers.", 
        function(){
            var args = [
                new Expression("value", 12) ,
                new Expression("value", 5) 
            ];

            keywords["%"].handler.call(interpreter, args, Object.create(base))
                .should.equal(2);
    });

    it("Equality of two or more objects",
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

    it("Bigger number", 
        function(){
            var args = [
                new Expression("value", 12) ,
                new Expression("value", 5) 
            ];

            keywords[">"].handler.call(interpreter, args, Object.create(base))
                .should.equal(true);
    });

    it("Smaller number", 
        function(){
            var args = [
                new Expression("value", 5) ,
                new Expression("value", 12) 
            ];

            keywords["<"].handler.call(interpreter, args, Object.create(base))
                .should.equal(true);
    });

    /*it("Condition true",
        function(){
            var args = [
                new Expression("apply", "?", new Expression("word", "?"),
                    [ new Expression("value", 2), 
                      new Expression("value", 2),
                      new Expression("value", 2) ])
            ];

            keywords["=="].handler.call(interpreter, args, Object.create(base))
                .should.equal(true);
    });*/

});