import { RecruitmentPost, RoleSlot, SpecSlot } from '@/constants/WOW';
import { Drawer, ScrollArea, Stack, Divider, Text, Badge, Group } from '@mantine/core';

export default function RecruitmentDrawer({ post, onClose }: { post: RecruitmentPost | null; onClose: () => void }) {
  return (
    <Drawer opened={!!post} onClose={onClose} position="right" size="40%">
      {post && (
        <ScrollArea>
          <Stack>
            <Text fw={600}>{post.title}</Text>
            <Divider />

            <RecruitmentSlotList slots={post.slots} />

            <Divider />
            {post.memo && <Text>{post.memo}</Text>}
          </Stack>
        </ScrollArea>
      )}
    </Drawer>
  );
}

function RecruitmentSlotList({ slots }: { slots: RecruitmentPost[] }) {
  return (
    <Stack>
      {slots.map((slot, index) =>
        slot.type === 'ROLE' ? <RoleSlotItem key={index} slot={slot} /> : <SpecSlotItem key={index} slot={slot} />
      )}
    </Stack>
  );
}

function RoleSlotItem({ slot }: { slot: RoleSlot }) {
  return (
    <Group justify="space-between">
      <Text>{slot.role} (자유)</Text>
      <Badge>
        {slot.current} / {slot.capacity}
      </Badge>
    </Group>
  );
}

function SpecSlotItem({ slot }: { slot: SpecSlot }) {
  return (
    <Group justify="space-between">
      <Text>
        {slot.class} - {slot.spec}
      </Text>
      <Badge color={slot.current >= slot.capacity ? 'green' : 'red'}>
        {slot.current} / {slot.capacity}
      </Badge>
    </Group>
  );
}
