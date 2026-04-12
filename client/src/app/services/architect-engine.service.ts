import { Injectable, signal, computed, effect } from '@angular/core';
import { CustomReportConfig } from '../shared/models/performance-analytics.model';

@Injectable({
  providedIn: 'root'
})
export class ArchitectEngineService {
  // 1. PRIMARY STATE
  public config = signal<CustomReportConfig>({
    title: 'NEW ANALYTICS REPORT',
    dataSource: 'Sales',
    timeFrame: '30D',
    visualType: 'Bar',
    metrics: ['Total Revenue', 'Profit Margin']
  });

  public isDeployed = signal(false);
  public graphData = signal<number[]>([]);
  
  // 2. DRILL-DOWN / TAB STATE
  // When a user clicks a bar/line, this object populates the detailed data tab
  public activeTab = signal<{ label: string; value: number; index: number } | null>(null);

  // 3. AXIS LOGIC (The Labels)
  public yLabels = [100, 75, 50, 25, 0];
  
  public xLabels = computed(() => {
    const frame = this.config().timeFrame;
    switch (frame) {
      case '7D': return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      case '30D': return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      case '90D': return ['Jan', 'Feb', 'Mar'];
      case '6M': return ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
      case '1Y': return ['Q1', 'Q2', 'Q3', 'Q4'];
      default: return ['P1', 'P2', 'P3', 'P4'];
    }
  });

  constructor() {
    // Sync: Reset deployment and generate data whenever config changes
    effect(() => {
      this.isDeployed.set(false);
      this.activeTab.set(null); // Clear active tab on config change
      this.generatePreviewData();
    });
  }

  public generatePreviewData() {
    const count = this.xLabels().length;
    // Generate random mock values between 10 and 95
    const newData = Array.from({ length: count }, () => Math.floor(Math.random() * 85) + 10);
    this.graphData.set(newData);
  }

  // 4. INTERACTION LOGIC
  public selectPoint(index: number) {
    const label = this.xLabels()[index] || `Point ${index + 1}`;
    const value = this.graphData()[index];
    
    this.activeTab.set({ label, value, index });
    
    console.log(`Zentory Engine: Data point locked. Populating Tab for ${label}...`);
  }

  // 5. THE DEPLOYMENT SNAPSHOT
  public finalizeDeployment() {
    this.isDeployed.set(true);
    const manifest = {
      config: this.config(),
      data: this.graphData(),
      labels: this.xLabels(),
      deployedAt: new Date().toISOString()
    };
    console.log('Zentory: System Fully Deployed.', manifest);
  }

  // 6. ACTUAL DOWNLOAD FUNCTIONALITY (CSV Export)
  public downloadReportData() {
    const title = this.config().title;
    const labels = this.xLabels();
    const data = this.graphData();

    // Create CSV content strings
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Label,Value (%)\n"; // Headers
    
    labels.forEach((label, i) => {
      csvContent += `${label},${data[i]}\n`;
    });

    // Create download link and trigger it
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title.replace(/\s+/g, '_')}_Zentory_Report.csv`);
    document.body.appendChild(link); // Required for FF

    link.click();
    document.body.removeChild(link);
    
    console.log(`Zentory: ${title} CSV downloaded successfully.`);
  }

  public applyPreset(type: 'AUDIT' | 'SCORECARD') {
    if (type === 'AUDIT') {
      this.config.set({
        title: 'Q3 SYSTEM AUDIT',
        dataSource: 'Inventory',
        timeFrame: '90D',
        visualType: 'Table',
        metrics: ['Stock Accuracy', 'Compliance', 'Audit Trail']
      });
    } else {
      this.config.set({
        title: 'SUPPLIER SCORECARD',
        dataSource: 'Complaints',
        timeFrame: '1Y',
        visualType: 'Bar',
        metrics: ['Defect Rate', 'Lead Time', 'Response Speed']
      });
    }
    this.finalizeDeployment();
  }
}