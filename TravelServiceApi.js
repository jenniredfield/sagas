class TravelServiceApi {
  constructor() {
   
  }

  getUser() {
    return new Promise((resolve) => {
      console.log('fetching user...')
      // call to DB
      setTimeout(() => {
        console.log('resolving...')
        resolve({
          email: 'somemockemail@email.com',
          repository: 'http://github.com/username',
        });
      }, 3000);
    });
  }

  getDeparture(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          userId: user.email,
          flightID: 'AR1973',
          date: '10/27/2016 16:00PM',
        });
      }, 2500);
    });
  }

  getForecast(date) {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            date: date,
            forecast: "rain"
        });
        }, 2000);
      });
  }
}

module.exports = new TravelServiceApi();