document.addEventListener('DOMContentLoaded', function(){
    const inputNombre = document.querySelector('#campo-nombre');
    const inputApellido = document.querySelector('#campo-apellido');
    const inputDni = document.querySelector('#campo-dni');  // DNI
    const inputEmail = document.querySelector('#campo-email');
    const inputPais = document.querySelector('#pais');
    const inputZona = document.querySelector('#zona'); // zona
    const checkboxTerminos = document.querySelector('#term-cond'); // Agregamos el checkbox de aceptar términos y condiciones
    const formRegister = document.querySelector('#formRegister');  //guarde la etiqueta formRegister dentro de la variable

    var valid = true;

    //asignacion de eventos
    inputNombre.addEventListener('blur', validar);
    inputApellido.addEventListener('blur', validar);
    inputDni.addEventListener('blur', validar); // DNI
    inputEmail.addEventListener('blur', validar);
    
    
    

    function validar(e) {  //la e tiene info del evento y del elemento que dispara el evento

        limpiarAlerta(e.target.parentElement);
        
        if(e.target.value.trim() === "") {  //me aseguro de no tener el campo vacio
        
            if(e.target.id === "campo-nombre"){
                var campo = "nombre";
                // mostrarAlerta(`<span style="color: green;">El campo ${campo} es obligatorio</span>`, e.target.parentElement);
                var mensaje = `<span style="color: violet;">El campo ${campo} es obligatorio</span>`;  //nueva version para probar las validaciones 
                document.getElementById("error-nombre").innerHTML = mensaje;
                valid = false;
            } else if(e.target.id === "campo-apellido"){
                var campo = "apellido";
                // mostrarAlerta(`<span style="color: green;">El campo ${campo} es obligatorio</span>`, e.target.parentElement);
                var mensaje = `<span style="color: violet;">El campo ${campo} es obligatorio</span>`;  //nueva version para probar las validaciones 
                document.getElementById("error-apellido").innerHTML = mensaje;
                valid = false;
            } else if(e.target.id === "campo-dni"){
                var campo = "dni";
                // mostrarAlerta(`<span style="color: green;">El campo ${campo} es obligatorio</span>`, e.target.parentElement);
                var mensaje = `<span style="color: violet;">El campo ${campo} es obligatorio</span>`;  //nueva version para probar las validaciones 
                document.getElementById("error-dni").innerHTML = mensaje;
                valid = false;
            } else if(e.target.id === "campo-email"){
                var campo = "email";
                // mostrarAlerta(`<span style="color: green;">El campo ${campo} es obligatorio</span>`, e.target.parentElement);
                var mensaje = `<span style="color: violet;">El campo ${campo} es obligatorio</span>`;  //nueva version para probar las validaciones 
                document.getElementById("error-email").innerHTML = mensaje;
                valid = false;
            }else if(!checkboxTerminos.checked){
                mostrarAlerta(`<span style="color: violet;">El campo terminos y condiciones es obligatorio</span>`, e.target.parentElement);
                valid = false;
            }
            

            
            
        } 
        
        function validarNombre(){
            const nombre = inputNombre.value.trim(); // Obtener el valor de input de nombre
            const val = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // valores de validacion /^[a-zA-ZÀ-ÿ\s]{1,40}$/
            return val.test(nombre); 
        }
        function validarApellido(){
            const apellido = inputApellido.value.trim();
            const val = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;   // /^[a-zA-ZÀ-ÿ\s]{1,40}$/
            return val.test(apellido); 
        }
        function validarDni(){
            const dni = inputDni.value.trim();
            const val = /^\d{7,8}$/; // tengo que conseguir la validacion de DNI
            return val.test(dni); 
        }
        function validarEmail(){
            const email =  inputEmail.value.trim();
            const val = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            return val.test(email); 
        }
        
        if(e.target.id === "campo-nombre" && !validarNombre() &&  e.target.value.trim() !== ""){
            limpiarAlerta(e.target.parentElement);
            // mostrarAlerta(`<span style="color: red;">Ingrese un nombre valido</span>`, e.target.parentElement);
            var mensaje = `<span style="color: red;">Ingrese un nombre valido</span>`;
            document.getElementById("error-nombre").innerHTML = mensaje;
        }
        if(e.target.id === "campo-apellido" && !validarApellido() &&  e.target.value.trim() !== ""){
            limpiarAlerta(e.target.parentElement);
            // mostrarAlerta(`<span style="color: red;">Ingrese un apellido valido</span>`, e.target.parentElement);
            var mensaje = `<span style="color: red;">Ingrese un apellido valido</span>`;
            document.getElementById("error-apellido").innerHTML = mensaje;
       }
       if(e.target.id === "campo-dni" && !validarDni() &&  e.target.value.trim() !== ""){
        limpiarAlerta(e.target.parentElement);
        // mostrarAlerta(`<span style="color: red;">Ingrese un dni valido</span>`, e.target.parentElement);
        var mensaje = `<span style="color: red;">Ingrese un DNI valido</span>`;
        document.getElementById("error-dni").innerHTML = mensaje;
   }
        // if(e.target.id === 'campo-fecha' && !validarFecha)  para este campo no es necesario
        if(e.target.id === "campo-email" && !validarEmail() &&  e.target.value.trim() !== ""){
            limpiarAlerta(e.target.parentElement);
            var mensaje = `<span style="color: red;">Ingrese un email valido</span>`;
            document.getElementById("error-email").innerHTML = mensaje;
        }
        if(e.target.id === "term-cond"){
            limpiarAlerta(e.target.parentElement);
            if(!checkboxTerminos.checked){
                mostrarAlerta('Debe aceptar los terminos y condiciones', e.target.parentElement); 
            }   // no se ve que lo haga
        }

       
        
        // Evento clic en el botón de registro
        formRegister.addEventListener('submit', function(event) {
            event.preventDefault();
            if(validarNombre() && validarApellido() && validarDni() && validarEmail() && checkboxTerminos.checked){
                valid = true;
                mostrarMensajeExito();
            }else {
                valid = false;
                mostrarMensajeError();
                
                
            }
        });
        limpiarAlerta(e.target.parentElement);
        return;
    }
    
    
    function mostrarAlerta(mensaje, elementoPadre) {   
        // Limpiar alerta anterior si existe
        limpiarAlerta(elementoPadre);
    
        // Crear elemento para el mensaje
        var alerta = document.createElement('span');
        
        // Establecer el mensaje HTML
        alerta.innerHTML = mensaje;
        
        // Agregar clases al elemento
        alerta.classList.add('text-green');
        // Insertar el mensaje en el elemento padre
        elementoPadre.appendChild(alerta);
        return;
    }

    function limpiarAlerta(referencia){
        // compruebo si existe alguna alerta
        const alerta = referencia.querySelector('.text-green')
        if(alerta){
            alert.remove();
        }
        return;
    }
    function mostrarMensajeExito(){
        Swal.fire({
            icon: 'success',
            iconColor: 'rgb(47, 7, 47)',
            title: 'Excelente!',
            text: 'Te has registrado exitosamente!!!',
            timer: 3500,
            showConfirmButton: true, // Muestra el botón de confirmación
        })//.then(() => {
           // formRegister.submit();
        //}); elimine esta parte porque el mensje pasaba tan rapido que no podia verse
        return;
    }
    function mostrarMensajeError(){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal!",
          footer: '<a href="#">Hay campos incompletos</a>',
          showConfirmButton: true, // Muestra el botón de confirmación
        });
        return;
    }
    return;
    
});