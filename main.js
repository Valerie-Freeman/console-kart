const items = [
  'Red shell',
  'Green shell',
  'Banana',
  'Red mushroom',
  'Blue shell',
  'Star',
  'Gold mushroom',
  'Ghost',
  'Lightning',
  'Fake box',
]

const drivers = [
  {
    name: 'Mario',
    place: 2,
    item: '',
  },
  {
    name: 'Luigi',
    place: 5,
    item: '',
  },
  {
    name: 'Peach',
    place: 8,
    item: '',
  },
  {
    name: 'Toad',
    place: 1,
    item: '',
  },
  {
    name: 'Bowser',
    place: 4,
    item: '',
  },
  {
    name: 'Wario',
    place: 7,
    item: '',
  },
  {
    name: 'Donkey Kong',
    place: 3,
    item: '',
  },
  {
    name: 'Yoshi',
    place: 6,
    item: '',
  },
]
//****** Helper functions ******/
const getRandomOpponent = () => {
  const randomIndex = Math.floor(Math.random() * 8)
  return drivers[randomIndex]
}

const moveOpponentOneSpaceBack = (opponent) => {
  // If in last place, display message, but no placement change
  if (opponent.place === 8) {
    console.log(`${opponent.name} is already in last. Nothing changes.\n\n`)
  } else {
    // Find driver behind targeted opponent
    const oneBehindTargetedOpponent = drivers.find(
      (driver) => driver.place === opponent.place + 1
    )
    // Move targeted opponent back one place
    opponent.place++
    // Move one behind targeted opponent up
    oneBehindTargetedOpponent.place--
    // Display placement message
    console.log(
      `${opponent.name} took time to recover and ${oneBehindTargetedOpponent.name} passed him.`
    )
    console.log(
      `${opponent.name} is now in ${getPlacementByNumber(opponent.place)} and ${
        oneBehindTargetedOpponent.name
      } is in ${getPlacementByNumber(oneBehindTargetedOpponent.place)}.\n\n`
    )
  }
}

const moveDriverAheadByThree = (driver) => {
  // Get array of opponents in the 3 spots ahead of driver
  const targetedOpponents = drivers.filter(
    (opponent) =>
      opponent.place === driver.place - 1 || // In the next spot ahead?
      opponent.place === driver.place - 2 || // In 2 spots ahead?
      opponent.place === driver.place - 3 // In 3 spots ahead?
  )
  // For each one, set their place to +1 (to signify moving behind 1 space)
  targetedOpponents.map((opponent) => opponent.place++)
  // Set drivers place to -3 (to signify moving ahead 3 places)
  // If the driver's place is less than 4, just set the driver's place to 1 (to avoid 0 or negative placement)
  if (driver.place < 4) {
    driver.place = 1
  } else {
    driver.place = driver.place - 3
  }

  // Display placement message
  const targetedOpponentNames = targetedOpponents
    .map((opponent) => opponent.name)
    .join(' and ')

  console.log(
    `${
      driver.name
    } passed ${targetedOpponentNames} while they were recovering.\n${
      driver.name
    } is now in ${getPlacementByNumber(driver.place)} place.\n\n`
  )
}

const getPlacementByNumber = (num) => {
  if (num === 1) {
    return '1st'
  } else if (num === 2) {
    return '2nd'
  } else if (num === 3) {
    return '3rd'
  } else {
    return `${num}th`
  }
}

//****** Function to display placement ******/
const displayPlacements = () => {
  console.log(`********* PLACEMENT **********`)
  console.log(`1st: ${drivers.find((driver) => driver.place === 1).name}`)
  console.log(`2nd: ${drivers.find((driver) => driver.place === 2).name}`)
  console.log(`3rd: ${drivers.find((driver) => driver.place === 3).name}`)
  console.log(`4th: ${drivers.find((driver) => driver.place === 4).name}`)
  console.log(`5th: ${drivers.find((driver) => driver.place === 5).name}`)
  console.log(`6th: ${drivers.find((driver) => driver.place === 6).name}`)
  console.log(`7th: ${drivers.find((driver) => driver.place === 7).name}`)
  console.log(`8th: ${drivers.find((driver) => driver.place === 8).name}\n`)
}

//****** Function to assign item *****/
// Accepts a driver
// Get a random number between 0 and 9
// Use the random number as an index to get one item from the items array
// Assign item to driver
// Display message with Driver name and Item name

const getItem = (driverObj) => {
  const index = Math.floor(Math.random() * 10) // This will give me a random whole number between 0 and 9
  const selectedItem = items[index]
  driverObj.item = selectedItem
  console.log(`${driverObj.name} got the ${selectedItem}.`)
}

//****** Function to use item ********/
// Accepts a driver
// Get a random number between 0 and 7
// Use the random number as an index to get a targeted opponent
// Do something different for each item

const useItem = (driverObj) => {
  //& RED SHELL
  if (driverObj.item === 'Red shell') {
    // If driver is in first place, hold on to shell
    if (driverObj.place === 1) {
      console.log(
        `${driverObj.name} holds onto the ${driverObj.item} for protection.`
      )
    } else {
      // Find the driver one place ahead
      const targetedOpponent = drivers.find(
        (opponent) => opponent.place === driverObj.place - 1
      )

      // Display strike message
      console.log(
        `${driverObj.name} struck ${targetedOpponent.name} with the ${driverObj.item}.`
      )

      // Targeted opponent falls one place behind:
      moveOpponentOneSpaceBack(targetedOpponent)
    }
    //& GREEN SHELL
  } else if (driverObj.item === 'Green shell') {
    // Get random opponent
    const targetedOpponent = getRandomOpponent()

    // Display strike message
    // If self inflicted:
    if (targetedOpponent.name === driverObj.name) {
      console.log(
        `${targetedOpponent.name} was hit by his own ${driverObj.item}.`
      )
    } else {
      // If other opponent:
      console.log(
        `${driverObj.name} struck ${targetedOpponent.name} with the ${driverObj.item}.`
      )
    }

    // Targeted opponent falls one place behind:
    moveOpponentOneSpaceBack(targetedOpponent)

    //& BANANA
  } else if (driverObj.item === 'Banana') {
    // Get random opponent
    const targetedOpponent = getRandomOpponent()
    // Display strike message
    // If self inflicted
    if (targetedOpponent.name === driverObj.name) {
      console.log(
        `${targetedOpponent.name} ran into his own ${driverObj.item}.`
      )
    } else {
      // If other opponent
      console.log(
        `${targetedOpponent.name} spun out on ${driverObj.name}'s ${driverObj.item}.`
      )
    }
    // Targeted opponent falls one place behind:
    moveOpponentOneSpaceBack(targetedOpponent)

    //& RED MUSHROOM
  } else if (driverObj.item === 'Red mushroom') {
    // If driver is in first, use boost but no place change
    if (driverObj.place === 1) {
      console.log(
        `${driverObj.name} used the ${driverObj.item} to gain an even stronger lead.\n\n`
      )
    } else {
      // Find driver one place ahead
      const targetedOpponent = drivers.find(
        (opponent) => opponent.place === driverObj.place - 1
      )
      // Pass them up
      targetedOpponent.place++
      driverObj.place--
      // Display placement message
      console.log(
        `${driverObj.name} used the ${driverObj.item} to pass ${
          targetedOpponent.name
        }.\n${driverObj.name} is now in ${getPlacementByNumber(
          driverObj.place
        )} and ${targetedOpponent.name} is in ${getPlacementByNumber(
          targetedOpponent.place
        )}.\n\n`
      )
    }

    //& BLUE SHELL
  } else if (driverObj.item === 'Blue shell') {
    // If driver is in first place do nothing
    if (driverObj.place === 1) {
      console.log(
        `${driverObj.name} is in ${getPlacementByNumber(
          driverObj.place
        )} and so holds onto the ${driverObj.item}.\n\n`
      )
    } else {
      // Find the first place opponent
      const firstPlaceOpponent = drivers.find((driver) => driver.place === 1)
      // Display strike message
      console.log(
        `${driverObj.name} struck ${firstPlaceOpponent.name} with the ${driverObj.item}.`
      )
      // Place current driver in first place and target opponent in current driver's old place
      firstPlaceOpponent.place = driverObj.place
      driverObj.place = 1
      // Display placement message
      console.log(
        `${
          firstPlaceOpponent.name
        } took quite some time to recover and is now in ${getPlacementByNumber(
          firstPlaceOpponent.place
        )}.`
      )
      console.log(
        `Meanwhile, ${driverObj.name} made it to ${getPlacementByNumber(
          driverObj.place
        )}.\n\n`
      )
    }

    //& STAR
  } else if (driverObj.item === 'Star') {
    // Display strike message
    console.log(
      `${driverObj.name} used the star to demolish the three drivers ahead of him.`
    )
    // Move driver 3 places ahead
    moveDriverAheadByThree(driverObj)

    //& GOLD MUSHROOM
  } else if (driverObj.item === 'Gold mushroom') {
    // If in first do nothing
    if (driverObj.place === 1) {
      console.log(
        `${driverObj.name} used the ${driverObj.item} to gain an even stronger lead.\n\n`
      )
    } else {
      // Get array of opponents that are ahead of driver
      const targetedOpponents = drivers.filter(
        (opponent) => opponent.place < driverObj.place
      )
      const targetedOpponentNames = targetedOpponents
        .map((opponent) => opponent.name)
        .join(' and ')
      // Move them all one place back
      targetedOpponents.map((opponent) => opponent.place++)
      // Set driver to first
      driverObj.place = 1
      // Display strike and placement message
      console.log(
        `${driverObj.name} used the ${driverObj.item} to boost himself to first place.\nHe passed ${targetedOpponentNames}.\n\n`
      )
    }
    //& GHOST
  } else if (driverObj.item === 'Ghost') {
    // Get random opponent
    const targetedOpponent = getRandomOpponent()
    // Display strike message
    // If targeted opponent doens't have an item nothing happens
    if (!targetedOpponent.item) {
      console.log(
        `${driverObj.name} used the ${driverObj.item} to get ${targetedOpponent.name}'s item, however, ${targetedOpponent.name} doesn't have an item. Nothing happens.\n\n`
      )
    } else {
      console.log(
        `${driverObj.name} used the ${driverObj.item} to get ${targetedOpponent.name}'s ${targetedOpponent.item}.\n${driverObj.name} uses the ${targetedOpponent.item}.`
      )
      // Set driver's item to targeted opponent's item
      driverObj.item = targetedOpponent.item
      // Driver uses item
      useItem(driverObj)
    }

    //& LIGHTNING
  } else if (driverObj.item === 'Lightning') {
    // Display strike message
    console.log(
      `${driverObj.name} used the ${driverObj.item} to shock all other drivers.`
    )
    // Move driver 3 places ahead
    moveDriverAheadByThree(driverObj)

    //& FAKE BOX
  } else if (driverObj.item === 'Fake box') {
    // Get random opponent
    const targetedOpponent = getRandomOpponent()
    // Display strike message
    console.log(
      `${targetedOpponent.name} is fooled by ${driverObj.name}'s ${driverObj.item} and gets blown up.`
    )
    // Targeted opponent falls one place behind
    moveOpponentOneSpaceBack(targetedOpponent)
  }
}

// For each lap:
// Loop through each driver
// Call the function to assign item, pass the current driver
// Call the function to use item, pass the current driver

console.log(`
WELCOME TO MARIOOOO KAAAAAAART!!!
`)

// Lap 1
console.log(`*************** Lap 1 ***************\n`)
for (const driver of drivers) {
  getItem(driver)
  useItem(driver)
}
displayPlacements()

// Lap 2
console.log(`*************** Lap 2 ***************\n`)
for (const driver of drivers) {
  getItem(driver)
  useItem(driver)
}
displayPlacements()

// Lap 3
console.log(`*************** Lap 3 ***************\n`)
for (const driver of drivers) {
  getItem(driver)
  useItem(driver)
}
displayPlacements()

// Display winner
const winner = drivers.find((driver) => driver.place === 1)
console.log(`\n\n`)
console.log(
  `   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                                             
                                              
              THE WINNER IS ${winner.name}!!!      
                                              
                                              
   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`
)
