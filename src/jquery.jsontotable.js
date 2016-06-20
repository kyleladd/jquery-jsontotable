// var flatten = require('flat');
(function($) {
  $.jsontotable = function(data, options) {
    ///////////Start Declaring Functions
    // Underscorejs
    var isArray = Array.isArray || function(obj) {
      return Object.prototype.call(obj) === '[object Array]';
    };

    // https://gist.github.com/penguinboy/762197
    var flattenObject = function(ob) {
      var toReturn = {};
      
      for (var i in ob) {
        if (!ob.hasOwnProperty(i)) {
          continue;
        }
        //Make sure it is not a list, json to table will handle lists
          if ((typeof ob[i]) === 'object' && ob[i] !== null && !isArray(ob[i])) {
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
        if(obj == null || typeof(obj) !== "object") {
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
        var frameTag = isHeader ? "thead" : "tbody";
        var rowTag = isHeader ? "th" : "td";
        var rowi,key,cellObj,cell,j;
        var row = "<tr>";

        for (key in rowData) {
          cellObj = rowData[key];

          if (typeof cellObj !== "function") { /* ADDED: this wrapper to account for people bootstrapping the ECMA Array model otherwise functions get converted to strings and show up in the object list / output */
            if(isArray(cellObj)){
              cellObj = createJSONtable(cellObj);
            }
            cell = "<" + rowTag + ">" + cellObj + "</" + rowTag + ">";
            row += cell;
          }
        }
        row += "</tr>";
        return row;
      }
  var createJSONtable = function(data){
      var table = "";
      var obj = data;
      // if (typeof obj === "string") {
      //   obj = $.parseJSON(obj);
      // }
      // if(!isArray(obj)){
      //   obj = [obj];
      // }
      // Flatten
      for(var index in obj){
        obj[index] = flattenObject(obj[index]);
      }
      // console.log(obj);
      if (options.id && obj.length) {

        var i, row;
        table = "<table class=\"" + options.className + "\">";

        var dictType = false, headerObj = {}, key = null;
        if (options.header) {
          table += "<thead>";
          headerObj = obj[0]._data ? clone(obj[0]._data) : clone(obj[0]);
          
          if (headerObj.toString() === "[object Object]") { // data type is dictonary
            dictType = true;
            for (key in headerObj) { headerObj[key] = key; }
          }

          table += createRow(headerObj, true);
          table += "</thead>";
        }

        /**
        /* MODIFIED: options.header ? 1 : 0
        /* to eliminate duplicating header as the first row of data 
        **/
        table += "<tbody>";
        for (i = ((obj[0]._data ||  !dictType) && options.header ? 1 : 0); i < obj.length; i++) {
          if (dictType && headerObj) {
            var bodyItem = {};
            for (key in headerObj) {
              bodyItem[key] = (obj[i] && obj[i][key] != null) ? obj[i][key] : "";
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
    }

    ///////////End Declaring Functions

    var settings = $.extend({
      id: null, // target element id
      header: true,
      className: null
    }, options);

    options = $.extend(settings, options);
    if (typeof data === "string") {
      data = $.parseJSON(data);
    }
    if(!isArray(data)){
      data = [data];
    }
    var result = createJSONtable(data);
    console.log(result);
    $(options.id).append(result);

    return this;
  };
}(jQuery));
