UI.registerHelper('guestFullName', function() {
	return this.firstName + ' ' + this.lastName;
});

function addLeadingZero(num) {
	return (num.toString().length === 1 ? '0' : '') + num;
}

UI.registerHelper('formatDateTime', function(date) {
	date = new Date(date);
	var month = date.getMonth() + 1,
		day = date.getDate(),
		year = date.getFullYear();
	return addLeadingZero(month) + '/' + addLeadingZero(day) + '/' + year;
});

UI.registerHelper('dateToDateInputString', function(date) {
	if(date)
		return date.getFullYear() + '-' + addLeadingZero(date.getMonth() + 1) + '-' + addLeadingZero(date.getDate());
	else
		return '';
});

UI.registerHelper('fitString', function(string, maxSymbols) {
	return string.length > maxSymbols ? string.substr(0, maxSymbols - 3) + '...' : string;
});

UI.registerHelper('highlightNavigation', function(route) {
	return Router.current().route.getName() === route ? 'active' : '';
});
