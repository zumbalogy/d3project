#Produce json for git log
 
git log \
    --pretty=format:'{%n  "commit": "%H",%n  "author": "%an <%ae>",%n  "date": "%ad",%n  "message": "%f"%n},' \
    $@ | \
    perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
    perl -pe 's/},]/}]/'

#Produce json of git stat

git log \
    --numstat \
    --format='%H' \
    $@ | \
    perl -lawne '
        if (defined $F[1]) {
            print qq#{"insertions": "$F[0]", "deletions": "$F[1]", "path": "$F[2]"},#
        } elsif (defined $F[0]) {
            print qq#],\n"$F[0]": [#
        };
        END{print qq#],#}' | \
    tail -n +2 | \
    perl -wpe 'BEGIN{print "{"}; END{print "}"}' | \
    tr '\n' ' ' | \
    perl -wpe 's#(]|}),\s*(]|})#$1$2#g' | \
    perl -wpe 's#,\s*?}$#}#'

#Join git stat and log

/*
 * OPTIONAL: use this Node.js expression to merge the data structures
 * created by the two shell scripts above
 */
 
var gitLog, lstat;
 
gitLog = require('./data/git-log.json');
lstat = require('./data/git-stat.json');
 
gitLog.map(function(o){
    o.stat = lstat[o.commit];
});

#for converting formatted.js thing to by_name.js

// this is all in node after previous commands (above) have been made

var alist = {};

function get_file_type(input){
    var split = input.split('.');
    return split.pop();
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

// then fs writefile a stringified alist somewhere