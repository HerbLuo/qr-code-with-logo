interface Payload {
  canvas: Element,
  content: string,
  width: number,
  logo: string | object
}

interface QrCodeWithLogo {
  toCanvas(Payload)
}
export default QrCodeWithLogo

