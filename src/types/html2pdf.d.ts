declare module 'html2pdf.js' {
  interface PDF {
    addPage(): void;
    save(filename: string): void;
  }

  interface Html2PdfInstance {
    set(options: any): Html2PdfInstance;
    from(element: HTMLElement): Html2PdfInstance;
    toPdf(): Html2PdfInstance;
    get(type: 'pdf'): Promise<PDF>;
    save(filename: string): void;
  }

  const html2pdf: () => Html2PdfInstance;
  export default html2pdf;
} 