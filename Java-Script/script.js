let storageCartsBuys =
  JSON.parse(localStorage.getItem("storageCartsBuys")) || [];

console.log(storageCartsBuys);
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
          <button class="btnBuy" id="${product.id}" style="background-color: green;"><i class="fa-solid fa-cart-plus"></i>&nbsp;add product</button>
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
  const categories = document.getElementById("categories");
  categories.selectedIndex = 0;
  productContainer.innerHTML = "";
  searchInput.value = "";
  priceInput.value = "";
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
  const categories = document.getElementById("categories");
  categories.selectedIndex = 0;
  productContainer.innerHTML = "";
  searchInput.value = "";
  priceInput.value = "";
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

const categories = document.getElementById("categories");
categories.addEventListener("change", function (event) {
  productContainer.innerHTML = "";
  let box = event.target.value;
  console.log(box);
  fetch(`http://localhost:3000/api/products?categoryId=${box}`)
    .then((response) => response.json())
    .then((data) => {
      dispalyData(data);
    })
    .catch((error) => {
      console.log("Une erreur est survenue :", error);
      erreurMessage();
    });
});
// const buttonBuy = cartsContainer.querySelectorAll('.btnBuy')
const buttonCart = document.getElementById("buttonCart");

buttonCart.addEventListener("click", function () {
  const asideBar = document.querySelector(".yourproduct");
  asideBar.classList.remove("hidden");
});
const exitSideBar = document.querySelector(".exitSideBar");

exitSideBar.addEventListener("click", function () {
  const asideBar = document.querySelector(".yourproduct");
  asideBar.classList.add("hidden");
});

const containerProduct = document.getElementById("products-container");
const cartsContainer = document.getElementById("carts-container");
const asideBar = document.querySelector(".yourproduct");


containerProduct.addEventListener("click", (event) => {
  if (event.target.classList.contains("btnBuy")) {
    let id = event.target.id;
    console.log(id);
    displayCartSideBar(id);
    console.log("yiuhg");
    console.log();
  }
});



function displayCartSideBar(id) {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      asideCarts(data);
      
      storageCartsBuys.push(data);
      localStorage.setItem(
        "storageCartsBuys",
        JSON.stringify(storageCartsBuys),
      );
    })
    .catch((error) => {
      console.log("Une erreur est survenue :", error);
      erreurMessage();
    });
}
const checkoutForm = document.getElementById('checkoutForm')
let totall = 0
let produitBuy=1
function asideCarts(data) {
  totall +=data.price 
  checkoutForm.classList.remove('hidden')
  Swal.fire({
    title: "buyed",
    icon: "success",
    draggable: true
  });
  
  
  cartsContainer.innerHTML += `
            <div style="border:3px solid white;" class="flex gap-8 items-center" ">

              <img src="http://127.0.0.1:3000${data.image}" alt="${data.description}" width="50%" />
              <article class="flex flex-col justify-between ">
                <div class=" flex justify-between" >
                  <h2 class="font-bold underline">${data.name}</h2>
                  <h2 class="font-bold underline">${data.price} $</h2>
                </div>
                <div >
                  <p >categorie :${data.categoryName}</p> 
                  <p >${data.description}</p>
                </div>
                <div class="flex text-xl items-center ">
                  <button class="bg-black p-1">+</button>
                  <h2>${produitBuy++}</h2>
                  <button class="bg-black p-1 pr-2">-</button>
                </div>
              </article>
            </div>`;
  const sousTotal = document.getElementById('sousTotal')
  sousTotal.innerHTML=`<p class="text-xl">totale : ${totall} $</p>`
}

// function checkIfPrdctBuy