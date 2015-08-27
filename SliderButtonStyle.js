"use strict";

var React = require("react-native");

var
{
	StyleSheet,
	PixelRatio
} = React;

module.exports = StyleSheet.create
({
	text:
	{
		fontSize: 18
	},
	slider:
	{
		flex: 1,
		marginLeft: 26,
		marginRight: 26
	},
	sliderBorder:
	{
		borderWidth: 2,
		borderRadius: PixelRatio.getPixelSizeForLayoutSize(10),
	}
});