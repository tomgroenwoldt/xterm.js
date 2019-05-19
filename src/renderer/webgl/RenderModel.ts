/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { IRenderModel, ISelectionRenderModel } from './Types';
import { fill } from './TypedArray';

export const RENDER_MODEL_INDICIES_PER_CELL = 4;

export const COMBINED_CHAR_BIT_MASK = 0x80000000;

export class RenderModel implements IRenderModel {
  public cells: Uint32Array;
  public lineLengths: Uint32Array;
  public selection: ISelectionRenderModel;

  constructor() {
    this.cells = new Uint32Array(0);
    this.lineLengths = new Uint32Array(0);
    this.selection = {
      hasSelection: false,
      viewportStartRow: 0,
      viewportEndRow: 0,
      viewportCappedStartRow: 0,
      viewportCappedEndRow: 0,
      startCol: 0,
      endCol: 0
    };
  }

  public resize(cols: number, rows: number): void {
    const indexCount = cols * rows * RENDER_MODEL_INDICIES_PER_CELL;
    if (indexCount !== this.cells.length) {
      this.cells = new Uint32Array(indexCount);
      this.lineLengths = new Uint32Array(rows);
    }
  }

  public clear(): void {
    fill(this.cells, 0, 0);
    fill(this.lineLengths, 0, 0);
    this.clearSelection();
  }

  public clearSelection(): void {
    this.selection.hasSelection = false;
    this.selection.viewportStartRow = 0;
    this.selection.viewportEndRow = 0;
    this.selection.viewportCappedStartRow = 0;
    this.selection.viewportCappedEndRow = 0;
    this.selection.startCol = 0;
    this.selection.endCol = 0;
  }
}
