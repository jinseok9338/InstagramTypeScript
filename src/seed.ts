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

  // This code is ugly need to refactor this 

  // for (let k = 0; k < users.length; k += 1) {
  //   firebase.firestore().collection('users').add(users[k]);
  // }

  const theUserExist = async (emailAddress:string) => {
    firebase.firestore().collection('users').where('emailAddress', '==', emailAddress).get().then((res) => {
      if (res.empty) {
        return true
      }
    }).catch(() => 
       false
    )
  }

  users.forEach(async (user) => {

    if(theUserExist(user.emailAddress)) {
      // Need to refactor this into 
      const userResult = await firebase.firestore().collection('users').doc(user.emailAddress).set(user);
      console.log(userResult)
    }
 })

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
}
