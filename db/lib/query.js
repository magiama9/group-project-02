const db = require("../../models");

// Function to view all available inventory
const viewInventory = (renderWhich, res) => {
  db.Items.findAll({}).then(dbItems => {
    // THESE RENDER FUNCTIONS SHOULD REALLY HAPPEN IN THE ROUTES, NOT HERE
    // WE SHOULD RETURN VALUES OUT OF THESE FUNCTIONS TO USE IN THE RENDER
    // ASYNCHRONICITY BECOMES AN ISSUE IF WE DO SO
    res.render(renderWhich, { items: dbItems });
  });
};

// Function to add an object representing an item to the DB
const addItem = obj => {
  db.Items.create({
    name: obj.name,
    description: obj.description,
    qty: obj.qty,
    category: obj.category,
    price: obj.price,
    img: obj.img,
    category: obj.category
  }).then(dbItems => {
  });
};

// Function to search items and display the result
// SEARCH TERM IS NOT CASE SENSITIVE, THANK GOD.
const searchItem = (searchTerm, res) => {
  db.Items.findAll({
    where: {
      name: searchTerm
    }
  }).then(search => {

    // THESE RENDER FUNCTIONS SHOULD REALLY HAPPEN IN THE ROUTES, NOT HERE
    // WE SHOULD RETURN VALUES OUT OF THESE FUNCTIONS TO USE IN THE RENDER
    // ASYNCHRONICITY BECOMES AN ISSUE IF WE DO SO
    res.render("search", { items: search });
  });
};

// Function to add items to a user's cart and associate it with their session token
// Expects ID to be the ID of a selected item and valid
const addToCart = (sessionID, id) => {
  db.Items.findAll({ where: { id: id } }).then(result => {
    result.forEach(idx => {
      db.Carts.create({
        session: sessionID,
        productID: id,
        name: idx.name,
        price: idx.price,
        img: idx.img
      });
    });
  });
};

// Function to view what's in a given session's cart
const viewCart = (sessionID, res) => {
  db.Carts.findAll({ where: { session: sessionID } }).then(result => {

    // THESE RENDER FUNCTIONS SHOULD REALLY HAPPEN IN THE ROUTES, NOT HERE
    // WE SHOULD RETURN VALUES OUT OF THESE FUNCTIONS TO USE IN THE RENDER
    // ASYNCHRONICITY BECOMES AN ISSUE IF WE DO SO
    res.render("cart", { cart: result });
  });
};

//======================================================
//             Functions to view by category
//            TODO -- REFACTOR INTO ONE FUNCTION
//======================================================
const viewKitchen = (category, res) => {
  db.Items.findAll({
    where: {
      category: category
    }
  }).then(catItems => {
    // console.log(catItems)
    res.render("kitchen", { items: catItems});
  });
};

const viewBathroom = (category, res) => {
  db.Items.findAll({
    where: {
      category: category
    }
  }).then(catItems => {
    // console.log(catItems)
    res.render("bathroom", { items: catItems});
  });
};

const viewOutdoors = (category, res) => {
  db.Items.findAll({
    where: {
      category: category
    }
  }).then(result => {
    console.log(result)
    res.render("outdoors", { outdoors: result});
  });
};

const viewBedroom = (category, res) => {
  db.Items.findAll({
    where: {
      category: category
    }
  }).then(catItems => {
    console.log(catItems)
    res.render("bedroom", { items: catItems});
  });
};

const viewLivingroom = (category, res) => {
  db.Items.findAll({
    where: {
      category: category
    }
  }).then(catItems => {
    // console.log(catItems)
    res.render("living-room", { items: catItems});
  });
};


// Remove items from the cart
// Makes sure it only deletes items for the given session
const removeFromCart = (sessionID, id) => {
  db.Carts.destroy({ where: { session: sessionID, id: id } }).then(result => {
    return result;
  });
};
// Placeholder function to save items using sequelize
// Expects ID to be the ID of a selected item and valid
const save = id => {
  db.Items.update(
    {
      saved: true
    },
    { where: { id: id } }
  );
};

// Placeholder function to unsave items using sequelize
// Expects ID to be the ID of a selected item and valid
const unSave = id => {
  db.Items.update(
    {
      saved: false
    },
    { where: { id: id } }
  );
};

// Placeholder function to decrease available quantity of item once it's purchased
// Expects ID to be the ID of a purchased item and valid
const decreaseQty = id => {
  db.Items.decrement("qty", { where: { id: id } });
};

// viewInventory();

module.exports = {
  view: viewInventory,
  addItem: addItem,
  addToCart: addToCart,
  viewCart: viewCart,
  removeFromCart: removeFromCart,
  search: searchItem,
  decreaseQty: decreaseQty,
  viewCart: viewCart,
  viewKitchen: viewKitchen,
  viewBathroom: viewBathroom,
  viewLivingroom: viewLivingroom,
  viewOutdoors: viewOutdoors,
  viewBedroom: viewBedroom
};
