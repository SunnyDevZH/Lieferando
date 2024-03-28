let food = [ // Jason Array // 
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

  let basket = []; // Warenkorb Array

  load(); // Local Storage //

  // FUNKTION 1 Render//

function render() { // Render Pizzas //
  const content = document.getElementById("content"); // Zugriff auf Id content
  content.innerHTML = ""; // Div leeren
  content.innerHTML += `<h2 class="popular">Beliebt</h2>`;
  for (let i = 0; i < food.length; i++) { // Durchlaufen von Jasson Array und Funktion 
    content.innerHTML += generateFoodList(i);
  }
  renderBasket(); // Warenkorb wird aktiviert
}

// FUNKTION 4 Wareknkorb berechnung //

function renderBasket() { // Aktiviert addArticle () //
  let sum = 0;  // Sum = 0 //
  const showBasket = document.getElementById("showBasket"); // Zugriff aus Id showBasket
  showBasket.innerHTML = ""; // Div wird geleert

  if (basket.length === 0) { // Fall der Warenkorb leer ist //
    showBasket.innerHTML += generateBasketTemplate(); // Wird Funktion generateBasket ausgelösst
  } else { // Falls der Warenkorb nicht leer ist // 
    const uniqueItems = getUniqueItems(); // Basket inhalt 
    for (let i = 0; i < uniqueItems.length; i++) { // Array UniqueIntems wird durchlaufen
      showBasket.innerHTML += generateBasketItem(uniqueItems[i]); //
      sum += uniqueItems[i].quantity * uniqueItems[i].price; // Summe = Waren anzahl * Warenpreis
    }
    showBasket.innerHTML += `<button class="pay">Bezahlen: ${sum.toFixed(2)} CHF</button>`; // Gesammt Zahl
  }
}

// FUNKTION 5 Warenkorb leer ansicht //

function generateBasketTemplate() { // Ausgelösst durch render Basekt
  return `
    <div class="show-basket">
      <img class="shopping-img" src="./img/einkauf.png">
      <h2>Fülle deinen Warenkorb</h2>
      <p>Füge ein Gerichte hinzu</p>
      <p>Min 30.-</p>
      
    </div>
  `;
}

// FUNKTION 2 Pizza //

function generateFoodList(i) { // ausgelösst durch render() //
  let currentFood = food[i]; // Jason Array
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

// FUNKTION 3 Artikel Hinzufügen //

function addArticle(index) { // Ausgelösst durch onclick + Button
  let selectedFood = food[index]; // Array Food
  let existingItemIndex = basket.findIndex(item => item.name === selectedFood.name); // Basket

  if (existingItemIndex !== -1) { // Falls intem unter 0 ++
    basket[existingItemIndex].quantity++;
  } else { // Sonst
    selectedFood.quantity = 1;
    basket.push(selectedFood); // Food wird in Basket gepusht
  }
  renderBasket(); // Warenkorb wird aufgerufen
  render(); 
  save(); // Local Storage wird gespeichert
}

// FUNKTION 7 Warenkorb //

function generateBasketItem(item) { // Zeigt Warenkorb
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
// Waren hinzufügen oder löschen //

// FUNKTION 8 löschen //

function removeItem(name) { // Ausgelösst durch onclick Button
  let existingItemIndex = basket.findIndex(item => item.name === name); // Arrow Funktion Basket index
  if (existingItemIndex !== -1) { // Fall der wert unter 0 
    if (basket[existingItemIndex].quantity > 1) { // Falls der Wert über 1
      basket[existingItemIndex].quantity--; // minus 1
    } else {
      basket.splice(existingItemIndex, 1);
    }
  }
  renderBasket();
  save();
}

// FUNKTIon 9 Hinzufügen //

function addArticleBasket(name) { // Ausgelösst durch onclick Button
  let existingItemIndex = basket.findIndex(item => item.name === name); // Arrow Funktion Basket index
  if (existingItemIndex !== -1) { // Fall der wert unter 0 
    basket[existingItemIndex].quantity++; // plus 1
  }
  renderBasket();
  save();
}

// FUNKTION 6 Waren nehmen //
function getUniqueItems() { // Ausgelösst durch render Basket
  let uniqueItems = []; // Array Items
  for (let i = 0; i < basket.length; i++) { // Array Basekt wird durchlaufen
    let existingItemIndex = uniqueItems.findIndex(item => item.name === basket[i].name); // Basekt wird durchsucht und existingIntems  zugewiesen
    if (existingItemIndex !== -1) { // Fall unter 0
      uniqueItems[existingItemIndex].quantity += basket[i].quantity; // gleiche anzahl
    } else {
      uniqueItems.push({...basket[i]}); // Basekt wird in UniqueItems gepusht
    }
  }
  return uniqueItems; // Wird zurück gegeben
}

// LOCAL STORAGE //

function save() {
  localStorage.setItem("food", JSON.stringify(food));
  localStorage.setItem("basket", JSON.stringify(basket));
}

function load() {
  
  let foodAsText = localStorage.getItem("food");
  let basketAsText = localStorage.getItem("basket");

  if (foodAsText && basketAsText) {
    food = JSON.parse(foodAsText);
    basket = JSON.parse(basketAsText);
  }

}

function openBasket() {
  document.getElementById('closeBasket').classList.add('bottom-row-basket');
}

function closeBasket() {
  document.getElementById('closeBasket').classList.remove('bottom-row-basket');
}