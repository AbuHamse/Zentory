import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutboundShipment } from '../../../shared/models/user/outbound-shipment.model';

@Component({
  selector: 'app-outbound-bay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outbound-bay.component.html'
})
export class OutboundBayComponent implements OnInit, OnDestroy {
  @Input() doorId!: string;
  @Input() data: OutboundShipment | undefined;
  @Output() select = new EventEmitter<OutboundShipment>();

  // Local timer for the countdown
  protected timeLeft = signal<string>('00:00:00');
  private timer: any;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  private startCountdown() {
    this.timer = setInterval(() => {
      if (!this.data) return;
      
      const diff = new Date(this.data.scheduledDeparture).getTime() - new Date().getTime();
      
      if (diff <= 0) {
        this.timeLeft.set('00:00:00');
        return;
      }

      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      
      this.timeLeft.set(`${h}:${m}:${s}`);
    }, 1000);
  }

  protected calculateProgress(): number {
    if (!this.data) return 0;
    return (this.data.loadedPallets / this.data.totalPallets) * 100;
  }

  protected onBayClick() {
    if (this.data) this.select.emit(this.data);
  }
}