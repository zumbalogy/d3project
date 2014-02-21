var pieData = by_name;

var rubyFiles, jsFiles, htmlFiles, erbFiles, cssFiles, otherFiles, name;

var key_array = [];
for (var key in pieData){
    if (key !== "Lior Elrom <liormb@users.noreply.github.com>" || key !== "dlopezh <daniellopezh@gmail.com>"){
        key_array.push(key)
    }
}

var onePieData;
function newPiePerson(){
    var key = key_array[Math.floor(Math.random()*key_array.length)];
    name = pieData[key].name;
    rubyFiles = pieData[key].ruby_count;
    jsFiles = pieData[key].js_count;
    htmlFiles = pieData[key].html_count;
    erbFiles = pieData[key].erb_count;
    cssFiles = pieData[key].css_count;
    otherFiles = pieData[key].other_count;
    return onePieData = [rubyFiles, jsFiles, htmlFiles, erbFiles, cssFiles, otherFiles];
};


/// Function to fetch random person git data

var fetchPersonData = function(){

}

var pieData = [rubyFiles, jsFiles, htmlFiles, erbFiles, cssFiles, otherFiles];
console.log(pieData);

var pie = d3.layout.pie();

var w = 600;
var h = 600;

var color = d3.scale.category10();

var outerRadius = w / 2;
var innerRadius = 150;
var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

var svg = d3.select("#pie-chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

var arcs = svg.selectAll("g.arc")
        .data(pie(pieData))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

arcs.append("path")
    .attr("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arc);

    arcs.append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
        return d.value;
    });

// window.setInterval(function(){
    var masterPie = newPiePerson()
    console.log(name)

    var pie = d3.layout.pie();

    var w = 600;
    var h = 600;

    var color = d3.scale.category10();

    var outerRadius = w / 2;
    var innerRadius = 150;
    var arc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);

    var svg = d3.select("#pie-chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var arcs = svg.selectAll("g.arc")
            .data(pie(newPiePerson()))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")")


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
        });


    // }, 3000)
window.setInterval(function(){
    svg.selectAll("g.arc").clear;
    svg.selectAll("g.arc")
            .data(pie(newPiePerson()))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")")
    }, 1000
)
