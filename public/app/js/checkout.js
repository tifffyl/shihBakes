const e = require("express");

const SERVER_URL_STRIPE = "http://localhost:3000/create-checkout-session"


const products = [//array containing objects (product information)
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


var card = document.getElementById("card");
var cash = document.getElementById("cash");
let form = document.getElementById("billing-form");
    

if (card) {
    card.addEventListener("click", ()=>{
        localStorage.setItem("paymentMethod", "card");
    })
}
if (cash){
    cash.addEventListener("click", ()=>{
        localStorage.setItem("paymentMethod", "cash");
    })
}



function save_data(){
    //getting all values from input boxes
    var customerName = document.getElementById("customer-name"); //gets name value
    var phoneNumber = document.getElementById("phone-number"); //gets phone number value
    var email = document.getElementById("email");
    var line1 = document.getElementById("line-1");
    var line2 = document.getElementById("line-2");
    var suburb = document.getElementById("city-suburb");
    var postalCode = document.getElementById("postal-code");
    var pickupDate = document.getElementById("pick-up-date");

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





//CHECKOUT BUTTON
const btnCheckOut = document.querySelector(".checkout-button")



btnCheckOut.addEventListener("click", () => {
    console.log("hello world");
    let productsInCart = localStorage.getItem('productsInCart');
    productsInCart = JSON.parse(productsInCart); //parses the object as a JSON rather than Javascript 
    productsInCart.inCart = parseInt(products.inCart);//object value is an integer and not undefined

    let length = Object.keys(productsInCart).length
    


    //gets the objects in productsInCart
    let productOne = productsInCart[Object.keys(productsInCart)[0]];//gets the object for product one in the cart
    let productTwo = productsInCart[Object.keys(productsInCart)[1]];//gets the object for product two in the cart

    //gets the id value in the object
    let productOneID = productOne[Object.keys(productOne)[0]]; //gets ID from product 1
    let productTwoID = productTwo[Object.keys(productTwo)[0]]; //gets ID from product 2 

    //gets the quantity value in the object
    let productOneQty =  productOne[Object.keys(productOne)[4]]; //gets quantity from product 1
    let productTwoQty = productTwo[Object.keys(productOne)[4]]; //gets quantity from product 2
    
    console.log("Product one is", productOneID, "and its wuantity is", productOneQty)
    console.log("product 2 is ", productTwoID, "and its quantity is", productTwoQty)


    fetch( SERVER_URL_STRIPE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: [
                {id: productOneID, quantity: productOneQty },
                {id: productTwoID, quantity: productTwoQty },
                {id: 3, quantity: 1 }
            ],
        }),
    })
    .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
        window.location = url
    })
    .catch(e => {
        console.error(e.error)
    });
});
