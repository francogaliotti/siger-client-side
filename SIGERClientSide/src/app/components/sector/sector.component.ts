import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Modal } from 'bootstrap';
import { faEye, faArrowAltCircleDown, faEdit, faFileAlt, faPlusCircle, faTrash, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { TokenService } from 'src/app/services/token.service';
import * as $ from 'jquery';
import { Sector } from 'src/app/models/sector';
import { SectorService } from 'src/app/services/sector.service';
import Swal from 'sweetalert2';
import { TipoSector } from 'src/app/models/tipo-sector';
import { Domicilio } from 'src/app/models/domicilio';


@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {

  sector: Sector[]=[];
  sectorForm: FormGroup;
  editSectorForm: FormGroup;
  testModal: Modal | undefined;
  modal: Modal | undefined;

  success: boolean;

  faEdit = faEdit;
  faTrash = faTrash;
  faArrow = faArrowAltCircleLeft;
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
