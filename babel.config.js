export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // transpile ESM
    ['@babel/preset-react', { runtime: 'automatic' }],       // JSX support
    '@babel/preset-typescript'                               // TS support
  ]
};
