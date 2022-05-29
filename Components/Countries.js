import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	TextInput,
	Button,
	Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Country from "./Country";

export default function Countries() {
	const [countries, setCountries] = useState([]);
	const [searched, setSearched] = useState([]);

	useEffect(() => {
		fetch("https://restcountries.com/v3.1/all")
			.then((res) => res.json())
			.then((data) => {
				setCountries(data);
				setSearched(data);
			});
	}, []);

	const handleSearch = (text) => {
		const filter = countries.filter((country) =>
			country.name.common.toLowerCase().includes(text.toLowerCase())
		);
		setSearched(filter);
	};

	return (
		<View>
			<Text style={styles.header}>Total Countries: {searched.length}</Text>
			<View style={styles.inputField}>
				<TextInput
					style={styles.input}
					onChangeText={handleSearch}
					placeholder="Search Your Country"
				/>
				<Button
					title="Search"
					onPress={() => Alert.alert("Simple Button pressed")}
				/>
			</View>
			<ScrollView>
				{searched.map((country) => (
					<Country country={country} key={Math.random()}></Country>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		marginTop: 50,
		marginBottom: 20,
		textDecorationLine: "underline",
		fontSize: 28,
		color: "red",
		textAlign: "center",
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	inputField: {
		marginBottom: 20,
	},
});
