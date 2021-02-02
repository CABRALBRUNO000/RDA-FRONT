import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataIdade'
})
export class DataIdadePipe implements PipeTransform {

  transform(dataNasc: string): string {
   
  let dataAtual= new Date()
  let anoAtual = dataAtual.getFullYear();
  if (!dataNasc) return '';
  let anoNascEmParts = dataNasc.split('-')
  let diaNasc = anoNascEmParts[2]
  let mesNasc = anoNascEmParts[1]
  let anoNasc = anoNascEmParts[0]
  let anoNascNunber = parseInt(anoNasc)
  let idade = anoAtual - anoNascNunber
  let mesAtual = dataAtual.getMonth() + 1; 
  
  // transformando string em numetros 
  let mesNasclNumber = parseInt(mesNasc)
  

  


   //Se mes atual for menor que o mes de nascimento, nao fez aniversario ainda;  
    if(mesAtual < parseInt(anoNasc)){
      
      idade --
    }else{
      //Se estiver no mes do nascimento, verificar o dia
      if(mesAtual == parseInt(mesNasc)){
        if(new Date().getDate() < parseInt(diaNasc)){
          //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
          idade--; 
        }
      }
    }
   

     return idade.toString() + ' anos';
  }

}
