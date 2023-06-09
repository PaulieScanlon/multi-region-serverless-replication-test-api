const { getDB } = require('../pg');
const { fromProvider } = require('cloud-regions-country-flags');

module.exports.handler = async (event) => {
  const client = await getDB().connect();

  const { type, color, depth } = JSON.parse(event.body);

  const date = new Date();

  try {
    const response = await client.query(
      'INSERT INTO buildings (date, type, color, depth) VALUES($1, $2, $3, $4) RETURNING id',
      [date, type, color, depth]
    );

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
            depth: depth,
          },
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        { message: 'Create v1 - Error!', region: process.env.AWS_REGION, error: error.message },
        null,
        2
      ),
    };
  } finally {
    client.release();
  }
};
