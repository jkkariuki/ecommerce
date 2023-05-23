import React from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import DropDown from "../components/FilterDropDown";
import { getAllProducts, getProductsByCategory } from "../APICalls";
import { searchByCategory } from "../APICalls";

function Home(props) {
  const [inventory, setInventory] = useState([]);
  const [category, setCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);

  // function onAdd(product) {
  //   const exist = cartItems.find((item) => item.id === product.id);

  //   if (exist) {
  //     setCartItems(
  //       cartItems.map((item) =>
  //         item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...product, qty: 1 }]);
  //   }
  // }

  // function onRemove(product) {
  //   const exist = cartItems.find((item) => item.id === product.id);

  //   if (exist.qty === 1) {
  //     setCartItems(
  //       cartItems.filter((item) =>
  //         item.id != product.id ? { ...exist, qty: exist.qty + 1 } : item
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...product, qty: 1 }]);
  //   }
  // }

  console.log();

  function handleFilter(category) {
    console.log(category);
    if (category === "All") {
      console.log(category);
      getAllProducts().then((res) => {
        // console.log(res.data);
        setInventory(res.data.products);
      });
    } else {
      getProductsByCategory(category).then((res) => {
        console.log(res.data.products);
        setInventory(res.data.products);
      });
    }
  }
  useEffect(() => {
    getAllProducts().then((res) => {
      console.log(res.data.products);
      setInventory(res.data.products);
    });
  }, []);

  return (
    <div>
      <Hero />
      <div className="container py-5">
        <DropDown onFilter={handleFilter} />

        <div className="row">
          {inventory.map((item, i) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <ProductCard
                id={item.id}
                title={item.title}
                description={item.description}
                rating={item.rating}
                price={item.price}
                img={item.thumbnail}
                category={item.category}
                stock={item.stock}
                brand={item.brand}
                onAdd={props.onAdd}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
