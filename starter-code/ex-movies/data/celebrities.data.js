const faker = require ("faker");

const celebrities = new Array(10000).fill(null).map((ele)=>{
    return {
        name: faker.name.firstName(),
        occupation: faker.commerce.department(),
        catchPhrase: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, porro? Unde voluptate corporis ea. Exercitationem quis, doloribus distinctio debitis vitae ipsa sint excepturi! Optio eius iusto ab? Quasi, laboriosam libero.',
        image: faker.image.avatar(),
        hobbies: 'tennis',
    };
});

module.exports = celebrities;
