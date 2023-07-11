import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    outlet: "",
    Veg: ""
  });
  const [submittedProducts, setSubmittedProducts] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "price" && !isNaN(value)) {
      // Only update the price if the value is a valid number
      setProduct(prevProduct => {
        return {
          ...prevProduct,
          [name]: value.replace(/[^0-9]/g, "") // Remove non-numeric characters
        };
      });
    } else if (name === "name" || name === "outlet") {
      // Only update the name and outlet if the value is valid
      setProduct(prevProduct => {
        return {
          ...prevProduct,
          [name]: value
        };
      });
    } else if (name === "Veg") {
      // Only update the Veg if the value is either "true" or "false"
      setProduct(prevProduct => {
        return {
          ...prevProduct,
          [name]: value
        };
      });
    }
  }

  function submitProduct(event) {
    const newProduct = {
      name: product.name,
      price: product.price,
      outlet: product.outlet,
      Veg: product.Veg
    };

    setSubmittedProducts(prevProducts => [...prevProducts, newProduct]);

    setProduct({
      name: "",
      price: "",
      outlet: "",
      Veg: ""
    });

    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  function handleDeleteProduct(index) {
    setSubmittedProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <div>
            <input
              name="name"
              onChange={handleChange}
              value={product.name}
              placeholder="Product Name"
            />
            <input
              name="outlet"
              onChange={handleChange}
              value={product.outlet}
              placeholder="Outlet Name"
            />
            <input
              name="Veg"
              onChange={handleChange}
              value={product.Veg}
              placeholder="Veg/Non-Veg (true/false)"
            />
          </div>
        )}

        <input
          name="price"
          onClick={expand}
          onChange={handleChange}
          value={product.price}
          placeholder="Price"
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitProduct}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>

      <div className="card-container">
        {submittedProducts.map((product, index) => (
          <div key={index} className="card">
            <h3>Product Name: {product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Outlet Name: {product.outlet}</p>
            <p>Veg/Non-Veg: {product.Veg}</p>
            <DeleteIcon
              className="delete-icon"
              onClick={() => handleDeleteProduct(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateArea;
