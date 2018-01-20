import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

declare var Tesseract;

@IonicPage()
@Component({
  selector: 'page-image',
  templateUrl: 'image.html',
})
export class ImagePage {

	private imageSrc;

	constructor(
		//public navCtrl: NavController,
		public navParams: NavParams,
		private viewController: ViewController,
		private loadingController: LoadingController) {

		this.imageSrc = navParams.get('imageSrc');
	}

	analyzeImage(){

		let loading = this.loadingController.create({
    		content: 'Please wait...'
  		});

		loading.present();

		// update canvas, which is hidden in view
		var canvas= <HTMLCanvasElement> document.getElementById("canvas");
		var context = canvas.getContext("2d");
		var img = <HTMLImageElement> document.getElementById("img");
		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;
		context.drawImage(img, 0, 0, canvas.width, canvas.height);

		Tesseract.recognize(canvas)
		    .progress(message => {
		    	loading.setContent('Please wait... ' + message.status + ' (' + message.progress + ')');
		    }).then(result => {
		    	loading.dismiss();
		    	alert(result.text);
		    });
	}

	dismiss(){

		this.viewController.dismiss();
	}
}
