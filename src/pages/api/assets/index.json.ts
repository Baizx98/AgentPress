import manifest from '../../../data/assets.json';

export async function GET() {
  return Response.json(manifest);
}
