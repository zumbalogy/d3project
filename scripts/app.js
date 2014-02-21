
for (var key in alist){
    var tr = $(document.createElement('tr'));
    var td1 = $(document.createElement('td'));
    var td2 = $(document.createElement('td'));
    var td3 = $(document.createElement('td'));
    var td4 = $(document.createElement('td'));

    td1.text(alist[key].name);
    td2.text(alist[key].commit_count);
    td3.text(alist[key].ruby_count);
    td4.text(alist[key].js_count);


    $(tr).append(td1);
    $(tr).append(td2);
    $(tr).append(td3);
    $(tr).append(td4);

    $('#table').append(tr)
    console.log(alist[key]);
}


var fs = require('fs');
fs.writeFile('../data/name_list.js', JSON.stringify(alist))

 // todo, new parsed big object could just be put in a file directly already parsed
 // (then maybe in mongo)
