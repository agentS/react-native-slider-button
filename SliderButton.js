"use strict";

var React = require("react-native");
var SliderButtonStyle = require("./SliderButtonStyle.js");
var SliderButtonStyleConstant = require("./SliderButtonStyleConstant.js");
	
var
{
	View,
	Text,
	Image,
	SliderIOS,
	Animated
} = React;

var Constants =
{
	ANIMATION_DURATION: 1000,
	ANIMATION_OPACITY_INITIAL: 0.5,
	ANIMATION_OPACITY_COMPLETED: 1,
	SLIDER_COMPLETION_VALUE: 89
};
Object.freeze(Constants);

var SliderButton = React.createClass(
{
	
	getInitialState: function()
	{
		return {
			textAlphaValue: new Animated.Value(Constants.ANIMATION_OPACITY_INITIAL),
			timestamp: Date.now(),
			containerWidth: 0,
			containerHeight: 0,
		};
	},
	propTypes: Object.create(SliderIOS.propTypes,
	{
		text:
		{
			enumerable: true,
			configurable: false,
			writable: false,
			value: React.PropTypes.string
		},
		stylesheet:
		{
			enumerable: true,
			configurable: false,
			writable: false,
			value: React.PropTypes.object
		}
	}),
	animationDuration: Constants.ANIMATION_DURATION,
	sliderCompletionValue: Constants.SLIDER_COMPLETION_VALUE,
	resetAfterAction: true,
	getDefaulProps: function()
	{
		return {
			resetAfterAction: true,
			textAnimated: true,
			animationDuration: Constants.ANIMATION_DURATION,
			sliderTriggerValue: Constants.SLIDER_COMPLETION_VALUE
		};
	},
	componentWillReceiveProps: function(newProperties)
	{
		if (newProperties.animationDuration !== undefined)
		{
			this.animationDuration = newProperties.animationDuration;
		}
		if (newProperties.sliderCompletionValue !== undefined)
		{
			this.sliderCompletionValue = newProperties.sliderCompletionValue;
		}
		if (newProperties.resetAfterAction !== undefined)
		{
			this.resetAfterAction = newProperties.resetAfterAction;
		}
	},
	componentWillMount: function()
	{
		if (this.props.animationDuration !== undefined)
		{
			this.animationDuration = this.props.animationDuration;
		}
		if (this.props.sliderCompletionValue !== undefined)
		{
			this.sliderCompletionValue = this.props.sliderCompletionValue;
		} 
		if (this.props.resetAfterAction !== undefined)
		{
			this.resetAfterAction = this.props.resetAfterAction;
		}
	},
	render: function()
	{
		var styles = Object.assign({}, SliderButtonStyle, this.props.stylesheet);
		
		var animatedTextContainer = null;
		
		if ((this.state.containerWidth > 0) && (this.state.containerHeight > 0))
		{
			animatedTextContainer = 
			(
				<View style={[SliderButtonStyleConstant.textWrapper, { width: this.state.containerWidth, height: this.state.containerHeight }]}>
					<Animated.Text
						style={[styles.text,
						{
							opacity: this.state.textAlphaValue 
						}
					]}>{this.props.text}</Animated.Text>
				</View>
			);
		}
		
		return (
			<View style={SliderButtonStyleConstant.container} ref={"vContainer"}>
				{animatedTextContainer}
				
				<SliderIOS key={this.state.timestamp}
					style={[styles.slider, styles.sliderBorder, SliderButtonStyleConstant.slider]}
					onSlidingComplete={(newValue) => this.onSliderValueChanged(newValue)}
					{...this.props}/>
			</View>
		);
	},
	componentDidMount: function()
	{
		// handle the animation
		if (this.props.textAnimated === true)
		{
			this.kickOffAnimation();
		}
		else
		{
			this.setState({ textAlphaValue: Constants.ANIMATION_OPACITY_COMPLETED });
		}
		
		// get the dimensions in order to correctly position the view – see https://github.com/facebook/react-native/issues/953 as well as https://stackoverflow.com/questions/29828971/react-native-measure-a-view
		requestAnimationFrame(this.measureContainerView.bind(this));
	},
	kickOffAnimation: function()
	{
		Animated.sequence(
		[
			Animated.timing(
				this.state.textAlphaValue,
				{
					toValue: Constants.ANIMATION_OPACITY_COMPLETED,
					duration: this.animationDuration
				}
			),
			Animated.timing(
				this.state.textAlphaValue,
				{
					toValue: Constants.ANIMATION_OPACITY_INITIAL,
					duration: this.animationDuration
				}
			)
		]).start((callbackObject) =>
		{
			if (callbackObject.finished === true)
			{
				this.kickOffAnimation();
			}
		});
	},
	measureContainerView: function()
	{
		this.refs.vContainer.measure(this.containerViewMeasured);
	},
	containerViewMeasured: function(offsetX, offsetY, width, height, pageX, pageY)
	{
		this.setState
		({
			containerWidth: width,
			containerHeight: height
		});
	},
	
	onSliderValueChanged: function(newValue)
	{
		if ((arguments[0] !== undefined) && (arguments[0] !== null))
		{
			if (newValue > this.sliderCompletionValue)
			{
				if ((this.props.onTrigger !== undefined) && (this.props.onTrigger !== null))
				{
					if (typeof this.props.onTrigger === "function")
					{
						this.props.onTrigger();
					}
				}
				
				// check if the user wishes to reset the slider automatically
				if (this.resetAfterAction === true)
				{
					this.setState({ timestamp: Date.now() });
				}
			}
			else
			{
				this.setState({ timestamp: Date.now() });
			}
		}
	}
});

module.exports = SliderButton;