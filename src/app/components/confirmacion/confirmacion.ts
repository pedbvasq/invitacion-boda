import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-confirmacion',
    standalone: true,
 imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confirmacion.html',
  styleUrl: './confirmacion.css',
})
export class Confirmacion {
  enviado = false;
  form;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      nombres: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
        Validators.maxLength(100)
      ]],
      apellidos: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
        Validators.maxLength(100)
      ]],
      asistencia: ['', Validators.required]
    });

  }


   campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  async enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      const formData = this.form.value;
      
      await addDoc(collection(this.firestore, 'confirmaciones'), {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        asistencia: formData.asistencia === 'SI_ASISTIRE' ? 'Sí' : 'No',
        fecha: new Date()
      });

      this.form.reset();
      this.enviado = true;
      this.cdr.detectChanges();
      
      setTimeout(() => {
        this.enviado = false;
        this.cdr.detectChanges();
      }, 5000);
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al enviar la confirmación. Intenta nuevamente.');
    }
  }
}
