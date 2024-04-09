export const FileStorage = {
  AWS: 'AWS',
} as const;

export type FileStorageType = (typeof FileStorage)[keyof typeof FileStorage];
