// sk_test_51NAj4OAFtaoYqon7OXOy2Zr7WZMRQa9imqSW2XW2FWjGpP0TbtgDndQdepiIgBaKc01r0Y5KnS6hpqmLuvU7IFrw003SMKa36O;

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NAj4OAFtaoYqon72ZMYHQUZaPQMS2tSrtw7bItDocCxQjrlW3Ctgb64IxW4n5TIxTv9rPXCARXS88V6acZPEyS100tbUq1B4v"
);
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// const products = async () => {
//   await fetch("https://dummyjson.com/products/")
//     .then((res) => res.json())
//     .then((json) => {
//       //   console.log(json.products);
//     });
// };

// products.map(async (product) => {
//   params = {
//     name: product.title,
//     description: product.description,
//     images: [product.thumbnail],
//   };

//   stripe_product = await stripe.products.create(params);

//   console.log(stripe_product.id);
//   await stripe.prices.create({
//     product: stripe_product.id,
//     unit_amount: product.price,
//     currency: "usd",
//     lookup_key: product.id,
//   });
// });

// app.get("/", async (req, res) => {
//   products.map(async (product) => {
//     params = {
//       name: product.title,
//       description: product.description,
//       images: [product.thumbnail],
//     };

//     stripe_product = await stripe.products.create(params);

//     console.log(stripe_product.id);
//     await stripe.prices.create({
//       product: stripe_product.id,
//       unit_amount: product.price,
//       currency: "usd",
//       lookup_key: product.id,
//     });
//   });
// });

app.post("/checkout", async (req, res) => {
  // const product = await stripe.products.search({
  //     query: 'name:'+{}
  //   });

  console.log(req.body);
  const items = req.body.items;
  console.log(items);
  let lineItems = [];
  items.map((item) => {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.thumbnail],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url:
      "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("listening on port 4000"));
