## reactive-variables
Variables that can do stuff when setted or getted (observable variables). 

###Example:
JS:
```javascript
  var inputLength = new ReactiveVariable();

    inputLength.Bind(ReactiveVariable.AfterSet, function () {
        console.log(this.length);
    });

    ReactiveVariable.Initialize();
```
HTML:
```html
  <input data-reactive="true" data-reactive-target="inputLength" data-reactive-method="input"/>
  <script src="reactive-variables-core.js"></script>
  <script src="main.js"></script>
```
Result: when you start typing text and `oninput` event triggers, variable `window.inputLength` will be set to it value, and binded handler will be executed.
