Portafolio Personal - Javier Tobar Villagra
Portafolio web desarrollado con tecnologías puras. Diseño moderno, responsivo y modular.
Características
- Diseño con animaciones suaves
- Totalmente responsivo
- Vanilla JavaScript (sin frameworks)
- Arquitectura modular
- Cursor personalizado
- Órbita animada de tecnologías
Tecnologías
- HTML5 – estructura semántica
- CSS3 – estilos con Grid, Flexbox y animaciones
- JavaScript ES6+ – módulos nativos (.mjs)
Sin dependencias externas, 100% Vanilla Web.

Estructura:

portafolio/
├── index.html
├── css/
│   ├── styles.css
│   └── orbit.css
├── js/
│   ├── main.mjs
│   └── modules/
│       ├── orbit.mjs
│       ├── cursor.mjs
│       ├── animations.mjs
│       └── ...
└── assets/images/


Uso:
Para ejecutar los módulos ES6 necesitas un servidor local:
# Python
python -m http.server 8000

# Node.js
npx serve

# VS Code
Live Server extension


Abrir en: http://localhost:8000
Personalización
- Tecnologías → js/modules/orbit.mjs
- Velocidad → css/orbit.css (línea 37)
- Colores → css/styles.css (variables CSS)
Autor
Javier Tobar Villagra
- LinkedIn: javier-tobar-villagra
- GitHub: @javithorfinn
- Email: Javier.tobarvillagra@gmail.com

Desarrollado con HTML, CSS y JavaScript Vanilla
