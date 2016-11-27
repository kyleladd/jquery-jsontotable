
(function($) {
  $.jsontotable = function(data, options) {
    // Underscorejs
    var isArray = Array.isArray || function(obj) {
      return Object.prototype.call(obj) === '[object Array]';
    };
    var isObject = function(obj) {
      var type = typeof obj;
      // UnderscoreJS
      // return type === 'function' || type === 'object' && !!obj;
      return type === 'object';
    };

    // https://gist.github.com/penguinboy/762197
    var flattenObject = function(ob) {
      var toReturn = {};
      
      for (var i in ob) {
        if (!ob.hasOwnProperty(i)) {
          continue;
        }
        //Make sure it is not a list, json to table will handle lists
          if (isObject(ob[i]) && ob[i] !== null && !isArray(ob[i])) {
          var flatObject = flattenObject(ob[i]);
          for (var x in flatObject) {
            if (!flatObject.hasOwnProperty(x)) {
              continue;
            }
            toReturn[i + '.' + x] = flatObject[x];
          }
        } 
        else {
          toReturn[i] = ob[i];
        }
      }
      return toReturn;
    };
      // from http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
      var clone = function (obj) {
        if(obj == null || !isObject(obj)) {
          return obj;
        }

        var temp = obj.constructor(); // changed
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                temp[key] = clone(obj[key]);
            }
        }
        return temp;
      };
      var createRow = function(rowData, isHeader){
        var rowTag = isHeader ? "th" : "td";
        var key,cellObj,cell;
        var row = "<tr>";
        if(isObject(rowData)){
          for (key in rowData) {
            if (typeof rowData[key] !== 'function') {
              cellObj = rowData[key];

              if (typeof cellObj !== "function") { /* ADDED: this wrapper to account for people bootstrapping the ECMA Array model otherwise functions get converted to strings and show up in the object list / output */
                if((isArray(cellObj) || isObject(cellObj)) && options.nesting === true){
                      if(!isArray(cellObj)){
                        cellObj = [cellObj];
                      }
                  // Recursion for nested objects
                  cellObj = createJSONtable(cellObj);
                }
                cell = "<" + rowTag + ">" + cellObj + "</" + rowTag + ">";
                row += cell;
              }
            }
          }
        }
      else{
        cellObj = rowData;
        cell = "<" + rowTag + ">" + cellObj + "</" + rowTag + ">";
        row += cell;
      }
        row += "</tr>";
        return row;
      };
  var createJSONtable = function(data){
      var table = "";
      var obj = data;
      if(options.flatten === true){
        if (isObject(obj) && obj !== null && !isArray(obj)) {
          // Flatten object
          for(var index in obj){
            if (typeof obj[index] !== 'function') {
              obj[index] = flattenObject(obj[index]);
            }
          }
        }
      }
      if (options.id && obj.length) {

        var i;
        table = "<table class=\"" + (options.className !== null ? options.className : "") + "\">";

        var dictType = false, headerObj = {}, key = null;
        // if (options.header) {
         // && isObject(obj[0]) && obj[0] !== null && !isArray(obj[0])
        if (options.header && isObject(obj[0]) && obj[0] !== null && !isArray(obj[0])) {
          table += "<thead>";
          headerObj = obj[0]._data ? clone(obj[0]._data) : clone(obj[0]);
          if (isObject(headerObj)) { // data type is dictonary
            dictType = true;
            for (key in headerObj) { 
              if (typeof headerObj[key] !== 'function') {
                headerObj[key] = key;
              }
             }
          }

          table += createRow(headerObj, true);
          table += "</thead>";
        }

        /**
        /* MODIFIED: options.header ? 1 : 0
        /* to eliminate duplicating header as the first row of data 
        **/
        table += "<tbody>";
        for (i = ((obj[0]._data ||  !dictType) && options.header && isObject(obj[0]) ? 1 : 0); i < obj.length; i++) {
          if (dictType && headerObj && isObject(obj[0])) {
            var bodyItem = {};
            for (key in headerObj) {
              if (typeof headerObj[key] !== 'function') {
                bodyItem[key] = (obj[i] && obj[i][key] != null) ? obj[i][key] : "";
              }
            }
            table += createRow(bodyItem, false);
          }
          else {
            table += createRow(obj[i], false);
          }
        }
        table += "</tbody>";
        table += "</table>";
      }
      return table;
    };

    var settings = $.extend({
      id: null, // target element id
      header: true,
      className: null,
      flatten:false,
      nesting:false //requires flatten to be true
    }, options);

    options = $.extend(settings, options);
    if (typeof data === "string") {
      data = $.parseJSON(data);
    }
    if(!isArray(data)){
      data = [data];
    }
    var result = createJSONtable(data);
    $(options.id).append(result);

    return this;
  };
}(jQuery));