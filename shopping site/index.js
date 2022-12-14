/* const mujer = document.querySelector('.item-1')

const filtered = articulos.filter(x =>{
   return x.sexo === 'mujer'
})
mujer.addEventListener('click', ()=>{
    localStorage.setItem('filtrado', JSON.stringify(filtered))
}) */

const goShopping = document.querySelector('#goShopping')
goShopping.addEventListener('click', ()=>{
    localStorage.removeItem('filtrado')
})


const cover = document.querySelectorAll('.cover')
cover.forEach( item =>{
    item.addEventListener('click', ()=>{
        const filtered = articulos.filter(x =>{
        return x.sexo === item.id || x.categoria === item.id
    })
    localStorage.setItem('filtrado', JSON.stringify(filtered))
})
})

let basket = JSON.parse(localStorage.getItem('data')) || []
function suma(){
    let carrito = document.getElementById('carrito-cantidad')
    carrito.innerHTML = basket.map(x => x.item).reduce((x,y) => x + y, 0)
}
suma()

window.addEventListener('scroll', ()=>{
    const nav = document.querySelector('.nav')
    const logo = document.querySelector('#logo')
    const letras = document.querySelectorAll('.nav-dis')
    const altura = window.pageYOffset
    if(altura > 200){
        nav.style.backgroundColor = '#1f1f1f'
        logo.style.color = '#f1f1f1'
        letras.forEach(x=>{
            x.style.color = '#f1f1f1'
        })
    }else{
        nav.style.backgroundColor = '#f1f1f1'
        logo.style.color = '#1f1f1f'
        letras.forEach(x=>{
            x.style.color = '#1f1f1f'
        })
    }
})
//***************************** OFERTAS INDEX *********************** */
/* const ofertas = articulos.filter(x =>{
    return x.precio <= 60
}) */
/* const lista = []
for(let i = 0; i < 4; i++){
    lista.push(articulos[Math.floor(Math.random() * articulos.length)])
}
const descuentos =[]
for(let i = 0; i < 4; i++){
    descuentos.push(Math.random().toFixed(2))
}


const ofertasContainer = document.getElementById('ofertas-container')
const ofertasItems = lista.map(x=>{
    return `
    <div class="oferta-item">
        <img id='imagen-oferta' src="${x.imagen}" alt="">
        <p>${x.nombre}</p>
        <p class='precio-tachado'>$${x.precio}</p>
        <p class='precio-rebajado'>$${Math.floor(x.precio - (x.precio * descuentos[Math.floor(Math.random()) * descuentos.length +1]))}</p>
        <p></p>
    </div>
    `
}).join('')
ofertasContainer.innerHTML = ofertasItems

const tachado = document.getElementsByClassName('precio-tachado')
const rebajado = document.getElementsByClassName('precio-rebajado')
console.log(tachado[0]);
 */


//***************************** FUNCION CLIPBOARD *********************** */
function copiar(){
    const codigo = document.getElementById('codigo')
    navigator.clipboard.writeText(codigo.textContent)
}

//***************************** MODAL CUPON *********************** */
 const equis = document.querySelector('.fa-x')
 equis.addEventListener('click', ()=>{
    const modal = document.querySelector('.modal-cupon')
    modal.style.display = 'none'
 })

 //***************************** MENU BURGER *********************** */

 const burger = document.getElementById('burger')
 const listaNav = document.getElementsByClassName('lista-nav')
 burger.addEventListener('click', ()=>{
    listaNav[0].classList.toggle('mostrar')
 })