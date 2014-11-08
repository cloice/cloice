UI.registerHelper('guestFullName', function() {
	return this.firstName + ' ' + this.lastName;
});

function addLeadingZero(num) {
	return (num.toString().length === 1 ? '0' : '') + num;
}

UI.registerHelper('formatDateTime', function(date) {
	var month = date.getMonth(),
		day = date.getDay(),
		year = date.getFullYear();
	return addLeadingZero(month) + '/' + addLeadingZero(day) + '/' + year;
});

UI.registerHelper('dateToDateInputString', function(date) {
	return date.getFullYear() + '-' + addLeadingZero(date.getMonth()) + '-' + addLeadingZero(date.getDate());
});