export const getTextColor = (number) => {
	if (number > 0) {
		return "green";
	} else if (number === 0) {
		return "grey";
	}
	return "red";
};
