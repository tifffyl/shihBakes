
//CART FUNCTION JAVASCRIPT//
const carts = document.querySelectorAll('.add-to-cart'); //targets elements with the add-to-cart class

const product1 = document.querySelector('.product1');
const product2 = document.querySelector('.product2');



let productNumbers = localStorage.getItem('cartNumbers'); 
productNumbers = parseInt(productNumbers); //converts value to a integer from a string so it can be incremented/counted






const products = [//array containing objects (product information)
    {
        id: 1,
        name: 'Pineapple Cake',
        tag: 'pineapple-cake',
        price: 120,
        inCart: 0 //tracks how many times this item is in the cart 
    },
    {
        id: 2, 
        name: 'Egg Yolk Pastry',
        tag: 'egg-yolk-pastry',
        price: 280,
        inCart: 0
    }
]

function cartItemLength(){
    for (i=0; i < cartItems.length; i++){
        console.log()
        console.log(products[1]);
    }
}


function countItemsInCart(){
    let cartItems = document.querySelectorAll('.product')
    console.log(cartItems.length);
}





//When button is clicked
if (product1) {
        product1.addEventListener('click', () => {
            let quantity = document.querySelector('.shop-item-quantity-input').value;
            quantity = parseInt(quantity);
            
            if (isNaN(productNumbers)){ //if there is no item quantity in cart
                if (quantity <= 60){
                    cartNumbers(products[0], quantity); //runs function with product 'pineapple cake' info as parameter
                    totalCost(products[0], quantity); //passes the 'pineapple cake' product properties into funciton
                    location.reload(); //reloads page as well as local storage
                }else if (quantity > 60){ //when quantity input exceeds cart maximum
                    document.querySelector('.hidden-text').textContent = "You cannot add more than 60 pieces";
                }else if (quantity < 0){ //if the input is not valid, so negative numbers
                    document.querySelector('.hidden-text').textContent = "Please Enter a valid amount";
                } 
            }else{//if there is item quantity in local storage 
                if (quantity <= 60 - productNumbers && quantity > 0){
                    cartNumbers(products[0], quantity); //runs function with product 'pineapple cake' info as parameter
                    totalCost(products[0], quantity); //passes the 'pineapple cake' product properties into funciton
                    location.reload(); //reloads page as well as local storage to avoid miscalculations
                }else if (quantity > 60 - productNumbers){  //when quantity input + 'quantity already in car' exceeds cart maximum
                    document.querySelector('.hidden-text').textContent = "You have too many items in your cart";
                }else if (quantity < 0){ //if the input is not valid, so negative numbers
                    document.querySelector('.hidden-text').textContent = "Please Enter a valid amount";
                }
            }            
        })
} else if (product2) {
        product2.addEventListener('click', () => {
            let quantity = document.querySelector('.shop-item-quantity-input').value;
            quantity = parseInt(quantity);
            
            if (isNaN(productNumbers)){ //if there is no item quantity in cart
                if (quantity <= 60){
                    cartNumbers(products[1], quantity); //runs function with product 'pineapple cake' info as parameter
                    totalCost(products[1], quantity); //passes the 'pineapple cake' product properties into funciton
                    location.reload(); //reloads page as well as local storage
                }else if (quantity > 60){ //when quantity input exceeds cart maximum
                    document.querySelector('.hidden-text').textContent = "You cannot add more than 60 pieces";
                }else if (quantity < 0){ //if the input is not valid, so negative numbers
                    document.querySelector('.hidden-text').textContent = "Please Enter a valid amount";
                } 
            }else{//if there is item quantity in local storage 
                if (quantity <= 60 - productNumbers && quantity > 0){
                    cartNumbers(products[1], quantity); //runs function with product 'pineapple cake' info as parameter
                    totalCost(products[1], quantity); //passes the 'pineapple cake' product properties into funciton
                    location.reload(); //reloads page as well as local storage to avoid miscalculations
                }else if (quantity > 60 - productNumbers){  //when quantity input + 'quantity already in car' exceeds cart maximum
                    document.querySelector('.hidden-text').textContent = "You have too many items in your cart";
                }else if (quantity < 0){ //if the input is not valid, so negative numbers
                    document.querySelector('.hidden-text').textContent = "Please Enter a valid amount";
                }
            }  
        })
}




//to calculate how many items are being clicked/added to the cart
function cartNumbers(products, quantity) {
    let productNumbers = localStorage.getItem('cartNumbers'); 
    productNumbers = parseInt(productNumbers); //converts value to a integer from a string so it can be incremented/counted

    let totalItemNumber = productNumbers + quantity; 

    if (quantity >=1 ){ //stops span showing NaN when quantity is 0
    }else{
        quantity = 0;
    }


    if (productNumbers) { //validation to check if there are already items in the cart. Or any value stored in the local storage 
        localStorage.setItem('cartNumbers', totalItemNumber); //adds how many are user has inputed
        document.querySelector('.cart-number span').textContent = totalItemNumber; //access the text in the span in the cart button
    } else {
        localStorage.setItem('cartNumbers', quantity); //if there is nothing in the local storage, it will be set as how many inputted. 
        document.querySelector('.cart-number span').textContent = quantity;
    } 
    
    document.querySelector('.shop-item-quantity-input').value = 0;//clears textbox after being added to the cart
    
    
    setItems(products, quantity); //passes product information and quantity number found in the cartNumbers funciton into the setItems function
    
    checkQuantity(totalItemNumber);
}

function checkQuantity(totalItemNumber){
    if (totalItemNumber >=80){
        console.log("your cart is full");
    }
}

//stores the amount/quantity that the item is added/in the cart 
function setItems(products, quantity){
    let cartItems = localStorage.getItem('productsInCart');
    
    cartItems = JSON.parse(cartItems); //parses the object as a JSON rather than Javascript 
    products.inCart = parseInt(products.inCart);//object value is an integer and not undefined
    
    if(cartItems != null){ //if items in cart is not null, so if there is something there that already exists
        
        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems, //sets cart item as whatever is stored before in the local storage
                [products.tag]: products //adds a new product and not overwrite the producr previously added
            }
        }
        cartItems[products.tag].inCart += quantity; //updates the quantity by adding the new quantity on
    } else { //if there is nothing in cart
        products.inCart = quantity; //inCart will just equal to whatever value is inputted in the 'Select quantity' textbox
        cartItems = {
            [products.tag]: products //creates new product 'line' in the local storage
        }   
    }
        
    localStorage.setItem("productsInCart", JSON.stringify(cartItems)); //have to pass as a JSON object and not a javascript object
}

//calculates total cost of items in the cart 
function totalCost(products, quantity) {
    let cartCost = localStorage.getItem('totalCost');
        
    if (cartCost != null) { //if there is already a 'cartCost' in local storage
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + quantity * products.price);
    } else {
        localStorage.setItem("totalCost", quantity * products.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products-container");
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);
    
    let cartNumbers = localStorage.getItem("cartNumbers");


    if (cartItems && productContainer ) { //checking for existence of cart items and product containers so that the function will only run on the page that contains the product containers 
        productContainer.innerHTML = '';
    
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products">
            <div class="container-one">
                <div class="${item.tag} product-color">
                    <img class="cart-product-image" src="/resources/images/${item.tag}.png">
                </div> 
                <div class="product-information">
                    <div class="container-two">
                        <div class="product-name">${item.name}</div> 
                        <span>
                            <span class="dollar-sign">$</span>
                            ${insertDecimal(item.inCart * item.price)}
                        </span>
                    </div>

                    </span> 
                    <div class="price">$${insertDecimal(item.price)}</div>
                    <div class="product-quantity">
                        <button onclick="btnMinusClick()" type="button" class="quantity-button-minus"><img class="minus-icon" src="/resources/icons/minus.svg"></button>
                        <div class="cart-item-quantity">${item.inCart}</div>
                        <button id="btnAdd" type="button" class="quantity-button-add"><img class="add-icon" src="/resources/icons/add.svg"></button> 
                    </div>
                    
                </div>
                </div>
            </div>
            `    
            
        })
        productContainer.innerHTML += `

        <div class="total-info">
            <div class="total-items">Total Items: ${cartNumbers}</div>
            <div class="basket-total">
                <span class="text-info"><span">Total: <span>$${insertDecimal(cartCost)}AU</span> 
            </div>
            <div class="shipping-info"></div>
        </div>

        <button class="check-out-button" onclick="location.href = '/app/pages/billing.html';">
        <div>Checkout</div>
        ${insertDecimal(cartCost)}
        </button>
        
        `
    } else{
        productContainer.innerHTML += `
        <h2 class="empty-cart">Cart is currently empty</h2>
        <a class="menu-redirect" href="/app/pages/menu.html">click here to shop our products</a>
        `
    }
    
}

function insertDecimal(num) { //adds decimal place to numbers/price
    return (num / 100).toFixed(2);
}



//loads the functions everytime the page loads up. 
displayCart();




