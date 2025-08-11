
import { getParamURL, isValidUUIDv4 } from '../js/utils.js'

const URL  = '/api-centinela/acceso-visitantes/datos-complementarios/visitante';

async function iniciar() {
  const uuid = getParamURL('uuid');
  console.log(`uuid: ${uuid}`);
  let flag_error = false;
  if (!uuid) {
    console.error('Falta el parámetro uuid');
    flag_error = true;
  } else if (!isValidUUIDv4(uuid)) {
    console.error('UUID inválido o mal formado');
    flag_error = true
  }
  
  let campos_seguridad = [];
  const resultado = await obtenerDatosVisitante(uuid);

  if (resultado) {
    const { datos_visitante, campos_seguridad } = resultado;
    generarFormulario(datos_visitante.visita_id, campos_seguridad);
  }

  
}

async function obtenerDatosVisitante(uuid) {
  let flag_error = false;
  let campos_seguridad = null;

  try {
    const datos_visitante = await buscarVisitante(uuid);
    console.log('Datos del visitante:', datos_visitante);

    campos_seguridad = await buscarCamposSeguridad(
      datos_visitante.tipo_visitante_id,
      datos_visitante.condominio_id
    );
    console.log('Datos campos de seguridad:', campos_seguridad);

    return { datos_visitante, campos_seguridad };

  } catch (error) {
    if (error.isHttpError) {
      console.error('📡 Error del servidor:', error.message);
      if (error.payload) {
        console.error('Detalles:', error.payload);
      }
      if (error.status >= 500 && error.status < 600) {
        console.error(`🔁 Redirigiendo por error ${error.status}...`);
        window.location.href = '/guachi_e/50x.htm';
        return null;
      }
    } else {
      console.error('🌐 Error de conexión:', error.message);
    }
    flag_error = true;
  }

  if (flag_error) {
    // window.location.href = 'https://guachiapp.com/';
    window.location.href = '/guachi_e/';
  }

  return null;
}


async function buscarVisitante(uuid) {
  try {
    const response = await fetch(`${URL}/buscar/${uuid}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Intentar leer payload JSON
      let errorData = null;
      try {
        errorData = await response.json();
      } catch {}

      const error = new Error(errorData?.message || `Error HTTP: ${response.status}`);
      error.isHttpError = true;
      error.status = response.status;
      error.payload = errorData;
      throw error;
    }

  } catch (error) {
    throw error; // Re-lanzar si necesitas manejarlo en otro lugar
  }
}

async function buscarCamposSeguridad(tipo_visitante_id, condominio_id) {
  try {
    const response = await fetch(`${URL}/campos-seguridad?tipo_visitante_id=${tipo_visitante_id}&condominio_id=${condominio_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Intentar leer payload JSON
      let errorData = null;
      try {
        errorData = await response.json();
      } catch {}

      const error = new Error(errorData?.message || `Error HTTP: ${response.status}`);
      error.isHttpError = true;
      error.status = response.status;
      error.payload = errorData;
      throw error;
    }

  } catch (error) {
    throw error; // Re-lanzar si necesitas manejarlo en otro lugar
  }
}

function generarFormulario(visita_id, campos_seguridad){
  const form = document.getElementById('form-seguridad');

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'visita_id';
  input.value = visita_id;
  form.appendChild(input);

  campos_seguridad.forEach(campo => {
    const wrapper = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = campo.campo_seguridad;
    label.setAttribute('for', `campo-${campo.campos_seguridad_id}`);

    let input;
    if (campo.tipo_dato === 'img') {
      input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
    } else {
      input = document.createElement('input');
      input.type = 'text';
    }    
    input.id = `campo-${campo.campos_seguridad_id}`;
    input.name = `campo_${campo.campos_seguridad_id}`;
    input.setAttribute('data-tipo', campo.tipo_dato);
    input.required = true;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    form.appendChild(wrapper);
  });
}

function cargarEventos() {
  document.getElementById('form-seguridad').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío real

    const MAX_FILE_SIZE = 1048576 * 10; // 1 MB en bytes
    let archivosValidos = true;

    const form = e.target;
    const formData = new FormData(form);

    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.name) {
        if (value.size > MAX_FILE_SIZE) {
          console.error(`❌ El archivo "${value.name}" excede el tamaño permitido (${(value.size / (1024 * 1024)).toFixed(2)} MB)`);
          alert(`El archivo "${value.name}" supera el límite de 10 MB. Por favor selecciona uno más liviano.`);
          archivosValidos = false;
          break;
        }
      }
    }

    if (!archivosValidos) return; 

    const visita_id = formData.get('visita_id');
    const campos_seguridad = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith('campo_')) {
        const id = parseInt(key.replace('campo_', ''), 10);

        // Recuperar el tipo_dato desde el atributo data-tipo
        const inputElement = form.querySelector(`[name="${key}"]`);
        const tipo_dato = inputElement?.getAttribute('data-tipo') || 'string';

        // Construir el campo
        campos_seguridad.push({
          campo_seguridad_id: id,
          tipo_dato,
          valor: tipo_dato === 'img' ? {} : value
        });

        // Adjuntar archivo si es tipo img y tiene contenido
        if (tipo_dato === 'img' && value instanceof File && value.name) {
          formData.append(`archivo_${id}`, value);
        }
      }
    }

    // Construir el payload JSON
    const payload = {
      visita_id: parseInt(visita_id, 10),
      campos_seguridad
    };

    // Adjuntar el JSON como string
    formData.append('payload', JSON.stringify(payload));

    // Log defensivo
    console.log('📦 FormData listo para enviar:', payload);

    // Enviar al backend
    //fetch('/api/registro', {
    //  method: 'POST',
    //  body: formData
    //});
  });
}


/*
{
  "message": "Usuario no encontrado",
  "code": "USER_NOT_FOUND",
  "errors": ["El UUID proporcionado no existe"],
  "timestamp": "2025-08-07T10:30:00Z"
}*/

iniciar();
cargarEventos();