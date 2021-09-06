
const SERVER_URL_STRIPE = "http://localhost:3000/create-checkout-session" 
//variable for when in development environment
//when deployed to Heroku it would be 'https://heroku.app/shihbakes/'


const products = [ //array containing objects (product information)
    {
        name: 'Pineapple Cake',
        tag: 'pineapple-cake',
        price: 120,
        inCart: 0 //tracks how many times this item is in the cart 
    },
    {
        name: 'Egg Yolk Pastry',
        tag: 'egg-yolk-pastry',
        price: 280,
        inCart: 0
    }
]



//BILLING ADDRESS
var cash = document.getElementById("cash");
let form = document.getElementById("billing-form");
    






//function to generate random code/id
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}



//getting all values from input boxes

var customerName = document.getElementById("customer-name"); //gets name value
var phoneNumber = document.getElementById("phone-number"); //gets phone number value
var email = document.getElementById("email");
var line1 = document.getElementById("line-1");
var line2 = document.getElementById("line-2");
var suburb = document.getElementById("city-suburb");
var postalCode = document.getElementById("postal-code");
var pickupDate = document.getElementById("pick-up-date");




function save_data(){
    
    //stores all input values to local storage as a key and value pair
    localStorage.setItem("customerName", customerName.value); 
    localStorage.setItem("phoneNumber", phoneNumber.value); 
    localStorage.setItem("email", email.value);
    localStorage.setItem("line1", line1.value);
    localStorage.setItem("line2", line2.value);
    localStorage.setItem("suburb", suburb.value);
    localStorage.setItem("postalCode", postalCode.value);
    localStorage.setItem("pickupDate", pickupDate.value);
} 

//handling click event on pay by cash button 
if (cash){
    cash.addEventListener("click", ()=>{
        save_data(); //run function
        localStorage.setItem("paymentMethod", "cash"); //set the payment method as cash in local storage
    })
}


//CHECKOUT BUTTON
const btnCheckOut = document.querySelector(".checkout-button")


btnCheckOut.addEventListener("click", () => {
    if (suburb.value === '') {
        document.querySelector(".error-message").textContent = "Please enter something";
    }else{
        document.querySelector(".error-message").textContent = "";
        localStorage.setItem("paymentMethod", "card");
        let productsInCart = localStorage.getItem('productsInCart');
        productsInCart = JSON.parse(productsInCart); //parses the object as a JSON rather than Javascript 
        productsInCart.inCart = parseInt(products.inCart);//object value is an integer and not undefined

    let length = Object.keys(productsInCart).length
    console.log(productsInCart);

    //gets the objects in productsInCart
    let productOne = productsInCart[Object.keys(productsInCart)[0]];//gets the object for product one in the cart
    let productTwo = productsInCart[Object.keys(productsInCart)[1]];//gets the object for product two in the cart
    let productThree = productsInCart[Object.keys(productsInCart)[2]];//gets the object for product two in the cart

    
    //gets the id value in the object
    let productOneID = productOne[Object.keys(productOne)[0]]; //gets ID from product 1
    let productTwoID = productTwo[Object.keys(productTwo)[0]]; //gets ID from product 2 

    //gets the quantity value in the object
    let productOneQty =  productOne[Object.keys(productOne)[4]]; //gets quantity from product 1
    let productTwoQty = productTwo[Object.keys(productOne)[4]]; //gets quantity from product 2
    

    //if there are 2 products in the cart 
            if (Object.keys(productsInCart).length === 2){
                var stripeProducts = {id: productOneID, quantity: productOneQty}
                
            }else{}

        
        
        
    
    fetch( SERVER_URL_STRIPE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            items: [
                stripeProducts, 
                //it cannot read an array and a variable can only hold one object, so more than 2 items in the cart cannot be read or processed. 
                {id: 3, quantity: 1 } //item id for shipping. Fixed price and quantity 
            ],
        }),
    })
    .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
        window.location = url //redirects the page to the URL that was sent down as a response to the payment request. 
    })
    .catch(e => {
        console.error(e.error) //logs any errors in the console
    });
    


    }
    
    
});
