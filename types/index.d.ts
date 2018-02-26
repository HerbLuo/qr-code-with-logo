interface Payload {
  canvas: Element,
  content: string,
  width: number,
  logo: object
}

interface QrCodeWithLogo {
  toCanvas(Payload)
}
export default QrCodeWithLogo

