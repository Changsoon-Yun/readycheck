'use client';

import { Stack, TextInput, Select, Group, Button, Divider, NumberInput, Checkbox, Card, Text } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useState } from 'react';
import { CreateCrewRequestBody, RecruitmentSlot, Role, SPECS } from '@/constants/WOW';
import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string().min(1),
  difficulty: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  slots: z.array(
    z.object({
      type: z.enum(['ROLE', 'SPEC']),
      role: z.enum(['TANK', 'HEALER', 'MELEE', 'RANGE']),
      class: z.string().optional(),
      specId: z.string().optional(),
      count: z.number().min(1),
    })
  ),
});

export default function CreateRecruitmentPage() {
  const [state, setState] = useState<CreateCrewRequestBody>({
    title: '',
    difficulty: '영웅',

    startDate: null,
    endDate: null,
    startTime: '21:00',
    endTime: '24:00',

    slots: [],
  });

  const addRoleSlot = (role: Role) => {
    setState((s) => ({
      ...s,
      slots: [...s.slots, { type: 'ROLE', role, count: 1 }],
    }));
  };

  const updateSlot = (index: number, slot: RecruitmentSlot) => {
    setState((s) => ({
      ...s,
      slots: s.slots.map((v, i) => (i === index ? slot : v)),
    }));
  };

  const removeSlot = (index: number) => {
    setState((s) => ({
      ...s,
      slots: s.slots.filter((_, i) => i !== index),
    }));
  };

  const handleCreate = async () => {
    await fetch('/api/hire/crew', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...state,
        startDate: state.startDate || null,
        endDate: state.endDate || null,
      }),
    });
  };

  /* ---------------- JSX ---------------- */

  return (
    <Stack maw={720} mx="auto">
      <Text fw={700} size="lg">
        공격대 모집글 생성
      </Text>

      {/* 기본 정보 */}
      <TextInput
        label="제목"
        placeholder="영웅 막넴 트라이 힐러 모집"
        value={state.title}
        onChange={(e) => setState({ ...state, title: e.currentTarget.value })}
      />

      <Select
        label="난이도"
        data={['일반', '영웅', '신화']}
        value={state.difficulty}
        onChange={(v) => setState({ ...state, difficulty: v! })}
      />

      {/* 날짜 */}
      <Group grow>
        <DatePickerInput
          label="시작 날짜"
          value={state.startDate}
          onChange={(v) => setState({ ...state, startDate: v })}
        />
        <DatePickerInput label="종료 날짜" value={state.endDate} onChange={(v) => setState({ ...state, endDate: v })} />
      </Group>

      {/* 시간 */}
      <Group grow>
        <TimeInput
          label="시작 시간"
          value={state.startTime}
          onChange={(e) => setState({ ...state, startTime: e.currentTarget.value })}
        />
        <TimeInput
          label="종료 시간"
          value={state.endTime}
          onChange={(e) => setState({ ...state, endTime: e.currentTarget.value })}
        />
      </Group>

      <Divider label="모집 슬롯" />

      {/* 슬롯 추가 버튼 */}
      <Group>
        {(['TANK', 'HEALER', 'MELEE', 'RANGE'] as Role[]).map((role) => (
          <Button key={role} variant="light" onClick={() => addRoleSlot(role)}>
            {role} 추가
          </Button>
        ))}
      </Group>

      {/* 슬롯 목록 */}
      <Stack>
        {state.slots.map((slot, index) => (
          <SlotEditor
            key={index}
            slot={slot}
            onChange={(s) => updateSlot(index, s)}
            onRemove={() => removeSlot(index)}
          />
        ))}
      </Stack>

      <Divider label="연락 수단" />

      <TextInput
        label="Discord URL"
        value={state.discordUrl}
        onChange={(e) => setState({ ...state, discordUrl: e.currentTarget.value })}
      />
      <TextInput
        label="Kakao URL"
        value={state.kakaoUrl}
        onChange={(e) => setState({ ...state, kakaoUrl: e.currentTarget.value })}
      />
      <TextInput
        label="DM URL"
        value={state.dmUrl}
        onChange={(e) => setState({ ...state, dmUrl: e.currentTarget.value })}
      />

      <TextInput
        label="메모"
        value={state.memo}
        onChange={(e) => setState({ ...state, memo: e.currentTarget.value })}
      />

      <Button size="lg" disabled={!state.title || !state.slots.length} onClick={handleCreate}>
        모집글 등록
      </Button>
    </Stack>
  );
}

function SlotEditor({
  slot,
  onChange,
  onRemove,
}: {
  slot: RecruitmentSlot;
  onChange: (slot: RecruitmentSlot) => void;
  onRemove: () => void;
}) {
  const specsForRole = SPECS.filter((s) => s.role === slot.role);

  return (
    <Card withBorder>
      <Stack>
        <Group justify="space-between">
          <Text fw={600}>{slot.role}</Text>
          <Button size="xs" color="red" variant="subtle" onClick={onRemove}>
            삭제
          </Button>
        </Group>

        <NumberInput
          label="모집 인원"
          min={1}
          value={slot.count}
          onChange={(v) => onChange({ ...slot, count: Number(v) })}
        />

        {slot.type === 'ROLE' && (
          <Checkbox
            label="특정 전문화로 모집"
            onChange={(e) => {
              if (!e.currentTarget.checked) return;

              const firstSpec = specsForRole[0];

              onChange({
                type: 'SPEC',
                role: slot.role,
                class: firstSpec.class,
                specId: firstSpec.id,
                count: slot.count,
              });
            }}
          />
        )}

        {slot.type === 'SPEC' && (
          <Select
            label="전문화"
            data={specsForRole.map((s) => ({
              value: s.id,
              label: `${s.nameKo} (${s.class})`,
            }))}
            value={slot.specId}
            onChange={(v) => {
              const spec = SPECS.find((s) => s.id === v)!;
              onChange({
                ...slot,
                specId: spec.id,
                class: spec.class,
              });
            }}
          />
        )}
      </Stack>
    </Card>
  );
}
