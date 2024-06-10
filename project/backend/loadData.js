require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/DataBuildApp";
const csvFilePath = '/Users/teclaire/cloud_native_applications/project/mongodb/data.csv'; // path to CSV file

async function loadCSVData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('DataBuildApp'); // db name
    const collection = db.collection('dashboardData'); // collection name

    console.log(`Connected to database: ${db.databaseName}`);
    console.log(`Using collection: ${collection.collectionName}`);

    // Step 1: Delete existing data
    await collection.deleteMany({});
    console.log('Existing data deleted');

    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        // Ensure numeric fields are correctly parsed
        data.census_year = parseInt(data.census_year, 10);
        data.longitude = parseFloat(data.longitude);
        data.latitude = parseFloat(data.latitude);

        // Ensure string fields are correctly handled
        data.location = data.location || "";
        data.trading_name = data.trading_name || "";
        data.business_address = data.business_address || "";
        data.industry_description = data.industry_description || "";

        console.log(data);
        results.push(data);
      })
      .on('end', async () => {
        try {
          const insertResult = await collection.insertMany(results);
          console.log('Data successfully loaded into MongoDB');
          console.log(`Inserted ${insertResult.insertedCount} documents.`);
        } catch (error) {
          console.error('Error inserting data into MongoDB:', error);
        } finally {
          await client.close();
        }
      });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

loadCSVData();
