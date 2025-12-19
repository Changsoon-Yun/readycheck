'use client';

import { Filters, RecruitmentPost, Role, getSpec, SPECS, ClassName, SpecId } from '@/constants/WOW';
import { IconBrandDiscord, IconBrandKakoTalk, IconMessage } from '@tabler/icons-react';
import { ActionIcon, Button } from '@mantine/core';
import { Stack, Group, Card, Text, Badge, Drawer, Divider, ScrollArea, MultiSelect } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function RecruitmentPage() {
  const [filters, setFilters] = useState<Filters>({
    dateRange: [null, null],
    roles: [],
    classes: [],
    specIds: [],
  });

  const [selected, setSelected] = useState<RecruitmentPost | null>(null);

  const posts = mockPosts;

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
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

      if (filters.roles.length && !filters.roles.some((r) => roles.has(r))) return false;
      if (filters.classes.length && !filters.classes.some((c) => classes.has(c))) return false;
      if (filters.specIds.length && !filters.specIds.some((s) => specIds.has(s))) return false;

      return true;
    });
  }, [posts, filters]);

  const availableClasses = useMemo(() => {
    if (!filters.roles.length) return [];

    return Array.from(new Set(SPECS.filter((s) => filters.roles.includes(s.role as Role)).map((s) => s.class)));
  }, [filters.roles]);

  const availableSpecs = useMemo(() => {
    return SPECS.filter(
      (s) =>
        (!filters.roles.length || filters.roles.includes(s.role as Role)) &&
        (!filters.classes.length || filters.classes.includes(s.class))
    ).map((s) => ({
      value: s.id,
      label: s.nameKo,
    }));
  }, [filters.roles, filters.classes]);

  return (
    <Stack>
      <Group grow>
        <DatePickerInput
          type="range"
          placeholder="날짜"
          value={filters.dateRange}
          onChange={(v) => setFilters((f) => ({ ...f, dateRange: v }))}
          clearable
          allowSingleDateInRange
          locale="ko"
          valueFormat="MM.DD(ddd)"
          monthsListFormat="M월"
          yearsListFormat="YYYY년"
          decadeLabelFormat="YYYY년"
          monthLabelFormat="YYYY년 M월"
        />

        <MultiSelect
          placeholder="역할"
          data={['TANK', 'HEALER', 'DPS']}
          value={filters.roles}
          onChange={(v) => setFilters({ ...filters, roles: v as Role[], classes: [], specIds: [] })}
        />

        <MultiSelect
          placeholder="클래스"
          data={availableClasses}
          value={filters.classes}
          onChange={(v) => setFilters((f) => ({ ...f, classes: v as ClassName[], specs: [] }))}
        />

        <MultiSelect
          placeholder="특성"
          data={availableSpecs}
          value={filters.specIds}
          onChange={(v) => setFilters((f) => ({ ...f, specs: v as SpecId[] }))}
        />
      </Group>

      {filteredPosts.map((post) => {
        const specIds = new Set<SpecId>();

        post.slots.forEach((slot) => {
          if (slot.type === 'SPEC') {
            specIds.add(slot.specId);
          }
        });

        return (
          <Card key={post.id} withBorder onClick={() => setSelected(post)} style={{ cursor: 'pointer' }}>
            <Stack gap={4}>
              <Text fw={600}>{post.title}</Text>
              <Text size="xs" span c={'dimmed'}>
                {post.startDate} / {post.startTime}
              </Text>
              <Group align="center" gap={'sm'} justify="space-between">
                <Group>
                  {post.slots
                    .filter((s) => s.type === 'SPEC')
                    .map((s) => {
                      const spec = getSpec(s.specId);
                      return (
                        <Badge key={s.specId} variant="outline">
                          {spec.nameKo}
                        </Badge>
                      );
                    })}
                </Group>
                <Group gap={6}>
                  {post.discordUrl && (
                    <ActionIcon size="sm" variant="subtle">
                      <IconBrandDiscord size={16} />
                    </ActionIcon>
                  )}
                  {post.kakaoUrl && (
                    <ActionIcon size="sm" variant="subtle">
                      <IconBrandKakoTalk size={16} />
                    </ActionIcon>
                  )}
                  {post.dmUrl && (
                    <ActionIcon size="sm" variant="subtle">
                      <IconMessage size={16} />
                    </ActionIcon>
                  )}

                  <Badge>{post.difficulty}</Badge>
                </Group>
              </Group>
            </Stack>
          </Card>
        );
      })}

      <Drawer opened={!!selected} onClose={() => setSelected(null)} position="right" size="40%">
        {selected && (
          <ScrollArea>
            <Stack>
              <Text fw={600}>{selected.title}</Text>
              <Divider />

              {selected.slots.map((slot) => {
                if (slot.type === 'ROLE') {
                  return (
                    <Text key={slot.role}>
                      {slot.role} 모집 {slot.count}명
                    </Text>
                  );
                }

                const spec = getSpec(slot.specId);

                return (
                  <Text key={slot.specId}>
                    {spec.nameKo} ({spec.class}) {slot.count}
                  </Text>
                );
              })}

              <Divider />

              {selected.memo && <Text>{selected.memo}</Text>}

              <Divider />

              <Stack gap="xs">
                {selected.discordUrl && (
                  <Button
                    component="a"
                    href={selected.discordUrl}
                    target="_blank"
                    leftSection={<IconBrandDiscord size={18} />}
                    fullWidth
                    variant="outline">
                    디스코드 참여
                  </Button>
                )}

                {selected.kakaoUrl && (
                  <Button
                    component="a"
                    href={selected.kakaoUrl}
                    target="_blank"
                    leftSection={<IconBrandKakoTalk size={18} />}
                    fullWidth
                    variant="outline">
                    카카오톡 오픈채팅
                  </Button>
                )}

                {selected.dmUrl && (
                  <Button
                    component="a"
                    href={selected.dmUrl}
                    target="_blank"
                    leftSection={<IconMessage size={18} />}
                    fullWidth
                    variant="outline">
                    배틀넷 DM
                  </Button>
                )}
              </Stack>
            </Stack>
          </ScrollArea>
        )}
      </Drawer>
    </Stack>
  );
}

const mockPosts: RecruitmentPost[] = [
  {
    id: 'post-1',
    title: '신생 공대 초기 멤버 모집',
    startDate: '2025-01-15',
    startTime: '21:00',
    endDate: '2025-01-15',
    endTime: '21:00',
    difficulty: '영웅',
    memo: '클래스 자유 / 디스코드 필참 / 편하게 진행',
    slots: [
      { type: 'ROLE', role: 'TANK', count: 2 },
      { type: 'ROLE', role: 'HEALER', count: 4 },
      { type: 'ROLE', role: 'MELEE', count: 6 },
      { type: 'ROLE', role: 'RANGE', count: 6 },
    ],
    discordUrl: 'https://discord.gg/abcd1234',
    kakaoUrl: 'https://open.kakao.com/o/example123',
    dmUrl: 'https://battle.net/chat/123456789',
  },

  {
    id: 'post-2',
    title: '영웅 막넴 트라이 (힐러/딜러)',
    startDate: '2025-01-16',
    startTime: '20:30',
    endDate: '2025-01-15',
    endTime: '21:00',
    difficulty: '영웅',
    memo: '경험자 우대 / 로그 확인',
    slots: [
      {
        type: 'SPEC',
        role: 'HEALER',
        class: 'Druid',
        specId: 'resto_druid',
        count: 1,
      },
      {
        type: 'SPEC',
        role: 'HEALER',
        class: 'Priest',
        specId: 'discipline_priest',
        count: 1,
      },
      {
        type: 'SPEC',
        role: 'RANGE',
        class: 'Mage',
        specId: 'fire_mage',
        count: 2,
      },
    ],
    discordUrl: 'https://discord.gg/abcd1234',
    kakaoUrl: 'https://open.kakao.com/o/example123',
    dmUrl: 'https://battle.net/chat/123456789',
  },

  {
    id: 'post-3',
    title: '고정 공대 결원 보충',
    startDate: '2025-01-18',
    startTime: '22:00',
    endDate: '2025-01-15',
    endTime: '21:00',
    difficulty: '신화',
    memo: '장기 고정 / 분위기 중요',
    slots: [
      {
        type: 'SPEC',
        role: 'TANK',
        class: 'Death Knight',
        specId: 'blood_dk',
        count: 1,
      },
      {
        type: 'ROLE',
        role: 'MELEE',
        count: 2,
      },
      {
        type: 'ROLE',
        role: 'RANGE',
        count: 2,
      },
    ],
    discordUrl: 'https://discord.gg/abcd1234',
    kakaoUrl: 'https://open.kakao.com/o/example123',
    dmUrl: 'https://battle.net/chat/123456789',
  },

  {
    id: 'post-4',
    title: '드루이드 다수 모집',
    startDate: '2025-01-19',
    startTime: '21:30',
    endDate: '2025-01-15',
    endTime: '21:00',
    difficulty: '영웅',
    memo: '드루 클래스만 / 초행 가능',
    slots: [
      {
        type: 'SPEC',
        role: 'TANK',
        class: 'Druid',
        specId: 'guardian_druid',
        count: 1,
      },
      {
        type: 'SPEC',
        role: 'HEALER',
        class: 'Druid',
        specId: 'resto_druid',
        count: 1,
      },
      {
        type: 'SPEC',
        role: 'MELEE',
        class: 'Druid',
        specId: 'feral_druid',
        count: 1,
      },
      {
        type: 'SPEC',
        role: 'RANGE',
        class: 'Druid',
        specId: 'balance_druid',
        count: 1,
      },
    ],
    discordUrl: 'https://discord.gg/abcd1234',
    kakaoUrl: 'https://open.kakao.com/o/example123',
    dmUrl: 'https://battle.net/chat/123456789',
  },
];
