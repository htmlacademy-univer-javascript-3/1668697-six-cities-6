import { AxiosError } from 'axios';

export const formatError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response?.data) {
      const errorData = error.response.data as { message?: string; errorType?: string; details?: Array<{ property: string; messages: string[] }> };

      if (errorData.message) {
        if (errorData.details && errorData.details.length > 0) {
          const detailsMessages = errorData.details
            .map((detail) => `- ${detail.messages.join(', ')}`).join('\n');

          return `${errorData.message}.\n${detailsMessages}`;
        }

        return errorData.message;
      }
    }

    if (error.message) {
      return error.message;
    }

    if (!error.response) {
      return 'Server is unavailable. Try again later.';
    }
  }

  return 'Server error. Try again later.';
};
