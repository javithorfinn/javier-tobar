#  Cara Rondando - Mascota de Escritorio

Una adorable aplicación que hace que la cara de tu pareja "ronde" por toda la pantalla de tu computadora como una mascota virtual.

##  Características

- **Siempre visible**: La imagen aparece sobre todas las aplicaciones
- **Múltiples modos de movimiento**:
  -  **Rebote**: Rebota en los bordes de la pantalla
  -  **Flotante**: Movimiento suave y ondulante
  -  **Seguir mouse**: Sigue el cursor cuando está lejos
  -  **Espiral**: Movimiento en espiral desde el centro
- **Interactivo**: Responde a clicks y se puede arrastrar
- **Cambio automático**: Los modos cambian automáticamente cada 30 segundos
- **Transparente**: Fondo transparente para máxima inmersión

##  Controles

| Acción | Resultado |
|--------|-----------|
| **Click izquierdo** | Cambiar modo de movimiento manualmente |
| **Doble click** | Teletransporte a posición aleatoria |
| **Click derecho** | Mostrar opción de cierre (click derecho otra vez para cerrar) |
| **Arrastrar** | Mover la imagen manualmente |

##  Instalación y Uso

### Paso 1: Instalar dependencias
```batch
# Ejecuta este archivo para instalar las dependencias
instalar_dependencias.bat
```

### Paso 2: Ejecutar la aplicación
```batch
# Ejecuta este archivo para iniciar Cara Rondando
ejecutar.bat
```

### O manualmente:
```bash
python cara_rondando.py
```

##  Requisitos

- **Python 3.6+** instalado en el sistema
- **Pillow** para manejo de imágenes (se instala automáticamente)
- **Windows** (optimizado para Windows, pero funciona en otros sistemas)

##  Estructura del Proyecto

```
Cara-rondando/
├── CaraMiau.jpg.png          # Tu imagen (puede ser cualquier formato)
├── cara_rondando.py          # Aplicación principal
├── instalar_dependencias.bat # Script de instalación
├── ejecutar.bat              # Script de ejecución
└── README.md                 # Este archivo
```

##  Personalización

### Cambiar la imagen
- Reemplaza `CaraMiau.jpg.png` con cualquier imagen
- Formatos compatibles: PNG, JPG, JPEG, GIF, BMP
- La imagen se redimensiona automáticamente a 100x100 píxeles

### Modificar comportamiento
Puedes editar `cara_rondando.py` para ajustar:
- **Velocidad**: Cambia los valores en `velocity_x` y `velocity_y`
- **Tamaño**: Modifica `window_width` y `window_height`
- **Tiempo de cambio**: Ajusta el valor `30` en la función `update_position`

##  Solución de Problemas

### La aplicación no inicia
1. Verifica que Python esté instalado: `python --version`
2. Ejecuta `instalar_dependencias.bat`
3. Asegúrate de que la imagen esté en la carpeta

### La imagen no aparece
1. Verifica que el archivo de imagen esté presente
2. Asegúrate de que el formato sea compatible
3. Si no hay imagen, aparecerá un corazón  por defecto

### La aplicación se cierra inesperadamente
- Ejecuta desde la consola para ver mensajes de error:
  ```bash
  python cara_rondando.py
  ```

##  Funciones Avanzadas

### Inicio automático con Windows
Para que se ejecute al iniciar Windows:
1. Presiona `Win + R`, escribe `shell:startup`
2. Crea un acceso directo a `ejecutar.bat` en esa carpeta

### Ejecutar en segundo plano
La aplicación está diseñada para ser discreta pero siempre visible. Si quieres que sea completamente invisible en la barra de tareas, puedes modificar el código.

##  Disfruta

¡Ahora la cara de tu pareja estará siempre contigo rondando por tu pantalla!

---

**Creado con amor<3> para mantener a tu ser querido siempre cerca**