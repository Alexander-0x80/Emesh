var should = require("chai").should();

describe("Environment", function() {
    var Emesh = require("../src/emesh");
    var emesh = new Emesh();

    describe("Operators", function(){

        it("Addition", function() {
            emesh.run("+(2,2,1)")
                .should.equal(5); 
        });

        it("Substraction", function() {
            emesh.run("-(8,2,1)")
                .should.equal(5);
        });

        it("Multiplication", function() {
            emesh.run("*(2,4,2)")
                .should.equal(16);
        });

        it("Power", function(){
            emesh.run("**(2,4)")
                .should.equal(16);
        });

        it("Division", function(){
            emesh.run("/(12,5)")
                .should.equal(2.4);
        });

        it("Remainder", function(){
            emesh.run("%(12,5)").should.equal(2);
        });

        describe("Equality", function(){
            it("Arguments are equal", function(){
                emesh.run("eq(2,2,2)")
                    .should.be.true;
            });

            it("Arguments are not equal", function(){
                emesh.run("eq(2,2,1)")
                    .should.be.false;
            });
        });

        describe("Greater than", function(){
            it("Left operand is bigger", function(){
                emesh.run(">(12,5)")
                    .should.be.true;
            });

            it("Left operand is smaller", function(){
                emesh.run(">(5,12)")
                    .should.be.false;
            });

            it("Bad arguments", function(){
                emesh.run.bind(emesh, ">(true)")
                    .should.throw(SyntaxError);
            });
        });

        describe("Less than", function(){
            it("Left operator is smaller", function(){
                emesh.run("<(5,12)")
                    .should.be.true;
            });

            it("Left operator is bigger", function(){
                emesh.run("<(12,5)")
                    .should.be.false;
            });

            it("Bad arguments", function(){
                emesh.run.bind(emesh, "<(true)")
                    .should.throw(SyntaxError);
            });
        });
    });

    
    describe("Input/Output", function(){
        it("Output", function(){
            var stdout_hook;
            stdout_hook = capture_output(process.stdout);
            emesh.run('out("hello")');
            stdout_hook.unhook();
            stdout_hook.buffer()
                .should.equal("hello\n");
        });
    });

    
    describe("Control structures", function(){
        describe("Repeat", function(){
            it("Condition is true", function(){

            });

            it("Condition is false", function(){
                emesh.run("repeat(false,1)")
                    .should.be.false;
            });

            it("Bad arguments", function(){
                emesh.run.bind(emesh, "repeat(true)")
                    .should.throw(SyntaxError);
            });
        });

        describe("Condition", function(){
            it("True condition", function(){
                emesh.run("?(true,1,2)")
                    .should.equal(1);
            });

            it("False condition", function(){
                emesh.run("?(false,1,2)")
                    .should.equal(2);
            });

            it("Bad arguments", function(){
                emesh.run.bind(emesh, "?(true)")
                    .should.throw(SyntaxError);
            });
        });
    });

    describe("Variables", function(){
        it("Valid definition", function(){
            emesh.run("def(a,10)");
            emesh.env.should.have.property("a").equal(10);
        });

        it("Invalid definition", function(){
            emesh.run.bind(emesh, "def(b)")
                .should.throw(SyntaxError);
        });

        it("Valid assignment", function(){
            emesh.run("put(a,15)");
            emesh.env.should.have.property("a").equal(15);
        });

        it("Invalid assignment", function(){
            emesh.run.bind(emesh, "put(a)")
                .should.throw(SyntaxError);
        });

        it("Nonexistent assignment", function(){
            emesh.run.bind(emesh, "put(b, 7)")
                .should.throw(ReferenceError);
        });

        it("Valid access", function(){
            emesh.env["_a"] = "string";
            emesh.run("_a").should.equal("string");
        });

        it("Invalid access", function(){
            emesh.run.bind(emesh, "_c")
                .should.throw(ReferenceError);
        });

    });

    describe("Functions", function(){
        var f = emesh.run("fun(a,b,a)");

        it("Valid expression", function(){
            f.should.be.a("function");
        });

        it("Invalid expression", function(){
            emesh.run.bind(emesh, "fun()")
                .should.throw(SyntaxError);
        });

        it("Valid invocation", function(){
            f(true,false).should.be.true;
        });

        it("Invalid invocation", function(){
            f.bind(emesh.interpreter)
                .should.throw(TypeError);
        });
    });

    it("New scope function", function(){
        emesh.run("->(def(a,3),true,45,?(>(a,10),1,0))")
            .should.equal(0);
    });

    describe("Comments", function(){
        it("After code", function(){
            emesh.run("1024 ~~comment").should.equal(1024);
        });

        it("New line", function(){
            emesh.run("~~comment\n 1024").should.equal(1024);
        });

        it("Multiline", function(){
            emesh.run("~~comment 1\n ~~comment 2\n 1024").should.equal(1024);
        });
    });

});


function capture_output(stream) {
    // Helper for output testing
    
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