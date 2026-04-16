import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PerformanceMetric, RefuteClaim } from '../shared/models/user/performance.model';

// Interface to match your performance.json root structure
interface PerformanceData {
  PerformanceMetric: PerformanceMetric[];
  RefuteClaims: RefuteClaim[];
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private http = inject(HttpClient);

  // 1. Raw Data Signals
  public allPerformance = signal<PerformanceMetric[]>([]);
  public allClaims = signal<RefuteClaim[]>([]);
  public isLoaded = signal<boolean>(false);

  // 2. Specialized Computed Views
  // Returns the leaderboard sorted by average Units Per Hour (UPH)
  public leaderboard = computed(() => 
    [...this.allPerformance()].sort((a, b) => b.averageUph - a.averageUph)
  );

  // Filters claims for the current logged-in user (Dirie / USR-1050)
  public myClaims = computed(() => 
    this.allClaims().filter(c => c.userId === 'USR-1050')
  );

  // Finds the specific stats for the current user
  public myStats = computed(() => 
    this.allPerformance().find(p => p.userId === 'USR-1050') || null
  );

  constructor() {
    this.initPerformanceData();
  }

  private async initPerformanceData() {
    try {
      const data = await firstValueFrom(
        this.http.get<PerformanceData>('data/performance.json')
      );
      
      this.allPerformance.set(data.PerformanceMetric);
      this.allClaims.set(data.RefuteClaims);
      this.isLoaded.set(true);
      
      console.log('ZENTORY_OS // Performance_Vault_Synced');
    } catch (error) {
      console.error('ZENTORY_OS // Sync_Error // Check performance.json path', error);
    }
  }

  // 3. Action: Submit a new claim (Optimistic update)
  public addRefuteClaim(newClaim: RefuteClaim) {
    this.allClaims.update(current => [newClaim, ...current]);
    console.log(`ZENTORY_OS // Claim_Logged // Slot: ${newClaim.intervalSlot}`);
  }
}