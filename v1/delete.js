const { getDB } = require('../pg');

module.exports.handler = async (event) => {
  const client = await getDB().connect();

  const { id } = event.queryStringParameters;

  try {
    await client.query('DELETE FROM buildings WHERE id = $1', [id]);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Delete v1 - A Ok!',
          region: process.env.AWS_REGION,
          provider: fromProvider(process.env.AWS_REGION, 'AWS'),
          id,
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Delete v1 - Error!', region: process.env.AWS_REGION, error: error }, null, 2),
    };
  } finally {
    client.release();
  }
};
