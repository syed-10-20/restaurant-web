/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const navbar =
    document.getElementById("navbar");


menuButton.addEventListener("click", () => {

    navbar.classList.toggle("active");

});


/* Close menu after clicking */

document.querySelectorAll(".navbar a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

        });

    });



/* =====================================================
   FOOD CATEGORY FILTER
===================================================== */

const categoryButtons =
    document.querySelectorAll(".category-card");

const foodCards =
    document.querySelectorAll(".food-card");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory =
            button.dataset.category;


        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        foodCards.forEach(card => {

            const cardCategory =
                card.dataset.category;


            if (
                selectedCategory === "all" ||
                cardCategory === selectedCategory
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});



/* =====================================================
   FOOD SEARCH
===================================================== */

const searchInput =
    document.getElementById("foodSearch");

const searchButton =
    document.getElementById("searchButton");


function searchFood() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    foodCards.forEach(card => {

        const foodName =
            card.dataset.name.toLowerCase();


        if (
            searchTerm === "" ||
            foodName.includes(searchTerm)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


searchButton.addEventListener(
    "click",
    searchFood
);


searchInput.addEventListener(
    "keyup",
    event => {

        if (event.key === "Enter") {

            searchFood();

        }

    }
);



/* =====================================================
   FAVORITE BUTTON
===================================================== */

document.querySelectorAll(".favorite")
    .forEach(button => {

        button.addEventListener("click", () => {

            if (button.textContent === "♡") {

                button.textContent = "♥";

                button.style.color = "#f15a29";

            } else {

                button.textContent = "♡";

                button.style.color = "";

            }

        });

    });



/* =====================================================
   SHOPPING CART
===================================================== */

let cart = [];


const cartButton =
    document.getElementById("cartButton");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");



/* Open cart */

cartButton.addEventListener("click", () => {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

});


/* Close cart */

function hideCart() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

}


closeCart.addEventListener(
    "click",
    hideCart
);


cartOverlay.addEventListener(
    "click",
    hideCart
);



/* Add buttons */

document.querySelectorAll(".add-button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const name =
                button.dataset.name;

            const price =
                Number(button.dataset.price);


            const existingItem =
                cart.find(item =>
                    item.name === name
                );


            if (existingItem) {

                existingItem.quantity++;

            } else {

                cart.push({

                    name: name,

                    price: price,

                    quantity: 1

                });

            }


            updateCart();


            /* Small button animation */

            button.textContent = "✓ Added";

            button.style.background =
                "#159447";

            button.style.color =
                "white";


            setTimeout(() => {

                button.textContent = "+ Add";

                button.style.background =
                    "";

                button.style.color =
                    "";

            }, 1000);

        });

    });



/* Update cart */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🛒</div>

                <p>Your cart is empty.</p>

                <small>
                    Add something delicious!
                </small>

            </div>

        `;

    }


    let total = 0;

    let totalQuantity = 0;


    cart.forEach((item, index) => {

        total +=
            item.price * item.quantity;

        totalQuantity +=
            item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <small>
                    ₹${item.price} × ${item.quantity}
                </small>

            </div>


            <div class="cart-item-controls">

                <button
                    onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <strong>
                    ${item.quantity}
                </strong>

                <button
                    onclick="changeQuantity(${index}, 1)">
                    +
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        totalQuantity;

    cartTotal.textContent =
        "₹" + total;

}


/* Change quantity */

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}



/* =====================================================
   CHECKOUT
===================================================== */

const checkoutButton =
    document.getElementById("checkoutButton");


checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Add some delicious food first!"
            );

            return;

        }


        alert(
            "Order placed successfully! 🍔\n\nThank you for ordering with Savora."
        );


        cart = [];

        updateCart();

        hideCart();

    }
);



/* =====================================================
   TABLE BOOKING
===================================================== */

const bookingForm =
    document.getElementById("bookingForm");

const bookingMessage =
    document.getElementById("bookingMessage");


bookingForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "bookingName"
            ).value;


        const date =
            document.getElementById(
                "bookingDate"
            ).value;


        const time =
            document.getElementById(
                "bookingTime"
            ).value;


        const guests =
            document.getElementById(
                "guests"
            ).value;


        bookingMessage.textContent =
            `✓ Table reserved for ${name} on ${date} at ${time} for ${guests}.`;


        bookingForm.reset();

    }
);



/* =====================================================
   NEWSLETTER
===================================================== */

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        alert(
            "You're subscribed! 🎉\n\nYou'll receive our latest offers and food updates."
        );


        newsletterForm.reset();

    }
);



/* =====================================================
   DATE RESTRICTION
===================================================== */

const bookingDate =
    document.getElementById("bookingDate");


const today =
    new Date().toISOString().split("T")[0];


bookingDate.min = today;



/* =====================================================
   SCROLL NAVIGATION EFFECT
===================================================== */

window.addEventListener("scroll", () => {

    const header =
        document.querySelector(".header");


    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 25px rgba(0,0,0,0.08)";

    } else {

        header.style.boxShadow = "";

    }

});