->
(def(counter, 0),
repeat(<(counter,10),
    ->
    (out(counter),
    put(counter, +(counter, 1)))))