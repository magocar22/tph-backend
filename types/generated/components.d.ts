import type { Schema, Struct } from '@strapi/strapi';

export interface BlogElementosDescargaPdf extends Struct.ComponentSchema {
  collectionName: 'components_blog_elementos_descarga_pdfs';
  info: {
    displayName: 'Descarga_PDF';
  };
  attributes: {
    archivo_pdf: Schema.Attribute.Media<'files'>;
    titulo_descarga: Schema.Attribute.String;
  };
}

export interface BlogElementosFotoArticulo extends Struct.ComponentSchema {
  collectionName: 'components_blog_elementos_foto_articulos';
  info: {
    displayName: 'Foto_Articulo';
  };
  attributes: {
    archivo_imagen: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface BlogElementosParrafo extends Struct.ComponentSchema {
  collectionName: 'components_blog_elementos_parrafos';
  info: {
    displayName: 'Parrafo';
  };
  attributes: {
    texto: Schema.Attribute.Blocks;
  };
}

export interface CorporativoDocumentoDescargable
  extends Struct.ComponentSchema {
  collectionName: 'components_corporativo_documento_descargables';
  info: {
    displayName: 'Documento Descargable';
  };
  attributes: {
    archivo: Schema.Attribute.Media<'files'>;
    subtitulo: Schema.Attribute.String;
    titulo: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog-elementos.descarga-pdf': BlogElementosDescargaPdf;
      'blog-elementos.foto-articulo': BlogElementosFotoArticulo;
      'blog-elementos.parrafo': BlogElementosParrafo;
      'corporativo.documento-descargable': CorporativoDocumentoDescargable;
    }
  }
}
