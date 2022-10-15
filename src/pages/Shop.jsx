import { useState, useEffect } from "react";
import Item from "../components/ShopItem";
import { Grid } from "@chakra-ui/react";
import * as API from "../api";
import PropTypes from "prop-types";

function Shop(props) {
  const { addToCart } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.getAll()
      .then((items) => setItems(items))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={5}>
      {items.map((item, index) => (
        <Item item={item} key={index} addToCart={addToCart} />
      ))}
    </Grid>
  );
}

export default Shop;

Shop.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
