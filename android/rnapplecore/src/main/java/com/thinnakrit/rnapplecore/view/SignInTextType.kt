package com.thinnakrit.rnapplecore.view

import androidx.annotation.StringRes
import com.thinnakrit.rnapplecore.R

internal enum class SignInTextType(@StringRes val text: Int) {
    SIGN_IN(R.string.sign_in_with_apple_button_signInWithApple),
    CONTINUE(R.string.sign_in_with_apple_button_continueWithApple)
}