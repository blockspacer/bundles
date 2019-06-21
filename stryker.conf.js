module.exports = function(config) {
    config.set({
        files: ['test/**/*.js', 'app/**/*.js'],
        mutator: "javascript",
        packageManager: "yarn",
        reporters: ["html", "clear-text", "progress"],
        testRunner: "command",
        commandRunner: {
            command: 'yarn test:mutation' // optionally choose a different command to run
        },
        mutate: ["test/integration/customerorder.test.js"]
    });
};