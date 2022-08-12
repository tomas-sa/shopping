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
