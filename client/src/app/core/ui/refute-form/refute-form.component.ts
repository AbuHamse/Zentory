import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PerformanceService } from '../../../services/performance.service';
import { RefuteClaim } from '../../../shared/models/user/performance.model';

@Component({
  selector: 'app-refute-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './refute-form.component.html'
})
export class RefuteFormComponent {
  private fb = inject(FormBuilder);
  private perfService = inject(PerformanceService);

  // Outputs to notify parent (MyPerformanceComponent)
  close = output<void>();
  submitted = output<void>();

  refuteForm = this.fb.group({
    userId: ['USR-1050'], 
    intervalSlot: [1, [Validators.required, Validators.min(1), Validators.max(6)]],
    category: ['LABOR_SHARE', Validators.required],
    explanation: ['', [Validators.required, Validators.minLength(10)]],
    startTime: ['11:00', Validators.required],
    endTime: ['13:00', Validators.required],
    department: ['', Validators.required]
  });

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    if (this.refuteForm.valid) {
      const f = this.refuteForm.value;
      
      const newClaim: RefuteClaim = {
        id: `CLM-${Math.floor(Math.random() * 9999)}`,
        userId: f.userId!,
        timestamp: new Date().toISOString(),
        intervalSlot: f.intervalSlot!,
        category: f.category as any,
        explanation: f.explanation!,
        status: 'PENDING'
      };

      this.perfService.addRefuteClaim(newClaim);
      this.submitted.emit();
    }
  }
}