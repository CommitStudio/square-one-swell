interface BadgeProp {
  itemsQuantity?: number | false;
}

export const Badge = ({ itemsQuantity }: BadgeProp) => {
  return (
    <span
      data-cy="cart-badge"
      className="absolute bottom-7 inline-flex items-center px-2 h-5 justify-center text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"
    >
      {itemsQuantity}
    </span>
  );
};
