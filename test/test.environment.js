var should = require("chai").should();

function captureStream(stream) {
    var _old_write = stream.write;
    var buffer = "";

    stream.write = function(chunk, encoding, callback) {
        buffer += chunk.toString();
    }

    return {
        unhook: function(){
            stream.write = _old_write;
        },

        buffer: function() {
            return buffer;
        }
    }
}

describe("Environment:", function() {
    var Interpreter = require("../src/interpreter");
    var environment = require("../src/environment");
    var Expression = require("../src/expressions").Expression;

    var interpreter = new Interpreter();
    var keywords = environment.keywords;
    var base = environment.base;

    it("Addition operator", function() {
        var args = [
            new Expression("value", 3) ,
            new Expression("value", 2) ,
            new Expression("value", 1) ,
        ];

        keywords["+"].handler.call(interpreter, args, Object.create(base))
            .should.equal(6);
    });

    it("Substraction operator", function() {
        var args = [
            new Expression("value", 3) ,
            new Expression("value", 2) ,
            new Expression("value", 1) ,
        ];

        keywords["-"].handler.call(interpreter, args, Object.create(base))
            .should.equal(0);
    });

    it("Multiplication operator", function() {
        var args = [
            new Expression("value", 3) ,
            new Expression("value", 2) ,
            new Expression("value", 1) ,
        ];

        keywords["*"].handler.call(interpreter, args, Object.create(base))
            .should.equal(6);
    });

    it("Power operator", function(){
        var args = [
            new Expression("value", 2) ,
            new Expression("value", 4) 
        ];

        keywords["**"].handler.call(interpreter, args, Object.create(base))
            .should.equal(16);
    });

    it("Division operator", function(){
        var args = [
            new Expression("value", 12) ,
            new Expression("value", 5) 
        ];

        keywords["/"].handler.call(interpreter, args, Object.create(base))
            .should.equal(2.4);
    });

    it("Remainder operator", function(){
        var args = [
            new Expression("value", 12) ,
            new Expression("value", 5) 
        ];

        keywords["%"].handler.call(interpreter, args, Object.create(base))
            .should.equal(2);
    });

    describe("Equality operator", function(){
        it("Should return true if all arguments are equal", function(){
            var args = [
                new Expression("value", 2), 
                new Expression("value", 2),
                new Expression("value", 2) 
            ];

            keywords["=="].handler.call(interpreter, args, Object.create(base))
                .should.be.true;
        });

        it("Should return false if arguments are not equal", function(){
            var args = [
                new Expression("value", 2), 
                new Expression("value", 2),
                new Expression("value", 1) 
            ];

            keywords["=="].handler.call(interpreter, args, Object.create(base))
                .should.be.false;
        });
    });

    describe("Greater than operator", function(){
        it("Should return true when left operand is bigger", function(){
            var args = [
                new Expression("value", 12) ,
                new Expression("value", 5) 
            ];

            keywords[">"].handler.call(interpreter, args, Object.create(base))
                .should.be.true;
        });

        it("Should return false when left operand is smaller", function(){
            var args = [
                new Expression("value", 5) ,
                new Expression("value", 12) 
            ];

            keywords[">"].handler.call(interpreter, args, Object.create(base))
                .should.be.false;
        });
    });

    describe("Less than operator", function(){
        it("Should return true when left operator is smaller", function(){
            var args = [
                new Expression("value", 5) ,
                new Expression("value", 12) 
            ];

            keywords["<"].handler.call(interpreter, args, Object.create(base))
                .should.be.true;
        });

        it("Should return false when left operator is bigger", function(){
            var args = [
                new Expression("value", 12) ,
                new Expression("value", 5) 
            ];

            keywords["<"].handler.call(interpreter, args, Object.create(base))
                .should.be.false;
        });
    });

    describe("Condition operator", function(){
        it("Should evaluate true condition", function(){
            var args = [
                new Expression("value", true), 
                new Expression("value", 1),
                new Expression("value", 2)
            ];

            keywords["?"].handler.call(interpreter, args, Object.create(base))
                .should.equal(1);
        });

        it("Should evaluate false condition", function(){
            var args = [
                new Expression("value", false), 
                new Expression("value", 1),
                new Expression("value", 2)
            ];

            keywords["?"].handler.call(interpreter, args, Object.create(base))
                .should.equal(2);
        });
    });

    describe("Loop", function(){
        it("Should evaluate body when while condition is true", function(){

        });

        it("Should not evaluate when condition is false", function(){
            args = [
                new Expression("value", false), 
                new Expression("value", 1)
            ];

            keywords["loop"].handler.call(interpreter, args, Object.create(base))
                .should.be.false;
        });
    });

    it("Output", function(){
        var stdout_hook;
        args = [ new Expression("value", "hello") ];
        stdout_hook = captureStream(process.stdout);

        keywords["out"].handler.call(interpreter, args, Object.create(base));

        stdout_hook.unhook();
        stdout_hook.buffer().should.equal("hello\n");
    });

});