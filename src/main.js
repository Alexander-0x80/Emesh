var Emesh = require("./emesh");


var E = new Emesh();
/*E.run("do(define(total, 0),",
    "   define(count, 1),",
    "   while(<(count, 11),",
    "         do(define(total, +(total, count)),",
    "            define(count, +(count, 1)))),",
    "   print(total))");*/

//E.run("print(-(5,2,1))");
//E.run("print( >(5,2))")

E.run("->(def(total, 0),",
    "   def(count, 1),",
    "   loop(<(count, 11),",
    "         ->(def(total, +(total, count)),",
    "            def(count, +(count, 1)))),",
    "   out(total))");

//E.run("out(*( +(2,2,2) , 2))")

/*E.run("do(define(pow, fun(base, exp,",
    "     if(==(exp, 0),",
    "        1,",
    "        *(base, pow(base, -(exp, 1)))))),",
    "   print(pow(2, 10)))");*/


