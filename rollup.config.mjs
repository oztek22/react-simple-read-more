import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/string-parser.jsx',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions: ['.js', '.jsx'] }),
    babel({
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', { targets: '> 0.5%, last 2 versions, not dead' }],
        ['@babel/preset-react', { runtime: 'classic' }],
      ],
      extensions: ['.js', '.jsx'],
    }),
  ],
};
