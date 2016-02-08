function ReactiveVariable(data) {
  this._data = data;
  this._beforeSet = [];
  this._beforeGet = [];
  this._afterSet = [];
}

ReactiveVariable.BeforeGet = "bS";
ReactiveVariable.BeforeGet = "bG";
ReactiveVariable.AfterSet = "aS";

ReactiveVariable.Initialize = function() {
    var scopedDOM = document.querySelectorAll('*[data-reactive="true"]');

    var length = scopedDOM.length;
    for (var i = 0; i < length; i++) {
      var variableName = scopedDOM[i].dataset["reactiveTarget"];

      if (!window[variableName])
        window[variableName] = new ReactiveVariable(null);
      else if (!(window[variableName] instanceof ReactiveVariable))
        throw new Error("Target must be ReactiveVariable");

      scopedDOM[i].onchange = function () {
        window[variableName].Data = this.value;
      };
    }
};

ReactiveVariable.prototype = {
    Bind: function (type, handler) {
        var handlerWrapper = {
            handler: handler,
            id: Math.random(),
            call: function (self) {
                handler.call(self);
            }
        };
        switch  (type)
        {
            case ReactiveVariable.BeforeGet:
                this._beforeGet.push(handlerWrapper);
                break;
            case ReactiveVariable.BeforeSet:
                this._beforeSet.push(handlerWrapper);
                break;
            case ReactiveVariable.AfterSet:
                this._afterSet.push(handlerWrapper);
                break;
            default:
                return null;
        }
        return handlerWrapper.id;
    },
    Unbind: function (type, id) {
        var comp = function (element) {
            return element.id != id;
        };

        switch (type) {
            case ReactiveVariable.BeforeGet:
                this._beforeGet = result._beforeGet.filter(comp);
                break;
            case ReactiveVariable.BeforeSet:
                this._beforeSet = result._beforeSet.filter(comp);
                break;
            case ReactiveVariable.AfterSet:
                this._afterSet = result._afterSet.filter(comp);
                break;
            default:
                break
        }
    },
    get Data() {
        var _self = this;
        this._beforeGet.forEach(function (func) {
            func.call(_self._data);
        });
        return this._data;
    },
    set Data(value) {
        var _self = this;
        this._beforeSet.forEach(function (func) {
            func.call(_self._data);
        });

        this._data = value;

        this._afterSet.forEach(function (func) {
            func.call(_self._data);
        });

        return value;
    }
};
