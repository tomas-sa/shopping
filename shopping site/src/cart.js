let basket = JSON.parse(localStorage.getItem('data')) || []

function suma(){
    let carrito = document.getElementById('carrito-cantidad')
    carrito.innerHTML = basket.map(x => x.item).reduce((x,y) => x + y, 0)
}
suma()


let cartSection = document.getElementById('cartSection')
let notFound = document.getElementById('notFound')

function generador(){
    if(basket.length !== 0){
        cartSection.innerHTML = basket.map(x =>{
            let busqueda = articulos.find(y => y.id === x.id)
            return `
            <div class='cartItem'>
                <img style='width: 100px;' src='${busqueda.imagen}'>
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
                    <h2>Total: $${x.item * busqueda.precio}</h2>
                </div>
            </div>
            `
        }).join('')
    } else{
        cartSection.innerHTML = ``
        notFound.innerHTML = `
        <h2>Carrito vacio</h2>
        <a href='index.html'>
            <button id='backBtn' class='backBtn'>Volver al inicio</button>
        </a>
        `
    }
}
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
    localStorage.setItem('data', JSON.stringify(basket))
}

function actualizar(id){
    let search = basket.find(x=> x.id === id)
    document.getElementById(id).innerHTML = search.item
    suma()
}
generador()