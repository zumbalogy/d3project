var alist = by_name;

for (var key in alist){
    var tr = $(document.createElement('tr'));
    var td1 = $(document.createElement('td'));
    var td2 = $(document.createElement('td'));
    var td3 = $(document.createElement('td'));
    var td4 = $(document.createElement('td'));
    var td5 = $(document.createElement('td'));
    var td6 = $(document.createElement('td'));
    var td7 = $(document.createElement('td'));
    var td8 = $(document.createElement('td'));

    td1.text(alist[key].name);
    td2.text(alist[key].commit_count);
    td3.text(alist[key].ruby_count);
    td4.text(alist[key].js_count);
    td5.text(alist[key].html_count);
    td6.text(alist[key].erb_count);
    td7.text(alist[key].css_count);
    td8.text(alist[key].other_count);


    $(tr).append(td1,td2, td3, td4, td5, td6, td7, td8);

    $('#table').append(tr)

}


