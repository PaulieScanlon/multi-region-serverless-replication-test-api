const { getDB } = require('../pg');
const { fromProvider } = require('cloud-regions-country-flags');

module.exports.handler = async (event) => {
  const client = await getDB().connect();

  const { type, color } = event.queryStringParameters;
  const date = new Date();

  try {
    const response = await client.query('INSERT INTO buildings (date, type, color) VALUES($1, $2, $3) RETURNING id', [
      date,
      type,
      color,
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Create v1 - A Ok!',
          region: process.env.AWS_REGION,
          provider: fromProvider(process.env.AWS_REGION, 'AWS'),
          data: {
            id: response.rows[0].id,
            date: date,
            type: type,
            color: color,
          },
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Create v1 - Error!', region: process.env.AWS_REGION, error: error }, null, 2),
    };
  } finally {
    client.release();
  }
};
