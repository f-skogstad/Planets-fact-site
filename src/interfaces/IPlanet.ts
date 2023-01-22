export default interface IPlanet {
  planet: {
    name: string;
    overview: {
      content: string;
      source: string;
    };
    structure?: {
      content: string;
      source: string;
    };
    geology?: {
      content: string;
    };
    rotation?: string;
    revolution?: string;
    radius?: string;
    temperature?: string;
    images?: {
      planet: string;
      internal: string;
      geology: string;
    };
  };
}
