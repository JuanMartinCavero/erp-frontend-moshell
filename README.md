erp-frontend-moshell/
├── assets/ (Recursos estáticos globales)
│   ├── icons/ (Archivos SVG para iconos de la interfaz)
│   └── images/ (Logos, avatares de usuario y placeholders gráficos)
├── components/ (Componentes transversales reutilizables)
│   ├── layout/ (Estructura principal de la aplicación)
│   │   ├── Header.jsx (Barra superior con buscador y perfil)
│   │   ├── HeaderSimple.jsx (Cabecera minimalista para procesos de login)
│   │   ├── Sidebar.jsx (Menú de navegación lateral principal)
│   │   ├── SidebarAlt.jsx (Versión alternativa de la barra lateral)
│   │   └── Footer.jsx (Pie de página con información del sistema)
│   ├── navigation/ (Componentes de flujo de usuario)
│   │   ├── TopNav.jsx (Menú de navegación por pestañas en la parte superior)
│   │   └── Breadcrumb.jsx (Indicador de ruta jerárquica o "migas de pan")
│   ├── ui/ (Elementos básicos de la interfaz de usuario - Diseño Atómico)
│   │   ├── Badge.jsx (Etiquetas de estado: 'Pendiente', 'Completado', etc.)
│   │   ├── Button.jsx (Botón estandarizado con variantes de estilo)
│   │   ├── Card.jsx (Contenedor base con bordes y sombreado)
│   │   ├── ChartBar.jsx (Componente para visualización de gráficos de barras)
│   │   ├── DataTable.jsx (Tabla de datos con funciones de ordenamiento)
│   │   ├── DonutChart.jsx (Gráfico circular para representación de porcentajes)
│   │   ├── IconPlaceholder.jsx (Contenedor para iconos dinámicos)
│   │   ├── KPI.jsx (Tarjeta de visualización de indicadores clave)
│   │   ├── ProgressBar.jsx (Barra de carga para procesos o stock)
│   │   ├── SearchInput.jsx (Campo de entrada optimizado para búsquedas)
│   │   └── StatusIndicator.jsx (Señal visual de estado de conexión o proceso)
│   └── dashboard/ (Componentes específicos para paneles de control)
│       ├── MachineWorkload.jsx (Gráfico de carga de trabajo de maquinaria)
│       ├── OrdersTable.jsx (Resumen de pedidos recientes para el home)
│       ├── ProductionChart.jsx (Gráfico de flujo de producción actual)
│       ├── KpiCards.jsx (Colección de indicadores financieros/operativos)
│       └── ActivityTimeline.jsx (Línea de tiempo con historial de eventos)
├── features/ (Módulos funcionales organizados por dominio de negocio)
│   ├── admin/ (Administración de sistemas)
│   │   ├── AdminDashboardPage.jsx (Panel de control para administradores)
│   │   └── AdminCoordinationPage.jsx (Gestión de coordinación interna)
│   ├── auth/ (Gestión de seguridad y acceso)
│   │   ├── LoginForm.jsx (Lógica y diseño del formulario de acceso)
│   │   └── LoginPage.jsx (Página contenedora de inicio de sesión)
│   ├── barCode-tag/ (Sistema de etiquetado y escaneo)
│   │   ├── components/
│   │   │   ├── BarcodeGenerate.jsx (Generador visual de códigos de barras)
│   │   │   ├── BarcodeScan.jsx (Lógica de captura de cámara para escaneo)
│   │   │   └── BarcodeTable.jsx (Tabla de resultados y registro de escaneos)
│   │   └── pages/
│   │       └── BarcodePage.jsx (Vista principal de escaneo de materiales)
│   ├── dashboard/ (Vistas principales de métricas)
│   │   ├── DashboardPage.jsx (Panel principal del sistema)
│   │   └── DashboardAltPage.jsx (Vista alternativa de indicadores)
│   ├── FichaTecnica/ (Especificaciones técnicas de productos)
│   ├── finance/ (Auditoría y finanzas)
│   │   └── AuditAccountingPage.jsx (Gestión de contabilidad y auditoría)
│   ├── inventory/ (Gestión de almacenes)
│   │   ├── InventoryPage.jsx (Vista general de stock)
│   │   ├── InventoryWarehousePage.jsx (Detalle por almacén físico)
│   │   ├── InventoryScanningPage.jsx (Interfaz de entrada/salida por código)
│   │   └── InventoryMovements.jsx (Registro histórico de movimientos)
│   ├── operations/ (Control operativo)
│   │   └── OperationsDashboardPage.jsx (Panel de seguimiento de operaciones)
│   ├── pedidos/ (Gestión de órdenes de venta)
│   │   ├── components/
│   │   │   ├── OrderClientTabs.jsx (Filtro por tipo: Nuevo/Recurrente)
│   │   │   ├── OrderTabs.jsx (Filtro por origen: Nacional/Internacional)
│   │   │   ├── OrderRow.jsx (Representación de una fila de pedido con acciones)
│   │   │   └── ModalPago.jsx (Ventana emergente para actualizar pagos)
│   ├── planning/ (Planificación estratégica)
│   │   └── StrategicPanelPage.jsx (Panel de planeación de demanda)
│   ├── production/ (Seguimiento de planta)
│   │   ├── ProductionPipelinePage.jsx (Visualización Kanban del flujo de producción)
│   │   ├── ProductionTechSheetPage.jsx (Acceso a fichas técnicas desde planta)
│   │   ├── ProductionOrderDetail.jsx (Detalle técnico de una orden)
│   │   └── ProductionWorkOrders.jsx (Listado de órdenes de trabajo)
│   ├── purchasing/ (Gestión de compras)
│   │   ├── PurchasingModulePage.jsx (Módulo de órdenes de compra)
│   │   └── SupplierList.jsx (Directorio de proveedores)
│   └── quality/ (Control de calidad)
│       └── QualityControlPage.jsx (Inspección y aprobación de productos)
├── hooks/ (Hooks personalizados para lógica de estado y negocio)
│   ├── useAuth.js (Gestión de sesión, login y persistencia de permisos)
│   ├── useRoles.js (Lógica de administración de roles y permisos del sistema)
│   ├── usePermissions.js (Verificación de acceso y niveles de usuario)
│   ├── usePedidos.js (Gestión de datos de pedidos y carga de detalles)
├── layouts/ (Plantillas de estructura de página)
│   ├── MainLayout.jsx (Layout con Sidebar y Header para la app principal)
│   └── SimpleLayout.jsx (Layout básico para Login o páginas externas)
├── pages/ (Componentes que definen las rutas principales del navegador)
│   ├── Dashboard.jsx (Ruta principal '/')
│   ├── Inventory.jsx (Ruta de inventario '/inventory')
│   ├── Login.jsx (Ruta de acceso '/login')
│   ├── OrderPage.jsx (Ruta de gestión de pedidos '/pedidos')
│   ├── ProductionPipeline.jsx (Ruta de producción)
│   ├── QualityControl.jsx (Ruta de calidad)
│   ├── Operations.jsx (Ruta de operaciones)
│   ├── StrategicPanel.jsx (Ruta de planificación)
│   ├── AdminDashboard.jsx (Ruta de administración)
│   ├── AdminCoordination.jsx (Ruta de coordinación)
│   ├── Purchasing.jsx (Ruta de compras)
│   ├── Warehouse.jsx (Ruta de almacén)
│   ├── Scanning.jsx (Ruta de escaneo de etiquetas)
│   ├── Audit.jsx (Ruta de auditoría)
│   └── DashboardAlt.jsx (Ruta de dashboard alternativo)
├── services/ (Capa de comunicación con el Backend)
│   ├── api.js (Configuración base de Axios y endpoints genéricos)
│   ├── authApi.js (Peticiones relacionadas con seguridad: Login/Logout)
│   ├── axiosClient.js (Instancia configurada con interceptores de Token)
│   └── rolesApi.js (Servicios CRUD para la gestión de roles)
├── src/ (Recursos de código fuente adicionales)
│   └── components/
│       └── PDF/ (Lógica de generación de documentos)
│           └── PedidoPDF.jsx (Plantilla de diseño para exportar pedidos a PDF)
├── styles/ (Estilos de la aplicación)
│   └── globals.css (Configuración de Tailwind CSS y estilos globales)
├── App.jsx (Configuración central de rutas y contextos de React)
├── main.jsx (Punto de entrada de la aplicación y renderizado)
├── index.html (Archivo HTML principal sobre el que se monta React)
├── package.json (Configuración de dependencias y scripts del proyecto)
├── README.md (Guía de instalación y documentación del desarrollador)
└── vite.config.js (Configuración del empaquetador Vite y plugins)












Configuracion inicial
*****************************************************
instalacion dependencias:
bash
# Paso 1:
# Dependencias básicas (ya vienen con el proyecto)
npm install

# Si no deja instalar se npm se hace manualmente
npm install vite @vitejs/plugin-react react react-dom --save-dev


# Instalar Tailwind y dependencias
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# instalar paquete necesario
npm install -D @tailwindcss/postcss

# instalar vite.config.js
npm install -D @tailwindcss/vite

# 
npm install lucide-react recharts clsx tailwind-merge

# Si quieres añadir íconos (opcional)
npm install lucide-react

# Para manejo de rutas (si lo necesitas después)
npm install react-router-dom


# instalar dependencias necesarias
npm install recharts

npm install -D tailwindcss @tailwindcss/vite tw-animate-css

# Instalar otras dependencias que ya hemos usado
npm install lucide-react recharts class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot


# para el login se debe instarlar estas 2
# ########################################################################
# instalar react-router-dom
npm install react-router-dom

# instalar dependencias
npm install -D @types/react-router-dom