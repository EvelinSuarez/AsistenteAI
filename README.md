Gestión de Asistentes IA

Este proyecto es una plataforma interactiva para crear, gestionar y entrenar agentes de inteligencia artificial personalizados. Permite configurar la personalidad, el tono y el conocimiento de diferentes asistentes utilizando una interfaz moderna y fluida.

Instrucciones para correr el proyecto:

1- Clonar el repositorio:

git clone <url-del-repositorio>
cd <nombre-de-la-carpeta>

2- Instalar dependencias:

npm install
# o
yarn install

3- Ejecutar el servidor de desarrollo:

npm run dev
# o
yarn dev

4- Abrir en el navegador:
Ve a http://localhost:3000 para ver la aplicación funcionando.


🛠 Decisiones Técnicas
Next.js 14 (App Router): Se eligió por su sistema de rutas intuitivo y su excelente rendimiento. El uso de use client se limitó a los componentes de interacción para mantener un buen equilibrio.

Tailwind CSS: Utilizado para el estilado por su velocidad de desarrollo y para garantizar un diseño "Pixel Perfect" basado en una estética moderna (Clean UI / SaaS Style).

LocalStorage para Persistencia: Dado que el requerimiento se centraba en la funcionalidad del frontend, opté por localStorage para persistir los datos de los asistentes y sus entrenamientos sin necesidad de configurar una base de datos externa, facilitando la revisión inmediata del proyecto.

Lucide React: Para una iconografía consistente, ligera y profesional.

SweetAlert2: Implementado para mejorar la experiencia de usuario (UX) en confirmaciones de borrado y notificaciones de guardado con una estética superior a los alerts nativos.

Características Implementadas
Página de Gestión: Visualización de asistentes mediante cartas interactivas con gradientes dinámicos.

CRUD Completo: Creación, edición y eliminación de asistentes en tiempo real.
Laboratorio de Entrenamiento: Panel especializado para cada asistente donde se pueden configurar:
Instrucciones de sistema (Prompt Engineering).
Parámetros de creatividad (Temperatura).
Selección de modelo de lenguaje.

Simulador de Chat: Una interfaz de chat integrada para probar los cambios del entrenamiento al instante con respuestas simuladas.

Diseño Responsive: Optimizado para pantallas grandes (escritorio) y dispositivos móviles.

Priorización: ¿Qué se dejó fuera y por qué?
Debido al tiempo disponible y para asegurar la estabilidad de las funciones principales, se priorizaron ciertos aspectos:
Backend Real: Se dejó fuera la integración con una base de datos real (como PostgreSQL o MongoDB) y autenticación. Razón: El foco principal era demostrar habilidades de UI/UX y manejo de estado en el frontend.
Subida de Archivos Real: En la sección de "Conocimiento", el botón es funcional a nivel de UI pero no procesa archivos. Razón: El procesamiento de PDFs/Textos para embeddings requiere un backend robusto con servicios de Vector Database que excedían el alcance de esta prueba técnica.

Integración Real con OpenAI/Claude: El chat utiliza una simulación de respuesta. Razón: Evitar el manejo de API Keys sensibles y costos asociados durante la revisión, aunque el código está estructurado para conectar un endpoint fácilmente.

Tiempo aproximado de dedicación
Planificación y Estructura de Datos: 20  minutos.
Desarrollo del Dashboard y CRUD: 1 horas.
Desarrollo del Laboratorio de Entrenamiento y Lógica de Chat: 2 horas.
Pulido de UI/UX y Responsividad: 30 minutos.
Total: 4 horas aproximadamente.
