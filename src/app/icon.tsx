import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default async function Icon() {
  const logo = await readFile(join(process.cwd(), 'public/brand-mark-mask.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0a',
      }}
    >
      <img src={logoSrc} width={440} height={395} alt="" />
    </div>,
    size,
  );
}
