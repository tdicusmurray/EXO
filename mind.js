var brain = require("brain.js");

class Element {
  constructor(background,border,image,shadow,top,left,scale) {
     this.background = background;
     this.border = border;
     this.image = image;
     this.shadow = shadow;
     this.top = top;
     this.left = left;
     this.scale = scale;
  }
 
  toString() {
    return this.background + " " + this.border + " " + this.image 
    + " " + this.shadow + " " + this.top + " " + this.left + " " + this.scale;
  }
}
const net = new brain.NeuralNetwork(
  { hiddenLayers: [3]}
);
var elementArray = Array();
elementArray[0] = new Element("#00FF00","1px #000000 solid", "teddy.png","1px","250px","250px","3");
elementArray[1] = new Element("#FF0000","1px #000000 solid", "teddy.png","1px","250px","250px","3");
elementArray[2] = new Element("#0000FF","1px #000000 solid", "teddy.png","1px","250px","250px","3");

const elements = {
   [elementArray[0]]: "Default Blue",
   [elementArray[1]]: "Default Red",
   [elementArray[2]]: "Default Green",
}

const trainingData = [];
for (let elementName in elements) {
  const element = elements[elementName];
  trainingData.push({
    input: { [element]: 1 },
    output: { [elementName]: 1 }
  })
}
net.train(trainingData, {
  log: (error) => console.log(error),
  logPeriod: 100
});

console.log(net.run({"Default Red" : 1}));