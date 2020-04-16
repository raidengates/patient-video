var services = {};


services.controls = [];


services.setItem = function (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
};


services.getItem = function (key) {
    try {
        return JSON.parse(sessionStorage.getItem(key));
    } catch (e) {
    }
    return "";
};

//save to local storage
services.setItemLocal = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

//services.removeItem = function (key) {
//    localStorage.removeItem(key);
//}


services.getItemLocal = function (key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
    }
    return "";
};


services.findControl = function (identifier) {
    for (var i = 0; i < services.controls.length; i++) {
        var item = services.controls[i];
        if (item.route == identifier || item.typeName == identifier)
            return item;
    }

    return null;
};


services.registerPage = function (route, typeName, init) {
    var item = services.registerControl(typeName, init);
    item.route = route;
    item.controlType = "page";

    return item;
};


services.registerControl = function (typeName, init) {

    var item = services.findControl(typeName);
    if (item != null) {
        item.typeName = typeName;
        item.init = init;
    }
    else {
        item = { typeName: typeName, init: init };
        services.controls.push(item);
    }

    item.controlType = "control";

    return item;

};


services.registerTemplate = function (typeName, html) {

    var item = services.findControl(typeName);
    if (item != null) {
        item.typeName = typeName;
        item.html = html;
    }
    else {
        item = { typeName: typeName, html: html };
        services.controls.push(item);
    }

    return item;

};


services.createControl = function (identifier) {

    function processChildElement(control, element) {
        var identifier = getAttributeValue(element, "control");
        if (identifier) {
            var child_control = services.createControl(identifier);
            if (child_control) {
                element.replaceWith(child_control);

                var id = getAttributeValue(element, "id");
                if (id) {
                    control[id] = child_control;
                }
            }
        }
        else {
            var length = element.childNodes.length;
            for (var i = 0; i < length; i++) {
                var child_element = element.childNodes[i];

                var id = getAttributeValue(child_element, "id");
                if (id) {
                    control[id] = child_element;
                }

                processChildElement(control, child_element);
            }
        }
    }

    var item = services.findControl(identifier);
    if (item) {
        var element = document.createElement('div');
        element.innerHTML = item.html;
        var control = element.firstChild;

        var length = control.childNodes.length;
        for (var i = 0; i < length; i++) {
            var child = control.childNodes[i];
            processChildElement(control, child);
        }

        if (item.init) {
            item.init.call(control, control);
        }
        formatImageToSvg(control);
        return control;
    }

    return null;

};







