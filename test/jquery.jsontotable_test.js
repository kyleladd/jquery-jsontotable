(function($) {
  test("An Array of Arrays", function() {
    var target = $("#targetel");
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
    //List is same without header - not an object - no keys
    $.jsontotable(arr, { id: "#targetel", header: true });
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 1);
    equal(target.find("td").length, 3);
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
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 6);
    equal(target.text(), arr[0].join("") + arr[1].join(""));

    target.empty();
    $.jsontotable(arr, { id: "#targetel" });
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 6);
    equal(target.text(), arr[0].join("") + arr[1].join(""));
  });

  test("String of Array of Arrays", function() {
    var target = $("#targetel");
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
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 1);
    equal(target.find("td").length, 3);
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
    $.jsontotable(str, { id: "#targetel", header: true });
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 6);
    equal(target.text(), str.replace(/[\[\], ]/gi, ""));

    target.empty();
    $.jsontotable(str, { id: "#targetel" });
    equal(target.find("thead").length, 0);
    equal(target.find("tbody").length, 1);
    equal(target.find("th").length, 0);
    equal(target.find("tr").length, 2);
    equal(target.find("td").length, 6);
    equal(target.text(), str.replace(/[\[\], ]/gi, ""));
  });

  test("String of array of Dictionaries", function() {
    var target = $("#targetel");
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

  // test("_data Attribute", function() {
  //   var target = $("#targetel");
  //   var arr = [{id:'header', _data:['one', 'two', 'three']}, [1, 2, 3]];

  //   target.empty();
  //   $.jsontotable(arr, { id: "#targetel", header: false });
  //   equal(target.find("thead").length, 0);
  //   equal(target.find("tbody").length, 1);
  //   equal(target.find("th").length, 0);
  //   equal(target.find("tr").length, 2);
  //   equal(target.find("td").length, 6);
  //   equal(target.text(), arr[0]._data.join("") + arr[1].join(""));

  //   target.empty();
  //   $.jsontotable(arr, { id: "#targetel", header: true });
  //   equal(target.find("thead").length, 1);
  //   equal(target.find("tbody").length, 1);
  //   equal(target.find("th").length, 3);
  //   equal(target.find("tr").length, 2);
  //   equal(target.find("td").length, 3);
  //   equal(target.text(), arr[0]._data.join("") + arr[1].join(""));
  // });
  
  test("Auto Header", function() {
    var target = $("#targetel");
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
  test("Array of dictionary", function() {
    var target = $("#targetel");
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
  test("Dictionary", function() {
    var target = $("#targetel");
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
  test("ClassName Option", function() {
    var target = $("#targetel");
    var data = { "a": 1, "b": 2, "c": 3 };
    target.empty();
    $.jsontotable(data, { id: "#targetel", header: true });
    equal(target.find("table").hasClass("myclass"), false);
    equal(target.find("table").hasClass("null"), false);
    target.empty();
    $.jsontotable(data, { id: "#targetel", header: true, className: "myclass" });
    equal(target.find("table").hasClass("myclass"), true);
  });
  test("Nested Objects", function() {
    var target = $("#targetel");
    var data = { "a": 1, "b": { "a": 1, "b": 2, "c": 3 }, "c": 3 };
    target.empty();
    $.jsontotable(data, { id: "#targetel", className: "striped highlight", header: true, flatten:true, nesting:true });
    equal(target.find("thead").length, 2,"thead");
    equal(target.find("tbody").length, 2,"tbody");
    equal(target.find("th").length, 6,"th");
    equal(target.find("tr").length, 4,"tr");
    equal(target.find("td").length, 6,"td");
    target.empty();
    $.jsontotable(data, { id: "#targetel", className: "striped highlight", header: false, flatten:true, nesting:true });
    equal(target.find("thead").length, 0,"thead");
    equal(target.find("tbody").length, 2,"tbody");
    equal(target.find("th").length, 0,"th");
    equal(target.find("tr").length, 2,"tr");
    equal(target.find("td").length, 6,"td");
  });
}(jQuery));
