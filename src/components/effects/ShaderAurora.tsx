import { useReducedMotion } from 'framer-motion';
import { useEffect, useMemo } from 'react';

export function ShaderAurora({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    void import('shader-doodle');
  }, [prefersReducedMotion]);

  const fragmentShader = useMemo(
    () => `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
  float time = iTime * 0.25;
  float wave = sin(uv.x * 3.2 + time) + cos(uv.y * 6.0 - time * 1.3);
  float mask = smoothstep(-1.2, 1.2, wave);
  vec3 aurora = mix(vec3(0.06, 0.18, 0.35), vec3(0.18, 0.5, 0.82), mask);
  aurora += 0.15 * sin(vec3(uv.y + time * 0.6, uv.x * 1.2 - time * 0.4, uv.x + uv.y));
  fragColor = vec4(aurora, 0.55);
}
    `,
    []
  );

  if (prefersReducedMotion) {
    const fallbackClass = [
      className,
      'bg-[radial-gradient(circle_at_top,rgba(74,123,167,0.45),transparent_60%)]'
    ]
      .filter(Boolean)
      .join(' ');

    return <div className={fallbackClass} aria-hidden />;
  }

  return (
    <shader-doodle className={className} aria-hidden>
      {`precision highp float;
${fragmentShader}
void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}`}
    </shader-doodle>
  );
}
