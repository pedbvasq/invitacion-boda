# 🎬 Animación Cinematográfica - Hero Invitación de Boda

## ✅ Implementación Completa

Se ha creado una animación cinematográfica elegante y premium para el hero de la invitación de boda.

---

## 🎞️ Secuencia de Animación

### FASE 1: Aparición de Iniciales (0-1.2s)
- **Inicial "M"** aparece a los 100ms
- **Inicial "J"** aparece a los 250ms (stagger de 150ms)
- **Efectos**:
  - Opacity: 0 → 1
  - Scale: 0.85 → 1
  - Blur: 10px → 0
  - Duración: 1200ms
  - Easing: cubic-bezier(0.22, 1, 0.36, 1)

### FASE 2: Flor Animada (1.1s)
- **Flor SVG** aparece entre las iniciales
- **Efectos principales**:
  - Scale: 0 → 1
  - Rotate: -15deg → 0deg
  - Opacity: 0 → 1
  - Drop-shadow glow suave
- **Pétalos individuales**:
  - 8 pétalos con animación stagger
  - Cada pétalo se abre secuencialmente
  - Efecto de "florecimiento"
- **Centro dorado**:
  - Animación de glow pulsante infinita

### FASE 3: Transformación a Nombres (3.5s)
- **Transición elegante**:
  - Iniciales desaparecen suavemente
  - Nombres completos aparecen con morph effect
  - Crossfade suave
  - Duración: 900ms
  - La flor permanece visible

---

## 🎨 Características Visuales

### Tipografía
- **Fuente**: Playfair Display (serif elegante)
- **Iniciales**: 4rem (móvil) / 5.5rem (desktop)
- **Nombres completos**: 2.5rem (móvil) / 3.5rem (desktop)
- **Letter-spacing**: Amplio para elegancia

### Flor SVG
- **Diseño**: 8 pétalos en rosa suave (#f4c2d4, #f9d5e0)
- **Centro**: Dorado (#ffd700)
- **Tamaño**: 50px (móvil) / 65px (desktop)
- **Efectos**:
  - Drop-shadow con glow rosa
  - Animación de pulso suave infinita
  - Pétalos con apertura secuencial

### Colores
- **Texto**: #5a5a5a (gris elegante)
- **Pétalos**: Rosa pastel
- **Centro**: Dorado
- **Glow**: Rosa translúcido

---

## ⚙️ Implementación Técnica

### Angular Animations
```typescript
@angular/animations:
- initialFade: Aparición de iniciales con blur y scale
- flowerBloom: Florecimiento de la flor
- nameMorph: Transición a nombres completos
```

### Timing Perfecto
```typescript
100ms  → Primera inicial aparece
250ms  → Segunda inicial aparece (stagger)
1100ms → Flor florece
3500ms → Transición a nombres completos
```

### CSS Animations
- **petalOpen**: Apertura individual de pétalos
- **petalPulse**: Pulso suave infinito
- **centerGlow**: Glow del centro dorado

---

## 📱 Responsive

### Móvil
- Iniciales: 4rem
- Nombres: 2.5rem
- Flor: 50px
- Gap: 1.5rem

### Desktop (768px+)
- Iniciales: 5.5rem
- Nombres: 3.5rem
- Flor: 65px
- Espaciado aumentado

---

## 🚀 Características Técnicas

✅ **Angular 17+** standalone component
✅ **@angular/animations** nativo
✅ **SSR compatible** con isPlatformBrowser
✅ **Sin librerías externas**
✅ **SVG inline** (no PNG)
✅ **Animación única** (solo al cargar)
✅ **Código limpio** y bien estructurado
✅ **Responsive** completo
✅ **Performance optimizado**

---

## 🎯 Personalización

### Cambiar Nombres
En `invitation.ts`:
```typescript
nombreCompleto1 = 'María';  // Cambia aquí
nombreCompleto2 = 'José';   // Cambia aquí
inicial1 = 'M';             // Primera letra
inicial2 = 'J';             // Primera letra
```

### Ajustar Timing
```typescript
setTimeout(() => this.initialM = 'visible', 100);    // Primera inicial
setTimeout(() => this.initialJ = 'visible', 250);    // Segunda inicial
setTimeout(() => this.flowerState = 'visible', 1100); // Flor
setTimeout(() => {
  this.showInitials = false;
  this.showFullNames = true;
}, 3500); // Nombres completos
```

### Cambiar Colores de la Flor
En `invitation.css`:
```css
.petal { fill: #f4c2d4; }  /* Rosa claro */
.flower-center { fill: #ffd700; } /* Dorado */
filter: drop-shadow(0 0 8px rgba(244, 194, 212, 0.6)); /* Glow */
```

---

## 🎬 Resultado Final

**Secuencia visual**:
```
0.0s:  [Pantalla vacía con blur]
0.1s:  M [aparece suavemente]
0.25s: M   J [segunda inicial con stagger]
1.1s:  M 🌸 J [flor florece entre ellas]
3.5s:  María 🌸 José [transición elegante a nombres]
```

---

## 💡 Detalles de Elegancia

- ❌ **Sin bounce** (nada infantil)
- ✅ **Cubic-bezier suave** (0.22, 1, 0.36, 1)
- ✅ **Blur effect** en entrada
- ✅ **Stagger timing** entre elementos
- ✅ **Glow sutil** en la flor
- ✅ **Morph effect** en transición
- ✅ **Espaciado amplio** (aire visual)
- ✅ **Animación única** (no se repite)

---

## 🎉 Listo para Producción

La animación está completamente implementada y lista para usar. Se ejecuta automáticamente al cargar la página y crea una experiencia premium y romántica perfecta para una invitación de boda digital.

**Recarga la página para ver la animación completa**: http://localhost:4200/

---

## 📝 Archivos Modificados

```
✅ src/app/components/invitation/invitation.ts
✅ src/app/components/invitation/invitation.html
✅ src/app/components/invitation/invitation.css
```

¡Disfruta tu invitación cinematográfica! 💒💍✨
