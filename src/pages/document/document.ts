import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera} from '@ionic-native/camera';
import { Flashlight } from '@ionic-native/flashlight';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ModalController } from 'ionic-angular';

import { ImagePage } from '../image/image';

@Component({
	selector: 'page-document',
	templateUrl: 'document.html'
})
export class DocumentPage {

	public text;
	private cameraOptions;

	constructor(
		public navCtrl: NavController,
		private camera: Camera,
		private flashlight: Flashlight,
		private textToSpeech: TextToSpeech,
		private modalController: ModalController) {

		this.cameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		};

	}

  	performSpeech(){
  		
  		this.textToSpeech.speak({ 
				text: this.text,
				rate: 1 
			}).then(() => { 
				console.log('Success!'); 
			}).catch((reason: any) => { 
				console.log(reason); 
			});
  	}
  	
  	performCamera(){

		this.flashlight.switchOn();
  		
  		/*
  		this.camera.getPicture(this.cameraOptions)
			.then(
				(imageData) => {

					let modal = this.modalController.create(ImagePage, { imageSrc: 'data:image/jpeg;base64,' + imageData });
    				modal.present();

    				//this.flashlight.switchOff();

				}, (err) => {

					alert(err);
					//this.flashlight.switchOff();
				}
			);
		*/
  	}
}
