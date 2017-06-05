import { Component, OnChanges } from '@angular/core';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

import { District } from '../../../..//district';
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
        title: 'Object ID',
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
        title: 'pga_value',
        type: 'string'
      },
      severity_class: {
        title: 'severity_class',
        type: 'string'
      },
      dist_id: {
        title: 'dist_id',
        type: 'number'
      },
      reg_code: {
        title: 'reg_code',
        type: 'string'
      },
      zone_code: {
        title: 'zone_code',
        type: 'string'
      },
      ocha_pcode: {
        title: 'ocha_pcode',
        type: 'string'
      },
      hlcit_code: {
        title: 'hlcit_code',
        type: 'string'
      },

      first_dist: {
        title: 'first_dist',
        type: 'string'
      },

      min_paramv: {
        title: 'min_paramv',
        type: 'string'
      },

      first_class: {
        title: 'first_class',
        type: 'string'
      },

      shape_leng: {
        title: 'shape_leng',
        type: 'string'
      },

      shape_area: {
        title: 'shape_area',
        type: 'string'
      }

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
