import pino from 'pino';


const logger = pino({
  formatters: {
    log: (object) => {

      return {
        injected_request_id: object.requestId,
        message: object.msg,
      };
    }
  }
});

export const handler = async (event, context) => {
  const requestId = context.awsRequestId;


  const logWithRequestId = (level, msg) => {
    logger[level]({ requestId, msg });
  };

  logWithRequestId('info', 'Test Lambda Log');

  try {
    
    logWithRequestId('info', 'Processing succeeded');
  } catch (e) {
    logWithRequestId('error', `Error occurred: ${e.message}`);
    throw e;
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!')
  };
};