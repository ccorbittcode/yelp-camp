const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 600; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          //USER IS 'SAM' -  if deleted needs to be replaced
            author: '64f9efc2f0fa4aa6929d3b64',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price,
            geometry: {
              type: 'Point',
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dgdw05foe/image/upload/v1694809140/YelpCamp/qd5qzks4l2ell27tk1kb.jpg',
                  filename: 'YelpCamp/jmhatkzilbg4r5wk4tbk'
                },
                {
                  url: 'https://res.cloudinary.com/dgdw05foe/image/upload/v1694809137/YelpCamp/ts9ba1pt647xpvo2eqhe.jpg',
                  filename: 'YelpCamp/xpw8ievmvmygsnghw4ys'
                },
                {
                  url: 'https://res.cloudinary.com/dgdw05foe/image/upload/v1694809138/YelpCamp/pkfudjdgxoibodm8jw76.jpg',
                  filename: 'YelpCamp/vvnxthdtmdhuq9bqkyku'
                }
              ],
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non aperiam temporibus architecto aliquid consectetur? Unde at maiores pariatur tenetur magni ea voluptatem perspiciatis exercitationem quam in fugit, blanditiis eligendi debitis?",

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
