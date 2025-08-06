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

document.addEventListener('DOMContentLoaded', () => {
  const contentDiv = document.getElementById('content');

  const routes = {
    '#home': { template: 'home.htm', script: 'home.js', style: 'home.css' },
    '#payment': { template: 'payment.htm', script: 'payment.js', style: 'payment.css' },
    '#products': { template: 'products.htm', script: 'products.js', style: 'products.css' },
    '#products-checkout': { template: 'products-checkout.htm', script: 'products-checkout.js', style: 'products-checkout.css' },
    '#products-invoice': { template: 'products-invoice.htm', script: 'products-invoice.js', style: 'products-invoice.css' },
    '#contact': { template: 'contact.htm', script: 'contact.js', style: 'contact.css' },
    '#contact2': { content: '<br><h2>Contacto</h2><br><p> Puedes contactarnos a traves del siguiente correo: ejemplo@correo.com</p><br><p> Teléfono: 0412-XXXYYYYY<p/><br>' },
    '#socials': { template: 'socials.htm', script: 'socials.js', style: 'socials.css' },
    '#about': { template: 'about.htm', script: 'about.js', style: 'about.css' },
    '#login': { action: 'redirect', url: 'login.htm' },
    '#admin': { action: 'redirect', url: 'adm_login.htm' },
    '#register': { template: 'register.htm', script: 'register.js', style: 'register.css' },
    '#register-confirm': { template: 'register-confirm.htm', script: 'register-confirm.js', style: 'register-confirm.css' },
    '#forgot': { template: 'forgot.htm', script: 'forgot.js', style: 'forgot.css' },
    '#forgot-confirm': { template: 'forgot-confirm.htm', script: 'forgot-confirm.js', style: 'forgot-confirm.css' },
    '#appointments': { template: 'appointments.htm', script: 'appointments.js', style: 'appointments.css' },
    '#appointments-hours': { template: 'appointments-hours.htm', script: 'appointments-hours.js', style: 'appointments-hours.css' },
    '#appointments-form': { template: 'appointments-form.htm', script: 'appointments-form.js', style: 'appointments-form.css' },
    '#table': { template: 'table.htm', script: 'table.js', style: 'table.css' },
  };
  

  function navigate() {
    let hash = window.location.hash || '#home';
    hash = (hash.includes("?")) ? hash.split("?")[0] : hash;
    console.log(`hash: ${hash}`);
    const route = routes[hash];
  
    if (!route) {
      showErrorPage(404);
      return;
    }

    if (route.action === 'redirect') {
      window.location.href = route.url;
      return;
    }

    if (route.template) {
      loadPage(route);
    } else {
      contentDiv.innerHTML = route.content || '<h1>404</h1><p>Página no encontrada.</p>';
    }
  }

  function loadPage(route) {
    fetch(`public/pages/${route.template}`)
      .then(response => response.text())
      .then(data => {
        contentDiv.innerHTML = data;
        injectResources(route);
      })
      .catch(error => {
        console.error('Error al cargar el content:', error);
        showErrorPage(404);
      });
  }

  function injectResources(route) {
    if (route.style) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `./public/pages/${route.style}`;
      contentDiv.appendChild(link);
    }

    if (route.script) {
      const script = document.createElement('script');
      script.src = `./public/pages/${route.script}?p=${new Date().getTime()}`;
      script.type = 'module';
      script.onload = () => { console.log(`${route.script} loaded`); };
      contentDiv.appendChild(script);
    }
  }

  function showErrorPage(code) {
    contentDiv.innerHTML = `<h1>${code}</h1><p>Página no encontrada.</p>`;
  }

  window.addEventListener('hashchange', navigate);
  navigate(); // Cargar contenido inicial
});
