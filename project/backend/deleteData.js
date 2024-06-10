require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/DataBuildApp";

async function deleteData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('DataBuildApp'); // db name
    const collection = db.collection('dashboardData'); // collection name

    // Delete the specific records
    const deleteResult1 = await collection.deleteOne({ census_year: 2023, trading_name: "Business" });
    const deleteResult2 = await collection.deleteOne({ census_year: 2022, trading_name: "Business2" });

    console.log('Deleted records:', deleteResult1.deletedCount + deleteResult2.deletedCount);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
}

deleteData();
