# ME CHAT - APP

## Cách chạy ứng dụng
- Chạy dòng lệnh: `npm i` để cài đặt node_modules
- Tạo file .env
```js
    LINK_API=LINK_API_PROVIDED
```
- Chạy dòng lệnh: `npm start`
- Sử dụng điện thoại có cài phần mềm expo để quét mã QR
- Tương tác với ứng dụng -> ✔
## Một số hướng dẫn và cách khắc phục lỗi trong khi phát triển ứng dụng:
### Dựng layout cho ứng dụng -> Sử dụng react-navigation

-   Tạo các màn hình
-   Cài đặt thư viện react-navigation:

    -   B1: `npm install @react-navigation/native`
    -   B2 - Lưu ý cái này dùng cho expo: `npx expo install react-native-screens react-native-safe-area-context`
    -   B3:
        -   Luồng màn hình ngoài: `npm install @react-navigation/native-stack`
        -   Luồng màn hình home: `npm install @react-navigation/bottom-tabs`
    -   B4: Tạo routers cho ứng dụng. Nếu có lỗi thư viện thì chạy dòng lệnh: `npm start --reset-cache` rồi chạy lại ứng dụng.
        -   RootStackNavigator: Luồng các màn hình xử lý bên ngoài -> Login, Register, Authencation
        -   HomeTabNavigator: Luồng các màn hình chính
    -   B5: Tải thư viện icon: `https://github.com/oblador/react-native-vector-icons`
    -   B6: Tiến hành sử dụng thư viện

    ```js
        //import
        import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
        //hoặc
        import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

        //use
        <FontAwesome5 name={iconName} size={20} color={color} />
        //hoặc
        <Icon name={iconName} size={30} color="#fff" />
    ```

### Hướng dẫn dùng thư viện react-native-walkthrough-tooltip:

-   B1: Cài đặt thư viện: `npm i react-native-walkthrough-tooltip`
-   B2: import thư viện
    ```js
    import Tooltip from 'react-native-walkthrough-tooltip';
    ```
-   B3: Sử dụng:

    ```js
    <Tooltip
        isVisible={isVisible}
        content={
            <>
                {items.map((item) => (
                    <MenuItem icon={item.icon} title={item.title} key={item.id} />
                ))}
            </>
        }
        //style tool tips
        placement={'bottom'}
        onClose={() => setIsVisible(!isVisible)}
        contentStyle={{ width: 150, height: 200 }}
        tooltipStyle={{ marginLeft: 17, marginTop: 10 }}
    >
        {children}
    </Tooltip>
    ```

-   contentStyle: Tùy chỉnh độ rộng cao của menu
-   tooltipStyle: Tùy chỉnh menu theo ý muốn giống y hệt css bình thường

### Hướng dẫn sử dụng useRef

-   Tạo useRef với null value ở component cha
    ```js
    const nameRef = useRef(null);
    ```
-   Tạo component con

    ```js
    function TextInputPrimary({ placeholder, isPass }, ref) {
        const [isPassState, setIsPassState] = useState(isPass);
        const [text, setText] = useState('');

        const handleChangeText = (value) => {
            setText((preValue) => {
                ref.current = value;
                setText(value);
            });
        };

        return (
            <View style={styles.frameInput}>
                <TextInput
                    style={styles.textInput}
                    placeholder={placeholder}
                    secureTextEntry={isPassState}
                    value={text}
                    onChangeText={handleChangeText}
                />
                {isPass && (
                    <Icon name="eye-outline" color="#000" size={20} onPress={() => setIsPassState(!isPassState)} />
                )}
            </View>
        );
    }
    export default forwardRef(TextInputPrimary);
    ```

-   Sử dụng ở component cha
    ```js
    <TextInputPrimary ref={phoneNumber} placeholder="Nhập số điện thoại" />
    ```

### Hướng dẫn fix lỗi idb trên thư viện firebase

-   Tạo file `metro.config.js`

```js
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
```

### Xóa cảnh báo:

`EventEmitter.removeListener('change', ...): Method has been deprecated. Please instead use remove() on the subscription returned by EventEmitter.addListener.`

```js
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['EventEmitter.removeListener']);
```

### Cách sử dụng env trong react-native

-   Cài đặt thư viện: `npm install react-native-dotenv`

-   Config babel

```js
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: ['module:react-native-dotenv'],
    };
};
```

-   Sử dụng

```js
//tạo file config để import env
import { API_USERS } from '@env';

export default {
    API_USERS,
};

//import config khi cần chạy biến môi trường
import config from './config';
console.log(config.API_USERS); //localhost:3000/users
```

### View file with uri

-   Cài đặt thư viện `npm i react-native-webview`
-   Tạo một màn hình mới:

```js
<View style={{ width: '100%', height: '100%' }}>
    <View style={{ width: '100%', height: '100%' }}>
        <WebView source={{ uri: link }} onLoad={console.log('loaded!')} />
    </View>
</View>
```
