import { MapIconType } from '../../../shared';

export interface MapProps {
  points: [number, number, MapIconType][];
  additionalClass: string;
}
