const { getDB } = require('../pg');

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
          data: {
            buildings: response.rows || [],
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
