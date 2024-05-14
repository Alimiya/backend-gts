async function getData() {
    axios.get('http://localhost:3000/api/cart/user')
        .then(response => {
            const userId = response.data.userId
            axios.get(`http://localhost:3000/api/cart/${userId}`)
                .then(response => {
                    const cart = response.data.cart
                    const cartContainer = document.getElementById('cartContainer')

                    if (cart && cart.productId && cart.productId.length > 0) {
                        const ul = document.createElement('ul')
                        ul.classList.add('list-group')

                        cart.productId.forEach(product => {
                            const li = document.createElement('li')
                            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
                            li.innerHTML = `
                        ${product.title} - ${product.price}
                        <div class="form-outline" style="width: 22rem">
                            <input type="number" min="1" max="${product.quantity}" id="quantity" name="quantity"
                                   class="form-control"/>
                            <label class="form-label" for="quantity">Quantity</label>
                        </div>
                        <form action="/api/cart/remove/${product._id}" method="POST">
                            <button type="submit" class="btn btn-danger">Remove</button>
                        </form>
                    `
                            ul.appendChild(li)
                        })

                        const buyButton = document.createElement('button')
                        buyButton.classList.add('btn', 'btn-primary', 'mt-2')
                        buyButton.innerText = 'Buy'
                        buyButton.addEventListener('click', function () {
                            $('#thanksModal').modal('show')
                        })

                        const form = document.querySelector('form')
                        form.appendChild(ul)
                        form.appendChild(buyButton)
                    } else {
                        const p = document.createElement('p')
                        p.classList.add('mt-3')
                        p.innerText = 'Your cart is empty.'
                        cartContainer.appendChild(p)
                    }
                })
                .catch(error => {
                    console.error("Internal server error")
                })
        })
        .catch(error => {
            console.error("Internal server error")
        })
}
getData()