const { getDB } = require('../pg');
const { fromProvider } = require('cloud-regions-country-flags');

module.exports.handler = async (event, context) => {
  const client = await getDB().connect();

  //   const { type, color } = JSON.parse(event.body);
  const { type, color } = event;

  try {
    const response = await client.query('INSERT INTO buildings (type, color) VALUES($1, $2) RETURNING id', [
      type,
      color,
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Create Buildings v1 - A Ok!',
          region: process.env.AWS_REGION,
          provider: fromProvider(process.env.AWS_REGION, 'AWS'),
          data: {
            id: response.rows[0].id,
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
      body: JSON.stringify(
        { message: 'Create Buildings v1 - Error!', region: process.env.AWS_REGION, error: error },
        null,
        2
      ),
    };
  } finally {
    client.release();
  }
};
