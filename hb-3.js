function solve(){
    return function(){
        $.fn.listview = function(data){
            var $this = $(this),
                templateSelector = $(this).attr('data-template'),
                template = $('#' + templateSelector).html(),
                templObject = handlebars.compile(template),
                i,
                len;

            for (i = 0, len = data.length; i < len; i++){
                $this.append(templObject(data[i]));
            }
            return this;
        };
    };
}

module.exports = solve;