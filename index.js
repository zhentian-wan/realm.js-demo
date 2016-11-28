var Realm = require('realm');

const PetShema = {
    name: 'Pet',
    properties: {
        name: 'string',
        species: 'string',
        age: 'int',
        hasFur: 'bool'
    }
};

const PersonSchema = {
    name: 'Person',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        birthday: 'date',
        pet: {type: 'Pet'}
    }
};

let realm = new Realm({
    path: './people.realm',
    schema: [PetShema, PersonSchema]
});

realm.write(() => {
    realm.create('Person', {
        id: 0,
        name: 'Bpb',
        birthday: new Date('2001-10-10'),
        pet: {
            name: 'Fluffy',
            species: 'Cat',
            age: 4,
            hasFur: true
        }
    })
});

realm.write(() => {

    realm.create('Person', {
        id: 1,
        name: 'Tom',
        birthday: new Date('1989-12-17'),
        pet: {
            name: 'Umi',
            species: 'Dog',
            age: 5,
            hasFur: true
        }
    });
});


let people = realm.objects('Person');
let pets = realm.objects('Pet');

console.log("people", JSON.stringify(people, null, 2));
console.log("pets", JSON.stringify(pets, null, 2));

let filteredPets = pets.filtered('age < 5');
console.log("filteredPets", JSON.stringify(filteredPets, null, 2));

let multiFilterPets = pets.filtered('hasFur = true AND name BEGINSWITH "F"');
console.log("multiFilterPets", JSON.stringify(multiFilterPets, null, 2));

let sortedAge = pets.sorted('age');
console.log("sortedAge", JSON.stringify(sortedAge, null, 2));

// Overwrite the existing Person
realm.write(() => {
    realm.create('Person', {id: 0, name: 'Jake'}, true)
});
console.log("Person", JSON.stringify(people, null, 2));

// delete
let person = realm.objects('Person').filtered('id = 0');
realm.write(() => {
    realm.delete(person);
});
console.log("After delete", JSON.stringify(people, null, 2));

// save data by marking alias

