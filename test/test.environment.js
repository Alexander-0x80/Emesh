var should = require("chai").should();

function capture_output(stream) {
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
    var Emesh = require("../src/emesh");
    var emesh = new Emesh();

    describe("Operators", function(){
        it("Addition operator", function() {
            emesh.run("+(2,2,1)").should.equal(5); 
        });

        it("Substraction", function() {
            emesh.run("-(8,2,1)").should.equal(5);
        });

        it("Multiplication", function() {
            emesh.run("*(2,4,2)").should.equal(16);
        });

        it("Power", function(){
            emesh.run("**(2,4)").should.equal(16);
        });

        it("Division", function(){
            emesh.run("/(12,5)").should.equal(2.4);
        });

        it("Remainder", function(){
            emesh.run("%(12,5)").should.equal(2);
        });

        describe("Equality", function(){
            it("Arguments are equal", function(){
                emesh.run("==(2,2,2)").should.be.true;
            });

            it("Arguments are not equal", function(){
                emesh.run("==(2,2,1)").should.be.false;
            });
        });

        describe("Greater than", function(){
            it("Left operand is bigger", function(){
                emesh.run(">(12,5)").should.be.true;
            });

            it("Left operand is smaller", function(){
                emesh.run(">(5,12)").should.be.false;
            });
        });

        describe("Less than", function(){
            it("Left operator is smaller", function(){
                emesh.run("<(5,12)").should.be.true;
            });

            it("Left operator is bigger", function(){
                emesh.run("<(12,5)").should.be.false;
            });
        });
    });

    
    describe("Input/Output", function(){
        it("Input", function(){

        });

        it("Output", function(){
            var stdout_hook;
            stdout_hook = capture_output(process.stdout);
            emesh.run('out("hello")');
            stdout_hook.unhook();
            stdout_hook.buffer().should.equal("hello\n");
        });
    });

    
    describe("Control structures", function(){
        describe("Repeat", function(){
            it("Condition is true", function(){

            });

            it("Condition is false", function(){
                emesh.run("repeat(false,1)").should.be.false;
            });
        });

        describe("Condition", function(){
            it("True condition", function(){
                emesh.run("?(true,1,2)").should.equal(1);
            });

            it("False condition", function(){
                emesh.run("?(false,1,2)").should.equal(2);
            });
        });
    });

    describe("Variables", function(){
        it("Variable definition", function(){
            emesh.run("def(a,10)");
            emesh.env.should.have.property("a").equal(10);
        });
    });

    describe("Functions", function(){
        it("Valid expression", function(){
            emesh.run("fun(a,b,a)").should.be.a("function");
        });

        it("Invalid expression", function(){
            //emesh.run("fun()").should.throw(SyntaxError);
        });
    });

    it("Universal function", function(){
        emesh.run("->(def(a,3),true,45,?(>(a,10),1,0))").should.equal(0);
    });

});