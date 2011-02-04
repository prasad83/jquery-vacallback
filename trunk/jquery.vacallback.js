/*!
 * va_callback - jQuery Plugin
 *
 * Copyright 2011, Prasad.A
 * Licensed under the MIT
 */
;(function($) {
	/**
	 * Returns variable argument callback function that runs in the context of the object.
	 *
	 * Usage 1:
	 * function callbackWithVARGS() {
	 *     var more_args = $.va_callback_args(arguments);
	 *     console.log(more_args);
	 * }
	 * setTimeout($.va_callback(callbackWithVARGS, 'more_arg1', 'more_arg2'), 500);
	 *
	 * Usage 2:
	 *
	 * function MyClass() {}
	 * MyClass.prototype.methodName = function() {
	 *     var more_args = $.va_callback_args(arguments);
	 *     console.log(more_args[0]);
	 * }
	 *
	 * var myObject = new MyClass();
	 * $.get('remotepage.html', $.va_callback(myObject, 'methodName', 'moreParameters'));
	 *
	 */
	$.va_callback = function(/* va_args */) {
		var fnTarget = null, fnContext = null, fnArgs = null;
		
		// Adjust the variables
		if ($.isFunction(arguments[0])) {
			// (callback, arg1, arg2, arg3...)
			fnTarget = arguments[0];
			fnArgs   = $(arguments).splice(1);
		} else {
			// (object, callback_function_or_methodName, arg1, arg2, arg3, ...)
			fnContext = arguments[0] || {};
			fnTarget  = ($.isFunction(arguments[1]))? arguments[1] : fnContext[arguments[1]];
			fnArgs    = $(arguments).splice(2);
		}
		
		// Read more on closures here: jibbering.com/faq/notes/closures/
		return function() {
			var fnTargetArgs = [];
			// Prepare arguments for the function, put callback arguments at last.
			$(arguments).each(function(i,v){fnTargetArgs.push(v)});					
			fnTargetArgs.push(fnArgs);
			
			fnTarget.apply(fnContext, fnTargetArgs);
		};
	},
	// Retrieve the va_callback_args - last argument of the array sent.
	$.va_callback_args = function(args) {
		return args[args.length-1];
	}
})(jQuery);
