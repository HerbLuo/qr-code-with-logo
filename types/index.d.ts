interface Logo {
  src: string;
  logoRadius?: number;
  logoSize?: number;
  borderRadius?: number;
  borderColor?: string;
  borderSize?: number;
}

interface NodeQrCodeOptions {
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  }
}

interface BaseOptions {
  content: string;
  width?: number;
  nodeQrCodeOptions?: NodeQrCodeOptions | object;
  logo?: string | Logo
}

interface CanvasOptions {
  canvas: Element;
}

interface ImageOptions {
  image?: Element;
  download?: boolean | Function;
  downloadName?: string;
}

interface IQrCodeWithLogo {
  toCanvas(config: BaseOptions & CanvasOptions): Promise<any>,
  toImage(config: BaseOptions & ImageOptions): Promise<any>
}

declare const QrCodeWithLogo: IQrCodeWithLogo;

export default QrCodeWithLogo
