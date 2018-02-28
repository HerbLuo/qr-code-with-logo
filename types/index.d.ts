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

interface Config {
  canvas: Element;
  content: string;
  width?: number;
  nodeQrCodeOptions: NodeQrCodeOptions | object;
  logo?: string | Logo
}

interface QrCodeWithLogo {
  toCanvas(config: Config): Promise
}
export default QrCodeWithLogo
