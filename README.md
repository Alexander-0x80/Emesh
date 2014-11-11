[!img](misc/emesh.png) Emesh
=====

> Toy programming language created for fun


### Install

```
$ npm install -g emesh
```

### Use

```
# Start interpreter
$ emesh

# Execute source file
$ emesh /path/to/input_file.em
```

### Syntax

``` 
    // Output
    out("Hello World")   // Hello World
    out(5)               // 5

    // Addition
    +(2,5)        // 7
    +(2,2,5)      // 9
    +(1,1,1,1,1)  // 5
    
    // Substraction
    -(6,3)        // 3
    -(5,15)       // -10
    
    // Multiplication
    *(2,8)        // 16
    *(2,2,2,2)    // 16
    
    // Division
    /(12,6)       // 2
    /(12,7)       // 1.7142857142857142
    %(12,6)       // 0    
    %(12,7)       // 5
    
    // Greater \ Less
    >(10,5)       // true
    <(10,5)       // false
    
    // Equality
    eq(2,2)       // true
    eq(2,1)       // false
    eq(2,2,2,2)   // true
    
    // Power
    **(2,16)      // 65536
    
    
    // Variables
    def(n1,10)
    def(n2,5)              
    +(n1,n2)      // 15
    
    def(n3,0)
    put(n3,12)
    out(n3)       // 12
    
    def(s1,"Hello")
    def(s2,"World")
    +(s1, +(" ",s2)) // Hello world
    

    // Functions
    def(plus_five, fun(num, +(num,5)))
    plus_five(10)    // 15
    
    
    // Flow control 
    ?(true,1,0)     // 1
    ?(false,1,0)    // 0
    ?(>(10,5),"bigger,"smaller")    // bigger
    
    def(n,20)
    repeat(>(n,10),put(n,-(n,1)))
    out(n)    // 10
    
    
    // Arrow function - Evaluates all arguments
    // returns last argument result .
    
    ->(def(x,33),put(x,11), x)
    // 11
    ?(true, ->(def(x,10), +(x,1)), ->(def(y,20), +(y,1)))
    // 10
    ?(false, ->(def(x,10), +(x,1)), ->(def(y,20), +(y,1)))
    // 21
    ->(def(i, 0),repeat(<(i,10), ->(out(i), put(i, +(i, 1)))))
    // 0
    // 1
    // 2
    // 3
    // 4
    // 5
    // 6
    // 7
    // 8
    // 9

```

### Example program

```
    // FizzBuzz
    
    ->
    (def(count, 1),
    repeat(<(count, 101),
        ->
        (def(str, "" ),
        ?(eq(%(count, 3), 0), put(str, +(str, "Fizz")), 0),
        ?(eq(%(count, 5), 0), put(str, +(str, "Buzz")), 0),
        ?(eq(str, ""), out(count), out(str)),
        put(count,+(count, 1)))))
```


