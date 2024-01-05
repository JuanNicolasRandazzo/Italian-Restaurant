// variable that mantains the state visible of the cart

let cartVar = false;

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)


}else{
    ready();
}

function ready(){
    // We add the functionality to the delete buttons
    let delItembtn = document.getElementsByClassName('btn-delete');
    for(let i = 0; i <delItembtn.length; i++ ){
        let button = delItembtn[i];
        button.addEventListener('click', deleteItemCart )
    }

    //Button adding quantity
    let buttonsPlusQuantity = document.getElementsByClassName('add-btn');
    for(let i = 0; i <buttonsPlusQuantity.length; i++ ){
        let button = buttonsPlusQuantity[i];
        button.addEventListener('click', addQuantity);
    }

    //Button substract quantity
    let buttonsSubstractQuantity = document.getElementsByClassName('substract-btn');
    for(let i = 0; i <buttonsSubstractQuantity.length; i++ ){
        let button = buttonsSubstractQuantity[i];
        button.addEventListener('click', subQuantity);
    }

    //Buttons add cart

    let addCartBtn = document.getElementsByClassName('add-cart-btn');
    for(let i=0; i <addCartBtn.length; i++){
        let button = addCartBtn[i];
        button.addEventListener('click', addCartClicked);
    }

    //add functionality to the pay button
    document.getElementsByClassName('btn-pay')[0].addEventListener('click', payClicked);

}

//Function that eliminates the selected item from the cart

function deleteItemCart(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    //Updating the total price in the cart once one element is deleated.
    updateTotalCart();

    //Function that updates the total price in the cart once it is eliminated
    // If there's no Item the cart must be hidden. 
    hideCart();
}


function updateTotalCart(){
    //We select the container cart
    let cartCont = document.getElementsByClassName('cart')[0];
    let cartItems = cartCont.getElementsByClassName('cart-item');
    let total =0;

    //Going through each element in the cart. 

    for(let i = 0; i <cartItems.length; i++ ){
        let item = cartItems[i];
        let elementPrice = item.getElementsByClassName('cart-item-price')[0];
        console.log(elementPrice);

        let price = parseFloat(elementPrice.innerText.replace('$','').replace('.',''));
        console.log(price);
        let quantityItem = item.getElementsByClassName('cart-item-quantity')[0]; //Quantity of items remained. 
        let quantity = quantityItem.value;
        console.log(quantity);
        total = total + (price * quantity);
    }
    total =Math.round(total * 100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total.toLocaleString("us") + '.00';

}
function hideCart(){
    let cartItems = document.getElementsByClassName('cart-items')[0];
    if(cartItems.childElementCount==0){
        let cart = document.getElementsByClassName('cart')[0];
        cart.style.marginRight = '-100%';
        cart.style.opacity='0';
        cartVisible = false;

        var items = document.getElementsByClassName('menu-container2')[0];
        items.style.width = '100%';
    }
}
function addQuantity(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let currentQuantity = selector.getElementsByClassName('cart-item-quantity')[0].value;
    console.log(currentQuantity);
    currentQuantity++;
    selector.getElementsByClassName('cart-item-quantity')[0].value = currentQuantity;
    // Updating the total

    updateTotalCart();
}

function subQuantity(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let currentQuantity = selector.getElementsByClassName('cart-item-quantity')[0].value;
    console.log(currentQuantity);
    currentQuantity--;
    //It can't be < 1
    if (currentQuantity >=1){
        selector.getElementsByClassName('cart-item-quantity')[0].value = currentQuantity;
        // Updating the total
    
        updateTotalCart();
    }
    
}

function addCartClicked(event){ 

    let button = event.target;
    let item = button.closest('.menu');
    console.log(item);
    let title = item.getElementsByClassName('item-title')[0].innerText;
    console.log(title);   
 
    let price =item.getElementsByClassName('item-price')[0].innerText;
    let images = item.getElementsByClassName('item-img')[0].src;
    console.log(images);

    // This function adds the elements to the cart
    addItemCart(title,price,images);

    //Making cart visible once theres an order added for the first time 
    makeCartVisible();
    
}

function addItemCart(title,price,images){
    let item = document.createElement('div');
    item.classList.add = ('item');
    let cartItems = document.getElementsByClassName('cart-items')[0];

    //Controling duplicated items

    let namesItemsCart = cartItems.getElementsByClassName('cart-item-title');
    for(let i = 0; i <namesItemsCart.length; i++ ){ 
        console.log(namesItemsCart[i].innerText); 

        if(namesItemsCart[i].innerText.trim().toLowerCase() == title.trim().toLowerCase()){
            alert("Item is already in the cart");
            return;
        }

     
    }
    var itemCartContainer = `
    <div class="cart-item">
        <img src="${images}" alt="" width="80px">
        <div class="cart-item-details">
            <span class="cart-item-title">${title}</span>
            <div class="quantity-selector">
                <span class="material-symbols-outlined substract-btn">
                remove
                </span>
                <input type="text" value="1" class="cart-item-quantity" disabled>
                <span class="material-symbols-outlined add-btn">
                align_flex_center
                </span>
            </div>
            <span class="cart-item-price">${price}</span>
        </div>
            <span class="btn-delete">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </span>
    </div>
    `
    item.innerHTML = itemCartContainer;
    cartItems.append(item); 

    //Add delete functionality to the new item
    item.getElementsByClassName('btn-delete')[0].addEventListener('click', deleteItemCart );
    
    //add increment functionality to the new item
    let buttonsPlusQuantity = item.getElementsByClassName('add-btn')[0];
    buttonsPlusQuantity.addEventListener('click', addQuantity);

    //add subtract functionality to the new item
     let buttonsSubstractQuantity = item.getElementsByClassName('substract-btn')[0];
     buttonsSubstractQuantity.addEventListener('click', subQuantity);
}
function payClicked(event){
    alert("Thank you for your purchase");

    let cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }

    updateTotalCart();

    hideCart();

}

function  makeCartVisible(){
    cartVar = true;
    var cart = document.getElementsByClassName('cart')[0];
    cart.style.marginRight='0';
    cart.style.opacity= '1';
    cart.style.width = '35%';

    var items = document.getElementsByClassName('cart-items')[0];
    items.style.width='100%';
    updateTotalCart();
}


