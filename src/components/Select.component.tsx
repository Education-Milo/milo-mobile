import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { ChevronDown } from "lucide-react-native";
import TypographyComponent from "@components/Typography.component";
import { TouchableWithoutFeedback } from "react-native";
import { colors } from "@theme/colors";

export interface SelectOption<T extends string = string> {
	label: string;
	value: T;
}

interface SelectProps<T extends string = string> {
	options: SelectOption<T>[];
	value: T;
	onChange: (value: T) => void;
	placeholder?: string;
}

const Select = <T extends string>({
	options,
	value,
	onChange,
	placeholder,
}: SelectProps<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectedOption = options.find((o) => o.value === value);

	return (
		<>
			<Modal
				visible={isOpen}
				transparent
				animationType="none"
				onRequestClose={() => setIsOpen(false)}
			>
				<TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
					<View style={StyleSheet.absoluteFill} />
				</TouchableWithoutFeedback>
			</Modal>
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.trigger}
					onPress={() => setIsOpen((prev) => !prev)}
					activeOpacity={0.8}
				>
					<TypographyComponent variant="body">
						{selectedOption?.label ?? placeholder ?? "Sélectionner"}
					</TypographyComponent>
					<ChevronDown size={18} color={colors.text.secondary} />
				</TouchableOpacity>
				{isOpen && (
					<View style={styles.dropdown}>
						{options.map((option) => (
							<TouchableOpacity
								key={option.value}
								style={[
									styles.option,
									option.value === value && styles.optionSelected,
								]}
								onPress={() => {
									onChange(option.value);
									setIsOpen(false);
								}}
							>
								<TypographyComponent
									variant="body"
									color={
										option.value === value
											? colors.primary
											: colors.text.primary
									}
								>
									{option.label}
								</TypographyComponent>
							</TouchableOpacity>
						))}
					</View>
				)}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	trigger: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 12,
		borderWidth: 1,
		borderRadius: 8,
		backgroundColor: colors.background,
		borderColor: colors.border.light,
	},
	dropdown: {
		position: "absolute",
		top: 48,
		left: 0,
		right: 0,
		marginTop: 4,
		borderWidth: 1,
		borderColor: colors.border.light,
		borderRadius: 8,
		backgroundColor: colors.background,
		zIndex: 1000,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	option: {
		padding: 12,
	},
	optionSelected: {
		backgroundColor: colors.primary + "20",
	},
});

export default Select;
