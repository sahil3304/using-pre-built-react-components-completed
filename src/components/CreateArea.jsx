import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
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
       {
        setProduct(prevProduct => {
          return {
            ...prevProduct,
            [name]: value
          };
        });
      }
    }
  }
  

  function submitProduct(event) {
    props.onAdd(product);
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
    </div>
  );
}

export default CreateArea;
