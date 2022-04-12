import { Transferencia } from './../models/transferencia.model';
import { TransferenciaService } from './../services/transferencia.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss']
})
export class NovaTransferenciaComponent implements OnInit {

  valor:number = 0;
  destino:string = '';

  @Output() aoTransferir = new EventEmitter<any>();

  constructor(
    private transferenciaService:TransferenciaService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public transferir(): void {
    console.log('nova transferencia de R$:', this.valor, ' para a conta ', this.destino);
    const valorDeEmicao: Transferencia = {
      valor: this.valor,
      destino: this.destino
    }
    this.transferenciaService.adicionar(valorDeEmicao)
      .subscribe(
        resultado => {
          console.log('post -> ', resultado);
          this.limpaCampos();
          this.router.navigateByUrl('extrato');
        },
        error =>{
          console.log(error);
        }
      );
  }

  private limpaCampos(){
    this.valor = 0;
    this.destino = '';
  }
}
