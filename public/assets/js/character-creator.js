// Retrieve selected race info
const retrieveRaceInfo = async function (raceName) {
    //TODO:: 10152022 #EP || Add timeout
    const apiUrl = `https://www.dnd5eapi.co/api/races/${raceName}`;

    const response = await fetch(apiUrl);
    if (response.ok) {
        const raceData = await response.json();
        // saving data to object
        const raceInfo = {
            ability_bonuses : raceData.ability_bonuses,
            alignment : raceData.alignment,
            languages : raceData.languages
        }

        return raceInfo;
    }
};

// Retrieve selected class info
const retrieveClassInfo = async (className) =>  {
    // console.log("Getting class..")

    //TODO:: 10152022 #EP || Add timeout
    const apiUrl = `https://www.dnd5eapi.co/api/classes/${className}`;
    
    const response = await fetch(apiUrl);
    if (response.ok) {
        const classData = await response.json();
        // saving data to object
        const classInfo = {
            choice_number   : classData?.proficiency_choices?.[0]?.choose,
            prof_array      : classData?.proficiency_choices?.[0]?.from?.options
        }

        return classInfo;
    }
}

// Calculate Proficiency Bonus
    // determined by player level (starting from level 1, the bonus increases by 1every four levels)
const profBonusCalc = async (playerLevel) => {
    let profBonus = Math.ceil(playerLevel/4)+1;
    return profBonus;
};

// turn an array of languages into a string for storage in model
    // sequelize will only allow storage as array if using PostgresSQL)
    // takes array of objects, retrieves name property from each and pushes it to a new array
    // joins array items into a string
const stringFromArray = function (array) {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
        arr.push(array[i].name);
    }
    return arr.join(", ");
}


const get_nRandomProficiencies = function (array, n) {
    /** Provide an array of objects, and N proficiencies to get string of all profs.
     * 
     * @param {array} array - array of proficiencies as objects
     * @param {number} n - number of proficiencies to return
     * 
     * @returns {string} - string of proficiencies
     */
    
    let proficiencies = [];
    try {
        //-- Build array that will be converted to string with N results
        array.map((proficiency) => {
            if(proficiencies.length < n) {
                arr.push(proficiency.item.name);
            }
        })
    }
    catch (err){
        console.log("Unable to extract proficiency names from array. See Error: ", err)
    }
    return proficiencies.join(" ");
}

// take user input from character creator form to turn into object to generate a character and save to database
async function newCharFormHandler(event) {
    event.preventDefault();

    // info retrieved directly from form, or from calculations from form input values
    const name = document.querySelector('#char-name').value;
    const race = document.querySelector('#char-race').value;
    const char_class = document.querySelector('#char-class').value;
    const gender = document.querySelector('#char-gender').value;
    const age = document.querySelector('#char-age').valueAsNumber;
    const player_level = document.querySelector('#char-level').valueAsNumber;
    const proficiency_bonus = profBonusCalc(player_level).valueAsNumber;
    const image_link = `./assets/images/race_${race}.PNG`;

    //-- API Calls to DnD for character stats
    //TODO: 10152022 #EP || Review this to identify any other potential useful info
    // info retrieved from api/races based on user input
    const raceInfo = await retrieveRaceInfo(document.querySelector('#char-race').value);
    const alignment = raceInfo.alignment;
    const langString = stringFromArray(raceInfo.languages);
    // console.log('Got Race')

    // info retrieved from api/classes based on user input
    //TODO:: 10152022 #EP || Fix this, it's not working
    const classInfo = await retrieveClassInfo(document.querySelector('#char-class').value);
    const profString = get_nRandomProficiencies(classInfo.prof_array, classInfo.choice_number);
    console.log('Got Class')
    console.log("profString: ", profString)

    // console.log("Attempting to Create character")
    const response = await fetch('/api/heroes', {
        method: 'POST', 
        body: JSON.stringify({
            name,
            race,
            class: char_class,
            gender,
            age,
            player_level,
            proficiency_bonus,
            alignment,
            languages: langString,
            proficiencies: profString,
            image_link,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#character-form').addEventListener('submit', newCharFormHandler);


