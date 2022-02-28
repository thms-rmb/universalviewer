import { IIIFExtensionHost } from "../../IIIFExtensionHost";
import { Async } from "@edsilv/utils";
import { BaseEvents } from "../../../../BaseEvents";

export class Panel {
  extensionHost: IIIFExtensionHost;
  $element: JQuery;
  fitToParentWidth: boolean;
  fitToParentHeight: boolean;
  isResized: boolean = false;

  constructor(
    $element: JQuery,
    fitToParentWidth?: boolean,
    fitToParentHeight?: boolean
  ) {
    this.$element = $element;
    this.fitToParentWidth = fitToParentWidth || false;
    this.fitToParentHeight = fitToParentHeight || false;

    this.create();
  }

  create(): void {
    this.extensionHost?.subscribe(BaseEvents.RESIZE, () => {
      this.resize();
    });
  }

  whenResized(cb: () => void): void {
    Async.waitFor(() => {
      return this.isResized;
    }, cb);
  }

  onAccessibleClick(
    el: JQuery,
    callback: (e: JQueryEventObject) => void,
    withClick = true
  ) {
    if (withClick) {
      el.on("click", (e) => {
        callback(e);
      });
    }
    el.on("keyup", (e) => {
      if (e.keyCode === 32) {
        callback(e);
      }
    });
  }

  resize(): void {
    const $parent: JQuery = this.$element.parent();

    if (this.fitToParentWidth) {
      this.$element.width($parent.width());
    }

    if (this.fitToParentHeight) {
      this.$element.height($parent.height());
    }

    this.isResized = true;
  }
}
