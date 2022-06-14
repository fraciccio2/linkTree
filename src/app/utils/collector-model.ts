import {HeaderCollectorModel} from "./header-collector-model";
import {ButtonCollectorModel} from "./button-collector-model";

export interface CollectorModel {
  header: HeaderCollectorModel;
  buttons: {key: string, value: ButtonCollectorModel}[];
  key: string | null;
}
