import { FormControl } from '@angular/forms';

export function colorPaletteValidator(control: FormControl) {
  const data = control.value;
  try {
    const colorPalette = JSON.parse(data);
    if (!(colorPalette instanceof Array)) {
      return {
        invalidFormat: {
          valid: false
        }
      };
    }
    if (colorPalette.length === 0) {
      return {
        invalidFormat: {
          valid: false
        }
      };
    } else {
      let validDataInArray = true;
      colorPalette.forEach(el => {
        if (!el.match(/^\#\d{3}$/) && !el.match(/^\#\d{6}$/)) {
          validDataInArray = false;
        }
      });
      if (!validDataInArray) {
        return {
          invalidFormat: {
            valid: false
          }
        };
      }
    }
  } catch (error) {
    return {
      invalidFormat: {
        valid: false
      }
    };
  }
  return null;
}
