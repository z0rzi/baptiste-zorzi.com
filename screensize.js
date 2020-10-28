module.exports = {
    intValues: {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
    }
}

module.exports.stringValues = {};

for (const key of Object.keys(module.exports.intValues)) {
    module.exports.stringValues[key] = module.exports.intValues[key] + 'px';
}
