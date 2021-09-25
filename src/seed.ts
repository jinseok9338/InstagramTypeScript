export const seedDatabase = async (firebase: firebase.default.app.App) => {
  const users = [
    {
      userId: 'NvPY9M9MzFTARQ6M816YAzDJxZ72',
      username: 'karl',
      fullName: 'Karl Hadwen',
      emailAddress: 'karlhadwen@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now(),
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['NvPY9M9MzFTARQ6M816YAzDJxZ72'],
      dateCreated: Date.now(),
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['NvPY9M9MzFTARQ6M816YAzDJxZ72'],
      dateCreated: Date.now(),
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['NvPY9M9MzFTARQ6M816YAzDJxZ72'],
      dateCreated: Date.now(),
    },
  ];
  // Need to refactor into another file
  const theUserExist = async (emailAddress: string): Promise<boolean> =>
    firebase
      .firestore()
      .collection('users')
      .where('emailAddress', '==', emailAddress)
      .get()
      .then((res) => !!res)
      .catch(() => false);

  users.forEach(async (user) => {
    theUserExist(user.emailAddress).then((res) => {
      if (res === true) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.emailAddress)
          .set(user)
          .then(() => {
            console.log(
              `A new User with Address ${user.emailAddress} added to the database`
            );
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    });
  });

  for (let i = 1; i <= 5; i += 1) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!',
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?',
          },
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now(),
      });
  }
};
