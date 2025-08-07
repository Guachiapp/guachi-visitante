

document.addEventListener('DOMContentLoaded', () => {
  const contentDiv = document.getElementById('content');

  const routes = {
    '#home': { template: 'home.htm', script: 'home.js', style: 'home.css' },
    '#contact': { content: '<br><h2>Contacto</h2><br><p> Puedes contactarnos a traves del siguiente correo: ejemplo@correo.com</p><br><p> Teléfono: 0412-XXXYYYYY<p/><br>' },
    '#about': { template: 'about.htm', script: 'about.js', style: 'about.css' },
    '#login': { action: 'redirect', url: 'login.htm' },
    '#visitante-datos-complementarios': { template: 'visitante_campos_seguridad.htm', script: 'visitante_campos_seguridad.js', style: 'visitante_campos_seguridad.css' }
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
