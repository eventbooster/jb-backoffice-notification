angular
.module( 'jb.backofficeNotification', [] )
.directive('notification', [ 'NotificationService', function ( NotificationService ) {

	return {
		, scope				: {}
		, replace			: true
		, templateUrl		: 'notificationTemplate.html'
		, controller		: function ($scope) {

			$scope.notifications = NotificationService.notifications;

			$scope.hideNotification = function( notification ) {
				NotificationService.removeNotification( notification );
			};
		
		}
	};


} ] )
.service('NotificationService', [ '$rootScope', '$timeout', function ( $rootScope, $timeout ) {

	this.notifications = [];

	$rootScope.$on( 'notification', function ( event, notification ) {

		notification.typeClass = 'notification-' + notification.type;

		// Needs unique id for ng-repeat!
		notification.id = new Date().getTime() + Math.floor( Math.random() * 100000 );

		// Remove notification from this.notifications after 6 sec.
		$timeout( function() {
			this.notifications.splice( this.notifications.indexOf( notification ), 1 );
		}.bind( this ), 6000 );

		this.notifications.push( notification );

	}.bind(this));


	this.removeNotification = function( notification ) {
		this.notifications.splice( this.notifications.indexOf( notification ), 1 );
	};


} ] )

.run( function( $templateCache ) {

	$templateCache.put( 'notificationTemplate.html',
		'<ul>' +
			'<li ng-repeat=\'notification in notifications\' ng-class=\'notification.typeClass\' class=\'notification\' data-ng-click=\'hideNotification( notification )\'>' +
				'{{ notification.message | translate : notification.variables }}' +
			'</li>' +
		'</ul>'
	);

} );