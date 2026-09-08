import React from 'react';
import { Illusion } from '../../types';
import { AmbiguousRotation } from './AmbiguousRotation';
import { NeckerCube } from './NeckerCube';
import { RubinVase } from './RubinVase';
import { CheckerShadow } from './CheckerShadow';
import { EbbinghausCircles } from './EbbinghausCircles';
import { MullerLyer } from './MullerLyer';
import { CafeWall } from './CafeWall';
import { LilacChaser } from './LilacChaser';
import { MotionAftereffect } from './MotionAftereffect';
import { PeripheralFade } from './PeripheralFade';
import { BlindSpot } from './BlindSpot';
import { ComplementaryColors } from './ComplementaryColors';
import { StroopChallenge } from './StroopChallenge';
import { KanizsaTriangle } from './KanizsaTriangle';
import { HermannGrid } from './HermannGrid';

interface Props {
  illusion: Illusion;
  customParams?: Record<string, number>;
  reducedMotion?: boolean;
  onReactionComplete?: (score: number, avgTimeMs: number) => void;
}

export const IllusionEngine: React.FC<Props> = ({
  illusion,
  customParams = {},
  reducedMotion = false,
  onReactionComplete
}) => {
  const p: Record<string, number> = customParams || {};

  switch (illusion.id) {
    case 'rotacao-ambigua':
      return (
        <AmbiguousRotation
          speed={p['speed'] ?? 1}
          showGuidelines={(p['guidelines'] ?? 0) > 0.5}
          reducedMotion={reducedMotion}
        />
      );

    case 'cubo-de-necker':
      return (
        <NeckerCube
          highlight={(p['highlight'] ?? 0) > 0.5}
        />
      );

    case 'vaso-de-rubin':
      return (
        <RubinVase
          inverted={(p['invert'] ?? 0) > 0.5}
        />
      );

    case 'checker-shadow':
      return (
        <CheckerShadow
          bridgeWidth={p['bridgeWidth'] ?? 0}
        />
      );

    case 'circulos-de-ebbinghaus':
      return (
        <EbbinghausCircles
          surroundSize={p['surroundSize'] ?? 1}
          showGuides={(p['showGuides'] ?? 0) > 0.5}
        />
      );

    case 'muller-lyer':
      return (
        <MullerLyer
          arrowAngle={p['arrowAngle'] ?? 45}
        />
      );

    case 'cafe-wall':
      return (
        <CafeWall
          offset={p['offset'] ?? 20}
          mortarWidth={p['mortarWidth'] ?? 3}
          showGuides={(p['showGuides'] ?? 0) > 0.5}
        />
      );

    case 'lilac-chaser':
      return (
        <LilacChaser
          speed={p['speed'] ?? 120}
          reducedMotion={reducedMotion}
        />
      );

    case 'pos-efeito-movimento':
      return (
        <MotionAftereffect
          spiralSpeed={p['spiralSpeed'] ?? 2.5}
          reducedMotion={reducedMotion}
        />
      );

    case 'desvanecimento-periferico':
      return (
        <PeripheralFade
          blurAmount={p['blurAmount'] ?? 20}
          opacity={p['opacity'] ?? 0.6}
        />
      );

    case 'ponto-cego':
      return (
        <BlindSpot
          targetDistance={p['targetDistance'] ?? 180}
          dotSize={p['dotSize'] ?? 22}
        />
      );

    case 'cores-complementares':
      return (
        <ComplementaryColors
          timerDuration={p['timerDuration'] ?? 15}
        />
      );

    case 'stroop-challenge':
      return (
        <StroopChallenge
          roundCount={p['roundCount'] ?? 5}
          onComplete={onReactionComplete}
        />
      );

    case 'triangulo-de-kanizsa':
      return (
        <KanizsaTriangle
          pacmanRotation={p['pacmanRotation'] ?? 0}
          showVirtualLines={(p['showVirtualLines'] ?? 0) > 0.5}
        />
      );

    case 'grade-de-hermann':
      return (
        <HermannGrid
          gridSize={p['gridSize'] ?? 4}
          gutterWidth={p['gutterWidth'] ?? 14}
        />
      );

    default:
      return (
        <div className="p-8 text-center text-slate-400">
          Componente da ilusão não encontrado.
        </div>
      );
  }
};
