import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataOrder } from '../../models/order-model'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OrderServiceProvider {

    // itemValues: DataOrder;
    dataOrder: DataOrder;
    values: BehaviorSubject<any> = new BehaviorSubject<any>(this.dataOrder);   

    constructor(){
    }

    pushItems(data: DataOrder) {
        this.dataOrder = data;
        this.values.next(this.dataOrder);
        return this.dataOrder;
    }

    getDataOrder(){
        return this.dataOrder;
    }

}
