var Person = {};

Person['age'] = 20;
Person['name'] = '소녀시대';
Person.mobile = '010-0000-0000';

console.log('Age: %d', Person.age);
console.log('Name: %s', Person.name);
console.log('Tel: %s', Person['mobile']);