interface StockProp {
  stock: number | undefined;
}

function ProductStock({ stock }: StockProp) {
  return (
    <>
      {stock && stock > 0 && stock <= 5 ? (
        <p className="text-red-400">{`Only ${stock} item${stock > 1 ? 's' : ''} left!`}</p>
      ) : (
        ''
      )}
    </>
  );
}

export default ProductStock;
