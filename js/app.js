const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const expresionRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListener();
function eventListener() {
    // cuando arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // reinicia formulario
    btnReset.addEventListener('click', resetearFormulario);

    formulario.addEventListener('submit', enviarEmail);
}


function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
    
}

// valida formulario
function validarFormulario(e) {
    
    if(e.target.value.length > 0) {
        // eliminamos los errores
        const error = document.querySelector('p.error');
        if(error) error.remove();


        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        
        if(expresionRe.test(e.target.value)) {

            const error = document.querySelector('p.error');
            if(error) error.remove();

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
            
        } else {

            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('El email no es válido');
            
        }
        
    }

    if(expresionRe.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
        
    } 
    
}

function mostrarError(mensaje) {
    
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    // formulario.insertBefore() para colocarlo de primero
    if(errores.length === 0) formulario.appendChild(mensajeError);
}
function enviarEmail(e) {
    e.preventDefault();
    
    // mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';

        // mensaje de enviado
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje fue enviado correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        formulario.insertBefore(parrafo, spinner);
        
        resetearFormulario();
        setTimeout(() => {
            parrafo.remove();
        }, 5000);
    }, 3000);
    
}

// resetear formulario
function resetearFormulario() {
    formulario.reset();
    iniciarApp();
}