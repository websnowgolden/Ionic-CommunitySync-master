(function() {
	'use strict';

	angular
		.module('app.eventmap')
		.controller('EventMapCtrl', EventMapCtrl);

		EventMapCtrl.$inject = [
			'$state', 
			'$ionicActionSheet',
			'getEvents',
			'$ionicPopover',
			'$scope'
		];
		
		function EventMapCtrl($state, $ionicActionSheet, getEvents, $ionicPopover, $scope) {

			var vm = this;
			var currWindow = null;
			var infoWindow = [];

			// Data for the markers consisting of a name, a LatLng and a zIndex for the
			// order in which these markers should display on top of each other.
			
			var event_places = getEvents;

			vm.map = function() {

		        var map = new google.maps.Map(document.getElementById('map'), {
		        	center: {lat: -34.397, lng: 150.644},
		        	zoom: 6
		        });

		        var infoWindow = new google.maps.InfoWindow({map: map});

		        // try to get current position using html5 navigator...
		        if (navigator.geolocation) {
		        	navigator.geolocation.getCurrentPosition(function(position) {
			            var pos = {
			            	lat: position.coords.latitude,
			            	lng: position.coords.longitude
			            };

			          	// infoWindow.setPosition(pos);
			          	// infoWindow.setContent('Location found.');
			        	map.setCenter(pos);

			        	var marker = new google.maps.Marker({
					        position: pos,
					        map: map
					    });

						
			        }, function() {
			          	handleLocationError(true, infoWindow, map.getCenter());
		        	});
		        } else {
		        	// Browser doesn't support Geolocation
		        	handleLocationError(false, infoWindow, map.getCenter());
		        }
	    	}

	    	// callback for getting current location using navigator...
	    	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		        infoWindow.setPosition(pos);
		        infoWindow.setContent(browserHasGeolocation ?
		                            'Error: The Geolocation service failed.' :
		                            'Error: Your browser doesn\'t support geolocation.');
	    	}

	    	// initialize map object...
			vm.initMap = function() {
			  	var map = new google.maps.Map(document.getElementById('map'), {
				    zoom: 10,
				    center: {lat: -33.9, lng: 151.2}
			  	});

			  	google.maps.event.addListener(map, "click", function(event) {
				    for (var i = 0; i < infoWindow.length; i++ ) {  //I assume you have your infoboxes in some array
				         infoWindow[i].close();
				    }
				});

			  	setMarkers(map); // Add markers to maps
			}
			
			// Close other info windows
			function closeAllInfoWindows(inforWindows){
				for (var i = 0; i < inforWindows.length; i++ ) {
					 inforWindows[i].close();
				}				
			}
			

			// Add markers to map...
			function setMarkers(map) {
			  
			  	// Shapes define the clickable region of the icon. The type defines an HTML
			  	// <area> element 'poly' which traces out a polygon as a series of X,Y points.
			  	// The final coordinate closes the poly by connecting to the first coordinate.
			  	var shape = {
			    	coords: [1, 1, 1, 20, 18, 20, 18, 1],
			    	type: 'poly'
			  	};

			  	for (var i = 0; i < event_places.length; i++) {
				    var place = event_places[i];
				    console.log(place);
				    var marker = new google.maps.Marker({
				      	position: {lat: place.lat, lng: place.long},
				      	map: map,
				      	animation: google.maps.Animation.DROP,
				      	// icon: image,
				      	shape: shape,
				      	title: place.city,
				      	zIndex: place.zIndex,
						customID: 'id'+i
				    });
					google.maps.event.addListener(marker, 'click', function() {
						var mkrObj = {
							place: this.title,
							phone: '+04265656',
							date: 'Sept 11',
							id: this.customID
						}
						$scope.showMarkerDetails(mkrObj);
					});
						
				    var contentString = '<div class="event-infowindow row" style=""><div class="col">' + 
				    '<img style="width: 60px; height: 60px" src="img/ionic.png"/></div>' + 
				    '<div class="col"><h3>Title of Event</h3></div></div>';

				    infoWindow[i] = new google.maps.InfoWindow({
		                content: contentString,
		                position: new google.maps.LatLng(0, 0),
		                pixelOffset: new google.maps.Size(0, 0)
		            });

				    // infoWindow[i].setPosition(100, 100);

				    // Add event listener to marker, so we can open info window when user clicks the marker...
		            google.maps.event.addListener(marker, 'click', (function(marker, i) {
		            	var latLng = marker.getPosition();
		            	map.setCenter(latLng);
		                return function() {
							closeAllInfoWindows(infoWindow); // close all other info windows
		                    // infoWindow[i].open(map, marker);
		                }
		            })(marker, i));
			  	}
			}

			// .fromTemplateUrl() method
		  	$ionicPopover.fromTemplateUrl('map-detail.html', {
			    scope: $scope,
			    // animation: 'slide-in-up'
		  	}).then(function(popover) {
		  	  	$scope.popover = popover;
		  	  	$scope.popover.detail = {};
		  	});


		  	$scope.showMarkerDetails = function(item) {
		  		console.log("---->Evnet detail info ...", item);
		  		$scope.popover.detail = item;
		    	$scope.popover.show();
		  	};

		  	$scope.closePopover = function() {
		    	$scope.popover.hide();
		  	};

		  	$scope.gotoDetail = function() {
		  		$scope.popover.hide();
		  		$state.go('app.explore-event-detail', {id: 1});
		  	}
		  
		  	//Cleanup the popover when we're done with it!
		  	$scope.$on('$destroy', function() {
		    	$scope.popover.remove();
		  	});
		  	
		  	// Execute action on hidden popover
		  	$scope.$on('popover.hidden', function() {
		    	// Execute action
		  	});
		  	// Execute action on remove popover
		  	$scope.$on('popover.removed', function() {
		    // Execute action
		  	});
		}
})();