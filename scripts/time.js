var pieData = by_name;
var name;

var key_array = [];
for (var key in pieData){
    if (key == "Lior Elrom <liormb@users.noreply.github.com>" || key == "dlopezh <daniellopezh@gmail.com>"){
        console.log(key)
    }
    else {
        key_array.push(key)
    }
}

function newPiePerson(){
    var key = key_array[Math.floor(Math.random()*key_array.length)];
    name = pieData[key].name;
    return [
        pieData[key].ruby_count,
        pieData[key].js_count,
        pieData[key].html_count,
        pieData[key].erb_count,
        pieData[key].css_count,
        pieData[key].other_count
    ]
};

var pie = d3.layout.pie();
var color = d3.scale.category10();

var w = 800;
var h = 800;

var outerRadius = w / 2;
var innerRadius = 300;

var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

var svg = d3.select("#pie-chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

function pieFill(){
    $('#name-tag').text(name)
    $('svg').empty()
    var arcs = svg.selectAll("g.arc").data(pie(newPiePerson()))

    arcs.enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")")

    arcs.empty();
    arcs.append("path")
        //.transition()
        .attr("fill", function(d, i) {
            return color(i)
        })
        .attr("d", arc)

        arcs.append("text")
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d.value;
        });
    
}
pieFill();
// window.setInterval(function(){
//         pieFill()
//     }, 
//     2000
// )

var byDate = by_date;


var table = document.createElement('table');
$(table).attr('border', '1px')

for (var key in byDate){  
    var tr = document.createElement('tr');  
    var td1 = document.createElement('td');
    var td2 = document.createElement('td'); 
    var td3 = document.createElement('td');
    var td4 = document.createElement('td'); 
    var td5 = document.createElement('td'); 
    var td6 = document.createElement('td'); 
    var td7 = document.createElement('td'); 
    var td8 = document.createElement('td'); 
    $(td1).text(key);
    $(td2).text(byDate[key].commits);
    // $(td2).attr('stlye', "background-color: rgba(" + byDate[key].commits + ", 0, 0, 1);");
    $(td3).text(byDate[key].ruby);
    $(td4).text(byDate[key].js);
    $(td5).text(byDate[key].erb);
    $(td6).text(byDate[key].css);
    $(td7).text(byDate[key].html);
    $(td8).text(byDate[key].other);
    $(tr).append(td1, td2, td3, td4, td5, td6, td7, td8);

    $(table).append(tr)
};

$('body').append(table);