import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Area } from '../../models/area.model';
import { Actividad } from '../../models/actividad.model';
import { AreaService } from '../../services/area.service';
import {AddAreaDialogComponent} from "../add-area-dialog/add-area-dialog.component";
import {AddActivityDialogComponent} from "../add-activity-dialog/add-activity-dialog.component";

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  areas: Area[] = [];
  selectedArea: Area | null = null;
  selectedActividad: Actividad | null = null;

  constructor(private areaService: AreaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAreas();
  }

  loadAreas(): void {
    this.areaService.getAreas().subscribe((data: Area[]) => {
      this.areas = data;
    });
  }

  selectArea(area: Area): void {
    this.selectedArea = area;
    this.selectedActividad = null;
  }

  selectActividad(actividad: Actividad): void {
    this.selectedActividad = actividad;
  }

  openAddAreaDialog(): void {
    const dialogRef = this.dialog.open(AddAreaDialogComponent, {
      width: '250px',
      data: { name: '', description: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newArea: Area = {
          id: 0,  // Esto puede ser gestionado por el backend
          nombre: result.name,
          descripcion: result.description,
          actividades: []
        };

        this.areaService.addArea(newArea).subscribe(() => {
          this.loadAreas();
        });
      }
    });
  }

  openAddActivityDialog(): void {
    if (!this.selectedArea) {
      return;
    }

    const dialogRef = this.dialog.open(AddActivityDialogComponent, {
      width: '250px',
      data: { name: '', description: '', fecha: '', linkReunion: { url: '' }, estado: 'PENDIENTE' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.selectedArea) {
        const nuevaActividad: Actividad = {
          id: 0,  // Asigna un ID temporal, o permite que el backend asigne el ID correcto
          nombre: result.name,
          descripcion: result.description,
          fecha: result.fecha,
          linkReunion: { url: result.linkReunion.url },
          estado: result.estado
        };

        this.areaService.addActivity(this.selectedArea.id, nuevaActividad).subscribe(() => {
          this.loadAreas();
        });
      }
    });
  }

}
