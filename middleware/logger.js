const logger = (req, res, next) => {
    const time = new Date();
    console.log(
        `-----\n${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
        console.log("Containing the data:");
        console.log(`${JSON.stringify(req.body)}`);
    }
    next();
};

module.exports = logger;