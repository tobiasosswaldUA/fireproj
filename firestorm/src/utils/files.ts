export const PUBLIC_FOLDER = 'public/'
export const DESCRIPTION_FILE = 'description.json'
export const SMOKE_FORECAST_FOLDER = 'national';


export interface IImageDescription {
  fileName: string;
}

export interface IFocalDescription<T> {
  name: string;
  folder: string;
  center: [number, number];
  predictions: Record<string, T[]>
}

export interface IDescriptionFile {
  poluents: string[];
  national: Record<string, IImageDescription[]>;
  focal: IFocalDescription<IImageDescription>[] ;
}

export interface IPredictionPoint extends IImageDescription {
  name: string;
  time: string;
  bottomLeftLatitude: number;
  bottomLeftLongitude: number;
  bottomRightLatitude: number;
  bottomRightLongitude: number;
  topLeftLatitude: number;
  topLeftLongitude: number;
  topRightLatitude: number;
  topRightLongitude: number;
  uuid: string;
}

const transformTimeToHumanReadableValue = (str: string): string => {
  return str.substring(0, 2) + ':' + str.substring(2,4)
}

const transformStringToLatLng = (str: string):number => {
  return Number.parseFloat(str) / 10000;
}

export const convertFileNameToPredictionPoint = (fileDescription: IImageDescription, uuid: string): IPredictionPoint | null => {
  const { fileName } = fileDescription;
  if (!fileName.includes('png')) {
    console.error('File not png:', fileName);
  }
  const copy = fileName;
  const strSplit = copy.replace('.png', '').split('_');

  if (strSplit.length !== 10) {
    console.error('Bad length:', fileName);
    return null
  }
  const [name,
    time,
    bottomRightLatitude,
    bottomRightLongitude,
    bottomLeftLatitude,
    bottomLeftLongitude,
    topLeftLatitude,
    topLeftLongitude,
    topRightLatitude,
    topRightLongitude] = strSplit;
  return {
    name,
    time: transformTimeToHumanReadableValue(time),
    bottomLeftLatitude: transformStringToLatLng(bottomLeftLatitude),
    bottomLeftLongitude: transformStringToLatLng(bottomLeftLongitude),
    bottomRightLatitude: transformStringToLatLng(bottomRightLatitude),
    bottomRightLongitude: transformStringToLatLng(bottomRightLongitude),
    topLeftLatitude: transformStringToLatLng(topLeftLatitude),
    topLeftLongitude: transformStringToLatLng(topLeftLongitude),
    topRightLatitude: transformStringToLatLng(topRightLatitude),
    topRightLongitude: transformStringToLatLng(topRightLongitude),
    ...fileDescription,
    uuid
  }
}