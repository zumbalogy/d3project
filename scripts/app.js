console.log('hello');



console.log(raw_log);
console.log(raw_log[0]);

var alist = {};

for (var i = 0; i < raw_log.length; i++){
    if (alist[raw_log[i].author]) {
        alist[raw_log[i].author] ++;
    } else {
        alist[raw_log[i].author] = 1;
    }
}

console.log(alist)
