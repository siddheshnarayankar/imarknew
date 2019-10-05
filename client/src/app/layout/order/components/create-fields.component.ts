import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from '../../../shared';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OrderService } from '../order.service';
import { TitleCasePipe } from '../titlecase.pipe'
@Component({
  selector: 'add-create-fields',
  templateUrl: './create-fields.component.html'
})
export class CreateFieldsDialog implements OnInit {
  action: string = 'Add';
  alert: string;
  formData: FormData;
  duplicateName: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  arrayItems: {
    id: number;
    title: string;
  }[];
  fields: any = [
    {
      controlName: "Username",
      controlType: "text",
      valueType: "text",
      placeholder: "Enter username",
      options: [
        {
          optionName: "Male",
          value: "male"
        },
        {
          optionName: "Female",
          value: "female"
        }
      ],
      validators: {
        required: "true",
        minlength: "5"
      }
    }
  ]
  typeList: any = [
    { name: 'Text', value: 'text' },
    { name: 'Date', value: 'date' },
    { name: 'Select', value: 'select' },
    { name: 'Radio', value: 'radio' },
    { name: 'Checbox', value: 'checkbox' },
  ]
  isOptions: boolean = false;

  validationsarr: any = [];
  islength: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CreateFieldsDialog>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // // private userService: UserService,
    public TitleCasePipe: TitleCasePipe,
    private orderService: OrderService,
    private _formBuilder: FormBuilder
  ) {
    this.firstFormGroup = this._formBuilder.group({
      fName: ['', Validators.required],
      fplaceholder: ['', Validators.required],
      fType: ['', Validators.required],
      itemRows: this._formBuilder.array([])
    });
    this.secondFormGroup = this._formBuilder.group({
      sValidator: ['', Validators.required],
      maxLength: [''],
      minLength: ['']
    });
  }
  ngOnInit() {



  }
  get formArr() {
    return this.firstFormGroup.get('itemRows') as FormArray;
  }
  initItemRows() {
    return this._formBuilder.group({
      // list all your form controls here, which belongs to your form array
      itemname: ['']
    });
  }
  addNewRow() {
    this.formArr.push(this.initItemRows());
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  // removeItem() {
  //   this.arrayItems.pop();
  //   this.demoArray.removeAt(this.demoArray.length - 1);
  // }

  selectedTypes(event: any) {
    console.log('selectedFields', event);
    this.validationsarr = [];

    switch (event) {
      case 'text': {
        //statements; 
        this.validationsarr = [
          { name: 'required', value: true },
          { name: 'length', value: 'length' },
        ]
        break;
      }
      case 'select': {
        //statements; 
        this.validationsarr = [
          { name: 'required', value: true }
        ]
        break;
      }
      case 'date': {
        this.validationsarr = [
          { name: 'required', value: true }
        ]
        break;
      }
      case 'checkbox': {
        this.validationsarr = [
          { name: 'required', value: true }
        ]
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
    if (event == 'select') {
      this.isOptions = true;
    } else {
      this.isOptions = false;
      this.formArr.reset;
      // this.formArr.removeAt()
      const farrlength = this.formArr.length;
      for (let i = 0; i < farrlength; i++) {
        let j = 0;
        this.formArr.removeAt(j);
        // i = 0;
      }
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }
  get f() { return this.firstFormGroup.controls; }
  inputCheck(val: any) {
     
    this.duplicateName = false;
    console.log(val.target.value);
    if (this.orderService.getData().length) {
      this.orderService.getData().map((item) => {
         
        let nameF = this.TitleCasePipe.transform(val.target.value);
        if (nameF == item.controlName) {
          this.firstFormGroup.controls['fName'].setErrors({ 'incorrect': true });
          this.duplicateName = true;
        }
      })
    } else {
       
      let arr = ['FirstName', 'LastName', 'Gender', 'BloodGroup']
      arr.map((item) => {
         
        let nameF = this.TitleCasePipe.transform(val.target.value);
        console.log(this.TitleCasePipe.transform(val.target.value))
        if (nameF == item) {
          this.firstFormGroup.controls['fName'].setErrors({ 'incorrect': true });
          this.duplicateName = true;
        }
      })
    }
  }
  first(fForm: any) {
     
    this.fields[0].controlName = this.TitleCasePipe.transform(fForm.value.fName);
    this.fields[0].controlType = fForm.value.fType,
      this.fields[0].valueType = fForm.value.fType,
      this.fields[0].placeholder = fForm.value.fplaceholder

    if (fForm.fType == 'select') {
      this.fields[0].options.push(fForm.itemRows)
    }
    console.log(fForm.value);
    console.log(this.fields);
  }
  second(sForm: any) {
    //console.log(sForm.value);
    console.log(this.fields);
    this.fields[0].validators.required = sForm.value.sValidator[0];
    this.fields[0].validators.minlength = sForm.value.minLength;;
    this.fields[0].validators.maxlength = sForm.value.maxLength;
debugger
    console.log(this.fields);
    let obj = [];
    this.fields.map((item) => {
      debugger
      obj = [{ name: this.fields[0].controlName, obj: item }]
    })

    this.orderService.setData(obj);
    debugger
    obj = [];
    this.fields =[];
    this.dialogRef.close({ event: true });
  }
  selectedValidations(event: any) {
    console.log(event);
    this.islength = false;
    event.forEach(element => {
      if (element == 'length') {
        this.islength = true;
      }
    });
  }
}