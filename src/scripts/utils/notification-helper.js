const NotificationHelper = {
	sendNotification({ title, options }) {
		if (!this._checkAvailabelity()) {
			console.log('notification is not supported on this browser');
			return;
		}
 
		if (!this._checkPersmission()) {
			console.log('user did not yet granted permission');
			this._requestPermission();
			return;
		}
 
		this._showNotification({ title, options });
	},

	_checkAvailabelity() {
		return !!('Notification' in window);
	},

	_checkPersmission() {
		return Notification.permission === 'granted';
	},

	async _requestPermission() {
		const status = await Notification.requestPermission();

		if (status === 'denied') {
			console.log('notification denied');
		}

		if (status === 'default') {
			console.log('permission closed')
		}
	},

	async _showNotification({ title, options }) {
		const serviceWorkerRegistration = await navigator.serviceWorker.ready;
		serviceWorkerRegistration.showNotification(title, options);
	}
};

export default NotificationHelper;