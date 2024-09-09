const toCamelCase = (str) => {
  return str
    .split(" ")
    .map((word, index) => {
      if (word.charAt(0) && index === 0) {
        return word.charAt(0).toLowerCase() + word.slice(1).toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");
};

console.log(toCamelCase("Amar Cheema"));
console.log(toCamelCase("Calis Cheema"));
console.log(toCamelCase("Liverpool Manchester United"));

