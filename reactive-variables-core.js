ReactiveVariable = (function () {
    function ReactiveVariable(data) {
        this._data = data;
        this._beforeSet = [];
        this._beforeGet = [];
        this._afterSet = [];
    }

    ReactiveVariable.BeforeGet = "bS";
    ReactiveVariable.BeforeSet = "bG";
    ReactiveVariable.AfterSet = "aS";

    ReactiveVariable.Initialize = function () {
        //Stub
    };

    ReactiveVariable.prototype = {
        Bind: function (type, handler) {
            if (!(handler instanceof Function)) {
                throw new Error("[ReactiveVariable] Handler is not a function");
            }

            var handlerWrapper = {
                handler: handler,
                id: Math.random(),
                call: function (self) {
                    handler.call(self);
                }
            };
            switch (type) {
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
                    throw new Error("[ReactiveVariable] Unknown event type");
            }
            return handlerWrapper.id;
        },
        Unbind: function (type, id) {
            var comp = function (element) {
                return element.id != id;
            };

            switch (type) {
                case ReactiveVariable.BeforeGet:
                    this._beforeGet = this._beforeGet.filter(comp);
                    break;
                case ReactiveVariable.BeforeSet:
                    this._beforeSet = this._beforeSet.filter(comp);
                    break;
                case ReactiveVariable.AfterSet:
                    this._afterSet = this._afterSet.filter(comp);
                    break;
                default:
                    throw new Error("[ReactiveVariable] Unknown event type");
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

    return ReactiveVariable;
})();

if (typeof(module) != "undefined"){
    module.exports = ReactiveVariable;
}
