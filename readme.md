# Tarea JS 2: Funciones Avanzadas

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=flat&logo=javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-green?style=flat&logo=github)](https://romagaco.github.io/tarea_js_2_funciones_avanzadas/)

¡Bienvenido a mi tarea sobre **funciones avanzadas en JavaScript**! Este proyecto demuestra el uso de conceptos como *higher-order functions* (map, filter, reduce), *closures*, *currying*, *promesas/async-await* y más, aplicados en 4 mini proyectos interactivos. Todo está desarrollado en **JavaScript vanilla (ES6+)**, con HTML/CSS mínimo para la interfaz.

El sitio web está desplegado en [GitHub Pages](https://romagaco.github.io/tarea_js_2_funciones_avanzadas/).

## 📋 Descripción

Esta tarea explora funciones avanzadas de JS para resolver problemas reales y divertidos:
- **Gestión de eventos y estado** con closures.
- **Manipulación de datos** con métodos de arrays funcionales.
- **Llamadas asíncronas** a APIs externas.
- **Lógica de juegos** con funciones puras y recursivas.

Los 4 mini proyectos son independientes, pero comparten un index.html principal que los enlaza.

## 🚀 Instalación y Ejecución Local

1. Clona el repositorio:
    git clone https://github.com/romagaco/tarea_js_2_funciones_avanzadas.git

2. Abre el archivo `index.html` en tu navegador (no requiere servidor, ya que usa JS vanilla).

3. O visita la versión en vivo: [romagaco.github.io/tarea_js_2_funciones_avanzadas](https://romagaco.github.io/tarea_js_2_funciones_avanzadas/).

**Requisitos:** Ninguno. Solo un navegador moderno (Chrome, Firefox, etc.).


## 🎮 Los Mini Proyectos

### 1. Busca Minas (Minesweeper)
**Descripción:** Un juego clásico de Minesweeper implementado con funciones avanzadas. Usa *closures* para encapsular el estado del tablero (evitando variables globales) y *reduce* para calcular victorias/derrotas. El tablero se genera dinámicamente con *map* y *flatMap*.

**Funciones clave usadas:**
- Closures para el timer y contadores de minas.
- `Array.prototype.map` y `filter` para generar y validar el tablero.
- Event listeners con funciones de orden superior.

**Cómo jugar:** Haz clic en celdas para revelar. ¡Evita las minas! Nivel principiante (8x8 con 10 minas).

**Demo:** [Juega aquí](https://romagaco.github.io/tarea_js_2_funciones_avanzadas/#busca-minas) (enlace interno).

### 2. Cat API
**Descripción:** Una app que consume la [The Cat API](https://thecatapi.com/) para mostrar imágenes aleatorias de gatos. Usa *async/await* para fetch asíncrono y *filter*/*reduce* para categorizar razas o votos. Incluye búsqueda por raza.

**Funciones clave usadas:**
- `fetch` con promesas y async functions.
- `Array.prototype.filter` para filtrar gatos por raza.
- `reduce` para contar votos o generar galerías.

**Interacciones:** Botón "Gato Aleatorio" o busca por raza. ¡Meow!

**Demo:** [Ver gatos](https://romagaco.github.io/tarea_js_2_funciones_avanzadas/#cat-api) (enlace interno).

### 3. [Nombre del Tercer Proyecto, e.g., "Gestor de Tareas con Reduce"]
**Descripción:** [Breve descripción: e.g., Una app para agregar/editar tareas usando reduce para sumar prioridades y map para renderizar la lista. Explora currying para validaciones reutilizables.]

**Funciones clave usadas:**
- [Lista: e.g., reduce para cálculos, curry para funciones personalizadas.]

**Demo:** [Enlace interno].

*(Actualiza esta sección con detalles reales del tercer proyecto.)*

### 4. [Nombre del Cuarto Proyecto, e.g., "Generador de Memes con Closures"]
**Descripción:** [Breve descripción: e.g., Un generador de memes que usa closures para templates dinámicos y higher-order functions para procesar texto/imágenes.]

**Funciones clave usadas:**
- [Lista: e.g., Closures para estado privado, forEach/map para UI updates.]

**Demo:** [Enlace interno].

*(Actualiza esta sección con detalles reales del cuarto proyecto.)*

## 🛠️ Tecnologías y Conceptos Cubiertos

| Concepto | Ejemplo de Uso | Proyecto |
|----------|----------------|----------|
| Closures | Encapsular estado del juego | Busca Minas |
| Higher-Order Functions (map/filter/reduce) | Procesar arrays de datos | Todos |
| Async/Await & Promesas | Llamadas a APIs | Cat API |
| Currying/Composición | Funciones reutilizables | [Proyecto 3/4] |
| Event Handling Funcional | Listeners sin side-effects | Todos |

## 🤝 Contribuciones

¡Si quieres sugerir mejoras o agregar features (como más niveles en Busca Minas), abre un issue o PR! Este es un proyecto educativo, pero abierto a ideas.

## 📄 Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE). Úsalo libremente para aprender.

## 🙏 Agradecimientos

- [The Cat API](https://thecatapi.com/) por las imágenes adorables.
- Documentación de MDN Web Docs para JS avanzado.

¡Gracias por revisar! Si tienes preguntas, contáctame en [roberdex26@gmail.com](mailto:roberdex26@gmail.com) o abre un issue.

---
*Desarrollado con ❤️ por [Romagaco](https://github.com/romagaco) en 2025.*