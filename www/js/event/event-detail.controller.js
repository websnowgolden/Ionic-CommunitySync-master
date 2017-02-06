(function() {
	'use strict';

	angular
		.module('app.event')
		.controller('EventDetailController', EventDetailController);

		EventDetailController.$inject = ['$state', '$scope', '$stateParams', 'EventService', '$ionicHistory', '$ionicPopover'];

		function EventDetailController($state, $scope, $stateParams, EventService, $ionicHistory, $ionicPopover) {
			var vm = this;

			vm.getDetailInfo = function() {
				var event_id = $state.params.id;
				console.log("--->Event Id is...", event_id);
			}

			vm.goBack = function() {
				$ionicHistory.goBack();
			}
		}
})();