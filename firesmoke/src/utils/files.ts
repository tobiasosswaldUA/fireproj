import { parse, isValid } from "date-fns";
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

/**
 * Helper function to parse your specific formats
 */
function parseSpecificFormat(dateString: string): Date | null {
  // Format: yyyyMMddHH
  if (dateString.length === 10 && /^\d{10}$/.test(dateString)) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const hour = dateString.slice(8, 10);
    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
    );
  }

  // Format: yyyy-MM-dd_HHmmss
  if (dateString.includes("_")) {
    const [datePart, timePart] = dateString.split("_");
    const [year, month, day] = datePart.split("-");
    const hour = timePart.slice(0, 2);
    const minute = timePart.slice(2, 4);
    const second = timePart.slice(4, 6);
    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second),
    );
  }

  if (dateString.includes("T")) {
    const [datePart, timePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    const [hour, minute, second] = timePart.split(":");

    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second),
    );
  }

  return null;
}

/**
 * Extracts and parses dates from any text string
 * @param {string} text - Text that might contain a date somewhere
 * @returns {Date[]|null} - Returns array of found dates or null if none found
 */
function findDatesInText(text: string): string {
  // Clean the input
  const cleaned = text.trim();

  // Primary patterns for your specific formats
  const primaryPatterns = [
    /\d{10}/, // yyyyMMddHH with validation                    // yyyyMMddHH
    /\d{4}-\d{2}-\d{2}_\d{6}\b/, // yyyy-MM-dd_HHmmss
    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\b/, // yyyy-MM-ddTHH:mm:ss
  ];

  const foundDates = new Set<Date>(); // Use Set to avoid duplicates

  // First check for your specific formats
  for (const pattern of primaryPatterns) {
    const matches = cleaned.match(pattern);
    if (!matches) continue;

    for (const match of matches) {
      const parsed = parseSpecificFormat(match);
      if (parsed) {
        foundDates.add(parsed);
      }
    }
  }

  if (foundDates.size > 0) {
    return Array.from(foundDates)[0].toISOString();
  }

  throw Error("No date found in file name" + JSON.stringify({ name: text }));
}

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

  if (domain) {
    const name = strSplit.join("");

    return {
      name,
      time: findDatesInText(fileName),
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
      time: findDatesInText(time),
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
