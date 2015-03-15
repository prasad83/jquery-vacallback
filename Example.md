## Usage 1 ##
```
function callbackWithVARGS() {
    var more_args = $.va_callback_args(arguments);
    console.log(more_args);
}
setTimeout($.va_callback(callbackWithVARGS, 'more_arg1', 'more_arg2'), 500);
```

## Usage 2 ##
```
function MyClass() {}
MyClass.prototype.methodName = function() {
     var more_args = $.va_callback_args(arguments);
     console.log(more_args[0]);
}

var myObject = new MyClass();
$.get('remotepage.html', $.va_callback(myObject, 'methodName', 'moreParameters'));
```