var alist = by_name

// name: (raw_log[i].author).split(' <')[0],
//     commit_count:  1,
//     ruby_count: 0,
//     js_count: 0,
//     erb_count: 0,
//     html_count: 0,
//     css_count: 0,
//     other_count: 0

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



 // todo, new parsed big object could just be put in a file directly already parsed
 // (then maybe in mongo)

function get_file_type(input){
    var split = input.split('.');
    return split.pop();
}

// for (var i = 0; i < raw_log.length; i++){
//     if (alist[raw_log[i].author]) {
//         var stat = raw_log[i].stat
//         alist[raw_log[i].author].commit_count ++;

//         for (var n = 0; n < stat.length; n++){
//             switch (get_file_type(stat[n].path)) {
//                 case 'rb':
//                     alist[raw_log[i].author].ruby_count ++;
//                     break;
//                 case 'js':
//                     alist[raw_log[i].author].js_count ++;
//                     break;
//                 case 'erb':
//                     alist[raw_log[i].author].erb_count ++;
//                     break;
//                 case 'html':
//                     alist[raw_log[i].author].html_count ++;
//                     break;
//                 case 'css':
//                     alist[raw_log[i].author].css_count ++;
//                     break;
//                 default:
//                     alist[raw_log[i].author].other_count ++;
//             }
//         }

var hash = {};
for (var i = 0; i < raw_log.length; i++){
    // var time = raw_log[i].date.split(' ')[1] + raw_log[i].date.split(' ')[2]
    // array.push(time)
    var a = new Date(raw_log[i].date);
    var b =  "" + a.getFullYear() + '-' + a.getMonth() + '-' + a.getDate();
    if (hash[b]) {
        hash[b] = {commits: (hash[b].commits + 1)}
        var stat = raw_log[i].stat
        for (var n = 0; n < stat.length; n++){
            switch (get_file_type(stat[n].path)) {
                case 'rb':
                    hash[b].ruby ++;
                    break;
                case 'js':
                    hash[b].js ++;
                    break;
                case 'erb':
                    hash[b].erb ++;
                    break;
                case 'html':
                    hash[b].html ++;
                    break;
                case 'css':
                    hash[b].css ++;
                    break;
                default:
                    hash[b].other ++;
            }
        }   
    } else {
        hash[b] = {commits: 1,
            ruby: 0,
            js: 0,
            erb: 0,
            css: 0,
            html: 0,
            other: 0
        }
    }
}


console.log(hash)



function GetUnique(inputArray) {
    var outputArray = [];
    for (var i = 0; i < inputArray.length; i++)
    {
        if ((jQuery.inArray(inputArray[i], outputArray)) == -1)
        {
            outputArray.push(inputArray[i]);
        }
    }
    return outputArray;
}



