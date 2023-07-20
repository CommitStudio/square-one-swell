interface StockProp {
  stock: number | undefined;
}

function ProductStock({ stock }: StockProp) {
  return (
    <>
      {stock && stock > 0 && stock <= 5 ? (
        <span className="text-red-400 inline">{`Only ${stock} item${
          stock > 1 ? 's' : ''
        } left!`}</span>
      ) : (
        ''
      )}
    </>
  );
}

export default ProductStock;
