function getParamURL(name) {
  //return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

function setearLocalStorage(clave, valor) {
  if (typeof valor === 'object') {
    localStorage.setItem(clave, JSON.stringify(valor));
  } else {
    localStorage.setItem(clave, valor);
  }
}

function obtenerLocalStorage(clave) {
  const valor = localStorage.getItem(clave);
  try {
    return JSON.parse(valor);
  } catch (e) {
    return valor;
  }
}

function isValidUUIDv4(uuid) {
  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidV4Regex.test(uuid);
}

export { getParamURL, setearLocalStorage, obtenerLocalStorage, isValidUUIDv4 }