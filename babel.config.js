module.exports = function(api) {

    const presets = [
        [
            '@babel/preset-env',
            {
                modules: false,
                loose: true
            }
        ],
        '@babel/preset-react'
    ];
    
    const plugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime',
        'lodash'
    ];
    
    if (api.env('production')) {
        plugins.push([
            'transform-react-remove-prop-types',
            {
                mode: 'remove',
                removeImport: 'true'
            }
        ]);
    }

    return { presets, plugins };
};
