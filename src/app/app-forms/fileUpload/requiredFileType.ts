import { FormControl } from '@angular/forms';
import { FileImageModel } from 'src/app/shared/fileImage.model';

export function requiredFileTypeImg() {
  return function (control: FormControl) {
    if (control.value) {
      const fileField = control.value;
      // console.log(fileField.file);
      let validationsExtensions = [];

      [].slice.call(fileField).forEach((element, index) => {
        if (!element.name.match(/\.(jpg|jpeg|png|gif)$/)) {
          // se or arquivo tiver extenção de imagens a variavel validationExtensions recebe true se não recebe false
          validationsExtensions[index] = false;
        } else {
          validationsExtensions[index] = true;
        }
      });
      if (validationsExtensions.indexOf(false) > -1) {
        return {
          requiredFileType: true,
        };
      }

      return null;
    }
  };
}
