import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar,
    private zone: NgZone,) { }

  openSnackBar(message: string, action: string) {


    this._snackBar.open('test', 'close', { panelClass: 'positioned-snackbar', verticalPosition:'top',horizontalPosition:'center'});


    
  }

  error(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    this.zone.run(() => {
      this._snackBar.open(message, 'x', config);
    });
  }
}
