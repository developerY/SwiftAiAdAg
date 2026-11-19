import {cpSync, existsSync} from 'node:fs';
import {join} from 'node:path';

const browserDist = join(process.cwd(), 'dist', 'app', 'browser');
const rootDist = join(process.cwd(), 'dist');

if (existsSync(browserDist)) {
  cpSync(browserDist, rootDist, {recursive: true, force: true});
  console.log('Synced browser assets + index.html to dist/ root for static Cloudflare hosting.');
}
