angular
	.module('app.eventmap')
	.factory('EventMapService', EventMapService);

	EventMapService.$inject = ['$http'];
	function EventMapService($http) {
		return {
			getEvents: getEvents
		};

		function getEvents(params) {
			return $http({
				url: 'server/event-places.json?follow=' + params,
				method: 'GET'
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