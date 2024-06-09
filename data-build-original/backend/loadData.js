require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/DataBuildApp";
const csvFilePath = '/Users/teclaire/project/mongodb/data.csv'; // path to CSV file

async function loadCSVData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('DataBuildApp'); // db
    const collection = db.collection('dashboardData');

    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convert fields to correct types
        data.census_year = parseInt(data.census_year);
        data.block_id = parseInt(data.block_id);
        data.property_id = parseInt(data.property_id);
        data.base_property_id = parseInt(data.base_property_id);
        data.clue_small_area = [data.clue_small_area];
        data.trading_name = [data.trading_name];
        data.business_address = [data.business_address];
        data.industry_anzsic4_code = parseInt(data.industry_anzsic4_code);
        data.industry_anzsic4_description = [data.industry_anzsic4_description];
        data.longitude = parseFloat(data.longitude);
        data.latitude = parseFloat(data.latitude);

        console.log(data);
        results.push(data);
      })
      .on('end', async () => {
        try {
          await collection.insertMany(results);
          console.log('Data successfully loaded into MongoDB');
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
