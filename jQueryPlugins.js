function solve(){
    return function(selector){
        var $select = $(selector),
            $selectedCopy = $select.clone(true),
            $addAfter = $select.prev();

        $select.remove();

        var options = $selectedCopy.children(),
            $current = $('<div>', {class: 'current', 'data-value': ''}),
            $toAppend = $('<div>', {class: 'dropdown-list'}),
            $dropDown = $('<div>', {class: 'options-container', style: 'position: absolute; display: none'}),
            $dropDownItem = $('<div>', {class: 'dropdown-item'});

        $toAppend.append($selectedCopy.css('display', 'none'));
        var $first = $selectedCopy.children(':first');
        $toAppend.append($current.text($first.text()).attr('data-value',$first.attr('value')));

        for(var i = 0, len = options.length; i < len; i++){
            var $itemToAdd = $dropDownItem.clone(true);
            $itemToAdd.attr('data-value', $(options[i]).val());
            $itemToAdd.attr('data-index', i);
            $itemToAdd.text($(options[i]).text());

            $dropDown.append($itemToAdd);
        }
        //console.log($addAfter);
        $toAppend.append($dropDown);

        //console.log(options);



        $current.on('click', function(){
            if($dropDown.css('display') === 'none'){
                $dropDown.css('display', '');
            } else if($dropDown.css('display') === '' ||$dropDown.css('display') === 'block'){
                $dropDown.css('display', 'none');
            }

        });

        $dropDown.on('click', 'div', function(){
            var $this = $(this);
            $current.attr('data-value', $this.attr('data-value'));
            $current.text($this.text());
            for(var j = 0, len = options.length; j < len; j++){
                $(options[j]).removeAttr('selected');
            }
            $(options[$this.attr('data-index')]).attr('selected', 'selected');

            $selectedCopy.val($this.attr('data-value'));
            $dropDown.css('display', 'none');

        })

        //$addAfter.after($toAppend);
        $('body').append($toAppend);
    };
}

module.exports = solve;
