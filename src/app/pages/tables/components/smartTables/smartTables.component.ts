import {Component, OnChanges} from '@angular/core';

import {SmartTablesService} from './smartTables.service';
import {LocalDataSource} from 'ng2-smart-table';

import {District} from '../../../..//district';
import '../../../../rxjs-operators';

import 'style-loader!./smartTables.scss';
import {DistrictService} from '../../../../district.service';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
})
export class SmartTables {

  query: string = '';


  public districts: District[] = [];
  public errorMessage: any = '';


  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      objectid: {
        title: 'ObjectId',
        type: 'number'
      },
      zone: {
        title: 'zone',
        type: 'string'
      },
      district: {
        title: 'district',
        type: 'string'
      },
      population: {
        title: 'population',
        type: 'number'
      },
      pga_value: {
        title: 'Pga',
        type: 'string'
      },
      severity_class: {
        title: 'Severity',
        type: 'string'
      },
      dist_id: {
        title: 'District Id',
        type: 'number'
      },
      reg_code: {
        title: 'Regional Code',
        type: 'string'
      },
      zone_code: {
        title: 'Zone code',
        type: 'string'
      },
      ocha_pcode: {
        title: 'ocha_pcode',
        type: 'string'
      },
      hlcit_code: {
        title: 'Hlcit code',
        type: 'string'
      },

      first_dist: {
        title: 'first dist',
        type: 'string'
      },

      min_paramv: {
        title: 'Min Param',
        type: 'string'
      },

      first_class: {
        title: 'First class',
        type: 'string'
      },

      shape_leng: {
        title: 'shape length',
        type: 'string'
      },

      shape_area: {
        title: 'Shape area',
        type: 'string'
      }
    },
    editable: false,
    actions: {
      add: false,
      edit: false,
      delete: false
    }
  };


  source: LocalDataSource = new LocalDataSource();

  constructor(protected _postDistrictService: DistrictService,
              protected service: SmartTablesService) {
    this.getDistrict();
  }

  getDistrict() {
    this._postDistrictService.getDistrincts()
      .subscribe(
        // districts => this.districts = districts,
        districts => this.loadTableDistricts(districts),
        error => this.errorMessage = <any>error);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  loadTableDistricts(districts): void {
    this.source.load(districts.districts);
  }
}
