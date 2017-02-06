(function() {
	'use strict';

	angular
		.module('app.follow')
		.controller('FollowController', FollowController);

		FollowController.$inject = ['$state', '$scope'];
		function FollowController($state, $scope) {
			var vm = this;

			vm.getEvents = function() {

			}

			vm.gotoDetail = function() {
				// var event_id = vm.events[$index]._id;
				// $state.go('app.explore-events-detail', {id: event_id});
				$state.go('app.follow-event-detail', {id: 1});
			}
		}
})();