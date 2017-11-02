const users = [
  {
    id: 1,
    name: 'Alex',
    schoolId: 101
  },
  {
    id: 2,
    name: 'Jessica',
    schoolId: 999
  }
];

const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 86
  },
  {
    id: 2,
    schoolId: 999,
    grade: 100
  },
  {
    id: 3,
    schoolId: 101,
    grade: 80
  }
];

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}.`);
    }
  });
};

const getGrades = schoolId => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.schoolId === schoolId));
  });
};

// const getAverage = userId => {
//   // Promise chains are limited in that they don't give access to values from other chains:
//   // You don't have access to "user" further down the chain
//   let user;
//   return getUser(userId)
//     .then(tempUser => {
//       user = tempUser;
//       return getGrades(user.schoolId);
//     })
//     .then(grades => {
//       let average = 0;
//
//       if (grades.length > 0) {
//         // Get array of objects down to an array of numbers: individual grade object and its grade property
//         // Then turn the array of numbers into sum and divide that by the length of the array
//         average =
//           grades.map(grade => grade.grade).reduce((a, b) => a + b) /
//           grades.length;
//       }
//
//       return `${user.name} has a ${average}% in the class.`;
//     });
// };

// const getAverageAlt = async userId => {
//   // This is the Async/Await alternative to "reject('This is an error')"
//   throw new Error('This is an error');
//   // This is the Async/Await alternative to "resolve()"
//   return 'Mike';
// };

// Use Async/Await syntax instead
// Mark functions as special functions with async in front, to get a Promise back--available as if it was resolved
const getAverageAlt = async userId => {
  // "await" has to be used in an "async" function, and just before a Promise,
  // i.e. awaiting for that Promise to either resolve or reject.
  // Without, "await" below we'd just get a Promise back
  // If resolved, store in the "user" variable,
  // otherwise don't create "user" variable, no longer execute, and get error inside of "catch"
  const user = await getUser(userId);
  // No need for temorary variables, complex chaining, or nesting
  const grades = await getGrades(user.schoolId);

  let average = 0;

  if (grades.length > 0) {
    average =
      grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
  }

  return `${user.name} has a ${average}% in the class.`;

  console.log(user, grades);
};

getAverageAlt(1)
  .then(name => {
    console.log(name);
  })
  .catch(err => {
    console.log(err);
  });

// getAverage(1)
//   .then(average => {
//     console.log(average);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// getGrades(101)
//   .then(grades => {
//     console.log(grades);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// getUser(21)
//   .then(user => {
//     console.log(user);
//   })
//   .catch(err => {
//     console.log(err);
//   });
