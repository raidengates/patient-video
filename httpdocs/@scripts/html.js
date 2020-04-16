function getAttributeValue(element, name) {

    if (element.attributes != null) {
        var attr = element.attributes.getNamedItem(name);
        if (attr != null) {
            return attr.value;
        }
    }
    return null;
}