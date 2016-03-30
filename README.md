# reactive-variables
Variables that can do stuff when setted or getted (observable variables). 

## Example:
JS:
### HTML&JS
```javascript
    var inputLength = new ReactiveVariable();

    inputLength.Bind(ReactiveVariable.AfterSet, function () {
        console.log(this.length);
    });
```
HTML:
```html
  <input oninput="inputLength.Data = this.value"/>
  <script src="reactive-variables-core.js"></script>
  <script src="main.js"></script>
```
Result: when you start typing text and `oninput` event triggers, `inputLength.Data` will be set to it value, and binded handler will be executed.
### Node.JS
```javascript
    var ReaciveVariable = reqiure('reactive-variables');
    var foo = new ReactiveVariable();
    
    foo.Bind(ReactiveVariable.AfterSet, function () {
        console.log(this);
    });

    foo.Data = 1;
    foo.Data = 'str';
    foo.Data = {'bar': false};
```
Result: 
Output in console:
```javascript
Number {[[PrimitiveValue]]: 1}
String {0: "s", 1: "t", 2: "r", length: 3, [[PrimitiveValue]]: "str"}
Object {'bar': false}
```
