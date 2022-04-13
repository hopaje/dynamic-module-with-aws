import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  import { MIN_AGE } from '../preference';
  
  @ValidatorConstraint({ name: 'customText', async: false })
  export class MinAge implements ValidatorConstraintInterface {
    validate(date: string, args: ValidationArguments) {
      //Get Current Year
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      //Subtract by minimum age
      const minYear = currentYear - MIN_AGE;
      const minDate = new Date();
      minDate.setFullYear(minYear);
      //Convert Input to Date
      const dob = new Date(date);
      //Compare
      return minDate > dob;
    }
  
    defaultMessage(args: ValidationArguments) {
      return `Age must be ${MIN_AGE} or greater`;
    }
  }