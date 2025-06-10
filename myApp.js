require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

let devicesSchema = new mongoose.Schema({
  devices: [String],
  quantity: Number,
  phones: String,
  laptops: String
})

let DevicesModel = mongoose.model("devices", devicesSchema);

const createAndSaveDevice = async (done) => {
 try{
    const devicesForLeslie = new DevicesModel({
    devices: ["phones", "laptops"],
    quantity: 2,
    phones: "Redmi a3x",
    laptops: "Hp EliteBook 8440p"
  })

  const data = await devicesForLeslie.save();
  done(null, data);
  console.log(data);
 } catch(e){
   console.log(e);
   done(e,null)
 }
}

//function call for the above function so that what is there can actually be executed
// createAndSaveDevice( (err, data)=> {
//   if(err) return console.log(err);
//   console.log("device added");
// }) 

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

const createAndSavePerson = async (done) => {
  try{
  const leslie = new Person({
  name: "Leslie",
  age: 22,
  apartment: "Hiltah Apartment",
  school: {
    course: "Computer Science"
  },
  favoriteFoods: ["pilau", "fish", "burgers"]
     })

  const data = await leslie.save();
  done(null, data); 
  } catch(e){
   done(e, null)
  }
}

//the function call for createAndSavePerson function
// createAndSavePerson((err, data)=>{
//   if(err) return console.error(err);
//   console.log("user Leslie has been added as a document");
//   console.log(data);
// })

let arrayOfPeople = [
  {name: "Lindsay",  age: 22, apartment: "Hiltah Apartment", school: {course: "Computer Science"},favoriteFoods: ["pilau", "fish", "burgers"]},
  {name: "Abayo",  age: 23, apartment: "Hiltah Apartment", school: {course: "Computer Science"},favoriteFoods: ["pilau", "fish", "burgers"]},
  {name: "Les",  age: 22, apartment: "Hiltah Apartment", school: {course: "Computer Science"},favoriteFoods: ["pilau", "fish", "burgers"]},
  {name: "Salah",  age: 33, apartment: "Egypt Apartment", school: {course: "Physical Education"},favoriteFoods: ["Oysters", "rice", "burgers"]}
]

const createManyPeople = async (arrayOfPeople, done) => {
  try{
     const data = await Person.create(arrayOfPeople);
     done(null, data)
  } catch(e){
    done(e, null)
  }
}

//function call for createManyPeople so as to push the changes to our MongoDb database
// createManyPeople( arrayOfPeople, function(err, data){
//   if(err) return console.error(err);
//   console.log("Your 4 users have been added as documents to your peeoples collection.")
// })

let personName = "Salah";

const findPeopleByName = async (personName, done) => {
  try{
    const data = await Person.find({ name: personName});
    done(null, data);
  } catch(e){
    done(e, null)
  }
}

//function call to ensure that our changes get pushed to our MongoDb
findPeopleByName(personName, function(err, personDetails){
  if(err) return console.error(err);
  console.log("Found person was successful, log(personDetails) to see");
})

let food = "pilau";

const findOneByFood = async (food, done)=> {
  try{
    const data = await Person.findOne({ favoriteFoods: food});
    done(null, data);
  }catch(e){
  done(e, null);
  }
}

//function call for the above handler function
findOneByFood(food, function(err, data){
  if(err) console.error(err);
  console.log("findByOne Details was successful, log(data) on the console to see details");
})

let personId = "68486df5c4af42766d02a6cb";

const findPersonById = async (personId, done) => {
  try{
   const data = await Person.findById(personId);
   done(null,data);
  } catch(e){
   done(e, null);
  }
}

//our function call for the above function
findPersonById( personId, function( err, foundIdedPerson){
  if(err) return console.error(err);
  console.log( "found the person of Id " + personId);
})

const findEditThenSave = async (personId, done) => {
  try{
   let foodToAdd = "Eggs";
   let personFound = await Person.findById(personId);
   personFound.favoriteFoods.push(foodToAdd);
   const data = await personFound.save()
   done(null, data);
  } catch(e){
    done(e, null)
  }
}

//The function call for the above handler function.
findEditThenSave(personId, (err, updatedPerson) => {
  if(err) return console.error(err);
  console.log("Added newer details, log (updatedPerson) to see the details");
})

const findAndUpdate = async (personName, done) => {
  try{
    const data = await Person.findOneAndUpdate({ name: personName} , {age: 34}, {new: true});
    done(null, data);
  } catch(e){
   done(e, null);
  }
}

//function call for the above handler function
findAndUpdate( personName, function( err, updatedPerson){
  if(err) return console.log( err);
  console.log("We've updated your age");
})

let personIdUsedForRemoval = '68486df5c4af42766d02a6zz';

const removeById = async (personIdUsedForRemoval, done) => {
  try{
     let data = await Person.findByIdAndDelete(personIdUsedForRemoval);
     done(null, data);
  }
  catch(e){
     done(e, null);    
  }
}

//We did not call this function, because we don't want to delete any user as for now.

const removeManyPeople = async (done) => {
  try{
    let data = await Person.remove({name: "leslie"})
    done(null, data);
  } catch(e){
    done(e, null)
  }
}

//We did not call this function, because we don't want to empty our collections in our databases.

const queryChain = async (done) => {
  try{
     const data = await Person.find({apartment:"Hiltah Apartment"})
                              .sort("name")
                              .limit(3)
                              .select({name: 1, apartment:1, age: 1})
    done(null, data);
  } catch(e){
    done(e, null);
  }
}

//function call for the above handler function
queryChain((err, data) => {
  if(err) console.log(err);
  console.log("Your search query is here " + data);
})

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
