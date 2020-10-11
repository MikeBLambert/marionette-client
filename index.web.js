import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import fontAwesomeFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import antDesignFont from 'react-native-vector-icons/Fonts/AntDesign.ttf';
import materialDesignFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import App from './web/WebApp';

const iconFontStyles = `
@font-face {
  src: url(${fontAwesomeFont});
  font-family: FontAwesome;
}
@font-face {
  src: url(${antDesignFont});
  font-family: AntDesign;
}
@font-face {
  src: url(${materialDesignFont});
  font-family: MaterialIcons;
}
`;

const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

document.head.appendChild(style);

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
