const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
};

module.exports = errorHandler;