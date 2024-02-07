axios.get('http://localhost:3000/api/product')

    .then(response => {
        const products = response.data.products
        const productContainer = document.getElementById('productContainer')
        const searchInput = document.getElementById('searchInput')
        const searchButton = document.getElementById('searchButton')
        const categoryList = document.getElementById('categoryList')
        const ratingSlider = document.getElementById('ratingSlider')
        const minRatingInput = document.getElementById('minRatingInput')
        const maxRatingInput = document.getElementById('maxRatingInput')
        const priceSlider = document.getElementById('priceSlider')
        const minPriceInput = document.getElementById('minPriceInput')
        const maxPriceInput = document.getElementById('maxPriceInput')
        const toggleButton = document.getElementById('toggleAdvancedFilters')
        const advancedFiltersDiv = document.getElementById('advancedFilters')
        toggleButton.addEventListener('click', function () {
            if (advancedFiltersDiv.style.display === 'none') {
                advancedFiltersDiv.style.display = 'block'
            } else {
                advancedFiltersDiv.style.display = 'none'
            }
        })

        function filterProducts(searchTerm, selectedCategory, minRating, maxRating, minPrice, maxPrice, sortOrder) {
            const filteredProducts = products.filter(product => {
                return (
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    (selectedCategory === 'All' || product.category === selectedCategory) &&
                    (!minRating || calculateAverageRating(product) >= minRating) &&
                    (!maxRating || calculateAverageRating(product) <= maxRating) &&
                    (!minPrice || product.price >= minPrice) &&
                    (!maxPrice || product.price <= maxPrice)
                )
            })

            if (sortOrder === 'asc') {
                filteredProducts.sort((a, b) => a.price - b.price)
            } else if (sortOrder === 'desc') {
                filteredProducts.sort((a, b) => b.price - a.price)
            }

            productContainer.innerHTML = ''

            filteredProducts.forEach(product => {
                const averageRating = calculateAverageRating(product)
                const card = document.createElement('div')
                card.classList.add('col-md-4', 'mb-4')
                card.innerHTML = `
                        <div class="card">
    <img src="${product.file[0]}" class="card-img-top" alt="Product Image" style="height: 200px object-fit: cover" onclick="window.location.href='/product/info/${product._id}'">
    <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text"><strong>Category:</strong> ${product.category}</p>
        <p class="card-text"><strong>Quantity:</strong> ${product.quantity}</p>
        <p class="card-text"><strong>Price:</strong> ${product.price}</p>
        <p class="card-text"><strong>Average Rating:</strong> ${averageRating}</p>
        <div class="text-center">
    <form action="/api/cart/add/${product._id}" method="POST" class="d-inline">
        <button type="submit" class="btn btn-success me-2">Add to Cart</button>
    </form>
    <button type="button" class="btn btn-warning me-2" onclick="window.location.href='/product/info/${product._id}'">
        About
    </button>
</div>
    </div>
</div>
                    `
                productContainer.appendChild(card)
            })
        }

        function calculateAverageRating(product) {
            if (!product.commentId || product.commentId.length === 0) {
                return 'No ratings yet'
            }

            const totalRating = product.commentId.reduce((acc, comment) => acc + comment.rating, 0)
            return (totalRating / product.commentId.length).toFixed(1)
        }

        function populateCategories() {
            const categories = ['All', ...new Set(products.map(product => product.category))]
            categories.forEach(category => {
                const listItem = document.createElement('li')
                listItem.innerHTML = `<a class="dropdown-item" href="#" data-category="${category}">${category}</a>`
                categoryList.appendChild(listItem)
            })
        }

        populateCategories()
        filterProducts('', 'All', null, null, null, null)

        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim()
            const selectedCategory = categoryList.querySelector('.active')?.dataset.category || 'All'
            const minRating = minRatingInput.value ? parseFloat(minRatingInput.value) : null
            const maxRating = maxRatingInput.value ? parseFloat(maxRatingInput.value) : null
            const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : null
            const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : null
            filterProducts(searchTerm, selectedCategory, minRating, maxRating, minPrice, maxPrice)
        })

        categoryList.addEventListener('click', (event) => {
            const target = event.target
            if (target.matches('.dropdown-item')) {
                const selectedCategory = target.dataset.category
                categoryList.querySelectorAll('.dropdown-item').forEach(item => item.classList.remove('active'))
                target.classList.add('active')
                const searchTerm = searchInput.value.trim()
                const minRating = minRatingInput.value ? parseFloat(minRatingInput.value) : null
                const maxRating = maxRatingInput.value ? parseFloat(maxRatingInput.value) : null
                const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : null
                const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : null
                filterProducts(searchTerm, selectedCategory, minRating, maxRating, minPrice, maxPrice)
            }
        })

        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.trim()
            const selectedCategory = categoryList.querySelector('.active')?.dataset.category || 'All'
            const minRating = minRatingInput.value ? parseFloat(minRatingInput.value) : null
            const maxRating = maxRatingInput.value ? parseFloat(maxRatingInput.value) : null
            const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : null
            const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : null
            filterProducts(searchTerm, selectedCategory, minRating, maxRating, minPrice, maxPrice)
        })

        ratingSlider.addEventListener('input', function () {
            minRatingInput.value = this.value
            const searchTerm = searchInput.value.trim()
            const selectedCategory = categoryList.querySelector('.active')?.dataset.category || 'All'
            const minRating = parseFloat(this.value)
            const maxRating = maxRatingInput.value ? parseFloat(maxRatingInput.value) : null
            const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : null
            const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : null
            filterProducts(searchTerm, selectedCategory, minRating, maxRating, minPrice, maxPrice)
        })

        minRatingInput.addEventListener('input', function () {
            ratingSlider.value = this.value
            const searchTerm = searchInput.value.trim()
            const selectedCategory = categoryList.querySelector('.active')?.dataset.category || 'All'
            const minRating = parseFloat(this.value)
            const maxRating = maxRatingInput.value ? parseFloat(maxRatingInput.value) : null
            const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : null
            const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : null
            filterProducts(searchTerm, selectedCategory, minRating, maxRating, minPrice, maxPrice)
        })

        maxRatingInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.trim()
            const selectedCategory = categoryList.querySelector('.active')?.dataset.category || 'All'
            const minRating = minRatingInput.value ? parseFloat(minRatingInput.value) : null
            const maxRating = this.value ? parseFloat(this.value) : null
            const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : null
            const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : null
            filterProducts(searchTerm, selectedCategory, minRating, maxRating, minPrice, maxPrice)
        })

        priceSlider.addEventListener('input', function () {
            minPriceInput.value = this.value
            const searchTerm = searchInput.value.trim()
            const selectedCategory = categoryList.querySelector('.active')?.dataset.category || 'All'
            const minRating = minRatingInput.value ? parseFloat(minRatingInput.value) : null
            const maxRating = maxRatingInput.value ? parseFloat(maxRatingInput.value) : null
            const minPrice = parseFloat(this.value)
            const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : null
            filterProducts(searchTerm, selectedCategory, minRating, maxRating, minPrice, maxPrice)
        })

        minPriceInput.addEventListener('input', function () {
            priceSlider.value = this.value
            const searchTerm = searchInput.value.trim()
            const selectedCategory = categoryList.querySelector('.active')?.dataset.category || 'All'
            const minRating = minRatingInput.value ? parseFloat(minRatingInput.value) : null
            const maxRating = maxRatingInput.value ? parseFloat(maxRatingInput.value) : null
            const minPrice = parseFloat(this.value)
            const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : null
            filterProducts(searchTerm, selectedCategory, minRating, maxRating, minPrice, maxPrice)
        })

        maxPriceInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.trim()
            const selectedCategory = categoryList.querySelector('.active')?.dataset.category || 'All'
            const minRating = minRatingInput.value ? parseFloat(minRatingInput.value) : null
            const maxRating = maxRatingInput.value ? parseFloat(maxRatingInput.value) : null
            const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : null
            const maxPrice = this.value ? parseFloat(this.value) : null
            filterProducts(searchTerm, selectedCategory, minRating, maxRating, minPrice, maxPrice)
        })
        document.getElementById('sortAsc').addEventListener('click', function () {
            const sortOrder = 'asc'
            filterProducts(searchInput.value.trim(), categoryList.querySelector('.active')?.dataset.category || 'All',
                parseFloat(minRatingInput.value), parseFloat(maxRatingInput.value),
                parseFloat(minPriceInput.value), parseFloat(maxPriceInput.value), sortOrder)
        })

        document.getElementById('sortDesc').addEventListener('click', function () {
            const sortOrder = 'desc'
            filterProducts(searchInput.value.trim(), categoryList.querySelector('.active')?.dataset.category || 'All',
                parseFloat(minRatingInput.value), parseFloat(maxRatingInput.value),
                parseFloat(minPriceInput.value), parseFloat(maxPriceInput.value), sortOrder)
        })
    })
    .catch(error => {
        console.error('Error fetching data:', error)
    })