// Transform each word to PascalCase format - Ex: "product" --> "Product"
export const toPascalCase = (word: string) => {
  return word.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });
};
