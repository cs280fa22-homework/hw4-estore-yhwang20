import { Link } from "react-router-dom";
import { Box, Image, Button, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

function ShopItem(props) {
  const { item, addToCart } = props;

  return (
    <Box
      maxW="sm"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      align={"center"}
      p={5}
    >
      <Link to={`/product/${item.id}`}>
        <Image
          boxSize="200px"
          objectFit="scale-down"
          loading="lazy"
          src={item.image}
          alt={item.title}
        />
      </Link>
      <Box m="2">
        <Text fontSize="lg" noOfLines={1}>
          {item.title}
        </Text>
      </Box>
      <Box m="2">
        <Text fontSize="lg" fontWeight="bold" as="kbd">
          ${item.price}
        </Text>
      </Box>
      <Box m="2">
        <Button onClick={() => addToCart(item, 1)}>Add to cart</Button>
      </Box>
    </Box>
  );
}

export default ShopItem;

ShopItem.propTypes = {
  item: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};
