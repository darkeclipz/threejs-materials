import { Material } from "./material";
declare var THREE: any;

export class BasicMaterial extends Material {
    toMaterial() {
        console.error('ThreeBasicMaterial not implemented.');
    }
}