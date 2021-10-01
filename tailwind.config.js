module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: ['./src/**/*.js', './src/**/**/*.js'],
  },
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary'),
    }),
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98',
        hover: '#00008B',
      },
      black: {
        light: '#262626',
        faded: '#00000059',
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb',
      },
      red: {
        primary: '#ed4956',
        background: '#FF8A8A',
      },
      green: {
        primary: '#10B981',
        background: '#6EE7B7',
      },
    },
    extend: {
      backgroundImage: {
        uploadImage: "url('upload.png')",
      },
    },
    maxHeight: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
    variants: {
      extend: {
        display: ['group-hover'],
      },
    },
  },
};
