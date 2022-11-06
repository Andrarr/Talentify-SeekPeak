export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const response = {
        code: err.code || 500,
        message: err.message || 'Internal Server Error',
        stack: err.stack || null
    }
    return res.status(response.code).json(response).end();
}
