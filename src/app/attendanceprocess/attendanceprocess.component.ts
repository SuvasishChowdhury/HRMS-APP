import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DataService } from '../data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-attendanceprocess',
  templateUrl: './attendanceprocess.component.html',
  styleUrl: './attendanceprocess.component.css'
})
export class AttendanceprocessComponent {

  checkoutForm = this.formBuilder.group({
    fromDate: '',
    toDate: ''
  });
  constructor(private service: DataService,
    private formBuilder : FormBuilder
  ){}

  ngOnInit(): void{
  }
  onSubmit(): void {
    // Process checkout data here
    // this.items = this.service..clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
//   showPopup(Id : number){
//     this.matDialog.open(AttendanceprocessComponent, {
//         disableClose: true,
//         width: "1200px",
//         data: {
//           Title: "im vuong le - dev VietNam",
//           sepId:Id,
//           Message: "test-dialog"
//         },
//       })
//         .afterClosed()
//         .subscribe((result) => {
//           if (result == "Yes") {
            
//           }
//         });
// }

}
