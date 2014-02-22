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

////////////////////////////////////////////////////////////

var n = 20, // number of layers
    m = 200, // number of samples per layer
    stack = d3.layout.stack().offset("wiggle"),
    layers0 = stack(d3.range(n).map(function() { return bumpLayer(m); })),
    layers1 = stack(d3.range(n).map(function() { return bumpLayer(m); }));

var width = 960,
    height = 500;

var x = d3.scale.linear()
    .domain([0, m - 1])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, d3.max(layers0.concat(layers1), function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
    .range([height, 0]);

var color = d3.scale.linear()
    .domain([0, 1, 2, 3])
    .range(["white", "black", 'red', 'blue']);

var area = d3.svg.area()
    .x(function(d) { return x(d.x); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("path")
    .data(layers0)
  .enter().append("path")
    .attr("d", area)
    .style("fill", function() { return color(Math.random() * 3); });

function transition() {
  d3.selectAll("path")
      .data(function() {
        var d = layers1;
        layers1 = layers0;
        return layers0 = d;
      })
    .transition()
      .duration(2500)
      .attr("d", area);
}

// Inspired by Lee Byron's test data generator.
function bumpLayer(n) {

  function bump(a) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    for (var i = 0; i < n; i++) {
      var w = (i / n - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }

  var a = [], i;
  for (i = 0; i < n; ++i) a[i] = 0;
  for (i = 0; i < 5; ++i) bump(a);
  return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
}