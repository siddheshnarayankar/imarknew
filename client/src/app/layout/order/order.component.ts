import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CreateFieldsDialog } from './components/create-fields.component'
import { OrderService } from './order.service';
import { DeleteDialog, AlertService } from '../../shared';
import { Subject } from 'rxjs/Rx';

import * as jwtDecode from "jwt-decode";

import Swal from 'sweetalert2'


@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss'],
	animations: [routerTransition()]
})
export class OrderComponent implements OnInit {

	orderForm: FormGroup;
	options: any;
	dialogRef: any;
	numberPattern = "^[a-z0-9_-]{8,15}$";




	// fd: any = [
	// 	{
	// 		controlName: "Username",
	// 		controlType: "text",
	// 		valueType: "text",
	// 		placeholder: "Enter username",
	// 		validators: {
	// 			required: true,
	// 			minlength: 5
	// 		}
	// 	}
	// ];
	orders = [
		{ id: 1, name: 'First Name', state: false },
		{ id: 2, name: 'Last Name', state: false },
		{ id: 3, name: 'Gender', state: false },
		{ id: 4, name: 'blood Group', state: false },
		{ id: 5, name: 'Phone Number', state: false },

	];
	selectedOptions: any = [];
	dealerId: any;
	collegeDetails: any;
	curr_collegeId: any;
	isSave: boolean = false;
	title: any = 'College Order Create';
	toppings = new FormControl();
	toppingList: any = [
		{
			name: 'First Name', obj: {
				controlName: "FirstName",
				controlType: "text",
				valueType: "text",
				placeholder: "Enter First Name",
				validators: {
					required: true,
					minlength: 5
				}
			}
		},
		{
			name: 'Last Name', obj: {
				controlName: "LastName",
				controlType: "text",
				valueType: "text",
				placeholder: "Enter Last Name",
				validators: {
					required: true,
					minlength: 5
				}
			}
		},
		{
			name: 'Gender', obj: {
				controlName: "Gender",
				controlType: "select",
				valueType: "select",
				placeholder: "Select gender",
				validators: {
					required: true,
					minlength: 5
				},
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
			}
		},
		{
			name: 'Blood Group', obj: {
				controlName: "BloodGroup",
				controlType: "text",
				valueType: "text",
				placeholder: "Enter Blood Group",
				validators: {
					required: true,
					minlength: 5
				}
			}
		}

	];
	constructor(
		private _fb: FormBuilder,
		public dialog: MatDialog,
		private orderService: OrderService,
		private activateRoute: ActivatedRoute,
		private alertService: AlertService,
		private router: Router
	) {

		this.orderForm = this._fb.group({
			orgName: new FormControl('', Validators.required),
			orgAdd: new FormControl('', Validators.required),
			orgPhoneNumber: new FormControl(''),
			orgHODName: new FormControl(''),
			orgStdCount: new FormControl('', [Validators.required]),
			orderFields: new FormControl(''),
			orgIDLayout: new FormControl(''),
			orgURLPrfix: new FormControl(''),
			orgURLName: new FormControl(''),
			// orders: new FormArray([]),
			dealer_id: ''

		})
		//this.addCheckboxes();
	}


	selectedFields(Fields) {
		this.selectedOptions = [];
		this.selectedOptions = Fields;
		console.log(this.selectedOptions);
		//this.fd.push();
	}

	private addCheckboxes() {
		this.orders.map((o, i) => {
			console.log(i);
			const control = new FormControl(i === 0); // if first item set to true, else false
			(this.orderForm.controls.orders as FormArray).push(control);
		});

	}
	get f() { return this.orderForm.controls; }

	ngOnInit() {
		this.orderService.clearData();
		let curr_token = JSON.parse(localStorage.getItem('userInfo') || '{}');
		this.dealerId = curr_token.id;

		console.log(this.dealerId);

		// Get ID 
		this.activateRoute.params.subscribe(params => {

			this.curr_collegeId = params.id

			if (params.id) {

				this.isSave = true;
				this.title = "College Order Update";
				this.onOrderUpdate();
			}
			console.log(params.id, 'params');

		});




	}
	public hasError = (controlName: string, errorName: string) => {
		return this.orderForm.controls[controlName].hasError(errorName);
	}

	onOrderUpdate() {
		this.orderService.getDealerDetails(this.curr_collegeId).subscribe(
			resp => {
				this.collegeDetails = resp;

				console.log(this.collegeDetails, 'College Details');


				this.orderForm.controls['orgName'].setValue(this.collegeDetails[0].orgName);
				this.orderForm.controls['orgAdd'].setValue(this.collegeDetails[0].orgAdd);
				this.orderForm.controls['orgPhoneNumber'].setValue(this.collegeDetails[0].orgPhoneNumber);
				this.orderForm.controls['orgIDLayout'].setValue(this.collegeDetails[0].orgIDLayout);
				this.orderForm.controls['orgStdCount'].setValue(this.collegeDetails[0].orgStdCount);

				// this.dtTrigger.next();
			},
			error => this.alertService.error(error)
		);
	}
	// onChange(e, val) {
	// 	this.selectedOptions.push(val);



	// }

	onOrderFormUpdate(formData: FormGroup) {
		formData.controls['dealer_id'].setValue(this.dealerId);

		if (formData.valid) {

			this.orderService.edit(this.curr_collegeId, formData.value).subscribe(rsp => {
				if (rsp.status) {
					Swal.fire({
						title: '',
						text: 'Order Form Updated',
						type: 'success',
						showCancelButton: false,
						confirmButtonText: 'Ok'

					})
				}

			})
		}
		else {
			console.log('Not Valid', formData)

			this.alertService.errorValid('Enter Required Fields *');
		}
	}

	onOrderFormSubmit(formData: FormGroup) {
		//this.orderService.setData(this.selectedOptions);
		//this.selectedOptions = [];
		console.log(this.orderService.getData());
		if (formData.valid) {
			console.log(formData)
			formData.controls['orderFields'].setValue(this.selectedOptions);
			formData.controls['dealer_id'].setValue(this.dealerId);


			this.orderService.add(formData.value).subscribe(rsp => {

			})

			//console.log(formData.value)

			Swal.fire({
				title: '',
				text: 'Order Form Created',
				type: 'success',
				showCancelButton: false,
				confirmButtonText: 'Ok',
			}).then((result) => {
				setTimeout(() => {
					this.selectedOptions = [];
					this.router.navigate(['/dealer']);
				}, 0)
			})

		} else {
			console.log('Not Valid', formData)

			this.alertService.errorValid('Enter Required Fields *');
		}
		this.selectedOptions = [];
	}


	openDialog(data): void {
		this.dialogRef = this.dialog.open(CreateFieldsDialog, {
			width: '80vw',
			data: data
		});

		this.dialogRef.afterClosed().subscribe((result) => {
			console.log(result.event)
			// this.alertService.success(result.message);

			this.orderService.getData().map((item) => {
				debugger
				this.toppingList.push(item);
			})
			this.orderService.clearData();
			console.log(this.toppingList);

			// if (result.action == 'Add') {
			// 	 console.log(this.selectedOptions);
			// }

		});
	}
}
