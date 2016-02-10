var ReactiveVariable = {
    BeforeGet: "bS",
    BeforeGet: "bG",
    AfterSet: "aS",
    New: function (data) {
        var result = {
            _beforeSet: [],
            _beforeGet: [],
            _afterSet: [],
            _data: data,
            Bind: function (type, handler) {
                var handlerWrapper = {
                    handler: handler,
                    id: Math.random(),
                    call: function () {
                        handler.call();
                    }
                };
                switch  (type)
                {
                    case ReactiveVariable.BeforeGet:
                        result._beforeGet.push(handlerWrapper);
                        break;
                    case ReactiveVariable.BeforeSet:
                        result._beforeSet.push(handlerWrapper);
                        break;
                    case ReactiveVariable.AfterSet:
                        result._afterSet.push(handlerWrapper);
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
                        result._beforeGet = result._beforeGet.filter(comp);
                        break;
                    case ReactiveVariable.BeforeSet:
                        result._beforeSet = result._beforeSet.filter(comp);
                        result._beforeSet.push(handlerWrapper);
                        break;
                    case ReactiveVariable.AfterSet:
                        result._afterSet = result._afterSet.filter(comp);
                        break;
                    default:
                        break
                }
            },
            get Data() {
                result._beforeGet.forEach(function (func) {
                    func.call();
                });
                return result._data;
            },
            set Data(value) {
                result._beforeSet.forEach(function (func) {
                    func.call();
                });

                result._data = value;

                result._afterSet.forEach(function (func) {
                    func.call();
                });
            }
        };
        return result;
    }
};
