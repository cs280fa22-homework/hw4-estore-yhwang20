import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Stack,
  Image,
  GridItem,
  Text,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const MIN_QUANTITY = 0;

function CartItem(props) {
  const { item, updateCart } = props;
  const [quantity, setQuantity] = useState(MIN_QUANTITY);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const updateQuantity = (quantity) => {
    if (quantity >= MIN_QUANTITY) {
      setQuantity(quantity);
    }
  };

  const handleOnChange = (event) => {
    const quantity = Number.parseInt(event.target.value);
    updateQuantity(quantity);
  };

  const incrementQuantity = () => {
    updateQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    updateQuantity(quantity - 1);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2} mb={4}>
      <GridItem>
        <Link to={`/product/${item.id}`}>
          <Image
            rounded="lg"
            boxSize="100px"
            objectFit="scale-down"
            src={item.image}
            alt={item.title}
            draggable="false"
            loading="lazy"
          />
        </Link>
      </GridItem>
      <GridItem colSpan={2}>
        <Stack spacing="0.5">
          <Text fontWeight="sm">{item.title}</Text>
          <Text fontSize="medium" fontWeight="bold">
            ${item.price}
          </Text>
        </Stack>
      </GridItem>
      <GridItem>
        <form onSubmit={handleOnSubmit}>
          <FormControl>
            <FormLabel>Quantity</FormLabel>
            <NumberInput value={quantity}>
              <NumberInputField onChange={handleOnChange} />
              <NumberInputStepper>
                <NumberIncrementStepper onClick={incrementQuantity} />
                <NumberDecrementStepper onClick={decrementQuantity} />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </form>
      </GridItem>
    </Grid>
  );
}

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  updateCart: PropTypes.func.isRequired,
};
