fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    dispalyData(data);
  })
  .catch((error) => {
    console.log("Une erreur est survenue :", error);
    erreurMessage();
  });

function dispalyData(data) {
  const productContainer = document.getElementById("products-container");

  data.forEach((product) => {
    productContainer.innerHTML += `<article style="border:5px solid black">
          <img src="http://127.0.0.1:3000${product.image}" alt="${product.description}" />
          <div class="flexPrice">
            <h2 class="font-bold underline">${product.name}</h2>
            <h2 class="font-bold underline">${product.price} $</h2>
          </div>
          <p class=" underline">${product.description}</p>
          <p class=" underline">Disponibles dans le stock ${product.stock}</p>
          <p class=" underline">categorie : ${product.categoryName}</p>
          <button style="background-color: green;"><i class="fa-solid fa-cart-plus"></i>&nbsp;add product</button>
        </article>`;
  });
  if (data == null) {
    productContainer.innerHTML += `<h2>Aucun produit disponible pour le moment.</h2>
        <br><br><br><br><br><br><br><br><br><br><br><br>`;
  }
}
function erreurMessage() {
  const productContainer = document.getElementById("products-container");
  productContainer.innerHTML += `<h2>Impossible de charger les produits. Veuillez réessayer.</h2>
            <br><br><br><br><br><br><br><br><br><br><br><br>
`;
}
// seaaarch!
const searchInput = document.getElementById("search-input");
const productContainer = document.getElementById("products-container");

searchInput.addEventListener("input", function () {
  productContainer.innerHTML = "";
  console.log(searchInput.value);
  fetch(`http://localhost:3000/api/products?search=${searchInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dispalyData(data);
      productNoTrouve(data);
    })
    .catch((error) => {
      console.log("Une erreur est survenue :", error);
      erreurMessage();
    });
});
function productNoTrouve(data) {
  if (data.length == 0) {
    const productContainer = document.getElementById("products-container");
    productContainer.innerHTML =
      "<h2>Aucun résultat trouvé.</h2><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>";
  }
}
const categoriesOptions = document.getElementById("categories");
fetch("http://localhost:3000/api/categories")
  .then((response) => response.json())
  .then((data) => {
    console.log("kkkkkk", data);
    displayCategorie(data);
  })
  .catch((error) => {
    console.log("Une erreur est survenue :", error);
    erreurMessage();
  });

function displayCategorie(data) {
  const categoriesOptions = document.getElementById("categories");
  data.forEach((produit) => {
    categoriesOptions.innerHTML += `<option value="${produit.id}" class="text-black">${produit.name}</option>`;
  });
}

const priceInput = document.getElementById("price-input");
priceInput.addEventListener("input", function () {
  productContainer.innerHTML = "";
  console.log(priceInput.value);
  fetch(`http://localhost:3000/api/products?maxPrice=${priceInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dispalyData(data);
      productNoTrouve(data);
    })
    .catch((error) => {
      console.log("Une erreur est survenue :", error);
      erreurMessage();
    });
});

const restButton = document.getElementById("restButton");

restButton.addEventListener("click", function () {
  const categories = document.getElementById('categories')
  categories.selectedIndex=0
  productContainer.innerHTML = ""
  searchInput.value=""
  priceInput.value=""
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
      dispalyData(data);
    })
    .catch((error) => {
      console.log("Une erreur est survenue :  ", error);
      erreurMessage();
    });
});
  

const disponiblePrdct = document.getElementById("disponiblePrdct");

disponiblePrdct.addEventListener("click", function () {
  const categories = document.getElementById('categories')
  categories.selectedIndex=0
  productContainer.innerHTML = ""
  searchInput.value=""
  priceInput.value=""
  fetch("http://localhost:3000/api/products?inStock=true")
    .then((response) => response.json())
    .then((data) => {
      dispalyData(data);
    })
    .catch((error) => {
      console.log("Une erreur est survenue :  ", error);
      erreurMessage();
    });
});

const categories = document.getElementById('categories')
categories.addEventListener('change',function(event){
  productContainer.innerHTML = "";
  let box=event.target.value;
  console.log(box)
  fetch(`http://localhost:3000/api/products?categoryId=${box}`)
    .then((response) => response.json())
    .then((data) => {
      dispalyData(data)
    })
    .catch((error) => {
      console.log("Une erreur est survenue :", error);
      erreurMessage();
    });

})


