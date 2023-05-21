const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// console.log(process.env.DB_PASSWORD)

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.eqk9iwm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   }
});

async function run() {
   try {
      await client.connect();

      const addToyCollection = client.db('babybo').collection('babybos');
      
      app.get('/services/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: new ObjectId(id) }

         const options = {
             // Include only the `title` and `imdb` fields in the returned document
             projection: { title: 1, price: 1, service_id: 1, img: 1 },
         };

         const result = await serviceCollection.findOne(query, options);
         res.send(result);
     })




      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
   } finally {
      //  await client.close();
   }
}
run().catch(console.dir);




app.get('/', (req, res) => {
   res.send('Babybo is running')
})

app.listen(port, () => {
   console.log(`BabyBo Server is running on port ${port}`)
})