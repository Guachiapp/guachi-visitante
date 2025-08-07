
import { getParamURL, isValidUUIDv4 } from '../js/utils.js'

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

  try {
    await buscarVisitante(uuid);
  }
  catch (error) {
    flag_error = true
  }

  if (flag_error){
    //window.location.href = 'https://guachiapp.com/';
    window.location.href = '/guachi_e/';
  }
}

async function buscarVisitante(uuid) {
  try {
    const response = await fetch(`/api-centinela/acceso-visitantes/datos-complementarios/visitante/buscar/${uuid}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Datos del visitante:', data);
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
    if (error.isHttpError) {
      console.error('📡 Error del servidor:', error.message);
      if (error.payload) {
        console.error('Detalles:', error.payload);
      }
    } else {
      console.error('🌐 Error de conexión:', error.message);
    }
    throw error; // Re-lanzar si necesitas manejarlo en otro lugar
  }
}

/*
{
  "message": "Usuario no encontrado",
  "code": "USER_NOT_FOUND",
  "errors": ["El UUID proporcionado no existe"],
  "timestamp": "2025-08-07T10:30:00Z"
}*/

iniciar()