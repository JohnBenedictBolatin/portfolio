import type { CompiledCharacter, Mascot, Rig, Vec3 } from 'wobnimo';

export type HeadMotion = { x: number; y: number };

/** Observe the rendered head without running a second animation clock. */
export function followMascotHead(mascot: Mascot, framing: number, publish: (motion: HeadMotion) => void) {
  // Wobnimo 0.2 has no public anchor event. Keep its runtime rig access isolated
  // and optional so a future engine change safely leaves the bubble stationary.
  const runtime = mascot as unknown as {
    rig?: Pick<Rig, 'point'>;
    character?: Pick<CompiledCharacter, 'bones'>;
  };
  const headIndex = runtime.character?.bones.findIndex((bone) => bone.name === 'body');
  if (headIndex === undefined || headIndex < 0 || !runtime.rig?.point) return () => {};
  const rig = runtime.rig;
  const originalTick = mascot.tick;
  let origin: HeadMotion | undefined;

  // Match the installed engine's perspective camera (half-FOV tangent .2, pitch .1).
  const cameraScale = 0.2;
  const pitch = 0.1;
  const distance = mascot.spec.frame.radius * framing / cameraScale;
  const project = ([x, y, z]: Vec3): HeadMotion => {
    const relativeY = y - mascot.spec.frame.target;
    const depth = distance - relativeY * Math.sin(pitch) - z * Math.cos(pitch);
    const up = relativeY * Math.cos(pitch) - z * Math.sin(pitch);
    return { x: x / (2 * depth * cameraScale), y: -up / (2 * depth * cameraScale) };
  };

  mascot.tick = function (dt, time, quality) {
    originalTick.call(mascot, dt, time, quality);
    const position = project(rig.point(headIndex, [0.28, 0.22, 0.24]));
    origin ??= position;
    publish({ x: position.x - origin.x, y: position.y - origin.y });
  };

  return () => {
    mascot.tick = originalTick;
    publish({ x: 0, y: 0 });
  };
}
