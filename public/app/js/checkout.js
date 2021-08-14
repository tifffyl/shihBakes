
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


    fetch("https://shihbakes.herokuapp.com/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: [
                {id: productOneID, quantity: productOneQty },
                {id: productTwoID, quantity: productTwoQty }
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
