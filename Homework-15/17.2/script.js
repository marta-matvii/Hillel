class Coach {
  constructor(name, specialization, rating) {
    this.name = name;
    this.specialization = specialization;
    this.rating = rating;
  }
  
  displayInfo() {
    return `Coach: ${this.name}, Specialization: ${this.specialization}, Rating: ${this.rating}`;
  }
}

const coach1 = new Coach('John Doe', 'Fitness', 4.7);
const coach2 = new Coach('Alice Smith', 'Yoga', 4.9);

console.log(coach1.displayInfo());
console.log(coach2.displayInfo());

const outputElement = document.getElementById('output');
const coach1Info = document.createTextNode(coach1.displayInfo());
const lineBreak = document.createElement('br');
const coach2Info = document.createTextNode(coach2.displayInfo());

outputElement.appendChild(coach1Info);
outputElement.appendChild(lineBreak);
outputElement.appendChild(coach2Info);