import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        profileForm: this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          number: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
          acceptTerms: [false, Validators.requiredTrue]
      }, {
          validator: MustMatch('password', 'confirmPassword')
      }),
      numberAlias: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
    });
      console.log(this.registerForm.controls.profileForm);
  }

  get number() {
    return this.registerForm.get('numberAlias') as FormArray;
  }

  addNumber() {
    this.number.push(this.formBuilder.control(''));
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls.profileForm; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      localStorage.setItem('success', JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

}
