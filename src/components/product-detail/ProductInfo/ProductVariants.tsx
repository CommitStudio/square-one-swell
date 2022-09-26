interface ProductProp {
  product: Product;
}

const ProductVariants = ({ product }: ProductProp) => {
  return (
    <>
      <h5 className="pt-3">Variantes:</h5>
      <select name="variants" className="border p-1" defaultValue="Selecciona una variante...">
        <option disabled>Selecciona una variante...</option>
        {product.variants?.map((variant, i) =>
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
    </>
  );
};

export default ProductVariants;
