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
  <input oninput="inputLength.Data = this.value"/>
  <script src="reactive-variables-core.js"></script>
  <script src="main.js"></script>
```
Result: when you start typing text and `oninput` event triggers, `inputLength.Data` will be set to it value, and binded handler will be executed.
