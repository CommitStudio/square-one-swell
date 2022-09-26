interface ProductProp {
  product: Product;
}

const ProductVariants = ({ product }: ProductProp) => {
  return (
    <select name="variants" className="border p-1">
      <option disabled>Selecciona una variante...</option>
      {product.variants?.results.map((variant, i) =>
        variant.active ? (
          <option value={variant.name} key={i}>
            {variant.name}
          </option>
        ) : (
          <option disabled value={variant.name} key={i}>
            {variant.name}
          </option>
        )
      )}
    </select>
  );
};

export default ProductVariants;
