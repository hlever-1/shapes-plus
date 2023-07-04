import { CanvasRenderingContext2D } from "canvas";

export function fill(ctx: CanvasRenderingContext2D, color: string)
{
    ctx.fillStyle = color;
    ctx.fill();
}

export function stroke(ctx: CanvasRenderingContext2D, color: string)
{
    ctx.strokeStyle = color;
    ctx.stroke();
}