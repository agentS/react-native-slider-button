# react-native-slider-button
Slider button inspired by the slide to unlock widget with an optional animation manipulating the text's transparency. Of course, both the animation duration and text can be customized too.

# NOT PRODUCTION READY YET
Be cautios, as this widget is not ready for usage yet. Expect it to be usable by the end of August 2015.

# Demo
//TODO: add animated GIF

# Add it to your project
Run `npm install --save react-native-slider-button`
'var SliderButton = require("react-native-slider-button");'

# Basic usage
    <SliderButton
		text={"Slide to start!"}
		textAnimated={true}
		minimumValue={0} maximumValue={100} value={0}
		minimumTrackTintColor={"rgba(0,0,0,0)"}
		maximumTrackTintColor={"rgba(0,0,0,0)"}
		onTrigger={this.onBurnOffStart}/>

# Using a custom style
I strongly recommend creating a separate file holding the style definitions overwriting the following three definitons:

`text` describes the appearance of the text centered in the slider and supports all options of React Native's `<Text>` component. For instance, you can change the text colour and the font size, as shown below:

	text:
	{
		fontSize: 18,
		color: "#FFFFFF"
	}

`slider` is responsible for customizing the slider. In the following example I am modifying the margin on the left and right side. Be cautios, that it is adviced to set `flex` to 1 too or to specify a custom width.

	slider:
	{
		flex: 1,
		marginLeft: 26,
		marginRight: 26
	}

The slider's border can be adapted using by creating a custom object named `sliderBorder`, as shown below.

	sliderBorder:
	{
		borderWidth: 2,
		borderRadius: 20,
		borderColor: "#FFFFFF"
	}

Please note that both `slider` as well as `sliderBorder` support all attributes of React Native's slider component. A complete example can be found in `examples/SliderButtonStyle.js`.

The custom style object can be applied to the component using the `stylesheet` property (see section [Properties](/Properties/)).

# Properties

`text` (string) – The text to be displayed within the slider.

`textAnimated` (boolean) – Should the text change it's opacity from 1 to 0.5 and vice versa. The animation is endlessly repeated.

`sliderCompletionValue` (number) – Value the thumb needs to be moved beyond in order to trigger the event associated with the slider. For instance, if your minimum value is 0, your maximum value is 100 and this value is set to 89 the user has to move the thumb beyond 89 per cent of the slider's length.

`onTrigger` (function) – Callback invoked when the user moves the thumb beyond the completion value. No further parameters are passed to the callback method.

`stylesheet` (object) – Custom style for the slider button, as described in the [custom style section](/Using a custom style/).

`minimumValue` (number) – The minimum allowed value (see [React Native's documentation](https://facebook.github.io/react-native/docs/sliderios.html)).

`maximumValue` (number) – The maximum allowed value (see [React Native's documentation](https://facebook.github.io/react-native/docs/sliderios.html)).

`value` (number) – The initial value (see [React Native's documentation](https://facebook.github.io/react-native/docs/sliderios.html)).

`minimumTrackTintColor` (string) – The track colour left to the thumb (see [React Native's documentation](https://facebook.github.io/react-native/docs/sliderios.html)).

`maximumTrackTintColor` (string) – The track colour right to the thumb (see [React Native's documentation](https://facebook.github.io/react-native/docs/sliderios.html)).

# License
This project is MIT licensed. If there is a specific demand I am willing to change the license.
