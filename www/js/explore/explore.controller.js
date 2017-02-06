(function() {
	'use strict';

	angular
		.module('app.explore')
		.controller('ExploreController', ExploreController);
		
		ExploreController.$inject = ['$state', '$scope'];
		function ExploreController ($state, $scope) {
			var vm = this;
			vm.events = [];

			vm.getEvents = function() {

			}

			vm.gotoDetail = function() {
				// $e.preventDefault();
				console.log("--->hahah");
				// var event_id = vm.events[$index]._id;
				// $state.go('app.explore-events-detail', {id: event_id});
				$state.go('app.explore-event-detail', {id: 1});
			}
		}
})();