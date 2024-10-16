export const DESCRIPTION_FILE = "description.json";
export const HISTORY_OPTIONS = "smoki.json";
export const SMOKE_FORECAST_FOLDER = "national";

export interface IPoluent {
  name: string;
  intervals: (string | number)[];
  unit: string;
}

export interface IImageDescription {
  fileName: string;
}

export interface IFocalDescription<T> {
  name: string;
  center: [number, number];
  poluents: IPoluent[];
  predictions: Record<string, T[]>;
  domain: IDomain;
}
export interface IDomain {
  upperlat: number;
  lowerlat: number;
  leftlon: number;
  rightlon: number;
}

export interface IDescriptionFile {
  national: {
    poluents: IPoluent[];
    predictions: Record<string, IImageDescription[]>;
    domain: IDomain;
  };
  focal: IFocalDescription<IImageDescription>[];
}

export interface IPrediction
  extends Omit<IDescriptionFile["national"], "predictions"> {
  predictions: Record<string, IPredictionPoint[]>;
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

const transformTimeToHumanReadableValue = (inputDate: string): string => {
  if (inputDate.length === 4) {
    const hour = inputDate.substring(0, 2);
    const minute = inputDate.substring(2, 4);

    const date = new Date();
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));
    return date.toISOString();
  }
  // Extract components from the input string
  const year = parseInt(inputDate.slice(0, 4));
  const month = parseInt(inputDate.slice(4, 6)) - 1; // Months are zero-based in JavaScript
  const day = parseInt(inputDate.slice(6, 8));
  const hour = parseInt(inputDate.slice(8, 10));

  // Create a new Date object using the extracted components
  const parsedDate = new Date(year, month, day, hour);
  return parsedDate.toISOString();
};

const transformStringToLatLng = (str: string): number => {
  return Number.parseFloat(str) / 10000;
};

export const convertFileNameToPredictionPoint = (
  fileDescription: IImageDescription,
  uuid: string,
  domain?: IDomain,
): IPredictionPoint | null => {
  const { fileName } = fileDescription;
  if (!fileName.includes("png")) {
    console.error("File not png:", fileName);
  }
  const copy = fileName;
  const strSplit = copy.replace(".png", "").split("_");

  if (strSplit.length <= 10 && domain) {
    const name = strSplit.join("");
    const time = strSplit[strSplit.length - 1];

    return {
      name,
      time: transformTimeToHumanReadableValue(time),
      bottomLeftLatitude: domain.lowerlat,
      bottomLeftLongitude: domain.leftlon,
      bottomRightLatitude: domain.lowerlat,
      bottomRightLongitude: domain.rightlon,
      topLeftLatitude: domain.upperlat,
      topLeftLongitude: domain.leftlon,
      topRightLatitude: domain.upperlat,
      topRightLongitude: domain.rightlon,
      ...fileDescription,
      uuid,
    };
  } else if (strSplit.length === 10) {
    const [
      name,
      time,
      bottomRightLatitude,
      bottomRightLongitude,
      bottomLeftLatitude,
      bottomLeftLongitude,
      topLeftLatitude,
      topLeftLongitude,
      topRightLatitude,
      topRightLongitude,
    ] = strSplit;
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
      uuid,
    };
  }
  return null;
};

// HISTORY OPTIONS TYPES

export interface HistoryItem {
  id: number | string;
  name: string;
  file: string;
}

export interface HistoryFile {
  events: HistoryItem[];
}
