import {AUTH0_REDIRECT_URI} from '@env';

export const SCREENS = {
  groups: 'Groups',
  groupSettings: 'GroupSettings',
  signUp: 'SignUp',
  signIn: 'SignIn',
};

export const LINKING = {
  prefixes: [AUTH0_REDIRECT_URI],
  config: {
    screens: {
      [SCREENS.groups]: '',
      [SCREENS.groupSettings]: 'group-settings',
    },
  },
};
