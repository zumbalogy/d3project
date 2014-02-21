var alist = {};

function get_file_type(input){
    var split = input.split('.');
    return split[split.length - 1]
}

for (var i = 0; i < raw_log.length; i++){
    if (alist[raw_log[i].author]) {
        var stat = raw_log[i].stat
        alist[raw_log[i].author].commit_count ++;

        for (var n = 0; n < stat.length; n++){
            switch (get_file_type(stat[n].path)) {
                case 'rb':
                    alist[raw_log[i].author].ruby_count ++;
                    break;
                case 'js':
                    alist[raw_log[i].author].js_count ++;
                    break;
                case 'erb':
                    alist[raw_log[i].author].erb_count ++;
                    break;
                case 'html':
                    alist[raw_log[i].author].html_count ++;
                    break;
                case 'css':
                    alist[raw_log[i].author].css_count ++;
                    break;
                default:
                    alist[raw_log[i].author].other_count ++;
            }
        }
    } else {
        alist[raw_log[i].author] = {
            name: (raw_log[i].author).split(' <')[0],
            commit_count:  1,
            ruby_count: 0,
            js_count: 0,
            erb_count: 0,
            html_count: 0,
            css_count: 0,
            other_count: 0
        };
    }
};


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


 // todo, new parsed big object could just be put in a file directly already parsed
 // (then maybe in mongo)
