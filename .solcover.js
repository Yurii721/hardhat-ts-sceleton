module.exports = {
    // configureYulOptimizer: true, // (Experimental). Should resolve "stack too deep" in projects using ABIEncoderV2.
    skipFiles: ["interfaces/", "mocks/", "from-dependencies/"],
    mocha: {
        fgrep: "[skip-on-coverage]",
        invert: true
    }
};
