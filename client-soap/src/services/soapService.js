import axios from 'axios';

const SOAP_URL = 'http://localhost:5130/ServicioLibro.svc';
const SOAP_NAMESPACE = 'http://tempuri.org/';
const BAC_NAMESPACE = 'http://schemas.datacontract.org/2004/07/backend_soap.Entity';

// Función auxiliar para envolver el cuerpo XML en un envelope SOAP
const createSoapEnvelope = (body) => `
  <soapenv:Envelope 
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
    xmlns:tem="${SOAP_NAMESPACE}"
    xmlns:bac="${BAC_NAMESPACE}">
    <soapenv:Header/>
    <soapenv:Body>
      ${body}
    </soapenv:Body>
  </soapenv:Envelope>
`;

// Función auxiliar para extraer la respuesta del XML
const extractResponse = (xmlString, action) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  return xmlDoc.querySelector(`${action}Response`);
};

// Clase principal del servicio
class LibroSoapService {
  async getAllLibros() {
    const soapBody = `<tem:GetAllLibros/>`;
    const response = await this.callSoapService('GetAllLibros', soapBody);
    const result = extractResponse(response, 'GetAllLibros');
    return this.parseLibrosArray(result);
  }

  async getLibroById(id) {
    const soapBody = `
      <tem:GetLibroById>
        <tem:id>${id}</tem:id>
      </tem:GetLibroById>
    `;
    const response = await this.callSoapService('GetLibroById', soapBody);
    const result = extractResponse(response, 'GetLibroById');
    return this.parseLibro(result);
  }

  async addLibro(libro) {
    const soapBody = `
      <tem:AddLibro>
        <tem:libro>
          <bac:Anio>${libro.Año || 0}</bac:Anio>
          <bac:Autor>${libro.Autor || ''}</bac:Autor>
          <bac:Id>${libro.Id || 0}</bac:Id>
          <bac:Nombre>${libro.Titulo || ''}</bac:Nombre>
          <bac:Resumen>${libro.resumen || ''}</bac:Resumen>
        </tem:libro>
      </tem:AddLibro>
    `;
    await this.callSoapService('AddLibro', soapBody);
  }

  async updateLibro(libro) {
    const soapBody = `
      <tem:UpdateLibro>
        <tem:libro>
          <bac:Anio>${libro.Año || 0}</bac:Anio>
          <bac:Autor>${libro.Autor || ''}</bac:Autor>
          <bac:Id>${libro.Id || 0}</bac:Id>
          <bac:Nombre>${libro.Titulo || ''}</bac:Nombre>
          <bac:Resumen>${libro.resumen || ''}</bac:Resumen>
        </tem:libro>
      </tem:UpdateLibro>
    `;
    await this.callSoapService('UpdateLibro', soapBody);
  }

  async deleteLibro(id) {
    const soapBody = `
      <tem:DeleteLibro>
        <tem:id>${id}</tem:id>
      </tem:DeleteLibro>
    `;
    await this.callSoapService('DeleteLibro', soapBody);
  }

  // Método principal para hacer llamadas SOAP
  async callSoapService(action, body) {
    try {
      const response = await axios.post(
        SOAP_URL,
        createSoapEnvelope(body),
        {
          headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': `${SOAP_NAMESPACE}ILibroService/${action}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error en llamada SOAP:', error);
      throw error;
    }
  }

  // Métodos auxiliares para parsear respuestas
  parseLibrosArray(xmlResult) {
    if (!xmlResult) return [];
    const libros = [];
    const librosNodes = xmlResult.getElementsByTagName('d4p1:Libro');
    for (const libroNode of librosNodes) {
      libros.push(this.parseLibro(libroNode));
    }
    return libros;
  }

  parseLibro(xmlNode) {
    if (!xmlNode) return null;
    return {
      id: parseInt(xmlNode.querySelector('Id')?.textContent || '0'),
      nombre: xmlNode.querySelector('Nombre')?.textContent || '',
      autor: xmlNode.querySelector('Autor')?.textContent || '',
      anio: parseInt(xmlNode.querySelector('Anio')?.textContent || '0'),
      resumen: xmlNode.querySelector('Resumen')?.textContent || ''
    };
  }
}

export default new LibroSoapService();