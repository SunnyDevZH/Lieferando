let food = [
    {
      'name': "Pizza Margharita",
      'description': "Tomatensauce, Mozzarella, Oregano",
      'price': 17.00,
    },
    {
      'name': "Pizza Salami",
      'description': "Tomatensauce, Mozzarella, scharfe Salami, Oregano",
      'price': 21.00,
    },
    {
      'name': "Pizza Schinken",
      'description': "Tomatensauce, Mozzarella, Schinken, Oregano",
      'price': 19.00,
    },
    {
      'name': "Pizza Thunfisch",
      'description': "Tomatensauce, Mozzarella, Thon, Zwiebeln, Oliven, Oregano",
      'price': 21.00,
    },
    {
      'name': "Pizza Vegetarisch",
      'description': "Tomatensauce, Mozzarella, verschiedenes Gemüse, Oregano",
      'price': 35.00,
    },
    {
      'name': "Pizza Diavolo",
      'description': "Tomatensauce, Mozzarella, Kalbsfleisch, Oliven, Peperoncini, Knoblauch, Oregano",
      'price': 22.00,
    },
    {
      'name': "Pizza Gorgonzola",
      'description': "Tomatensauce, Mozzarella, Gorgonzola, Oregano",
      'price': 19.00,
    },
    {
      'name': "Pizza Padrone",
      'description': "Tomatensauce, Mozzarella, Kalbfleisch, Oregano",
      'price': 21.00,
    },
  ];

let basket = [];

load();

/**
 * Rendert die Liste der verfügbaren Gerichte und den Warenkorb.
 */
function render() {
  const content = document.getElementById("content");
  content.innerHTML = "";
  content.innerHTML += `<h2 class="popular">Beliebt</h2>`;
  for (let i = 0; i < food.length; i++) {
    content.innerHTML += generateFoodList(i);
  }
  renderBasket();
}

/**
 * Zeigt den aktuellen Warenkorb an und berechnet die Gesamtsumme.
 */
function renderBasket() {
  let sum = 0;
  const showBasket = document.getElementById("showBasket");
  showBasket.innerHTML = "";

  if (basket.length === 0) {
    showBasket.innerHTML += generateBasketTemplate();
  } else {
    const uniqueItems = getUniqueItems();
    for (let i = 0; i < uniqueItems.length; i++) {
      showBasket.innerHTML += generateBasketItem(uniqueItems[i]);
      sum += uniqueItems[i].quantity * uniqueItems[i].price;
    }
    showBasket.innerHTML += `<button class="pay">Bezahlen: ${sum.toFixed(2)} CHF</button>`;
  }
}

/**
 * Gibt das Template für einen leeren Warenkorb zurück.
 * @returns {string} HTML-Template
 */
function generateBasketTemplate() {
  return `
    <div class="show-basket">
      <img class="shopping-img" src="./img/einkauf.png">
      <h2>Fülle deinen Warenkorb</h2>
      <p>Füge ein Gerichte hinzu</p>
      <p>Min 30.-</p>
    </div>
  `;
}

/**
 * Gibt das HTML für ein einzelnes Gericht in der Liste zurück.
 * @param {number} i - Index des Gerichts im food-Array
 * @returns {string} HTML-Template
 */
function generateFoodList(i) {
  let currentFood = food[i];
  return `
    <div class="show-food">
      <div class="food-line">
        <h2>${currentFood.name}</h2>
        <div class="background-add">
          <img class="add-food" id="addArticle" src="./img/plus.png" onclick="addArticle(${i})">
        </div>
      </div>
      <div class="food-description">
        <h4>${currentFood.description}</h4>
      </div>
      <div class="food-price">
        <h2>${currentFood.price} €</h2>
      </div>
    </div>
  `;
}

/**
 * Fügt ein Gericht dem Warenkorb hinzu oder erhöht die Menge, falls es bereits vorhanden ist.
 * @param {number} index - Index des Gerichts im food-Array
 */
function addArticle(index) {
  let selectedFood = food[index];
  let existingItemIndex = basket.findIndex(item => item.name === selectedFood.name);

  if (existingItemIndex !== -1) {
    basket[existingItemIndex].quantity++;
  } else {
    selectedFood.quantity = 1;
    basket.push(selectedFood);
  }
  renderBasket();
  render();
  save();
}

/**
 * Gibt das HTML für einen Warenkorb-Artikel zurück, inklusive Buttons zum Hinzufügen und Entfernen.
 * @param {object} item - Artikelobjekt mit name, price und quantity
 * @returns {string} HTML-Template
 */
function generateBasketItem(item) {
  return `
    <div class="basket-item">
      <span class="quantity">${item.quantity}</span>
      <p>${item.name}</p>
      <p>${item.price} CHF</p>
    </div>
    <div class="item-remove">
      <div class="item-remove-btn">
        <button class="remove-Item" onclick="removeItem('${item.name}')">-</button>
        <button class="add-Item" onclick="addArticleBasket('${item.name}')">+</button>
      </div>
    </div>
    <div class="bottom-seperator"></div>
  `;
}

/**
 * Verringert die Menge eines Artikels im Warenkorb oder entfernt ihn, wenn die Menge 1 ist.
 * @param {string} name - Name des Artikels
 */
function removeItem(name) {
  let existingItemIndex = basket.findIndex(item => item.name === name);
  if (existingItemIndex !== -1) {
    if (basket[existingItemIndex].quantity > 1) {
      basket[existingItemIndex].quantity--;
    } else {
      basket.splice(existingItemIndex, 1);
    }
  }
  renderBasket();
  save();
}

/**
 * Erhöht die Menge eines Artikels im Warenkorb.
 * @param {string} name - Name des Artikels
 */
function addArticleBasket(name) {
  let existingItemIndex = basket.findIndex(item => item.name === name);
  if (existingItemIndex !== -1) {
    basket[existingItemIndex].quantity++;
  }
  renderBasket();
  save();
}

/**
 * Gibt eine Liste der eindeutigen Artikel im Warenkorb mit korrekter Mengenangabe zurück.
 * @returns {Array} Array von Artikelobjekten
 */
function getUniqueItems() {
  let uniqueItems = [];
  for (let i = 0; i < basket.length; i++) {
    let existingItemIndex = uniqueItems.findIndex(item => item.name === basket[i].name);
    if (existingItemIndex !== -1) {
      uniqueItems[existingItemIndex].quantity += basket[i].quantity;
    } else {
      uniqueItems.push({...basket[i]});
    }
  }
  return uniqueItems;
}

/**
 * Speichert die aktuellen food- und basket-Daten im Local Storage.
 */
function save() {
  localStorage.setItem("food", JSON.stringify(food));
  localStorage.setItem("basket", JSON.stringify(basket));
}

/**
 * Lädt die food- und basket-Daten aus dem Local Storage.
 */
function load() {
  let foodAsText = localStorage.getItem("food");
  let basketAsText = localStorage.getItem("basket");

  if (foodAsText && basketAsText) {
    food = JSON.parse(foodAsText);
    basket = JSON.parse(basketAsText);
  }
}

/**
 * Öffnet die Warenkorb-Ansicht (z.B. für mobile Ansicht).
 */
function openBasket() {
  document.getElementById('closeBasket').classList.add('bottom-row-basket');
}

/**
 * Schließt die Warenkorb-Ansicht.
 */
function closeBasket() {
  document.getElementById('closeBasket').classList.remove('bottom-row-basket');
}