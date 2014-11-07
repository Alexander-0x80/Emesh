->
(def(count, 1),
repeat(<(count, 101),
    ->
    (def(str, ""),
    ?(eq(%(count, 3), 0), put(str, +(str, "Fizz")), 0),
    ?(eq(%(count, 5), 0), put(str, +(str, "Buzz")), 0),
    ?(eq(str, ""), out(count), out(str)),
    put(count,+(count, 1)))))