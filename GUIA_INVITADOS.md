# Sistema de Gestión de Invitados - Guía de Uso

## 🎯 Descripción

Sistema completo de gestión de invitados con links únicos y seguros para confirmación de asistencia a bodas.

## 📋 Características Implementadas

### Dashboard de Invitados (`/admin/invitados`)
- ✅ CRUD completo de invitados
- ✅ Generación automática de tokens únicos (UUID)
- ✅ Descarga de plantilla Excel
- ✅ Carga masiva desde Excel
- ✅ Exportación de lista completa
- ✅ Copiar links únicos por invitado
- ✅ Estadísticas en tiempo real

### Confirmación Pública (`/invitacion/:token`)
- ✅ Acceso seguro por token único
- ✅ Visualización de cupo permitido
- ✅ Selección de número de personas
- ✅ Confirmación de asistencia
- ✅ Validación de cupo máximo

## 🚀 Cómo Usar

### 1. Acceder al Dashboard
```
URL: https://tu-dominio.com/admin/invitados
Requiere: Login de administrador
```

### 2. Agregar Invitados Manualmente
1. Click en "+ Agregar Invitado"
2. Llenar formulario:
   - Nombres
   - Apellidos
   - Cupo Permitido (número de personas que puede llevar)
3. Click en "Agregar"
4. Se genera automáticamente un token único

### 3. Carga Masiva con Excel
1. Click en "📥 Descargar Plantilla"
2. Abrir archivo Excel descargado
3. Llenar con datos de invitados:
   ```
   nombres      | apellidos | cupoPermitido
   Juan         | Pérez     | 2
   María        | García    | 1
   ```
4. Guardar archivo
5. Click en "📤 Subir Excel"
6. Seleccionar archivo
7. Los invitados se agregan automáticamente

### 4. Generar y Compartir Links
1. En la tabla de invitados, click en "📋 Copiar" junto al invitado
2. El link se copia al portapapeles
3. Formato: `https://tu-dominio.com/invitacion/abc123-token-unico`
4. Compartir por WhatsApp, Email, SMS, etc.

### 5. Invitado Confirma Asistencia
1. Invitado abre el link único
2. Ve su nombre y cupo permitido
3. Selecciona cuántas personas asistirán
4. Click en "✅ Confirmar Asistencia"
5. Confirmación se actualiza en tiempo real en el dashboard

### 6. Exportar Lista Final
1. Click en "📊 Exportar Lista"
2. Se descarga Excel con:
   - Nombres y apellidos
   - Cupo permitido
   - Estado de confirmación
   - Número de personas confirmadas
   - Link único

## 🔒 Seguridad

### Tokens Únicos
- Cada invitado tiene un token UUID v4 único
- Imposible de adivinar o duplicar
- Formato: `550e8400-e29b-41d4-a716-446655440000`

### Firestore Rules
```javascript
// Admin: acceso completo
allow read, write: if request.auth != null;

// Público: solo puede confirmar su propia invitación
allow update: if 
  - Token no cambia
  - Nombres no cambian
  - Apellidos no cambian
  - Cupo no cambia
  - Personas confirmadas <= cupo permitido
```

## 📊 Estructura de Datos

### Colección: `guests`
```javascript
{
  id: "auto-generated",
  nombres: "Juan",
  apellidos: "Pérez",
  cupoPermitido: 2,
  token: "550e8400-e29b-41d4-a716-446655440000",
  confirmado: false,
  personasConfirmadas: 0,
  fechaConfirmacion: null,
  createdAt: Timestamp
}
```

## 🛠️ Instalación

### 1. Instalar Dependencias
```bash
npm install xlsx --legacy-peer-deps
```

### 2. Desplegar Reglas de Firestore
```bash
firebase deploy --only firestore:rules
```

### 3. Compilar y Desplegar
```bash
npm run build
firebase deploy
```

## 📱 Rutas

```
/                       → Home (invitación pública)
/login                  → Login admin
/admin                  → Dashboard confirmaciones antiguo
/admin/invitados        → Dashboard gestión de invitados (NUEVO)
/invitacion/:token      → Confirmación por token (NUEVO)
```

## 💡 Ejemplos de Uso

### Ejemplo 1: Invitado Individual
```
Nombres: Pedro
Apellidos: Bajana
Cupo: 1 (solo él)
Link: https://tu-dominio.com/invitacion/abc123
```

### Ejemplo 2: Invitado con Pareja
```
Nombres: María
Apellidos: García
Cupo: 2 (ella + 1 acompañante)
Link: https://tu-dominio.com/invitacion/def456
```

### Ejemplo 3: Familia
```
Nombres: Carlos
Apellidos: Rodríguez
Cupo: 4 (él + 3 familiares)
Link: https://tu-dominio.com/invitacion/ghi789
```

## 🔄 Flujo Completo

```
1. Novios crean lista de invitados
   ↓
2. Sistema genera tokens únicos
   ↓
3. Novios copian y comparten links
   ↓
4. Invitados abren sus links
   ↓
5. Invitados confirman asistencia
   ↓
6. Dashboard se actualiza en tiempo real
   ↓
7. Novios exportan lista final
```

## 📝 Notas Importantes

- **Cupo Permitido**: Es el número total de personas incluyendo al invitado principal
- **Tokens**: Son permanentes y no expiran
- **Tiempo Real**: Las confirmaciones aparecen instantáneamente en el dashboard
- **Excel**: Soporta formatos .xlsx y .xls
- **Navegadores**: Compatible con Chrome, Firefox, Safari, Edge

## 🆘 Solución de Problemas

### Link no funciona
- Verificar que el token sea correcto
- Verificar que el invitado exista en la base de datos

### No se puede confirmar
- Verificar que no se exceda el cupo permitido
- Verificar conexión a internet

### Excel no se carga
- Verificar formato de columnas: `nombres`, `apellidos`, `cupoPermitido`
- Verificar que los valores sean válidos

## 📞 Soporte

Para más información o problemas, contactar al administrador del sistema.
