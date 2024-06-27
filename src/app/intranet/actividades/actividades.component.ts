import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AreaService } from '../../services/area.service';
import { ActividadService } from '../../services/actividad.service';
import { Area } from '../../models/area.model';
import { AddAreaDialogComponent } from '../add-area-dialog/add-area-dialog.component';
import { AddActivityDialogComponent } from '../add-activity-dialog/add-activity-dialog.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  areas: Area[] = [];
  selectedArea: Area | null = null;

  constructor(
    private areaService: AreaService,
    private actividadService: ActividadService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAreas();
  }

  loadAreas(): void {
    this.areaService.getAreas().subscribe(
      (data: Area[]) => {
        console.log('Loaded areas:', data);
        this.areas = data;
      },
      error => {
        console.error('Error loading areas', error);
      }
    );
  }

  selectArea(area: Area): void {
    console.log('Selected area:', area);
    this.selectedArea = area;
  }

  openAddAreaDialog(): void {
    const dialogRef = this.dialog.open(AddAreaDialogComponent, {
      width: '250px',
      data: { nombre: '', descripcion: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.areaService.addArea(result).subscribe(() => {
          this.loadAreas();
        });
      }
    });
  }

  openAddActivityDialog(): void {
    const dialogRef = this.dialog.open(AddActivityDialogComponent, {
      width: '250px',
      data: { nombre: '', descripcion: '', fecha: '', linkReunion: { url: '' }, estado: 'PENDIENTE' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.selectedArea) {
        this.actividadService.addActividad(result, this.selectedArea.id).subscribe(() => {
          this.loadAreas();
        });
      }
    });
  }
}
