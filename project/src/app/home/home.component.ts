import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Component } from '@angular/core';
import { NgtArgs, NgtPush, NgtStore, extend } from 'angular-three';
import * as THREE from 'three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { injectNgtsGLTFLoader } from 'angular-three-soba/loaders';
import { BehaviorSubject, map } from 'rxjs';
import { NgIf } from '@angular/common';
extend(THREE);
@Component({
  standalone: true,
  template: `
    <ngt-point-light [position]="-5" />
    <ngt-spot-light [position]="5" />
    <ngt-primitive
      #mesh
      *args="[model$ | ngtPush]"
      [scale]="0.2"
      [position]="[-1.2, 0.8, 1.5]"
      (beforeRender)="onBeforeRender($any(mesh))"
    />
    <ngts-orbit-controls [enableZoom]="false" [autoRotate]="true" />
  `,
  imports: [NgtArgs, NgtPush, NgtsOrbitControls, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Scene implements OnDestroy {
  readonly store = inject(NgtStore);
  readonly glDom = this.store.get('gl', 'domElement'); // HTMLElement
  readonly model$ = injectNgtsGLTFLoader('assets/pc.glb').pipe(
    map((gltf) => gltf.scene)
  );
  onBeforeRender(mesh: THREE.Mesh) {
    mesh.rotation.y = -0.25;
  }
  ngOnDestroy(): void {
    this.store.get().gl.dispose();
    this.store.destroy(this.glDom);
    this.store.get().camera.clear();
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  stimulus$ = new BehaviorSubject<boolean>(false);
  readonly Scene = Scene;
  ngOnInit(): void {
    setTimeout(() => {
      this.stimulus$.next(true);
    }, 500);
  }
}
