// FizBuzz is a program that prints the integers from 1 to 100. 
// But for multiples of three print "Fizz" instead of the number 
// and for the multiples of five print "Buzz". For numbers which
// are multiples of both three and five print "FizzBuzz".

->
(def(count, 1),
repeat(<(count, 101),
    ->
    (def(str, "" ),
    ?(eq(%(count, 3), 0), put(str, +(str, "Fizz")), 0),
    ?(eq(%(count, 5), 0), put(str, +(str, "Buzz")), 0),
    ?(eq(str, ""), out(count), out(str)),
    put(count,+(count, 1)))))