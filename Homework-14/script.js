function Student(firstName, lastName, birthYear) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthYear = birthYear;
  this.grades = []; 
  this.attendance = new Array(25).fill(undefined); 
}

Student.prototype.getAge = function() {
  const currentYear = new Date().getFullYear();
  return currentYear - this.birthYear;
};

Student.prototype.getAverageGrade = function() {
  if (this.grades.length === 0) {
    return 0;
  }
  const sum = this.grades.reduce((total, grade) => total + grade, 0);
  return sum / this.grades.length;
};

Student.prototype.present = function() {
  const emptyIndex = this.attendance.findIndex(item => item === undefined);
  if (emptyIndex !== -1) {
    this.attendance[emptyIndex] = true;
  }
};

Student.prototype.absent = function() {
  const emptyIndex = this.attendance.findIndex(item => item === undefined);
  if (emptyIndex !== -1) {
    this.attendance[emptyIndex] = false;
  }
};

Student.prototype.summary = function() {
  const averageGrade = this.getAverageGrade();
  
  const attendedClasses = this.attendance.filter(item => item === true).length;
  const totalClasses = this.attendance.filter(item => item !== undefined).length;
  const averageAttendance = totalClasses === 0 ? 0 : attendedClasses / totalClasses;
  
  if (averageGrade > 90 && averageAttendance > 0.9) {
    return "Молодець!";
  } else if (averageGrade > 90 || averageAttendance > 0.9) {
    return "Добре, але можна краще";
  } else {
    return "Редиска!";
  }
};

const student1 = new Student("Олександр", "Петренко", 2000);
const student2 = new Student("Марія", "Іваненко", 1999);
const student3 = new Student("Дмитро", "Коваленко", 2001);

student1.grades = [95, 87, 92, 88, 96];

student1.present(); 
student1.present(); 
student1.absent();  
student1.present(); 
student1.present(); 

console.log(`${student1.firstName} ${student1.lastName}:`);
console.log(`Вік: ${student1.getAge()} років`);
console.log(`Середній бал: ${student1.getAverageGrade().toFixed(2)}`);
console.log(`Підсумок: ${student1.summary()}`);
console.log('---');

student2.grades = [75, 80, 70, 85];
student2.present();
student2.present();
student2.absent();
student2.absent();

console.log(`${student2.firstName} ${student2.lastName}:`);
console.log(`Вік: ${student2.getAge()} років`);
console.log(`Середній бал: ${student2.getAverageGrade().toFixed(2)}`);
console.log(`Підсумок: ${student2.summary()}`);
console.log('---');

student3.grades = [60, 55, 65];
student3.absent();
student3.absent();
student3.present();

console.log(`${student3.firstName} ${student3.lastName}:`);
console.log(`Вік: ${student3.getAge()} років`);
console.log(`Середній бал: ${student3.getAverageGrade().toFixed(2)}`);
console.log(`Підсумок: ${student3.summary()}`);