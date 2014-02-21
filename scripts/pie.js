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

var w = 600;
var h = 600;

var outerRadius = w / 2;
var innerRadius = 150;

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
    console.log(arcs)

    arcs.enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")")

    arcs.empty();
    arcs.append("path")
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
        })
}

pieFill()
// window.setInterval(function(){
//         pieFill()
//     }, 
//     1000
// )
