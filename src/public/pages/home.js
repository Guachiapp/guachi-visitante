/*const btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", () => {
    //window.location.href = "#create";
    alert("Lorem ipsum");
});*/

function handleInventory() { 
    window.location.href = 'adm_login.htm';
} 

function handleCatalog() { 
    window.location.href = '#products';
} 

function handlePedidos() { 
    window.location.href = 'adm_login.htm';
}

function handleProveedores() { 
    window.location.href = 'adm_login.htm';
}

function handleAgenda() { 
    window.location.href = '#appointments';
}

function handleUsuariosExternos() { 
    window.location.href = 'login.htm';
}

function handleUsuariosInternos() { 
    window.location.href = 'adm_login.htm';
}

function handleUsuariosEncuestas() { 
    alert('Módulo 8: Encuestas. En desarrollo'); 
}

function handleUsuariosPagos() { 
    window.location.href = '#payment';
}

function handleUsuariosCorreo() { 
    alert('Extras: Notificaciones'); 
}

function handleUsuariosPaypal() { 
    alert('Extras: Pasarelas de pago'); 
}

const moduleActions = { 'inventario': handleInventory, 
    'catalogo': handleCatalog, 
    'pedidos': handlePedidos, 
    'proveedores': handleProveedores, 
    'agenda': handleAgenda, 
    'usuarios-externos': handleUsuariosExternos, 
    'usuarios-internos': handleUsuariosInternos, 
    'encuestas': handleUsuariosEncuestas, 
    'pagos': handleUsuariosPagos, 
    'correo': handleUsuariosCorreo, 
    'paypal': handleUsuariosPaypal, 
};

document.querySelectorAll('.module-preview').forEach(function(module) { 
    const moduleName = module.dataset.module;
    module.addEventListener('click', function() {
        if (moduleActions[moduleName]) {
            moduleActions[moduleName](); 
        } else { 
            alert('No hay acciones definidas para este módulo.'); 
        }
    });
});