/* globals $ */

/*
Create a function that takes a selector and:
* Finds all elements with class `button` or `content` within the provided element
  * Change the content of all `.button` elements with "hide"
* When a `.button` is clicked:
  * Find the topmost `.content` element, that is before another `.button` and:
    * If the `.content` is visible:
      * Hide the `.content`
      * Change the content of the `.button` to "show"
    * If the `.content` is hidden:
      * Show the `.content`
      * Change the content of the `.button` to "hide"
    * If there isn't a `.content` element **after the clicked `.button`** and **before other `.button`**, do nothing
* Throws if:
  * The provided ID is not a **jQuery object** or a `string`

*/
function solve() {
    return function (selector) {
        if(!selector || typeof selector !== 'string'){
            throw new Error('invalid or no selector!');
        }

        var $container = $(selector);

        if($container.length === 0){
            throw new Error('does not select anything');
        }

        $(selector + ' .button').each(function(){
            $(this).text('hide');
        });


        $container.on('click', ' .button', function(ev){
            var $this = $(this),
                $current = $this.next(),
                $toToggle = null;


            while(!$current.hasClass('button')){
                if($current.hasClass('content')){
                    $toToggle = $current;
                    break;
                }
                $current = $current.next();
            }


            if($toToggle){
                if($toToggle.css('display') === 'none'){
                    $toToggle.css('display', '');
                    $this.text('hide');
                } else if($toToggle.css('display') === '' || $toToggle.css('display') === 'block'){
                    $toToggle.css('display', 'none');
                    $this.text('show');
                }
            }
        })
    };
};

module.exports = solve;
