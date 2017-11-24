
import {
  NativeModules,
  ToastAndroid,
  Platform
} from 'react-native';
var ToastIOS = NativeModules.SKToastManager;
const isIOS = Platform.OS === 'ios';

// var delegate = {};
// ['top', 'center', 'bottom'].map((pos) => {
//   delegate[pos] = function (message) {
//     if (Platform.OS === 'ios') { // ios: show(String message, int duration, String position), 其中position为 top/center/bottom
//       ToastIOS.show(message, 2.0, pos);
//     } else { // android: show(String message, int type)，其中type为 ToastAndroid.SHORT / ToastAndroid.LONG
//       ToastAndroid.show(message, ToastAndroid.SHORT);
//     }
//   }
// })

function showToast(message, position = 'center', duration = 2.0) {
  if (isIOS) {
    ToastIOS.show(message, duration, position);
  } else {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }
}

const ToastDuration = {
  ...Platform.select({
    ios: {
      SHORT: 1.5,
      LONG: 3.0
    },
    android: {
      SHORT: ToastAndroid.SHORT,
      LONG: ToastAndroid.LONG
    }
  }),
}
const ToastPostion = {
  ...Platform.select({
    ios: {
      CENTER: 'center',
      TOP: 'top',
      BOTTOM: 'bottom',
    },
    android: {
      CENTER: ToastAndroid.CENTER,
      TOP: ToastAndroid.TOP,
      BOTTOM: ToastAndroid.BOTTOM,
    }
  })
}
export default {
  show: showToast,
  POSITION: ToastPostion,
  DURATION: ToastDuration
};
