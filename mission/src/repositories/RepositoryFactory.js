import ItemRepository from './ItemRepository';
import InfoRepository from './InfoRepository';
import CartRepository from './CartRepository';
import WishRepository from './WishRepository';

const repositories = {
  item: ItemRepository,
  info: InfoRepository,
  cart: CartRepository,
  wish: WishRepository,
};

export default {
  get: (name) => repositories[name],
};
