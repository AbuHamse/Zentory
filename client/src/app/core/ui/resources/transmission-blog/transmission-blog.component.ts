import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transmission-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transmission-blog.component.html'
})
export class TransmissionBlogComponent {
  // Articles focused on logistics rigor and mental models
  protected articles = [
    {
      id: 'TR-001',
      date: '2026.04.12',
      title: 'The 12-Hour Interval Logic',
      category: 'OPERATIONS',
      excerpt: 'Analyzing the psychological and mechanical impact of 2-hour production sprints on warehouse floor accountability.'
    },
    {
      id: 'TR-002',
      date: '2026.04.15',
      title: 'Neural Bottleneck Detection',
      category: 'AI_SYSTEMS',
      excerpt: 'How Zentra cross-references historical BI data to predict terminal congestion before it occurs.'
    },
    {
      id: 'TR-003',
      date: '2026.04.20',
      title: 'Money Mind Machine Philosophy',
      category: 'ENGINEERING',
      excerpt: 'Integrating technical rigor with personal philosophy to build high-utility industrial software.'
    }
  ];
}