
function elements_init() {

    elements = elements.concat(services.getItemLocal("ElementsArray") || []);

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element.type == "html") {
            services.registerTemplate(element.name, element.content);
        }

        if (element.type == "js") {
            var script = "var file = { name:'" + element.name + "', path:'" + element.path + "' }; ";
            eval(script + element.content);
        }
    }
}
elements_init();