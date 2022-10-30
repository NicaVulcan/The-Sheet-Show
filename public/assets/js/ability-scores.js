// Retrieve selected race ability bonus info
const retrieveRaceBonus = async function (raceName) {
    const apiUrl = `https://www.dnd5eapi.co/api/races/${raceName.toLowerCase()}`
    
    const response = await fetch(apiUrl);
    if (response.ok) {
        const raceData = await response.json();
        return raceData.ability_bonuses;
    }
};

// takes in the array of ability scores based on race, and calculates ability scores and modifiers
const abilityScoresCalc = function (array) {

    // empty abilities object
    const abilitiesArr = [
        {name: "STR", score: 0, modifier: 0},
        {name: "DEX", score: 0, modifier: 0},
        {name: "CON", score: 0, modifier: 0},
        {name: "INT", score: 0, modifier: 0},
        {name: "WIS", score: 0, modifier: 0},
        {name: "CHA", score: 0, modifier: 0}
    ];

    // add each of the race bonuses to the abilities array
    for (let i = 0; i < array.length; i++) {

        let abilityName = array[i].ability_score.name;
        let abilityScore = array[i].bonus;
        // find object in array with matching ability name and save bonus score to it
        abilitiesArr.find(ability => ability.name === abilityName).score = abilityScore
    }

    // calculate scores and modifiers
    for (let i = 0; i < abilitiesArr.length; i++) {

    // if there is an existing ability bonus, add calculated score to it, otherwise just calculate a score: 
        // yields number between 6 - 18, to simulate rolling 4d6, re-rolling any 1s,and dropping lowest number
        if (abilitiesArr[i].score) {
            abilitiesArr[i].score += Math.floor((Math.random() * 12) + 6);
        } else {
            abilitiesArr[i].score = Math.floor((Math.random() * 12) + 6);
        }
        // takes ability score, subtracts 10, divides by 2, rounds up to nearest integer
        abilitiesArr[i].modifier = Math.ceil((abilitiesArr[i].score - 10) / 2);
    }

    // return the array with new calculated scores -including bonuses- and modifiers
    return abilitiesArr;
}

// TODO: Need to verify this still works, as only tested the calculations so far
// send post requests
async function postAbilityScores (heroID, name, score, modifier) {
    const response = await fetch('../api/abilities', {
        method: 'POST',
        body: JSON.stringify({
            hero_id: heroID,
            name: name,
            score: score,
            modifier: modifier
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    //-- API Response SUCCESS
    if      (response.ok) document.location.reload();
    
    //-- API Response FAIL
    else    alert(response.statusText);
}
    
async function createAbilityScores () {
    /** Manage calculating abilities scores when user clicks "Calculate" button.
     * 
     * 1. Retrieve
     * 2. Calculate
     * 3. Get Hero ID
     * 4. Post
     */

    //  1. Retrieve user input
    const race = document.querySelector('#race').value;
    const race_bonuses = await retrieveRaceBonus(race);
    
    //-- 2. Calculate ability scores
    const abilities = abilityScoresCalc(race_bonuses);
    
    //-- 3. Get Hero ID from URL
    const hero_id = window.location.toString()
        .split("/")[window.location.toString().split("/").length - 1];

    //-- 4. Post
    abilities.map(ability => {
        try{

            // Deconstruct
            const name      = ability.name;
            const score     = ability.score;
            const modifier  = ability.modifier;
            
            // Post to api
            postAbilityScores(hero_id, name, score, modifier);
        }
        catch(err){
            console.error(err);
        }
    });
    // console.log("createAbilityScores(): Post complete")
};

//TODO: Need to add calc scores button again!
document.querySelector("#calcScores").addEventListener("click",createAbilityScores);
