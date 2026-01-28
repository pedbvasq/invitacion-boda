import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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
    private firestore: Firestore
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

    await addDoc(collection(this.firestore, 'confirmaciones'), {
      ...this.form.value,
      fecha: new Date()
    });

    this.enviado = true;
    this.form.reset();
  }
}
