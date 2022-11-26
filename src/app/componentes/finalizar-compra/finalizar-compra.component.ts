import { Component, OnInit } from '@angular/core';
import { OrdenModel } from 'src/app/model/orden';
import { ProductoModel } from 'src/app/model/producto';
import { CarritoService } from 'src/app/servicios/carrito/carrito.service';
import { OrdenService } from 'src/app/servicios/orden/orden.service';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css']
})
export class FinalizarCompraComponent implements OnInit {
  orden = new OrdenModel();
  producto : ProductoModel= new ProductoModel();
  productos: ProductoModel[]=[]
  total:number = 0;
  deshabilitarFormario:boolean =false;
  metodoPago :string [] =  ['Efectivo','Paypal','Visa','Mastercard']
  cargando:boolean = false;
  compra_realizada= false;
  constructor(private _servicioCarrito: CarritoService,
              private _ordenService: OrdenService) {
    let key = localStorage.getItem('UYHGD%#YDBSJP(#U#UDNDY')
    this._servicioCarrito.obtenerCarrito(key?.replace(' ','')).subscribe((resp:any) =>{
         this.orden = Object.assign(this.orden,resp['orden'])
         this.calcularTotalResumen();
    })
   }

  ngOnInit(): void {
  }
  validarCampos(campo:any){
    console.log('etro aqi')
    if(campo ==='' || campo ===undefined || campo===null) return this.deshabilitarFormario=true;
    else  {
       
          return this.deshabilitarFormario=false;
    }  
  }
  pagar(){
   this.cargando = true;
   console.log(this.orden);
   this.orden.fechaOrden= new Date();
   this._ordenService.crearOrden(JSON.stringify(this.orden)).subscribe(resp=>{
   this.cargando= false;
   this.compra_realizada= true;
   })
  }
  actualizar(){
    this._servicioCarrito.actualizarListaCarrito(JSON.stringify(this.orden)).subscribe(resp=>{

    })
  }
  calcularTotalResumen(){
    this.total=0
    this.orden.elementos.forEach((elemento=>{
      this.total = this.total+ (Number(elemento.precio!)*Number(elemento.cantidadCompra!))
      console.log(this.total)
    
      
   }))
  }
}
