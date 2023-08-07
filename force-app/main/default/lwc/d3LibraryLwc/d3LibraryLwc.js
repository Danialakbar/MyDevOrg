import { LightningElement,track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
//Static Resource
import D3 from '@salesforce/resourceUrl/D3';
import getAccountAndContacts from '@salesforce/apex/D3Controller.getAccountAndContacts';


export default class D3LibraryLwc extends LightningElement {
    pubs =
{
    "name": "Touseef",
    "color": "#d1d1d1", 
    "image": "https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    "source":"legacy",
    "children": [
      {
            "name": "Family",
            "color": "#d1d1d1" ,
            "children":[
                {"source":"legacy","name": "Demmy text", "color" : "#d1d1d1" },
                {"source":"legacy","name": "Demmy text", "color" : "#d1d1d1" },
                {"source":"legacy","name": "Demmy text", "color" : "#d1d1d1" },
                {"source":"legacy","name": "Demmy text", "color" : "#d1d1d1" },
                {"source":"legacy","name": "Demmy text", "color" : "#d1d1d1" }
            ]
        },
        {
            "name": "Health",
            "color": "#d1d1d1", 
            "source":"cloud",
            "children":[
                {"name": "Demmy text", "color" : "#d1d1d1" , "source":"legacy"},
                {"name": "Demmy text", "color" : "#d1d1d1" , "source":"legacy"},
                {"name": "Demmy text", "color" : "#d1d1d1" , "source":"legacy"},
                {"name": "Demmy text", "color" : "#d1d1d1" , "source":"legacy"},
            ]
        },
        {
            "name": "Payment", 
            "color" : "#d1d1d1", 
            "source":"cloud",
            "children":[
                {"name": "Demmy text", "color" : "#d1d1d1", "id":"payapproval", "source":"cloud"},
                {"name": "Demmy text", "color" : "#d1d1d1", "id":"paymentapproval", "source":"cloud"},
                {"name": "Demmy text", "color" : "#d1d1d1", "id":"creditcardsubmit--1", "source":"cloud"}
            ]
        },
        {
            "name": "Financial Account",
            "color": "#d1d1d1",
            "children": [
                {"name": "Demmy text", "color" : "#d1d1d1", "id":"productfeed", "source":"cloud"},
                {"name": "Demmy text", "color" : "#d1d1d1", "id":"productfeedrollupsv2", "source":"cloud"},
                {"name": "Demmy text", "color" : "#d1d1d1" , "source":"cloud"},
                {"name": "Demmy text", "color" : "#d1d1d1", "source":"cloud" }
            ]
        },
        {
            "name": "Assets 32M", 
            "color" : "#d1d1d1",
            "children":[
                {"name": "Demmy text", "color" : "#d1d1d1", "id":"merchproductsv2"},
                {"name": "Demmy text", "color" : "#d1d1d1", "id":"merchskusv2"},
                {"name": "Demmy text", "color" : "#d1d1d1", "id":"merchpricesv2"}
            ]
        },
        {
            "name": "Net Worth", 
            "color" : "#d1d1d1",
            "children":[
                {"name": "Demmy text", "color" : "#d1d1d1"},
                {"name": "Demmy text", "color" : "#d1d1d1"},
                {"name": "Demmy text", "color" : "#d1d1d1"},
                {"name": "Demmy text", "color" : "#d1d1d1"},
                {"name": "Demmy text", "color" : "#d1d1d1"}
            ]
        },
        {
            "name": "Education", 
            "color" : "#d1d1d1",
            "children":[
                {"name": "Demmy text", "color" : "#d1d1d1"},
                {"name": "Demmy text", "color" : "#d1d1d1"},
                {"name": "Demmy text", "color" : "#d1d1d1"},
                {"name": "Demmy text", "color" : "#d1d1d1"},
                {"name": "Demmy text", "color" : "#d1d1d1"}
            ]
        },
        {
            "name": "Life Events", 
            "color" : "#d1d1d1",
            "children":[
                {"name": "Demmy text", "color" : "#d1d1d1"},
                {"name": "Demmy text", "color" : "#d1d1d1"}
            ]
        },
        {
            "name": "Insurance", 
            "color" : "#d1d1d1",
            "children":[
                {"name": "Demmy text", "color" : "#d1d1d1"},
                {"name": "Demmy text", "color" : "#d1d1d1"}
            ]
        }
    ]
}
@track diameter = 1000;
margin = {top: 20, right: 20, bottom: 20, left: 20}
    width =this.diameter
    height = this.diameter;
    
i = 0
    duration = 350
    root;
    tree;
renderedCallback() {
    Promise.all([
        
        loadScript(this, D3 + '/d3.v5.min.js'),
        loadScript(this, D3 + '/d3hierarchy.js')
    ]).then(() => {
            this.initializeD3();
    }).catch(error => {
        console.log(error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading D3',
                    message: error.message,
                    variant: 'error'
                })
            );//
        });
}

initializeD3() {
//tree = d3.layout.tree()
    //.size([200, diameter / 2 - 80])
    //.separation(function(a, b) { return (a.parent == b.parent ? 1 : 5) / a.depth; });

diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

svg = d3.select("body").append("svg")
    .attr("width", width )
    .attr("height", height )
    .append("g")
    .attr("transform", "translate(" + diameter /  2 + "," + diameter / 2.5+ ")");

root = pubs;
root.x0 = height / 2;
root.y0 = 0;
var nodes = tree.nodes(root),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 135; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
      .on("click", click);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? d.color : d.color; });

  nodeEnter.append("text")
      .attr("x", 10)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(90)translate(-" + (d.name.length * 5.5)  + ")"; })
      .text(function(d) { return d.name; })
  .attr("stroke-linejoin", "round")
        .attr("stroke-width", .75)
        .attr("stroke", "gray")
        .style("fill-opacity", 1e-6);
  

        nodeEnter.append('image')
            .attr('x', function(d) {
                return 5;
            })
            .attr('y', function(d) {
                return 15;
            })
            .attr('xlink:href', function(d) {
                return d.image;
            })
            .attr('width', 50)
            .attr('height', 50)


  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", 
            function(d) { 
                // console.log(d);
                if(d.depth == 0){
                    // console.log(d);
                    return "rotate(" + (d.x - 90) + ")translate(" + -70 + ")"; 
                }
                return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; 
        }
    )


  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? d.color : d.color; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1)
      .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(90)translate(-" + (d.name.length - 100)  + ")"; });

  // TODO: appropriate transform
  var nodeExit = node.exit().transition()
      .duration(duration)
      //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
d3.select(self.frameElement).style("height", "800px");
}

    collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
            }
    }
    click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
}