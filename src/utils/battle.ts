export interface ParsedBattleQuery {
  challenger: string;
  illusionId: string;
  time: number;
}

const DEFAULT_CHALLENGER = 'Um amigo';
const DEFAULT_TIME_SECONDS = 6;
const MAX_CHALLENGER_LENGTH = 15;
const MAX_TIME_SECONDS = 60 * 60;

export function sanitizeChallenger(value: string | null | undefined): string {
  const normalized = (value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, MAX_CHALLENGER_LENGTH);

  return normalized || DEFAULT_CHALLENGER;
}

export function normalizeBattleTime(value: string | number | null | undefined): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > MAX_TIME_SECONDS) {
    return DEFAULT_TIME_SECONDS;
  }

  return Math.round(parsed * 10) / 10;
}

export function parseBattleQuery(
  search: string,
  allowedIllusionIds: readonly string[]
): ParsedBattleQuery | null {
  const params = new URLSearchParams(search);
  const illusionId = params.get('ill');

  if (params.get('battle') !== '1' || !illusionId || !allowedIllusionIds.includes(illusionId)) {
    return null;
  }

  return {
    challenger: sanitizeChallenger(params.get('challenger')),
    illusionId,
    time: normalizeBattleTime(params.get('time'))
  };
}
