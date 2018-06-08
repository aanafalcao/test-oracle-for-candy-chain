import { Component, OnInit } from '@angular/core';
import { HTTPrequestService } from '../services/httprequest.service';
import { TestCase } from '../interfaces/TestCase';

@Component({
  selector: 'problem-input',
  templateUrl: './problem-input.component.html',
  styleUrls: ['./problem-input.component.css'],
  providers: [HTTPrequestService]
})



export class ProblemInputComponent implements OnInit {

  private inputString: string;

  private haserror : boolean;
  private errorMessage : string;
  private connecting: boolean;
  private hasOutput: boolean;
  private output: string;

  constructor(private requestService: HTTPrequestService) { }

  ngOnInit() {
    this.haserror = false;
    this.connecting = false;
    this.hasOutput = false;
  }

  isString(strAux: string):boolean{
    for(var i = 0; i < strAux.length; i++){
      if(strAux[i] < 'a' || strAux[i] > 'z'){
        return false
      }
    }
    return true
  }

  isNumber(strAux: string):boolean{
    for(var i = 0; i < strAux.length; i++){
      if(strAux[i] < '0' || strAux[i] > '9'){
        return false
      }
    }
    return true
  }

  submit():void{

    var t: TestCase = {
      input: this.inputString
    };

    var error = 0
    var input_array = t.input.split('\n')

    this.haserror = false;
    this.hasOutput = false;
    if(input_array.length > 2){
      //check size of first chain
      if(input_array[0].length > 100){
        console.log("Candy chain to large")
        error = 1
        this.haserror = true;
        this.errorMessage = "Candy chain to large";
      }
      else{
        //check if chain is valid
        if(!this.isString(input_array[0])){
          error = 1
          console.log("Candy chain with invalid characters!") 
          this.haserror = true;
          this.errorMessage = "Candy chain with invalid characters!";
        }
        else{
          //check if C is a number
          if(!this.isNumber(input_array[1])){
            error = 1
            console.log("C number is invalid!")
            this.haserror = true;
            this.errorMessage = "C number is invalid!";
          }
          else{
            //check if C is valid
            var cAux = parseInt(input_array[1])
            if(cAux < 1 || cAux > 200){
              error = 1
              console.log("C number is out of range!")         
              this.haserror = true;
              this.errorMessage = "C number is out of range!";
            }
            else{
              //check if the number of childs is correct
              if(input_array.length - 2 == cAux){
                //for each child
                for(var i = 2; i < input_array.length; i++){
                  var child = input_array[i].split(' ')
                  //check if contains only chain and price
                  if(child.length != 2){
                    error = 1
                    console.log("Invalid child in line " + (i+1) + "!")

                    this.haserror = true;
                    this.errorMessage = "Invalid child in line " + (i+1) + "!";
                    break
                  }
                  else if(child[0].length == 0 || child[1].length == 0){
                    error = 1
                    console.log("Invalid child in line " + (i+1) + "!")

                    this.haserror = true;
                    this.errorMessage = "Invalid child in line " + (i+1) + "!";
                    break
                  }
                  else{
                    //check if is a valid chain
                    if(!this.isString(child[0])){
                      error = 1
                      console.log("Invalid child chain (not a string) in line " + (i+1) + "!")

                      this.haserror = true;
                      this.errorMessage = "Invalid child chain (not a string) in line " + (i+1) + "!";
                      break
                    }

                    //check if is a valid price
                    if(!this.isNumber(child[1])){
                      error = 1
                      console.log("Invalid child price (not a number) in line " + (i+1) + "!");

                      this.haserror = true;
                      this.errorMessage = "Invalid child price (not a number) in line " + (i+1) + "!";
                      break
                    }
                    else{
                      //check if the price is in a valid range
                      var priceAux = parseInt(child[1])
                      if(priceAux < 0 || priceAux > 1000000){
                        error = 1;
                        console.log("Invalid child price (out of range) in line " + (i+1) + "!");

                        this.haserror = true;
                        this.errorMessage = "Invalid child price (out of range) in line " + (i+1) + "!";
                        break
                      }
                    }
                  }
                }
              }
              else{
                error = 1
                console.log("Number of childs is different of the C number!")
                this.haserror = true;
                this.errorMessage = "Number of childs is different of the C number!";
                        
              }
            }
          }
        }
      }
    }
    else{
      error = 1
      console.log("Input is invalid!")

      this.haserror = true;
      this.errorMessage = "Input is invalid!";
    }
    
    console.log("Error: " + error)

    if(error == 0){
      this.connecting = true;
      this.requestService.newRequest(t).subscribe(
        data => {
          this.connecting = false;
          this.hasOutput = true;
          this.output = data;
          console.log(data);  
        }, 
        err =>  console.log("error")
      );
    }
  	
  }

}
