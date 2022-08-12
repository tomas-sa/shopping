
window.addEventListener('DOMContentLoaded', ()=>{
    let basket = JSON.parse(localStorage.getItem('filtrado')) || []
    if(basket.find(x => x.sexo)){
        loader(basket)
    }else{
        loader(articulos)
    }
})

function loader(grupo){
    const container = document.querySelector('.articulos-contenedor')
    const arti = grupo.map(articulo =>{
        let busqueda = basket.find(x => x.id === articulo.id) || []
        return ` <div class="articulo">
        <img src="${articulo.imagen}" alt="">
        <div class="nombre">${articulo.nombre}</div>
        <div class="precio-contenedor">
            <div class="precio">$${articulo.precio}</div>
            <div class="botones">
                <i onclick='increment(${articulo.id})' class="fa-solid fa-plus"></i>
                <i id='${articulo.id}' class='cantidad'>${busqueda.item === undefined? 0: busqueda.item}</i>
                <i onclick='decrement(${articulo.id})' class="fa-solid fa-minus"></i>
            </div>
        </div>
    </div>`
    }).join('')
    container.innerHTML = arti
}

let basket = JSON.parse(localStorage.getItem('data')) || []

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
    
    localStorage.setItem('data', JSON.stringify(basket))
}

function actualizar(id){
    let search = basket.find(x=> x.id === id)
    document.getElementById(id).innerHTML = search.item
    suma()
}

function suma(){
    let carrito = document.getElementById('carrito-cantidad')
    carrito.innerHTML = basket.map(x => x.item).reduce((x,y) => x + y, 0)
}
suma()

//***************************** BOTONES ASIDE *********************** */

const filtro = document.querySelectorAll('.filtro')
filtro.forEach(x=>{
    x.addEventListener('click', () =>{
        if(x.id === 'todo'){
            loader(articulos)
        }else{
            const filtrado = articulos.filter(y=>{
            return y.sexo === x.id || y.categoria === x.id
        })
            loader(filtrado)
        }
    })
})
//***************************** PRELOADER *********************** */

const preloader = document.getElementById('preloader')
window.addEventListener('load', ()=>{
    preloader.style.display = 'none'
})

//***************************** RESPONSIVE MENU *********************** */

const burger = document.getElementById('menu')
const aside = document.querySelector('.aside')

burger.addEventListener('click', ()=>{
    aside.classList.toggle('activador-menu')
})