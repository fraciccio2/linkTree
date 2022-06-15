export interface ButtonCollectorModel {
  headerKey: string;
  data: {
    name: string;
    link: string;
    value: {
      background_color: string;
      text_color: string;
      text_size: string;
      align: string;
    };
  };
  ordering?: number;
}
