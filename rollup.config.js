import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

const config = [
  {
    input: 'src/main.js',
    output: [
      {
        name: 'BluePJS',
        file: './dist/main.esm.js',
        format: 'esm'
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      postcss({
        modules: true,
        extensions: ['.less', '.css'],
        use: [
          ['less', {
            javascriptEnabled: true
          }]
        ],
        inject: true,
        extract: false
      })
    ]
  },
  {
    input: 'src/main.js',
    output: [
      {
        name: 'BluePJS',
        file: './dist/main.umd.js',
        format: 'umd'
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      postcss({
        modules: true,
        extensions: ['.less', '.css'],
        use: [
          ['less', {
            javascriptEnabled: true
          }]
        ],
        inject: true,
        extract: false
      })
    ]
  }
];

export default config;
