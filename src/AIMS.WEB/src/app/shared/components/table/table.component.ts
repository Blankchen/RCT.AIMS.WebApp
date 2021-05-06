import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

interface Meta {
  title: string;
  key: string;
  type: 'img' | 'select' | 'readonly';
  optionList: Option[];
}

interface Option {
  id: number;
  label: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() title;
  @Input() metaList: Meta[];
  @Input() listOfData: any[];
  @Input() message: any[];
  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() clickLink = new EventEmitter();
  listOfDisplayData = [];
  sortName: string | null = null;
  sortValue: string | null = null;
  editCache: { [key: string]: any } = {};
  // create id const
  private readonly createId = 0;

  ngOnChanges() {
    if (!this.listOfData) {
      return;
    }
    this.listOfDisplayData = [...this.listOfData];
    this.updateEditCache();
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    const listOfData = [...this.listOfData];
    if (this.sortName && this.sortValue) {
      this.listOfDisplayData = listOfData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
            ? 1
            : -1
      );
    } else {
      this.listOfDisplayData = listOfData;
    }
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    // if create cancel then remove data
    if (id === this.createId) {
      this.listOfDisplayData = this.listOfDisplayData.filter(item => item.id !== this.createId);
      delete this.editCache[this.createId];
    } else {
      const index = this.listOfData.findIndex(item => item.id === id);
      this.editCache[id] = {
        data: { ...this.listOfData[index] },
        edit: false
      };
    }
  }

  saveEdit(id: number): void {
    if (id === this.createId) {
      console.log('create', id, this.editCache[id].data);
      this.create.emit(this.editCache[id].data);
    } else {
      // const index = this.listOfData.findIndex(item => item.id === id);
      // Object.assign(this.listOfData[index], this.editCache[id].data);
      // this.editCache[id].edit = false;
      console.log('saveEdit', id, this.editCache[id].data);
      this.update.emit(this.editCache[id].data);
    }
  }

  private updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  onDelete(id: string) {
    console.log('delete', id);
    this.delete.emit(id);
  }

  addRow(): void {
    // if already exist then return
    if (this.listOfDisplayData.find(item => item.id === this.createId)) {
      return;
    }
    const newData = this.metaList.reduce((prev, item) => {
      if (item.key === 'id') {
        return prev;
      }
      if (item.optionList && item.optionList.length > 0) {
        prev[item.key] = item.optionList[0].label;
      } else {
        prev[item.key] = '';
      }
      return prev;
    }, { id: this.createId });
    console.log('addRow', newData);
    this.listOfDisplayData = [
      newData,
      ...this.listOfDisplayData
    ];
    this.editCache[this.createId] = {
      edit: true,
      data: newData
    };
  }

  handleFileInput(id, key, files: FileList) {
    if (files.length > 0) {
      const file = files.item(0);
      this.editCache[id].data[key] = file;
      console.log('handleFileInput', this.editCache);
    }
  }

  onclickLink(data: any) {
    this.clickLink.emit(data);
  }
}
