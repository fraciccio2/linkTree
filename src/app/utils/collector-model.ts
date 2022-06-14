import {HeaderCollectorModel} from "./header-collector-model";
import {ButtonCollectorModel} from "./button-collector-model";

export interface CollectorModel {
  header: HeaderCollectorModel;
  buttons: ButtonCollectorModel["data"][];
  key: string | null;
}
