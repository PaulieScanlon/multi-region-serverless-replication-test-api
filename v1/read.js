const { getDB } = require('../pg');
const { fromProvider } = require('cloud-regions-country-flags');

module.exports.handler = async () => {
  const client = await getDB().connect();

  try {
    const response = await client.query('SELECT * from buildings');

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Read v1 - A Ok!',
          region: process.env.AWS_REGION,
          provider: fromProvider(process.env.AWS_REGION, 'AWS'),
          data: {
            buildings: response.rows.sort((a, b) => b.date - a.date) || [],
          },
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Read v2 - Error!', region: process.env.AWS_REGION, error: error }, null, 2),
    };
  } finally {
    client.release();
  }
};
