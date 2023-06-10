import { CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgtArgs, NgtPush, extend, injectNgtLoader } from 'angular-three';
import * as THREE from 'three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { injectNgtsGLTFLoader } from 'angular-three-soba/loaders';
import { Observable, map } from 'rxjs';
import { NgIf } from '@angular/common';
extend(THREE);
@Component({
  standalone: true,
  template: `
    <ngt-point-light [position]="5" />
    <ngt-spot-light [position]="5" />
    <ng-container *ngIf="model$">
      <ngt-primitive
        #mesh
        *args="[model$ | ngtPush]"
        [scale]="0.2"
        [position]="[-1.2, 0.8, 1.5]"
        (beforeRender)="onBeforeRender($any(mesh))"
      />
    </ng-container>
    <ngts-orbit-controls
      [enableZoom]="false"
      [autoRotate]="true"
      [autoRotateSpeed]="5"
    />
  `,
  imports: [NgtArgs, NgtPush, NgtsOrbitControls, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Scene {
  readonly model$ = injectNgtsGLTFLoader('assets/pc.glb').pipe(
    map((gltf) => gltf.scene)
  );
  onBeforeRender(mesh: THREE.Mesh) {
    mesh.rotation.y = -0.25;
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly Scene = Scene;
}
