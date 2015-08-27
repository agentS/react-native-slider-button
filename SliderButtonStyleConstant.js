"use strict";

var React = require("react-native");

var
{
	StyleSheet
} = React;

module.exports = StyleSheet.create
({
	textWrapper:
	{
		position: "absolute",
		top: 0,
		left: 0,
		justifyContent: "center",
		alignItems: "center"
	},
	container:
	{
		position: "relative",
		flexDirection: "column"
	},
	slider:
	{
		opacity: 0.8,
		padding: 0
	}
});