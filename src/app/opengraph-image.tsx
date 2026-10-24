import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { profile } from '@/data/profile';
export const alt = 'John Benedict Bolatin — Software Engineering Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
const font = readFile(join(process.cwd(), 'public/fonts/JetBrainsMono-Regular.ttf'));
export default async function OpenGraphImage() {
  const data = await font;
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0a0a0a',
        color: '#f5f5f5',
        padding: '60px 72px',
        fontFamily: 'JetBrains Mono',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 18,
          color: '#a1a1aa',
          paddingBottom: 30,
          borderBottom: '1px solid #27272a',
        }}
      >
        <span>jb[_]</span>
        <span>personal portfolio / Philippines</span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: 16,
          marginTop: 58,
          color: '#a1a1aa',
        }}
      >
        <div style={{ width: 7, height: 7, background: '#f5f5f5' }} />
        software, systems & curiosity
      </div>
      <div style={{ fontSize: 60, letterSpacing: -3, marginTop: 25 }}>{profile.nameLines[0]}</div>
      <div style={{ fontSize: 60, letterSpacing: -3, color: '#a1a1aa' }}>
        {profile.nameLines[1]}
      </div>
      <div
        style={{
          fontSize: 18,
          color: '#a1a1aa',
          marginTop: 'auto',
          borderTop: '1px solid #27272a',
          paddingTop: 25,
        }}
      >
        {profile.headline}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'JetBrains Mono',
          data: data.buffer.slice(
            data.byteOffset,
            data.byteOffset + data.byteLength,
          ) as ArrayBuffer,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );
}
