let basket = JSON.parse(localStorage.getItem('data')) || []

function suma(){
    let carrito = document.getElementById('carrito-cantidad')
    carrito.innerHTML = basket.map(x => x.item).reduce((x,y) => x + y, 0)
}
suma()


let cartSection = document.getElementById('cartSection')
let notFound = document.getElementById('notFound')
//************************* BURGER MENU ************************ */

const burger = document.getElementById('burger')
const aside = document.getElementsByClassName('discount')
burger.addEventListener('click', ()=>{
    aside[0].classList.toggle('mostrar')
})
//************************* MODAL COMPRA ************************ */


//************************* FUNCIONES ************************ */
function generador(){
    if(basket.length !== 0){
        cartSection.innerHTML = basket.map(x =>{
            let busqueda = articulos.find(y => y.id === x.id)
            return `
            <div class='cartItem'>
                <img style='height: 150px; width:100px; object-fit: contain; ' src='${busqueda.imagen}'>
                <div class='datosItem'>
                    <div class='upper'>
                        <p id='titulo'>${busqueda.nombre}</p>
                        <h3 class='precio'>$${busqueda.precio}</h3>
                    </div>
                    <div class="botones">
                        <i onclick='increment(${busqueda.id})' class="fa-solid fa-plus"></i>
                        <i id='${busqueda.id}' class='cantidad'>${x.item === undefined? 0: x.item}</i>
                        <i onclick='decrement(${busqueda.id})' class="fa-solid fa-minus"></i>
                    </div>
                    <p id='subtotal'>SUBTOTAL: $${x.item * busqueda.precio}</p>
                </div>
            </div>
            `
        }).join('')
        const discount = document.getElementById('discount')
        discount.innerHTML = `
        <form id='descuento-container'>
            <p class='header-descuento'>Agregar cupón</p>
            <input id='descontador' type="text"></input><br>
            <button type='submit' onclick='activarCupon()' class='activar-cupon'>activar</button>
        </form>
        <div id='container-carteles'>
            <p class='correcto'>cupón agregado</p>
            <p class='incorrecto'>cupón inválido</p>
        </div>
        `
    } else{
        document.getElementById('precioFinal').innerHTML = ''
        cartSection.innerHTML = ``
         discount.innerHTML = ``
        notFound.innerHTML = `
        <h2>Carrito vacio</h2>
        <a href='index.html'>
            <button id='backBtn' class='backBtn'>Volver al inicio</button>
        </a>
        `
    }
}
let cuponera = false

function activarCupon(e){
    const forma = document.getElementById('descuento-container')
    const textoCupon = document.getElementById('descontador')
    forma.addEventListener('click', e=>{
        e.preventDefault()
    })
    if(textoCupon.value === 'COMPRA123'){
        cuponera = true
        const cartelcorrecto = document.getElementsByClassName('correcto')
        const cartelIncorrecto = document.getElementsByClassName('incorrecto')
        cartelcorrecto[0].classList.add('activar')
        cartelIncorrecto[0].classList.remove('activar')

        // actualiza el precio final
        precioFinal()
    }else{
        const cartelIncorrecto = document.getElementsByClassName('incorrecto')
        const cartelcorrecto = document.getElementsByClassName('correcto')
        cartelcorrecto[0].classList.remove('activar')
        cartelIncorrecto[0].classList.add('activar')
    }
    textoCupon.value = ''
}


function precioFinal(){
    if(basket.length !== 0){
        let cantidad = basket.map(x=>{
            let busqueda = articulos.find(y => y.id === x.id)
            return x.item * busqueda.precio
        }).reduce((x,y)=> x + y, 0)
        const contenedorFinal = document.getElementById('precioFinal')
        if(cuponera === true){
        contenedorFinal.innerHTML = `
        <h2 id='resumen-compra'>resumen de compra</h2>
        <div id='total-container'>
            <h4>TOTAL:$ </h4> <br>
            <h4>$ ${cantidad - (cantidad * 0.30)}</h4>
        </div>
        <P id='ahorrando'>Estás ahorrando: $${parseInt(cantidad * 0.30)}</P>
        <button id='boton-pagar'>FINALIZAR COMPRA</button>
        `
        }else{
        contenedorFinal.innerHTML = `
        <h2 id='resumen-compra'>resumen de compra</h2>
        <div id='total-container'>
            <h4>TOTAL:</h4> <br>
            <h4>$ ${cantidad}</h4>
        </div>
        
        <button id='boton-pagar'>FINALIZAR COMPRA</button>
        `
        }
    }else return
}
precioFinal()

function increment(id){
    let selectedItem = id
    let search = basket.find(x => x.id === selectedItem)
    if(search === undefined){
        basket.push({
            id: selectedItem,
            item: 1,
        })
    }else{
        search.item ++
    }
    actualizar(selectedItem)
    generador()
    precioFinal()
    localStorage.setItem('data', JSON.stringify(basket))
}
function decrement(id){
    let selectedItem = id
    let search = basket.find(x => x.id === selectedItem)
    if(search === undefined) return
    else if(search.item === 0) return
    else{
        search.item --
    }
    actualizar(selectedItem)
    basket = basket.filter(x => x.item !== 0)
    generador()
    precioFinal()
    localStorage.setItem('data', JSON.stringify(basket))
}

function actualizar(id){
    let search = basket.find(x=> x.id === id)
    document.getElementById(id).innerHTML = search.item
    suma()
}
const btnPagar = document.getElementById('boton-pagar')
const modalCompra = document.getElementById('modalCompra')
console.log(btnPagar);
if(btnPagar){
btnPagar.addEventListener('click', ()=>{
    modalCompra.style.display = 'initial'
    localStorage.removeItem('data', JSON.stringify(basket))
    generador()
})}


generador()