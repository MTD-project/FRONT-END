import { Component } from '@angular/core';
import { Area } from '../../models/area.model';
import { Actividad } from '../../models/actividad.model';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent {
  areas: Area[] = [];
  selectedArea: Area | null = null;
  selectedActividad: Actividad | null = null;

  constructor(private areaService: AreaService) { }

  ngOnInit(): void {
    this.areaService.getAreas().subscribe((data: Area[]) => {
      this.areas = data;
    });
  }

  selectArea(area: Area): void {
    this.selectedArea = area;
    this.selectedActividad = null;  // Reset activity selection when a new area is selected
  }

  selectActividad(actividad: Actividad): void {
    this.selectedActividad = actividad;
  }
}

