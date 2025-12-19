import { DatesRangeValue } from '@mantine/dates';

export const SPECS = [
  { id: 'blood_dk', nameEn: 'Blood', nameKo: '혈죽', role: 'TANK', class: 'Death Knight', icon: 'blood_dk' },
  {
    id: 'vengeance_dh',
    nameEn: 'Vengeance',
    nameKo: '악탱',
    role: 'TANK',
    class: 'Demon Hunter',
    icon: 'vengeance_dh',
  },
  { id: 'guardian_druid', nameEn: 'Guardian', nameKo: '수드', role: 'TANK', class: 'Druid', icon: 'guardian_druid' },
  { id: 'brewmaster_monk', nameEn: 'Brewmaster', nameKo: '양조', role: 'TANK', class: 'Monk', icon: 'brewmaster_monk' },
  {
    id: 'protection_paladin',
    nameEn: 'Protection',
    nameKo: '보기',
    role: 'TANK',
    class: 'Paladin',
    icon: 'prot_paladin',
  },
  {
    id: 'protection_warrior',
    nameEn: 'Protection',
    nameKo: '전탱',
    role: 'TANK',
    class: 'Warrior',
    icon: 'prot_warrior',
  },
  { id: 'resto_druid', nameEn: 'Restoration', nameKo: '회드', role: 'HEALER', class: 'Druid', icon: 'resto_druid' },
  {
    id: 'preservation_evoker',
    nameEn: 'Preservation',
    nameKo: '보존',
    role: 'HEALER',
    class: 'Evoker',
    icon: 'preservation_evoker',
  },
  {
    id: 'mistweaver_monk',
    nameEn: 'Mistweaver',
    nameKo: '운무',
    role: 'HEALER',
    class: 'Monk',
    icon: 'mistweaver_monk',
  },
  { id: 'holy_paladin', nameEn: 'Holy', nameKo: '신기', role: 'HEALER', class: 'Paladin', icon: 'holy_paladin' },
  {
    id: 'discipline_priest',
    nameEn: 'Discipline',
    nameKo: '수사',
    role: 'HEALER',
    class: 'Priest',
    icon: 'disc_priest',
  },
  { id: 'holy_priest', nameEn: 'Holy', nameKo: '신사', role: 'HEALER', class: 'Priest', icon: 'holy_priest' },
  { id: 'resto_shaman', nameEn: 'Restoration', nameKo: '복술', role: 'HEALER', class: 'Shaman', icon: 'resto_shaman' },
  { id: 'frost_dk', nameEn: 'Frost', nameKo: '냉죽', role: 'MELEE', class: 'Death Knight', icon: 'frost_dk' },
  { id: 'unholy_dk', nameEn: 'Unholy', nameKo: '부죽', role: 'MELEE', class: 'Death Knight', icon: 'unholy_dk' },
  { id: 'havoc_dh', nameEn: 'Havoc', nameKo: '악딜', role: 'MELEE', class: 'Demon Hunter', icon: 'havoc_dh' },
  { id: 'feral_druid', nameEn: 'Feral', nameKo: '야드', role: 'MELEE', class: 'Druid', icon: 'feral_druid' },
  {
    id: 'survival_hunter',
    nameEn: 'Survival',
    nameKo: '생냥',
    role: 'MELEE',
    class: 'Hunter',
    icon: 'survival_hunter',
  },
  {
    id: 'windwalker_monk',
    nameEn: 'Windwalker',
    nameKo: '풍운',
    role: 'MELEE',
    class: 'Monk',
    icon: 'windwalker_monk',
  },
  {
    id: 'retribution_paladin',
    nameEn: 'Retribution',
    nameKo: '징기',
    role: 'MELEE',
    class: 'Paladin',
    icon: 'ret_paladin',
  },
  {
    id: 'assassination_rogue',
    nameEn: 'Assassination',
    nameKo: '암살',
    role: 'MELEE',
    class: 'Rogue',
    icon: 'assa_rogue',
  },
  { id: 'outlaw_rogue', nameEn: 'Outlaw', nameKo: '무법', role: 'MELEE', class: 'Rogue', icon: 'outlaw_rogue' },
  { id: 'subtlety_rogue', nameEn: 'Subtlety', nameKo: '잠행', role: 'MELEE', class: 'Rogue', icon: 'sub_rogue' },
  {
    id: 'enhancement_shaman',
    nameEn: 'Enhancement',
    nameKo: '고술',
    role: 'MELEE',
    class: 'Shaman',
    icon: 'enhance_shaman',
  },
  { id: 'arms_warrior', nameEn: 'Arms', nameKo: '무전', role: 'MELEE', class: 'Warrior', icon: 'arms_warrior' },
  { id: 'fury_warrior', nameEn: 'Fury', nameKo: '분전', role: 'MELEE', class: 'Warrior', icon: 'fury_warrior' },
  { id: 'balance_druid', nameEn: 'Balance', nameKo: '조드', role: 'RANGE', class: 'Druid', icon: 'balance_druid' },
  {
    id: 'augmentation_evoker',
    nameEn: 'Augmentation',
    nameKo: '증강',
    role: 'RANGE',
    class: 'Evoker',
    icon: 'augmentation_evoker',
  },
  {
    id: 'devastation_evoker',
    nameEn: 'Devastation',
    nameKo: '황폐',
    role: 'RANGE',
    class: 'Evoker',
    icon: 'devastation_evoker',
  },
  { id: 'bm_hunter', nameEn: 'Beast Mastery', nameKo: '야냥', role: 'RANGE', class: 'Hunter', icon: 'bm_hunter' },
  { id: 'mm_hunter', nameEn: 'Marksmanship', nameKo: '격냥', role: 'RANGE', class: 'Hunter', icon: 'mm_hunter' },
  { id: 'arcane_mage', nameEn: 'Arcane', nameKo: '비법', role: 'RANGE', class: 'Mage', icon: 'arcane_mage' },
  { id: 'fire_mage', nameEn: 'Fire', nameKo: '화법', role: 'RANGE', class: 'Mage', icon: 'fire_mage' },
  { id: 'frost_mage', nameEn: 'Frost', nameKo: '냉법', role: 'RANGE', class: 'Mage', icon: 'frost_mage' },
  { id: 'shadow_priest', nameEn: 'Shadow', nameKo: '암사', role: 'RANGE', class: 'Priest', icon: 'shadow_priest' },
  { id: 'elemental_shaman', nameEn: 'Elemental', nameKo: '정술', role: 'RANGE', class: 'Shaman', icon: 'ele_shaman' },
  {
    id: 'affliction_warlock',
    nameEn: 'Affliction',
    nameKo: '고흑',
    role: 'RANGE',
    class: 'Warlock',
    icon: 'aff_warlock',
  },
  {
    id: 'demonology_warlock',
    nameEn: 'Demonology',
    nameKo: '악흑',
    role: 'RANGE',
    class: 'Warlock',
    icon: 'demo_warlock',
  },
  {
    id: 'destruction_warlock',
    nameEn: 'Destruction',
    nameKo: '파흑',
    role: 'RANGE',
    class: 'Warlock',
    icon: 'destro_warlock',
  },
];

export type Role = 'TANK' | 'HEALER' | 'MELEE' | 'RANGE';
export type ClassName = (typeof SPECS)[number]['class'];
export type SpecId = (typeof SPECS)[number]['id'];
export type Spec = (typeof SPECS)[number];

export interface SpecDefinition {
  id: SpecId;
  nameEn: string;
  nameKo: string;
  role: Role;
  class: ClassName;
  icon: string;
}

export type RecruitmentSlot =
  | {
      type: 'ROLE';
      role: Role;
      count: number;
    }
  | {
      type: 'SPEC';
      role: Role;
      class: ClassName;
      specId: SpecId;
      count: number;
    };

export interface RecruitmentPost {
  id: string;
  title: string;
  startDate: string | null;
  endDate: string | null;
  startTime: string;
  endTime: string;
  difficulty: string;

  slots: RecruitmentSlot[];

  memo?: string;
  discordUrl?: string;
  kakaoUrl?: string;
  dmUrl?: string;
}

export interface Filters {
  dateRange: DatesRangeValue;
  roles: Role[];
  classes: ClassName[];
  specIds: SpecId[];
}

export function getSpec(specId: SpecId) {
  return SPECS.find((s) => s.id === specId)!;
}

export function extractSlotInfo(slot: RecruitmentSlot) {
  if (slot.type === 'ROLE') {
    return {
      role: slot.role,
      class: null,
      spec: null,
    };
  }

  const spec = getSpec(slot.specId);

  return {
    role: spec.role,
    class: spec.class,
    spec,
  };
}

export function extractFilterInfo(post: RecruitmentPost) {
  const roles = new Set<Role>();
  const classes = new Set<ClassName>();
  const specIds = new Set<SpecId>();

  post.slots.forEach((slot) => {
    roles.add(slot.role);

    if (slot.type === 'SPEC') {
      classes.add(slot.class);
      specIds.add(slot.specId);
    }
  });

  return {
    roles: [...roles],
    classes: [...classes],
    specIds: [...specIds],
  };
}

export interface CreateCrewRequestBody {
  title: string;
  difficulty: string;

  startDate: string | null;
  endDate: string | null;
  startTime: string;
  endTime: string;

  slots: RecruitmentSlot[];

  discordUrl?: string;
  kakaoUrl?: string;
  dmUrl?: string;

  memo?: string;
}
