var expression_types = {

    "string" : { 
        // Every character inside double quotes

        type: "value",
        re: /^"([^"]*)"/,
        set: function(match) { 
            return match[1]; 
        }
    },

    "number" : {
        // Every character wich is a digit

        type: "value", 
        re: /^\d+\b/,
        set: function(match) { 
            return Number(match[0]); 
        } 
    },

    "word"   : {
        // Every character which is NOT a whitespace, 
        // function opening/closing char, argument separator char
        // or string quotes

        type: "word",
        re: /^[^\s(),"]+/,
        set: function(match) { 
            return match[0]; 
        } 
    }
};

function Expression(in_type, in_value, in_op, in_args) {
    this.type = in_type;
    this.value = (typeof(in_value) == "function") ? in_value() : in_value;
    this.op = in_op;
    this.args = in_args;
}

module.exports = { 
    types: expression_types, 
    Expression: Expression
};