import { createRouteHandler } from '@openpanel/nextjs/server';

export const { GET, POST } = createRouteHandler({
  apiUrl: 'https://opapi.nirzhuk.dev',
});
