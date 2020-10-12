// import {AUTH0_REDIRECT_URI} from '@env';

export const SCREENS = {
  groups: 'Groups',
  groupSettings: 'GroupSettings',
  signUp: 'SignUp',
  signIn: 'SignIn',
};

export const LINKING = {
  prefixes: ['https://master.d2d97pige1k70j.amplifyapp.com'],
  config: {
    screens: {
      [SCREENS.groups]: '',
      [SCREENS.groupSettings]: 'group-settings',
    },
  },
};
