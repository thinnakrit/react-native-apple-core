# React Native Apple Core

Use Apple services on React Native

Update Log
- 1.1.0 : Update version react-native-webview@8.0.3

* Apple Sign in service [ iOS , Android ]
 
 


# Install
Npm
```npm
npm install react-native-apple-core
```
Yarn
```yarn
yarn add react-native-apple-core
```

# Usage (1)  version >= 1.0.30

### Apple Sign in

```javascript
import { Text } from 'react-native'
import { AppleSignIn }  from 'react-native-apple-core'
// dom
<AppleSignIn
  ref={ ref => this.signinRef = ref}
  initialConfig={{
    redirect_uri: "https://www.example.app/apple-callback",
    client_id: "web.app.exampleapp",
    state: "xxkxkxkkxkxxkxk", // for compare response data
  }}
  onSuccess={ (result) => console.log('onSuccess', result) }
>
  <Text>Continue with Apple</Text>
</AppleSignIn>
```

#### Example
```jsx
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { AppleSignIn }  from 'react-native-apple-core'
class Sample extends Component {

  handleSuccess = (result) => {
    console.log('handleSuccess', result)
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppleSignIn
          ref={ ref => this.signinRef = ref}
          initialConfig={{
            redirect_uri: "https://www.example.app/apple-callback",
            client_id: "web.app.exampleapp",
            state: "xxkxkxkkxkxxkxk", // for compare response data
          }}
          onSuccess={ this.handleSuccess }
        >
          <Text>Continue with Apple</Text>
        </AppleSignIn>
      </View>
    )
  }
}

export default Sample
```


# Usage (2) version <= 1.0.30

### Apple Sign in

```javascript
import { AppleSignIn }  from 'react-native-apple-core'

// open popup
this.signinRef.openSignIn()

// dom
<AppleSignIn
  ref={ ref => this.signinRef = ref}
  initialConfig={{
    redirect_uri: "https://www.example.app/apple-callback",
    client_id: "web.app.exampleapp",
    state: "xxkxkxkkxkxxkxk", // for compare response data
  }}
  onSuccess={ (result) => console.log('onSuccess', result) }
/>
```

#### Example
```jsx
import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { AppleSignIn }  from 'react-native-apple-core'
class Sample extends Component {

  handleOpenSignIn = () => {
    this.signinRef.openSignIn()
  }

  handleSuccess = (result) => {
    console.log('handleSuccess', result)
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={this.handleOpenSignIn}>
          <Image
            style={{
              height: 40,
              width: 200,
              borderRadius: 5,
            }}
          source={{uri: "https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple/images/apple-id-sign-in-with_2x.png"}} />
        </TouchableOpacity>
        <AppleSignIn
          ref={ ref => this.signinRef = ref}
          initialConfig={{
            redirect_uri: "https://www.example.app/apple-callback",
            client_id: "web.app.exampleapp",
            state: "xxkxkxkkxkxxkxk", // for compare response data
          }}
          onSuccess={ this.handleSuccess }
        />
      </View>
    )
  }
}

export default Sample
```

# Method
| Method Name | Type        | Description        |
| ----------- | ------------------ |------------------ |
| onSuccess       | Function | response data from apple service after login success. |

response 
```json
{
  "code": "xxxxxx",
  "id_token": "xxxxxxx",
  "state": "xxkxkxkkxkxxkxk",
  "data": {
    // jwt data
    "aud": "xxxx",
    "auth_time": "xxxx",
    "email": "xxxx",
    "sub": "xxxx",
  }
}

```

# Props
initialConfig : Object
<br />
For configulation apple service api.
Read more: <a href="https://developer.apple.com/documentation/signinwithapplejs/incorporating_sign_in_with_apple_into_other_platforms">https://developer.apple.com/documentation/signinwithapplejs/incorporating_sign_in_with_apple_into_other_platforms</a>

| Key Name        | Type   | Description                  |
| --------------- | ------ |----------------------------  |
| redirect_uri    | String | https://example.com/callback |
| client_id       | String | web.app.exampleapp           |
| state           | String | Generate for compare callback|

# License
MIT

# Author

Made with ❤️ by [Thinnakrit](https://github.com/thinnakrit).
