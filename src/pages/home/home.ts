import { Component } from '@angular/core';
import { ModalController, NavController, AlertController,reorderArray  } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data, public alertCtrl: AlertController) {

    this.dataService.getData().then((todos) => {

      if(todos){
        this.items = JSON.parse(todos);
      }

    });

  }

  ionViewDidLoad(){

  }

  addItem(){

    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {

          if(item){
            this.saveItem(item);
          }

    });

    addModal.present();

  }

  saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
  }


  viewItem(item){
      this.navCtrl.push(ItemDetailPage, {
        item: item
      });
    }

    removeItem(item){
   var i;
      for(i = 0; i < this.items.length; i++) {

        if(this.items[i] == item){
          this.items.splice(i, 1);
        }

      }

    }




    editNote(item){

           let prompt = this.alertCtrl.create({
               title: 'Edit Note',
               inputs: [{
                   name: 'title',
                   placeholder: "Title"


               },

               {
                   name: 'description',
                   placeholder: 'Description',

                     }
             ],
               buttons: [
                   {
                       text: 'Cancel'

                   },
                   {
                       text: 'Save',
                       handler: data => {
                           let index = this.items.indexOf(item);

                           if(index > -1){
                             this.items[index] = data;
                           }
                       }
                   }
               ]
           });

           prompt.present();

       }

       reorderItems(indexes){
           this.items = reorderArray(this.items, indexes);
       }

  }
