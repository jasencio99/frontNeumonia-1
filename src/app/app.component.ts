import { Component } from '@angular/core';
import { MedicineService } from './medicine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'web_front';
  selectedFile: File | undefined;
  imageUrl: any;
  result = false;
  status: any;
  statusd = false;
  data: any;
  payload: FormData = new FormData();
  porcentajeTrue: any;
  end: any;

  constructor(private apiService: MedicineService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const fileInput = event.target;

    if (this.selectedFile) {
      this.result = true;
      this.payload.append('imagen', this.selectedFile, this.selectedFile.name); 
    } else {
      this.result = false;
    }
    fileInput.value = '';
  }

  getImageDataUrl(file: File): string {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    return this.imageUrl; 
  }

  deletedFile(): void {
    if (this.selectedFile) {
      this.selectedFile = undefined;
      this.payload.delete('imagen'); 
      this.statusd = false
      this.imageUrl = ''
    } else {
    }
  }

  resultImg(): void {
    this.statusd = false; 
    this.apiService.getData(this.payload).subscribe((response) => {
      this.statusd = true;
      this.data = response;
      if (this.data.resultado.resultado === true){
        this.status = 'El paciente tiene un ';
        this.porcentajeTrue = this.data.resultado.confiabilidad_si;
        this.end = 'de tener neumonía'


      }else{
        this.status = 'El paciente tiene un ';
        this.porcentajeTrue = this.data.resultado.confiabilidad_no;
        this.end = 'de no tener neumonía '

      }
    }, error => {
        console.error('ERROR', error);
    });
  // }
 
  
}
  
  
}
