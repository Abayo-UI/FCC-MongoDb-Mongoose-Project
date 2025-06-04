require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, //this is just a configuration option
  useUnifiedTopology: true //this is also just a configuration opti
});

let devicesSchema = new mongoose.Schema({
  devices: [String],
  quantity: Number,
  phones: String,
  laptops: String
})

let Devices = mongoose.model("devices", devicesSchema);

const createAndSaveDevice = (done) => {
  const devicesForLeslie = new Devices({
    devices: ["phones", "laptops"],
    quantity: 2,
    phones: "Redmi a3x",
    laptops: "Hp EliteBook 8440p"
  })

  devicesForLeslie.save(function(err, data){
    if(err) return console.error(err);
    done(null, data)
  })
}

createAndSaveDevice( (err, data)=> {
  if(err) return console.log(err);
  console.log("device added");
}) 

let personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  apartment: String,
  school:  {
    course: String
  },
  favoriteFoods: [String],
}) 

let Person = mongoose.model("people", personSchema);

const createAndSavePerson = (done) => {
  const leslie = new Person({
  name: "Leslie",
  age: 22,
  apartment: "Hiltah Apartment",
  school: {
    course: "Computer Science"
  },
  favoriteFoods: ["pilau", "fish", "burgers"]
})
  leslie.save( function(err, data){
    if (err) return console.error(err);
    done(null, data);
  });
};

//the function call for createAndSavePerson function
createAndSavePerson((err, data)=>{
  if(err) return console.error(err);
  console.log("user Leslie has been added as a document");
  console.log(data);
})

let arrayOfPeople = [
  {name: "Lindsay",  age: 22, apartment: "Hiltah Apartment", school: {course: "Computer Science"},favoriteFoods: ["pilau", "fish", "burgers"]},
  {name: "Abayo",  age: 23, apartment: "Hiltah Apartment", school: {course: "Computer Science"},favoriteFoods: ["pilau", "fish", "burgers"]},
  {name: "Les",  age: 22, apartment: "Hiltah Apartment", school: {course: "Computer Science"},favoriteFoods: ["pilau", "fish", "burgers"]},
  {name: "Salah",  age: 33, apartment: "Egypt Apartment", school: {course: "Physical Education"},favoriteFoods: ["Oysters", "rice", "burgers"]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err,data) =>{
     if(err) return console.error(err);
     done(null, data); 
  })
};

//function call for createManyPeople so as to push the changes to our MongoDb database
createManyPeople( arrayOfPeople, function(err, data){
  if(err) return console.error(err);
  console.log("Your 4 users have been added as documents to your peeoples collection.")
})

let personName = "Salah";

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName}, (err, data) => {
      if(err) return console.error(err);
      done(null, data);
  })
};

//function call to ensure that our changes get pushed to our MongoDb
findPeopleByName(personName, function(err, personDetails){
  if(err) return console.error(err);
  console.log("Found people:", personDetails);
})


let food = "pilau";

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food}, (err, data) =>{
    if(err) return console.error(err);
    done(null, data);
  })
};

//function call for the above handler function
findOneByFood(food, function(err, data){
  if(err) console.error(err);
  console.log("findByOne Details", data);
})

let personId = "683da494fad8b51498d548aa";
const findPersonById = (personId, done) => {
  Person.findById( personId, function(err, data){
    if(err) return console.log(err);
    done(null, data)
  })
};

//our function call for the above function
findPersonById( personId, function( err, foundIdedPerson){
  if(err) return console.error(err);
  console.log( "found the person of Id " + personId)
  console.log( "Their details are", foundIdedPerson)
})

const findEditThenSave = (personId, done) => {
  Person.findById(personId, function(err, returnedDocument){
    const foodToAdd = "hamburger";
    if(err) return console.error(err);

    returnedDocument.favoriteFoods.push(foodToAdd);

    returnedDocument.save( (err, data) => {
      if(err) return console.log(err);
      done(null, data);
    })
  })
};
//The function call for the above handler function.
findEditThenSave(personId, (err, updatedPerson) => {
  if(err) return console.error(err);
  console.log("Added newer details", updatedPerson);
})

const findAndUpdate = (personName, done) => {
  const ageToSet = 100;
  Person.findOneAndUpdate( {name: personName}, {age: ageToSet} , {new: true} , (err, data)=>{
   if(err) return console.log(err);
   done( null, data)
  })
};

//function call for the above handler function
findAndUpdate( personName, function( err, updatedPerson){
  if(err) return console.log( err);
  console.log("We've updated your age", updatedPerson);
})

const removeById = (personId, done) => {
  Person.findByIdAndRemove( personId, (err, removedDoc) => {
    if(err) return console.log(error);
    done(null, removedDoc)
  })
};

const removeManyPeople = (done) => {
  Person.remove( {name: "Leslie"}, (err, data)=> {
    if(err) return console.log(err);
    done(null, data);
  })
};

//function call for the above handler function
removeManyPeople( function(err, data){
  if(err) return console.log(err);
  console.log("I just ant to see what this method returns", data);
})

const queryChain = (done) => {
  const foodToSearch = "pilau";
  Person.find( {favoriteFoods: foodToSearch})
        .sort( "name")
        .limit(2)
        .select( ["name", "favoriteFoods"])
        .exec( function(err, data){
          done(null, data);
        })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
