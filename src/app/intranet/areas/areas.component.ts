import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Area } from '../../models/area.model';
import { Actividad } from '../../models/actividad.model';
import { AreaService } from '../../services/area.service';
import { AddAreaDialogComponent} from "../add-area-dialog/add-area-dialog.component";


@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
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
}
