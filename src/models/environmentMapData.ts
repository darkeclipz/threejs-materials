export class EnvironmentMapData {
    // six images with 2 for each axis.
    px: any; nx: any;
    py: any; ny: any;
    pz: any; nz: any;

    notNull(): boolean {
        return this.px && this.nx 
            && this.py && this.ny 
            && this.pz && this.nz;
    }
}