import { LightningElement, track } from 'lwc';

export default class MyDataTable extends LightningElement {

    columns = [
        { label: 'Record Name', fieldName: 'name', type: 'text' },
        { label: 'Custom Type A', fieldName: 'id', type: 'customTypeA', typeAttributes: { customValueA: { fieldName: 'index' }}},
        { label: 'Custom Type B', fieldName: 'id', type: 'customTypeB', typeAttributes: { customValueB: { fieldName: 'indexb' }}}
    ];

    @track data = [
        { id: 1, name: 'Example 1', index: 1, createdDate: '08-05-2020',indexb: 1},
        { id: 2, name: 'Example 2', index: 2, createdDate: '08-05-2020',indexb: 2},
        { id: 3, name: 'Example 3', index: 3, createdDate: '08-05-2020',indexb: 3},
        { id: 4, name: 'Example 4', index: 4, createdDate: '08-05-2020',indexb: 4},
        { id: 5, name: 'Example 5', index: 5, createdDate: '08-05-2020',indexb: 5},
        { id: 6, name: 'Example 6', index: 6, createdDate: '08-05-2020',indexb: 6},
        { id: 7, name: 'Example 7', index: 7, createdDate: '08-05-2020',indexb: 7},
        { id: 8, name: 'Example 8', index: 8, createdDate: '08-05-2020',indexb: 8},
        { id: 9, name: 'Example 9', index: 9, createdDate: '08-05-2020',indexb: 9},
        { id: 10, name: 'Example 10', index: 10, createdDate: '08-05-2020',indexb: 10},
        { id: 11, name: 'Example 11', index: 11, createdDate: '08-05-2020',indexb: 11},
        { id: 12, name: 'Example 12', index: 12, createdDate: '08-05-2020',indexb: 12},
        { id: 13, name: 'Example 13', index: 13, createdDate: '08-05-2020',indexb: 13},
        { id: 14, name: 'Example 14', index: 14, createdDate: '08-05-2020',indexb: 14},
        { id: 15, name: 'Example 15', index: 15, createdDate: '08-05-2020',indexb: 15}
    ];

    handleCustomTypeA(event) {
        const { recordId, newCustomValueA } = event.detail;
        console.log('CUSTOM TYPE A - ' + recordId + ' - ' + newCustomValueA);
        this.data.find(item => item.id == recordId).index = newCustomValueA;
        this.data = [...this.data]; //datatable will be rerender
    }
    handleCustomTypeB(event) {
        const { recordId, newCustomValueB } = event.detail;
        console.log('CUSTOM TYPE B - ' + recordId + ' - ' + newCustomValueB);
        this.data.find(item => item.id == recordId).indexb = newCustomValueB;
        this.data = [...this.data]; //datatable will be rerender
    }
}