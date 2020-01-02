import React, {Component, Fragment} from 'react'
import { View, Dimensions, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'
// ---
import RBSheet from "react-native-raw-bottom-sheet"
import SignInWithAppleService from '../utils/SignInWithAppleService'

export default class AppleSignIn extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isStartCallService: false,
      response_type: "id_token code",
      response_mode: "fragment",
    }

    this.onSignIn = this.onSignIn.bind(this);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    this.openSignIn = this.openSignIn.bind(this);
    this.handleNavigationStateChange = this.handleNavigationStateChange.bind(this);
    this.handleCallBack = this.handleCallBack.bind(this);
  }

  openSignIn(){
    this.onSignIn()
    this.actionSheetRef.open()
  }

  handleNavigationStateChange(webViewState){
    this.onNavigationStateChange(webViewState)
  }

  handleCallBack = (result) => {
    const { onSuccess } = this.props
    onSuccess(result)
    this.setState({
      isStartCallService: false
    })
    this.actionSheetRef.close()
  }

  onSignIn() {
    this.setState({
      isStartCallService: true
    })
  }

  onNavigationStateChange = (webViewState) => {
    const appleUri = "https://appleid.apple.com"
    const getParam = webViewState.url.split("/auth/")
    if (getParam[0] !== appleUri) {
      const getQuery = webViewState.url.split("#")
      if (getQuery.length > 0) {
        const getData = getQuery[1].split("&")
        const getValue = getData.reduce((prev, curr) => {
          const value = curr.split("=")
          if (value[1]) {
            prev[value[0]] = value[1]
          }
          return prev
        }, {})
        if (getValue) {
          const result = getValue && getValue.id_token ? jwtDecode(getValue.id_token) : {}
          this.handleCallBack({
            ...getValue,
            data: result
          })
        }
      }
    }
  }

  render() {
    const { initialConfig: {
      redirect_uri,
      client_id,
      state,
    }, children } = this.props
    const screenWidth = Math.round(Dimensions.get('window').width)
    const screenHeight = Math.round(Dimensions.get('window').height)
    const {
      isStartCallService,
      response_type,
      response_mode,
    } = this.state

    const getUri = SignInWithAppleService.create({
      response_type: response_type,
      response_mode: response_mode,
      client_id: client_id,
      redirect_uri: redirect_uri,
      state: state
    })

    return (
      <Fragment>
        <RBSheet
          ref={ref => {
            this.actionSheetRef = ref;
          }}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={screenHeight - 100}
          duration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          {isStartCallService ? (
            <View style={{flex: 1, height: screenHeight - 100, position: 'relative', zIndex: 99}}>
              <WebView
                ref="webview"
                source={{ uri: getUri }}
                onNavigationStateChange={(webViewState) => this.handleNavigationStateChange(webViewState)}
                javaScriptEnabled = {true}
                domStorageEnabled = {true}
                startInLoadingState={true}
                androidHardwareAccelerationDisabled={true}
                scalesPageToFit={true}
                saveFormDataDisabled={true}
                style={{
                  flex: 1,
                  resizeMode: 'cover',
                  width: screenWidth,
                  height: screenHeight - 100,
                  position: 'relative',
                  zIndex: 99
                }}
              />
            </View>
          ) : (
            <Fragment />
          )}
        </RBSheet>
        {children && <TouchableOpacity style={{width: '100%'}} onPress={() => this.openSignIn()}>{children}</TouchableOpacity>}
      </Fragment>
    )
  }
}

AppleSignIn.propTypes = {
  onSuccess: PropTypes.func,
  initialConfig: PropTypes.object.isRequired,
  children: PropTypes.node,
}
