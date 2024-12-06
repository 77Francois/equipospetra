document.getElementById("formRegister").addEventListener("submit", function(event) {
    event.preventDefault(); // Evito que se envíe el formulario inmediatamente
  
    // Seleccionar todos los campos
    var nombre = document.getElementById("campo-nombre");
    var apellido = document.getElementById("campo-apellido");
    var dni = document.getElementById("campo-dni");
    var email = document.getElementById("campo-email");
    var pais = document.getElementById("pais");
    var zona = document.getElementById("zona");
    var terminos = document.getElementById("term-cond");
  
    // Borrar mensajes de error previos
    var errorElements = document.querySelectorAll(".error");
    errorElements.forEach(function(errorElement) {
        errorElement.textContent = "";
    });
  
    // Validar campos
    var valid = true;
  
    if (!nombre.value) {
        document.getElementById("campo-nombre").nextElementSibling.textContent = "Por favor, ingrese su nombre";
        valid = false;
    }
    if (!apellido.value) {
        document.getElementById("campo-apellido").nextElementSibling.textContent = "Por favor, ingrese su apellido";
        valid = false;
    }
    if (!fecha.value) {
        document.getElementById("campo-dni").nextElementSibling.textContent = "Por favor, ingrese su DNI";
        valid = false;
    }
    if (!email.value) {
        document.getElementById("campo-email").nextElementSibling.textContent = "Por favor, ingrese su e-mail";
        valid = false;
    }
    if (!pais.value) {
        document.getElementById("pais").nextElementSibling.textContent = "Por favor, seleccione su país de residencia";
        valid = false;
    }
    if (!barrio.value) {
        document.getElementById("zona").nextElementSibling.textContent = "Por favor, seleccione su zona";
        valid = false;
    }
    
    if (!terminos.checked) {
        document.getElementById("error-re-password").textContent = "Debe aceptar los términos y condiciones";
        valid = false;
    }
  
    // Si todos los campos son válidos
    if (valid) {
        Swal.fire({
            icon: 'success',
            iconColor: 'rgb(47, 7, 47)',
            title: 'Excelente!',
            text: 'Te has registrado exitosamente!!!',
            timer: 3500,
        }).then(() => {
            // Enviar el formulario
            event.target.submit();
        });
    }
  });           
  /***************************************************************este codigo queda sin usar**************************************************************************/