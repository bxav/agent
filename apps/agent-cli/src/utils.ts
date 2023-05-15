import axios from 'axios';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as url from 'url';
import * as path from 'path';

export async function loadConfig(
  filePath: string,
  raw: boolean = false,
): Promise<any> {
  const parsedUrl = url.parse(filePath);
  const fileContent =
    parsedUrl.protocol && ['http:', 'https:'].includes(parsedUrl.protocol)
      ? (await axios.get(filePath)).data
      : fs.readFileSync(filePath, 'utf8');

  if (raw) {
    return fileContent;
  }

  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.yaml':
    case '.yml':
      return yaml.load(fileContent);
    case '.json':
      return JSON.parse(fileContent);
    default:
      console.error('Unsupported file format:', ext);
  }
}
