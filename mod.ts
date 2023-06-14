import { CanvasRenderingContext2D, createCanvas, Canvas, Fonts } from "https://deno.land/x/skia_canvas@0.5.2/mod.ts";

import { createCircle, CircleOptions, CircleReturn } from "./shapes/circle.ts";
import { createText, TextOptions, TextReturn } from "./shapes/text.ts";
import { createRect, RectOptions, RectReturn } from "./shapes/rect.ts";
import { createLine, LineOptions, LineReturn } from "./shapes/line.ts";
import { createRhombus, RhombusOptions, RhombusReturn } from "./shapes/rhombus.ts";
import { createStar, StarOptions, StarReturn } from "./shapes/star.ts";
import { createTriangle, TriangleOptions, TriangleReturn } from "./shapes/triangle.ts";
import { createImage, ImageOptions, ImageReturn } from "./shapes/image.ts";

export class Shapes
{
    public canvas: Canvas;
    public ctx: CanvasRenderingContext2D;

    constructor(options?: ShapesOptions){
        if(!options) options = {};
        if(!options.canvas){
            if(!options.width) options.width = 1920;
            if(!options.height) options.height = 1920;
            this.canvas = createCanvas(options.width, options.height);
        }
        else {
            this.canvas = options.canvas;
            if(options.width) this.canvas.width = 1920;
            if(options.height) this.canvas.height = 1080;
        }
        this.ctx = this.canvas.getContext('2d');
    }
    createCircle(options?: CircleOptions) : CircleReturn{
        return createCircle(this.ctx, options as CircleOptions);
    }
    createText(options?: TextOptions) : TextReturn{
        return createText(this.ctx, options as TextOptions);
    }
    createRect(options?: RectOptions) : RectReturn{
        return createRect(this.ctx, options as RectOptions);
    }
    createLine(options?: LineOptions) : LineReturn{
        return createLine(this.ctx, options as LineOptions);
    }
    createRhombus(options?: RhombusOptions) : RhombusReturn{
        return createRhombus(this.ctx, options as RhombusOptions);
    }
    createStar(options?: StarOptions) : StarReturn{
        return createStar(this.ctx, options as StarOptions);
    }
    createImage(options?: ImageOptions) : ImageReturn{
        return createImage(this.ctx, options as ImageOptions);
    }
    createTriangle(options?: TriangleOptions) : TriangleReturn{
        return createTriangle(this.ctx, options as TriangleOptions);
    }
    toSave(path: string, mimeType?: "jpeg" | "png" | "webp", quality?: number)
    {
        Deno.writeFile(`${path}.${mimeType? mimeType : "png"}`, this.toBuffer(mimeType, quality));
    }
    toBuffer(mimeType?: "jpeg" | "png" | "webp", quality?: number) : Uint8Array
    {
        return this.canvas.encode(mimeType? mimeType : "png", quality)
    }
}

export function addFontFamily(path: string, setName: string)
{
    const fonts = Fonts;
    fonts.register(Deno.readFileSync(path), setName);
}

export * from "./shapes/circle.ts";
export * from "./shapes/text.ts";
export * from "./shapes/rect.ts";
export * from "./shapes/line.ts";
export * from "./shapes/rhombus.ts";
export * from "./shapes/star.ts";
export * from "./shapes/triangle.ts";
export * from "./shapes/image.ts";
export * from "canvas";

export interface ShapesOptions{
    width?: number,
    height?: number,
    canvas?: Canvas
}
