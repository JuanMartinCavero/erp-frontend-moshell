src/
├── assets/
│   ├── icons/               (Iconos SVG personalizados como placeholders)
│   └── images/               (Imágenes, logos, avatares - placeholders)
│
├── components/               (Componentes reutilizables y atómicos)
│   ├── layout/
│   │   ├── Header.jsx         (Cabecera principal con búsqueda y perfil)
│   │   ├── HeaderSimple.jsx   (Cabecera simple para páginas de autenticación)
│   │   ├── Sidebar.jsx        (Barra lateral principal con navegación)
│   │   ├── SidebarAlt.jsx     (Variante de barra lateral)
│   │   └── Footer.jsx         (Pie de página simple)
│   │
│   ├── navigation/
│   │   ├── TopNav.jsx         (Navegación superior por pestañas/módulos)
│   │   └── Breadcrumb.jsx     (Migas de pan)
│   │
│   ├── ui/
│   │   ├── Badge.jsx          (Etiquetas de estado: 'Alto', 'Completado', etc.)
│   │   ├── Button.jsx          (Botones reutilizables con variantes)
│   │   ├── Card.jsx            (Contenedor de tarjeta estándar)
│   │   ├── ChartBar.jsx        (Componente de gráfico de barras - placeholder visual)
│   │   ├── DataTable.jsx       (Tabla de datos reutilizable)
│   │   ├── DonutChart.jsx      (Gráfico de anillo - placeholder visual)
│   │   ├── IconPlaceholder.jsx (Placeholder para iconos SVG)
│   │   ├── KPI.jsx             (Componente para indicador clave de rendimiento)
│   │   ├── ProgressBar.jsx     (Barra de progreso)
│   │   ├── SearchInput.jsx     (Campo de búsqueda con icono)
│   │   └── StatusIndicator.jsx (Indicador de estado online/offline)
│   │
│   └── dashboard/
│       ├── MachineWorkload.jsx (Tarjeta de carga de trabajo de máquina)
│       ├── OrdersTable.jsx     (Tabla de pedidos recientes)
│       ├── ProductionChart.jsx (Gráfico de estado de producción)
│       ├── KpiCards.jsx        (Conjunto de tarjetas KPI)
│       └── ActivityTimeline.jsx (Línea de tiempo de actividades)
│
├── features/                  (Módulos o funcionalidades específicas de la app)
│   ├── auth/
│   │   ├── LoginForm.jsx       (Formulario de inicio de sesión)
│   │   └── LoginPage.jsx       (Página de login completa)
│   │
│   ├── dashboard/
│   │   ├── DashboardPage.jsx   (Página principal del Dashboard #1)
│   │   └── DashboardAltPage.jsx (Página principal alternativa #14)
│   │
│   ├── production/
│   │   ├── ProductionPipelinePage.jsx (Página de pipeline de producción #2)
│   │   ├── ProductionTechSheetPage.jsx (Página de ficha técnica #3)
│   │   ├── ProductionOrderDetail.jsx (Vista de detalle de orden de producción)
│   │   └── ProductionWorkOrders.jsx (Componente de órdenes de trabajo)
│   │
│   ├── inventory/
│   │   ├── InventoryPage.jsx          (Página de inventario principal #4)
│   │   ├── InventoryWarehousePage.jsx (Página de gestión de almacén #11)
│   │   ├── InventoryScanningPage.jsx  (Página de escaneo de etiquetas #12)
│   │   └── InventoryMovements.jsx     (Componente de movimientos de inventario)
│   │
│   ├── quality/
│   │   └── QualityControlPage.jsx      (Página de control de calidad #5)
│   │
│   ├── operations/
│   │   └── OperationsDashboardPage.jsx (Panel de operaciones #6)
│   │
│   ├── admin/
│   │   ├── AdminDashboardPage.jsx      (Panel administrativo #8)
│   │   └── AdminCoordinationPage.jsx   (Página de coordinación administrativa #9)
│   │
│   ├── purchasing/
│   │   ├── PurchasingModulePage.jsx    (Módulo de compras #10)
│   │   └── SupplierList.jsx            (Componente de lista de proveedores)
│   │
│   ├── finance/
│   │   └── AuditAccountingPage.jsx     (Página de auditoría y contabilidad #13)
│   │
│   └── planning/
│       └── StrategicPanelPage.jsx       (Panel estratégico #7)
│
├── layouts/
│   ├── MainLayout.jsx         (Layout principal con Header y Sidebar)
│   └── SimpleLayout.jsx       (Layout para login, con HeaderSimple)
│
├── pages/                      (Páginas/Secciones principales)
│   ├── Dashboard.jsx           (Página de Dashboard #1)
│   ├── ProductionPipeline.jsx  (Página de Pipeline de Producción #2)
│   ├── ProductionTechSheet.jsx (Página de Ficha Técnica #3)
│   ├── Inventory.jsx           (Página de Inventario #4)
│   ├── QualityControl.jsx      (Página de Control de Calidad #5)
│   ├── Operations.jsx          (Página de Operaciones #6)
│   ├── StrategicPanel.jsx      (Página de Panel Estratégico #7)
│   ├── AdminDashboard.jsx      (Página de Dashboard Admin #8)
│   ├── AdminCoordination.jsx   (Página de Coordinación Admin #9)
│   ├── Purchasing.jsx          (Página de Compras #10)
│   ├── Warehouse.jsx           (Página de Almacén #11)
│   ├── Scanning.jsx            (Página de Escaneo #12)
│   ├── Audit.jsx               (Página de Auditoría #13)
│   ├── DashboardAlt.jsx        (Página de Dashboard Alternativo #14)
│   └── Login.jsx               (Página de Inicio de Sesión)
│
├── styles/
│   └── globals.css             (Estilos globales y variables CSS)
│
├── App.jsx                     (Componente principal con configuración de rutas)
├── main.jsx                    (Punto de entrada de la app)
└── index.html                  (Archivo HTML principal)











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