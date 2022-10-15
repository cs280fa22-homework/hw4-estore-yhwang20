import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import {
  Box,
  Stack,
  VStack,
  Image,
  Button,
  Text,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import * as API from "../api";
import PropTypes from "prop-types";

const MIN_QUANTITY = 1;

function Product(props) {
  const { addToCart } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(MIN_QUANTITY);

  useEffect(() => {
    API.get(id)
      .then((item) => setItem(item))
      .catch((err) => console.log(err));
  }, []);

  const updateQuantity = (event) => {
    const quantity = Number.parseInt(event.target.value);
    if (quantity >= MIN_QUANTITY) {
      setQuantity(quantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1 >= MIN_QUANTITY ? quantity + 1 : quantity);
  };

  const decrementQuantity = () => {
    setQuantity(quantity - 1 >= MIN_QUANTITY ? quantity - 1 : quantity);
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    addToCart(item, quantity);
    setQuantity(1);
    navigate("/");
  };

  return (
    <Box
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      align={"center"}
      p={5}
      my={4}
    >
      {!item ? (
        <Box m="2">
          <VStack spacing={4} align="center">
            <Box>
              <Text fontSize="lg">No item found!</Text>
            </Box>
            <Link to="/">
              <Button variant="outline">Back to product list</Button>
            </Link>
          </VStack>
        </Box>
      ) : (
        <>
          <Image
            boxSize="500px"
            objectFit="scale-down"
            loading="eager"
            src={item.image}
            alt={item.title}
          />
          <Box m="2">
            <Text fontSize="lg">{item.title}</Text>
          </Box>
          <Box m="2">
            <Text fontSize="lg" fontWeight="bold" as="kbd">
              ${item.price}
            </Text>
          </Box>
          <Box m="2" align={"left"} color="gray.500">
            <Text fontSize="lg">{item.description}</Text>
          </Box>
          <Box p={6}>
            <form>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <NumberInput value={quantity}>
                  <NumberInputField onChange={updateQuantity} />
                  <NumberInputStepper>
                    <NumberIncrementStepper onClick={incrementQuantity} />
                    <NumberDecrementStepper onClick={decrementQuantity} />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <Stack spacing={4} direction="row" align="center" mt={4}>
                <Button onClick={handleOnClick}>Add to cart</Button>
                <Link to="/">
                  <Button variant="outline">Back to product list</Button>
                </Link>
              </Stack>
            </form>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Product;

Product.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
