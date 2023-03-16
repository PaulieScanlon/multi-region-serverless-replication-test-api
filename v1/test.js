module.exports.handler = async (event) => {
  const { type, color } = event.queryStringParameters;

  try {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Test v1 - A Ok!',
          data: {
            type,
            color,
          },
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Test v1 - Error!', region: process.env.AWS_REGION, error: error }, null, 2),
    };
  } finally {
  }
};
