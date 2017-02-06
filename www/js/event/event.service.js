angular
	.module('app.event')
	.factory('EventService', EventService);

	EventService.$inject = ['$http'];

	function EventService($http) {
		return {
			getEvents: getEvents,
			getEventForMap: getEventForMap,
			getEventDetail: getEventDetail
		}

		function getEvents(params) {
			return $http({
				url: "https://api.com",
				method: 'POST',
				data: {
					params: params
				}
			})
			.then(getDataSuccess)
			.catch(getDataFailed);

			function getDataSuccess(response) {
				return response.data;
			}
			function getDataFailed(error) {
				return error.data;
			}
		}

		function getEventDetail(params) {
			return $http({
				url: "https://api.com",
				method: 'POST',
				data: {
					params: params
				}
			})
			.then(getDataSuccess)
			.catch(getDataFailed);

			function getDataSuccess(response) {
				return response.data;
			}
			function getDataFailed(error) {
				return error.data;
			}
		}

		function getEventForMap(params) {
			return $http({
				url: "https://api.com",
				method: 'POST',
				data: {
					params: params
				}
			})
			.then(getDataSuccess)
			.catch(getDataFailed);

			function getDataSuccess(response) {
				return response.data;
			}
			function getDataFailed(error) {
				return error.data;
			}
		}
	}