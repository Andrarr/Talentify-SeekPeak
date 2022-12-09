export const ok = (incomingData = 'ok', statusCode = 200) => {
  return {
    data: typeof incomingData === 'object' ? incomingData : { data: incomingData },
    statusCode,
  };
};

export const failure = (incomingData, statusCode = 400) => {
    return {
        data: typeof incomingData === 'object' ? incomingData : { data: incomingData } || 'Something went wrong',
        statusCode,
    };
};
