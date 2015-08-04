/* globals $ */

/*

Create a function that takes an id or DOM element and an array of contents

* if an id is provided, select the element
* Add divs to the element
  * Each div's content must be one of the items from the contents array
* The function must remove all previous content from the DOM element provided
* Throws if:
  * The provided first parameter is neither string or existing DOM element
  * The provided id does not select anything (there is no element that has such an id)
  * Any of the function params is missing
  * Any of the function params is not as described
  * Any of the contents is neight `string` or `number`
    * In that case, the content of the element **must not be** changed
*/

function solve() {

    return function (element, contents){
        var div = document.createElement('div'),
            tempDiv = document.createElement('div'),
            fragmentToAdd = document.createDocumentFragment(),
            el;
        //VALIDATION:
        if(!element || !contents){
            throw new Error('no input provided');
        }
        if(element.tagName){
            el = element
        } else if(typeof element === 'string'){
            el = document.getElementById(element);
        } else {
            throw new Error('invalid element');
        }

        //Attaching the elements:
        for (var i = 0, len = contents.length; i < len; i++) {
            if(typeof contents[i] !== 'string' && typeof contents[i] !== 'number'){
                throw new Error('invalid content');
            };
            tempDiv = div.cloneNode(true);
            tempDiv.innerHTML = contents[i];
            fragmentToAdd.appendChild(tempDiv);
        };
        el.innerHTML = '';
        el.appendChild(fragmentToAdd);
    }
}

