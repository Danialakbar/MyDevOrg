import { LightningElement,track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
//Static Resource
import D3 from '@salesforce/resourceUrl/D3';

export default class D3BusinessTree extends LightningElement {
    @track data = [
        {
          name: "Tim Miner Household",
          children: [
            { name: "Daughter Account" },
            { name: "Son Account" },
            {
              name: "Family",
              children: [
                { name: "Interests" },
                { name: "Hobbies" ,
                children:[
                  { name: "Shipping" },
                  { name: "Camping" }
                ]
              },
                { name: "Education" },
                { name: "Net Worth" }
              ]
            },
            { name: "Wife Account" }
          ]
        }
      ];
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
            );
        });
}
    initializeD3() {
        const element = this.template.querySelector('svg');
    const svg = d3.select(element);
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = 960 - margin.right - margin.left;
    const height = 500 - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const tree = d3.tree().size([height, width]);
    const root = d3.hierarchy(this.data[0], d => d.children);
    tree(root);

    const link = g.selectAll('.link')
      .data(root.descendants().slice(1))
      .enter().append('path')
        .attr('class', 'link')
        .attr('d', function(d) {
          return "M" + d.y + "," + d.x
            + "C" + (d.y + d.parent.y) / 2 + "," + d.x
            + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
        });

    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
        .attr('class', function(d) {
          return 'node' + (d.children ? ' node--internal' : ' node--leaf');
        })
        .attr('transform', function(d) {
          return 'translate(' + d.y + ',' + d.x + ')';
        });

    node.append('circle')
      .attr('r', 10);

    node.append('text')
      .attr('dy', '.35em')
      .attr('y', function(d) {
        return d.children ? -20 : 20;
      })
      .style('text-anchor', 'middle')
      .text(function(d) {
        return d.data.name;
      });
  }
}