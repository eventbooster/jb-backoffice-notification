# Description

An angular directive that displays notifications. 

#Usage

1. Include ```jb-backoffice-notification.js``` file in your scripts.
1. Add directive to DOM: 
  ```html
	<div data-notification></div>
  ```
1. Throw a notification in your angular code: 
  ```javascript
	$rootScope.$broadcast( 'notification', {
	  type              : 'error' 
	  , message         : 'web.backoffice.detail.saveError' // translation key
	  , variables       : {
          description   : 'Entity not found'
	  }
	} );
  ```
