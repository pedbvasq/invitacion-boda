# 🚀 Inicio Rápido - Sistema Administrativo

## ✅ Todo está implementado y listo

### 📦 Archivos Creados

```
✅ src/app/services/auth.service.ts
✅ src/app/guards/auth.guard.ts
✅ src/app/components/login-admin/ (3 archivos)
✅ src/app/components/admin-confirmaciones/ (3 archivos)
✅ src/app/components/setup-admin/ (componente temporal)
✅ app.config.ts (actualizado con Firebase Auth)
✅ app.routes.ts (rutas configuradas)
✅ styles.css (Bootstrap importado)
```

---

## 🎯 Pasos para Usar

### 1. Crear Usuario Administrador

**Opción A - Desde Firebase Console (Recomendado):**
1. Ve a: https://console.firebase.google.com
2. Proyecto: `boda-invitacion-c7592`
3. Authentication → Sign-in method → Habilita "Email/Password"
4. Users → Add user
5. Email: `admin@tuboda.com`
6. Password: tu contraseña segura

**Opción B - Usando el componente temporal:**
1. Agrega temporalmente en `app.routes.ts`:
```typescript
import { SetupAdmin } from './components/setup-admin/setup-admin.component';

// En el array routes:
{
  path: 'setup-admin',
  component: SetupAdmin
}
```
2. Ejecuta: `ng serve`
3. Ve a: http://localhost:4200/setup-admin
4. Crea el usuario
5. Elimina la ruta y el componente

### 2. Habilitar Authentication en Firebase

1. Firebase Console → Authentication
2. Sign-in method
3. Email/Password → Enable → Save

### 3. Iniciar Aplicación

```bash
ng serve
```

### 4. Acceder al Sistema

- **Login**: http://localhost:4200/login
- **Admin Panel**: http://localhost:4200/admin

---

## 🎨 Funcionalidades

### Panel Administrativo (/admin)
- ✅ Ver todas las confirmaciones en tiempo real
- ✅ Estadísticas: Total, Sí, No
- ✅ Tabla ordenada por fecha (más recientes primero)
- ✅ Exportar a Excel/CSV
- ✅ Cerrar sesión

### Login (/login)
- ✅ Formulario con validaciones
- ✅ Mensajes de error en español
- ✅ Redirección automática a /admin

### Seguridad
- ✅ Ruta /admin protegida con authGuard
- ✅ Redirección a /login si no autenticado
- ✅ Firebase Authentication

---

## 📊 Exportación a Excel

El botón "📊 Exportar a Excel" genera un archivo CSV con:
- Todas las confirmaciones
- Formato compatible con Excel/Google Sheets
- Codificación UTF-8 (soporta tildes y ñ)
- Nombre con timestamp

---

## 🔧 Tecnologías

- Angular 17+ (Standalone Components)
- AngularFire v21
- Firebase Authentication
- Firestore (tiempo real)
- Bootstrap 5.3.8
- Reactive Forms

---

## ✅ Checklist

- [ ] Habilitar Email/Password en Firebase Console
- [ ] Crear usuario administrador
- [ ] Ejecutar `ng serve`
- [ ] Probar login en /login
- [ ] Verificar acceso a /admin
- [ ] Probar exportación a Excel
- [ ] Verificar tiempo real (crear confirmación desde la página principal)

---

## 🎉 ¡Listo para Producción!

Todo el código sigue las mejores prácticas de Angular 17+:
- Standalone components
- Functional guards
- Inject function
- Signals-ready
- Sin código obsoleto

**¡Felicidades por tu boda!** 💒💍
