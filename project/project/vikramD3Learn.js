WIDTH = screen.width
HEIGHT = screen.height
HEX_SIDE_LEN = 260 
$(document).ready(script)
function script(){
	WIDTH = $(window).width() 
	HEIGHT = $(window).height()
    var zoom = d3.zoom().scaleExtent([1, 100]).on("zoom", zoomed);	
	tx = WIDTH/2
	ty = HEIGHT/2
	TRANSLATE = "translate("+tx+","+ty+") scale(1,1)"
	var svg = d3.select("body").append("svg").attr("width", WIDTH).attr("height",HEIGHT)
	svg.call(zoom)
	svg.append("g").attr("id","group").attr("transform",TRANSLATE)
    height = HEX_SIDE_LEN * Math.sin(2*(Math.PI/3))
	var data2015, data2016;
	var all_proteins = ["Eotaxin", "G.CSF", "GM.CSF", "IL.1a", "IL.1b",
								 "IL.2", "IL.3", "IL.4", "IL.5", "IL.6", "IL.7",
								 "IL.9", "IL.10", "IL.12p40", "IL.12p70", "IL.13",
								 "IL.15", "IL.17", "INFg", "IL.13", "KC", "LIF",
								 "M.CSF", "MCP.1", "MIG", "MIP2", "MIP.1a", "MIP.1b",
								 "RANTES", "TNFa", "VEGF", "IP.10"]
	var data_2016_flatten = {"AIP":[], "AIV":[], "AIPV":[], "IPV":[], "APV":[], "untreated":[]}
	var data_2015_flatten = {"AIP":[], "AIV":[], "AIPV":[], "IPV":[], "APV":[], "untreated":[]}
	d3.csv("2016data.csv", (data2016) => {
			d3.csv("2015data.csv", function(data2015) {
				data2016.forEach(function(d) {
					for(index in all_proteins){
						data_2016_flatten[d["Treatment"]].push(parseInt( d[all_proteins[index]] ) )
					}
				});

				data2015.forEach(function(d) {
					for(index in all_proteins){
						data_2015_flatten[d["Treatment"]].push( parseInt( d[all_proteins[index]]) )
					}
				});
				data = {}
				data["AIP"] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
				data["APV"] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
				data["AIPV"] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
				data["IPV"] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
				data["AIV"] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
				data["untreated"] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
				//hex_framework([data, data] )
			    hex_framework([data_2015_flatten, data_2016_flatten] )
			});
	});
	function hex_framework(data){
			//top side
		var g1 = svg.select("g").append("g")
		var g1_transform = formatSpecifier("translate(0,{$0}) scale(-1,1)",[height])
		g1.attr("transform", g1_transform)
		hex_side_handler(g1, [data[0]["AIP"], data[1]["AIP"]], "AIP")
		
		//bottom
		var g2 = svg.select("g").append("g")
		var g2_transform = formatSpecifier("translate(0,{$0}) scale(1,-1)",[-1*height])
		g2.attr("transform", g2_transform)
		hex_side_handler(g2, [data[0]["APV"], data[1]["APV"]], "APV")
		
		//top left
		var g3 = svg.select("g").append("g")
		var g3_transform = formatSpecifier("translate({$0}, {$1}) rotate({$2}, 0, 0) scale(-1,1)", [-1*(HEX_SIDE_LEN/4+HEX_SIDE_LEN/2), height/2, 60])
		g3.attr("transform", g3_transform)
		hex_side_handler(g3, [data[0]["AIPV"], data[1]["AIPV"]], "AIPV")
		
		//top right
		var g4 = svg.select("g").append("g")
		var g4_transform = formatSpecifier("translate({$0}, {$1}) rotate({$2}, 0, 0)  scale(1,-1)", [1*(HEX_SIDE_LEN/4+HEX_SIDE_LEN/2), height/2, 120])
		g4.attr("transform", g4_transform)
		hex_side_handler(g4, [data[0]["IPV"], data[1]["IPV"]], "IPV")
		
		//bottom left
		var g5 = svg.select("g").append("g")
		var g5_transform = formatSpecifier("translate({$0}, {$1}) rotate({$2}, 0, 0) scale(-1,1)", [-1*(HEX_SIDE_LEN/4+HEX_SIDE_LEN/2), -height/2, 120])
		g5.attr("transform", g5_transform)
		hex_side_handler(g5, [data[0]["AIV"], data[1]["AIV"]], "AIV")
		
		//bottom right
		var g6 = svg.select("g").append("g")
		var g6_transform = formatSpecifier("translate({$0}, {$1}) rotate({$2}, 0, 0) scale(1,-1)", [1*(HEX_SIDE_LEN/4+HEX_SIDE_LEN/2), -height/2, 60])
		g6.attr("transform", g6_transform)
		hex_side_handler(g6, [data[0]["untreated"], data[1]["untreated"]], "untreated")
		
		//svg.select("g").append("line").attr("x1",-300).attr("y1", 0).attr("x2",300).attr("y2",0).style("stroke","red")
		//svg.select("g").append("line").attr("x1",0).attr("y1", +300).attr("x2", 0).attr("y2",-300).style("stroke","red")
		svg.select("g").append("circle").attr("cx",0).attr("cy", 0).attr("r", 5).style("fill","red")
	}
}

function formatSpecifier(str,params){
  var i = 0
  for(i = 0; i < params.length; i++){
    str = str.replace("{"+"$"+i+"}", params[i])
  }
  return str
}

function hex_side_handler(element, data, text){
	//element.append("line").attr("x1",-1*HEX_SIDE_LEN/2).attr("y1",0).attr("x2", HEX_SIDE_LEN/2).attr("y2",0).style("stroke","blue")
	var minDataPoint = d3.min([ d3.min(data[0]), d3.min(data[1]) ])
	var maxDataPoint = d3.max([ d3.max(data[0]), d3.max(data[1]) ]);
	var linearScale = d3.scaleLinear()
                            .domain([minDataPoint,maxDataPoint])
                            .range([10,100]);
	var BAR_WIDTH = HEX_SIDE_LEN*1.0/(2*data[0].length)
	var BAR_MARGIN = BAR_WIDTH
	START_X = -1* (HEX_SIDE_LEN/2)
	
	element.selectAll(".data2016").data(data[0]).enter().append("rect").attr("y",0).attr("x",function(d,i){
		return START_X + BAR_MARGIN*i + BAR_WIDTH*i
	}).attr("height",function(d, i){
		return linearScale(data[0][i])
	}).attr("width", BAR_WIDTH).style("z-index", 2)
	
	element.selectAll(".data2017").data(data[1]).enter().append("rect").attr("y",0).attr("x",function(d,i){
		return START_X + BAR_MARGIN*i + BAR_WIDTH*i+(BAR_WIDTH/2)
	}).attr("height",function(d, i){
		return linearScale(data[1][i])
	}).attr("width", BAR_WIDTH).style("fill","red").style("z-index", 1)
	var text_ele = element.append("text").attr("transform","scale(1,-1)").attr("x", 0).attr("y",0).text(text)
	var length = text_ele.node().getComputedTextLength()
	text_ele.attr("x",-1*length/2).attr("y", 22)
}

function getValues(len){
	var res = []
	for(var i = 0  ; i < len; i++){
		res.push(getRandomArbitrary(10,1000))
	}
	return res
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
angle = 0
function updateData(){
	var svg = d3.select("body").select("svg")
	angle = angle + 60
	svg.transition().attr("transform", formatSpecifier("rotate({$0},0,0)",[angle]))
}
function zoomed(){
	 container = d3.select("body").select("svg").select("g")
	 translate = "translate({$0},{$1}) scale({$2}, {$3})"
	 translate = formatSpecifier(translate, [d3.event.transform.x, d3.event.transform.y, d3.event.transform.k, d3.event.transform.k])
	 translate = TRANSLATE + " " + translate
	 console.log("tranlate string::--->>>"+translate)
	container.attr("transform", translate);
}
