import { CanvasRenderingContext2D, createCanvas, Canvas, registerFont } from "canvas";
import fs from "fs";

import { createCircle, CircleOptions, CircleReturn } from "./shapes/circle.js";
import { createText, TextOptions, TextReturn } from "./shapes/text.js";
import { createRect, RectOptions, RectReturn } from "./shapes/rect.js";
import { createLine, LineOptions, LineReturn } from "./shapes/line.js";
import { createRhombus, RhombusOptions, RhombusReturn } from "./shapes/rhombus.js";
import { createStar, StarOptions, StarReturn } from "./shapes/star.js";
import { createTriangle, TriangleOptions, TriangleReturn } from "./shapes/triangle.js";
import { createImage, ImageOptions, ImageReturn } from "./shapes/image.js";

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
    toBuffer(mimeType?: "application/pdf" | "image/jpeg" | "image/png" | "raw", quality?: number) : Buffer
    {
        if(mimeType) return this.canvas.toBuffer(mimeType as "image/jpeg",{quality});
        else return this.canvas.toBuffer("image/png");
    }
    toSave(path?: string, mimeType?: "jpeg" | "png")
    {
        let stream: fs.WriteStream;
        if(!path) path = (Math.floor(Math.random() * 7508567556840459) + 111111111).toString();
        if(mimeType == "jpeg") stream = this.canvas.createJPEGStream().pipe(fs.createWriteStream(path+".jpeg"));
        else stream = this.canvas.createPNGStream().pipe(fs.createWriteStream(path+".png"));
        return stream;
    }
}

export function addFontFamily(path: string, setName: string, options?: {style?: string, weight?: string})
{
    if(!options) options = {};
    registerFont(path, {family:setName, style: options.style, weight: options.weight});
}

export * from "./shapes/circle.js";
export * from "./shapes/text.js";
export * from "./shapes/rect.js";
export * from "./shapes/line.js";
export * from "./shapes/rhombus.js";
export * from "./shapes/star.js";
export * from "./shapes/triangle.js";
export * from "./shapes/image.js";
export * from "canvas";

export interface ShapesOptions{
    width?: number,
    height?: number,
    canvas?: Canvas
}