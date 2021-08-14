

/*  */
const btnHamburger = document.querySelector('#btnHamburger'); /* returns the first element in the document (html doc) with the ID selector 'btnHamburger' */
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');



btnHamburger.addEventListener('click', function(){ /*when element with ID btnHamburger is click, function is executed*/ 
    if(header.classList.contains('open')){  //Already open and closing it
        header.classList.remove('open'); //Removes 'open' from class attribute 
        header.classList.add('close');
    }
    else { // If class does not include 'open'
        header.classList.add('open'); //closed and is being open
        header.classList.remove('close')
    
        }
    });
    


//cart functions


//refreshes total cart items & icon
function onLoadCartNumbers() { //stops the cart displaying 0 items when pages refreshes even if there are items stored on the local storage
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart-number span').textContent = productNumbers;
    }
}




onLoadCartNumbers();