(function($) {
  var target;
  QUnit.module("JSONtoTable", {
    beforeEach: function() {
      var targetEl = document.createElement('div');
      targetEl.id = 'targetel';
      document.getElementById("qunit-fixture").appendChild(targetEl);
      target = $("#targetel");
    },
    afterEach: function() {
      // clean up after each test
      if(document.getElementById('targetel')){
          document.getElementById('targetel').remove();
      }
    }
  });
  QUnit.test("An Array of Arrays", function() {
    var arr = [[1, 2, 3]];
    target.empty();
    $.jsontotable(arr, { id: "#targetel", header: false });
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 1);
    equal(target.find("td").length, 3);
    equal(target.text(), arr[0].join(""));

    target.empty();
    $.jsontotable(arr, { id: "#targetel", header: true });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 0);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 1);
    equal(target.find("td").length, 0);
    equal(target.text(), arr[0].join(""));

    arr = [[1, 2, 3], [1, 2, 3]];
    target.empty();
    $.jsontotable(arr, { id: "#targetel", header: false });
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 6);
    equal(target.text(), arr[0].join("") + arr[1].join(""));

    target.empty();
    $.jsontotable(arr, { id: "#targetel", header: true });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 3);
    equal(target.text(), arr[0].join("") + arr[1].join(""));

    target.empty();
    $.jsontotable(arr, { id: "#targetel" });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 3);
    equal(target.text(), arr[0].join("") + arr[1].join(""));
  });

  QUnit.test("String of Array of Arrays", function() {
    var str = "[[1, 2, 3]]";

    target.empty();
    $.jsontotable(str, { id: "#targetel", header: false });
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 1);
    equal(target.find("td").length, 3);
    equal(target.text(), str.replace(/[\[\], ]/gi, ""));

    target.empty();
    $.jsontotable(str, { id: "#targetel", header: true });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 0);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 1);
    equal(target.find("td").length, 0);
    equal(target.text(), str.replace(/[\[\], ]/gi, ""));


    str = "[[1, 2, 3], [1, 2, 3]]";
    target.empty();
    $.jsontotable(str, { id: "#targetel", header: false });
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 6);
    equal(target.text(), str.replace(/[\[\], ]/gi, ""));

    target.empty();
    // The first row is the header
    $.jsontotable(str, { id: "#targetel", header: true });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 3);
    equal(target.text(), str.replace(/[\[\], ]/gi, ""));

    target.empty();
    $.jsontotable(str, { id: "#targetel" });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 3);
    equal(target.text(), str.replace(/[\[\], ]/gi, ""));
  });

  QUnit.test("String of array of Dictionaries", function() {
    var str = '[{ "a": 1, "b": 2, "c": 3 }]';

    target.empty();
    $.jsontotable(str, { id: "#targetel", header: false });
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 1);
    equal(target.find("td").length, 3);
    equal(target.text(), str.replace(/[\{\}\"\[\], abc:]/gi, ""));

    target.empty();
    $.jsontotable(str, { id: "#targetel", header: true });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 3);

    str = '[{ "a": 1, "b": 2, "c": 3 }, { "a": 1, "b": 2, "c": 3 }]';

    target.empty();
    $.jsontotable(str, { id: "#targetel", header: false });
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 6);

    target.empty();
    $.jsontotable(str, { id: "#targetel", header: true });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 3);
    equal(target.find("td").length, 6);

    target.empty();
    $.jsontotable(str, { id: "#targetel" });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 3);
    equal(target.find("td").length, 6);
  });

  QUnit.test("_data Attribute", function() {
    var arr = [{id:'header', _data:['one', 'two', 'three']}, [1, 2, 3]];

    target.empty();
    $.jsontotable(arr, { id: "#targetel", header: false });
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 6);
    equal(target.text(), arr[0]._data.join("") + arr[1].join(""));

    target.empty();
    $.jsontotable(arr, { id: "#targetel", header: true });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 3);
    equal(target.text(), arr[0]._data.join("") + arr[1].join(""));
  });
  
  QUnit.test("Auto Header", function() {
    var data = [
      {"Date":"2012-05-02","Weight":"76.20"},{"Date":"2012-05-22","Weight":"75.50"},{"Date":"2012-07-02","Weight":"73.80"},
      {"Date":"2012-08-06","Weight":"73.00"},{"Date":"2012-10-10","Weight":"70.50"},{"Date":"2013-01-02","Weight":"72.50"}
    ];
    
    target.empty();
    $.jsontotable(data, { id: "#targetel", header: true });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 2);
    equal(target.find("tr").length, 7);
    equal(target.find("td").length, 12);
  });
  QUnit.test("Array of dictionary", function() {
    var data = [{ "a": 1, "b": 2, "c": 3 }];
    target.empty();
    $.jsontotable(data, { id: "#targetel", header: true });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 3);
    
    data = [{ "a": 1, "b": 2, "c": 3 },{ "a": 4, "b": 5, "c": 6 }];
    target.empty();
    $.jsontotable(data, { id: "#targetel", header: true });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 3);
    equal(target.find("td").length, 6);
  });
  QUnit.test("Dictionary", function() {
    var data = { "a": 1, "b": 2, "c": 3 };
    target.empty();
    $.jsontotable(data, { id: "#targetel", header: true });
    equal(target.find("thead").length, 1);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 3);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 3);
    target.empty();
    $.jsontotable(data, { id: "#targetel", header: false });
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 1);
    equal(target.find("td").length, 3);
  });
}(jQuery));
