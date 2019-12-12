import React, {Component, Fragment} from 'react'
import { View, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import PropTypes from 'prop-types'
// ---
import RBSheet from "react-native-raw-bottom-sheet"
import SignInWithAppleService from '../utils/SignInWithAppleService'

export default class AppleCore extends Component {

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
    this.signInContainerRef.onNavigationStateChange(webViewState)
  }

  handleCallBack(result) {
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
    const { onCallBack } = this.props
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
          this.setState({
            isStartCallService: false
          })
          onCallBack(getValue)
        }
      }
    }
  }

  render() {
    const { initialConfig: {
      redirect_uri,
      client_id,
      state,
    } } = this.props
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
            <View style={{flex: 1, height: screenHeight - 100}}>
              <WebView
                ref="webview"
                source={{ uri: getUri }}
                onNavigationStateChange={(webViewState) => this.handleNavigationStateChange(webViewState)}
                javaScriptEnabled = {true}
                domStorageEnabled = {true}
                startInLoadingState={false}
                style={{
                  flex: 1,
                  resizeMode: 'cover',
                  width: screenWidth,
                  height: screenHeight - 100,
                }}
              />
            </View>
          ) : (
            <Fragment />
          )}
        </RBSheet>
      </Fragment>
    )
  }
}

AppleCore.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  initialConfig: PropTypes.object.isRequired,
}
