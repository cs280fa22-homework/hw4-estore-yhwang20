import { useState, useEffect } from "react";
import Payment from "../components/Payment";
import Item from "../components/CartItem";
import { Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Cart(props) {
  const { items, updateCart } = props;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, []);

  return (
    <>
      <Box my={2} p={4} borderWidth="2px" borderRadius="lg" overflow="hidden">
        {items.length ? (
          items.map((item, index) => (
            <Item item={item} key={index} updateCart={updateCart} />
          ))
        ) : (
          <Box>The shopping cart is empty!</Box>
        )}
      </Box>
      <Box my={2} p={4} borderWidth="2px" borderRadius="lg" overflow="hidden">
        <Text fontSize="3xl">Total is ${total.toFixed(2)}</Text>
      </Box>
      <Payment total={total} />
    </>
  );
}

export default Cart;

Cart.propTypes = {
  items: PropTypes.array.isRequired,
  updateCart: PropTypes.func.isRequired,
};
