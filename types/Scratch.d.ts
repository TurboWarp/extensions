/// <reference path="../node_modules/@turbowarp/types/types/scratch-vm.d.ts" />
// I really don't like the above but it works for now

declare namespace Scratch {
  // TODO: move these types to @turbowarp/types once they're more complete

  namespace ArgumentType {
    /** @deprecated not tested -- do not rely on yet */
    const ANGLE: 'angle';
    const BOOLEAN: 'Boolean';
    /** @deprecated not tested -- do not rely on yet */
    const COLOR: 'color';
    const NUMBER: 'number';
    const STRING: 'string';
    /** @deprecated not tested -- do not rely on yet */
    const MATRIX: 'matrix';
    /** @deprecated not tested -- do not rely on yet */
    const NOTE: 'note';
    /** @deprecated not tested -- do not rely on yet */
    const IMAGE: 'image';
  }
  type ArgumentType = (typeof ArgumentType)[keyof typeof ArgumentType];

  namespace BlockType {
    // The B in Boolean is supposed to be capitalized
    const BOOLEAN: 'Boolean';
    /** @deprecated not tested -- do not rely on yet */
    const BUTTON: 'button';
    const COMMAND: 'command';
    /** @deprecated not tested -- do not rely on yet */
    const CONDITIONAL: 'conditional';
    const EVENT: 'event';
    const HAT: 'hat';
    /** @deprecated not tested -- do not rely on yet */
    const LOOP: 'loop';
    const REPORTER: 'reporter';
  }
  type BlockType = (typeof BlockType)[keyof typeof BlockType];

  namespace TargetType {
    const SPRITE: 'sprite';
    const STAGE: 'stage';
  }
  type TargetType = (typeof TargetType)[keyof typeof TargetType];

  /**
   * scratch-vm instance. Only for unsandboxed extensions.
   */
  const vm: VM;

  /**
   * scratch-render instance. Only for unsandboxed extensions.
   */
  const renderer: RenderWebGL;

  /**
   * Technically this can be a translatable object, but in reality it will probably just be
   * a string here.
   */
  type FormattableString = string;

  interface ExtensionArgumentInfo {
    type: ArgumentType;
    defaultValue?: string | number;
    menu?: string;
  }

  interface ExtensionBlock {
    opcode: string;
    blockType: BlockType;
    text: FormattableString;
    arguments?: Record<string, ExtensionArgumentInfo>;
    // TODO: documentation mentions func, filter, branchCount, terminal, blockAllThreads
  }

  interface ExtensionMenu {
    acceptReporters?: boolean;
    items: Array<string | {
      text: string;
      value: string;
    }>;
  }

  interface ExtensionInfo {
    id: string;

    /**
     * Defaults to ID if not specified.
     */
    name?: FormattableString;

    /**
     * Should be a hex color code.
     */
    color1?: string;

    /**
     * Should be a hex color code.
     */
    color2?: string;

    /**
     * Should be a hex color code.
     */
    color3?: string;

    /**
     * Should be a data: URI
     */
    menuIconURI?: string;

    /**
     * Should be a data: URI
     */
    blockIconURI?: string;

    docsURI?: string;

    blocks: (ExtensionBlock | string)[];
    menus?: Record<string, ExtensionMenu>;
  }

  interface Extension {
    getInfo(): ExtensionInfo;
  }

  namespace extensions {
    function register(extensionObject: Extension): void;

    /**
     * True if the extension is running unsandboxed.
     */
    const unsandboxed: boolean;
  }
}
