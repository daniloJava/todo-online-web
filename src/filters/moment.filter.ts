import { MomentHelper } from '@/helpers';

export const formatDate = (value: string, pattern: string) => {
  return MomentHelper.formatDate(value, pattern);
};

export const formatTime = (value: string, pattern: string) => {
  return MomentHelper.formatTime(value, pattern);
};

export const formatDateTime = (value: string, pattern: string) => {
  return MomentHelper.formatDateTime(value, pattern);
};
