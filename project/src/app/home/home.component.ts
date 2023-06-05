import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component } from '@angular/core';
import { NgtArgs, NgtPush, extend, injectNgtLoader } from 'angular-three';
import * as THREE from 'three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { injectNgtsGLTFLoader } from 'angular-three-soba/loaders';
import { map } from 'rxjs';
extend(THREE);
@Component({
  standalone: true,
  template: `
    <!-- <ngt-mesh>
      <ngt-box-geometry />
      <ngt-mesh-basic-material color="#00ff00" />
    </ngt-mesh> -->
    <ngt-point-light [position]="-2" />
    <ngt-spot-light [position]="2" />
    <ngt-primitive *args="[model$ | ngtPush]" [scale]="0.2" />
    <ngts-orbit-controls />
  `,
  imports: [NgtArgs, NgtPush, NgtsOrbitControls],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Scene {
  readonly model$ = injectNgtsGLTFLoader('assets/pcModel/scene.gltf').pipe(
    map((gltf) => gltf.scene)
  );
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly Scene = Scene;
}
