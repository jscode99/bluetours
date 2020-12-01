const Cart = require("../models/Cart");

exports.addtoCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
     console.log(req.body.cartItems,"req.body.cartItems");
    if (error) return res.status(422).json({ error });
    if (cart) {
     
      console.log(cart,"1");
      //If cart exists
      // const productCart =  req.body.cartItems.product;
      const item = cart.cartItems.find(
        c => c.product == req.body.cartItems.product,
      );
      if (item) {
        Cart.findOneAndUpdate(
          {
            user: req.user._id,
            "cartItems.product": req.body.cartItems.product,
          },
          {
            $set: {
              cartItems: {
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity,
              },
            },
          },
        ).exec((error, _cart) => {
          console.log(error);
          console.log(_cart, "2");
          if (error) return res.status(422).json({ error });
          if (_cart) {
            console.log(_cart, "3");
            return res.status(200).json({ _cart });
          }
        });
      } else {
        Cart.findOneAndUpdate({ user: req.user._id }, {
        "$push": {
          "cartItems": req.body.cartItems
        }
      }).exec((error, _cart) => {
        console.log(error);
        console.log(_cart,"2");
        if (error) return res.status(422).json({ error });
        if (_cart) {
          console.log(_cart,"3");
           return res.status(200).json({ _cart });
        }
      })
      }
      
    } else {
      // If cart not exist, then create new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      console.log(cart,"new");
      cart.save((error, cart) => {
        console.log(cart,"4");
        console.log(error);
        if (error) return res.status(422).json({ error });
        if (cart) {
          console.log(cart,"5");
          return res.status(200).json({ cart });
        }
      });
    }
  })
 
};
