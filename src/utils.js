var utils = {
    trim : function(str) {
        // Trim every whitespace or comment
        // Comments start with : ~~

        var pos = str.match(/(?:(?:\s+)*(?:~~.*)*)*/);
        return pos ? str.slice(pos[0].length) : str;
    }
};

module.exports = utils;