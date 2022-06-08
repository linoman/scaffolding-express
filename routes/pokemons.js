var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const pokemonURL = 'https://pokeapi.co/api/v2/pokemon';

let pokemonDB = [];
fetch(pokemonURL)
  .then(response => response.json())
  .then(json => {
    const unresolvedFetchs = json.results.map(pokemon => fetch(pokemon.url)); //collection of fetch's
    return Promise.all(unresolvedFetchs);
  })
  .then(resovledFetches => {
    const unresolvedJson = resovledFetches.map(resolvedFetch => resolvedFetch.json())
    return Promise.all(unresolvedJson)
  })
  .then(resolvedJsons => {
    const result = resolvedJsons.map(json => {
      return {
        id: json.id,
        name: json.name,
        abilities: json.abilities.map(ability => ability.ability.name)
      };
    });
    // return res.send(result);
    pokemonDB = result
  })


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(pokemonDB);
});

router.delete('/:pokemonName', function(req, res, next) {
  const pokemonName = req.params.pokemonName;
  const indexToDelete = pokemonDB.findIndex(pokemon => pokemon.name === pokemonName);
  pokemonDB.splice(indexToDelete, 1);
  res.sendStatus(200);
});

module.exports = router;
