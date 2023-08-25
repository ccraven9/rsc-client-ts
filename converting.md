
# Conversion Guidelines

Guidelines for converting a file from Javascript to Typescript.








### Common Errors

##### _

**Error**:



    Error : React TypeScript: Type 'null' is not assignable to type '*...'

**Solution**:

    //Check if the object is null, or if the res is not an instance of the object
    const res = resizeCanvas.getContext('2D');
    if (!res || !(res instanceof CanvasRenderingContext2D)) {
    throw new Error('Failed to get 2D context');
    }
    const ctx: CanvasRenderingContext2D = res;

##### _

**Error**:

    Error: *.default is not a constructor

**Solution**:

Export by using: `export class MapAction`

  

Import by: `import { MapAction } from './map_action_file';`
