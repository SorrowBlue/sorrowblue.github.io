interface QiitaResponseItems {
  example: string;
  type: string;
}

interface QiitaResponse {
  description: string;
  example: string | boolean | number;
  pattern: string;
  items: QiitaResponseItems;
  type: string | string[];
  format: string;
}

interface QiitaMethodProperty {
  description: string;
  example: string;
  pattern: string;
  type: string;
}

interface QiitaLink {
  description: string;
  href: string;
  mediaType: string;
  method: string;
  rel: string;
  schema: {
    properties: Map<string, QiitaMethodProperty>;
    required: string[];
  };
  title: string;
}

interface QiitaProperty {
  description: string;
  links: QiitaLink[];
  properties: Map<string, QiitaResponse>;
  required: string[];
  title: string;
}

interface QiitaSchema {
  description: string;
  properties: Map<string, QiitaProperty>;
  required: string[];
  title: string;
}

export {
  QiitaResponseItems,
  QiitaSchema,
  QiitaLink,
  QiitaMethodProperty,
  QiitaProperty,
  QiitaResponse,
};
