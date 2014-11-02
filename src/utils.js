var utils = {
    trim : function(str) {
        // Left trim
        var pos =  str.search(/\S/);
        return (pos === -1) ? "" : str.slice(pos);
    }
};

module.exports = utils;