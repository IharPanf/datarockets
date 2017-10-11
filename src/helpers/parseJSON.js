function SourceFile() {}

SourceFile.prototype.loadFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        var oRequest = new XMLHttpRequest();

        oRequest.onload = function () {
            if (this.status == 200) {
                resolve(JSON.parse(this.response));
            } else {
                reject({});
            }
        };
        oRequest.open("get", fileName, true);
        oRequest.send();
    });
};

SourceFile.prototype.getElementFromJSON = function (object) {
    var parentElem = document.querySelector('#skills-tree');
    this.getProperty(object, parentElem);
};

SourceFile.prototype.getProperty = function (objJSON, parentElem) {
    var self = this;
    
    for (var prop in objJSON) {
        if (objJSON.hasOwnProperty(prop)) {
            if (typeof objJSON[prop] === 'object') {
                var elemUl = document.createElement('ul');
                var newParentElem = elemUl;
                if (elemLi) {
                    elemLi.appendChild(elemUl);
                }

                var listOfProperty = objJSON[prop];
                listOfProperty.forEach(function (item) {
                    self.getProperty(item, newParentElem);
                });
            } else {
                var elemLi = document.createElement('li');
                elemLi.innerHTML = objJSON[prop];
                parentElem.appendChild(elemLi);
            }
        }
    }
};
