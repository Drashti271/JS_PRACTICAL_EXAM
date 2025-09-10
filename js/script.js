const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const imageInput = document.getElementById('image');
const categoryInput = document.getElementById('category');
const searchInput = document.getElementById('search');
const submitBtn = document.querySelector('.btn-success');
const productsRow = document.getElementById('product-list');

let products = [];
let isEditing = false;
let editIndex = null;

submitBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const price = priceInput.value.trim();
    const image = imageInput.value.trim();
    const category = categoryInput.value.trim();

    if (!title || !price || !image || !category) {
        alert("Please fill all fields.");
        return;
    }

    const product = { title, price, image, category };

    if (isEditing) {
        products[editIndex] = product;
        isEditing = false;
        editIndex = null;
        submitBtn.textContent = 'Submit';
    } else {
        products.push(product);
    }

    renderProducts(products);
    clearForm();
});

function renderProducts(productList) {
    productsRow.innerHTML = '';

    if (productList.length === 0) {
        productsRow.innerHTML = '<p class="text-center">No products found.</p>';
        return;
    }

    productList.forEach((product, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">Category: ${product.category}</p>
                    <p class="card-text"><strong>Price:</strong> ₹${product.price}</p>
                    <div class="d-flex justify-content-between mt-3">
                        <button class="btn btn-sm btn-primary" onclick="editProduct(${index})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${index})">Delete</button>
                    </div>
                </div>
            </div>
        `;

        productsRow.appendChild(col);
    });
}

function clearForm() {
    titleInput.value = '';
    priceInput.value = '';
    imageInput.value = '';
    categoryInput.value = '';
}

function editProduct(index) {
    const product = products[index];
    titleInput.value = product.title;
    priceInput.value = product.price;
    imageInput.value = product.image;
    categoryInput.value = product.category;
    isEditing = true;
    editIndex = index;
    submitBtn.textContent = 'Update Product';
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1);
        renderProducts(products);
    }
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    renderProducts(filteredProducts);
});
