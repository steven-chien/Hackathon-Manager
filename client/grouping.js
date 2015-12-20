Template.qrScanner.rendered = function() {
	qrScanner.on('scan', function(err, message) {
		if (message != null) {
			return alert(message);
		}
	});
}

